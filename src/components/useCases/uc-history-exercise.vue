<script setup>
import HistoryPlotExample from "./HistoryPlotExample.vue";

const dataset = [
    {
        name: "Runner A",
        values: [
            {
                x: 12,
                y: 6.5,
                label: "W1",
            },
            {
                x: 15,
                y: 6.3,
                label: "W2",
            },
            {
                x: 18,
                y: 6.1,
                label: "W3",
            },
            {
                x: 16,
                y: 6,
                label: "W4",
            },
            {
                x: 21,
                y: 5.8,
                label: "W5",
            },
            {
                x: 24,
                y: 5.6,
                label: "W6",
            },
        ],
    },
    {
        name: "Runner B",
        values: [
            {
                x: 8,
                y: 7.2,
                label: "W1",
            },
            {
                x: 10,
                y: 7,
                label: "W2",
            },
            {
                x: 13,
                y: 6.8,
                label: "W3",
            },
            {
                x: 15,
                y: 6.6,
                label: "W4",
            },
            {
                x: 14,
                y: 6.5,
                label: "W5",
            },
            {
                x: 18,
                y: 6.3,
                label: "W6",
            },
        ],
    },
];
</script>

<template>
    <HistoryPlotExample
        title="Exercise progress"
        description="Compare weekly training distance and average running pace. A lower pace in minutes per kilometer is faster."
        x-axis="Distance (km / week)"
        y-axis="Pace (min / km)"
        source="uc-history-exercise.vue"
        :dataset="dataset"
    />
</template>
