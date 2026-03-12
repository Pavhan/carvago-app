'use client';

import { useState } from 'react';
import { CarsFilter } from '@/app/(homepage)/_components/CarsFilter';
import { CarsWithSearch } from '@/app/(homepage)/_components/CarsWithSearch';
import type { Car } from '@/drizzle/schema';
import type { CarsFilters } from '@/lib/cars';

type HomePageContentProps = {
  activeFilters: CarsFilters;
  cars: Car[];
};

export function HomePageContent({ activeFilters, cars }: HomePageContentProps) {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-4">
      <CarsFilter
        activeFilters={activeFilters}
        onResetSearch={setSearch}
        search={search}
      />
      <CarsWithSearch cars={cars} search={search} onSearchChange={setSearch} />
    </div>
  );
}
