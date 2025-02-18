"use client";

import { useState } from "react";
import { create_todo } from "../actions";
import Image from "next/image";
import { todo_store } from "./todo-list";

export default function CreateCard() {
    const [title, set_title] = useState("");
    const [desc, set_desc] = useState("");
    const store = todo_store();

    async function submit() {
        const new_todo = await create_todo({ title, description: desc });

        set_title("");
        set_desc("");
        if (new_todo) store.add_todo(new_todo);
    }

    return (
        <div
            className="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-white/5 to transparent p-4 rounded-xl"
        >
            <div className="flex flex-col grow">
                <input
                    className="ns text-xl font-black text-white outline-none w-full"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => set_title(e.target.value)}
                />
                <input
                    className="ns text-white outline-none w-full"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => set_desc(e.target.value)}
                />
            </div>
            <button
                onClick={submit}
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-2"
            >
                <Image src="/icons/plus.svg" alt="Add Todo" width={24} height={24} />
            </button>
            <div
                className="absolute inset-0 pointer-events-none border-2 border-dotted border-white/20 rounded-xl shadow-md"
            ></div>
        </div>
    );
}