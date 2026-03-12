import type { ComponentProps } from "react";
import { FormLabel } from "@/components/form/FormLabel";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type InputProps = ComponentProps<typeof Input>;

type FormFieldProps = {
  label: string;
  error?: string;
  inputClassName?: string;
  name: string;
} & Pick<
  InputProps,
  "defaultValue" | "onChange" | "placeholder" | "required" | "type" | "value"
>;

export function FormField({
  label,
  name,
  type = "text",
  error,
  required = false,
  defaultValue,
  value,
  onChange,
  placeholder,
  inputClassName,
}: FormFieldProps) {
  return (
    <Field>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <Input
        className={inputClassName}
        defaultValue={defaultValue}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </Field>
  );
}
