"use client";

import { CalendarIcon, CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { FormField } from "@/components/form/FormField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const FUEL_OPTIONS = [
  "Benzín",
  "Diesel",
  "Elektro",
  "Hybrid",
  "Plug-in hybrid",
  "LPG",
  "CNG",
] as const;

const TRANSMISSION_OPTIONS = ["Automat", "Manuál"] as const;

const EUROPEAN_COUNTRY_OPTIONS = [
  "Albánie",
  "Andorra",
  "Belgie",
  "Bělorusko",
  "Bosna a Hercegovina",
  "Bulharsko",
  "Černá Hora",
  "Česko",
  "Dánsko",
  "Estonsko",
  "Finsko",
  "Francie",
  "Chorvatsko",
  "Irsko",
  "Island",
  "Itálie",
  "Kypr",
  "Lichtenštejnsko",
  "Litva",
  "Lotyšsko",
  "Lucembursko",
  "Maďarsko",
  "Malta",
  "Moldavsko",
  "Monako",
  "Německo",
  "Nizozemsko",
  "Norsko",
  "Polsko",
  "Portugalsko",
  "Rakousko",
  "Rumunsko",
  "Řecko",
  "San Marino",
  "Severní Makedonie",
  "Slovensko",
  "Slovinsko",
  "Srbsko",
  "Španělsko",
  "Švédsko",
  "Švýcarsko",
  "Ukrajina",
  "Vatikán",
  "Velká Británie",
] as const;

const EQUIPMENT_TAG_OPTIONS = [
  "TOP výbava",
  "360° parkovací kamera",
  "Regulace tuhosti podvozku",
  "Matrix LED",
  "Adaptivní tempomat",
  "Vyhřívaná sedadla",
  "Quattro",
  "Virtual Cockpit",
  "Apple CarPlay",
  "Tepelné čerpadlo",
  "360° kamera",
  "Nabíjení DC",
  "xDrive",
  "M Sport",
  "Head-up displej",
  "4MATIC",
  "Multibeam LED",
  "Bezklíčové odemykání",
  "AWD",
  "Autopilot",
  "Pilot Assist",
  "Panoramatická střecha",
  "Plug-in hybrid",
  "i-Cockpit",
] as const;

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

function parseMonthYear(value?: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  const match = /^(\d{2})\/(\d{4})$/.exec(value);

  if (!match) {
    return undefined;
  }

  const month = Number(match[1]);
  const year = Number(match[2]);

  if (month < 1 || month > 12) {
    return undefined;
  }

  return new Date(year, month - 1, 1);
}

function formatMonthYear(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${month}/${date.getFullYear()}`;
}

function parseEquipmentTags(value?: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function CarFormFields({
  fieldErrors,
  defaultValues,
}: CarFormFieldsProps) {
  const [firstRegistrationDate, setFirstRegistrationDate] = useState(() =>
    parseMonthYear(defaultValues?.firstRegistration),
  );
  const [firstRegistrationValue, setFirstRegistrationValue] = useState(
    defaultValues?.firstRegistration ?? "",
  );
  const [transmissionValue, setTransmissionValue] = useState(
    defaultValues?.transmission ?? "",
  );
  const [fuelTypeValue, setFuelTypeValue] = useState(
    defaultValues?.fuelType ?? "",
  );
  const [locationCountryValue, setLocationCountryValue] = useState(
    defaultValues?.locationCountry ?? "",
  );
  const [equipmentTagsValue, setEquipmentTagsValue] = useState(() =>
    parseEquipmentTags(defaultValues?.equipmentTags),
  );
  const equipmentTagOptions = [
    ...new Set([...EQUIPMENT_TAG_OPTIONS, ...equipmentTagsValue]),
  ];

  function toggleEquipmentTag(tag: string) {
    setEquipmentTagsValue((currentValue) => {
      if (currentValue.includes(tag)) {
        return currentValue.filter((item) => item !== tag);
      }

      return [...currentValue, tag];
    });
  }

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
      <div className="space-y-2">
        <Label htmlFor="firstRegistration">První registrace</Label>
        <input
          id="firstRegistration"
          name="firstRegistration"
          type="hidden"
          value={firstRegistrationValue}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !firstRegistrationValue && "text-neutral-500",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {firstRegistrationValue || "Vyber měsíc a rok"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              selected={firstRegistrationDate}
              onSelect={(date) => {
                setFirstRegistrationDate(date);
                setFirstRegistrationValue(date ? formatMonthYear(date) : "");
              }}
              captionLayout="dropdown"
              fromYear={1990}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
        {fieldErrors?.firstRegistration?.[0] && (
          <p className="text-sm text-red-600">
            {fieldErrors.firstRegistration[0]}
          </p>
        )}
      </div>
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

      <div className="space-y-2">
        <Label htmlFor="transmission">Převodovka</Label>
        <input name="transmission" type="hidden" value={transmissionValue} />
        <Select value={transmissionValue} onValueChange={setTransmissionValue}>
          <SelectTrigger id="transmission">
            <SelectValue placeholder="Vyber převodovku" />
          </SelectTrigger>
          <SelectContent>
            {TRANSMISSION_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors?.transmission?.[0] && (
          <p className="text-sm text-red-600">{fieldErrors.transmission[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fuelType">Palivo</Label>
        <input name="fuelType" type="hidden" value={fuelTypeValue} />
        <Select value={fuelTypeValue} onValueChange={setFuelTypeValue}>
          <SelectTrigger id="fuelType">
            <SelectValue placeholder="Vyber palivo" />
          </SelectTrigger>
          <SelectContent>
            {FUEL_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors?.fuelType?.[0] && (
          <p className="text-sm text-red-600">{fieldErrors.fuelType[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="locationCountry">Země</Label>
        <input
          name="locationCountry"
          type="hidden"
          value={locationCountryValue}
        />
        <Select
          value={locationCountryValue}
          onValueChange={setLocationCountryValue}
        >
          <SelectTrigger id="locationCountry">
            <SelectValue placeholder="Vyber zemi" />
          </SelectTrigger>
          <SelectContent>
            {EUROPEAN_COUNTRY_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors?.locationCountry?.[0] && (
          <p className="text-sm text-red-600">
            {fieldErrors.locationCountry[0]}
          </p>
        )}
      </div>

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

      <div className="space-y-2 sm:col-span-2 md:col-span-3">
        <Label htmlFor="equipmentTags">Výbava</Label>
        <input
          id="equipmentTags"
          name="equipmentTags"
          type="hidden"
          value={equipmentTagsValue.join(", ")}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "w-full justify-start text-left font-normal",
                equipmentTagsValue.length === 0 && "text-neutral-500",
              )}
              type="button"
              variant="outline"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {equipmentTagsValue.length > 0
                ? `Vybráno: ${equipmentTagsValue.length}`
                : "Vyber výbavu"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full max-w-xl p-2">
            <div className="grid gap-2 sm:grid-cols-2">
              {equipmentTagOptions.map((tag) => {
                const isSelected = equipmentTagsValue.includes(tag);

                return (
                  <Button
                    className="justify-between"
                    key={tag}
                    onClick={() => toggleEquipmentTag(tag)}
                    type="button"
                    variant={isSelected ? "secondary" : "ghost"}
                  >
                    <span className="truncate">{tag}</span>
                    {isSelected && <CheckIcon className="h-4 w-4" />}
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        {equipmentTagsValue.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {equipmentTagsValue.map((tag) => (
              <Badge className="gap-1 pr-1" key={tag} variant="secondary">
                {tag}
                <button
                  aria-label={`Odebrat výbavu ${tag}`}
                  className="rounded-sm p-0.5 hover:bg-black/10"
                  onClick={() => toggleEquipmentTag(tag)}
                  type="button"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {fieldErrors?.equipmentTags?.[0] && (
          <p className="text-sm text-red-600">{fieldErrors.equipmentTags[0]}</p>
        )}
      </div>
    </>
  );
}
