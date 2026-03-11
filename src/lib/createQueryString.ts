import { CarsFilters } from '@/lib/cars';

function normalizeFilterValues(
  value: string | string[] | { value: string }[],
): string[] {
  const rawValues = Array.isArray(value)
    ? value.map((item) => {
        return typeof item === 'string' ? item : item.value;
      })
    : [value];

  const values = rawValues
    .flatMap((item) => {
      return item.split(',').map((part) => {
        return part.trim();
      });
    })
    .filter((item) => item.length > 0);

  return Array.from(new Set(values));
}

export function createQueryString(
  searchParams: CarsFilters,
  {
    name,
    value,
  }: { name: string; value: string | string[] | { value: string }[] },
) {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(name);

  const values = normalizeFilterValues(value);

  if (values.length > 0) {
    params.set(name, values.join(','));
  }

  return `?${params.toString()}`;
}
