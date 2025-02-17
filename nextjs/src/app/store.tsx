import { create } from "zustand";
import { get_todos } from "./actions";
import { Todo } from "./types";

type TodoStore = {
    todos: Todo[];
    set_todos: (todos: Todo[]) => void;
    add_todo: (todo: Todo) => void;
    delete_todo: (id: string) => void;
    init: () => Promise<void>;
};

export const todo_store = create<TodoStore>((set) => ({
    todos: [],
    set_todos: (todos) => set({ todos }),
    add_todo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    delete_todo: (id) =>
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
    init: async () => {
        const todos = await get_todos();
        set({ todos });
    }
}));