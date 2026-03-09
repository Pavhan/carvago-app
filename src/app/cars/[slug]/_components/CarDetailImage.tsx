'use client';

import { BlurredImage } from '@/components/image/BlurredImage';

type CarDetailImageProps = {
  alt: string;
  src: string;
};

export function CarDetailImage({ alt, src }: CarDetailImageProps) {
  return (
    <BlurredImage
      alt={alt}
      src={src}
      sizes="(min-width: 1024px) 50vw, 100vw"
      wrapperClassName="h-64 lg:min-h-64 lg:h-full"
    />
  );
}
