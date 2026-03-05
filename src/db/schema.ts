import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url").notNull(),
  mileageKm: integer("mileage_km").notNull(),
  firstRegistration: text("first_registration").notNull(),
  powerKw: integer("power_kw").notNull(),
  powerHp: integer("power_hp").notNull(),
  transmission: text("transmission").notNull(),
  fuelType: text("fuel_type").notNull(),
  locationCountry: text("location_country").notNull(),
  deliveryPriceCzk: integer("delivery_price_czk").notNull(),
  monthlyPaymentCzk: integer("monthly_payment_czk").notNull(),
  totalPriceCzk: integer("total_price_czk").notNull(),
  vatPriceCzk: integer("vat_price_czk").notNull(),
  priceRatingLabel: text("price_rating_label").notNull(),
  partnerLabel: text("partner_label").notNull(),
  equipmentTags: text("equipment_tags").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;
