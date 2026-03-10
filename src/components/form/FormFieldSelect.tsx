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

type FormFieldSelectProps = {
  label: string;
  name: string;
  placeholder: string;
  options: FormFieldSelectOption[];
  defaultValue?: string;
  error?: string;
  required?: boolean;
  id?: string;
};

export function FormFieldSelect({
  label,
  name,
  placeholder,
  options,
  defaultValue,
  error,
  required = false,
  id,
}: FormFieldSelectProps) {
  const fieldId = id ?? name;

  return (
    <div className="space-y-2">
      <FormLabel htmlFor={fieldId} required={required}>
        {label}
      </FormLabel>
      <Select defaultValue={defaultValue} name={name} required={required}>
        <SelectTrigger id={fieldId}>
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
