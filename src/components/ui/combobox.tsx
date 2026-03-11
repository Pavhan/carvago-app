"use client";

import { CheckIcon, XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type ComboboxValueType = string | string[];

type ComboboxContextValue = {
  items: string[];
  multiple: boolean;
  selected: string[];
  query: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  setQuery: (value: string) => void;
  selectItem: (item: string) => void;
  removeItem: (item: string) => void;
};

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

function useComboboxContext(component: string) {
  const context = React.useContext(ComboboxContext);

  if (!context) {
    throw new Error(`${component} must be used within Combobox`);
  }

  return context;
}

function normalizeValue(value: ComboboxValueType | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

type ComboboxProps = {
  items: string[];
  multiple?: boolean;
  value?: ComboboxValueType;
  defaultValue?: ComboboxValueType;
  onValueChange?: (value: ComboboxValueType) => void;
  name?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Combobox({
  items,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  name,
  required = false,
  className,
  children,
}: ComboboxProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string[]>(() =>
    normalizeValue(defaultValue),
  );
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const selected = isControlled ? normalizeValue(value) : internalValue;

  React.useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const setSelected = React.useCallback(
    (nextSelected: string[]) => {
      if (!isControlled) {
        setInternalValue(nextSelected);
      }

      if (!onValueChange) return;

      if (multiple) {
        onValueChange(nextSelected);
        return;
      }

      onValueChange(nextSelected[0] ?? "");
    },
    [isControlled, multiple, onValueChange],
  );

  const selectItem = React.useCallback(
    (item: string) => {
      if (multiple) {
        const next = selected.includes(item)
          ? selected.filter((current) => current !== item)
          : [...selected, item];

        setSelected(next);
        setQuery("");
        return;
      }

      setSelected([item]);
      setOpen(false);
      setQuery("");
    },
    [multiple, selected, setSelected],
  );

  const removeItem = React.useCallback(
    (item: string) => {
      setSelected(selected.filter((current) => current !== item));
    },
    [selected, setSelected],
  );

  const contextValue = React.useMemo(
    () => ({
      items,
      multiple,
      selected,
      query,
      open,
      setOpen,
      setQuery,
      selectItem,
      removeItem,
    }),
    [items, multiple, selected, query, open, selectItem, removeItem],
  );

  return (
    <ComboboxContext.Provider value={contextValue}>
      <div className={cn("relative", className)} ref={rootRef}>
        {name &&
          (multiple ? (
            selected.map((selectedItem, index) => (
              <input
                key={selectedItem}
                name={name}
                required={required && index === 0}
                type="hidden"
                value={selectedItem}
              />
            ))
          ) : (
            <input
              name={name}
              required={required}
              type="hidden"
              value={selected[0] ?? ""}
            />
          ))}
        {children}
      </div>
    </ComboboxContext.Provider>
  );
}

function ComboboxChips({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-10 w-full flex-wrap items-center gap-2 rounded-lg border border-input px-3 py-2",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxValue({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap gap-2", className)} {...props} />;
}

type ComboboxChipProps = React.ComponentProps<"span"> & {
  value?: string;
};

function ComboboxChip({
  value,
  className,
  children,
  ...props
}: ComboboxChipProps) {
  const { removeItem } = useComboboxContext("ComboboxChip");

  const chipValue =
    value ?? (typeof children === "string" ? children : undefined);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm",
        className,
      )}
      {...props}
    >
      {children}
      {chipValue ? (
        <button
          aria-label={`Remove ${chipValue}`}
          className="rounded-sm text-muted-foreground transition hover:text-foreground"
          onClick={(event) => {
            event.preventDefault();
            removeItem(chipValue);
          }}
          type="button"
        >
          <XIcon className="size-3" />
        </button>
      ) : null}
    </span>
  );
}

function ComboboxChipsInput({
  className,
  onFocus,
  onChange,
  ...props
}: React.ComponentProps<"input">) {
  const { query, setQuery, setOpen } = useComboboxContext("ComboboxChipsInput");

  return (
    <input
      className={cn(
        "h-7 min-w-28 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground",
        className,
      )}
      onChange={(event) => {
        setQuery(event.target.value);
        setOpen(true);
        onChange?.(event);
      }}
      onFocus={(event) => {
        setOpen(true);
        onFocus?.(event);
      }}
      value={query}
      {...props}
    />
  );
}

function ComboboxContent({ className, ...props }: React.ComponentProps<"div">) {
  const { open } = useComboboxContext("ComboboxContent");

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 w-full rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxEmpty({ className, ...props }: React.ComponentProps<"div">) {
  const { items, query } = useComboboxContext("ComboboxEmpty");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  if (filteredItems.length > 0) return null;

  return (
    <div
      className={cn("px-2 py-2 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

type ComboboxListProps = Omit<React.ComponentProps<"div">, "children"> & {
  children: (item: string) => React.ReactNode;
};

function ComboboxList({ className, children, ...props }: ComboboxListProps) {
  const { items, query } = useComboboxContext("ComboboxList");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className={cn("max-h-64 overflow-auto", className)} {...props}>
      {filteredItems.map((item) => children(item))}
    </div>
  );
}

type ComboboxItemProps = React.ComponentProps<"button"> & {
  value: string;
};

function ComboboxItem({
  value,
  className,
  children,
  ...props
}: ComboboxItemProps) {
  const { selected, selectItem } = useComboboxContext("ComboboxItem");
  const isSelected = selected.includes(value);

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground",
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        selectItem(value);
      }}
      type="button"
      {...props}
    >
      <span>{children}</span>
      {isSelected ? <CheckIcon className="size-4" /> : null}
    </button>
  );
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
};
