<script setup>
import { ref, computed } from "vue";
import { createNumbers } from "../../maker/lib";
import VueUiQuickChart from "vue-data-ui/vue-ui-quick-chart";
import { useMainStore } from "../../../stores";
import { useCaseStore } from "../../../stores/cases";

const store = useMainStore();
const caseStore = useCaseStore();
const isDarkMode = computed(() => store.isDarkMode);

const seriesA = [
    {
        name: "Series A",
        values: createNumbers({ count: 30, mult: 100, seed: "A", trend: "up" }),
    },
    {
        name: "Series B",
        values: createNumbers({ count: 30, mult: 100, seed: "B", trend: "up" }),
    },
    {
        name: "Series C",
        values: createNumbers({ count: 30, mult: 100, seed: "C", trend: "up" }),
    },
];

const datasets = computed(() => ({
    A: seriesA,
    B: [
        {
            name: "Total",
            values: seriesA[0].values.map((v, i) => {
                return v + seriesA[1].values[i] + seriesA[2].values[i];
            }),
            color: isDarkMode.value ? "#CCCCCC" : "#6A6A6A",
        },
    ],
}));

const config = computed(() => ({
    theme: isDarkMode.value ? "dark" : "",
    showUserOptions: false,
    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
    dragToZoom: {
        show: true,
    },
    legendPosition: "top",
    showDataLabels: false,
    xyPaddingTop: 36,
    xyPaddingRight: 36,
    zoomXyAutoFit: true,
    zoomMinimap: {
        frameColor: "transparent",
        additionalHeight: -12,
    },
}));

const zoomState = ref(null);
</script>

<template>
    <div
        class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-lg"
    >
        <VueUiQuickChart
            :dataset="datasets.A"
            :config
            v-model:zoom-state="zoomState"
        />
        <VueUiQuickChart
            :dataset="datasets.B"
            :config
            v-model:zoom-state="zoomState"
        />
    </div>

    <a
        href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/docs/zoom-state/ZoomStateVueUiQuickChart.vue"
        target="_blank"
        class="underline text-app-blue mt-4"
        >{{ caseStore.code[store.lang] }}</a
    >
</template>
