import {
  mysqlTable,
  varchar,
  timestamp,
  unique,
} from "drizzle-orm/mysql-core";

import { sql } from "drizzle-orm";
import { user } from "./auth";

export const userFollows = mysqlTable(
  "user_follows",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),

    followerId: varchar("follower_id", { length: 36 })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    followingId: varchar("following_id", { length: 36 })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },

  (table) => ({
    uniqueFollow: unique().on(table.followerId, table.followingId),
  })
);

export type Follow = typeof userFollows.$inferSelect;
export type NewFollow = typeof userFollows.$inferInsert;