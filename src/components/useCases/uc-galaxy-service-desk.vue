<script setup>
import GalaxyExample from "./GalaxyExample.vue";

const dataset = [
    {
        name: "Incidents",
        values: [42, 35, 28],
    },
    {
        name: "Service requests",
        values: [38, 31, 25],
    },
    {
        name: "Problems",
        values: [8, 6, 4],
    },
    {
        name: "Changes",
        values: [15, 12, 10],
    },
];
</script>

<template>
    <GalaxyExample
        title="IT service desk workload"
        description="Compare record counts across IT service management practices; the values represent separate teams."
        unit=" records"
        source="uc-galaxy-service-desk.vue"
        :dataset="dataset"
    />
</template>
