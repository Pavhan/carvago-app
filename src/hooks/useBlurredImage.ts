import { useMemo, useState } from "react";

function getSmallImageUrl(imageUrl: string) {
  if (!imageUrl) {
    return imageUrl;
  }

  const [pathWithHash, query = ""] = imageUrl.split("?");
  const [path, hash = ""] = pathWithHash.split("#");
  const extensionIndex = path.lastIndexOf(".");

  if (extensionIndex === -1) {
    return imageUrl;
  }

  const lastSlashIndex = path.lastIndexOf("/");

  if (lastSlashIndex === -1) {
    return imageUrl;
  }

  const directoryPath = path.slice(0, lastSlashIndex);
  const fileName = path.slice(lastSlashIndex + 1);

  if (directoryPath.endsWith("/thumbs")) {
    return imageUrl;
  }

  const thumbPath = `${directoryPath}/thumbs/${fileName}`;
  const querySuffix = query ? `?${query}` : "";
  const hashSuffix = hash ? `#${hash}` : "";

  return `${thumbPath}${querySuffix}${hashSuffix}`;
}

export function useBlurredImage(imageUrl: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const smallImageUrl = useMemo(() => getSmallImageUrl(imageUrl), [imageUrl]);

  function handleLoad() {
    setIsLoaded(true);
  }

  return {
    isLoaded,
    smallImageUrl,
    handleLoad,
  };
}
