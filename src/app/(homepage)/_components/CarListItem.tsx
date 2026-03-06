'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Car } from '@/drizzle/schema';
import { formatPrice } from '@/helpers/formatPrice';
import { useBlurredImage } from '@/hooks/useBlurredImage';
import { Coins, Fuel, Gauge } from 'lucide-react';
import type { CSSProperties } from 'react';

type CarListItemProps = {
  car: Car;
  index: number;
};

export function CarListItem({ car, index }: CarListItemProps) {
  const { isLoaded, smallImageUrl, handleLoad } = useBlurredImage(car.imageUrl);
  const style = {
    '--car-item-delay': `${index * 50}ms`,
  } as CSSProperties;

  const wrapperClassName = isLoaded
    ? 'relative w-full h-30 sm:w-50 bg-neutral-200/80 rounded-md overflow-hidden bg-cover bg-center bg-no-repeat'
    : 'relative w-full h-30 sm:w-50 bg-neutral-200/80 rounded-md overflow-hidden bg-cover bg-center bg-no-repeat before:content-[""] before:absolute before:inset-0 before:bg-white/10 before:animate-pulse';

  const wrapperStyle = {
    backgroundImage: `url(${smallImageUrl})`,
  } as CSSProperties;

  const fullImageClassName = isLoaded
    ? 'relative z-10 h-full w-full object-cover object-center opacity-100 blur-0'
    : 'relative z-10 h-full w-full object-cover object-center opacity-0 blur-sm';

  return (
    <Card className="car-list-item-fade" style={style}>
      <div className="grid sm:grid-cols-[200px_1fr] grid-cols-1 gap-4 p-4">
        <div className={wrapperClassName} style={wrapperStyle}>
          <Image
            alt={car.name}
            className={`transition-[opacity,filter] duration-500 ease-out ${fullImageClassName}`}
            src={car.imageUrl}
            fill
            sizes="(min-width: 640px) 200px, 100vw"
            loading="lazy"
            onLoadingComplete={handleLoad}
          />
        </div>
        <div className="space-y-4">
          <CardHeader className="space-y-4 p-0">
            <CardTitle>{car.name}</CardTitle>
            <div className="flex flex-wrap gap-2">
              {car.equipmentTags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="flex items-center flex-wrap justify-between gap-3 p-0 text-sm">
            <span className="inline-flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
              {car.mileageKm} km
            </span>
            <span className="inline-flex items-center gap-1">
              <Fuel className="h-3.5 w-3.5 text-muted-foreground" />
              {car.fuelType}
            </span>
            <span className="inline-flex items-center gap-1">
              <Coins className="h-3.5 w-3.5 text-muted-foreground" />
              {formatPrice(car.totalPriceCzk)}
            </span>
            <Button asChild className="w-full sm:w-auto">
              <Link href={`/cars/${car.slug}`}>Detail</Link>
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
