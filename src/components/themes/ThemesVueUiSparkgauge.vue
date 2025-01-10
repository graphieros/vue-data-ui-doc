<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref({
    value: 8,
    min: -10,
    max: 10,
    title: "KPI 1"
})

const config = ref({})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiSparkgauge"
        componentTheme="vue_ui_sparkgauge"
    />
</template>