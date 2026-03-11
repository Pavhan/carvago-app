"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const FILTER_LABELS: Record<string, string> = {
  transmission: "Převodovka",
  fuelType: "Benzín",
};

const FILTER_VALUE_LABELS: Record<string, Record<string, string>> = {
  transmission: {
    manual: "Manuál",
    automat: "Automat",
  },
  fuelType: {
    benzin: "Benzín",
    nafta: "Nafta",
    elektro: "Elektro",
    hybrid: "Hybrid",
  },
};

export function ActiveFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterGroups = new Map<string, string[]>();
  if (searchParams) {
    Array.from(searchParams.entries()).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        if (!filterGroups.has(key)) {
          filterGroups.set(key, []);
        }
        filterGroups.get(key)?.push(value);
      }
    });
  }

  return (
    filterGroups.size > 0 && (
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {Array.from(filterGroups.entries()).map(([key, values]) => {
            const label = FILTER_LABELS[key] ?? key;
            const displayValues = values.map((value) => {
              return FILTER_VALUE_LABELS[key]?.[value] ?? value;
            });

            return (
              <span
                key={key}
                className="bg-primary/20 text-primary inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium"
              >
                <span>{label}: </span>
                <span>{displayValues.join(", ")}</span>
              </span>
            );
          })}
        </div>
        <Button
          onClick={() => {
            router.push("/?");
          }}
          variant="secondary"
          type="button"
        >
          <div className="flex items-center gap-2">
            <X width={16} height={16} aria-hidden="true" />
            Clear
          </div>
        </Button>
      </div>
    )
  );
}
