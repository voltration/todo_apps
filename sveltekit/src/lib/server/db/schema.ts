import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    description: text()
});