"use client";

import { useDebouncedCallback } from "@tanstack/react-pacer";
import { Search } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { FilteredCarsResult } from "@/app/(homepage)/_components/FilteredCarsResult";
import { FormField } from "@/components/form/FormField";
import { FormLabel } from "@/components/form/FormLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Car } from "@/drizzle/schema";

type CarsFilterPanelProps = {
  cars: Car[];
};

type FilterState = {
  title: string;
  minPrice: string;
  maxPrice: string;
};

const EMPTY_FILTERS: FilterState = {
  title: "",
  minPrice: "",
  maxPrice: "",
};

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
    const minPrice = filters.minPrice === "" ? null : Number(filters.minPrice);
    const maxPrice = filters.maxPrice === "" ? null : Number(filters.maxPrice);
    const title = filters.title.trim().toLocaleLowerCase("cs-CZ");

    return cars.filter((car) => {
      if (title && !car.name.toLocaleLowerCase("cs-CZ").includes(title)) {
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
    filters.title !== "" || filters.minPrice !== "" || filters.maxPrice !== "";

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
      <h1 className="text-3xl font-semibold" data-testid="cars-heading">
        Auta
      </h1>

      <Card className="border-0 bg-white/90 shadow-sm backdrop-blur">
        <CardHeader className="pb-3 flex flex-row items-center justify-between gap-y-3 space-x-0 space-y-0">
          <CardTitle className="text-lg">Filtrovat podle</CardTitle>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {filters.title !== "" ? (
              <Badge variant="secondary">Nadpis: {filters.title}</Badge>
            ) : null}
            {filters.minPrice !== "" ? (
              <Badge variant="secondary">Cena od: {filters.minPrice} Kč</Badge>
            ) : null}
            {filters.maxPrice !== "" ? (
              <Badge variant="secondary">Cena do: {filters.maxPrice} Kč</Badge>
            ) : null}
            {hasActiveFilters ? (
              <Button type="button" variant="outline" onClick={resetFilters}>
                Smazat filtr
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-y-4 gap-x-8 md:grid-cols-2">
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
        </CardContent>
      </Card>

      <FilteredCarsResult isPending={isPending} items={filteredCars} />
    </div>
  );
}
