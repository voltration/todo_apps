import { db } from "$lib/server/db/db";
import { todos } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { createId } from "@paralleldrive/cuid2";


export const load: PageServerLoad = async () => {
    return {
        todos: await db.select().from(todos)
    }
}

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const title = data.get("title") as string;
        const desc = data.get("description") as string;

        if (!title) return;

        await db.insert(todos).values({
            id: createId(),
            title: title,
            description: desc
        });
    },
    delete: async (e) => {
        const data = await e.request.formData();
        const id = data.get("id") as string;

        if (!id) return;

        await db.delete(todos).where(eq(todos.id, id));
    }
} satisfies Actions;