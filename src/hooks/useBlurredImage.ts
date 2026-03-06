import { useMemo, useState } from 'react';

function getSmallImageUrl(imageUrl: string) {
  if (!imageUrl) {
    return imageUrl;
  }

  const [path, query] = imageUrl.split('?');
  const extensionIndex = path.lastIndexOf('.');

  if (extensionIndex === -1) {
    return imageUrl;
  }

  const extension = path.slice(extensionIndex);
  const baseName = path.slice(0, extensionIndex);

  if (baseName.endsWith('-small')) {
    return imageUrl;
  }

  const smallPath = `${baseName}-small${extension}`;

  return query ? `${smallPath}?${query}` : smallPath;
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
