<script setup>
import ParallelCoordinateExample from "./ParallelCoordinateExample.vue";

const axes = [
    "Cost ($/unit)",
    "Delivery (days)",
    "Defects (%)",
    "Capacity (k/mo)",
    "On-time (%)",
];
const dataset = [
    {
        name: "Region A",
        shape: "circle",
        series: [
            {
                name: "Region A 1",
                values: [22, 8, 1.2, 40, 95],
            },
            {
                name: "Region A 2",
                values: [20, 12, 2.1, 55, 90],
            },
            {
                name: "Region A 3",
                values: [25, 6, 0.8, 35, 98],
            },
        ],
    },
    {
        name: "Region B",
        shape: "triangle",
        series: [
            {
                name: "Region B 1",
                values: [18, 18, 2.5, 80, 87],
            },
            {
                name: "Region B 2",
                values: [21, 14, 1.5, 65, 92],
            },
            {
                name: "Region B 3",
                values: [23, 10, 1.0, 50, 96],
            },
        ],
    },
];
</script>

<template>
    <ParallelCoordinateExample
        title="Supplier evaluation"
        description="Compare supplier performance; lower cost, delivery time and defect rate are preferable."
        source="uc-parallel-suppliers.vue"
        :axes="axes"
        :dataset="dataset"
    />
</template>
