<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const dataset = computed(() => {
  return [
    {
      name: "Vue Data UI - library",
      value: store.stars,
      color: '#42d392'
    },
    { name: "Vue Data UI - CLI", value: store.stars_cli, color: '#42d392' },
    { name: "Vue Data UI - Nuxt", value: store.stars_nuxt, color: '#42d392' },
    { name: "Vue Data UI - Docs", value: store.stars_docs, color: '#42d392' },
  ];
});

const config = computed(() => {
  return {
    responsive: false,
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    style: {
      fontFamily: "inherit",
      chart: {
        backgroundColor: 'transparent',
        color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
        layout: {
          bars: {
            sort: "desc",
            useStroke: false,
            strokeWidth: 2,
            height: 32,
            gap: 6,
            borderRadius: 4,
            offsetX: 0,
            paddingRight: 24,
            useGradient: true,
            gradientIntensity: 40,
            fillOpacity: 90,
            underlayerColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
            dataLabels: {
              color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
              bold: true,
              fontSize: 12,
              value: {
                show: true,
                roundingValue: 0,
                prefix: "⭐ ",
                suffix: "",
                formatter: null,
              },
              percentage: { show: true, roundingPercentage: 1 },
              offsetX: 0,
            },
            nameLabels: {
              show: true,
              color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
              bold: false,
              fontSize: 10,
              offsetX: -12,
            },
          },
          highlighter: { color: "#2D353C", opacity: 5 },
          separators: { show: false, color: "#e1e5e8", strokeWidth: 1 },
        },
        title: {
          text: "Vue Data UI repositories",
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          fontSize: 20,
          bold: true,
          textAlign: "left",
          paddingLeft: 12,
          paddingRight: 0,
          subtitle: { color: "#A1A1A1", text: "Stargazers", fontSize: 16, bold: false },
        },
        legend: {
          show: true,
          bold: false,
          backgroundColor: 'transparent',
          color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
          fontSize: 14,
          position: "top",
          roundingValue: 0,
          roundingPercentage: 0,
          prefix: "⭐ ",
          suffix: "",
        },
        tooltip: {
          show: true,
          color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
          backgroundColor: "#FFFFFF",
          fontSize: 14,
          customFormat: null,
          borderRadius: 4,
          borderColor: isDarkMode.value ? '#4A4A4A' : '#e1e5e8',
          borderWidth: 1,
          backgroundOpacity: 0,
          position: "center",
          offsetY: 24,
          showValue: true,
          showPercentage: true,
          roundingValue: 0,
          roundingPercentage: 1,
          prefix: "⭐ ",
          suffix: "",
        },
      },
    },
    userOptions: {
      show: false,
      position: "right",
      buttons: {
        tooltip: true,
        pdf: true,
        csv: true,
        img: true,
        table: false,
        labels: false,
        fullscreen: true,
        sort: true,
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
        sort: "Toggle sort",
        annotator: "Toggle annotator",
      },
    },
    table: {
      show: false,
    },
  };
});
</script>

<template>
    <VueDataUi component="VueUiVerticalBar" :dataset="dataset" :config="config">
      <!-- Use slots here in template tags. Official Vue slots documentation https://vuejs.org/guide/components/slots -->
      <!-- Documentation on Vue Data UI slots, check the slots tab at https://vue-data-ui.graphieros.com/docs#vue-ui-vertical-bar -->

      <!-- #source slot: display the source for your data -->
      <template #source>
        <div class="text-xs text-gray-500 text-left">
          Source: Github
        </div>
      </template>
    </VueDataUi>
</template>
