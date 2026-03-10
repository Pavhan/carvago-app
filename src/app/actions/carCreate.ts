"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { cars } from "@/drizzle/schema";
import { createSlug } from "@/helpers/createSlug";
import { createCarSchema } from "@/lib/validations/car";

export type CreateCarActionState = {
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createCarAction(
  _prevState: CreateCarActionState,
  formData: FormData,
): Promise<CreateCarActionState> {
  const parsed = createCarSchema.safeParse({
    name: formData.get("name"),
    imageUrl: formData.get("imageUrl"),
    transmission: formData.get("transmission"),
    fuelType: formData.get("fuelType"),
    price: formData.get("price"),
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

  revalidatePath("/");
  revalidatePath("/cars");
  redirect(`/cars/${uniqueSlug}`);
}
