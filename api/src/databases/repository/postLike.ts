import { sql } from "drizzle-orm";
import {  mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { user } from "./auth";
import { post } from "./posts";

export const postLike=mysqlTable('post_likes', {
    id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`(UUID())`),

    userId:varchar('user_id', { length:36 })
    .notNull()
    .references(()=>user.id, {
        onDelete:'cascade'
    }),

    postId:varchar('post_id', { length:36 })
    .notNull()
    .references(()=>post.id,{
        onDelete:'cascade'
    })
})