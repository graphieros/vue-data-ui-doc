<script setup>
import { ref, computed } from "vue";


const config = ref({
    open: false,
    maxHeight: 10000,
    head: {
        useArrowSlot: false,
        backgroundColor: "transparent",
        color: "#2D353C",
        iconColor: "#5f8bee",
        padding: "12px 6px",
    },
    body: {
        backgroundColor: "transparent",
        color: "#2D353C",
    },
});

const darkModeConfig = ref({
    open: false,
    maxHeight: 10000,
    head: {
        useArrowSlot: false,
        backgroundColor: "transparent",
        color: "#CCCCCC",
        iconColor: "#5f8bee",
        padding: "12px 6px",
    },
    body: {
        backgroundColor: "transparent",
        color: "#CCCCCC",
    },
});

</script>

<template>
    <VueDataUi component="VueUiAccordion" :config="isDarkMode ? darkModeConfig : config">
        <template #title="{ color }">
            <div :style="`color:${color}`">
                Current config as JSON
            </div>
        </template>
        <template #content>
            <div class="mx-auto w-full">
                <slot name="content"/>
            </div>
        </template>
    </VueDataUi>
</template>