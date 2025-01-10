<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])

const config = ref({})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiSparkTrend"
        componentTheme="vue_ui_spark_trend"
    />
</template>