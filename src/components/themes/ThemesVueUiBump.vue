<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: "JavaScript",
        values: [1.2, 1.35, 1.55, 1.75, 2.1, 2.45, 2.75, 3.05, 3.3, 3.5],
    },
    {
        name: "Python",
        values: [0.65, 0.74, 0.86, 1.02, 1.25, 1.5, 1.75, 2.05, 2.35, 2.6],
    },
    {
        name: "Java",
        values: [0.9, 0.92, 0.94, 0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08],
    },
    {
        name: "TypeScript",
        values: [0.06, 0.09, 0.14, 0.23, 0.38, 0.56, 0.76, 0.98, 1.2, 1.45],
    },
    {
        name: "C#",
        values: [0.52, 0.545, 0.57, 0.6, 0.64, 0.69, 0.74, 0.8, 0.86, 0.92],
    },
    {
        name: "C++",
        values: [0.48, 0.49, 0.5, 0.51, 0.525, 0.54, 0.56, 0.585, 0.61, 0.635],
    },
    {
        name: "Go",
        values: [0.045, 0.07, 0.11, 0.17, 0.26, 0.36, 0.47, 0.59, 0.72, 0.86],
    },
    {
        name: "Rust",
        values: [0.005, 0.009, 0.018, 0.035, 0.07, 0.12, 0.19, 0.28, 0.38, 0.5],
    },
    {
        name: "PHP",
        values: [0.7, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.61],
    },
    {
        name: "Ruby",
        values: [0.23, 0.225, 0.22, 0.215, 0.21, 0.205, 0.2, 0.195, 0.19, 0.185],
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
        component="VueUiBump"
        componentTheme="vue_ui_bump"
    />
</template>