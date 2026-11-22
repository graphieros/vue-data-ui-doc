<script setup>
import ParallelCoordinateExample from "./ParallelCoordinateExample.vue";

const axes = [
    "Orders / year",
    "Order value ($)",
    "Retention (%)",
    "Support requests / year",
    "Satisfaction (%)",
];
const dataset = [
    {
        name: "Individual",
        shape: "circle",
        series: [
            {
                name: "Individual 1",
                values: [3, 45, 60, 1, 78],
            },
            {
                name: "Individual 2",
                values: [5, 65, 72, 2, 84],
            },
            {
                name: "Individual 3",
                values: [8, 80, 81, 3, 89],
            },
        ],
    },
    {
        name: "Business",
        shape: "triangle",
        series: [
            {
                name: "Business 1",
                values: [12, 150, 85, 5, 87],
            },
            {
                name: "Business 2",
                values: [18, 220, 90, 8, 91],
            },
            {
                name: "Business 3",
                values: [25, 300, 94, 10, 93],
            },
        ],
    },
];
</script>

<template>
    <ParallelCoordinateExample
        title="Customer segment comparison"
        description="Compare customer groups by purchasing, retention and support activity."
        source="uc-parallel-customers.vue"
        :axes="axes"
        :dataset="dataset"
    />
</template>
