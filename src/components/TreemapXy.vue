<script setup>
import { computed } from "vue";

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
      dataset: [{ name: 'P1 C1', series: makeDs(12, 100), type: 'bar', color: '#dbdb8d' }],
      config: {
        ...xyConfig.value
      }
    },
    ['P1 C2']: {
      dataset: [{ name: 'P1 C2', series: makeDs(12, 100), type: 'bar', color: '#5254a3' }],
      config: {
        ...xyConfig.value
      }
    },
    ['P1 C3']: {
      dataset: [{ name: 'P1 C3', series: makeDs(12, 100), type: 'bar', color: '#5254a3' }],
      config: {
        ...xyConfig.value
      }
    },
    ['P1 C4']: {
      dataset: [{ name: 'P1 C3', series: makeDs(12, 100), type: 'bar', color: '#5254a3' }],
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
      dataset: [{ name: 'P2 C2', series: makeDs(12, 100), type: 'line', useArea: true, smooth: true, color: '#D32F2F' }],
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
      dataset: [{ name: 'P2 C3', series: makeDs(12, 100), type: 'line', useArea: true, smooth: true, color: '#D32F2F' }],
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
    responsive: false,
    theme: "",
    customPalette: [],
    userOptions: {
      show: true,
      showOnChartHover: false,
      keepStateOnChartLeave: true,
      position: "right",
      buttons: {
        tooltip: true,
        pdf: true,
        csv: true,
        img: true,
        table: true,
        labels: false,
        fullscreen: true,
        sort: false,
        stack: false,
        animation: false,
        annotator: true,
      },
      buttonTitles: {
        open: "Open options",
        close: "Close options",
        tooltip: "Toggle tooltip",
        pdf: "Download PDF",
        csv: "Download CSV",
        img: "Download PNG",
        table: "Toggle table",
        fullscreen: "Toggle fullscreen",
        annotator: "Toggle annotator",
      },
    },
    style: {
      fontFamily: "inherit",
      chart: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
        height: 500,
        width: 800,
        padding: { top: 0, right: 6, bottom: 12, left: 6 },
        layout: {
          sorted: true,
          rects: {
            stroke: "#e1e5e8",
            strokeWidth: 1,
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
          backgroundColor: "#FFFFFF",
          color: "#2D353C",
          fontSize: 14,
          roundingValue: 0,
          roundingPercentage: 0,
        },
        title: {
          text: "Xy charts in a treemap",
          color: "#2D353C",
          fontSize: 20,
          bold: true,
          textAlign: "left",
          paddingLeft: 12,
          paddingRight: 0,
          subtitle: { color: "#A1A1A1", text: "Don't try this at home", fontSize: 16, bold: false },
        },
        tooltip: {
          show: true,
          color: "#2D353C",
          backgroundColor: "#FFFFFF",
          fontSize: 14,
          customFormat: null,
          borderRadius: 4,
          borderColor: "#e1e5e8",
          borderWidth: 1,
          backgroundOpacity: 100,
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
      th: { backgroundColor: "#fafafa", color: "#2D353C", outline: "none" },
      td: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
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
  <div class="flex flex-col">
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
    <button>
      <a href="" target="_blank">T</a>
    </button>
  </div>
</template>
