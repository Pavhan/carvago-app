import {
  Cog,
  Coins,
  Fuel,
  Pencil,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CarDetailImage } from '@/app/cars/[slug]/_components/CarDetailImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/helpers/formatPrice';
import { getCarBySlug } from '@/lib/cars';

export async function CarDetailContent({ slug }: { slug: string }) {
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-x-4 lg:grid-cols-2">
        <CarDetailImage alt={car.name} src={car.imageUrl} />
        <div>
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl" data-testid="car-title">
              {car.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 text-sm md:text-base">
              <p className="inline-flex items-center gap-2">
                <Cog className="h-4 w-4 text-muted-foreground" />
                Převodovka: {car.transmission}
              </p>
              <p className="inline-flex items-center gap-2">
                <Fuel className="h-4 w-4 text-muted-foreground" />
                Palivo: {car.fuelType}
              </p>
            </div>
            <p
              className="inline-flex items-center gap-2 text-xl font-semibold"
              data-testid="car-price"
            >
              <Coins className="h-4 w-4 text-muted-foreground" />
              Cena: {formatPrice(car.price)}
            </p>
            <div className="pt-2">
              <Button asChild size="sm" type="button" variant="outline">
                <Link href={`/cars/${car.slug}/edit`}>
                  <Pencil className="h-4 w-4" />
                  Upravit
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
