import { and, desc, eq, inArray } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { cars } from '@/drizzle/schema';
import { sleep } from '@/helpers/sleep';
import {
  FUEL_FILTER_VALUE_TO_LABEL,
  TRANSMISSION_FILTER_VALUE_TO_LABEL,
} from '@/lib/car-options';

export type CarsFilters = {
  transmission?: string | string[];
  fuelType?: string | string[];
};

const TRANSMISSION_FILTER_MAP: Record<string, string | undefined> = {
  all: undefined,
  ...TRANSMISSION_FILTER_VALUE_TO_LABEL,
};

const FUEL_FILTER_MAP: Record<string, string | undefined> = {
  all: undefined,
  ...FUEL_FILTER_VALUE_TO_LABEL,
};

function processFilterValues(
  value: string | string[] | undefined,
  map: Record<string, string | undefined>,
): string[] | undefined {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const mapped = values
    .map((v) => map[v.toLocaleLowerCase('cs-CZ')])
    .filter((v): v is string => v !== undefined);
  return mapped.length > 0 ? mapped : undefined;
}

export async function getCars(filters?: CarsFilters) {
  const transmissionValues = processFilterValues(
    filters?.transmission,
    TRANSMISSION_FILTER_MAP,
  );
  const fuelTypeValues = processFilterValues(
    filters?.fuelType,
    FUEL_FILTER_MAP,
  );

  const whereClause = and(
    transmissionValues
      ? inArray(cars.transmission, transmissionValues)
      : undefined,
    fuelTypeValues ? inArray(cars.fuelType, fuelTypeValues) : undefined,
  );

  return db
    .select()
    .from(cars)
    .where(whereClause)
    .orderBy(desc(cars.createdAt));
}

export async function getCarBySlug(slug: string) {
  await sleep(1000);
  const [car] = await db
    .select()
    .from(cars)
    .where(eq(cars.slug, slug))
    .limit(1);
  return car;
}
