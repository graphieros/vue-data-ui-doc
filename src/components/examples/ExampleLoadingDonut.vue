<template>
  <!-- Manage conditional settings depending on the loading state -->
  <!-- For example: no need to show tooltip, user options or other interactive items in the loading state -->
  <VueDataUi
    component="VueUiDonut"
    :dataset="loading ? loadingDataset : loadedDataset"
    :config="config"
  >
    <!-- Use the watermark slot to display additional loading information, or a loading animation -->
    <template #watermark v-if="loading">
      <div>
        <BaseBubbles 
          class="mt-5"
          randomColor
          stroke="#FFFFFF40"
        />
      </div>
    </template>
  </VueDataUi>
</template>


<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../../stores";
import BaseBubbles from "../BaseBubbles.vue";

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

const loadedDataset = computed(() => {
  return [
    { name: "Series 1", color: "#1f77b4", values: [100] },
    { name: "Series 2", color: "#aec7e8", values: [200] },
    { name: "Series 3", color: "#ff7f0e", values: [300, 1] },
  ];
});

const loadingDataset = computed(() => {
  return [
    { name: loadingLabel.value[store.lang], color: isDarkMode.value ? '#6A6A6A' : '#8A8A8A', values: [1] },
    { name: loadingLabel.value[store.lang], color: isDarkMode.value ? '#8A8A8A' : '#9F9F9F', values: [1] },
    { name: loadingLabel.value[store.lang], color: isDarkMode.value ? '#AFAFAF' : '#BFBFBF', values: [1] }
  ]
})

const config = computed(() => {
  return {
    type: "classic",
    responsive: false,
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    useBlurOnHover: true,
    userOptions: {
      show: !props.loading,
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
        labels: "Toggle labels",
        fullscreen: "Toggle fullscreen",
        annotator: "Toggle annotator",
      },
    },
    translations: { total: "Total", average: "Average" },
    table: {
      show: false,
      responsiveBreakpoint: 400,
      th: { backgroundColor: "#fafafa", color: "#2D353C", outline: "none" },
      td: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
        outline: "none",
        roundingValue: 0,
        roundingPercentage: 0,
      },
      columnNames: {
        series: "Series",
        value: "Value",
        percentage: "Percentage",
      },
    },
    style: {
      fontFamily: "inherit",
      chart: {
        useGradient: true,
        gradientIntensity: 40,
        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
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
              fontSize: props.loading ? 0 : 18,
              rounding: 0,
              formatter: null,
            },
            name: { color: isDarkMode.value ? '#8A8A8A' : '#8A8A8A', bold: false, fontSize: 14 },
            hollow: {
              show: !props.loading,
              total: {
                show: !props.loading,
                bold: false,
                fontSize: 18,
                color: "#A1A1A1",
                text: "Total",
                offsetY: -6,
                value: {
                  color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                  fontSize: 18,
                  bold: true,
                  suffix: "",
                  prefix: "",
                  offsetY: -6,
                  rounding: 0,
                  formatter: null,
                },
              },
              average: {
                show: !props.loading,
                bold: false,
                fontSize: 18,
                color: "#A1A1A1",
                text: "Average",
                offsetY: 0,
                value: {
                  color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                  fontSize: 18,
                  bold: true,
                  suffix: "",
                  prefix: "",
                  offsetY: 0,
                  rounding: 0,
                  formatter: null,
                },
              },
            },
          },
          donut: {
            strokeWidth: 55,
            borderWidth: 1,
            useShadow: false,
            shadowColor: "#2D353C",
          },
        },
        comments: {
          show: true,
          showInTooltip: true,
          width: 100,
          offsetY: 0,
          offsetX: 0,
        },
        legend: {
          show: true,
          bold: false,
          backgroundColor: 'transparent',
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          fontSize: 14,
          roundingValue: 0,
          roundingPercentage: 0,
        },
        tooltip: {
          show: !props.loading,
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
          showValue: true,
          showPercentage: true,
          roundingValue: 0,
          roundingPercentage: 0,
        },
        title: {
          text: "Title",
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          fontSize: 20,
          bold: true,
          textAlign: "center",
          paddingLeft: 0,
          paddingRight: 0,
          subtitle: { color: "#A1A1A1", text: props.loading ? loadingLabel.value[store.lang] : 'Subtitle', fontSize: 16, bold: false },
        },
      },
    },
  };
});
</script>