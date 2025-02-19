import type { MetaFunction } from "@remix-run/node";
import CreateCard from "../components/create-card";
import { db } from "../db/db";
import { todos } from "../db/schema";
import { useLoaderData } from "@remix-run/react";
import TodoCard from "../components/todo-card";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  return {
    todos: await db.select().from(todos)
  }
}

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex items-center justify-center mt-32">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-white text-6xl font-black ns">todos app</h1>
          <div className="flex flex-col gap-8">
            <CreateCard />
            {todos.map((todo) => (
              <TodoCard key={todo.id} {...todo} />
            ))}
          </div>
        </div>
      </div>

      <div className="-z-10 absolute inset-0 h-screen w-screen pointer-events-none bg-gradient-to-t bg-neutral-900 to-neutral-800">
      </div>
    </>
  );
}

