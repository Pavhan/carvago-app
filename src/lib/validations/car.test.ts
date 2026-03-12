import { describe, expect, it } from "vitest";
import { createCarSchema } from "@/lib/validations/car";

describe("createCarSchema", () => {
  it("accepts valid local image and coerces numeric price", () => {
    const parsed = createCarSchema.safeParse({
      name: "Audi A4 Avant",
      imageUrl: "/images/cars/audi-a4-avant.avif",
      transmission: "Automat",
      fuelType: "Benzín",
      price: "1049000",
    });

    expect(parsed.success).toBe(true);

    if (parsed.success) {
      expect(parsed.data.price).toBe(1049000);
    }
  });

  it("rejects non-positive price and invalid image path", () => {
    const parsed = createCarSchema.safeParse({
      name: "Audi A4 Avant",
      imageUrl: "https://example.com/audi.jpg",
      transmission: "Automat",
      fuelType: "Benzín",
      price: 0,
    });

    expect(parsed.success).toBe(false);

    if (!parsed.success) {
      const { fieldErrors } = parsed.error.flatten();
      expect(fieldErrors.imageUrl?.[0]).toContain("URL obrázku");
      expect(fieldErrors.price?.[0]).toContain("Cena musí být kladné číslo");
    }
  });
});
