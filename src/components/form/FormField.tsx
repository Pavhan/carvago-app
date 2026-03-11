import type { ComponentProps } from "react";
import { FormLabel } from "@/components/form/FormLabel";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type InputProps = ComponentProps<typeof Input>;

type FormFieldProps = {
  label: string;
  error?: string;
  inputClassName?: string;
} & Pick<
  InputProps,
  | "defaultValue"
  | "id"
  | "max"
  | "min"
  | "name"
  | "onChange"
  | "placeholder"
  | "required"
  | "step"
  | "type"
  | "value"
>;

export function FormField({
  label,
  name,
  id,
  type = "text",
  error,
  required = false,
  defaultValue,
  value,
  onChange,
  min,
  max,
  step,
  placeholder,
  inputClassName,
}: FormFieldProps) {
  const inputId = id ?? name;

  return (
    <Field>
      <FormLabel htmlFor={inputId} required={required}>
        {label}
      </FormLabel>
      <Input
        className={inputClassName}
        defaultValue={defaultValue}
        id={inputId}
        max={max}
        min={min}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
        type={type}
        value={value}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </Field>
  );
}
