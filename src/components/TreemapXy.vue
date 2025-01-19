<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";
import { BrandGithubFilledIcon } from "vue-tabler-icons";

/**
 * DISCLAIMER:
 * 
 * This example will probably fail to render properly in Safari.
 * Safari cannot handle styles properly when HTML content is placed inside foreignObjects
 * 
 */

const store = useMainStore()
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const dataset = computed(() => {
  return [
    {
      name: "Parent 1",
      value: 100,
      children: [
        { name: "P1 C1", value: 233 },
        { name: "P1 C2", value: 144 },
        { name: "P1 C3", value: 89 },
        { name: "P1 C4", value: 55 },
      ],
    },
    {
      name: "Parent 2",
      value: 110,
      color: '#ff7f0e',
      children: [
        { name: "P2 C1", value: 80 },
        { name: "P2 C2", value: 20 },
        { name: "P2 C3", value: 10 },
      ],
    },
  ];
});

function makeDs(n,m) {
  let arr = [];
  for(let i = 0; i < n; i += 1) {
    arr.push(Math.round(Math.random()*m))
  }
  return arr
}

function makeTimeSeries(n) {
  let arr = [];
  for (let i = 0; i < n; i += 1) {
    arr.push(`${n < 10 ? `0${i}` : i}-01-2026`)
  }
  return arr;
}

const sparklines = computed(() => {
  return {
    ['P1 C1']: {
      dataset: [{ name: 'P1 C1', series: makeDs(12, 100), type: 'bar', color: '#e7ba52' }],
      config: {
        ...xyConfig.value
      }
    },
    ['P1 C2']: {
      dataset: [{ name: 'P1 C2', series: makeDs(12, 100), type: 'bar', color: '#9edae5' }],
      config: {
        ...xyConfig.value
      }
    },
    ['P1 C3']: {
      dataset: [{ name: 'P1 C3', series: makeDs(12, 100), type: 'bar', color: '#9edae5' }],
      config: {
        ...xyConfig.value
      }
    },
    ['P1 C4']: {
      dataset: [{ name: 'P1 C3', series: makeDs(12, 100), type: 'bar', color: '#e7ba52' }],
      config: {
        ...xyConfig.value
      }
    },
    ['P2 C1']: {
      dataset: [{ name: 'P2 C1', series: makeDs(12, 100), type: 'line', useArea: true, smooth: true, color: '#FFF59D' }],
      config: {
        ...xyConfig.value,
        chart: {
          ...xyConfig.value.chart,
          padding: {
            ...xyConfig.value.chart.padding,
            left: 18,
            right: 0
          },
          grid: {
            ...xyConfig.value.chart.grid,
            position: 'start',
            labels: {
              ...xyConfig.value.chart.grid.labels,
              color: '#1A1A1A'
            }
          }
        }
      }
    },
    ['P2 C2']: {
      dataset: [{ name: 'P2 C2', series: makeDs(12, 100), type: 'line', useArea: true, smooth: true, color: '#C1FFFF' }],
      config: {
        ...xyConfig.value,
        chart: {
          ...xyConfig.value.chart,
          padding: {
            ...xyConfig.value.chart.padding,
            left: 18,
            right: 0
          },
          grid: {
            ...xyConfig.value.chart.grid,
            position: 'start',
            labels: {
              ...xyConfig.value.chart.grid.labels,
              color: '#1A1A1A'
            }
          }
        }
      }
    },
    ['P2 C3']: {
      dataset: [{ name: 'P2 C3', series: makeDs(12, 100), type: 'line', useArea: true, smooth: true, color: '#C1FFFF' }],
      config: {
        ...xyConfig.value,
        chart: {
          ...xyConfig.value.chart,
          padding: {
            ...xyConfig.value.chart.padding,
            left: 18,
            right: 0
          },
          grid: {
            ...xyConfig.value.chart.grid,
            position: 'start',
            labels: {
              ...xyConfig.value.chart.grid.labels,
              color: '#1A1A1A'
            }
          }
        }
      }
    },
  }
})

const config = computed(() => {
  return {
    style: {
      chart: {
        backgroundColor: isDarkMode.value ? '#3A3A3A' : '#FFFFFF',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        height: 600,
        width: 800,
        padding: { top: 0, right: 6, bottom: 12, left: 6 },
        layout: {
          sorted: true,
          rects: {
            stroke: isDarkMode.value ? '#3A3A3A' : '#FFFFFF',
            strokeWidth: 2,
            borderRadius: 0,
            colorRatio: 0.3,
            gradient: { show: true, intensity: 30 },
            selected: {
              stroke: "#e1e5e8",
              strokeWidth: 1,
              unselectedOpacity: 0.6,
            },
          },
          labels: {
            showDefaultLabels: true,
            fontSize: 24,
            minFontSize: 10,
            hideUnderProportion: 0.03,
            prefix: "Value: ",
            suffix: "",
            rounding: 0,
            formatter: null,
          },
        },
        legend: {
          show: true,
          bold: false,
          backgroundColor: isDarkMode.value ? '#3A3A3A' : '#FFFFFF',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          fontSize: 14,
          roundingValue: 0,
          roundingPercentage: 0,
        },
        title: {
          text: "Xy charts in a treemap",
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          fontSize: 20,
          bold: true,
          textAlign: "left",
          paddingLeft: 12,
          paddingRight: 0,
          subtitle: { color: "#A1A1A1", text: "Don't try this at home", fontSize: 16, bold: false },
        },
        tooltip: {
          show: true,
          backgroundColor: isDarkMode.value ? '#3A3A3A' : '#FFFFFF',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          fontSize: 14,
          customFormat: null,
          borderRadius: 4,
          borderColor: isDarkMode.value ? '#6A6A6A' : '#E1E5E8',
          borderWidth: 1,
          backgroundOpacity: isDarkMode.value ? 60 : 10,
          position: "center",
          offsetY: 24,
          roundingValue: 1,
        },
      },
    },
    table: {
      show: false,
      responsiveBreakpoint: 400,
      columnNames: {
        series: "Series",
        value: "Value",
        percentage: "Percentage",
      },
      th: { backgroundColor: isDarkMode.value ? '#3A3A3A' : '#FFFFFF',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A', outline: "none" },
      td: {
        backgroundColor: isDarkMode.value ? '#3A3A3A' : '#FFFFFF',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        outline: "none",
        roundingValue: 0,
        roundingPercentage: 0,
      },
    },
  };
});

const xyConfig = computed(() => {
  return {
    responsive: true,
    chart: {
      backgroundColor: 'transparent',
      userOptions: {
        show: false,
      },
      grid: {
        labels: {
          color: '#FFFFFF',
          yAxis: {
            scaleMax: 100,
            commonScaleSteps: 3
          }
        }
      },
      legend: {
        show: false,
      },
      padding: {
        top: 5,
        bottom: 5,
        left: 36
      },
      zoom: {
        show: false,
      }
    }
  }
})

</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-if="store.isSafari">
      You are using Safari, this is why the rendering sucks.
      This is also why we named this section "Don't try this at home"...
    </div>
    <VueDataUi component="VueUiTreemap" :dataset="dataset" :config="config">
      <template #rect="{ rect }">
        <div :style="{ width: '100%', height: 'calc(100% - 50px)' }">
          <VueDataUi
            component="VueUiXy"
            :dataset="sparklines[rect.name]?.dataset"
            :config="sparklines[rect.name]?.config"
          />
        </div>
      </template>
    </VueDataUi>
    <button class="py-1 px-4 bg-gray-100 dark:bg-[#FFFFFF20] hover:bg-gray-200 dark:hover:bg-[#FFFFFF30] transition-colors flex flex-row place-items-center gap-2 justify-center">
      <BrandGithubFilledIcon />
      <a href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/TreemapXy.vue" target="_blank">
        {{ translations.githubCode[store.lang] }}
      </a>
    </button>
  </div>
</template>
