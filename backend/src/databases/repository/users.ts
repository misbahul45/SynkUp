import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

import { sql } from "drizzle-orm";


export const authProviderEnum = mysqlEnum("auth_provider", [
  "LOCAL",
  "GOOGLE",
]);

export const usersTable = mysqlTable("users", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  firstName: varchar("first_name", { length: 50 }).notNull(),

  lastName: varchar("last_name", { length: 50 }).notNull(),

  email: varchar("email", { length: 100 }).notNull().unique(),

  password: text("password").notNull(),

  authProvider: authProviderEnum.notNull().default("LOCAL"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .onUpdateNow(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
