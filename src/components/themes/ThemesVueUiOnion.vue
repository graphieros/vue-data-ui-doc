<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
    name: "Serie 1",
    percentage: 21,
    value: 1200,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 2",
    percentage: 34,
    value: 1000,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 3",
    percentage: 55,
    value: 500,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 4",
    percentage: 79,
    value: 1280,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 5",
    percentage: 52,
    value: 145,
    prefix: "",
    suffix: "",
    
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
        component="VueUiOnion"
        componentTheme="vue_ui_onion"
    />
</template>