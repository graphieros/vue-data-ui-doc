<script setup>
import ParallelCoordinateExample from "./ParallelCoordinateExample.vue";

const axes = [
    "Electricity (MWh/yr)",
    "Heating (MWh/yr)",
    "Area (m²)",
    "Occupancy (people)",
    "Emissions (t/yr)",
];
const dataset = [
    {
        name: "Offices",
        shape: "circle",
        series: [
            {
                name: "Offices 1",
                values: [180, 140, 3000, 180, 60],
            },
            {
                name: "Offices 2",
                values: [240, 190, 4500, 260, 85],
            },
            {
                name: "Offices 3",
                values: [310, 230, 6000, 350, 110],
            },
        ],
    },
    {
        name: "Schools",
        shape: "triangle",
        series: [
            {
                name: "Schools 1",
                values: [130, 200, 3500, 400, 75],
            },
            {
                name: "Schools 2",
                values: [170, 260, 5000, 600, 100],
            },
            {
                name: "Schools 3",
                values: [210, 310, 6500, 800, 125],
            },
        ],
    },
];
</script>

<template>
    <ParallelCoordinateExample
        title="Building energy profiles"
        description="Compare buildings of different sizes and uses; values are absolute rather than per square meter."
        source="uc-parallel-buildings.vue"
        :axes="axes"
        :dataset="dataset"
    />
</template>
