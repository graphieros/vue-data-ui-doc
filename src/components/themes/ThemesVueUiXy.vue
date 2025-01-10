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
        series: [8, 25, 13, 29, 31, 42, 23, 29, 12, 44, 13, 20],
        type: 'line',
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
        strokeWidth: 4
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