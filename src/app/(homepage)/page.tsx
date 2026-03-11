import { CarsFilter } from '@/app/(homepage)/_components/CarsFilter';
import type { CarsFilters } from '@/lib/cars';
import { getCars } from '@/lib/cars';
import { CarsWithSearch } from './_components/CarsWithSearch';

function normalizeTransmission(
  value: string | undefined,
): CarsFilters['transmission'] {
  if (!value) return undefined;
  const normalized = value.toLocaleLowerCase('cs-CZ');
  if (normalized === 'manuál') return 'manual';
  return normalized;
}

function normalizeFuelType(value: string | undefined): CarsFilters['fuelType'] {
  if (!value) return undefined;
  const normalized = value.toLocaleLowerCase('cs-CZ');
  if (normalized === 'benzín') return 'benzin';
  return normalized;
}

export default async function Home({ searchParams }: PageProps<'/'>) {
  const params = await searchParams;
  const transmissionParam = Array.isArray(params.transmission)
    ? params.transmission[0]
    : params.transmission;
  const fuelTypeParam = Array.isArray(params.fuelType)
    ? params.fuelType[0]
    : params.fuelType;

  const activeFilters: CarsFilters = {
    transmission: normalizeTransmission(transmissionParam),
    fuelType: normalizeFuelType(fuelTypeParam),
  };

  const carList = await getCars(activeFilters);

  return (
    <div className="flex flex-col gap-8">
      <CarsFilter activeFilters={activeFilters} />
      <CarsWithSearch cars={carList} />
    </div>
  );
}
