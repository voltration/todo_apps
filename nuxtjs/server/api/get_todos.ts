import { db } from "../db/db";
import { todos } from "../db/schema";

export default defineEventHandler(async (e) => {
    return await db.select().from(todos);
});