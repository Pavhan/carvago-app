import {
  FUEL_OPTIONS,
  type FuelType,
  TRANSMISSION_OPTIONS,
  type Transmission,
} from "@/lib/car-options";

export { FUEL_OPTIONS, TRANSMISSION_OPTIONS, type FuelType, type Transmission };

export function toSelectOptions(values: readonly string[]) {
  return values.map((value) => ({
    label: value,
    value,
  }));
}
