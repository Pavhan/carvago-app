const GOT_UNEXPECTED_HTML = "GOT_UNEXPECTED_HTML";
const serviceWorkerGlobal = self;

const FILE_EXTENSION_GROUPS = {
  code: [".css", ".js"],
  vectorImages: [".svg"],
  rasterImages: [".ico", ".avif", ".jpeg", ".jpg", ".png", ".webp"],
  defaultFonts: [".woff2"],
};

const STATIC_PRECACHE_EXPLICIT_ASSETS = [
  "/favicon-32x32.png",
  "/android-chrome-192x192.png",
];

const IMMUTABLE_RUNTIME_PATH_PATTERN = /\/(?:_app|_next\/static)\/(.+)/;
const CACHE_ENABLED_PREFS_CACHE = "sw-cache-settings-v1";
const CACHE_ENABLED_PREFS_KEY = "/__sw_cache_enabled__";

let cacheEnabled = true;
let cacheEnabledReadyPromise = loadCacheEnabledPreference();

async function sendUnexpectedHtmlMessage(fetchEvent) {
  const client = await serviceWorkerGlobal.clients.get(fetchEvent.clientId);
  if (client) {
    client.postMessage(GOT_UNEXPECTED_HTML);
  }
}

function matchesExtensionGroups(pathname, groupNames) {
  return groupNames.some((groupName) =>
    FILE_EXTENSION_GROUPS[groupName].some((extension) =>
      pathname.endsWith(extension),
    ),
  );
}

function shouldPrecacheImmutableAsset(pathname) {
  return matchesExtensionGroups(pathname, ["code", "vectorImages"]);
}

function shouldPrecacheStaticAsset(pathname) {
  return (
    matchesExtensionGroups(pathname, [
      "code",
      "vectorImages",
      "defaultFonts",
    ]) || STATIC_PRECACHE_EXPLICIT_ASSETS.includes(pathname)
  );
}

function shouldStoreRuntimeAsset(pathname) {
  return matchesExtensionGroups(pathname, [
    "code",
    "vectorImages",
    "rasterImages",
    "defaultFonts",
  ]);
}

function isUnexpectedHtmlResponse(pathname, response) {
  return (
    /\./.test(pathname) &&
    !/\.html?$/.test(pathname) &&
    response.headers.get("content-type")?.startsWith("text/html")
  );
}

async function loadCacheEnabledPreference() {
  try {
    const preferencesCache = await caches.open(CACHE_ENABLED_PREFS_CACHE);
    const savedPreferenceResponse = await preferencesCache.match(
      CACHE_ENABLED_PREFS_KEY,
    );

    if (!savedPreferenceResponse) {
      return true;
    }

    const savedPreference = await savedPreferenceResponse.json();
    return typeof savedPreference.enabled === "boolean"
      ? savedPreference.enabled
      : true;
  } catch (error) {
    console.log(
      "[SW prefs]: failed to load cacheEnabled preference, using default true",
      error,
    );
    return true;
  }
}

async function persistCacheEnabledPreference(enabled) {
  try {
    const preferencesCache = await caches.open(CACHE_ENABLED_PREFS_CACHE);
    await preferencesCache.put(
      CACHE_ENABLED_PREFS_KEY,
      new Response(JSON.stringify({ enabled }), {
        headers: {
          "content-type": "application/json",
        },
      }),
    );
  } catch (error) {
    console.log("[SW prefs]: failed to persist cacheEnabled preference", error);
  }
}

async function updateCacheEnabledState(
  enabled,
  immutableCacheName,
  staticCacheName,
) {
  cacheEnabled = enabled;
  cacheEnabledReadyPromise = Promise.resolve(enabled);
  await persistCacheEnabledPreference(enabled);

  if (!enabled) {
    await Promise.all([
      caches.delete(immutableCacheName),
      caches.delete(staticCacheName),
    ]);
    console.log("[SW prefs]: cache disabled, active caches cleared");
  }
}

function initializeServiceWorker({ immutableAssets, staticFiles, version }) {
  const immutableCacheName = `immutable-${version}`;
  const staticCacheName = `static-${version}`;
  const activeCacheNames = [immutableCacheName, staticCacheName];

  serviceWorkerGlobal.addEventListener("message", (event) => {
    const message = event.data;

    if (
      !message ||
      message.type !== "SET_CACHE_ENABLED" ||
      typeof message.enabled !== "boolean"
    ) {
      return;
    }

    event.waitUntil(
      updateCacheEnabledState(
        message.enabled,
        immutableCacheName,
        staticCacheName,
      ),
    );
  });

  serviceWorkerGlobal.addEventListener("install", (event) => {
    console.log("[SW install]: installing service worker");

    async function precacheAssets() {
      const [immutableCache, staticCache] = await Promise.all([
        caches.open(immutableCacheName),
        caches.open(staticCacheName),
      ]);

      const addAssetToCache = (cache) => async (assetUrl) => {
        try {
          const cachedResponse = await caches.match(assetUrl);

          if (cachedResponse) {
            console.log("[SW install]: using cached asset:", assetUrl);
            await cache.put(assetUrl, cachedResponse);
            return;
          }

          console.log("[SW install]: caching new asset:", assetUrl);
          await cache.add(assetUrl);
        } catch (error) {
          console.log(error, assetUrl);
        }
      };

      await Promise.all([
        ...immutableAssets
          .filter(shouldPrecacheImmutableAsset)
          .map(addAssetToCache(immutableCache)),
        ...staticFiles
          .filter(shouldPrecacheStaticAsset)
          .map(addAssetToCache(staticCache)),
      ]);
    }

    event.waitUntil(precacheAssets());
    serviceWorkerGlobal.skipWaiting().then(() => {
      console.log("[SW install]: skipWaiting completed");
    });
  });

  serviceWorkerGlobal.addEventListener("activate", (event) => {
    console.log("[SW activate]: activating service worker");

    async function cleanupOldCaches() {
      const allCacheNames = await caches.keys();
      const staleCacheNames = allCacheNames.filter(
        (cacheName) => !activeCacheNames.includes(cacheName),
      );
      await Promise.all(
        staleCacheNames.map((cacheName) => caches.delete(cacheName)),
      );
    }

    event.waitUntil(
      serviceWorkerGlobal.clients.claim().then(() => {
        console.log("[SW activate]: clients claimed");
      }),
    );

    event.waitUntil(cleanupOldCaches());
  });

  serviceWorkerGlobal.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
      return;
    }

    const requestUrl = new URL(event.request.url);
    if (
      !requestUrl.protocol.startsWith("http") ||
      event.request.mode === "navigate"
    ) {
      return;
    }

    async function handleRequest() {
      cacheEnabled = await cacheEnabledReadyPromise;

      if (!cacheEnabled) {
        return fetch(event.request);
      }

      const cachedResponse = await caches.match(requestUrl);
      if (cachedResponse) {
        console.log(
          "[SW cache-first]: serving from cache:",
          requestUrl.pathname,
        );
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(event.request);

        if (isUnexpectedHtmlResponse(requestUrl.pathname, networkResponse)) {
          console.log(
            "[SW cache-first]: not in cache, network returned unexpected HTML, notifying client",
            requestUrl.pathname,
          );
          await sendUnexpectedHtmlMessage(event);
          return networkResponse;
        }

        if (
          networkResponse.status === 200 &&
          shouldStoreRuntimeAsset(requestUrl.pathname)
        ) {
          const targetCacheName = IMMUTABLE_RUNTIME_PATH_PATTERN.test(
            requestUrl.pathname,
          )
            ? immutableCacheName
            : staticCacheName;

          (await caches.open(targetCacheName)).put(
            event.request,
            networkResponse.clone(),
          );
          console.log(
            `[SW cache-first]: not in cache, fetched and saved into ${targetCacheName}:`,
            requestUrl.pathname,
          );
        } else if (networkResponse.type === "opaque") {
          console.log(
            "[SW cache-first]: not in cache, opaque response, not saving:",
            requestUrl.pathname,
          );
        } else {
          console.log(
            `[SW cache-first]: not in cache, got ${networkResponse.status}, not saving:`,
            requestUrl.pathname,
          );
        }

        return networkResponse;
      } catch (error) {
        console.log(
          "[SW cache-first]: not in cache, fetch failed, throwing:",
          requestUrl.pathname,
        );
        throw error;
      }
    }

    event.respondWith(handleRequest());
  });
}

const a = location.pathname.split("/").slice(0, -1).join("");
const D = [];
const y = [
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-Bold-Italic.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-Bold.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-Italic.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-Light-Italic.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-Light.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-Medium-Italic.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-Medium.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-Regular.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-SemiBold-Italic.ttf`,
  `${a}/fonts/euclid-circular-b/Euclid-Circular-B-SemiBold.ttf`,
  `${a}/images/cars/audi-a4-avant.avif`,
  `${a}/images/cars/audi-a6-avant.avif`,
  `${a}/images/cars/audi-q3.avif`,
  `${a}/images/cars/audi-q5.avif`,
  `${a}/images/cars/bmw-330i.avif`,
  `${a}/images/cars/bmw-520d.avif`,
  `${a}/images/cars/bmw-x3.avif`,
  `${a}/images/cars/cupra-born.avif`,
  `${a}/images/cars/cupra-formentor.avif`,
  `${a}/images/cars/mercedes-c220d.avif`,
  `${a}/images/cars/mercedes-e300e.avif`,
  `${a}/images/cars/mercedes-glc.avif`,
  `${a}/images/cars/peugeot-2008.avif`,
  `${a}/images/cars/peugeot-3008.avif`,
  `${a}/images/cars/peugeot-508-sw.avif`,
  `${a}/images/cars/seat-leon-fr.avif`,
  `${a}/images/cars/skoda-enyaq-coupe.avif`,
  `${a}/images/cars/skoda-kodiaq.avif`,
  `${a}/images/cars/skoda-octavia.avif`,
  `${a}/images/cars/skoda-superb-combi.avif`,
  `${a}/images/cars/tesla-model-s.avif`,
  `${a}/images/cars/tesla-model-y.avif`,
  `${a}/images/cars/tesla-model3.avif`,
  `${a}/images/cars/thumbs/audi-a4-avant.avif`,
  `${a}/images/cars/thumbs/audi-a6-avant.avif`,
  `${a}/images/cars/thumbs/audi-q3.avif`,
  `${a}/images/cars/thumbs/audi-q5.avif`,
  `${a}/images/cars/thumbs/bmw-330i.avif`,
  `${a}/images/cars/thumbs/bmw-520d.avif`,
  `${a}/images/cars/thumbs/bmw-x3.avif`,
  `${a}/images/cars/thumbs/cupra-born.avif`,
  `${a}/images/cars/thumbs/cupra-formentor.avif`,
  `${a}/images/cars/thumbs/mercedes-c220d.avif`,
  `${a}/images/cars/thumbs/mercedes-e300e.avif`,
  `${a}/images/cars/thumbs/mercedes-glc.avif`,
  `${a}/images/cars/thumbs/peugeot-2008.avif`,
  `${a}/images/cars/thumbs/peugeot-3008.avif`,
  `${a}/images/cars/thumbs/peugeot-508-sw.avif`,
  `${a}/images/cars/thumbs/seat-leon-fr.avif`,
  `${a}/images/cars/thumbs/skoda-enyaq-coupe.avif`,
  `${a}/images/cars/thumbs/skoda-kodiaq.avif`,
  `${a}/images/cars/thumbs/skoda-octavia.avif`,
  `${a}/images/cars/thumbs/skoda-superb-combi.avif`,
  `${a}/images/cars/thumbs/tesla-model-s.avif`,
  `${a}/images/cars/thumbs/tesla-model-y.avif`,
  `${a}/images/cars/thumbs/tesla-model3.avif`,
  `${a}/images/cars/thumbs/volvo-v60.avif`,
  `${a}/images/cars/thumbs/volvo-xc40.avif`,
  `${a}/images/cars/thumbs/volvo-xc60.avif`,
  `${a}/images/cars/thumbs/vw-golf-gte.avif`,
  `${a}/images/cars/thumbs/vw-id4.avif`,
  `${a}/images/cars/thumbs/vw-tiguan.avif`,
  `${a}/images/cars/volvo-v60.avif`,
  `${a}/images/cars/volvo-xc40.avif`,
  `${a}/images/cars/volvo-xc60.avif`,
  `${a}/images/cars/vw-golf-gte.avif`,
  `${a}/images/cars/vw-id4.avif`,
  `${a}/images/cars/vw-tiguan.avif`,
  `${a}/logo-carvago.svg`,
  `${a}/service-worker.js`,
];
const x = "1f0dbe0";

initializeServiceWorker({
  immutableAssets: D,
  staticFiles: y,
  version: x,
});
