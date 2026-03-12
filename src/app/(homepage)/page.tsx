import type { Metadata } from 'next';
import { HomePageContent } from '@/app/(homepage)/_components/HomePageContent';
import { getCars, getCarsCount } from '@/lib/cars';

export const metadata: Metadata = {
  title: 'Carvago | Přehled aut',
  description: 'Prohlédněte si nabídku dostupných aut na Carvago.',
};

export default async function Home({ searchParams }: PageProps<'/'>) {
  const params = await searchParams;
  const carList = await getCars(params);

  return <HomePageContent activeFilters={params} cars={carList} />;
}
