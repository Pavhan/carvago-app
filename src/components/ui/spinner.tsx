import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <Loader2Icon
      aria-hidden="true"
      className={cn("size-5 animate-spin text-muted-foreground", className)}
    />
  );
}
