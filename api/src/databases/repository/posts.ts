import {
  mysqlTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

import { sql } from "drizzle-orm";
import { user } from "./auth";

export const post = mysqlTable("posts", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  imageUrl: text("image_url").notNull(),

  caption: text("caption"),

  authorId: varchar("author_id", { length: 36 })
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .onUpdateNow(),
});

export type Post = typeof post.$inferSelect;
export type NewPost = typeof post.$inferInsert;