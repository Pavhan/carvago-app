import type { Route } from "next";
import { useRouter } from "next/navigation";
import { FormLabel } from "@/components/form/FormLabel";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Field } from "@/components/ui/field";
import type { CarsFilters } from "@/lib/cars";
import { createQueryString } from "@/lib/createQueryString";

type FormFieldMultiselectSelectOption = {
  label: string;
  value: string;
};

type FormFieldMultiselectSelectProps = {
  label: string;
  placeholder: string;
  options: FormFieldMultiselectSelectOption[];
  error?: string;
  defaultValue?: string[];
  name: string;
  onValueChange?: (value: string[]) => void;
  required?: boolean;
  value?: string[];
  searchParams: CarsFilters;
};

export function FormFieldMultiselectSelect({
  label,
  name,
  placeholder,
  options,
  defaultValue,
  value,
  onValueChange,
  error,
  required = false,
  searchParams,
}: FormFieldMultiselectSelectProps) {
  const router = useRouter();
  const selectedValues = value ?? defaultValue ?? [];

  return (
    <Field>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <Combobox
        defaultValue={defaultValue}
        items={options.map((option) => option.value)}
        multiple
        name={name}
        onValueChange={(nextValue) => {
          if (!Array.isArray(nextValue)) return;

          onValueChange?.(nextValue);

          const query = createQueryString(searchParams, {
            name,
            value: nextValue,
          });

          router.push(query as Route);
        }}
        required={required}
        value={value}
      >
        <ComboboxChips className="w-full">
          <ComboboxValue>
            {selectedValues.map((selectedValue) => {
              const option = options.find(
                (optionItem) => optionItem.value === selectedValue,
              );
              if (!option) return null;

              return (
                <ComboboxChip key={option.value} value={option.value}>
                  {option.label}
                </ComboboxChip>
              );
            })}
          </ComboboxValue>
          <ComboboxChipsInput id={name} placeholder={placeholder} />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => {
              const option = options.find(
                (optionItem) => optionItem.value === item,
              );
              if (!option) return null;

              return (
                <ComboboxItem key={option.value} value={option.value}>
                  {option.label}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </Field>
  );
}
