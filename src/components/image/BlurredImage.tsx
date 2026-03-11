"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useBlurredImage } from "@/hooks/useBlurredImage";
import { cn } from "@/lib/utils";

type BlurredImageProps = {
  alt: string;
  src: string;
  sizes: string;
  wrapperClassName: string;
  imageClassName?: string;
  loading?: "lazy" | "eager";
};

export function BlurredImage({
  alt,
  src,
  sizes,
  wrapperClassName,
  imageClassName,
  loading = "lazy",
}: BlurredImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldRenderImage, setShouldRenderImage] = useState(
    loading === "eager",
  );
  const { isLoaded, smallImageUrl, handleLoad } = useBlurredImage(src);

  useEffect(() => {
    if (loading === "eager") {
      setShouldRenderImage(true);
      return;
    }

    const wrapperElement = wrapperRef.current;
    if (!wrapperElement) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShouldRenderImage(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldRenderImage(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0,
      },
    );

    observer.observe(wrapperElement);

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative w-full overflow-hidden bg-cover bg-center bg-no-repeat",
        wrapperClassName,
        {
          'before:content-[""] before:absolute before:inset-0 before:bg-white/10 before:animate-pulse':
            !isLoaded,
        },
      )}
      style={
        shouldRenderImage ? { backgroundImage: `url(${smallImageUrl})` } : {}
      }
    >
      {shouldRenderImage ? (
        <Image
          alt={alt}
          className={cn(
            "transition-[opacity,filter] duration-500 ease-out",
            "h-full w-full object-cover object-center",
            imageClassName,
            isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
          )}
          src={src}
          fill
          sizes={sizes}
          loading={loading}
          onLoad={handleLoad}
        />
      ) : null}
    </div>
  );
}
