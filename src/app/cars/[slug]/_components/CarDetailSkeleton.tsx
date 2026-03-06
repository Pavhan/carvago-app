export function CarDetailSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-full min-h-64 w-full bg-neutral-200/80" />

        <div className="space-y-4 p-6">
          <div className="h-7 w-4/5 rounded-full bg-neutral-200/80" />

          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-28 rounded-full bg-neutral-200/80" />
            <div className="h-6 w-24 rounded-full bg-neutral-200/80" />
            <div className="h-6 w-28 rounded-full bg-neutral-200/80" />
            <div className="h-6 w-20 rounded-full bg-neutral-200/80" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-4 w-36 rounded-full bg-neutral-200/80" />
            <div className="h-4 w-40 rounded-full bg-neutral-200/80" />
            <div className="h-4 w-44 rounded-full bg-neutral-200/80" />
            <div className="h-4 w-32 rounded-full bg-neutral-200/80" />
            <div className="h-4 w-28 rounded-full bg-neutral-200/80" />
            <div className="h-4 w-24 rounded-full bg-neutral-200/80" />
          </div>

          <div className="h-px w-full bg-neutral-200/80" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="h-4 w-36 rounded-full bg-neutral-200/80" />
            <div className="h-4 w-32 rounded-full bg-neutral-200/80" />
            <div className="h-6 w-40 rounded-full bg-neutral-200/80" />
            <div className="h-4 w-32 rounded-full bg-neutral-200/80" />
            <div className="h-4 w-24 rounded-full bg-neutral-200/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
