export const TRANSMISSION_OPTIONS = ["Manuál", "Automat"] as const;
export type Transmission = (typeof TRANSMISSION_OPTIONS)[number];

export const FUEL_OPTIONS = ["Benzín", "Nafta", "Elektro", "Hybrid"] as const;
export type FuelType = (typeof FUEL_OPTIONS)[number];

type FilterOption = {
  label: string;
  value: string;
};

function createFilterValueToLabelMap(
  options: readonly FilterOption[],
  aliases?: Record<string, string>,
) {
  return {
    ...Object.fromEntries(options.map(({ value, label }) => [value, label])),
    ...aliases,
  };
}

export const TRANSMISSION_FILTER_OPTIONS = [
  { label: "Manuál", value: "manual" },
  { label: "Automat", value: "automat" },
] as const;

export const FUEL_FILTER_OPTIONS = [
  { label: "Benzín", value: "benzin" },
  { label: "Nafta", value: "nafta" },
  { label: "Elektro", value: "elektro" },
  { label: "Hybrid", value: "hybrid" },
] as const;

export const TRANSMISSION_FILTER_VALUE_TO_LABEL = createFilterValueToLabelMap(
  TRANSMISSION_FILTER_OPTIONS,
  {
    manuál: "Manuál",
  },
);

export const FUEL_FILTER_VALUE_TO_LABEL = createFilterValueToLabelMap(
  FUEL_FILTER_OPTIONS,
  {
    benzín: "Benzín",
  },
);
