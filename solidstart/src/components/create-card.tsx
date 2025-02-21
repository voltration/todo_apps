import { todos } from "~/db/schema";
import { db } from "~/db/db";
import { createId } from "@paralleldrive/cuid2";
import { createSignal } from "solid-js";
import { todo_store } from "~/store";

async function create_todo(data: { title: string; description: string | null }) {
    "use server";
    if (!data.title) return;

    return (await db.insert(todos).values({
        id: createId(),
        title: data.title,
        description: data.description
    }).returning())[0];
}

export default function CreateCard() {
    let [data, set_data] = createSignal({
        title: "",
        description: ""
    });

    async function submit() {
        const t = await create_todo(data());
        const store = todo_store();
        if (t && store) {
            store.push(t);
            set_data({ title: "", description: "" }); // Clear form after successful creation
        }
    }

    return (
        <div class="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-white/5 to transparent p-4 rounded-xl">
            <div class="flex flex-col grow">
                <input
                    value={data().title}
                    onInput={(e) => set_data({ ...data(), title: e.target.value })}
                    class="ns text-xl font-black text-white outline-none w-full"
                    placeholder="Title"
                />
                <input
                    value={data().description}
                    onInput={(e) => set_data({ ...data(), description: e.target.value })}
                    class="ns text-white outline-none w-full"
                    placeholder="Description"
                />
            </div>

            <button
                onClick={submit}
                class="bg-white/10 hover:bg-white/20 transition-colors shadow rounded-lg p-2 cursor-pointer"
            ><img src="/icons/plus.svg" alt="Add Todo" />
            </button>

            <div
                class="absolute inset-0 pointer-events-none border-2 border-dotted border-white/20 rounded-xl shadow-md"
            ></div>
        </div>
    );
}