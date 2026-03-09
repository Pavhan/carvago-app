'use client';

import { useDebouncedCallback } from '@tanstack/react-pacer';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState, useTransition } from 'react';
import { ActiveFilterBadge } from '@/app/(homepage)/_components/ActiveFilterBadge';
import { FilteredCarsResult } from '@/app/(homepage)/_components/FilteredCarsResult';
import { FormField } from '@/components/form/FormField';
import { FormLabel } from '@/components/form/FormLabel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Car } from '@/drizzle/schema';

type CarsFilterPanelProps = {
  cars: Car[];
};

type FilterState = {
  title: string;
  minPrice: string;
  maxPrice: string;
};

const EMPTY_FILTERS: FilterState = {
  title: '',
  minPrice: '',
  maxPrice: '',
};

export function CarsFilterPanel({ cars }: CarsFilterPanelProps) {
  const [inputFilters, setInputFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const commitFilters = useDebouncedCallback(
    (nextFilters: FilterState) => {
      startTransition(() => {
        setFilters(nextFilters);
      });
    },
    {
      wait: 300,
    },
  );

  const filteredCars = useMemo(() => {
    const minPrice = filters.minPrice === '' ? null : Number(filters.minPrice);
    const maxPrice = filters.maxPrice === '' ? null : Number(filters.maxPrice);
    const title = filters.title.trim().toLocaleLowerCase('cs-CZ');

    return cars.filter((car) => {
      if (title && !car.name.toLocaleLowerCase('cs-CZ').includes(title)) {
        return false;
      }

      if (
        minPrice !== null &&
        !Number.isNaN(minPrice) &&
        car.totalPriceCzk < minPrice
      ) {
        return false;
      }

      if (
        maxPrice !== null &&
        !Number.isNaN(maxPrice) &&
        car.totalPriceCzk > maxPrice
      ) {
        return false;
      }

      return true;
    });
  }, [cars, filters]);

  const hasActiveFilters =
    filters.title !== '' || filters.minPrice !== '' || filters.maxPrice !== '';

  function setFiltersDebounced(
    update: (current: FilterState) => FilterState,
  ): void {
    setInputFilters((current) => {
      const nextFilters = update(current);
      commitFilters(nextFilters);
      return nextFilters;
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold" data-testid="cars-heading">
          Auta
        </h1>
        <Button
          type="button"
          variant="outline"
          className="inline-flex items-center gap-2"
          onClick={() => setIsFiltersOpen((current) => !current)}
          aria-expanded={isFiltersOpen}
          aria-controls="cars-filters-panel"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {isFiltersOpen ? 'Skrýt filtry' : 'Zobrazit filtry'}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>

      {isFiltersOpen ? (
        <Card
          id="cars-filters-panel"
          className="border-0 bg-white/90 shadow-sm backdrop-blur"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filtrovat podle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="title-filter">Nadpis</FormLabel>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="title-filter"
                    className="bg-white pl-10"
                    value={inputFilters.title}
                    placeholder="Např. Audi, Tesla..."
                    onChange={(event) =>
                      setFiltersDebounced((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  id="min-price"
                  inputClassName="bg-white"
                  label="Cena od (Kč)"
                  min={0}
                  name="minPrice"
                  step={1000}
                  type="number"
                  value={inputFilters.minPrice}
                  onChange={(event) =>
                    setFiltersDebounced((current) => ({
                      ...current,
                      minPrice: event.target.value,
                    }))
                  }
                />
                <FormField
                  id="max-price"
                  inputClassName="bg-white"
                  label="Cena do (Kč)"
                  min={0}
                  name="maxPrice"
                  step={1000}
                  type="number"
                  value={inputFilters.maxPrice}
                  onChange={(event) =>
                    setFiltersDebounced((current) => ({
                      ...current,
                      maxPrice: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            {hasActiveFilters ? (
              <div className="flex flex-wrap items-center gap-2">
                {filters.title !== '' ? (
                  <ActiveFilterBadge
                    label={`Nadpis: ${filters.title}`}
                    onRemove={() =>
                      setFiltersDebounced((current) => ({
                        ...current,
                        title: '',
                      }))
                    }
                  />
                ) : null}

                {filters.minPrice !== '' ? (
                  <ActiveFilterBadge
                    label={`Cena od: ${filters.minPrice} Kč`}
                    onRemove={() =>
                      setFiltersDebounced((current) => ({
                        ...current,
                        minPrice: '',
                      }))
                    }
                  />
                ) : null}

                {filters.maxPrice !== '' ? (
                  <ActiveFilterBadge
                    label={`Cena do: ${filters.maxPrice} Kč`}
                    onRemove={() =>
                      setFiltersDebounced((current) => ({
                        ...current,
                        maxPrice: '',
                      }))
                    }
                  />
                ) : null}

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="underline"
                  onClick={() => setFiltersDebounced(() => EMPTY_FILTERS)}
                >
                  Zrušit vše
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <FilteredCarsResult
        isPending={isPending}
        items={filteredCars}
        showFilterResult={hasActiveFilters}
      />
    </div>
  );
}
