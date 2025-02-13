<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";
import { VueUiIcon } from "vue-data-ui";

const store = useMainStore()
const isCopy = computed(() => store.isCopy);
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations)
    
</script>

<template>
    <div style="z-index:10000000" v-if="isCopy" class="origin-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col place-items-center gap-2">    
        <div style="z-index:10000000" v-if="isCopy" class="animate-ping h-[80px] w-[80px] flex place-items-center place-content-center dark:bg-black rounded-full bg-white">
            <VueUiIcon name="circleCheck" :size="62" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" :stroke-width="1" />
        </div>
        <span class="animate-ping text-black dark:text-app-green bg-white dark:bg-black px-4 py-2 mt-12 rounded-full">
            {{ translations.clipboard[store.lang] }}
        </span>
    </div>
</template>