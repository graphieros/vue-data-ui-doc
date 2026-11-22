<script setup>
import ParallelCoordinateExample from "./ParallelCoordinateExample.vue";

const axes = [
    "Price ($/mo)",
    "CPU (cores)",
    "Memory (GB)",
    "Storage (GB)",
    "Network (Gbps)",
];
const dataset = [
    {
        name: "Standard",
        shape: "circle",
        series: [
            {
                name: "Standard 1",
                values: [20, 2, 4, 80, 1],
            },
            {
                name: "Standard 2",
                values: [40, 4, 8, 160, 2],
            },
            {
                name: "Standard 3",
                values: [70, 6, 16, 250, 3],
            },
        ],
    },
    {
        name: "High memory",
        shape: "triangle",
        series: [
            {
                name: "High memory 1",
                values: [35, 2, 16, 100, 1],
            },
            {
                name: "High memory 2",
                values: [65, 4, 32, 200, 2],
            },
            {
                name: "High memory 3",
                values: [110, 8, 64, 350, 4],
            },
        ],
    },
];
</script>

<template>
    <ParallelCoordinateExample
        title="Cloud hosting plans"
        description="Compare price and resources across plan tiers."
        source="uc-parallel-cloud.vue"
        :axes="axes"
        :dataset="dataset"
    />
</template>
