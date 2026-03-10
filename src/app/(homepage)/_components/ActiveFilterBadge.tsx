import { X } from 'lucide-react';

type ActiveFilterBadgeProps = {
  label: string;
  onRemove: () => void;
};

export function ActiveFilterBadge({ label, onRemove }: ActiveFilterBadgeProps) {
  return (
    <button
      type="button"
      aria-label={`Zrušit filtr ${label}`}
      className="inline-flex items-center gap-1 hover:underline cursor-pointer text-sm text-red-600"
      onClick={onRemove}
    >
      <X className="h-3 w-3" />
      Zrušit
    </button>
  );
}
