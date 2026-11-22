<script setup>
import HistoryPlotExample from "./HistoryPlotExample.vue";

const dataset = [
    {
        name: "Office A",
        values: [
            {
                x: 90,
                y: 32,
                label: "Jan",
            },
            {
                x: 110,
                y: 30,
                label: "Feb",
            },
            {
                x: 125,
                y: 28,
                label: "Mar",
            },
            {
                x: 140,
                y: 25,
                label: "Apr",
            },
            {
                x: 115,
                y: 28,
                label: "May",
            },
            {
                x: 155,
                y: 29,
                label: "Jun",
            },
        ],
    },
    {
        name: "Office B",
        values: [
            {
                x: 60,
                y: 24,
                label: "Jan",
            },
            {
                x: 75,
                y: 23,
                label: "Feb",
            },
            {
                x: 90,
                y: 21,
                label: "Mar",
            },
            {
                x: 100,
                y: 19,
                label: "Apr",
            },
            {
                x: 85,
                y: 22,
                label: "May",
            },
            {
                x: 115,
                y: 23,
                label: "Jun",
            },
        ],
    },
];
</script>

<template>
    <HistoryPlotExample
        title="Building energy efficiency"
        description="Compare monthly occupancy and energy use across buildings."
        x-axis="Average occupancy (people)"
        y-axis="Energy use (MWh)"
        source="uc-history-energy.vue"
        :dataset="dataset"
    />
</template>
