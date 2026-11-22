<script setup>
import GalaxyExample from "./GalaxyExample.vue";

const dataset = [
    {
        name: "Jazz",
        values: [18, 12, 9],
    },
    {
        name: "Rock",
        values: [16, 14, 8],
    },
    {
        name: "Electronic",
        values: [15, 11, 7],
    },
    {
        name: "Classical",
        values: [12, 8, 5],
    },
    {
        name: "Folk",
        values: [9, 6],
    },
];
</script>

<template>
    <GalaxyExample
        title="Music listening"
        description="Compare listening time by genre, in hours; each value represents an artist."
        unit=" h"
        source="uc-galaxy-music.vue"
        :dataset="dataset"
    />
</template>
