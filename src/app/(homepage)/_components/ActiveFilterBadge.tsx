import { X } from "lucide-react";

type ActiveFilterBadgeProps = {
  label: string;
  onRemove: () => void;
  variant?: "default" | "bordered";
};

export function ActiveFilterBadge({
  label,
  onRemove,
  variant = "default",
}: ActiveFilterBadgeProps) {
  const baseClassName =
    "inline-flex items-center gap-1 cursor-pointer text-sm transition-colors";
  const variantClassName =
    variant === "bordered"
      ? "rounded-md border border-primary bg-primary/10 px-2 py-1 text-primary hover:bg-primary/15"
      : "text-red-600 hover:underline";

  return (
    <button
      type="button"
      aria-label={`Zrušit filtr ${label}`}
      className={`${baseClassName} ${variantClassName}`}
      onClick={onRemove}
    >
      <X className="h-3 w-3" />
      Zrušit
    </button>
  );
}
