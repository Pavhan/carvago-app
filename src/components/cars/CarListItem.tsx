import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Car } from '@/db/schema';
import { formatPrice } from '@/helpers/formatPrice';

type CarListItemProps = {
  car: Car;
};

export function CarListItem({ car }: CarListItemProps) {
  return (
    <Card>
      <div className="flex gap-4 p-4">
        <div className="shrink-0">
          <Image
            alt={car.name}
            className="h-30 w-auto rounded-md object-cover"
            src={car.imageUrl}
            width={200}
            height={120}
            style={{ height: 120, width: 'auto' }}
          />
        </div>
        <div className="min-w-0 flex-1">
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
          <CardContent className="flex items-center justify-between gap-3 p-0 text-sm">
            <span>{car.mileageKm} km</span>
            <span>{car.fuelType}</span>
            <span>{formatPrice(car.totalPriceCzk)}</span>
            <Button asChild>
              <Link href={`/cars/${car.slug}`}>Detail</Link>
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
