<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
  {
    period: "period 1",
    value: 0
  },
  {
    period: "period 2",
    value: 1
  },
  {
    period: "period 3",
    value: 0
  },
  {
    period: "period 4",
    value: 2
  },
  {
    period: "period 5",
    value: 1
  },
  {
    period: "period 6",
    value: 3
  },
  {
    period: "period 7",
    value: 2
  },
  {
    period: "period 8",
    value: 5
  },
  {
    period: "period 9",
    value: 3
  },
  {
    period: "period 10",
    value: 8
  },
  {
    period: "period 11",
    value: 5
  },
  {
    period: "period 12",
    value: 13
  },
  {
    period: "period 13",
    value: 8
  },
  {
    period: "period 14",
    value: 21
  },
  {
    period: "period 15",
    value: 13
  },
  {
    period: "period 16",
    value: 34
  },
  {
    period: "period 17",
    value: 21
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
        component="VueUiSparkline"
        componentTheme="vue_ui_sparkline"
    />
</template>