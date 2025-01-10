<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: "Serie 1",
        values: [256]
    },
    {
        name: "Serie 2",
        values: [128]
    },
    {
        name: "Serie 3",
        values: [64]
    }
])

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
        component="VueUiGalaxy"
        componentTheme="vue_ui_galaxy"
    />
</template>