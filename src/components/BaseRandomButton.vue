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
        <button @click="emit('click')" dir="auto" class="flex flex-row gap-3 place-items-center justify-center py-2 px-6 rounded-full border border-app-blue bg-[#5f8aee10] hover:bg-[#5f8aee20] transition-colors w-full">
            <VueUiIcon name="numbers" :stroke="isDarkMode ? '#5f8aee' : '#1A1A1A'"/>
            <VueUiIcon name="restart" :stroke="isDarkMode ? '#5f8aee' : '#1A1A1A'"/>
            {{ translations.randomData[store.lang] }}
        </button>
    </div>
</template>