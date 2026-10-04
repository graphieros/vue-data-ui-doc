<script setup>
import { ref, computed } from "vue";
import { createNumbers } from "../../maker/lib";
import VueUiXy from "vue-data-ui/vue-ui-xy";
import { useMainStore } from "../../../stores";
import { useCaseStore } from "../../../stores/cases";
import { mergeConfigs } from "vue-data-ui/utils";

const store = useMainStore();
const caseStore = useCaseStore();
const isDarkMode = computed(() => store.isDarkMode);
const selectedXIndex = ref(undefined);

const datasets = ref({
    A: [
        {
            name: "Series A",
            series: createNumbers({
                count: 31,
                seed: "alec",
                mult: 100,
                trend: "up",
            }),
            type: "line",
            smooth: true,
            useArea: true,
        },
    ],
    B: [
        {
            name: "Series B",
            series: createNumbers({
                count: 31,
                seed: "npmx",
                mult: 100,
                trend: "up",
            }),
            type: "bar",
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
    chart: {
        backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
        grid: {
            position: "start",
            labels: {
                xAxisLabels: {
                    showOnlyAtModulo: true,
                    showFirstAndLast: false,
                },
                yAxis: {
                    useNiceScale: true,
                    scaleValueOffsetX: 14,
                },
            },
        },
        highlighter: {
            useLine: true,
            crosshairs: {
                show: true,
            },
        },
        legend: {
            position: "top",
        },
        tooltip: { show: false },
        userOptions: { show: false },
        padding: {
            right: 24,
            left: 0,
        },
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
}));

const zoomState = ref(null);
</script>

<template>
    <div
        class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-lg"
    >
        <VueUiXy
            :dataset="datasets.A"
            :config
            v-model:zoom-state="zoomState"
            :selectedXIndex="selectedXIndex"
        />
        <VueUiXy
            class="w-full"
            :dataset="datasets.B"
            :config
            v-model:zoom-state="zoomState"
            :selectedXIndex="selectedXIndex"
        />
    </div>

    <a
        href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/docs/zoom-state/ZoomStateVueUiXy.vue"
        target="_blank"
        class="underline text-app-blue mt-4"
        >{{ caseStore.code[store.lang] }}</a
    >
</template>
