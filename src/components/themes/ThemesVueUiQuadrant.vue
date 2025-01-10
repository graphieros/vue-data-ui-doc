<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
    name: "Stars",
    shape: "star",
    series: [
      {
        name: "Star 1",
        x: 50,
        y: 50
      },
      {
        name: "Star 2",
        x: -10,
        y: -10
      },
      {
        name: "Star 3",
        x: -15,
        y: 20
      },
      {
        name: "Star 4",
        x: 15,
        y: -20
      },
    ]
  },
  {
    name: "Triangles",
    shape: "triangle",
    series: [
      {
        name: "Triangle 1",
        x: -50,
        y: -50
      },
      {
        name: "Triangle 2",
        x: 25,
        y: -25
      },
      {
        name: "Triangle 3",
        x: -25,
        y: 25
      },
      {
        name: "Triangle 4",
        x: 10,
        y: 10
      }
    ]
  },
  {
    name: "Hexagons",
    shape: "hexagon",
    series: [
      {
        name: "Hexagon 1",
        x: -39,
        y: 39
      },
      {
        name: "Hexagon 2",
        x: -2,
        y: 45
      },
      {
        name: "Hexagon 3",
        x: -15,
        y: 30
      },
    ]
  },
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
        component="VueUiQuadrant"
        componentTheme="vue_ui_quadrant"
    />
</template>