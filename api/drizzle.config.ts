import type { Config } from "drizzle-kit";

export default {
  schema: "./src/databases/repository/*.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
