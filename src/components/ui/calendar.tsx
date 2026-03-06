"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "w-fit",
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex w-full flex-col gap-4",
        nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        month_caption: "flex h-7 w-full items-center justify-center px-7",
        caption_label: "truncate text-sm font-medium",
        dropdowns:
          "flex h-7 items-center justify-center gap-1.5 text-sm font-medium",
        dropdown_root:
          "relative inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-sm shadow-xs focus-within:border-neutral-900",
        dropdown: "absolute inset-0 opacity-0",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "text-neutral-500 flex-1 rounded-md text-center text-[0.8rem] font-normal",
        weeks: "mt-2",
        week: "mt-2 flex w-full",
        day: "h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        selected:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50",
        today: "bg-neutral-100 text-neutral-900",
        outside:
          "text-neutral-500 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500",
        disabled: "text-neutral-500 opacity-50",
        hidden: "invisible",
        chevron: "inline-block size-4 shrink-0 align-middle",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...iconProps }) =>
          orientation === "left" ? (
            <ChevronLeftIcon className="h-4 w-4" {...iconProps} />
          ) : (
            <ChevronRightIcon className="h-4 w-4" {...iconProps} />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
