import { For } from "solid-js";
import { todo_store } from "~/store";
import TodoCard from "~/components/todo-card";
import CreateCard from "~/components/create-card";
import { query } from "@solidjs/router";
import { todos } from "~/db/schema";
import { db } from "~/db/db";

export const get_todos = query(async () => {
  "use server";
  return await db.select().from(todos);
}, "get_todos");

export default function App() {
  return (
    <main>
      <div class="flex items-center justify-center mt-32">
        <div class="flex flex-col gap-8 items-center">
          <h1 class="text-white text-6xl font-black ns">todos app</h1>
          <div class="flex flex-col gap-8">
            <CreateCard />
            <For each={todo_store()}>
              {(item) => <TodoCard {...item} />}
            </For>
          </div>
        </div>
      </div>

      <div class="-z-10 absolute inset-0 h-screen w-screen pointer-events-none bg-gradient-to-t bg-neutral-900 to-neutral-800">
      </div>
    </main>
  );
}