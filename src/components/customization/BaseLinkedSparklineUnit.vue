<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: ''
  },
  gradient: {
    type: String,
    default: ''
  },
  lineColor: {
    type: String,
    default: ''
  },
  dataset: {
    type: Array,
    default() {
      return []
    }
  },
  selectedIndex: {
    type: Number,
    default: null
  },
  scaleMax: {
    type: Number,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['hoverIndex'])

function hoverIndex({ index }) {
  emit('hoverIndex', index)
}

const config = computed(() => {
  return {
    theme: "",
    responsive: false,
    type: "line",
    downsample: { threshold: 500 },
    style: {
      chartWidth: 290,
      animation: { show: true, animationFrames: 360 },
      fontFamily: "inherit",
      backgroundColor: "transparent",
      scaleMin: null,
      scaleMax: props.scaleMax,
      line: { color: '#3A3A3A', strokeWidth: 3, smooth: true },
      bar: { borderRadius: 3, color: props.color },
      zeroLine: { color: "#2D353C", strokeWidth: 1 },
      plot: { show: true, radius: 8, stroke: "#FFFFFF", strokeWidth: 1 },
      verticalIndicator: {
        show: true,
        strokeWidth: 1.5,
        color: '#FFFFFF',
        strokeDasharray: 0,
      },
      dataLabel: {
        show: false,
      },
      title: {
        show: false,
      },
      area: { show: true, useGradient: true, opacity: 30, color: '#FFFFFF' },
    },
  };
});

</script>

<template>
  <div 
    :class="`flex flex-row pl-4 py-1 max-w-[400px] rounded`"
    :style="{
      background: `radial-gradient(at bottom left, ${color}, ${gradient})`
    }"
  >
    <div 
      class="w-[100px] flex flex-col place-items-start justify-center"
    >
      <span class="text-xs text-black">{{ title }}</span>
      <span v-if="![null, undefined].includes(selectedIndex)" class="text-2xl tabular-nums text-black">
        {{ dataset[selectedIndex].value }}
      </span>
      <span v-else class="text-transparent text-2xl">
        -
      </span>
    </div>
    <VueUiSparkline
      :dataset="dataset"
      :config="config"
      :selectedIndex="selectedIndex"
      @hoverIndex="hoverIndex"
    >
    </VueUiSparkline>
  </div>
</template>
