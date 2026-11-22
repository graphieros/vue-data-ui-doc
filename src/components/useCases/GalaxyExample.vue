<script setup>
import { computed } from "vue";
import { useMainStore } from "../../stores";
import UseCaseTitle from "./UseCaseTitle.vue";

const props = defineProps({
    title: String,
    description: String,
    dataset: Array,
    source: String,
    unit: String,
});
const store = useMainStore();
const config = computed(() => ({
    useAnimation: true,
    animationSpeed: 1,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: store.isDarkMode ? "#1A1A1A" : "#FFFFFF",
            color: store.isDarkMode ? "#CCCCCC" : "#2D353C",
            layout: {
                arcs: { gradient: { show: false } },
                labels: {
                    dataLabels: {
                        show: true,
                        showName: true,
                        showValue: true,
                        showPercentage: true,
                        hideUnderValue: 3,
                        smallArcClusterThreshold: 8,
                        smallArcClusterFontSize: 8,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        fontSize: 10,
                        bold: true,
                        color: store.isDarkMode ? "#CCCCCC" : "#2D353C",
                        showValueFirst: true,
                        usePercentageParens: true,
                        useValueParens: false,
                        suffix: props.unit,
                    },
                },
            },
            legend: {
                show: true,
                position: "bottom",
                backgroundColor: store.isDarkMode ? "#1A1A1A" : "#FFFFFF",
                color: store.isDarkMode ? "#CCCCCC" : "#2D353C",
            },
            title: { text: "" },
        },
    },
}));
</script>

<template>
    <section class="p-4">
        <UseCaseTitle
            ><template #title>{{ title }}</template
            ><template #description
                >{{ description }} Values within each category are summed. Data
                is illustrative.</template
            ></UseCaseTitle
        >
        <div
            class="w-full max-w-xl mx-auto p-4 bg-white dark:bg-[#1A1A1A] rounded-md"
        >
            <VueDataUi
                component="VueUiGalaxy"
                :dataset="dataset"
                :config="config"
            />
        </div>
        <div class="flex justify-center mt-6">
            <a
                class="py-1 px-4 bg-gray-100 dark:bg-[#FFFFFF20] hover:bg-gray-200 dark:hover:bg-[#FFFFFF30] transition-colors"
                :href="`https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/useCases/${source}`"
                target="_blank"
                rel="noopener noreferrer"
                >{{ store.translations.githubCode[store.lang] }}</a
            >
        </div>
    </section>
</template>
