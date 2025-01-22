<template>
  <!-- Manage conditional settings depending on the loading state -->
  <!-- For example: no need to show tooltip, user options or other interactive items in the loading state -->
  <VueDataUi
    component="VueUiXy"
    :dataset="dataset"
    :config="{
      ...config,
      chart: {
        ...config.chart,
        tooltip: {
          ...config.chart.tooltip,
          show: !loading
        },
        userOptions: {
          ...config.chart.userOptions,
          show: !loading
        }
      },
      bar: {
        ...config.line,
        labels: {
          ...config.line.labels,
          show: !loading
        }
      }
    }"
  >
    <!-- Use the watermark slot to display additional loading information, or a spinner -->
    <template #watermark v-if="loading">
      <div>
        <BaseSpinner/>
      </div>
    </template>
  </VueDataUi>
</template>

<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../../stores";
import BaseSpinner from "../BaseSpinner.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  }
})

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const loadingLabel = ref({
  en: "Loading...",
  fr: "Chargement...",
  pt: "Carregando...",
  de: "Laden...",
  zh: "加载中...",
  jp: "読み込み中...",
  es: "Cargando...",
  ar: "جارٍ التحميل...",
  ko: "로딩 중..."
})

function createDs(n, m = 100) {
  const arr = [];
  for(let i = 0; i < n; i += 1) {
    arr.push(Math.round(Math.random() * m));
  }
  return arr;
}

function createDates(n, mock = false) {
  const arr = [];
  for(let i = 1; i < n+1; i += 1) {
    if (mock) {
      arr.push('-- -- --')
    } else {
      arr.push(`${i < 10 ? `0${i}`: i}-01-2026`)
    }
  }
  return arr;
}

const loadingDataset = ref(createDs(24))
const loadedDataset = ref(createDs(24))

const dataset = computed(() => {
  return [
    {
      name: props.loading ? loadingLabel.value[store.lang] : "Serie",
      series: props.loading ? loadingDataset.value : loadedDataset.value,
      type: "bar",
      dataLabels: true,
      color: props.loading ? isDarkMode.value ? '#8A8A8A' : '#CCCCCC' : undefined
    },
  ];
});

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
        color: "#CCCCCC",
        highlightColor: "#4A4A4A",
        fontSize: 14,
        useResetSlot: false,
        startIndex: null,
        endIndex: null,
        enableRangeHandles: !props.loading,
        enableSelectionDrag: !props.loading,
        minimap: {
          show: true,
          smooth: false,
          selectedColor: props.loading ? '#CCCCCC' : "#1f77b4",
          selectedColorOpacity: 0.2,
          lineColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          selectionRadius: 2,
          indicatorColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
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
            scaleMin: null,
            scaleMax: null,
          },
          xAxisLabels: {
            color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
            show: true,
            values: props.loading ? createDates(24, true) : createDates(24),
            fontSize: 14,
            showOnlyFirstAndLast: false,
            showOnlyAtModulo: false,
            modulo: 12,
            yOffset: 0,
            rotation: -33,
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
      labels: { fontSize: 18, prefix: "", suffix: "" },
      legend: { color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A', show: true, fontSize: 14 },
      title: {
        text: "Title",
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        fontSize: 20,
        bold: true,
        textAlign: "center",
        paddingLeft: 0,
        paddingRight: 0,
        subtitle: { color: "#A1A1A1", text: props.loading ? loadingLabel.value[store.lang] : 'Subtitle', fontSize: 16, bold: false },
        show: true,
      },
      tooltip: {
        show: true,
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
        fontSize: 14,
        customFormat: null,
        borderRadius: 4,
        borderColor: isDarkMode.value ? '#6A6A6A' : '#E1E5E8',
        borderWidth: 1,
        backgroundOpacity: 10,
        position: "center",
        offsetY: 24,
        showTimeLabel: true,
        showValue: true,
        showPercentage: false,
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
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
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
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
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
      th: { backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF', color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A', outline: "none" },
      td: { backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF', color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A', outline: "none" },
    },
    showTable: false,
  };
});

</script>