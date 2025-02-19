import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { todos } from "../db/schema";

interface Props {
    id: string;
}

export default defineEventHandler(async (e) => {
    const body = await readBody<Props>(e);

    if (!body.id) return;

    await db.delete(todos).where(eq(todos.id, body.id));
})