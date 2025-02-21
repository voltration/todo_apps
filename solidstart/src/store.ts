import { createAsyncStore } from "@solidjs/router";
import { get_todos } from "~/routes";
import type { Todo } from "~/types";

export const todo_store = createAsyncStore<Todo[]>(() => get_todos(), {
    initialValue: []
});