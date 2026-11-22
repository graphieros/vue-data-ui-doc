<script setup>
import GalaxyExample from "./GalaxyExample.vue";

const dataset = [
    {
        name: "Lodging",
        values: [700, 350],
    },
    {
        name: "Transport",
        values: [450, 120, 80],
    },
    {
        name: "Food",
        values: [200, 160, 140],
    },
    {
        name: "Activities",
        values: [120, 80, 60],
    },
    {
        name: "Other",
        values: [75, 40],
    },
];
</script>

<template>
    <GalaxyExample
        title="Travel budget"
        description="Compare planned trip expenses in dollars."
        unit=" $"
        source="uc-galaxy-travel.vue"
        :dataset="dataset"
    />
</template>
