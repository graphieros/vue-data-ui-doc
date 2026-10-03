<script setup>
import { ref, computed } from "vue";
import { createNumbers } from "../../maker/lib";
import { useMainStore } from "../../../stores";
import { useCaseStore } from "../../../stores/cases";
import { mergeConfigs } from "vue-data-ui/utils";
import VueUiXyCanvas from "vue-data-ui/vue-ui-xy-canvas";

const store = useMainStore();
const caseStore = useCaseStore();
const isDarkMode = computed(() => store.isDarkMode);
const selectedXIndex = ref(undefined);

const datasets = ref({
    A: [
        {
            name: "Series A",
            series: createNumbers({
                count: 1000,
                seed: "alec",
                mult: 100,
                trend: "down",
            }),
            type: "line",
            smooth: true,
            dataLabels: false,
        },
    ],
    B: [
        {
            name: "Series B",
            series: createNumbers({
                count: 1000,
                seed: "npmx",
                mult: 100,
                trend: "up",
            }),
            type: "line",
            dataLabels: false,
        },
    ],
});

const config = computed(() => ({
    theme: isDarkMode.value ? "dark" : "",
    events: {
        datapointEnter: ({ seriesIndex }) => {
            selectedXIndex.value = seriesIndex;
        },
        datapointLeave: () => {
            selectedXIndex.value = undefined;
        },
    },
    userOptions: { show: false },
    style: {
        chart: {
            aspectRatio: 16 / 9,
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            highlighter: {
                useLine: true,
                crosshairs: {
                    show: true,
                },
            },
            legend: {
                position: "top",
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            },
            line: {
                plots: {
                    show: false,
                },
            },
            paddingProportions: {
                bottom: 0.02,
            },
            tooltip: { show: false },
            zoom: {
                autoFit: true,
                minimap: {
                    show: true,
                    frameColor: "transparent",
                    additionalHeight: -12,
                },
                preview: {
                    enable: false,
                },
                dragToZoom: {
                    show: true,
                },
            },
        },
    },
}));

const zoomState = ref(null);
</script>

<template>
    <div
        class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-lg"
    >
        <VueUiXyCanvas
            :dataset="datasets.A"
            :config
            v-model:zoom-state="zoomState"
            :selectedXIndex="selectedXIndex"
        />
        <VueUiXyCanvas
            class="w-full"
            :dataset="datasets.B"
            :config
            v-model:zoom-state="zoomState"
            :selectedXIndex="selectedXIndex"
        />
    </div>

    <!-- TODO: link -->
    <a href="/" target="_blank" class="underline text-app-blue mt-4">{{
        caseStore.code[store.lang]
    }}</a>
</template>
