<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const props = defineProps({
    isWaterfall: Boolean,
});

const dataset = ref([
    {
        name: "Serie 1",
        series: [19, 20.07, 30, 40, 50, 60],
    },
    {
        name: "Serie 2",
        series: [13, 8, 9, 13, 25, 27],
    },
    {
        name: "Serie 3",
        series: [13, 10, 9, 13, 25, 19],
    },
    {
        name: "Serie 4",
        series: [25, 23, 9, 13, 25, 31],
    },
]);

const datasetWaterfall = ref([
    {
        name: "Revenue breakdown",
        type: "waterfall",
        series: [
            {
                name: "Initial revenue",
                type: "total",
                series: [
                    { name: "Product A", value: 250 },
                    { name: "Product B", value: 150 },
                    { name: "Product C", value: 100 },
                ],
            },
            {
                name: "Growth",
                type: "change",
                series: [
                    { name: "Product A", value: 80 },
                    { name: "Product B", value: 40 },
                    { name: "Product C", value: 30 },
                ],
            },
            {
                name: "Expenses",
                type: "change",
                series: [
                    { name: "Product A", value: -60 },
                    { name: "Product B", value: -40 },
                ],
            },
            {
                name: "Final revenue",
                type: "total",
                series: [
                    { name: "Product A", value: 270 },
                    { name: "Product B", value: 150 },
                    { name: "Product C", value: 130 },
                ],
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
                    text: "Subtitle",
                },
            },
        },
    },
});
</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="isWaterfall ? datasetWaterfall : dataset"
        component="VueUiStackbar"
        componentTheme="vue_ui_stackbar"
    />
</template>
