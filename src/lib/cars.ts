import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { cars } from "@/drizzle/schema";
import { sleep } from "@/helpers/sleep";
import {
  FUEL_FILTER_VALUE_TO_LABEL,
  TRANSMISSION_FILTER_VALUE_TO_LABEL,
} from "@/lib/car-options";

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

function normalizeFilterValues(value: string | string[] | undefined): string[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];

  return values
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function processFilterValues(
  value: string | string[] | undefined,
  map: Record<string, string | undefined>,
): string[] | undefined {
  const mapped = normalizeFilterValues(value)
    .map((v) => map[v.toLocaleLowerCase("cs-CZ")])
    .filter((v): v is string => v !== undefined);

  return mapped.length > 0 ? Array.from(new Set(mapped)) : undefined;
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
