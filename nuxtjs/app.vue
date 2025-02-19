<script lang="ts" setup>
  import TodoCard from "./components/TodoCard.vue";
  import CreateCard from "./components/CreateCard.vue";
  import type { Todo } from "./types";

  let todos = ref<Todo[]>([]);

  onMounted(async () => {
    const { data } = await useFetch<Todo[]>("/api/get_todos");
    if (data.value) todos.value = data.value;
  });

  function add_todo(todo: Todo) {
    todos.value.push(todo);
  }

  function delete_todo(id: string) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }
</script>

<template>
    <div class="flex items-center justify-center mt-32">
      <div class="flex flex-col gap-8 items-center">
        <h1 class="text-white text-6xl font-black ns">todos app</h1>
        <div class="flex flex-col gap-8">
          <CreateCard
            @add_todo="add_todo"
          />
          <TodoCard
          @delete_todo="delete_todo"
            v-for="todo in todos"
            :key="todo.id"
            v-bind="todo"
          />
        </div>
      </div>
    </div>

    <div
      class="-z-10 absolute inset-0 h-screen w-screen pointer-events-none bg-gradient-to-t bg-neutral-900 to-neutral-800"
  ></div>
    <div
      class="-z-10 absolute inset-0 h-screen w-screen pointer-events-none bg-gradient-to-t bg-neutral-900 to-neutral-800"
  ></div>
</template>
