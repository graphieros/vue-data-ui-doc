<script setup>
import { ref, computed } from "vue";
import { useIconMap } from "../useIconMap";
import { useMainStore } from "../stores";

defineProps({
    name: {
        type: String,
        required: true
    }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

</script>

<template>
    <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-inter-medium text-app-blue mb-2 text-2xl">
        <VueUiIcon :name="useIconMap(name)" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" :strokeWidth="1.5" />
        <span>VueUi<span class="text-black dark:text-app-blue-light">{{ capitalizeFirstLetter(name.replaceAll('VueUi', '')) }}</span></span>
    </h1>
</template>