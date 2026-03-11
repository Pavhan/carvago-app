'use client';

import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useDeferredValue, useState, useTransition } from 'react';
import { CarsResult } from '@/app/(homepage)/_components/CarsResult';
import { CarDetailSkeletonList } from '@/app/cars/[slug]/_components/CarDetailSkeleton';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { LoadingButton } from '@/components/ui/loading-button';
import type { Car } from '@/drizzle/schema';

type CarsWithSearchProps = {
  cars: Car[];
};

export function CarsWithSearch({ cars }: CarsWithSearchProps) {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const router = useRouter();
  const hasSearchValue = search.trim().length > 0;
  const [isPending, startTransition] = useTransition();

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
              setSearch(e.currentTarget.value);
            }}
          />
          {hasSearchValue ? (
            <InputGroupAddon className="pr-1">
              <LoadingButton
                onClick={() => {
                  setSearch('');
                  startTransition(() => {
                    router.push('/?');
                  });
                }}
                loading={isPending}
                size="sm"
                type="button"
                variant="ghost"
              >
                <X width={16} height={16} aria-hidden="true" />
                Clear
              </LoadingButton>
            </InputGroupAddon>
          ) : null}
        </InputGroup>
      </Field>

      <Suspense fallback={<CarDetailSkeletonList />}>
        <CarsResult items={cars} search={deferredSearch} />
      </Suspense>
    </div>
  );
}
