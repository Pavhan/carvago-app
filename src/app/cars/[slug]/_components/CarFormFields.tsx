import { FormField } from "@/components/form/FormField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type CarFormValues = {
  name: string;
  imageUrl: string;
  mileageKm: number;
  firstRegistration: string;
  powerKw: number;
  powerHp: number;
  transmission: string;
  fuelType: string;
  locationCountry: string;
  deliveryPriceCzk: number;
  monthlyPaymentCzk: number;
  totalPriceCzk: number;
  vatPriceCzk: number;
  priceRatingLabel: string;
  partnerLabel: string;
  equipmentTags: string;
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
      <FormField
        defaultValue={defaultValues?.mileageKm}
        error={fieldErrors?.mileageKm?.[0]}
        label="Nájezd (km)"
        name="mileageKm"
        required
        type="number"
      />
      <FormField
        defaultValue={defaultValues?.firstRegistration}
        error={fieldErrors?.firstRegistration?.[0]}
        label="První registrace (MM/RRRR)"
        name="firstRegistration"
        required
      />
      <FormField
        defaultValue={defaultValues?.powerKw}
        error={fieldErrors?.powerKw?.[0]}
        label="Výkon (kW)"
        name="powerKw"
        required
        type="number"
      />
      <FormField
        defaultValue={defaultValues?.powerHp}
        error={fieldErrors?.powerHp?.[0]}
        label="Výkon (hp)"
        name="powerHp"
        required
        type="number"
      />
      <FormField
        defaultValue={defaultValues?.transmission}
        error={fieldErrors?.transmission?.[0]}
        label="Převodovka"
        name="transmission"
        required
      />
      <FormField
        defaultValue={defaultValues?.fuelType}
        error={fieldErrors?.fuelType?.[0]}
        label="Palivo"
        name="fuelType"
        required
      />
      <FormField
        defaultValue={defaultValues?.locationCountry}
        error={fieldErrors?.locationCountry?.[0]}
        label="Země"
        name="locationCountry"
        required
      />
      <FormField
        defaultValue={defaultValues?.deliveryPriceCzk}
        error={fieldErrors?.deliveryPriceCzk?.[0]}
        label="Doručení (Kč)"
        name="deliveryPriceCzk"
        required
        type="number"
      />
      <FormField
        defaultValue={defaultValues?.monthlyPaymentCzk}
        error={fieldErrors?.monthlyPaymentCzk?.[0]}
        label="Měsíční splátka (Kč)"
        name="monthlyPaymentCzk"
        required
        type="number"
      />
      <FormField
        defaultValue={defaultValues?.totalPriceCzk}
        error={fieldErrors?.totalPriceCzk?.[0]}
        label="Celková cena (Kč)"
        name="totalPriceCzk"
        required
        type="number"
      />
      <FormField
        defaultValue={defaultValues?.vatPriceCzk}
        error={fieldErrors?.vatPriceCzk?.[0]}
        label="Cena bez DPH (Kč)"
        name="vatPriceCzk"
        required
        type="number"
      />
      <FormField
        defaultValue={defaultValues?.priceRatingLabel}
        error={fieldErrors?.priceRatingLabel?.[0]}
        label="Hodnocení ceny"
        name="priceRatingLabel"
        required
      />
      <FormField
        defaultValue={defaultValues?.partnerLabel}
        error={fieldErrors?.partnerLabel?.[0]}
        label="Partner label"
        name="partnerLabel"
        required
      />

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="equipmentTags">Výbava (odděl čárkou)</Label>
        <Textarea
          defaultValue={defaultValues?.equipmentTags}
          id="equipmentTags"
          name="equipmentTags"
          required
        />
        {fieldErrors?.equipmentTags?.[0] && (
          <p className="text-sm text-red-600">{fieldErrors.equipmentTags[0]}</p>
        )}
      </div>
    </>
  );
}
