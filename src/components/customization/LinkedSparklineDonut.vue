<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../../stores";
import { UserIcon, EyeIcon, UserPlusIcon } from "vue-tabler-icons";

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  dataset: {
    type: Array,
    default() {
      return []
    }
  }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => {
  return {
    type: "classic",
    responsive: false,
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    useBlurOnHover: false,
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
          curvedMarkers: true,
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
              color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
              bold: true,
              fontSize: 23,
              rounding: 0,
              formatter: null,
            },
            name: { color: isDarkMode.value ? '#BBBBBB' : '#4A4A4A', bold: false, fontSize: 14 },
            hollow: {
              show: true,
              total: {
                show: true,
                bold: false,
                fontSize: 0,
                color: "#A1A1A1",
                text: "",
                offsetY: 0,
                value: {
                  color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                  fontSize: 48,
                  offsetY: 18,
                },
              },
              average: {
                show: false,
                bold: false,
                fontSize: 18,
                color: "#A1A1A1",
                text: "Average",
                offsetY: -3,
                value: {
                  color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                  fontSize: 18,
                },
              },
            },
          },
          donut: {
            strokeWidth: 54,
          },
        },
        legend: {
          show: false,
        },
        tooltip: {
          show: false,
        },
      },
    },
  };
});

const inactiveDataset = computed(() => {
  return [
    {
      name: '',
      values: [1],
      color: isDarkMode.value ? '#3A3A3A' : '#e1e5e8'
    }
  ]
})

</script>

<template>
  <VueDataUi
    component="VueUiDonut"
    :dataset="active ? dataset : inactiveDataset"
    :config="config"
  >
  </VueDataUi>
</template>
