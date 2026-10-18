<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import { computed } from "vue";
import { useMainStore } from "../../stores";
const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            open: false,
            maxHeight: 10000,
            head: {
                useArrowSlot: false,
                backgroundColor: "transparent",
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                iconColor: "#5f8bee",
                padding: "12px 6px",
            },
            body: {
                backgroundColor: "transparent",
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
            },
        }),
    set: configState.set,
});
</script>

<template>
    <VueDataUi component="VueUiAccordion" :config="config">
        <template #title="{ color }">
            <div :style="`color:${color}`">Current config as JSON</div>
        </template>
        <template #content>
            <div class="mx-auto w-full">
                <slot name="content" />
            </div>
        </template>
    </VueDataUi>
</template>
