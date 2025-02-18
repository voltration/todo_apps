import { createId } from "@paralleldrive/cuid2";
import { db } from "../db/db";
import { todos } from "../db/schema";

interface RequestBody {
    title: string;
    description: string | null;
}

export default defineEventHandler(async (e) => {
    const { title, description } = await readBody<RequestBody>(e);
    if (!title) return;

    await db.insert(todos).values({
        id: createId(),
        title,
        description
    });
});