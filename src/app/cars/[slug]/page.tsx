import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BackButton } from '@/components/BackButton';
import { getCarBySlug } from '@/lib/cars';
import { CarDetailContent } from './_components/CarDetailContent';
import { CarDetailSkeleton } from './_components/CarDetailSkeleton';

export const metadata: Metadata = {
  title: 'Detail auta | Carvago',
  description: 'Detail vozidla v administraci Carvago.',
};

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <BackButton href="/" />
      <Suspense fallback={<CarDetailSkeleton />}>
        <CarDetailContent car={car} variant="detail" />
      </Suspense>
    </div>
  );
}
