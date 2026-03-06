"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/drizzle/db";
import { cars } from "@/drizzle/schema";
import { createCarSchema } from "@/lib/validations/car";

export type UpdateCarActionState = {
  status?: "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const updateCarSchema = z
  .object({
    id: z.coerce.number().int().positive("Neplatné ID auta."),
    slug: z.string().min(1, "Neplatný slug auta."),
  })
  .merge(createCarSchema);

export async function updateCarAction(
  _prevState: UpdateCarActionState,
  formData: FormData,
): Promise<UpdateCarActionState> {
  const parsed = updateCarSchema.safeParse({
    id: formData.get("id"),
    slug: formData.get("slug"),
    name: formData.get("name"),
    imageUrl: formData.get("imageUrl"),
    mileageKm: formData.get("mileageKm"),
    firstRegistration: formData.get("firstRegistration"),
    powerKw: formData.get("powerKw"),
    powerHp: formData.get("powerHp"),
    transmission: formData.get("transmission"),
    fuelType: formData.get("fuelType"),
    locationCountry: formData.get("locationCountry"),
    deliveryPriceCzk: formData.get("deliveryPriceCzk"),
    monthlyPaymentCzk: formData.get("monthlyPaymentCzk"),
    totalPriceCzk: formData.get("totalPriceCzk"),
    vatPriceCzk: formData.get("vatPriceCzk"),
    priceRatingLabel: formData.get("priceRatingLabel"),
    partnerLabel: formData.get("partnerLabel"),
    equipmentTags: formData.get("equipmentTags"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Formulář obsahuje chyby.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updatedRows = await db
      .update(cars)
      .set({
        name: parsed.data.name,
        imageUrl: parsed.data.imageUrl,
        mileageKm: parsed.data.mileageKm,
        firstRegistration: parsed.data.firstRegistration,
        powerKw: parsed.data.powerKw,
        powerHp: parsed.data.powerHp,
        transmission: parsed.data.transmission,
        fuelType: parsed.data.fuelType,
        locationCountry: parsed.data.locationCountry,
        deliveryPriceCzk: parsed.data.deliveryPriceCzk,
        monthlyPaymentCzk: parsed.data.monthlyPaymentCzk,
        totalPriceCzk: parsed.data.totalPriceCzk,
        vatPriceCzk: parsed.data.vatPriceCzk,
        priceRatingLabel: parsed.data.priceRatingLabel,
        partnerLabel: parsed.data.partnerLabel,
        equipmentTags: parsed.data.equipmentTags,
      })
      .where(eq(cars.id, parsed.data.id))
      .returning({ id: cars.id });

    if (updatedRows.length === 0) {
      return {
        status: "error",
        message: "Auto se nepodařilo najít.",
      };
    }

    revalidatePath("/");
    revalidatePath("/cars");
    revalidatePath(`/cars/${parsed.data.slug}`);
  } catch {
    return {
      status: "error",
      message: "Aktualizace se nezdařila. Zkuste to znovu.",
    };
  }

  redirect(`/cars/${parsed.data.slug}?updated=1`);
}
