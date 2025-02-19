<script setup>
    const emit = defineEmits(["add_todo"]);
    let form = ref({
        title: "",
        description: "",
    });

    async function submit() {
        if (!form.value.title) return;

        const { data } = await useFetch("/api/create_todo", {
            method: "post",
            body: form.value
        });

        form.value.title = "";
        form.value.description = "";

        emit("add_todo", data.value);
    }
</script>

<template>
    <div
            class="relative flex flex-row gap-8 items-center justify-between h-24 w-[450px] bg-gradient-to-t from-white/5 to-transparent p-4 rounded-xl"
        >
            <div class="flex flex-col grow">
                <input
                    v-model="form.title"
                    placeholder="Title"
                    class="ns text-xl font-black text-white outline-none w-full"
                />
                <input
                    v-model="form.description"
                    placeholder="Description"
                    class="ns text-white outline-none w-full"
                />
            </div>

            <button
                @click="submit"
                class="flex items-center justify-center hover:bg-white/20 cursor-pointer bg-white/10 shadow rounded-lg size-10 p-2"
                ><img src="/icons/plus.svg" alt="Create" /></button
            >
            <div
                class="absolute inset-0 pointer-events-none border-2 border-dotted border-white/20 rounded-xl shadow-md"
            ></div>
        </div>
</template>