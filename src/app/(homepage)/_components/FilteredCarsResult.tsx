'use client';

import { CarDetailContent } from '@/app/cars/[slug]/_components/CarDetailContent';
import { CarDetailSkeleton } from '@/app/cars/[slug]/_components/CarDetailSkeleton';
import { Card, CardContent } from '@/components/ui/card';
import type { Car } from '@/drizzle/schema';

type FilteredCarsResultProps = {
  isPending: boolean;
  items: Car[];
};

export function FilteredCarsResult({
  isPending,
  items,
}: FilteredCarsResultProps) {
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CarDetailSkeleton />
        <CarDetailSkeleton />
        <CarDetailSkeleton />
      </div>
    );
  }

  return items.length === 0 ? (
    <Card className="border-0 bg-white/90 shadow-sm">
      <CardContent className="py-8 text-center text-muted-foreground">
        Pro zadané filtry jsme nenašli žádné auto.
      </CardContent>
    </Card>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((car) => (
        <CarDetailContent key={car.id} car={car} variant="list" />
      ))}
    </div>
  );
}
