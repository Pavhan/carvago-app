'use client';

import Image from 'next/image';
import { useBlurredImage } from '@/hooks/useBlurredImage';
import { cn } from '@/lib/utils';

type BlurredImageProps = {
  alt: string;
  src: string;
  sizes: string;
  wrapperClassName: string;
  imageClassName?: string;
  loading?: 'lazy' | 'eager';
};

export function BlurredImage({
  alt,
  src,
  sizes,
  wrapperClassName,
  imageClassName,
  loading = 'lazy',
}: BlurredImageProps) {
  const { isLoaded, smallImageUrl, handleLoad } = useBlurredImage(src);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-cover bg-center bg-no-repeat',
        wrapperClassName,
        {
          'before:content-[""] before:absolute before:inset-0 before:bg-white/10 before:animate-pulse':
            !isLoaded,
        },
      )}
      style={{ backgroundImage: `url(${smallImageUrl})` }}
    >
      <Image
        alt={alt}
        className={cn(
          'transition-[opacity,filter] duration-500 ease-out',
          'h-full w-full object-cover object-center',
          imageClassName,
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
        )}
        src={src}
        fill
        sizes={sizes}
        loading={loading}
        onLoad={handleLoad}
      />
    </div>
  );
}
