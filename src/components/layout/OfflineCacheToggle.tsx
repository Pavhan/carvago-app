"use client";

import { type ChangeEvent, useEffect, useId, useState } from "react";
import { Label } from "@/components/ui/label";

const OFFLINE_CACHE_STORAGE_KEY = "offline-cache-enabled";
const DEFAULT_CACHE_ENABLED = true;

function parseStoredCacheValue(rawValue: string | null) {
  if (rawValue === null) {
    return DEFAULT_CACHE_ENABLED;
  }

  try {
    return Boolean(JSON.parse(rawValue));
  } catch {
    return DEFAULT_CACHE_ENABLED;
  }
}

function getMessageTarget(registration: ServiceWorkerRegistration) {
  return (
    navigator.serviceWorker.controller ??
    registration.active ??
    registration.waiting ??
    registration.installing ??
    null
  );
}

function postCacheEnabledMessage(
  registration: ServiceWorkerRegistration,
  enabled: boolean,
) {
  const target = getMessageTarget(registration);
  if (!target) {
    return;
  }

  // Prefer the required message route through controller when available.
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "SET_CACHE_ENABLED",
      enabled,
    });
    return;
  }

  target.postMessage({
    type: "SET_CACHE_ENABLED",
    enabled,
  });
}

export function OfflineCacheToggle() {
  const inputId = useId();
  const [cacheEnabled, setCacheEnabled] = useState(DEFAULT_CACHE_ENABLED);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const initialEnabled = parseStoredCacheValue(
      localStorage.getItem(OFFLINE_CACHE_STORAGE_KEY),
    );
    setCacheEnabled(initialEnabled);

    let isUnmounted = false;

    async function registerServiceWorker() {
      try {
        const swRegistration =
          await navigator.serviceWorker.register("/service-worker.js");
        await navigator.serviceWorker.ready;

        if (isUnmounted) {
          return;
        }

        setRegistration(swRegistration);
        postCacheEnabledMessage(swRegistration, initialEnabled);
      } catch (error) {
        console.error("Service worker registration failed", error);
      }
    }

    void registerServiceWorker();

    return () => {
      isUnmounted = true;
    };
  }, []);

  useEffect(() => {
    if (!registration) {
      return;
    }

    postCacheEnabledMessage(registration, cacheEnabled);
  }, [cacheEnabled, registration]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const enabled = event.target.checked;
    setCacheEnabled(enabled);
    localStorage.setItem(OFFLINE_CACHE_STORAGE_KEY, JSON.stringify(enabled));
  };

  return (
    <Label
      htmlFor={inputId}
      className="text-xs text-zinc-700 whitespace-nowrap gap-1.5"
    >
      <input
        id={inputId}
        type="checkbox"
        checked={cacheEnabled}
        onChange={handleChange}
        className="h-4 w-4"
      />
      Enable offline cache
    </Label>
  );
}
