import { CarListItem } from '@/components/cars/CarListItem';
import { HomePageLayout } from '@/components/layout/HomePageLayout';
import { getCars } from '@/lib/cars';

export default async function Home() {
  const carList = await getCars();

  return (
    <HomePageLayout>
      {carList.map((car) => (
        <CarListItem key={car.id} car={car} />
      ))}
    </HomePageLayout>
  );
}
