import { db } from "../db/db";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

interface RequestBody {
    id: string;
}

export default defineEventHandler(async (e) => {
    const { id } = await readBody<RequestBody>(e);
    if (!id) return;

    await db.delete(todos).where(eq(todos.id, id));
});