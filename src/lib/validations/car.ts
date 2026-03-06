import { z } from "zod";

function isValidImageUrl(value: string) {
  if (value.startsWith("/images/cars/")) {
    return true;
  }

  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export const createCarSchema = z.object({
  name: z.string().min(3, "Název je povinný."),
  imageUrl: z
    .string()
    .min(1, "URL obrázku je povinná.")
    .refine(
      isValidImageUrl,
      "URL obrázku musí být validní URL nebo lokální cesta /images/cars/...",
    ),
  mileageKm: z.coerce.number().int().nonnegative(),
  firstRegistration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Použij formát MM/RRRR."),
  powerKw: z.coerce.number().int().positive(),
  powerHp: z.coerce.number().int().positive(),
  transmission: z.string().min(2),
  fuelType: z.string().min(2),
  locationCountry: z.string().min(2),
  deliveryPriceCzk: z.coerce.number().int().nonnegative(),
  monthlyPaymentCzk: z.coerce.number().int().nonnegative(),
  totalPriceCzk: z.coerce.number().int().positive(),
  vatPriceCzk: z.coerce.number().int().positive(),
  priceRatingLabel: z.string().min(2),
  partnerLabel: z.string().min(2),
  equipmentTags: z
    .string()
    .min(2)
    .transform((value) =>
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
});

export type CreateCarInput = z.infer<typeof createCarSchema>;
