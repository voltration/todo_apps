import type { todos } from "./server/db/schema";

export type Todo = typeof todos.$inferSelect;