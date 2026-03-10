'use client';

import { CarListItemSkeleton } from '@/app/(homepage)/_components/CarListItemSkeleton';
import { CarDetailContent } from '@/app/cars/[slug]/_components/CarDetailContent';
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
      <div className="space-y-4">
        <CarListItemSkeleton />
        <CarListItemSkeleton />
        <CarListItemSkeleton />
      </div>
    );
  }

  return (
    <>
      {!isPending && items.length === 0 ? (
        <Card className="border-0 bg-white/90 shadow-sm">
          <CardContent className="py-8 text-center text-muted-foreground">
            Pro zadané filtry jsme nenašli žádné auto.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isPending
          ? items.map((car) => (
              <CarDetailContent key={car.id} car={car} variant="list" />
            ))
          : null}
      </div>
    </>
  );
}
