import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function CreateCard() {
    const fetcher = useFetcher();

    const [title, set_title] = useState("");
    const [description, set_description] = useState("");

    useEffect(() => {
        if (fetcher.state === "submitting") {
            set_title("");
            set_description("");
        }
    }, [fetcher.state]);

    return (
        <fetcher.Form action="/create-todo" method="post">
            <div
                className="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-white/5 to transparent p-4 rounded-xl"
            >
                <div className="flex flex-col grow">
                    <input
                        value={title}
                        onChange={(e) => set_title(e.target.value)}
                        name="title"
                        className="ns text-xl font-black text-white outline-none w-full"
                        placeholder="Title"
                    />
                    <input
                        value={description}
                        onChange={(e) => set_description(e.target.value)}
                        name="description"
                        className="ns text-white outline-none w-full"
                        placeholder="Description"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-white/10 hover:bg-white/20 transition-colors shadow rounded-lg p-2"
                >
                    <img src="/icons/plus.svg" alt="Add Todo" />
                </button>
                <div
                    className="absolute inset-0 pointer-events-none border-2 border-dotted border-white/20 rounded-xl shadow-md"
                ></div>
            </div>
        </fetcher.Form>
    );
}