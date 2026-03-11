import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
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
  id?: string;
  defaultValue?: string[];
  name?: string;
  onValueChange?: (value: string[]) => void;
  required?: boolean;
  value?: string[];
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
  id,
}: FormFieldMultiselectSelectProps) {
  const fieldId = id ?? name ?? `${label}-select`;
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedValues = value ?? defaultValue ?? [];

  return (
    <Field>
      <FormLabel htmlFor={fieldId} required={required}>
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

          if (!name) return;

          router.push(
            createQueryString(searchParams, {
              name,
              value: nextValue,
            }) as Route,
          );
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
          <ComboboxChipsInput id={fieldId} placeholder={placeholder} />
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
