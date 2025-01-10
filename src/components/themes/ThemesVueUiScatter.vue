<script setup>
import { ref, computed } from "vue";
import BaseThemeUnit from "./BaseThemeUnit.vue";

const scat1 = computed(() => {
  const arr = [];
  for(let i = -50; i < 50; i += 1) {
    arr.push({
      x: Math.random()*(Math.random() > 0.3 ? i/3 : -i /5),
      y: Math.random()*i/20,
      name: `plot_${i}_cluster_1`
    });
  }
  return arr;
});

const scat2 = computed(() => {
  const arr = [];
  for(let i = -50; i < 50; i += 1) {
    arr.push({
      x: Math.random()*(Math.random() > 0.1 ? i/10 : -i /10),
      y: Math.random()*i/10,
      name: `plot_${i}_cluster_2`
    });
  }
  return arr;
});

const dataset = computed(() => {
  
  return [
  {
    name: "Cluster 1",
    values: scat1.value,
    shape: "star"
  },
  {
    name: "Cluster 2",
    values: scat2.value,
    shape: "triangle"
  }
]});

const config = ref({
    style: {
        title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            },
        layout: {
            marginalBars: {
                show: true
            }
        },
    }
})

</script>

<template>
    <BaseThemeUnit
        :config="config"
        :dataset="dataset"
        component="VueUiScatter"
        componentTheme="vue_ui_scatter"
    />
</template>