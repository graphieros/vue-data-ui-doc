<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref({
    nodes: [
        { id: "A", label: "A",},
        { id: "B", label: "B",},
        { id: "C", label: "C",},
        { id: "D", label: "D" },
    ],
    edges: [
        { from: "A", to: "B",},
        { from: "B", to: "A" },
        { from: "B", to: "A" },
        { from: "C", to: "A" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
        { from: "D", to: "A" },
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
            },
            nodes: {
                tooltip: { showOnClick: true }
            },
            midpoints: {
                show: true
            }
        }
    }
})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiDag"
        componentTheme="vue_ui_dag"
    />
</template>