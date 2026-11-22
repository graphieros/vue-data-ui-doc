<script setup>
import ParallelCoordinateExample from "./ParallelCoordinateExample.vue";

const axes = [
    "Price ($k)",
    "Range (km)",
    "Charge time (min)",
    "Power (kW)",
    "Cargo (L)",
];
const dataset = [
    {
        name: "Compact",
        shape: "circle",
        series: [
            {
                name: "Compact 1",
                values: [32, 340, 32, 110, 300],
            },
            {
                name: "Compact 2",
                values: [36, 390, 30, 125, 340],
            },
            {
                name: "Compact 3",
                values: [40, 430, 28, 140, 360],
            },
        ],
    },
    {
        name: "SUV",
        shape: "triangle",
        series: [
            {
                name: "SUV 1",
                values: [45, 400, 35, 180, 520],
            },
            {
                name: "SUV 2",
                values: [52, 470, 31, 220, 590],
            },
            {
                name: "SUV 3",
                values: [58, 520, 27, 260, 640],
            },
        ],
    },
];
</script>

<template>
    <ParallelCoordinateExample
        title="Electric vehicle comparison"
        description="Compare vehicle costs and capabilities; lower charging time and price are preferable."
        source="uc-parallel-vehicles.vue"
        :axes="axes"
        :dataset="dataset"
    />
</template>
