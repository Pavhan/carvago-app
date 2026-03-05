export default function ItemLoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-105">
          <div className="aspect-4/3 w-full rounded-xl bg-neutral-200/80" />
          <div className="mt-3 flex items-center gap-2">
            <div className="h-2.5 w-16 rounded-full bg-neutral-200/80" />
            <div className="h-2.5 w-10 rounded-full bg-neutral-200/80" />
            <div className="h-2.5 w-14 rounded-full bg-neutral-200/80" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="h-7 w-4/5 rounded-full bg-neutral-200/80" />

          <div className="flex flex-wrap gap-3">
            <div className="h-5 w-20 rounded-full bg-neutral-200/80" />
            <div className="h-5 w-20 rounded-full bg-neutral-200/80" />
            <div className="h-5 w-24 rounded-full bg-neutral-200/80" />
            <div className="h-5 w-16 rounded-full bg-neutral-200/80" />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="h-8 w-36 rounded-xl bg-neutral-200/80" />
            <div className="h-8 w-28 rounded-xl bg-neutral-200/80" />
            <div className="h-8 w-40 rounded-xl bg-neutral-200/80" />
            <div className="h-8 w-44 rounded-xl bg-neutral-200/80" />
            <div className="h-8 w-16 rounded-xl bg-neutral-200/80" />
          </div>

          <div className="h-px w-full bg-neutral-200/80" />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="h-4 w-48 rounded-full bg-neutral-200/80" />
              <div className="h-6 w-28 rounded-full bg-neutral-200/80" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-40 rounded-full bg-neutral-200/80" />
              <div className="h-6 w-32 rounded-full bg-neutral-200/80" />
            </div>

            <div className="space-y-2 lg:text-right">
              <div className="h-7 w-36 rounded-full bg-neutral-200/80" />
              <div className="h-4 w-24 rounded-full bg-neutral-200/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
