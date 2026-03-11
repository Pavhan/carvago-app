import { z } from "zod";
import { FUEL_OPTIONS, TRANSMISSION_OPTIONS } from "@/lib/car-options";

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
  transmission: z.enum(TRANSMISSION_OPTIONS, {
    message: "Převodovka musí být Manuál nebo Automat.",
  }),
  fuelType: z.enum(FUEL_OPTIONS, {
    message: "Palivo musí být Benzín, Nafta, Elektro nebo Hybrid.",
  }),
  price: z.coerce.number().int().positive("Cena musí být kladné číslo."),
});

export type CreateCarInput = z.infer<typeof createCarSchema>;
