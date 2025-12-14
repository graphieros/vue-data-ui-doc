<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";
import FRANCE from "../../resources/FRANCE.json";

const dataset = ref([
    {
        name: "Paris",
        coordinates: [2.3522, 48.8566], // longitude, latitude
        description: "Capital of France",
        color: "#E63946",
        radius: 1,
        dix: 'wut',
    },
    {
        name: "Lyon",
        coordinates: [4.8357, 45.7640],
        description: "Auvergne-Rhône-Alpes",
        color: "#457B9D",
        radius: 1,
    },
    {
        name: "Marseille",
        coordinates: [5.3698, 43.2965],
        description: "Provence-Alpes-Côte d’Azur",
        color: "#2A9D8F",
        radius: 1,
    },
    {
        name: "Bordeaux",
        coordinates: [-0.5792, 44.8378],
        description: "Nouvelle-Aquitaine",
        color: "#F4A261",
        radius: 1,
    },
    {
        name: "Lille",
        coordinates: [3.0573, 50.6292],
        description: "Hauts-de-France",
        color: "#8D99AE",
        radius: 1,
    },
]);

const config = ref({
    map: {
        geoJson: FRANCE,
    },
    style: {
        chart: {
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            },
        }
    }
})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiGeo"
        componentTheme="vue_ui_geo"
    />
</template>