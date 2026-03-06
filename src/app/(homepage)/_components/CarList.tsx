import { CarListItem } from '@/app/(homepage)/_components/CarListItem';
import { getCars } from '@/lib/cars';

export async function CarList() {
  const carList = await getCars();
  return (
    <>
      {carList.map((car) => (
        <CarListItem key={car.id} car={car} />
      ))}
    </>
  );
}
