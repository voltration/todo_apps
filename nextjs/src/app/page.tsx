"use server";
import { get_todos } from "./actions";
import TodoList from "./components/todo-list";

export default async function Home() {
  const todos = await get_todos();

  return (
    <>
      <div className="flex items-center justify-center mt-32">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-white text-6xl font-black ns">todos app</h1>

          <TodoList todos={todos} />
        </div>
      </div>

      <div className="-z-10 absolute inset-0 h-screen w-screen pointer-events-none bg-gradient-to-t bg-neutral-900 to-neutral-800">
      </div>
    </>
  );
}
