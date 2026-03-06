import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Car } from '@/drizzle/schema';
import { formatPrice } from '@/helpers/formatPrice';
import { Coins, Fuel, Gauge } from 'lucide-react';

type CarListItemProps = {
  car: Car;
};

export function CarListItem({ car }: CarListItemProps) {
  return (
    <Card>
      <div className="grid sm:grid-cols-[200px_1fr] grid-cols-1 gap-4 p-4">
        <div className="w-full h-30 sm:w-50 bg-neutral-200/80 rounded-md overflow-hidden">
          <Image
            alt={car.name}
            className=" w-full h-auto object-cover"
            src={car.imageUrl}
            width={200}
            height={120}
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
