import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function Spinner({ className, width, height }: SpinnerProps) {
  const shouldUseDefaultSize = width === undefined && height === undefined;

  return (
    <Loader2Icon
      aria-hidden="true"
      className={cn(
        shouldUseDefaultSize ? "size-5" : undefined,
        "animate-spin text-muted-foreground",
        className,
      )}
      width={width}
      height={height}
    />
  );
}
