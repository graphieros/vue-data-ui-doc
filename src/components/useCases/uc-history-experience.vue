<script setup>
import HistoryPlotExample from "./HistoryPlotExample.vue";

const dataset = [
    {
        name: "Team A",
        values: [
            {
                x: 12,
                y: 72,
                label: "Q1",
            },
            {
                x: 10,
                y: 76,
                label: "Q2",
            },
            {
                x: 8,
                y: 80,
                label: "Q3",
            },
            {
                x: 10,
                y: 77,
                label: "Q4",
            },
            {
                x: 6,
                y: 86,
                label: "Q1 next year",
            },
            {
                x: 5,
                y: 89,
                label: "Q2 next year",
            },
        ],
    },
    {
        name: "Team B",
        values: [
            {
                x: 15,
                y: 68,
                label: "Q1",
            },
            {
                x: 13,
                y: 72,
                label: "Q2",
            },
            {
                x: 11,
                y: 74,
                label: "Q3",
            },
            {
                x: 12,
                y: 70,
                label: "Q4",
            },
            {
                x: 8,
                y: 81,
                label: "Q1 next year",
            },
            {
                x: 7,
                y: 84,
                label: "Q2 next year",
            },
        ],
    },
];
</script>

<template>
    <HistoryPlotExample
        title="Customer experience"
        description="Compare quarterly support response time and customer satisfaction."
        x-axis="Response time (hours)"
        y-axis="Satisfaction (%)"
        source="uc-history-experience.vue"
        :dataset="dataset"
    />
</template>
