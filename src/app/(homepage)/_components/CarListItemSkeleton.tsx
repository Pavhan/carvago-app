import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function CarListItemSkeleton() {
  return Array.from({ length: 2 }).map((_, index) => (
    <Card key={index} className="animate-pulse">
      <div className="grid md:grid-cols-[200px_1fr] grid-cols-1 gap-4 items-center p-4">
        <div className="h-30 w-50 rounded-md bg-neutral-200/80" />
        <div>
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
  ));
}
