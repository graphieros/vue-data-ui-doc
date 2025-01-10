<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
  {
    value: 1.2,
    valueLabel: "20%",
    timeLabel: "09:00",
    intensity: 0.2,
  },
  {
    value: 1.3,
    valueLabel: "50%",
    timeLabel: "10:00",
    intensity: 0.5,

  },
  {
    value: 1.1,
    valueLabel: "60%",
    timeLabel: "11:00",
    intensity: 0.6,

  },
  {
    value: 0.8,
    valueLabel: "70%",
    timeLabel: "12:00",
    intensity: 0.7,

  },
  {
    value: 2,
    valueLabel: "100%",
    timeLabel: "13:00",
    intensity: 1,

  },
  {
    value: 2.1,
    valueLabel: "100%",
    timeLabel: "14:00",
    intensity: 1,

  },
  {
    value: 2.3,
    valueLabel: "80%",
    timeLabel: "15:00",
    intensity: 0.8,

  },
  {
    value: 2.1,
    valueLabel: "70%",
    timeLabel: "16:00",
    intensity: 0.7,

  },
  {
    value: 0.9,
    valueLabel: "60%",
    timeLabel: "17:00",
    intensity: 0.6,

  },
  {
    value: 0.7,
    valueLabel: "50%",
    timeLabel: "18:00",
    intensity: 0.5,

  },
  {
    value: 0.3,
    valueLabel: "30%",
    timeLabel: "19:00",
    intensity: 0.3,

  },
  {
    value: 0.2,
    valueLabel: "20%",
    timeLabel: "20:00",
    intensity: 0.2,

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
      component="VueUiSparkHistogram"
      componentTheme="vue_ui_sparkhistogram"
  />
</template>