<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        label: "TASK A",
        position: 0,
    },
    {
        label: "TASK B",
        position: 0,
    },
    {
        label: "TASK C",
        position: 0.25,
    },
    {
        label: "TASK D",
        position: 0.5,
    },
    {
        label: "TASK E",
        position: 0.8,
    },
    {
        label: "TASK F",
        position: 1,
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
            layout: {
                stackbar: {
                    paddingBottom: 12,
                },
            },
        },
    },
});
</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiHill"
        componentTheme="vue_ui_hill"
    />
</template>
