<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    async setup() {
      const data =  await useFetch("/api/todos");
      console.log(data)
    }
}); 
</script>

<template>
    <div>

    </div>
</template>
