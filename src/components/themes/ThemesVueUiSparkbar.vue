<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: "quality",
        value: 61.95,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "popularity",
        value: 2.04,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "maintenance",
        value: 33.33,
        rounding: 2,
        suffix: "%"
    },
]);

const config = ref({})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiSparkbar"
        componentTheme="vue_ui_sparkbar"
    />
</template>