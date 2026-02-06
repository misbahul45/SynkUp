import {
  mysqlTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

import { usersTable } from "./users";
import { postsTable } from "./posts.";
import { sql } from "drizzle-orm";

export const postCommentsTable = mysqlTable("post_comments", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  postId: varchar("post_id", { length: 36 })
    .notNull()
    .references(() => postsTable.id, {
      onDelete: "cascade",
    }),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Comment = typeof postCommentsTable.$inferSelect;
export type NewComment = typeof postCommentsTable.$inferInsert;
