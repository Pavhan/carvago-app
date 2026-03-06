import { Suspense } from 'react';
import { CarDetailSkeleton } from './_components/CarDetailSkeleton';
import { BackButton } from '@/components/BackButton';
import { CarDetailContent } from './_components/CarDetailContent';

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="space-y-4">
      <BackButton href="/" />
      <Suspense fallback={<CarDetailSkeleton />}>
        <CarDetailContent slug={slug} />
      </Suspense>
    </div>
  );
}
