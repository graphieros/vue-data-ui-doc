<script setup>
import { ref, computed } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = computed(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const arr = [];
    const dsLen = 10;
    const serieLen = days.length;
    for (let i = 0; i < serieLen; i += 1) {
        const values = [];
        for (let j = 0; j < dsLen; j += 1) {
        values.push((i + j * 2))
        }
        arr.push({
            name: `${days[i]}`,
            values
        })
    }
    return arr
});

const config = ref({
    style: {
        layout: {
            dataLabels: {
                xAxis: {
                    values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    fontSize: 18
                },
                yAxis: {
                    fontSize: 18
                }
            }
        },
        title: {
            text: "Title",
            subtitle: {
                text: "Subtitle"
            }
        },
        legend: {
            show: false,
        }
    }
})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiHeatmap"
        componentTheme="vue_ui_heatmap"
    />
</template>