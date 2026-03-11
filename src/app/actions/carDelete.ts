"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/drizzle/db";
import { cars } from "@/drizzle/schema";

const deleteCarSchema = z.object({
  id: z.coerce.number().int().positive("Neplatné ID auta."),
  slug: z.string().min(1, "Neplatný slug auta."),
});

export async function deleteCar(formData: FormData) {
  const parsed = deleteCarSchema.safeParse({
    id: formData.get("id"),
    slug: formData.get("slug"),
  });

  if (!parsed.success) {
    return;
  }

  const deletedRows = await db
    .delete(cars)
    .where(and(eq(cars.id, parsed.data.id), eq(cars.slug, parsed.data.slug)))
    .returning({ id: cars.id });

  if (deletedRows.length === 0) {
    return;
  }

  revalidatePath("/");
  revalidatePath(`/cars/${parsed.data.slug}`);
  redirect("/");
}
