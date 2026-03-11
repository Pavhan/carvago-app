import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url").notNull(),
  transmission: text("transmission").notNull(),
  fuelType: text("fuel_type").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Car = typeof cars.$inferSelect;
