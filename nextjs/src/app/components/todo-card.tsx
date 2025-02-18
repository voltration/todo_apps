"use client";

import { delete_todo } from "../actions";
import { Todo } from "../types";
import Image from "next/image";
import { todo_store } from "./todo-list";

export default function TodoCard(todo: Todo) {
    const store = todo_store();

    async function submit() {
        await delete_todo(todo.id);
        store.delete_todo(todo.id);
    }

    return (
        <div className="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-violet-800 to-indigo-400 p-4 rounded-xl">
            <div className="flex flex-col grow">
                <h1 className="ns text-xl font-black text-white w-full">{todo.title}</h1>
                <p className="ns text-white w-full">{todo.description}</p>
            </div>
            <button onClick={submit} className="flex items-center justify-center hover:bg-white/20 cursor-pointer bg-white/10 shadow rounded-xl size-10 p-2">
                <Image src="/icons/x.svg" alt="Delete" width={24} height={24} />
            </button>
            <div
                className="absolute inset-0 pointer-events-none border border-white/40 rounded-xl shadow-purple-900/80 shadow-md"
            ></div>
        </div>
    );
}