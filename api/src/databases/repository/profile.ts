import { mysqlTable, varchar, text } from "drizzle-orm/mysql-core";

export const profile = mysqlTable("profile", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  bio: text("bio"),
  image : text("image"),
});