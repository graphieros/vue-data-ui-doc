<script setup>
import { ref, computed } from "vue";
import DeepSearch from "./DeepSearch.vue";
import BaseSignature from "./BaseSignature.vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const gizmoConfig = computed(() => {
    return {
        color: '#1f77b4',
        textColor: isDarkMode.value ? '#579ecf' : '#1A1A1A',
        gradientColor: isDarkMode.value ? '#1f77b4' : '#a5b9e8',
        stroke: isDarkMode.value ? '#5c7e96' : '#1d3e54',
        formatter: ({value}) => {
            return value.toFixed(1) + '%'
        }
    }
})

const currentStars = computed(() => store.stars)

const target = computed(() => {
    const activeThreshold = store.thresholds.find(t => currentStars.value >= t.min && currentStars.value < t.max)
    return currentStars.value / activeThreshold.max * 100
})

</script>

<template>
    <footer class="w-full fixed bottom-0 left-0 h-[64px] font-inter bg-gray-300 dark:bg-black text-gray-800 dark:text-slate-300 border-t dark:border-[#2A2A2A] transition-all flex place-items-center  justify-between pl-6" style="z-index: 1000">
        <DeepSearch :fixed="false"/>
        <!-- <div class="w-[64px]">
            <BaseSignature :color="isDarkMode ? '#3A3A3A' : '#CCCCCC'" :strokeWidth="7"/>
        </div> -->
        <div class="pr-1 font-satoshi">
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