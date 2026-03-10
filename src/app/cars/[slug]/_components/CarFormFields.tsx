import { FormField } from "@/components/form/FormField";
import { FormLabel } from "@/components/form/FormLabel";

type Transmission = "Manuál" | "Automat";
type FuelType = "Benzín" | "Nafta" | "Elektro" | "Hybrid";

const TRANSMISSION_OPTIONS: Transmission[] = ["Manuál", "Automat"];
const FUEL_OPTIONS: FuelType[] = ["Benzín", "Nafta", "Elektro", "Hybrid"];

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

export function CarFormFields({ fieldErrors, defaultValues }: CarFormFieldsProps) {
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

      <div className="space-y-2">
        <div className="flex justify-between">
          <FormLabel htmlFor="transmission" required>
            Převodovka
          </FormLabel>
        </div>
        <select
          className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          defaultValue={defaultValues?.transmission ?? ""}
          id="transmission"
          name="transmission"
          required
        >
          <option value="">Vyber převodovku</option>
          {TRANSMISSION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {fieldErrors?.transmission?.[0] && (
          <p className="text-sm text-red-600">{fieldErrors.transmission[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <FormLabel htmlFor="fuelType" required>
            Palivo
          </FormLabel>
        </div>
        <select
          className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          defaultValue={defaultValues?.fuelType ?? ""}
          id="fuelType"
          name="fuelType"
          required
        >
          <option value="">Vyber palivo</option>
          {FUEL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {fieldErrors?.fuelType?.[0] && (
          <p className="text-sm text-red-600">{fieldErrors.fuelType[0]}</p>
        )}
      </div>

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
