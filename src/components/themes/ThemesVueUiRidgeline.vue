<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: "Moscow",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-7, -6, 0, 8, 15, 18, 20, 18, 13, 7, 1, -4],
            },
        ],
    },
    {
        name: "Chicago",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-4, -2, 3, 10, 16, 22, 24, 23, 19, 12, 5, -1],
            },
        ],
    },
    {
        name: "Toronto",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-3, -2, 2, 9, 15, 20, 22, 21, 17, 10, 4, -1],
            },
        ],
    },
    {
        name: "Berlin",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [0, 2, 6, 12, 16, 19, 21, 21, 17, 12, 7, 3],
            },
        ],
    }, 
    {
        name: "Beijing",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-3, 0, 6, 14, 20, 24, 26, 25, 20, 13, 5, -1],
            },
        ],
    },
    {
        name: "London",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [5, 6, 8, 11, 15, 18, 20, 20, 17, 13, 9, 6],
            },
        ],
    },
    {
        name: "Paris",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [5, 6, 9, 12, 16, 19, 21, 21, 18, 13, 8, 5],
            },
        ],
    }, 
    {
        name: "San Francisco",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [11, 12, 13, 13, 14, 15, 15, 16, 17, 16, 14, 12],
            },
        ],
    },
    {
        name: "New York",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [0, 2, 7, 13, 18, 24, 27, 26, 22, 15, 9, 3],
            },
        ],
    },
    {
        name: "Milan",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [3, 5, 9, 14, 18, 22, 24, 24, 20, 15, 8, 4],
            },
        ],
    },
    {
        name: "Madrid",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [6, 8, 11, 13, 17, 22, 26, 25, 21, 15, 10, 7],
            },
        ],
    },
    {
        name: "Rome",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [8, 9, 11, 14, 18, 22, 25, 25, 22, 17, 12, 9],
            },
        ],
    },
    {
        name: "Seoul",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [-2, 0, 5, 12, 17, 21, 25, 26, 21, 15, 7, 1],
            },
        ],
    },
    {
        name: "Tokyo",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [5, 6, 9, 15, 19, 22, 26, 27, 24, 18, 13, 8],
            },
        ],
    },
    {
        name: "Los Angeles",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [14, 15, 15, 17, 18, 20, 22, 22, 22, 19, 16, 13],
            },
        ],
    }, 
    {
        name: "Istanbul",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [6, 6, 8, 12, 16, 21, 23, 23, 20, 16, 12, 8],
            },
        ],
    },
    {
        name: "Mexico City",
        datapoints: [
            {
                name: "Average Temperature (°C)",
                values: [13, 14, 15, 16, 16, 16, 15, 15, 15, 14, 13, 13],
            },
        ],
    },
]);
const config = ref({
    style: {
        chart: {
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            }
        }
    }
})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiRidgeline"
        componentTheme="vue_ui_ridgeline"
    />
</template>