<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../stores";
import colorBridge from "color-bridge";

const { utils } = colorBridge();

const { shiftHue } = utils();

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const dataset = ref([
  {
    name: "Charts",
    values: [37],
    color: shiftHue({ hexColor: '#1f77b4', force: 0.05})
  },
  {
    name: 'Mini charts',
    values: [10],
    color: shiftHue({ hexColor: '#1f77b4', force: 0})
  },
  {
    name: "Utilities",
    values: [9],
    color: shiftHue({ hexColor: '#1f77b4', force: -0.1})
  },
  {
    name: "Tables",
    values: [4],
    color: shiftHue({ hexColor: '#1f77b4', force: -0.15})
  },
  {
    name: "Rating",
    values: [2],
    color: shiftHue({ hexColor: '#1f77b4', force: -0.2})
  },
])

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
        gradientIntensity: 20,
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
        color: "#2D353C",
        layout: {
          curvedMarkers: true,
          labels: {
            dataLabels: {
              show: true,
              useLabelSlots: false,
              hideUnderValue: 5,
              prefix: "",
              suffix: "",
            },
            value: { rounding: 0, show: true, formatter: null },
            percentage: {
              color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A',
              bold: true,
              fontSize: 20,
              rounding: 0,
              formatter: null,
            },
            name: { color: isDarkMode.value ? '#CCCCCC' : '#6A6A6A', bold: false, fontSize: 14 },
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
            strokeWidth: 24,
            borderWidth: 2,
            useShadow: true,
            shadowColor: "#2D353C",
          },
        },
        legend: {
          show: false,
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
          width="150"
          height="150"
          :x="svg.width / 2 - 67.5"
          :y="svg.height / 2 - 50"
          :style="{
            pointerEvents: 'none'
          }"
        >
          <img 
            src="../assets/logo3.png" 
            alt="Vue Data UI logo"
            class="drop-shadow-[0_5px_4px_#1A1A1A90]"
          >
        </foreignObject>
      </template>
    </VueDataUi>
</template>
