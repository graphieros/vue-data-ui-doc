<script setup>
import GalaxyExample from "./GalaxyExample.vue";

const dataset = [
    {
        name: "Electronics",
        values: [180, 140, 95],
    },
    {
        name: "Home",
        values: [120, 85, 60],
    },
    {
        name: "Clothing",
        values: [105, 75, 55],
    },
    {
        name: "Books",
        values: [50, 35, 25],
    },
    {
        name: "Outdoors",
        values: [65, 45, 30],
    },
];
</script>

<template>
    <GalaxyExample
        title="Sales by product category"
        description="Compare quarterly revenue by category, in thousands of dollars; values represent products."
        unit=" k$"
        source="uc-galaxy-sales.vue"
        :dataset="dataset"
    />
</template>
