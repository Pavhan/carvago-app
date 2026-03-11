import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';
import { FormLabel } from '@/components/form/FormLabel';
import { Field } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createQueryString } from '@/lib/createQueryString';

type FormFieldSelectOption = {
  label: string;
  value: string;
};

type SelectProps = ComponentProps<typeof Select>;

type FormFieldSelectProps = {
  label: string;
  placeholder: string;
  options: FormFieldSelectOption[];
  error?: string;
  id?: string;
} & Pick<
  SelectProps,
  'defaultValue' | 'name' | 'onValueChange' | 'required' | 'value'
>;

export function FormFieldSelect({
  label,
  name,
  placeholder,
  options,
  defaultValue,
  value,
  error,
  required = false,
  id,
}: FormFieldSelectProps) {
  const fieldId = id ?? name ?? `${label}-select`;

  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Field>
      <FormLabel htmlFor={fieldId} required={required}>
        {label}
      </FormLabel>
      <Select
        defaultValue={defaultValue}
        name={name}
        onValueChange={(value) => {
          console.log('Selected value:', value);
          if (!name) return;
          router.push(
            createQueryString(searchParams, {
              name: name,
              value: value,
            }) as Route,
          );
        }}
        required={required}
        value={value}
      >
        <SelectTrigger className="w-full" id={fieldId}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </Field>
  );
}
