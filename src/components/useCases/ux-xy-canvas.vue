<script setup>
import { ref, onMounted, computed } from "vue";
import { useCase } from "./useCase";
import UseCaseTitle from "./UseCaseTitle.vue";
import { useMainStore } from "../../stores";
import { useCaseStore } from "../../stores/cases";
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"

onMounted(() => {
    window.Prism = window.Prism || {}
    window.Prism.manual = true
    Prism.highlightAll()
})

const store = useMainStore();
const cases = useCaseStore();

const isDarkMode = computed(() => store.isDarkMode);
const accordionTitle = computed(() => {
    return cases.code[store.lang]
})

const {
    XY_CANVAS_DS,
    XY_CANVAS_CONFIG
} = useCase()


</script>

<template>
    <UseCaseTitle>
        <template #title>
            Very large dataset
        </template>
        <template #description>
            Performance with a dataset containing 20000 datapoints
        </template>
    </UseCaseTitle>
    <div class="w-full rounded p-2 bg-white dark:bg-[#2A2A2A]">
        <VueDataUi
            component="VueUiXyCanvas" 
            :dataset="XY_CANVAS_DS"
            :config="XY_CANVAS_CONFIG"
        />
    </div>
</template>