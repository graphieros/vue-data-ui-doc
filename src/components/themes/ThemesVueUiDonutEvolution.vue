<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
        name: "Serie 1",
        values: [55, 34, 21, 13, 8, 5, 8, 13, 21, 34, 55 ],
    },
    {
        name: "Serie 2",
        values: [1, 12, 24, 32, 5, 8, 13, 21, 34, 55, 89 ]
    },
    {
        name: "Serie 3",
        values: [16, 2, 3, 5, 28, 13, 21, 34, 55, 89, 134 ]
    },
    {
        name: "Serie 4",
        values: [5, null, 5, 5, 5, 5 ]
    }
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
        component="VueUiDonutEvolution"
        componentTheme="vue_ui_donut_evolution"
    />
</template>