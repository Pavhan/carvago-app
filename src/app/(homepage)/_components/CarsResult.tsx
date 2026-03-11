'use client';

import { CarDetailContent } from '@/app/cars/[slug]/_components/CarDetailContent';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import type { Car } from '@/drizzle/schema';

type CarsResultProps = {
  items: Car[];
  search: string;
};

export function CarsResult({ items, search }: CarsResultProps) {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredCarsnam = items.filter((item) => {
    return (
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.transmission.toLowerCase().includes(normalizedSearch) ||
      item.fuelType.toLowerCase().includes(normalizedSearch)
    );
  });

  if (filteredCarsnam.length === 0)
    return (
      <Empty className="bg-white/90 shadow-sm border-0">
        <EmptyHeader>
          <EmptyTitle>Žádné výsledky</EmptyTitle>
          <EmptyDescription>
            Pro zadané filtry jsme nenašli žádné auto.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCarsnam.map((car) => (
        <CarDetailContent key={car.id} car={car} variant="list" />
      ))}
    </div>
  );
}
