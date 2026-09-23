<script setup>
import { ref, computed } from "vue";
import { VueUiAccordion } from "vue-data-ui";
import { useMainStore } from "../../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => ({
    head: {
        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
        backgroundColor: isDarkMode.value ? "#2A2A2A" : "#E1E5E8",
        iconColor: isDarkMode.value ? "#fdd663" : "#3A3A3A",
        iconSize: 16,
    },
    body: {
        backgroundColor: isDarkMode.value ? "#2A2A2A" : "#E1E5E8",
        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
    },
}));
</script>

<template>
    <div>
        <VueUiAccordion :config>
            <template #title="{ color, isOpen }">
                <div class="text-lg font-inter-medium">
                    <slot name="title" v-bind="{ color, isOpen, isDarkMode }" />
                </div>
            </template>

            <template #content="{ backgroundColor, color, isOpen }">
                <div :style="{ backgroundColor }" class="py-2 px-6">
                    <slot
                        name="content"
                        v-bind="{ color, isOpen, isDarkMode }"
                    />
                </div>
            </template>
        </VueUiAccordion>
    </div>
</template>
