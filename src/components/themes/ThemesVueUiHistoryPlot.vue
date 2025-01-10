<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: "Series 1",
        values: [
            { x: 355, y: 2.3, label: "January" },
            { x: 112, y: 1.2, label: "February" },
            { x: 313, y: 0.4, label: "March" },
            { x: 555, y: 1.2, label: "April" },
        ],
    },
    {
        name: "Series 2",
        values: [
            { x: 1000, y: 2, label: "January" },
            { x: 655, y: 4, label: "February" },
            { x: 350, y: 3, label: "March" },
            { x: 815, y: 2.5, label: "April" },
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
        component="VueUiHistoryPlot"
        componentTheme="vue_ui_history_plot"
    />
</template>