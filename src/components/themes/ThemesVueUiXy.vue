<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: 'Serie 1',
        series: [13, 25, 29, 22, 18, 33, 16, 32, 12, 8, 23, 29],
        type: 'bar',
        dataLabels: true
    },
    {
        name: 'Serie 2',
        series: [44, 32, 42, 50, 45, 40, 38, 42, 36, 32, 33, 40],
        type: 'line',
        smooth: true,
        dataLabels: true
    }
])

const config = ref({ // TODO
    bar: {
        labels: {
            show: true,
        }
    },
    line: {
        strokeWidth: 4,
        radius: 6,
        labels: {
            show: true
        }
    },
    chart: {
        title: {
            text: "Title",
            subtitle: {
                text: "Subtitle"
            }
        },
        padding: {
            bottom: 36,
        },
        labels: {
            fontSize: 24
        },
        grid: {
            labels: {
                fontSize: 24,
                xAxisLabels: {
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                    fontSize: 24
                }
            }
        }
    }
});

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiXy"
        componentTheme="vue_ui_xy"
    />
</template>