import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BackButton } from '@/components/BackButton';
import { getCarBySlug } from '@/lib/cars';
import { CarDetailContent } from './_components/CarDetailContent';
import { CarDetailSkeleton } from './_components/CarDetailSkeleton';
import { CarUpdatedToast } from './_components/CarUpdatedToast';

export { generateMetadata } from './generateMetadata';

async function CarDetailContentLoader({ slug }: { slug: string }) {
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return <CarDetailContent car={car} variant="detail" />;
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="space-y-4">
      <CarUpdatedToast />
      <BackButton href="/" />
      <Suspense fallback={<CarDetailSkeleton />}>
        <CarDetailContentLoader slug={slug} />
      </Suspense>
    </div>
  );
}
