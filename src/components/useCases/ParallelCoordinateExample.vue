<script setup>
import { computed } from "vue";
import { useMainStore } from "../../stores";
import UseCaseTitle from "./UseCaseTitle.vue";

const props = defineProps({
    title: String,
    description: String,
    axes: Array,
    dataset: Array,
    source: String,
});
const store = useMainStore();
const config = computed(() => ({
    theme: store.isDarkMode ? "dark" : "",
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: store.isDarkMode ? "#1A1A1A" : "#FFFFFF",
            height: 550,
            width: 1000,
            lines: { smooth: true, strokeWidth: 2, opacity: 0.8 },
            plots: { show: true, radius: 5 },
            yAxis: {
                labels: {
                    axisNames: props.axes,
                    showAxisNames: true,
                    axisNamesAutoRotate: { enable: true, angle: -30 },
                    datapoints: { show: false },
                },
            },
            legend: {
                show: true,
                position: "bottom",
                backgroundColor: store.isDarkMode ? "#1A1A1A" : "#FFFFFF",
            },
        },
    },
}));
</script>

<template>
    <section class="p-4">
        <UseCaseTitle
            ><template #title>{{ title }}</template
            ><template #description
                >{{ description }} Data is illustrative.</template
            ></UseCaseTitle
        >
        <div class="w-full p-4 bg-white dark:bg-[#1A1A1A] rounded-md">
            <VueDataUi
                component="VueUiParallelCoordinatePlot"
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
