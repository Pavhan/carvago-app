'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/drizzle/db';
import { cars } from '@/drizzle/schema';
import { createCarSchema } from '@/lib/validations/car';

export type UpdateCarActionState = {
  status?: 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const updateCarSchema = z
  .object({
    id: z.coerce.number().int().positive('Neplatné ID auta.'),
    slug: z.string().min(1, 'Neplatný slug auta.'),
  })
  .merge(createCarSchema);

export async function updateCarAction(
  _prevState: UpdateCarActionState,
  formData: FormData,
): Promise<UpdateCarActionState> {
  const parsed = updateCarSchema.safeParse({
    id: formData.get('id'),
    slug: formData.get('slug'),
    name: formData.get('name'),
    imageUrl: formData.get('imageUrl'),
    transmission: formData.get('transmission'),
    fuelType: formData.get('fuelType'),
    price: formData.get('price'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updatedRows = await db
      .update(cars)
      .set({
        name: parsed.data.name,
        imageUrl: parsed.data.imageUrl,
        transmission: parsed.data.transmission,
        fuelType: parsed.data.fuelType,
        price: parsed.data.price,
      })
      .where(eq(cars.id, parsed.data.id))
      .returning({ id: cars.id });

    if (updatedRows.length === 0) {
      return {
        status: 'error',
        message: 'Auto se nepodařilo najít.',
      };
    }

    revalidatePath('/');
    revalidatePath(`/cars/${parsed.data.slug}`);
  } catch {
    return {
      status: 'error',
      message: 'Aktualizace se nezdařila. Zkuste to znovu.',
    };
  }

  redirect(`/cars/${parsed.data.slug}?updated=1`);
}
