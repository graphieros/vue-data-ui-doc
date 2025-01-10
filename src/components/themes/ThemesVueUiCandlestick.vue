<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    ["2024-01-01", 56, 120, 40, 110, 1250],
    ["2024-02-01", 110, 150, 80, 98, 2200],
    ["2024-03-01", 98, 155, 75, 103, 3500],
    ["2024-04-01", 103, 115, 102, 102, 999],
    ["2024-05-01", 102, 135, 72, 85, 3216],
    ["2024-06-01", 85, 162, 65, 107, 4315],
    ["2024-07-01", 107, 134, 99, 112, 2561],
    ["2024-08-01", 112, 125, 112, 120, 669],
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
        component="VueUiCandlestick"
        componentTheme="vue_ui_candlestick"
    />
</template>