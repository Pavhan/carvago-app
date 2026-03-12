import type { CarsFilters } from "@/lib/cars";

function normalizeFilterValues(value: string | string[]): string[] {
  const rawValues = Array.isArray(value) ? value : [value];

  const values = rawValues
    .flatMap((item) => {
      return item.split(",").map((part) => {
        return part.trim();
      });
    })
    .filter((item) => item.length > 0);

  return Array.from(new Set(values));
}

function toUrlSearchParams(searchParams: CarsFilters): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, rawValue]) => {
    if (!rawValue) return;

    const values = normalizeFilterValues(rawValue);
    if (values.length === 0) return;

    params.set(key, values.join(","));
  });

  return params;
}

export function createQueryString(
  searchParams: CarsFilters,
  { name, value }: { name: string; value: string | string[] },
) {
  const params = toUrlSearchParams(searchParams);
  params.delete(name);

  const values = normalizeFilterValues(value);

  if (values.length > 0) {
    params.set(name, values.join(","));
  }

  return `?${params.toString()}`;
}
