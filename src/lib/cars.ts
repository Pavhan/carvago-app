import { desc, eq } from "drizzle-orm";
import { db } from "@/db/index";
import { cars } from "@/db/schema";

export async function getCars() {
  return db.select().from(cars).orderBy(desc(cars.createdAt));
}

export async function getCarBySlug(slug: string) {
  const [car] = await db
    .select()
    .from(cars)
    .where(eq(cars.slug, slug))
    .limit(1);
  return car;
}
