'use client';

import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useDeferredValue, useTransition } from 'react';
import { CarsResult } from '@/app/(homepage)/_components/CarsResult';
import { CarDetailSkeletonList } from '@/app/cars/[slug]/_components/CarDetailSkeleton';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import type { Car } from '@/drizzle/schema';

type CarsWithSearchProps = {
  cars: Car[];
  search: string;
  onSearchChange: (value: string) => void;
};

export function CarsWithSearch({
  cars,
  search,
  onSearchChange,
}: CarsWithSearchProps) {
  const deferredSearch = useDeferredValue(search);

  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel className="sr-only" htmlFor="title-filter">
          Hledat auto
        </FieldLabel>
        <InputGroup className="bg-white">
          <InputGroupAddon>
            <SearchIcon className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput
            id="title-filter"
            value={search}
            placeholder="Např. Audi, Tesla..."
            onChange={(e) => {
              onSearchChange(e.currentTarget.value);
            }}
          />
        </InputGroup>
      </Field>

      <Suspense fallback={<CarDetailSkeletonList />}>
        <CarsResult items={cars} search={deferredSearch} />
      </Suspense>
    </div>
  );
}
