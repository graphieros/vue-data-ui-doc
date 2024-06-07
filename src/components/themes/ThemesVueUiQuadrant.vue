<script setup>
import { ref } from "vue";

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
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiQuadrant" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiQuadrant" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiQuadrant" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiQuadrant" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>