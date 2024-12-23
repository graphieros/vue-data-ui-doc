<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const dataset = computed(() => {
  return [
  {
    name: "Charts",
    values: [36],
    color: '#2A2A2A'
  },
  {
    name: "Utilities",
    values: [10],
    color: '#4A4A4A'
  },
  {
    name: 'Mini charts',
    values: [10],
    color: '#6A6A6A'
  },
  {
    name: "Tables",
    values: [4],
    color: '#8A8A8A'
  },
  {
    name: "Rating",
    values: [2],
    color: '#A1A1A1'
  },
  ]
});

/**
 * This is the default config.
 * It is not required to send it all to the component.
 * You can keep only the modified attributes you need.
 */
const config = computed(() => {
  return {
    type: "classic",
    responsive: false,
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    useBlurOnHover: true,
    userOptions: {
      show: false,
    },
    translations: { total: "Total", average: "Average" },
    style: {
      fontFamily: "inherit",
      chart: {
        useGradient: true,
        gradientIntensity: 40,
        backgroundColor: "transparent",
        color: "#2D353C",
        layout: {
          labels: {
            dataLabels: {
              show: true,
              useLabelSlots: false,
              hideUnderValue: 3,
              prefix: "",
              suffix: "",
            },
            value: { rounding: 0, show: true, formatter: null },
            percentage: {
              color: isDarkMode.value ? '#6A6A6A' : '#6A6A6A',
              bold: true,
              fontSize: 12,
              rounding: 0,
              formatter: null,
            },
            name: { color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A', bold: false, fontSize: 12 },
            hollow: {
              show: true,
              total: {
                show: false,
              },
              average: {
                show: false,
              },
            },
          },
          donut: {
            strokeWidth: 55,
            borderWidth: 1,
            useShadow: false,
            shadowColor: "#2D353C",
          },
        },
        legend: {
          show: true,
          bold: false,
          backgroundColor: "transparent",
          color: isDarkMode.value ? '#6A6A6A' : '#6A6A6A',
          fontSize: 14,
          roundingValue: 0,
          roundingPercentage: 0,
        },
        tooltip: {
          show: true,
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
          fontSize: 14,
          customFormat: null,
          borderRadius: 4,
          borderColor: isDarkMode.value ? '#3A3A3A' : '#e1e5e8',
          borderWidth: 1,
          backgroundOpacity: 40,
          position: "center",
          offsetY: 24,
          showValue: true,
          showPercentage: true,
          roundingValue: 0,
          roundingPercentage: 0,
        },
        title: {
          text: "Vue Data UI",
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          fontSize: 20,
          bold: true,
          textAlign: "center",
          paddingLeft: 0,
          paddingRight: 0,
          subtitle: { color: "#A1A1A1", text: "Component types", fontSize: 16, bold: false },
        },
      },
    },
  };
});


</script>

<template>
    <VueDataUi
      component="VueUiDonut"
      :dataset="dataset"
      :config="config"
    >
      <template #svg="{ svg }">
        <foreignObject
          width="100"
          height="100"
          :x="svg.width / 2 - 45"
          :y="svg.height / 2 - 40"
          :style="{
            pointerEvents: 'none'
          }"
        >
          <img 
            src="../assets/logo.png" 
            alt="10x cat programmers"
          >
        </foreignObject>
      </template>
    </VueDataUi>
</template>
