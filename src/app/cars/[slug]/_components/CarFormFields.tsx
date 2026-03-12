import {
  FUEL_OPTIONS,
  TRANSMISSION_OPTIONS,
  toSelectOptions,
} from "@/components/form/const";
import { FormField } from "@/components/form/FormField";
import { FormFieldSimpleSelect } from "@/components/form/FormFieldSimpleSelect";

export type CarFormValues = {
  name: string;
  imageUrl: string;
  transmission: string;
  fuelType: string;
  price: number;
};

type CarFormFieldsProps = {
  fieldErrors?: Record<string, string[]>;
  defaultValues?: CarFormValues;
};

export function CarFormFields({
  fieldErrors,
  defaultValues,
}: CarFormFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <FormField
        defaultValue={defaultValues?.name}
        error={fieldErrors?.name?.[0]}
        label="Název"
        name="name"
        required
      />

      <FormField
        defaultValue={defaultValues?.imageUrl}
        error={fieldErrors?.imageUrl?.[0]}
        label="URL obrázku"
        name="imageUrl"
        required
      />

      <FormFieldSimpleSelect
        defaultValue={defaultValues?.transmission}
        error={fieldErrors?.transmission?.[0]}
        label="Převodovka"
        name="transmission"
        options={toSelectOptions(TRANSMISSION_OPTIONS)}
        placeholder="Vyber převodovku"
        required
      />

      <FormFieldSimpleSelect
        defaultValue={defaultValues?.fuelType}
        error={fieldErrors?.fuelType?.[0]}
        label="Palivo"
        name="fuelType"
        options={toSelectOptions(FUEL_OPTIONS)}
        placeholder="Vyber palivo"
        required
      />

      <FormField
        defaultValue={defaultValues?.price}
        error={fieldErrors?.price?.[0]}
        label="Cena (Kč)"
        name="price"
        required
        type="number"
      />
    </div>
  );
}
