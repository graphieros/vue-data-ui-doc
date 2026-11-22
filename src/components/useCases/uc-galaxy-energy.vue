<script setup>
import GalaxyExample from "./GalaxyExample.vue";

const dataset = [
    {
        name: "Wind",
        values: [110, 85, 70],
    },
    {
        name: "Solar",
        values: [75, 60, 45],
    },
    {
        name: "Hydro",
        values: [130, 90],
    },
    {
        name: "Natural gas",
        values: [80, 55],
    },
    {
        name: "Nuclear",
        values: [160],
    },
];
</script>

<template>
    <GalaxyExample
        title="Electricity generation mix"
        description="Compare annual electricity generation by source across sites, in gigawatt-hours."
        unit=" GWh"
        source="uc-galaxy-energy.vue"
        :dataset="dataset"
    />
</template>
