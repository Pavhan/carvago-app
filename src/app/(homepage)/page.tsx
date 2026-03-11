import { CarsFilter } from "@/app/(homepage)/_components/CarsFilter";
import { getCars, getCarsCount } from "@/lib/cars";
import { CarsWithSearch } from "./_components/CarsWithSearch";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const [carList, totalCarsCount] = await Promise.all([
    getCars(params),
    getCarsCount(),
  ]);

  return (
    <div className="space-y-4">
      <CarsFilter
        activeFilters={params}
        filteredCarsCount={carList.length}
        totalCarsCount={totalCarsCount}
      />
      <CarsWithSearch cars={carList} />
    </div>
  );
}
