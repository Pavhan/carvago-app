"use client";

import Link from "next/link";
import { FormFieldMultiselectSelect } from "@/components/form/FormFieldMultiselectSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FUEL_FILTER_OPTIONS,
  TRANSMISSION_FILTER_OPTIONS,
} from "@/lib/car-options";
import type { CarsFilters } from "@/lib/cars";


//  CarsFilterProps je typ pro props CarsFilter komponenty
type CarsFilterProps = {
  activeFilters: CarsFilters;
  search: string;
  onResetSearch: (value: string) => void;
};

function toMultiValue(value: string | string[] | undefined) {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return values.flatMap((item) => item.split(",")).filter(Boolean);
}

export function CarsFilter({
  activeFilters,
  search,
  onResetSearch,
}: CarsFilterProps) {
  const transmissionValues = toMultiValue(activeFilters.transmission);
  const fuelTypeValues = toMultiValue(activeFilters.fuelType);
  const hasActiveFilters =
    transmissionValues.length > 0 ||
    fuelTypeValues.length > 0 ||
    search.trim().length > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold" data-testid="cars-heading">
          Filtrovat podle
        </h2>
        {hasActiveFilters ? (
          <div className="flex justify-end">
            <Button variant="destructive" size="sm" asChild>
              <Link
                href="/"
                onClick={() => {
                  onResetSearch("");
                }}
              >
                zrušit filter
              </Link>
            </Button>
          </div>
        ) : null}
        </div>

      <Card className="overflow-visible p-0">
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormFieldMultiselectSelect
              label="Převodovka"
              name="transmission"
              options={[...TRANSMISSION_FILTER_OPTIONS]}
              placeholder="Vyber převodovku"
              value={transmissionValues}
              searchParams={activeFilters}
            />

            <FormFieldMultiselectSelect
              label="Palivo"
              name="fuelType"
              options={[...FUEL_FILTER_OPTIONS]}
              placeholder="Vyber palivo"
              value={fuelTypeValues}
              searchParams={activeFilters}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
