import { Card } from '@/components/ui/card';

export function CarDetailSkeleton() {
  return <CarDetailSkeletonItem />;
}

export function CarDetailSkeletonList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CarDetailSkeletonItem />
      <CarDetailSkeletonItem />
      <CarDetailSkeletonItem />
    </div>
  );
}

function CarDetailSkeletonItem() {
  return (
    <Card className="h-full overflow-hidden p-4 animate-pulse @container">
      <div className="grid grid-cols-1 gap-6 @md:grid-cols-[50%_1fr]">
        <div className="h-64 rounded-md bg-neutral-200/80 lg:min-h-64 lg:h-full" />

        <div className="flex h-full flex-col space-y-4">
          <div className="h-7 w-4/5 rounded-full bg-neutral-200/80" />

          <div className="flex grow flex-col space-y-4">
            <div className="grow space-y-4">
              <div className="h-5 w-40 rounded-full bg-neutral-200/80" />
              <div className="h-5 w-32 rounded-full bg-neutral-200/80" />
            </div>

            <div className="flex items-end justify-between gap-4">
              <div className="h-8 w-52 rounded-full bg-neutral-200/80" />
              <div className="h-9 w-24 rounded-md bg-neutral-200/80" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
