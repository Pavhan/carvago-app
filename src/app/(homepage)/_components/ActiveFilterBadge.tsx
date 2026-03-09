import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ActiveFilterBadgeProps = {
  label: string;
  onRemove: () => void;
};

export function ActiveFilterBadge({ label, onRemove }: ActiveFilterBadgeProps) {
  return (
    <Badge variant="secondary" className="h-7 gap-1 rounded-full px-2">
      {label}
      <button
        type="button"
        aria-label={`Zrušit filtr ${label}`}
        className="inline-flex rounded-full p-0.5 hover:bg-black/10"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}
