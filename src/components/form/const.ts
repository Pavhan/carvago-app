import { FUEL_OPTIONS, TRANSMISSION_OPTIONS } from "@/lib/car-options";

export { FUEL_OPTIONS, TRANSMISSION_OPTIONS };

export function toSelectOptions(values: readonly string[]) {
  return values.map((value) => ({
    label: value,
    value,
  }));
}
