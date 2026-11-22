<script setup>
import HistoryPlotExample from "./HistoryPlotExample.vue";

const dataset = [
    {
        name: "Line A",
        values: [
            {
                x: 10,
                y: 3,
                label: "Jan",
            },
            {
                x: 11,
                y: 2.8,
                label: "Feb",
            },
            {
                x: 12,
                y: 3.2,
                label: "Mar",
            },
            {
                x: 10.5,
                y: 3.6,
                label: "Apr",
            },
            {
                x: 14,
                y: 2.2,
                label: "May",
            },
            {
                x: 15,
                y: 2,
                label: "Jun",
            },
        ],
    },
    {
        name: "Line B",
        values: [
            {
                x: 8,
                y: 2.5,
                label: "Jan",
            },
            {
                x: 9,
                y: 2.3,
                label: "Feb",
            },
            {
                x: 10,
                y: 2.1,
                label: "Mar",
            },
            {
                x: 11,
                y: 2.4,
                label: "Apr",
            },
            {
                x: 9.5,
                y: 2.6,
                label: "May",
            },
            {
                x: 13,
                y: 1.7,
                label: "Jun",
            },
        ],
    },
];
</script>

<template>
    <HistoryPlotExample
        title="Manufacturing output and quality"
        description="Compare monthly output and defect rate for two production lines."
        x-axis="Output (thousand units)"
        y-axis="Defect rate (%)"
        source="uc-history-manufacturing.vue"
        :dataset="dataset"
    />
</template>
