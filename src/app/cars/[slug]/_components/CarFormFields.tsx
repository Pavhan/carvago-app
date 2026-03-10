import { FormField } from "@/components/form/FormField";
import { FormFieldSelect } from "@/components/form/FormFieldSelect";

type Transmission = "Manuál" | "Automat";
type FuelType = "Benzín" | "Nafta" | "Elektro" | "Hybrid";

const TRANSMISSION_OPTIONS: Transmission[] = ["Manuál", "Automat"];
const FUEL_OPTIONS: FuelType[] = ["Benzín", "Nafta", "Elektro", "Hybrid"];

const toSelectOptions = (values: string[]) =>
  values.map((value) => ({
    label: value,
    value,
  }));

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
    <>
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

      <FormFieldSelect
        defaultValue={defaultValues?.transmission}
        error={fieldErrors?.transmission?.[0]}
        label="Převodovka"
        name="transmission"
        options={toSelectOptions(TRANSMISSION_OPTIONS)}
        placeholder="Vyber převodovku"
        required
      />

      <FormFieldSelect
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
        min={1}
        name="price"
        required
        step={1000}
        type="number"
      />
    </>
  );
}
