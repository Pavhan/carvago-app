import { CarDetailContent } from '@/app/cars/[slug]/_components/CarDetailContent';
import { getCars } from '@/lib/cars';

export async function CarList() {
  const carList = await getCars();

  return (
    <>
      {carList.map((car) => (
        <CarDetailContent key={car.id} car={car} variant="list" />
      ))}
    </>
  );
}
