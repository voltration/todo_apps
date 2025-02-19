import { createId } from "@paralleldrive/cuid2";
import { db } from "../db/db";
import { todos } from "../db/schema";

interface Props {
    title: string;
    description: string | null;
}

export default defineEventHandler(async (e) => {
    const body = await readBody<Props>(e);
    if (!body.title) return;

    const [new_todo] = await db.insert(todos)
        .values({
            id: createId(),
            title: body.title,
            description: body.description
        })
        .returning({
            id: todos.id,
            title: todos.title,
            description: todos.description
        });

    return new_todo;
});