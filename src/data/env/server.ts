import path from "node:path";
import { createEnv } from "@t3-oss/env-nextjs";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    DATABASE_URL: z.string().url(),
  },
  experimental__runtimeEnv: process.env,
});
