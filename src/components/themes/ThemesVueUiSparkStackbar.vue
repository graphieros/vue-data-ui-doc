<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
  {
    name: "Vue",
    value: 258,
  },
  {
    name: "JS",
    value: 36,
  },
  {
    name: "Other",
    value: 16,
  },
]);

const config = ref({
    style: {
        title: {
            text: "Title",
            subtitle: {
                text: "Subtitle"
            }
        }
    }
})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiSparkStackbar"
        componentTheme="vue_ui_sparkstackbar"
    />
</template>