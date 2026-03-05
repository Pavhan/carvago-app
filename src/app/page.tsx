import { CarListItem } from '@/components/cars/CarListItem';
import ItemLoadingSkeleton from '@/components/skeleton/SkeletonCarDetail';
import { getCars } from '@/lib/cars';

export default async function Home() {
  const carList = await getCars();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Auta</h1>
      </div>
      <div className="space-y-4">
        {carList.map((car) => (
          <CarListItem key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
