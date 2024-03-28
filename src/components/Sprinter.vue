<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode)

const props = defineProps({
    value: {
        type: Number,
        default: 0,
    }
})

    const config = computed(() => {
        return {
  "style": {
    "fontFamily": "inherit",
    "background": isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
    "height": 84,
    "basePosition": 84,
    "animation": {
      "show": false,
      "speedMs": 150
    },
    "title": {
      "show": false,
      "color": "#1A1A1A",
      "fontSize": 12,
      "position": "top",
      "textAlign": "center",
      "bold": false
    },
    "dataLabel": {
      "fontSize": 36,
      "autoColor": true,
      "color": "#1A1A1A",
      "offsetY": -3,
      "bold": false,
      "rounding": 0,
      "prefix": "",
      "suffix": ""
    },
    "colors": {
      "min": "#5f8bee",
      "max": "#42d392"
    },
    "track": {
      "autoColor": true,
      "color": "#5f8bee",
      "strokeLinecap": "round"
    },
    "gutter": {
      "color": isDarkMode.value ? '#3A3A3A' : "#e1e5e8",
      "strokeLinecap": "round"
    }
  }
}
    })
    
    
    const dataset = computed(() => {
        return {
  "value": props.value,
  "min": 0,
  "max": 39,
  "title": "Title"
}
    })
    
</script>

<template>
      <VueUiSparkgauge :config="config" :dataset="dataset" id="sprinter" />
</template>

<style>
#sprinter * {
  font-variant-numeric: tabular-nums !important;
}
</style>


