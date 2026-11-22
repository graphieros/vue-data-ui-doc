<script setup>
import HistoryPlotExample from "./HistoryPlotExample.vue";

const dataset = [
    {
        name: "Product A",
        values: [
            {
                x: 10,
                y: 15,
                label: "Jan",
            },
            {
                x: 13,
                y: 18,
                label: "Feb",
            },
            {
                x: 18,
                y: 23,
                label: "Mar",
            },
            {
                x: 16,
                y: 25,
                label: "Apr",
            },
            {
                x: 28,
                y: 36,
                label: "May",
            },
            {
                x: 34,
                y: 45,
                label: "Jun",
            },
        ],
    },
    {
        name: "Product B",
        values: [
            {
                x: 8,
                y: 12,
                label: "Jan",
            },
            {
                x: 11,
                y: 16,
                label: "Feb",
            },
            {
                x: 14,
                y: 19,
                label: "Mar",
            },
            {
                x: 17,
                y: 23,
                label: "Apr",
            },
            {
                x: 15,
                y: 21,
                label: "May",
            },
            {
                x: 25,
                y: 34,
                label: "Jun",
            },
        ],
    },
];
</script>

<template>
    <HistoryPlotExample
        title="Product growth"
        description="Track monthly active users and revenue for two products."
        x-axis="Active users (thousands)"
        y-axis="Revenue ($ thousands)"
        source="uc-history-growth.vue"
        :dataset="dataset"
    />
</template>
