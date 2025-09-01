<script setup lang="ts">
import { computed } from "vue";
import {
  VueDataUi,
  type VueUiXyDatasetItem,
  type VueUiXyConfig,
} from "vue-data-ui";
import "vue-data-ui/style.css"; // Consider importing the css in your main file

const dataset = computed<VueUiXyDatasetItem[]>(() => {
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
const config = computed<VueUiXyConfig>(() => {
  return {
    debug: false,
    theme: "",
    responsive: false,
    loading: false,
    events: {
      datapointEnter: null,
      datapointLeave: null,
      datapointClick: null,
    },
    responsiveProportionalSizing: true,
    customPalette: [],
    useCssAnimation: false,
    downsample: { threshold: 1095 },
    chart: {
      fontFamily: "inherit",
      backgroundColor: "#FFFFFF",
      color: "#2D353C",
      height: 600,
      width: 1000,
      annotations: [
        {
          show: false,
          yAxis: {
            yTop: null,
            yBottom: null,
            label: {
              text: "",
              textAnchor: "start",
              position: "start",
              offsetX: 0,
              offsetY: 0,
              padding: { top: 12, right: 12, bottom: 12, left: 12 },
              border: { stroke: "#FFFFFF", strokeWidth: 1, rx: 0, ry: 0 },
              fontSize: 14,
              color: "#2D353C",
              backgroundColor: "#e1e5e8",
            },
            line: { stroke: "#2D353C", strokeWidth: 1, strokeDasharray: 0 },
            area: { fill: "#e1e5e8", opacity: 30 },
          },
        },
      ],
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
        preview: {
          enable: true,
          fill: "#CCCCCC50",
          stroke: "#6A6A6A",
          strokeWidth: 2,
          strokeDasharray: 0,
        },
        useDefaultFormat: true,
        timeFormat: "yyyy-MM-dd HH:mm:ss",
        customFormat: null,
      },
      padding: { top: 12, right: 12, bottom: 6, left: 6 },
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
        useDefaultFormat: true,
        timeFormat: "yyyy-MM-dd HH:mm:ss",
        customFormat: null,
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
            xLabelOffsetY: 0,
            fontSize: 14,
          },
          zeroLine: { show: true },
          xAxis: {
            showBaseline: false,
            showCrosshairs: true,
            crosshairsAlwaysAtZero: false,
            crosshairSize: 6,
          },
          yAxis: {
            position: "left",
            showBaseline: true,
            showCrosshairs: true,
            crosshairSize: 6,
            commonScaleSteps: 10,
            useIndividualScale: false,
            useNiceScale: false,
            stacked: false,
            gap: 12,
            labelWidth: 64,
            formatter: null,
            scaleMin: null,
            scaleMax: null,
            groupColor: null,
            scaleLabelOffsetX: 0,
            scaleValueOffsetX: 0,
            rounding: 1,
            serieNameFormatter: null,
          },
          xAxisLabels: {
            color: "#2D353C",
            show: true,
            values: [],
            datetimeFormatter: {
              enable: false,
              locale: "en",
              useUTC: false,
              januaryAsYear: false,
              options: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm",
                minute: "HH:mm:ss",
                second: "HH:mm:ss",
              },
            },
            fontSize: 14,
            showOnlyFirstAndLast: false,
            showOnlyAtModulo: false,
            modulo: 12,
            yOffset: 24,
            rotation: 0,
            autoRotate: { enable: true, angle: -30 },
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
      legend: {
        color: "#2D353C",
        show: true,
        fontSize: 14,
        position: "bottom",
      },
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
        smooth: true,
        backdropFilter: true,
        showTimeLabel: true,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        useDefaultTimeFormat: true,
        timeFormat: "yyyy-MM-dd HH:mm:ss",
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
        callbacks: {
          animation: null,
          annotator: null,
          csv: null,
          fullscreen: null,
          img: null,
          labels: null,
          pdf: null,
          sort: null,
          stack: null,
          table: null,
          tooltip: null,
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
        print: {
          allowTaint: false,
          backgroundColor: "#FFFFFF",
          useCORS: false,
          onclone: null,
          scale: 2,
          logging: false,
        },
      },
    },
    bar: {
      showTransition: true,
      transitionDurationMs: 300,
      borderRadius: 2,
      useGradient: true,
      periodGap: 0.1,
      innerGap: 0,
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
      showTransition: true,
      transitionDurationMs: 300,
      radius: 3,
      useGradient: true,
      strokeWidth: 3,
      cutNullValues: false,
      interLine: { pairs: [], colors: [], fillOpacity: 0.25 },
      dot: {
        hideAboveMaxSerieLength: 62,
        useSerieColor: true,
        fill: "#FFFFFF",
        strokeWidth: 0.5,
      },
      labels: {
        show: false,
        offsetY: -6,
        rounding: 0,
        color: "#2D353C",
        formatter: null,
      },
      area: { useGradient: true, opacity: 30 },
      tag: { followValue: true, formatter: null, fontSize: 14 },
    },
    plot: {
      showTransition: true,
      transitionDurationMs: 300,
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
      tag: { followValue: true, formatter: null, fontSize: 14 },
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

type VueUiXySelectedLegend = {
  readonly name: string;
  readonly values: number[];
  readonly color: string;
  readonly type: "line" | "bar" | "plot";
};
/*
 * @selectLegend - Returns the current visible series when selecting / unselecting the legend
 */
function selectLegend(legend: VueUiXySelectedLegend[]) {
  console.log({ legend });
}

/*
 * @selectX - Returns the selected X-axis data
 */
type VueUiXySelectedX = {
  dataset: Array<{
    readonly name: string;
    readonly value: number;
    readonly color: string;
    readonly type: "line" | "bar" | "plot";
  }>;
  readonly index: number;
  readonly indexLabel: string;
};
function selectX(selectedX: VueUiXySelectedX) {
  console.log({ selectedX });
}

/*
 * @selectTimeLabel - Returns the data associated with the selected time label
 */
type VueUiXySelectedTimeLabel = {
  datapoint: Array<{
    readonly shape:
      | "circle"
      | "triangle"
      | "square"
      | "diamond"
      | "pentagon"
      | "star"
      | "hexagon";
    readonly name: string;
    readonly color: string;
    readonly type: "line" | "bar" | "plot";
    readonly value: number;
    readonly comments: string[];
    readonly prefix: string;
    readonly suffix: string;
  }>;
  readonly absoluteIndex: number;
  readonly label: string;
};
function selectTimeLabel(selectedTimeLabel: VueUiXySelectedTimeLabel) {
  console.log({ selectedTimeLabel });
}
</script>

<template>
  <div
    :style="{
      width:
        '600px' /** Set your styles for the chart wrapper. This wrapper is not necessary. */,
    }"
  >
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
