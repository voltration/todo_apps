<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Todo } from "$lib/types";
    let { data } = $props();
</script>

<div class="flex items-center justify-center mt-32">
    <div class="flex flex-col gap-8 items-center">
        <h1 class="text-white text-6xl font-black ns">todos app</h1>
        <div class="flex flex-col gap-8">
            {@render create_card()}
            {#each data.todos as todo}
                {@render card(todo)}
            {/each}
        </div>
    </div>
</div>

<div
    class="-z-10 absolute inset-0 h-screen w-screen pointer-events-none bg-gradient-to-t bg-neutral-900 to-neutral-800"
></div>

{#snippet create_card()}
    <form use:enhance method="post" action="?/create">
        <div
            class="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-white/5 to-transparent p-4 rounded-xl"
        >
            <div class="flex flex-col grow">
                <input
                    name="title"
                    placeholder="Title"
                    class="ns text-xl font-black text-white outline-none w-full"
                />
                <input
                    name="description"
                    placeholder="Description"
                    class="ns text-white outline-none w-full"
                />
            </div>

            <button
                type="submit"
                class="flex items-center justify-center hover:bg-white/20 cursor-pointer bg-white/10 shadow rounded-xl size-10 p-2"
                ><img src="/icons/plus.svg" alt="Create" /></button
            >
            <div
                class="absolute inset-0 pointer-events-none border-2 border-dotted border-white/20 rounded-xl shadow-md"
            ></div>
        </div>
    </form>
{/snippet}

{#snippet card(todo: Todo)}
    <form use:enhance method="post" action="?/delete">
        <div
            class="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-violet-800 to-indigo-400 p-4 rounded-xl"
        >
            <div class="flex flex-col grow">
                <h1 class="ns text-xl font-black text-white w-full">
                    {todo.title}
                </h1>
                <p class="ns text-white w-full">{todo.description}</p>
            </div>

            <input type="hidden" name="id" value={todo.id} />

            <button
                type="submit"
                class="flex items-center justify-center hover:bg-white/20 cursor-pointer bg-white/10 shadow rounded-xl size-10 p-2"
                ><img src="/icons/x.svg" alt="Delete" /></button
            >

            <div
                class="absolute inset-0 pointer-events-none border border-white/40 rounded-xl shadow-purple-900/80 shadow-md"
            ></div>
        </div>
    </form>
{/snippet}
