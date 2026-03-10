import type { ComponentProps } from "react";
import { FormLabel } from "@/components/form/FormLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  triggerClassName?: string;
} & Pick<
  SelectProps,
  "defaultValue" | "name" | "onValueChange" | "required" | "value"
>;

export function FormFieldSelect({
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
  triggerClassName,
}: FormFieldSelectProps) {
  const fieldId = id ?? name;

  return (
    <div className="space-y-2">
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
        <SelectTrigger className={triggerClassName} id={fieldId}>
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
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
