import { CarsFilter } from '@/app/(homepage)/_components/CarsFilter';
import { getCars } from '@/lib/cars';
import { CarsWithSearch } from './_components/CarsWithSearch';

export default async function Home({ searchParams }: PageProps<'/'>) {
  const params = await searchParams;
  const carList = await getCars(params);

  return (
    <div className="space-y-4">
      <CarsFilter activeFilters={params} />
      <CarsWithSearch cars={carList} />
    </div>
  );
}
