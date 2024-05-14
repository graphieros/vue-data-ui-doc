<script setup>
import { computed } from "vue";
import { useMainStore } from '../../stores';
const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode)
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-4 text-lg p-1 dark:text-app-gold">
            <VueUiIcon name="clipboardLine" :stroke="isDarkMode ? '#fdd663' : '#8A8A8A'" />
            <slot name="title"/>
        </div>
        <div class="p-1 mb-4">
            <slot name="description"/>
        </div>
    </div>
</template>