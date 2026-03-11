import type * as React from "react";

import { cn } from "@/lib/utils";

type LabelProps = Omit<React.ComponentProps<"label">, "htmlFor"> & {
  htmlFor: string;
};

function Label({ className, htmlFor, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      htmlFor={htmlFor}
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
