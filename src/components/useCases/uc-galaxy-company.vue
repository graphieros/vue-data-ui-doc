<script setup>
import GalaxyExample from "./GalaxyExample.vue";

const dataset = [
    {
        name: "Engineering",
        values: [120, 95, 60],
    },
    {
        name: "Marketing",
        values: [85, 45, 35],
    },
    {
        name: "Operations",
        values: [70, 40, 25],
    },
    {
        name: "Sales",
        values: [65, 30],
    },
    {
        name: "Support",
        values: [35, 20],
    },
];
</script>

<template>
    <GalaxyExample
        title="Company spending"
        description="Compare quarterly project spending by department, in thousands of dollars."
        unit=" k$"
        source="uc-galaxy-company.vue"
        :dataset="dataset"
    />
</template>
