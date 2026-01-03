<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../stores";
import colorBridge from "color-bridge";
import { useMenuItems } from "./useMenuItems";
import useMobile from "../useMobile";
import { VueUiNestedDonuts } from "vue-data-ui";

const { utils } = colorBridge();
const { shiftHue } = utils();
const { isMobile, isTablet } = useMobile();
const { menuItems, menuCategories } = useMenuItems();
const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const dataset = computed(() => {
  let color = 0;
  return menuCategories.value.map((c) => {
    const items = menuItems.value.filter(item => item.type === c.filterBy || item.type.includes(c.filterBy));
    const count = items.length;
    return {
      items,
      name: c.title,
      values: [count],
      count,
    }
  }).toSorted((a, b) => b.count - a.count).map((item, i) => {
    return {
      ...item,
      items: item.items.map(n => ({
        ...n,
        color: shiftHue({ hexColor: '#5f8aee', force: color - ((i / menuCategories.value.length) / 4)})
      })),
      color: shiftHue({ hexColor: '#5f8aee', force: color - ((i / menuCategories.value.length) / 4)})
    }
  })
});

const nestedDataset = computed(() => {
  return [
    {
      name: 'Chart types',
      series: dataset.value
    },
    {
      name: 'Charts',
      series: dataset.value.flatMap(d => d.items).map(item => {
        return {
          name: item.name,
          values: [1],
          color: item.color
        }
      })
    }
  ]
});

const nestedConfig = computed(() => ({
  userOptions: { show: false },
  style: {
    chart: {
      backgroundColor: 'transparent',
      layout: {
        donut: {
          borderColor: isDarkMode.value ? '#2A2A2A' : '#F1F1F1',
          borderColorAuto: false,
          spacingRatio: 0.8
        },
        labels: {
          dataLabels: {
            show: false,
            useSerieColor: isDarkMode.value,
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            donutNameOffsetY: -6
          }
        }
      },
      legend: {
        show: false,
      },
      tooltip: {
          showAllItemsAtIndex: false,
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
    }
  }
}))

const datasetBar = computed(() => {
  return {
    series: dataset.value.map(d => ({
      name: d.name,
      value: d.values[0],
      color: d.color
    }))
  }
});

const configBar = computed(() => ({
  userOptions: { show: false },
  style: {
    chart: {
      backgroundColor: 'transparent',
      color: isDarkMode.value ? '#CCCCCC' : '#3A3A3A',
      legend: {
        color: isDarkMode.value ? '#CCCCCC' : '#3A3A3A',
        fontSize: 7,
        hideUnderPercentage: 0
      }
    }
  }
}));

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
        height: 360,
        width: 512,
        gradientIntensity: 20,
        backgroundColor: 'transparent',
        color: "#2D353C",
        padding: { top: 0, left: 0, bottom: -24, right: 0 },
        layout: {
          curvedMarkers: false,
          labels: {
            dataLabels: {
              show: true,
              useLabelSlots: false,
              hideUnderValue: 0,
              smallArcClusterThreshold: 8,
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
            strokeWidth: 44,
            radiusRatio: 0.35,
            borderWidth: 2,
            useShadow: true,
            shadowColor: "#2D353C",
            borderColorAuto: false,
            borderColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
          },
        },
        legend: {
          show: !isMobile.value && !isTablet.value,
          bold: false,
          backgroundColor: "transparent",
          color: isDarkMode.value ? '#CCCCCC' : '#6A6A6A',
          fontSize: 10,
          roundingValue: 0,
          roundingPercentage: 1,
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
    <div class="flex flex-row align-center justify-center">
      <VueDataUi
        component="VueUiDonut"
        :dataset="dataset"
        :config="config"
      >
        <template #svg="{ svg }">
          <foreignObject
            width="130"
            height="130"
            :x="svg.width / 2 - 60.5"
            :y="svg.height / 2 - 45"
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
  
      <VueDataUi
        component="VueUi3dBar"
        :dataset="datasetBar"
        :config="configBar"
      />
    </div>
    <div class="mx-auto max-w-[500px]">
      <VueUiNestedDonuts :dataset="nestedDataset" :config="nestedConfig"/>
    </div>
</template>