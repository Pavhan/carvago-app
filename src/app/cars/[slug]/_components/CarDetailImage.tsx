"use client";

import { BlurredImage } from "@/components/image/BlurredImage";

type CarDetailImageProps = {
  alt: string;
  loading?: "eager" | "lazy";
  sizes?: string;
  src: string;
  wrapperClassName?: string;
};

export function CarDetailImage({
  alt,
  loading = "lazy",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  src,
  wrapperClassName = "h-64 lg:min-h-64 lg:h-full",
}: CarDetailImageProps) {
  return (
    <BlurredImage
      alt={alt}
      loading={loading}
      src={src}
      sizes={sizes}
      wrapperClassName={wrapperClassName}
    />
  );
}
