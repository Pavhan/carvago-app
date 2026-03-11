import { and, desc, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { cars } from "@/drizzle/schema";
import { sleep } from "@/helpers/sleep";
import {
  FUEL_FILTER_VALUE_TO_LABEL,
  TRANSMISSION_FILTER_VALUE_TO_LABEL,
} from "@/lib/car-options";

export type CarsFilters = {
  transmission?: string;
  fuelType?: string;
};

const TRANSMISSION_FILTER_MAP: Record<string, string | undefined> = {
  all: undefined,
  ...TRANSMISSION_FILTER_VALUE_TO_LABEL,
};

const FUEL_FILTER_MAP: Record<string, string | undefined> = {
  all: undefined,
  ...FUEL_FILTER_VALUE_TO_LABEL,
};

function mapFilterValue(
  value: string | undefined,
  map: Record<string, string | undefined>,
): string | undefined {
  if (!value) return undefined;
  return map[value.toLocaleLowerCase("cs-CZ")];
}

export async function getCars(filters?: CarsFilters) {
  // throw new Error('Simulovaná chyba');
  await sleep(1000);

  const transmissionFilter = mapFilterValue(
    filters?.transmission,
    TRANSMISSION_FILTER_MAP,
  );
  const fuelTypeFilter = mapFilterValue(filters?.fuelType, FUEL_FILTER_MAP);

  const whereClause = and(
    transmissionFilter ? eq(cars.transmission, transmissionFilter) : undefined,
    fuelTypeFilter ? eq(cars.fuelType, fuelTypeFilter) : undefined,
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
