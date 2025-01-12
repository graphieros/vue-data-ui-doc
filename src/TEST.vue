<script setup>
import { computed } from "vue";
import { VueDataUi } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = computed(() => {
  return [
    {
      name: "Serie",
      series: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
      type: "line",
      dataLabels: true,
    },
  ];
});

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
      backgroundColor: "#FFFFFF",
      color: "#2D353C",
      height: 600,
      width: 1000,
      zoom: {
        show: true,
        color: "#CCCCCC",
        highlightColor: "#4A4A4A",
        fontSize: 14,
        useResetSlot: false,
        startIndex: null,
        endIndex: null,
        enableRangeHandles: true,
        enableSelectionDrag: true,
        minimap: {
          show: false,
          smooth: false,
          selectedColor: "#1f77b4",
          selectedColorOpacity: 0.2,
          lineColor: "#2D353C",
          selectionRadius: 2,
          indicatorColor: "#2D353C",
          verticalHandles: false,
        },
      },
      padding: { top: 36, right: 24, bottom: 64, left: 48 },
      highlighter: {
        color: "#2D353C",
        opacity: 5,
        useLine: false,
        lineDasharray: 2,
        lineWidth: 1,
      },
      highlightArea: {
        show: false,
        from: 0,
        to: 0,
        color: "#2D353C",
        opacity: 20,
        caption: {
          text: "",
          fontSize: 10,
          color: "#2D353C",
          bold: false,
          offsetY: 0,
          width: "auto",
          padding: 3,
          textAlign: "center",
        },
      },
      timeTag: {
        show: false,
        backgroundColor: "#e1e5e8",
        color: "#2D353C",
        fontSize: 12,
        circleMarker: { radius: 3, color: "#2D353C" },
      },
      grid: {
        stroke: "#e1e5e8",
        showVerticalLines: false,
        showHorizontalLines: false,
        position: "middle",
        frame: {
          show: false,
          stroke: "#e1e5e8",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeDasharray: 0,
        },
        labels: {
          show: true,
          color: "#2D353C",
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
            scaleMin: null,
            scaleMax: null,
          },
          xAxisLabels: {
            color: "#2D353C",
            show: true,
            values: [],
            fontSize: 14,
            showOnlyFirstAndLast: false,
            showOnlyAtModulo: false,
            modulo: 12,
            yOffset: 24,
            rotation: 0,
          },
        },
      },
      comments: {
        show: true,
        showInTooltip: true,
        width: 200,
        offsetX: 0,
        offsetY: 0,
      },
      labels: { fontSize: 10, prefix: "", suffix: "" },
      legend: { color: "#2D353C", show: true, fontSize: 14 },
      title: {
        text: "",
        color: "#2D353C",
        fontSize: 20,
        bold: true,
        textAlign: "center",
        paddingLeft: 0,
        paddingRight: 0,
        subtitle: { color: "#A1A1A1", text: "", fontSize: 16, bold: false },
        show: true,
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
        showTimeLabel: true,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
      },
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
          labels: true,
          fullscreen: true,
          sort: false,
          stack: true,
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
          labels: "Toggle labels",
          fullscreen: "Toggle fullscreen",
          stack: "Toggle stack mode",
          annotator: "Toggle annotator",
        },
      },
    },
    bar: {
      borderRadius: 2,
      useGradient: true,
      periodGap: 0.1,
      border: { useSerieColor: false, strokeWidth: 0, stroke: "#FFFFFF" },
      labels: {
        show: false,
        offsetY: -6,
        rounding: 0,
        color: "#2D353C",
        formatter: null,
      },
      serieName: {
        show: false,
        offsetY: -6,
        useAbbreviation: true,
        abbreviationSize: 3,
        useSerieColor: true,
        color: "#2D353C",
        bold: false,
      },
    },
    line: {
      radius: 3,
      useGradient: true,
      strokeWidth: 3,
      dot: { useSerieColor: true, fill: "#FFFFFF", strokeWidth: 0.5 },
      labels: {
        show: false,
        offsetY: -6,
        rounding: 0,
        color: "#2D353C",
        formatter: null,
      },
      area: { useGradient: true, opacity: 30 },
    },
    plot: {
      radius: 3,
      useGradient: true,
      dot: { useSerieColor: true, fill: "#FFFFFF", strokeWidth: 0.5 },
      labels: {
        show: false,
        offsetY: -6,
        rounding: 0,
        color: "#2D353C",
        formatter: null,
      },
    },
    table: {
      responsiveBreakpoint: 400,
      rounding: 0,
      sparkline: true,
      showSum: true,
      columnNames: { period: "Period", total: "Total" },
      th: { backgroundColor: "#fafafa", color: "#2D353C", outline: "none" },
      td: { backgroundColor: "#FFFFFF", color: "#2D353C", outline: "none" },
    },
    showTable: false,
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
  <div :style="{ width: '600px' /** Set your styles for the chart wrapper */ }">
    <VueDataUi
      component="VueUiXy"
      :dataset="dataset"
      :config="config"
      @selectLegend="selectLegend"
      @selectX="selectX"
      @selectTimeLabel="selectTimeLabel"
    >
      <!-- Use slots here in template tags. Official Vue slots documentation https://vuejs.org/guide/components/slots -->
      <!-- Documentation on Vue Data UI slots, check the slots tab at https://vue-data-ui.graphieros.com/docs#vue-ui-xy -->

      <!-- #source slot: display the source for your data -->
      <!--<template #source>
        <small>Source: <cite>My source</cite></small>
      </template>-->
    </VueDataUi>
  </div>
</template>
