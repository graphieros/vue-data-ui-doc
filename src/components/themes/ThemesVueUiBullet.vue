<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref({
    value: 85,
    target: 80,
    segments: [
        {
            name: "Low",
            from: 0,
            to: 50,
        },
        {
            name: "Medium",
            from: 50,
            to: 70,
        },
        {
            name: "High",
            from: 70,
            to: 100,
        },
    ],
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
        component="VueUiBullet"
        componentTheme="vue_ui_bullet"
    />
</template>