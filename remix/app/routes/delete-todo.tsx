import type { ActionFunctionArgs } from "@remix-run/node";
import { db } from "../db/db";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const id = data.get("id") as string;

    if (!id) return null;

    return await db.delete(todos).where(eq(todos.id, id)).returning({
        id: todos.id,
    });
}