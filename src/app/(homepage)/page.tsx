import { CarListItem } from '@/components/cars/CarListItem';

import { getCars } from '@/lib/cars';

export default async function Home() {
  const carList = await getCars();

  return carList.map((car) => <CarListItem key={car.id} car={car} />);
}
