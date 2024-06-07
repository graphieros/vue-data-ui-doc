<script setup>
import { ref } from "vue";

const dataset = ref([
  {
    id: "01",
    label: "Lorem",
    relations: ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    weights: [5, 3, 10, 2, 9, 3, 1, 2, 3, 7, 1],
  },
  {
    id: "02",
    label: "Ipsum",
    relations: ["01", "03", "07", "06", "07"],
    weights: [3, 2, 9, 7, 1],
  },
  {
    id: "03",
    label: "Dolor",
    relations: ["01", "02"],
    weights: [2, 5],
  },
  {
    id: "04",
    label: "Consectetur",
    relations: ["01", "05", "10"],
    weights: [2, 1, 4],
  },
  {
    id: "05",
    label: "Amet",
    relations: ["01", "04", "07", "10"],
    weights: [2, 3, 4, 5],
  },
  {
    id: "06",
    label: "Rherum",
    relations: ["01", "02"],
    weights: [4, 1],
  },
  {
    id: "07",
    label: "Delecta",
    relations: ["01", "02", "08", "12"],
    weights: [4, 8, 2, 1],
  },
  {
    id: "08",
    label: "Nitimur",
    relations: ["01", "07", "12", "01"],
    weights: [7, 3, 2, 3],
  },
  {
    id: "09",
    label: "Vetitum",
    relations: ["01"],
    weights: [1],
  },
  {
    id: "10",
    label: "Monumentum",
    relations: ["01", "04", "05"],
    weights: [4, 1, 4],
  },
  {
    id: "11",
    label: "Aere",
    relations: ["01"],
    weights: [3],
  },
  {
    id: "12",
    label: "Perennius",
    relations: ["01", "07", "08"],
    weights: [8, 1, 1],
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
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiRelationCircle" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiRelationCircle" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiRelationCircle" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiRelationCircle" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>