"use client";

import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useDeferredValue, useState, ViewTransition } from "react";
import { FilteredCarsResult } from "@/app/(homepage)/_components/FilteredCarsResult";
import { CarDetailSkeleton } from "@/app/cars/[slug]/_components/CarDetailSkeleton";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { Car } from "@/drizzle/schema";

import { ActiveFilters } from "./ActiveFilters";

type CarsWithSearchProps = {
  cars: Car[];
};

export function CarsWithSearch({ cars }: CarsWithSearchProps) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const searchParams = useSearchParams();

  return (
    <div className="space-y-5">
      <Field>
        <FieldLabel className="sr-only" htmlFor="title-filter">
          Hledat auto
        </FieldLabel>
        <InputGroup className="bg-white">
          <InputGroupAddon>
            <SearchIcon className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput
            id="title-filter"
            value={search}
            placeholder="Např. Audi, Tesla..."
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
        </InputGroup>
      </Field>

      <ActiveFilters />

      <Suspense
        fallback={
          <ViewTransition exit="slide-down">
            <CarDetailSkeleton />
          </ViewTransition>
        }
      >
        <ViewTransition
          key={searchParams.toString()}
          enter="slide-up"
          exit="slide-down"
          default="none"
        >
          <FilteredCarsResult items={cars} search={deferredSearch} />
        </ViewTransition>
      </Suspense>
    </div>
  );
}
