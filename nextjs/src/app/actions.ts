"use server";

import { db } from "@/lib/db/db";
import { todos } from "@/lib/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import type { Todo } from "@/app/types";

export async function get_todos() {
    return await db.select().from(todos);
}

export async function create_todo(data: { title: string; description: string | null }) {
    if (!data.title) return;

    return (await db.insert(todos).values({
        id: createId(),
        title: data.title,
        description: data.description
    }).returning())[0];
}

export async function delete_todo(id: string) {
    if (!id) return;

    await db.delete(todos).where(eq(todos.id, id));
}