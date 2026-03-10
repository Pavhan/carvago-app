'use client';

import { useDebouncedCallback } from '@tanstack/react-pacer';
import { Search } from 'lucide-react';
import { useMemo, useState, useTransition } from 'react';
import { FilteredCarsResult } from '@/app/(homepage)/_components/FilteredCarsResult';
import type { FuelType, Transmission } from '@/components/form/const';
import {
  ALL_FILTER_OPTION,
  FUEL_OPTIONS,
  TRANSMISSION_OPTIONS,
  toSelectOptions,
} from '@/components/form/const';
import { FormFieldSelect } from '@/components/form/FormFieldSelect';
import { FormLabel } from '@/components/form/FormLabel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Car } from '@/drizzle/schema';

type CarsFilterPanelProps = {
  cars: Car[];
};

type FilterState = {
  title: string;
  transmission: Transmission | '';
  fuelType: FuelType | '';
};

const transmissionSelectOptions = [
  ALL_FILTER_OPTION,
  ...toSelectOptions(TRANSMISSION_OPTIONS),
];

const fuelSelectOptions = [ALL_FILTER_OPTION, ...toSelectOptions(FUEL_OPTIONS)];

const EMPTY_FILTERS: FilterState = {
  title: '',
  transmission: '',
  fuelType: '',
};

function isTransmission(value: string): value is Transmission {
  return TRANSMISSION_OPTIONS.includes(value as Transmission);
}

function isFuelType(value: string): value is FuelType {
  return FUEL_OPTIONS.includes(value as FuelType);
}

export function CarsFilterPanel({ cars }: CarsFilterPanelProps) {
  const [inputFilters, setInputFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
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
    const title = filters.title.trim().toLocaleLowerCase('cs-CZ');

    return cars.filter((car) => {
      if (title && !car.name.toLocaleLowerCase('cs-CZ').includes(title)) {
        return false;
      }

      if (
        filters.transmission !== '' &&
        car.transmission !== filters.transmission
      ) {
        return false;
      }

      if (filters.fuelType !== '' && car.fuelType !== filters.fuelType) {
        return false;
      }

      return true;
    });
  }, [cars, filters]);

  const hasActiveFilters =
    filters.title !== '' ||
    filters.transmission !== '' ||
    filters.fuelType !== '';

  function setFiltersDebounced(
    update: (current: FilterState) => FilterState,
  ): void {
    setInputFilters((current) => {
      const nextFilters = update(current);
      commitFilters(nextFilters);
      return nextFilters;
    });
  }

  function resetFilters(): void {
    setInputFilters(EMPTY_FILTERS);
    startTransition(() => {
      setFilters(EMPTY_FILTERS);
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold" data-testid="cars-heading">
          Filtrovat podle
        </h2>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {filters.title !== '' ? <Badge>Nadpis: {filters.title}</Badge> : null}
          {filters.transmission !== '' ? (
            <Badge>Převodovka: {filters.transmission}</Badge>
          ) : null}
          {filters.fuelType !== '' ? (
            <Badge>Palivo: {filters.fuelType}</Badge>
          ) : null}
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={resetFilters}
            >
              Smazat filtr
            </Button>
          ) : null}
        </div>
      </div>

      <Card className="border-0 bg-white/90 shadow-sm backdrop-blur p-0">
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <FormLabel htmlFor="title-filter">Nadpis</FormLabel>
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

            <FormFieldSelect
              id="transmission-filter"
              label="Převodovka"
              name="transmission"
              onValueChange={(value) =>
                setFiltersDebounced((current) => ({
                  ...current,
                  transmission:
                    value === ALL_FILTER_OPTION.value
                      ? ''
                      : isTransmission(value)
                        ? value
                        : '',
                }))
              }
              options={transmissionSelectOptions}
              placeholder={ALL_FILTER_OPTION.label}
              value={inputFilters.transmission || ALL_FILTER_OPTION.value}
            />

            <FormFieldSelect
              id="fuel-type-filter"
              label="Palivo"
              name="fuelType"
              onValueChange={(value) =>
                setFiltersDebounced((current) => ({
                  ...current,
                  fuelType:
                    value === ALL_FILTER_OPTION.value
                      ? ''
                      : isFuelType(value)
                        ? value
                        : '',
                }))
              }
              options={fuelSelectOptions}
              placeholder={ALL_FILTER_OPTION.label}
              value={inputFilters.fuelType || ALL_FILTER_OPTION.value}
            />
          </div>
        </CardContent>
      </Card>

      <FilteredCarsResult isPending={isPending} items={filteredCars} />
    </div>
  );
}
