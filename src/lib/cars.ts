import { desc, eq } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { cars } from '@/drizzle/schema';
import { sleep } from '@/helpers/sleep';

export async function getCars() {
  // throw new Error('Simulovaná chyba');
  await sleep(1000);
  return db.select().from(cars).orderBy(desc(cars.createdAt));
}

export async function getCarBySlug(slug: string) {
  await sleep(1000);
  const [car] = await db
    .select()
    .from(cars)
    .where(eq(cars.slug, slug))
    .limit(1);
  return car;
}
