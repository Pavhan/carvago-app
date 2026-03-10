'use client';

import { useDebouncedCallback } from '@tanstack/react-pacer';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState, useTransition } from 'react';
import { ActiveFilterBadge } from '@/app/(homepage)/_components/ActiveFilterBadge';
import { FilteredCarsResult } from '@/app/(homepage)/_components/FilteredCarsResult';
import { FormField } from '@/components/form/FormField';
import { FormLabel } from '@/components/form/FormLabel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import type { Car } from '@/drizzle/schema';
import { Button } from '@/components/ui/button';

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
        car.price < minPrice
      ) {
        return false;
      }

      if (
        maxPrice !== null &&
        !Number.isNaN(maxPrice) &&
        car.price > maxPrice
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
      <Collapsible open={isFiltersOpen}>
        <CollapsibleTrigger asChild>
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
        </CollapsibleTrigger>

        <CollapsibleContent id="cars-filters-panel" className="space-y-5 pt-5">
          <Card className="border-0 bg-white/90 shadow-sm backdrop-blur">
            <CardHeader className="pb-3 flex flex-row items-center justify-between gap-y-3 space-x-0 space-y-0">
              <CardTitle className="text-lg">Filtrovat podle</CardTitle>

              {hasActiveFilters ? (
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm text-muted-foreground"
                    aria-live="polite"
                  >
                    Nalezeno aut: {filteredCars.length}
                  </p>
                </div>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-y-4 gap-x-8 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <FormLabel htmlFor="title-filter">Nadpis</FormLabel>
                    {filters.title !== '' ? (
                      <ActiveFilterBadge
                        label="nadpis"
                        onRemove={() =>
                          setFiltersDebounced((current) => ({
                            ...current,
                            title: '',
                          }))
                        }
                      />
                    ) : null}
                  </div>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
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
                  >
                    {filters.minPrice !== '' ? (
                      <ActiveFilterBadge
                        label="cena od"
                        onRemove={() =>
                          setFiltersDebounced((current) => ({
                            ...current,
                            minPrice: '',
                          }))
                        }
                      />
                    ) : null}
                  </FormField>

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
                  >
                    {filters.maxPrice !== '' ? (
                      <ActiveFilterBadge
                        label="Cena do"
                        onRemove={() =>
                          setFiltersDebounced((current) => ({
                            ...current,
                            maxPrice: '',
                          }))
                        }
                      />
                    ) : null}
                  </FormField>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <FilteredCarsResult isPending={isPending} items={filteredCars} />
    </div>
  );
}
