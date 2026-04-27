<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";

const props = defineProps({
    link: String,
});

const store = useMainStore();
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);
</script>

<template>
    <div
        class="text-xl mb-3 font-inter-medium text-app-blue-dark-mid dark:text-app-blue-mid"
    >
        <a :href="link" target="_blank" class="flex gap-2 hover:underline">
            {{ translations.slotImplementation[store.lang] }}
            <VueUiIcon
                name="externalLink"
                :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"
            />
        </a>
    </div>
</template>
