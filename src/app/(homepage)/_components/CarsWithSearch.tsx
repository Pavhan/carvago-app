'use client';

import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useDeferredValue, useState, ViewTransition } from 'react';
import { FilteredCarsResult } from '@/app/(homepage)/_components/FilteredCarsResult';
import { Input } from '@/components/ui/input';
import type { Car } from '@/drizzle/schema';

import { CarDetailSkeleton } from '@/app/cars/[slug]/_components/CarDetailSkeleton';

import { ActiveFilters } from './ActiveFilters';

type CarsWithSearchProps = {
  cars: Car[];
};

export function CarsWithSearch({ cars }: CarsWithSearchProps) {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const searchParams = useSearchParams();

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="title-filter"
          className="bg-white pl-10"
          value={search}
          placeholder="Např. Audi, Tesla..."
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />
      </div>

      <ActiveFilters />

      <Suspense
        fallback={
          <ViewTransition exit="slide-down">
            <CarDetailSkeleton />
          </ViewTransition>
        }
      >
        <ViewTransition
          key={searchParams.toString()}
          enter="slide-up"
          exit="slide-down"
          default="none"
        >
          <FilteredCarsResult items={cars} search={deferredSearch} />
        </ViewTransition>
      </Suspense>
    </div>
  );
}
