import {
  mysqlTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

import { post } from "./posts.";
import { sql } from "drizzle-orm";
import { user } from "./auth";

export const postComments = mysqlTable("post_comments", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  postId: varchar("post_id", { length: 36 })
    .notNull()
    .references(() => post.id, {
      onDelete: "cascade",
    }),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Comment = typeof postCommentsTable.$inferSelect;
export type NewComment = typeof postCommentsTable.$inferInsert;
