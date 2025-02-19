import { ActionFunctionArgs } from "@remix-run/node";
import { db } from "../db/db";
import { todos } from "../db/schema";
import { createId } from "@paralleldrive/cuid2";

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const title = data.get("title") as string;
    const description = data.get("description") as string;

    if (!title) return null;

    return await db.insert(todos).values({
        id: createId(),
        title,
        description,
    }).returning({
        id: todos.id,
        title: todos.title,
        description: todos.description
    });
}