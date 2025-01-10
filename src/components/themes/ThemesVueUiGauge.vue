<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref({
    base: 12250,
    value: 4.2,
    series: [
        {
            from: 1,
            to: 3,
        },
        {
            from: 3,
            to: 4,
        },
        {
            from: 4,
            to: 5,
        },
    ]
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
        component="VueUiGauge"
        componentTheme="vue_ui_gauge"
    />
</template>