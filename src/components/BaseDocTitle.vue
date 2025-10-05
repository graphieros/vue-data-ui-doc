<script setup>
import { ref, computed } from "vue";
import { useIconMap } from "../useIconMap";
import { useMainStore } from "../stores";

defineProps({
    name: {
        type: String,
        required: true
    },
    universal: {
        type: Boolean,
        default: false
    }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

</script>

<template>
    <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-inter-medium text-gray-400 dark:text-gray-600 mb-2 text-2xl mt-12">
        <VueUiIcon 
            :name="useIconMap(name)" 
            :stroke="isDarkMode ? '#5f8aee' : '#8A8A8A'" 
            :strokeWidth="1.5" 
        />
        <span><span v-if="!universal">VueUi</span><span class="text-black dark:text-app-blue">{{ capitalizeFirstLetter(name.replaceAll('VueUi', '')) }}</span></span>
    </h1>
</template>