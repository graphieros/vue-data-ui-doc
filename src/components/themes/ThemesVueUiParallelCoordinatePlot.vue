<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: "Series 1",
        shape: "triangle",
        series: [
            {
                name: 'Item 1.1',
                values: [1200, 300, 12, 1.2]
            },
            {
                name: 'Item 1.2',
                values: [1000, 100, 10, 1]
            },
            {
                name: 'Item 1.3',
                values: [-800, 85, 8.5, 0.85]
            },
        ]
    },
    {
        name: "Series 2",
        series: [
            {
                name: 'Item 2.1',
                values: [2300, 230, 23, 2.3]
            },
            {
                name: 'Item 2.2',
                values: [2500, 250, 25, 2.5]
            },
            {
                name: 'Item 2.3',
                values: [2800, 280, 28, 2.8]
            },
        ]
    },
])

const config = ref({
    style: {
        chart: {
            padding: {
                top: 24,
                left: 0,
                right: 0,
                bottom: 36
            },
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            },
            yAxis: {
                labels: {
                    axisNames: ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4'],
                    roundings: [0, 0, 0, 2]
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
        component="VueUiParallelCoordinatePlot"
        componentTheme="vue_ui_parallel_coordinate_plot"
    />
</template>