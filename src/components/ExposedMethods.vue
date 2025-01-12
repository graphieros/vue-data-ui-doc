<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import BaseExposedMethod from "./BaseExposedMethod.vue";

const props = defineProps({
    component: {
        type: String,
    },
    names: {
        type: Array,
        default() {
            return []
        }
    }
});

const store = useMainStore();
const translations = computed(() => store.translations);

const methodMap = computed(() => {
    return {
        generatePdf: { name: 'generatePdf', description: translations.value.docs.emits.generatePdf[store.lang] },
        generateCsv: { name: 'generateCsv', description: translations.value.docs.emits.generateCsv[store.lang] },
        generateImage: { name: 'generateImage', description: translations.value.docs.emits.generateImage[store.lang] },
        toggleTable: { name: 'toggleTable', description: translations.value.docs.emits.toggleTable[store.lang] },
        toggleStack: { name: 'toggleStack', description: translations.value.docs.emits.toggleStack[store.lang] },
        toggleLabels: { name: 'toggleLabels', description: translations.value.docs.emits.toggleLabels[store.lang] },
        toggleSort: { name: 'toggleSort', description: translations.value.docs.emits.toggleSort[store.lang] },
        toggleAnimation: { name: 'toggleAnimation', description: translations.value.docs.emits.toggleAnimation[store.lang] },
        pauseAnimation: { name: 'pauseAnimation', description: translations.value.docs.emits.pauseAnimation[store.lang] },
        resumeAnimation: { name: 'resumeAnimation', description: translations.value.docs.emits.resumeAnimation[store.lang] },
        toggleReadonly: { name: 'toggleReadonly', description: translations.value.docs.emits.rating.toggleReadonly[store.lang] },
    }
})

</script>

<template>
    <BaseExposedMethod 
        v-for="m in names"
        :component="component"
        :name="m"
        :description="methodMap[m].description"
    />
</template>