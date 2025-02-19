import { useFetcher } from "@remix-run/react";
import { Todo } from "../types";

export default function TodoCard(todo: Todo) {
    const fetcher = useFetcher();

    return (
        <fetcher.Form action="/delete-todo" method="post">
            <div className="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-violet-800 to-indigo-400 p-4 rounded-xl">
                <div className="flex flex-col grow">
                    <h1 className="ns text-xl font-black text-white w-full">{todo.title}</h1>
                    <p className="ns text-white w-full">{todo.description}</p>
                </div>
                <button type="submit" className="flex items-center justify-center hover:bg-white/20 cursor-pointer bg-white/10 shadow rounded-lg size-10 p-2">
                    <img src="/icons/x.svg" alt="Delete" />
                </button>
                <div
                    className="absolute inset-0 pointer-events-none border border-white/40 rounded-xl shadow-purple-900/80 shadow-md"
                ></div>
            </div>

            <input type="hidden" name="id" value={todo.id} />
        </fetcher.Form>
    );
}