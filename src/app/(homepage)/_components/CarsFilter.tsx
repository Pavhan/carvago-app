'use client';

import { FormFieldSelect } from '@/components/form/FormFieldSelect';
import { Card, CardContent } from '@/components/ui/card';
import {
  FUEL_FILTER_OPTIONS,
  TRANSMISSION_FILTER_OPTIONS,
} from '@/lib/car-options';
import type { CarsFilters } from '@/lib/cars';

type CarsFilterProps = {
  activeFilters: CarsFilters;
};

function toMultiValue(value: string | string[] | undefined) {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return values.flatMap((item) => item.split(',')).filter(Boolean);
}

export function CarsFilter({ activeFilters }: CarsFilterProps) {
  const transmissionValues = toMultiValue(activeFilters.transmission);
  const fuelTypeValues = toMultiValue(activeFilters.fuelType);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold" data-testid="cars-heading">
        Filtrovat podle
      </h2>

      <Card className="overflow-visible p-0">
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormFieldSelect
              id="transmission-filter"
              label="Převodovka"
              name="transmission"
              options={[...TRANSMISSION_FILTER_OPTIONS]}
              placeholder="Vyber převodovku"
              value={transmissionValues}
            />

            <FormFieldSelect
              id="fuel-type-filter"
              label="Palivo"
              name="fuelType"
              options={[...FUEL_FILTER_OPTIONS]}
              placeholder="Vyber palivo"
              value={fuelTypeValues}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
