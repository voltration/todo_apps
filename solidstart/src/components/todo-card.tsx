import { Todo } from "~/types";
import { action } from "@solidjs/router";
import { todos } from "~/db/schema";
import { db } from "~/db/db";
import { eq } from "drizzle-orm";

const delete_todo = action(async (f: FormData) => {
    "use server";

    const id = f.get("id") as string;
    if (!id) return;

    await db.delete(todos).where(eq(todos.id, id));
}, "delete_todo");

export default function TodoCard(t: Todo) {
    return (
        <form action={delete_todo} method="post">
            <input type="hidden" name="id" value={t.id} />
            <div
                class="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-violet-800 to-indigo-400 p-4 rounded-xl"
            >
                <div class="flex flex-col grow">
                    <h1 class="ns text-xl font-black text-white w-full">
                        {t.title}
                    </h1>
                    <p class="ns text-white w-full">{t.description}</p>
                </div>

                <button
                    type="submit"
                    class="flex items-center justify-center hover:bg-white/20 cursor-pointer bg-white/10 shadow rounded-lg size-10 p-2"
                ><img src="/icons/x.svg" alt="Delete" /></button>

                <div
                    class="absolute inset-0 pointer-events-none border border-white/40 rounded-xl shadow-purple-900/80 shadow-md"
                ></div>
            </div>
        </form>
    );
}