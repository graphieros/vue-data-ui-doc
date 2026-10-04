<script setup>
import { ref, computed, useTemplateRef } from "vue";
import { useMainStore } from "../../../stores";
import { useCaseStore } from "../../../stores/cases";
import { createNumbers } from "../../maker/lib";
import { mergeConfigs } from "vue-data-ui/utils";
import VueUiStackbar from "vue-data-ui/vue-ui-stackbar";

const store = useMainStore();
const caseStore = useCaseStore();
const isDarkMode = computed(() => store.isDarkMode);
const selectedXIndex = ref(undefined);

const dataset = ref([
    {
        name: "Series A",
        series: createNumbers({
            count: 20,
            seed: "1",
            mult: 100,
            trend: "up",
        }),
    },
    {
        name: "Series B",
        series: createNumbers({
            count: 20,
            seed: "2",
            mult: 100,
        }),
    },
    {
        name: "Series C",
        series: createNumbers({
            count: 20,
            seed: "3",
            mult: 100,
        }),
    },
]);

const config = computed(() => ({
    theme: isDarkMode.value ? "dark" : "",
    userOptions: { show: false },
    events: {
        datapointEnter: ({ seriesIndex }) => {
            selectedXIndex.value = seriesIndex;
        },
        datapointLeave: () => {
            selectedXIndex.value = undefined;
        },
    },
    style: {
        chart: {
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            highlighter: {
                useLine: true,
                opacity: 20,
            },
            legend: {
                position: "top",
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            },
            bars: {
                dataLabels: {
                    show: false,
                },
                totalValues: { show: false },
            },
            padding: {
                right: 36,
                left: 36,
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
    },
}));

const configA = computed(() =>
    mergeConfigs({
        defaultConfig: config.value,
        userConfig: {},
    }),
);

const configB = computed(() =>
    mergeConfigs({
        defaultConfig: config.value,
        userConfig: {
            orientation: "horizontal",
            style: {
                chart: {
                    bars: {
                        distributed: true,
                    },
                },
            },
        },
    }),
);

const zoomState = ref(null);

const A = useTemplateRef("A");
const B = useTemplateRef("B");

function selectLegend(payload, from) {
    const names = payload.map((p) => p.name);
    const unselected = dataset.value.filter((d) => !names.includes(d.name));
    const selected = dataset.value.filter((d) => names.includes(d.name));
    if (from === "A") {
        unselected.forEach((n) => B.value.hideSeries(n.name));
        selected.forEach((n) => B.value.showSeries(n.name));
    }
    if (from === "B") {
        unselected.forEach((n) => A.value.hideSeries(n.name));
        selected.forEach((n) => A.value.showSeries(n.name));
    }
}
</script>

<template>
    <div
        class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-lg"
    >
        <VueUiStackbar
            ref="A"
            :dataset
            :config="configA"
            v-model:zoom-state="zoomState"
            :selectedXIndex="selectedXIndex"
            @selectLegend="(payload) => selectLegend(payload, 'A')"
        />
        <VueUiStackbar
            ref="B"
            :dataset
            :config="configB"
            v-model:zoom-state="zoomState"
            :selectedXIndex="selectedXIndex"
            @selectLegend="(payload) => selectLegend(payload, 'B')"
        />
    </div>

    <div class="mt-4">
        Extra code is required to sync the hover index and the legend filtering:
    </div>

    <a
        href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/docs/zoom-state/ZoomStateVueUiStackbar.vue"
        target="_blank"
        class="underline text-app-blue mt-4"
        >{{ caseStore.code[store.lang] }}</a
    >
</template>
