import {
  mysqlTable,
  varchar,
  timestamp,
  unique,
} from "drizzle-orm/mysql-core";

import { usersTable } from "./users";
import { sql } from "drizzle-orm";

export const userFollowsTable = mysqlTable(
  "user_follows",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),

    followerId: varchar("follower_id", { length: 36 })
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    followingId: varchar("following_id", { length: 36 })
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },

  (table) => ({
    uniqueFollow: unique().on(table.followerId, table.followingId),
  })
);

export type Follow = typeof userFollowsTable.$inferSelect;
export type NewFollow = typeof userFollowsTable.$inferInsert;
