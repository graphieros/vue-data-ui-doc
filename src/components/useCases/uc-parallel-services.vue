<script setup>
import ParallelCoordinateExample from "./ParallelCoordinateExample.vue";

const axes = [
    "Availability (%)",
    "Response (ms)",
    "Incidents / mo",
    "Recovery (min)",
    "Satisfaction (%)",
];
const dataset = [
    {
        name: "Platform",
        shape: "circle",
        series: [
            {
                name: "Platform 1",
                values: [99.9, 120, 3, 35, 88],
            },
            {
                name: "Platform 2",
                values: [99.8, 180, 5, 50, 82],
            },
            {
                name: "Platform 3",
                values: [99.95, 95, 2, 25, 91],
            },
        ],
    },
    {
        name: "Applications",
        shape: "triangle",
        series: [
            {
                name: "Applications 1",
                values: [99.7, 220, 6, 60, 80],
            },
            {
                name: "Applications 2",
                values: [99.85, 150, 4, 40, 86],
            },
            {
                name: "Applications 3",
                values: [99.9, 130, 3, 30, 90],
            },
        ],
    },
];
</script>

<template>
    <ParallelCoordinateExample
        title="IT service performance"
        description="Compare services across availability, incidents and recovery. Lower response and recovery times and fewer incidents are preferable."
        source="uc-parallel-services.vue"
        :axes="axes"
        :dataset="dataset"
    />
</template>
