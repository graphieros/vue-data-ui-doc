<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../stores";
import useMobile from "../useMobile";
import { fillEmptyDays } from "./maker/lib";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const selectedPeriod = ref("_60D")

const periods = ref({
  _7D: { id: '_7D', name: 'Last 7 days', value: 8, plotRadius: 8 },
  _15D: { id: '_15D', name: 'Last 15 days', value: 16, plotRadius: 8 },
  _30D: { id: '_30D', name: 'Last 30 days', value: 31, plotRadius: 6 },
  _60D: { id: '_60D', name: 'Last 60 days', value: 61, plotRadius: 4 },
  _90D: { id: '_90D', name: 'Last 90 days', value: 91, plotRadius: 3 },
  _6M: { id: '_6M', name: 'Last 6 months', value: 181, plotRadius: 0.1 },
  _1Y: { id: '_1Y', name: 'Last year', value: 365, plotRadius: 0.1 },
  _ALL: { id: '_ALL', name: 'Full history', value: store.downloads.lib.map(d => d.downloads).length, plotRadius: 0.1 }
})

const data_lib = computed(() => {
  return store.downloads.lib.map(d => d.downloads).slice(-periods.value[selectedPeriod.value].value).slice(0, -1)
})
const data_cli = computed(() => {
  return store.downloads.cli.map(d => d.downloads).slice(-periods.value[selectedPeriod.value].value).slice(0, -1)
})
const data_color_bridge = computed(() => {
  return store.downloads.color_bridge.map(d => d.downloads).slice(-periods.value[selectedPeriod.value].value).slice(0, -1)
})
const data_vue_hi_code = computed(() => {
  if(!store.downloads.hiCode) return []
  return store.downloads.hiCode.map(d => d.downloads).slice(-periods.value[selectedPeriod.value].value).slice(0, -1)
})

const { isMobile } = useMobile();

const dataset = computed(() => {
  return [
    {
      name: "vue-data-ui",
      series: data_lib.value,
      type: "line",
      dataLabels: false,
      useTag: isMobile.value ? undefined : 'end'
    },
    {
      name: "vue-data-ui-cli",
      series: data_cli.value,
      type: "line",
      dataLabels: false,
      color: '#ff7f0e',
      shape: 'diamond',
      useTag: isMobile.value ? undefined : 'end'
    },
    {
      name: "color-bridge",
      series: data_color_bridge.value,
      type: "line",
      dataLabels: false,
      color: '#d62728',
      shape: 'circle',
      useTag: isMobile.value ? undefined : 'end'
    },
    {
      name: "vue-hi-code",
      series: data_vue_hi_code.value,
      type: "line",
      dataLabels: false,
      color: '#239e33',
      shape: 'hexagon',
      useTag: isMobile.value ? undefined : 'end'
    },
  ];
});

const max = computed(() => {
  return Math.max(Math.max(...data_lib.value), Math.max(...data_cli.value))
})

const config = computed(() => {
  return {
    theme: "",
    responsive: false,
    customPalette: [],
    useCssAnimation: true,
    downsample: { threshold: 500 },
    chart: {
      fontFamily: "inherit",
      backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
      color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
      height: 600,
      width: 1000,
      zoom: {
        show: true,
        color: isDarkMode.value ? '#8A8A8A' : '#CCCCCC',
        highlightColor: '#1f77b4',
        fontSize: 14,
        useResetSlot: false,
        startIndex: null,
        endIndex: null,
        enableRangeHandles: true,
        enableSelectionDrag: true,
        minimap: {
          show: true,
          smooth: false,
          selectedColor: "#1f77b4",
          selectedColorOpacity: 0.2,
          lineColor: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
          selectionRadius: 2,
          indicatorColor: isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
          verticalHandles: false,
        },
      },
      padding: { top: 36, right: 36, bottom: 64, left: 64 },
      highlighter: {
        color: '#8A8A8A',
        opacity: 0,
        useLine: true,
        lineDasharray: 2,
        lineWidth: 1,
      },
      timeTag: {
        show: true,
        backgroundColor: isDarkMode.value ? '#3A3A3A' : '#E1E5E8',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        fontSize: 14,
        circleMarker: { radius: 3, color: "#2D353C" },
      },
      grid: {
        stroke: isDarkMode.value ? '#6A6A6A' : '#E1E5E8',
        showVerticalLines: false,
        showHorizontalLines: false,
        position: "middle",
        frame: {
          show: true,
          stroke: isDarkMode.value ? '#4A4A4A' : '#E1E5E8',
          strokeWidth: 1,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeDasharray: 0,
        },
        labels: {
          show: true,
          color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
          fontSize: 16,
          axis: {
            yLabel: "",
            yLabelOffsetX: 0,
            xLabel: "",
            xLabelOffsetY: 14,
            fontSize: 14,
          },
          zeroLine: { show: true },
          xAxis: { showBaseline: false },
          yAxis: {
            showBaseline: true,
            commonScaleSteps: 10,
            useIndividualScale: false,
            stacked: false,
            gap: 12,
            labelWidth: 40,
            formatter: null,
            // scaleMin: null,
            // scaleMax: Math.ceil(max.value / 100) * 100,
          },
          xAxisLabels: {
            color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
            show: false,
            values: store.downloads.cli.map(d => d.day).slice(-periods.value[selectedPeriod.value].value).slice(0, -1),
            fontSize: 14,
            showOnlyFirstAndLast: true,
            showOnlyAtModulo: false,
            modulo: 12,
            yOffset: 0,
            rotation: -33,
          },
        },
      },
      labels: { fontSize: 20, prefix: "", suffix: "" },
      legend: { 
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A', 
        show: true, 
        fontSize: 14 
      },
      title: {
        text: "NPM downloads",
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        fontSize: 20,
        bold: true,
        textAlign: "center",
        paddingLeft: 0,
        paddingRight: 0,
        subtitle: { color: "#A1A1A1", text: "@Graphieros packages", fontSize: 16, bold: false },
        show: true,
      },
      tooltip: {
        show: isMobile.value,
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
        fontSize: 14,
        customFormat: null,
        borderRadius: 4,
        borderColor: isDarkMode.value ? '#4A4A4A' : '#E1E5E8',
        borderWidth: 1,
        backgroundOpacity: 10,
        position: "center",
        offsetY: 24,
        showTimeLabel: true,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
      },
    },
    line: {
      radius: 3,
      useGradient: false,
      strokeWidth: 3,
      tag: {
        followValue: true,
        formatter: ({ value, config }) => {
          const { serieName } = config;
          return `
          <div style="display:flex;align-items:center;gap:4px">
            <span style="font-size: 10px">${serieName}</span>
            <span>${value}</span>
          </div>
          `
        }
      },
      dot: { 
          useSerieColor: false, 
          fill: isDarkMode.value ? '#2A2A2A' : "#FFFFFF", 
          strokeWidth: 2 
      },
      labels: {
        show: isMobile.value,
        offsetY: -18,
        rounding: 0,
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        formatter: null,
      },
      area: { useGradient: true, opacity: 30 },
    },
    table: {
      responsiveBreakpoint: 400,
      rounding: 0,
      sparkline: true,
      showSum: true,
      columnNames: { period: "Period", total: "Total" },
      th: { 
        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        outline: "none" 
      },
      td: { 
        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        outline: "none" 
      },
    },
    showTable: true,
  };
});

function selectLegend(legend) {
  console.log({ legend });
}

function selectX(selectedX) {
  console.log({ selectedX });
}

function selectTimeLabel(selectedTimeLabel) {
  console.log({ selectedTimeLabel });
}
function getCumulativeAveragePerDayWithMissingDays(statistics) {
    const ratingsByDate = {};
    statistics.forEach(entry => {
        const date = entry.day;
        if (!ratingsByDate[date]) {
            ratingsByDate[date] = [];
        }
        ratingsByDate[date].push(entry.downloads);
    });

    const ratingDates = Object.keys(ratingsByDate).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    const allDates = fillEmptyDays(ratingDates);

    let cumulativeSum = 0;
    let cumulativeCount = 0;
    const cumulativeAverages = [];

    allDates.forEach(date => {
        if (ratingsByDate[date]) {
            ratingsByDate[date].forEach(rating => {
                cumulativeSum += rating;
                cumulativeCount++;
            });
            cumulativeAverages.push({
                date: date,
                cumulativeAverage: cumulativeSum / cumulativeCount
            });
        } else {
            cumulativeAverages.push({
                date: date,
                cumulativeAverage: null
            });
        }
    });

    return cumulativeAverages;
}

const datasetCumulativeAverage = computed(() => {
  return [
    {
      name: 'Downloads cumulative average',
      type: 'line',
      series: getCumulativeAveragePerDayWithMissingDays(store.downloads.lib).map(d => {
        return d.cumulativeAverage
      }),
      useTag: 'start',
      useArea: true
    }
  ]
})

const configCumulativeAverage = computed(() => {
  return {
    ...config.value,
    showTable: false,
    downsample: { threshold: 2000 },
    line: {
      ...config.value.line,
      tag: {
        followValue: true,
        formatter: ({ value, config }) => {
          const { serieName } = config;
          return `
          <div style="display:flex;align-items:center;gap:4px">
            <span style="font-variant-numeric: tabular-nums">${value.toFixed(0)}</span>
          </div>
          `
        }
      },
    },
    chart: {
      ...config.value.chart,
      zoom: { show: false },
      padding: {
        top: 36,
        right: 36,
        bottom: 36,
        left: 64
      },
      title: {
        ...config.value.chart.title,
        text: "Vue Data UI",
        subtitle: {
          ...config.value.chart.title.subtitle,
          text: 'Daily downloads cumulative average'
        }
      },
      grid: {
        ...config.value.chart.grid,
        labels: {
          ...config.value.chart.grid.labels,
          xAxisLabels: {
            ...config.value.chart.grid.labels.xAxisLabels,
            values: getCumulativeAveragePerDayWithMissingDays(store.downloads.lib).map(d => d.date),
            show: false,
          }
        }
      }
    }
  }
})

</script>

<template>
  <div class="flex flex-col p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded">
    <div class="flex flex-col gap-1 bg-white dark:bg-[#2A2A2A] pt-2 mb-2">
      <label for="period" class="text-xs text-black dark:text-[#CCCCCC] px-2">Select period:</label>
      <select id="period" v-model="selectedPeriod" class="h-[36px] w-fit px-2">
        <option v-for="period in periods" :value="period.id">{{ period.name }}</option>
      </select>
    </div>
    <VueDataUi
      component="VueUiXy"
      :dataset="dataset"
      :config="config"
      @selectLegend="selectLegend"
      @selectX="selectX"
      @selectTimeLabel="selectTimeLabel"
    >
      <template #chart-background>
        <div class="w-full h-full dark:bg-[#FFFFFF06]"/>
      </template>
    </VueDataUi>

    <div class="border-t border-gray-500 my-12"/>
    <VueDataUi
      component="VueUiXy"
      :dataset="datasetCumulativeAverage"
      :config="configCumulativeAverage"
    >
    <template #pattern="{ patternId }">
      <VueUiPattern
      :id="patternId"
      name="grid"
      :stroke="isDarkMode ? '#1f77b460' : '#aec7e8'"
      />
    </template>
    <template #source>
      <div class="text-xs text-gray-500 text-left mt-3 pl-2">
        Source: api.npmjs.org
      </div>
    </template>
    </VueDataUi>
  </div>
</template>
