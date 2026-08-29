<script setup>
import { ref, computed } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref({
    x: 250,
    y: 200,
});

const config = ref({
    title: {
        text: "TITLE",
    },
    content: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer purus neque, eleifend non tincidunt ut, sodales vel ante.",
    },
});
</script>

<template>
    <BaseThemeUnit
        :config
        :dataset
        component="VueUiLabel"
        componentName="vue_ui_label"
    />
</template>
