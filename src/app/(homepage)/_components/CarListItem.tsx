'use client';

import { Coins, Fuel, Gauge } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { BlurredImage } from '@/components/image/BlurredImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <Card className="car-list-item-fade" style={style} data-testid="car-card">
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
              <Link href={`/cars/${car.slug}`} data-testid="car-detail-link">
                Detail
              </Link>
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
