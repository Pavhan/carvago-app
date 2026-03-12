import { defineConfig } from "drizzle-kit";
import { env } from "@/data/env/server";

// export default defineConfig({
//   out: "./drizzle",
//   schema: "./src/db/schema.ts",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: connectionString,
//   },
//   verbose: true,
//   strict: true,
// });

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
