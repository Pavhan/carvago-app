'use client';

import { FormFieldMultiselectSelect } from '@/components/form/FormFieldMultiselectSelect';
import { Card, CardContent } from '@/components/ui/card';
import {
  FUEL_FILTER_OPTIONS,
  TRANSMISSION_FILTER_OPTIONS,
} from '@/lib/car-options';
import type { CarsFilters } from '@/lib/cars';

type CarsFilterProps = {
  activeFilters: CarsFilters;
  filteredCarsCount: number;
  totalCarsCount: number;
};

function toMultiValue(value: string | string[] | undefined) {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return values.flatMap((item) => item.split(',')).filter(Boolean);
}

export function CarsFilter({
  activeFilters,
  filteredCarsCount,
  totalCarsCount,
}: CarsFilterProps) {
  const transmissionValues = toMultiValue(activeFilters.transmission);
  const fuelTypeValues = toMultiValue(activeFilters.fuelType);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold" data-testid="cars-heading">
          Filtrovat podle
        </h2>
        <p className="text-sm text-muted-foreground">
          nalezeno aut {filteredCarsCount} z celkových {totalCarsCount}
        </p>
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
