<script setup>
import GalaxyExample from "./GalaxyExample.vue";

const dataset = [
    {
        name: "Housing",
        values: [1200, 150],
    },
    {
        name: "Food",
        values: [350, 130],
    },
    {
        name: "Transport",
        values: [180, 90],
    },
    {
        name: "Leisure",
        values: [90, 70],
    },
    {
        name: "Utilities",
        values: [120, 80],
    },
];
</script>

<template>
    <GalaxyExample
        title="Household spending"
        description="Compare monthly household expenses in dollars."
        unit=" $"
        source="uc-galaxy-household.vue"
        :dataset="dataset"
    />
</template>
