<script setup>
import ParallelCoordinateExample from "./ParallelCoordinateExample.vue";

const axes = [
    "Price ($)",
    "Weight (kg)",
    "Battery (hours)",
    "Memory (GB)",
    "Storage (GB)",
    "Screen (in)",
];
const dataset = [
    {
        name: "Portable",
        shape: "circle",
        series: [
            {
                name: "Portable 1",
                values: [900, 1.1, 12, 16, 512, 13],
            },
            {
                name: "Portable 2",
                values: [1200, 1.2, 15, 16, 1000, 14],
            },
            {
                name: "Portable 3",
                values: [1500, 1.3, 18, 32, 1000, 14],
            },
        ],
    },
    {
        name: "Performance",
        shape: "triangle",
        series: [
            {
                name: "Performance 1",
                values: [1400, 1.8, 8, 32, 1000, 15],
            },
            {
                name: "Performance 2",
                values: [1800, 2.1, 7, 32, 2000, 16],
            },
            {
                name: "Performance 3",
                values: [2200, 2.4, 6, 64, 2000, 17],
            },
        ],
    },
];
</script>

<template>
    <ParallelCoordinateExample
        title="Laptop comparison"
        description="Compare laptop trade-offs; lower price and weight may be preferable."
        source="uc-parallel-laptops.vue"
        :axes="axes"
        :dataset="dataset"
    />
</template>
