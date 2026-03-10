export type Transmission = 'Manuál' | 'Automat';
export type FuelType = 'Benzín' | 'Nafta' | 'Elektro' | 'Hybrid';

export const ALL_FILTER_OPTION = { label: 'Všechny', value: 'all' } as const;

export const TRANSMISSION_OPTIONS: Transmission[] = ['Manuál', 'Automat'];
export const FUEL_OPTIONS: FuelType[] = [
  'Benzín',
  'Nafta',
  'Elektro',
  'Hybrid',
];

export function toSelectOptions(values: readonly string[]) {
  return values.map((value) => ({
    label: value,
    value,
  }));
}
