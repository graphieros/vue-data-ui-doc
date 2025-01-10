<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref({
  value: 37,
  from: -100,
  to: 100,
  steps: 20,
  colors: {
    from: "#42d392",
    to: "#5f8bee",
  }
});

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
        component="VueUiThermometer"
        componentTheme="vue_ui_thermometer"
    />
</template>