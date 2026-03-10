"use client";

import { CarListItem } from "@/app/(homepage)/_components/CarListItem";
import { CarListItemSkeleton } from "@/app/(homepage)/_components/CarListItemSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import type { Car } from "@/drizzle/schema";

type FilteredCarsResultProps = {
  isPending: boolean;
  items: Car[];
};

export function FilteredCarsResult({
  isPending,
  items,
}: FilteredCarsResultProps) {
  if (isPending) {
    return (
      <div className="space-y-4">
        <CarListItemSkeleton />
        <CarListItemSkeleton />
        <CarListItemSkeleton />
      </div>
    );
  }

  return (
    <>
      {!isPending && items.length === 0 ? (
        <Card className="border-0 bg-white/90 shadow-sm">
          <CardContent className="py-8 text-center text-muted-foreground">
            Pro zadané filtry jsme nenašli žádné auto.
          </CardContent>
        </Card>
      ) : null}

      {!isPending
        ? items.map((car, index) => (
            <CarListItem key={car.id} car={car} index={index} />
          ))
        : null}
    </>
  );
}
