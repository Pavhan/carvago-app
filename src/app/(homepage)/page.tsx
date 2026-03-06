import { Suspense } from 'react';
import { CarListItemSkeleton } from './_components/CarListItemSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '@/components/error/ErrorPage';
import { CarList } from './_components/CarList';

export default async function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold" data-testid="cars-heading">
        Auta
      </h1>
      <div className="space-y-4">
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense fallback={<CarListItemSkeleton />}>
            <CarList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
