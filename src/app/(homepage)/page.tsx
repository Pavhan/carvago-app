import { CarsFilterPanel } from "@/app/(homepage)/_components/CarsFilterPanel";
import { getCars } from "@/lib/cars";

export default async function Home() {
  const carList = await getCars();

  return <CarsFilterPanel cars={carList} />;
}
