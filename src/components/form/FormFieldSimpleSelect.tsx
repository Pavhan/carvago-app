import { FormLabel } from "@/components/form/FormLabel";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormFieldSimpleSelectOption = {
  label: string;
  value: string;
};

type FormFieldSimpleSelectProps = {
  label: string;
  placeholder: string;
  options: FormFieldSimpleSelectOption[];
  error?: string;
  id?: string;
  defaultValue?: string;
  name?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  value?: string;
};

export function FormFieldSimpleSelect({
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
}: FormFieldSimpleSelectProps) {
  const fieldId = id ?? name ?? `${label}-select`;

  return (
    <Field>
      <FormLabel htmlFor={fieldId} required={required}>
        {label}
      </FormLabel>
      <Select
        defaultValue={defaultValue}
        name={name}
        onValueChange={onValueChange}
        required={required}
        value={value}
      >
        <SelectTrigger className="w-full" id={fieldId}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </Field>
  );
}
