<script setup>
import { ref, computed } from "vue";
import DeepSearch from "./DeepSearch.vue";
import BaseSignature from "./BaseSignature.vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const gizmoConfig = computed(() => {
    return {
        color: '#5f8bee',
        textColor: isDarkMode.value ? '#5f8bee' : '#1A1A1A',
        gradientColor: isDarkMode.value ? '#3658a8' : '#a5b9e8',
        stroke: isDarkMode.value ? '#8A8A8A' : '#3A3A3A',
        formatter: ({value}) => {
            return value.toFixed(1) + '%'
        }
    }
})

const currentStars = computed(() => store.stars)

const target = computed(() => {
    const thresholds = [
        { min: 1000, max: 1100 },
        { min: 1100, max: 1200 },
        { min: 1200, max: 1300 },
        { min: 1300, max: 1400 },
        { min: 1400, max: 1500 },
        { min: 1500, max: 1600 },
        { min: 1600, max: 1700 },
        { min: 1700, max: 1800 },
        { min: 1800, max: 1900 },
        { min: 1900, max: 2000 },
        { min: 2000, max: 2500 },
        { min: 2500, max: 3000 },
        { min: 3000, max: 4000 },
        { min: 4000, max: 5000 },
        { min: 5000, max: 7500 },
        { min: 7500, max: 10000 },
    ];
    const activeThreshold = thresholds.find(t => currentStars.value >= t.min && currentStars.value < t.max)
    return currentStars.value / activeThreshold.max * 100
})

</script>

<template>
    <footer class="w-full fixed bottom-0 left-0 h-[64px] font-inter bg-gray-200 dark:bg-black text-gray-800 dark:text-slate-300 border-t dark:border-[#2A2A2A] transition-all flex place-items-center  justify-between pl-6" style="z-index: 1000">
        <DeepSearch :fixed="false"/>
        <!-- <div class="w-[64px]">
            <BaseSignature :color="isDarkMode ? '#3A3A3A' : '#CCCCCC'" :strokeWidth="7"/>
        </div> -->
        <div class="pr-1">
            <VueDataUi
                v-if="currentStars"
                component="VueUiGizmo"
                :dataset="target"
                :config="gizmoConfig"
            />
        </div>
    </footer>
</template>

<style>
.vue-ui-gizmo {
    overflow: visible;
}
</style>