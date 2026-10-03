<script setup>
import { ref, computed, useTemplateRef } from "vue";
import { useMainStore } from "../../../stores";
import { useCaseStore } from "../../../stores/cases";
import { createNumbers } from "../../maker/lib";
import VueUiDonutEvolution from "vue-data-ui/vue-ui-donut-evolution";

const store = useMainStore();
const caseStore = useCaseStore();
const isDarkMode = computed(() => store.isDarkMode);

const datasets = ref({
    A: [
        {
            name: "Serie 1",
            values: createNumbers({
                count: 12,
                seed: "A",
                mult: 10,
                trend: "up",
            }),
        },
        {
            name: "Serie 2",
            values: createNumbers({ count: 12, seed: "B", mult: 12 }),
        },
        {
            name: "Serie 3",
            values: createNumbers({ count: 12, seed: "C", mult: 8 }),
        },
        {
            name: "Serie 4",
            values: createNumbers({
                count: 12,
                seed: "D",
                mult: 6,
                trend: "down",
            }),
        },
    ],
    B: [
        {
            name: "Serie 1",
            values: createNumbers({ count: 12, seed: "E", mult: 6 }),
        },
        {
            name: "Serie 2",
            values: createNumbers({
                count: 12,
                seed: "F",
                mult: 7,
                trend: "up",
            }),
        },
        {
            name: "Serie 3",
            values: createNumbers({ count: 12, seed: "G", mult: 8 }),
        },
        {
            name: "Serie 4",
            values: createNumbers({ count: 12, seed: "H", mult: 9 }),
        },
    ],
});

const config = computed(() => ({
    theme: isDarkMode.value ? "dark" : "",
    userOptions: { show: false },
    style: {
        chart: {
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            legend: {
                position: "top",
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            },
            zoom: {
                autoFit: true,
            },
        },
    },
}));

const zoomState = ref(null);

const A = useTemplateRef("A");
const B = useTemplateRef("B");

function selectLegend(payload, from) {
    const names = payload.map((p) => p.name);
    const unselected = datasets.value.A.filter((d) => !names.includes(d.name));
    const selected = datasets.value.A.filter((d) => names.includes(d.name));
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
        <VueUiDonutEvolution
            ref="A"
            :dataset="datasets.A"
            :config
            v-model:zoom-state="zoomState"
            @selectLegend="(payload) => selectLegend(payload, 'A')"
        />
        <VueUiDonutEvolution
            ref="B"
            :dataset="datasets.B"
            :config
            v-model:zoom-state="zoomState"
            @selectLegend="(payload) => selectLegend(payload, 'B')"
        />
    </div>
</template>
