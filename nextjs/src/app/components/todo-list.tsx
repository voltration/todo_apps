"use client";

import { useEffect } from "react";
import { Todo } from "../types";
import CreateCard from "./create-card";
import TodoCard from "./todo-card";
import { create } from "zustand";

type TodoStore = {
    todos: Todo[];
    set_todos: (todos: Todo[]) => void;
    add_todo: (todo: Todo) => void;
    delete_todo: (id: string) => void;
};

export const todo_store = create<TodoStore>((set) => ({
    todos: [],
    set_todos: (todos) => set({ todos }),
    add_todo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    delete_todo: (id) =>
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));

export default function TodoList({ todos }: { todos: Todo[] }) {
    const store_todos = todo_store((state) => state.todos);

    useEffect(() => {
        todo_store.getState().set_todos(todos);
    }, [todos]);

    return (
        <div className="flex flex-col gap-8">
            <CreateCard />
            {store_todos.map((todo) => (
                <TodoCard key={todo.id} {...todo} />
            ))}
        </div>
    );
}
