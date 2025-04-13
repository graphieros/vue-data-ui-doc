<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../stores";
import useMobile from "../useMobile";

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

/**
 * This is the default config.
 * It is not required to send it all to the component.
 * You can keep only the modified attributes you need.
 */
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

/**
 * @selectLegend - Returns the current visible series when selecting / unselecting the legend
 *
 * @typedef {Object} VueUiXySelectedLegend
 * @property {string} name - The name of the legend item.
 * @property {number[]} values - The array of values associated with the legend item.
 * @property {string} color - The color representing the legend item.
 * @property {"line" | "bar" | "plot"} type - The type of the series.
 *
 * @param {VueUiXySelectedLegend[]} legend - The current visible series when selecting or unselecting the legend.
 * @returns {void}
 */
function selectLegend(legend) {
  console.log({ legend });
}

/**
 * @selectX - Returns the selected X-axis data
 *
 * @typedef {Object} DatasetItem
 * @property {string} name - The name of the dataset item.
 * @property {number} value - The value associated with the dataset item.
 * @property {string} color - The color representing the dataset item.
 * @property {"line" | "bar" | "plot"} type - The type of the dataset item.
 *
 * @typedef {Object} VueUiXySelectedX
 * @property {DatasetItem[]} dataset - An array of dataset items representing the selected X-axis data.
 * @property {number} index - The index of the selected item.
 * @property {string} indexLabel - The label of the selected index.
 *
 * Logs the selected X-axis data.
 *
 * @param {VueUiXySelectedX} selectedX - The data representing the selected X-axis.
 * @returns {void}
 */
function selectX(selectedX) {
  console.log({ selectedX });
}

/**
 * @selectTimeLabel - Returns the data associated with the selected time label
 *
 * @typedef {Object} DatapointItem
 * @property {"circle" | "triangle" | "square" | "diamond" | "pentagon" | "star" | "hexagon"} shape - The shape representing the datapoint.
 * @property {string} name - The name of the datapoint.
 * @property {string} color - The color associated with the datapoint.
 * @property {"line" | "bar" | "plot"} type - The type of the datapoint.
 * @property {number} value - The value of the datapoint.
 * @property {string[]} comments - Additional comments associated with the datapoint.
 * @property {string} prefix - A prefix to be displayed with the value.
 * @property {string} suffix - A suffix to be displayed with the value.
 *
 * @typedef {Object} VueUiXySelectedTimeLabel
 * @property {DatapointItem[]} datapoint - An array of datapoints representing the selected time label.
 * @property {number} absoluteIndex - The absolute index of the selected time label.
 * @property {string} label - The label of the selected time.
 *
 * Logs the data associated with the selected time label.
 *
 * @param {VueUiXySelectedTimeLabel} selectedTimeLabel - The data associated with the selected time label.
 * @returns {void}
 */
function selectTimeLabel(selectedTimeLabel) {
  console.log({ selectedTimeLabel });
}
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
  </div>
</template>
