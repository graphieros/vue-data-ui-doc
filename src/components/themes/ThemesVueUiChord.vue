<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref({
    matrix: [
        [ 12000, 6000, 9000, 3000],
        [ 2000, 10000, 2000, 6001], 
        [ 8000, 1600, 8000, 8001], 
        [ 1000, 1000, 1000, 7001]  
    ],
    labels: ["Group A", "Group B", "Group C", "Group D"],
});

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
        component="VueUiChord"
        componentTheme="vue_ui_chord"
    />
</template>