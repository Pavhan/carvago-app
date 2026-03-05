import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function SkeletonCarListItem() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <div className="flex gap-4 p-4">
            <div className="h-30 w-50 shrink-0 rounded-md bg-neutral-200/80" />
            <div className="min-w-0 flex-1">
              <CardHeader className="space-y-4 p-0">
                <div className="h-6 w-3/5 rounded-full bg-neutral-200/80" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-20 rounded-full bg-neutral-200/80" />
                  <div className="h-6 w-24 rounded-full bg-neutral-200/80" />
                  <div className="h-6 w-16 rounded-full bg-neutral-200/80" />
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3 p-0">
                <div className="h-4 w-20 rounded-full bg-neutral-200/80" />
                <div className="h-4 w-16 rounded-full bg-neutral-200/80" />
                <div className="h-4 w-24 rounded-full bg-neutral-200/80" />
                <div className="h-9 w-24 rounded-md bg-neutral-200/80" />
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
