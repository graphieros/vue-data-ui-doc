<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: "Serie 1",
        series: [13, 25, 29, 22, 18, 33, 16, 32, 12, 8, 23, 29],
        type: "bar",
        dataLabels: true,
    },
    {
        name: "Serie 2",
        series: [8, 25, 13, 29, 31, 42, 23, 29, 12, 44, 13, 20],
        type: "line",
        dataLabels: true,
    },
]);

const config = ref({
    bar: {
        labels: {
            show: true,
        },
    },
    line: {
        strokeWidth: 4,
    },
    style: {
        chart: {
            aspectRatio: "16 / 9",
            legend: {
                position: "top",
            },
            paddingProportions: {
                bottom: 0,
            },
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle",
                },
            },
            zoom: {
                minimap: {
                    show: true,
                },
                dragToZoom: {
                    show: true,
                },
            },
        },
    },
});
</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiXyCanvas"
        componentTheme="vue_ui_xy_canvas"
    />
</template>
