<script lang="ts" setup>
    const emit = defineEmits(["delete_todo"]);
    const props = defineProps({
        id: {
            type: String,
            required: true,
            default: "",
        },
        title: {
            type: String,
            required: true,
            default: "",
        },
        description: {
            type: [String, null],
            required: false,
            default: "",
        },
    });

    async function submit() {
        await useFetch("/api/delete_todo", {
            method: "post",
            body: { id: props.id },
        });

        emit("delete_todo", props.id);
    }
</script>

<template>
<div
            class="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-violet-800 to-indigo-400 p-4 rounded-xl"
        >
            <div class="flex flex-col grow">
                <h1 class="ns text-xl font-black text-white w-full">
                    {{ props.title }}
                </h1>
                <p class="ns text-white w-full">{{ props.description }}</p>
            </div>

            <button
                @click="submit"
                class="flex items-center justify-center hover:bg-white/20 cursor-pointer bg-white/10 shadow rounded-lg size-10 p-2"
                ><img src="/icons/x.svg" alt="Delete" /></button
            >

            <div
                class="absolute inset-0 pointer-events-none border border-white/40 rounded-xl shadow-purple-900/80 shadow-md"
            ></div>
        </div>
</template>