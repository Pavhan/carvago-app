'use client';

import { Cog, Coins, Fuel } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { BlurredImage } from '@/components/image/BlurredImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Car } from '@/drizzle/schema';
import { formatPrice } from '@/helpers/formatPrice';

type CarListItemProps = {
  car: Car;
  index: number;
};

export function CarListItem({ car, index }: CarListItemProps) {
  const style = {
    '--car-item-delay': `${index * 50}ms`,
  } as CSSProperties;

  return (
    <Card
      className="car-list-item-fade overflow-hidden"
      style={style}
      data-testid="car-card"
    >
      <Link
        href={`/cars/${car.slug}`}
        data-testid="car-detail-link"
        className="hover:bg-gray-50 block"
      >
        <div className="grid sm:grid-cols-[200px_1fr] grid-cols-1 gap-4 p-4">
          <BlurredImage
            alt={car.name}
            src={car.imageUrl}
            sizes="(min-width: 640px) 200px, 100vw"
            wrapperClassName="h-30 sm:w-50 bg-neutral-200/80 rounded-md"
            imageClassName="relative z-10"
          />
          <div className="space-y-4">
            <CardHeader className="space-y-4 p-0">
              <CardTitle data-testid="car-title">{car.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm space-y-4">
              <div className="flex items-center flex-wrap justify-between gap-3">
                <span className="inline-flex items-center gap-1">
                  <Cog className="h-3.5 w-3.5 text-muted-foreground" />
                  {car.transmission}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Fuel className="h-3.5 w-3.5 text-muted-foreground" />
                  {car.fuelType}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-lg">
                  <Coins className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatPrice(car.price)}
                </span>
              </div>
            </CardContent>
          </div>
        </div>
      </Link>
    </Card>
  );
}
