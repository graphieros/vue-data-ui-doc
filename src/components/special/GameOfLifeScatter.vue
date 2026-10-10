<script setup>
import { computed } from "vue";
import { VueUiScatter } from "vue-data-ui/vue-ui-scatter";
import { useMainStore } from "../../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});

const numberFormatter = new Intl.NumberFormat("en-US");
const reasonColors = [
    "#e35d6a",
    "#3b82f6",
    "#10b981",
    "#a78bfa",
    "#f59e0b",
    "#06b6d4",
];

const dataset = computed(() => {
    const groups = new Map();

    for (const run of props.data) {
        if (!run || typeof run !== "object") continue;

        const gridSize = Number(run.gridSize);
        const initialPopulation = Number(run.initialPopulation);
        const generations = Number(run.generations);

        if (
            !Number.isFinite(gridSize) ||
            gridSize <= 0 ||
            !Number.isFinite(initialPopulation) ||
            initialPopulation < 0 ||
            initialPopulation > gridSize * gridSize ||
            !Number.isFinite(generations) ||
            generations < 0
        ) {
            continue;
        }

        const reason = run.reason || "Other";
        if (!groups.has(reason)) groups.set(reason, []);

        groups.get(reason).push({
            name:
                run.id == null
                    ? `Run ${groups.get(reason).length + 1}`
                    : `Run #${run.id}`,
            x: (initialPopulation / (gridSize * gridSize)) * 100,
            y: generations,
            // VueUiScatter uses `weight` to size individual markers.
            // Square-root scaling avoids excessively large bubbles.
            weight: Math.max(0.6, Math.min(3, Math.sqrt(gridSize / 100))) * 5,
            gridSize,
            initialPopulation,
            finalPopulation: run.finalPopulation,
            peakActive: run.peakActive,
            medianActive: run.medianActive,
            activeMilliseconds: run.activeMilliseconds,
            completedAt: run.completedAt,
            reason,
            editedDuringRun: run.editedDuringRun,
        });
    }

    return Array.from(groups, ([name, values], index) => ({
        name,
        color: reasonColors[index % reasonColors.length],
        values,
    }));
});

const xMin = computed(() =>
    Math.min(...dataset.value.flatMap((d) => d.values.map((v) => v?.x ?? 0))),
);

const pointCount = computed(() =>
    dataset.value.reduce((total, series) => total + series.values.length, 0),
);

const config = computed(() => ({
    responsive: false,
    theme: isDarkMode.value ? "dark" : "default",
    useCssAnimation: false,
    style: {
        backgroundColor: "transparent",
        layout: {
            axis: {
                xMin: xMin.value,
            },
            padding: {
                right: 12,
                left: 6,
            },
            height: 450,
            correlation: { show: false },
            plots: {
                radius: 1,
                opacity: 1,
                strokeWidth: 1,
                giftWrap: { show: false },
                significance: { show: false },
                selectors: { show: false },
            },
            dataLabels: {
                reverseAxisLabels: true,
                xAxis: {
                    name: "Initial live-cell density (%)",
                    show: true,
                    roundingValue: 1,
                },
                yAxis: {
                    name: "Generations to completion",
                    show: true,
                    roundingValue: 0,
                },
            },
        },
        title: {
            text: "Simulation longevity",
            subtitle: {
                text: "Initial density vs. generations · bubble size = grid size",
            },
        },
        legend: { show: true, position: "top", backgroundColor: "transparent" },
        tooltip: {
            showShape: false,
        },
    },
}));

function formatNumber(value) {
    return Number.isFinite(Number(value))
        ? numberFormatter.format(Number(value))
        : "—";
}
</script>

<template>
    <section class="game-of-life-scatter max-w-[500px]">
        <VueUiScatter v-if="pointCount" :dataset="dataset" :config="config">
            <template #tooltip="{ datapoint }">
                <div v-if="datapoint?.v" class="game-of-life-scatter__tooltip">
                    <strong>{{ datapoint.v.name }}</strong>
                    <span>{{ datapoint.v.reason }}</span>
                    <span
                        >Initial density: {{ datapoint.v.x.toFixed(2) }}%</span
                    >
                    <span>Generations: {{ formatNumber(datapoint.v.y) }}</span>
                    <span
                        >Grid: {{ datapoint.v.gridSize }} ×
                        {{ datapoint.v.gridSize }}</span
                    >
                    <span
                        >Initial population:
                        {{ formatNumber(datapoint.v.initialPopulation) }}</span
                    >
                    <span
                        >Final population:
                        {{ formatNumber(datapoint.v.finalPopulation) }}</span
                    >
                    <span
                        >Peak active:
                        {{ formatNumber(datapoint.v.peakActive) }}</span
                    >
                    <span
                        >Median active:
                        {{ formatNumber(datapoint.v.medianActive) }}</span
                    >
                </div>
            </template>
        </VueUiScatter>
        <p v-else class="game-of-life-scatter__empty">
            No completed runs to display yet.
        </p>
    </section>
</template>

<style scoped>
.game-of-life-scatter {
    width: 100%;
    min-width: 0;
}

.game-of-life-scatter__tooltip {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 4px 6px;
    text-align: left;
}

.game-of-life-scatter__tooltip strong {
    margin-bottom: 3px;
}

.game-of-life-scatter__empty {
    padding: 48px 16px;
    text-align: center;
    opacity: 0.7;
}
</style>
