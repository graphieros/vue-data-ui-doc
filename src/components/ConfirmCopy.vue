<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";
import { CheckIcon } from "vue-tabler-icons";

const store = useMainStore()
const isCopy = computed(() => store.isCopy);
const translations = computed(() => store.translations)
    
</script>

<template>
    <div style="z-index:10000000" v-if="isCopy" class="origin-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col place-items-center gap-2">    
        <div style="z-index:10000000" v-if="isCopy" class="animate-pulse h-[80px] w-[80px] flex place-items-center place-content-center border-2 border-gray-400 dark:border-app-green dark:bg-black rounded-full bg-white">
            <CheckIcon size="42" class="dark:text-app-green"/>
        </div>
        <span class="animate-pulse text-black dark:text-app-green bg-white dark:bg-black px-4 py-2 rounded-full">
            {{ translations.clipboard[store.lang] }}
        </span>
    </div>
</template>