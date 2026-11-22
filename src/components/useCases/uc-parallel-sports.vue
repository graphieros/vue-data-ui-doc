<script setup>
import ParallelCoordinateExample from "./ParallelCoordinateExample.vue";

const axes = [
    "Points / game",
    "Assists / game",
    "Rebounds / game",
    "Shooting (%)",
    "Minutes / game",
];
const dataset = [
    {
        name: "Team A",
        shape: "circle",
        series: [
            {
                name: "Team A 1",
                values: [24, 6, 5, 48, 34],
            },
            {
                name: "Team A 2",
                values: [15, 9, 4, 45, 32],
            },
            {
                name: "Team A 3",
                values: [12, 3, 11, 52, 30],
            },
        ],
    },
    {
        name: "Team B",
        shape: "triangle",
        series: [
            {
                name: "Team B 1",
                values: [27, 4, 6, 49, 35],
            },
            {
                name: "Team B 2",
                values: [17, 8, 5, 47, 33],
            },
            {
                name: "Team B 3",
                values: [10, 2, 12, 55, 29],
            },
        ],
    },
];
</script>

<template>
    <ParallelCoordinateExample
        title="Basketball player profiles"
        description="Compare per-game player statistics and shooting accuracy across teams."
        source="uc-parallel-sports.vue"
        :axes="axes"
        :dataset="dataset"
    />
</template>
