"use server";

import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { cars } from "@/drizzle/schema";
import { createCarSchema } from "@/lib/validations/car";
import { createSlug } from "@/helpers/createSlug";

export type CreateCarActionState = {
  message?: string;
  fieldErrors?: Record<string, string[]>;
  slug?: string;
};

export async function createCarAction(
  _prevState: CreateCarActionState,
  formData: FormData,
): Promise<CreateCarActionState> {
  const parsed = createCarSchema.safeParse({
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
      message: "Formulář obsahuje chyby.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const baseSlug = createSlug(parsed.data.name);
  let uniqueSlug = baseSlug;
  let suffix = 1;

  for (;;) {
    const [existing] = await db
      .select({ slug: cars.slug })
      .from(cars)
      .where(eq(cars.slug, uniqueSlug))
      .limit(1);

    if (!existing) {
      break;
    }

    suffix += 1;
    uniqueSlug = `${baseSlug}-${suffix}`;
  }

  await db.insert(cars).values({
    ...parsed.data,
    slug: uniqueSlug,
  });

  return {
    message: "Auto bylo úspěšně uloženo.",
    slug: uniqueSlug,
  };
}
