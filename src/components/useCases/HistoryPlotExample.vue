<script setup>
import { computed } from "vue";
import { useMainStore } from "../../stores";
import UseCaseTitle from "./UseCaseTitle.vue";

const props = defineProps({
    title: String,
    description: String,
    xAxis: String,
    yAxis: String,
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
            height: 500,
            width: 700,
            axes: {
                x: { name: { text: props.xAxis } },
                y: { name: { text: props.yAxis } },
            },
            plots: {
                radius: 10,
                labels: { show: true, fontSize: 10 },
                indexLabels: { show: false },
            },
            paths: { show: true, useSerieColor: true, strokeWidth: 2 },
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
                >{{ description }} Points are connected in chronological order.
                Data is illustrative.</template
            ></UseCaseTitle
        >
        <div
            class="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-[#1A1A1A] rounded-md"
        >
            <VueDataUi
                component="VueUiHistoryPlot"
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
