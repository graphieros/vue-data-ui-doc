<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    ['A1', 'B1', 10],
    ['A1', 'B2', 10],
    ['B1', 'C1', 5],
    ['B1', 'C2', 5],
    ['B1', 'C3', 5],
    ['B1', 'C4', 5],
    ['A2', 'B1', 10],
    ['B2', 'C5', 10],
    ['C3', 'D1', 2],
    ['C4', 'D1', 2],
    ['C5', 'D1', 2],
    ['C2', 'D2', 2],
    ['C3', 'D2', 1],
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
        component="VueUiFlow"
        componentTheme="vue_ui_flow"
    />
</template>