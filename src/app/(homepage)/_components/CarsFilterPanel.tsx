"use client";

import { ALL_FILTER_OPTION } from "@/components/form/const";
import { FormFieldSelect } from "@/components/form/FormFieldSelect";
import { Card, CardContent } from "@/components/ui/card";
import {
  FUEL_FILTER_OPTIONS,
  TRANSMISSION_FILTER_OPTIONS,
} from "@/lib/car-options";
import type { CarsFilters } from "@/lib/cars";

type CarsFilterPanelProps = {
  activeFilters: CarsFilters;
};

const transmissionSelectOptions = [
  ALL_FILTER_OPTION,
  ...TRANSMISSION_FILTER_OPTIONS,
];

const fuelSelectOptions = [ALL_FILTER_OPTION, ...FUEL_FILTER_OPTIONS];

export function CarsFilterPanel({ activeFilters }: CarsFilterPanelProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold" data-testid="cars-heading">
        Filtrovat podle
      </h2>

      <Card className="border-0 bg-white/90 shadow-sm backdrop-blur p-0">
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <FormFieldSelect
              id="transmission-filter"
              label="Převodovka"
              name="transmission"
              options={transmissionSelectOptions}
              placeholder={ALL_FILTER_OPTION.label}
              value={activeFilters.transmission || ALL_FILTER_OPTION.value}
            />

            <FormFieldSelect
              id="fuel-type-filter"
              label="Palivo"
              name="fuelType"
              options={fuelSelectOptions}
              placeholder={ALL_FILTER_OPTION.label}
              value={activeFilters.fuelType || ALL_FILTER_OPTION.value}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
