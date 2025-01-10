<script setup>
import { ref } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const dataset = ref([
    {
    name: "Root1",
    branches: [
      {
        name: "branch 1.1",
        value: 200,
        breakdown: [
          {
            name: "break 1.1.1",
            value: 50,
          },
          {
            name: "break 1.1.2",
            value: 25,
          },
          {
            name: "break 1.1.3",
            value: 25,
          },
        ]
      },
      {
        name: "branch 1.2",
        value: 100,
        breakdown: [
          {
            name: "break 1.2.1",
            value: 10,
          },
          {
            name: "break 1.2.2",
            value: 20,
          },
          {
            name: "break 1.2.3",
            value: 70,
          },
        ]
      },
      {
        name: "branch 1.3",
        value: 175,
        breakdown: [
          {
            name: "break 1.3.1",
            value: 90,
          },
          {
            name: "break 1.3.2",
            value: 10,
          },
          {
            name: "break 1.3.3",
            value: 75,
          },
        ]
      },

    ]
  },
  {
    name: "Root2",
    branches: [
      {
        name: "branch 2.1",
        value: 200,
        breakdown: [
          {
            name: "break 2.1.1",
            value: 150,
          },
          {
            name: "break 2.1.2",
            value: 25,
          },
          {
            name: "break 2.1.3",
            value: 25,
          },
        ]
      },
      {
        name: "branch 2.2",
        value: 300,
        breakdown: [
          {
            name: "break 2.2.1",
            value: 100,
          },
          {
            name: "break 2.2.2",
            value: 10,
          },
          {
            name: "break 2.2.3",
            value: 150,
          },
        ]
      },
      {
        name: "branch 2.3",
        value: 125,
        breakdown: [
          {
            name: "break 2.3.1",
            value: 80,
          },
          {
            name: "break 2.3.2",
            value: 20,
          },
          {
            name: "break 2.3.3",
            value: 25,
          },
        ]
      },
    ]
  },
  {
    name: "Root3",
    branches: [
      {
        name: "branch 3.1",
        value: 120,
        breakdown: [
          {
            name: "break 3.1.1",
            value: 100,
          },
          {
            name: "break 3.1.2",
            value: 10,
          },
          {
            name: "break 3.1.3",
            value: 10,
          },
        ]
      },
      {
        name: "branch 3.2",
        value: 90,
        breakdown: [
          {
            name: "break 3.2.1",
            value: 30,
          },
          {
            name: "break 3.2.2",
            value: 30,
          },
          {
            name: "break 3.2.3",
            value: 40,
          },
        ]
      },
      {
        name: "branch 3.3",
        value: 390,
        breakdown: [
          {
            name: "break 3.3.1",
            value: 90,
          },
          {
            name: "break 3.3.2",
            value: 200,
          },
          {
            name: "break 3.3.3",
            value: 100,
          },
        ]
      }
    ]
  },
]);

const config = ref({
    style: {
        chart: {
            layout: {
                title: {
                    text: "Title",
                    subtitle: {
                        text: "Subtitle"
                    }
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
        component="VueUiChestnut"
        componentTheme="vue_ui_chestnut"
    />
</template>