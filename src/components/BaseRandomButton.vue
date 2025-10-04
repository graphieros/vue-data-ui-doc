<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore()
const translations = computed(() => store.translations)
const isDarkMode = computed(() => store.isDarkMode);
const emit = defineEmits(['click'])

</script>

<template>
    <div class="w-full flex justify-end mt-4">
        <button @click="emit('click')" dir="auto" class="flex flex-row flex-wrap gap-3 place-items-center bg-gray-100 dark:bg-[#242424] justify-center py-2 px-6 rounded-full hover:bg-[#FAFAFA] hover:dark:bg-[#2A2A2A] transition-colors w-full mx-auto max-w-[350px] text-xs shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
            <VueUiIcon name="numbers" :stroke="isDarkMode ? '#5f8aee' : '#1A1A1A'"/>
            <VueUiIcon name="restart" :stroke="isDarkMode ? '#5f8aee' : '#1A1A1A'"/>
            {{ translations.randomData[store.lang] }}
        </button>
    </div>
</template>