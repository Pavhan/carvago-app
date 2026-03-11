'use client';

import { CarDetailContent } from '@/app/cars/[slug]/_components/CarDetailContent';
import { Card, CardContent } from '@/components/ui/card';
import type { Car } from '@/drizzle/schema';

type FilteredCarsResultProps = {
  items: Car[];
  search: string;
};

export function FilteredCarsResult({ items, search }: FilteredCarsResultProps) {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredCarsnam = items.filter((item) => {
    return item.name.toLowerCase().includes(normalizedSearch);
  });

  if (filteredCarsnam.length === 0)
    return (
      <Card className="border-0 bg-white/90 shadow-sm">
        <CardContent className="py-8 text-center text-muted-foreground">
          Pro zadané filtry jsme nenašli žádné auto.
        </CardContent>
      </Card>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCarsnam.map((car) => (
        <CarDetailContent key={car.id} car={car} variant="list" />
      ))}
    </div>
  );
}
