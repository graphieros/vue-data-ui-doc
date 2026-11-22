<script setup>
import GalaxyExample from "./GalaxyExample.vue";

const dataset = [
    {
        name: "Transport",
        values: [18, 12, 8],
    },
    {
        name: "Heating",
        values: [24, 14],
    },
    {
        name: "Electricity",
        values: [20, 15, 10],
    },
    {
        name: "Materials",
        values: [16, 9, 6],
    },
    {
        name: "Waste",
        values: [5, 3],
    },
];
</script>

<template>
    <GalaxyExample
        title="Environmental impact"
        description="Compare annual emissions by source, in tonnes of CO₂ equivalent."
        unit=" t CO₂e"
        source="uc-galaxy-emissions.vue"
        :dataset="dataset"
    />
</template>
