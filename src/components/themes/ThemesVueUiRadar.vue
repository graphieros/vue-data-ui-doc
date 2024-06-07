<script setup>
import { ref } from "vue";

const dataset = ref({
  categories: [
    {
      name: "category 1",
    },
    {
      name: "category 2",
    },
    {
      name: "category 3",
    }
],
  series: [
    {
      name: "Serie 1",
      values: [65, 45, 12],
      color: "",
      target: 100
    },
    {
      name: "Serie 2",
      values: [2525, 3472, 4950],
      color: "",
      target: 10000
    },
    {
      name: "Serie 3",
      values: [4.7, 1, 3],
      color: "",
      target: 5
    },
    {
      name: "Serie 4",
      values: [400, 250, 325],
      color: "",
      target: 500
    },
    {
      name: "Serie 5",
      values: [53, 95, 67],
      color: "",
      target: 100
    },
    {
      name: "Serie 6",
      values: [166, 107, 75],
      color: "",
      target: 200
    },
    {
      name: "Serie 7",
      values: [6, 7, 10],
      color: "",
      target: 10
    },
    {
      name: "Serie 8",
      values: [6, 3, 10],
      color: "",
      target: 10
    },
    {
      name: "Serie 9",
      values: [2, 7, 9],
      color: "",
      target: 10
    },
    {
      name: "Serie 10",
      values: [6, 7, 8],
      color: "",
      target: 10
    },
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
            }
        }
    }
})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiRadar" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiRadar" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiRadar" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiRadar" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>