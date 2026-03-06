'use client';

import Image from 'next/image';
import { useBlurredImage } from '@/hooks/useBlurredImage';

type CarDetailImageProps = {
  alt: string;
  src: string;
};

export function CarDetailImage({ alt, src }: CarDetailImageProps) {
  const { isLoaded, smallImageUrl, handleLoad } = useBlurredImage(src);

  const wrapperClassName = isLoaded
    ? 'relative h-64 lg:min-h-64 lg:h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat'
    : 'relative h-64 lg:min-h-64 lg:h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat before:content-[""] before:absolute before:inset-0 before:bg-white/10 before:animate-pulse';

  const imageClassName = isLoaded
    ? 'h-full w-full object-cover object-center opacity-100 blur-0'
    : 'h-full w-full object-cover object-center opacity-0 blur-sm';

  return (
    <div className={wrapperClassName} style={{ backgroundImage: `url(${smallImageUrl})` }}>
      <Image
        alt={alt}
        className={`transition-[opacity,filter] duration-500 ease-out ${imageClassName}`}
        src={src}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        loading="lazy"
        onLoadingComplete={handleLoad}
      />
    </div>
  );
}
