<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiCandlestick from "../themes/ThemesVueUiCandlestick.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseComment from "../BaseComment.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    ["2024-01-01", 56, 120, 40, 110, 1250],
    ["2024-02-01", 110, 150, 80, 98, 2200],
    ["2024-03-01", 98, 155, 75, 103, 3500],
    ["2024-04-01", 103, 115, 102, 102, 999],
    ["2024-05-01", 102, 135, 72, 85, 3216],
    ["2024-06-01", 85, 162, 65, 107, 4315],
    ["2024-07-01", 107, 134, 99, 112, 2561],
    ["2024-08-01", 112, 125, 112, 120, 669],
    ["2024-09-01", 120, 113, 76, 89, 2591],
    ["2024-10-01", 89, 150, 85, 125, 2881],
    ["2024-11-01", 125, 130, 45, 92, 1972],
    ["2024-12-01", 92, 120, 35, 75, 3599],
    ["2024-13-01", 75, 80, 26, 45, 5881],
    ["2024-14-01", 45, 60, 20, 30, 2881],
    ["2024-15-01", 30, 120, 10, 105, 2881],
]);

const config = ref({
  responsive: false,
  useCssAnimation: true,
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    height: 316,
    width: 500,
    layout: {
      padding: {
        top: 36,
        right: 48,
        bottom: 36,
        left: 48
      },
      selector: {
        color: "#1A1A1A",
        opacity: 5
      },
      grid: {
        show: true,
        stroke: "#C4C4C4",
        strokeWidth: 0.5,
        xAxis: {
          dataLabels: {
            show: true,
            fontSize: 4,
            color: "#1A1A1A",
            offsetY: 0,
            bold: false,
            rotation: 0
          }
        },
        yAxis: {
          dataLabels: {
            show: true,
            fontSize: 12,
            color: "#1A1A1A",
            roundingValue: 0,
            offsetX: 0,
            bold: false,
            steps: 10,
            prefix: "$",
            suffix: ""
          }
        }
      },
      wick: {
        stroke: "#1A1A1A",
        strokeWidth: 0.5,
        extremity: {
          shape: "line",
          size: "auto",
          color: "#1A1A1A"
        }
      },
      candle: {
        borderRadius: 1,
        stroke: "#1A1A1A",
        strokeWidth: 0.5,
        colors: {
          bearish: "#ff6400",
          bullish: "#42d392"
        },
        gradient: {
          show: true,
          underlayer: "#FFFFFF",
        },
        widthRatio: 0.5
      }
    },
    zoom: {
        show: true,
        color: "#CCCCCC",
        highlightColor: "#4A4A4A",
        fontSize: 14,
        useResetSlot: false,
        startIndex: null,
        endIndex: null
    },
    title: {
      text: "Title",
      color: "#1A1A1A",
      fontSize: 20,
      bold: true,
      textAlign: 'center',
      paddingLeft: 0,
      paddingRight: 0,
      subtitle: {
        color: "#565656",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    },
    tooltip: {
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 14,
      roundingValue: 0,
      prefix: "$",
      suffix: "",
      customFormat: null,
      borderRadius: 4,
      borderColor:"#e1e5e8",
      borderWidth: 1,
      backgroundOpacity: 30,
      position: 'center',
      offsetY: 24
    }
  },
  translations: {
    period: "Period",
    open: "Open",
    high: "High",
    low: "Low",
    last: "Last",
    volume: "Volume"
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: 'right',
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true,
      annotator: true
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
        annotator: "Toggle annotator"
    }
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none"
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none",
      roundingValue: 2,
      prefix: "$",
      suffix: ""
    }
  }
});

const darkModeConfig = ref({
  responsive: false,
  useCssAnimation: true,
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    height: 316,
    width: 500,
    layout: {
      padding: {
        top: 36,
        right: 48,
        bottom: 36,
        left: 48
      },
      selector: {
        color: "#E1E5E8",
        opacity: 10
      },
      grid: {
        show: true,
        stroke: "#666666",
        strokeWidth: 0.5,
        xAxis: {
          dataLabels: {
            show: true,
            fontSize: 4,
            color: "#CCCCCC",
            offsetY: 0,
            bold: false,
            rotation: 0
          }
        },
        yAxis: {
          dataLabels: {
            show: true,
            fontSize: 12,
            color: "#CCCCCC",
            roundingValue: 0,
            offsetX: 0,
            bold: false,
            steps: 10,
            prefix: "$",
            suffix: ""
          }
        }
      },
      wick: {
        stroke: "#CCCCCC",
        strokeWidth: 0.5,
        extremity: {
          shape: "line",
          size: "auto",
          color: "#CCCCCC"
        }
      },
      candle: {
        borderRadius: 1,
        stroke: "#2D353C",
        strokeWidth: 0.5,
        colors: {
          bearish: "#ff6400",
          bullish: "#42d392"
        },
        gradient: {
          show: true,
          underlayer: "#FFFFFF"
        },
        widthRatio: 0.5
      }
    },
    zoom: {
        show: true,
        color: "#CCCCCC",
        highlightColor: "#4A4A4A",
        fontSize: 14,
        useResetSlot: false,
        startIndex: null,
        endIndex: null
    },
    title: {
      text: "Title",
      color: "#fafafa",
      fontSize: 20,
      bold: true,
      textAlign: 'center',
      paddingLeft: 0,
      paddingRight: 0,
      subtitle: {
        color: "#A1A1A1",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    },
    tooltip: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 14,
      roundingValue: 0,
      prefix: "$",
      suffix: "",
      customFormat: null,
      borderRadius: 4,
      borderColor:"#3A3A3A",
      borderWidth: 1,
      backgroundOpacity: 30,
      position: 'center',
      offsetY: 24
    }
  },
  translations: {
    period: "Period",
    open: "Open",
    high: "High",
    low: "Low",
    last: "Last",
    volume: "Volume"
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: 'right',
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true,
      annotator: true
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
        annotator: "Toggle annotator"
    }
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none"
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
      roundingValue: 2,
      prefix: "$",
      suffix: ""
    }
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}
function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
} 

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartCandlestick" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Candlestick</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.candlestick[store.lang] }}
        </p>

        <BaseDocHeaderActions
          targetLink="vue-ui-candlestick"
          :configSource="mainConfig.vue_ui_candlestick"
        />

        <div :class="`transition-all mx-auto max-w-[600px]`">
          <Teleport to="#docSnap" :disabled="!isFixed || isMobile">
            <template v-if="!isMobile">
              <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <PinnedOffIcon v-if="isFixed"/>
                    <div v-else class="relative overflow-visible">
                        <PinIcon class="peer overflow-visible"/>
                        <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                            {{ hintPin[store.lang] }}
                        </div>
                    </div>
                </button>
                <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
            </template>
              <Suspense>
                <template #default>
                  <VueUiCandlestick :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </template>
                <template #fallback>
                  <BaseSpinner/>      
                </template>
              </Suspense>
          </Teleport>
        </div>

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_candlestick" signInfo="positiveOnly">
            <template #tab0>
              {{ translations.docs.datastructure[store.lang] }}
              <div class="mt-4">
                TS type: <code class="text-app-green">Array&lt;Array&lt;string | number&gt;&gt;</code>
              </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        Array&lt;Array&lt;string | number&gt;&gt;;
    ]
</code>
</pre>                
                </div>

                {{ translations.docs.example[store.lang] }}:<br>
                <span class="text-app-orange">
                {{ translations.docs.comments.candlestick.order[store.lang] }}<br>
                period | open | high | low | last | volume
                </span>
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: Array&lt;Array&lt;string | number&gt;&gt;</span> = [
    <span class="text-gray-500">// period | open | high | low | last | volume</span>
    ["2024-01-01", 56, 120, 40, 110, 1250],
    ["2024-02-01", 110, 150, 80, 98, 2200],
    ["2024-03-01", 98, 155, 75, 103, 3500],
    ["2024-04-01", 103, 115, 102, 102, 999],
    ["2024-05-01", 102, 135, 72, 85, 3216],
    ["2024-06-01", 85, 162, 65, 107, 4315],
    ["2024-07-01", 107, 134, 99, 112, 2561],
    ["2024-08-01", 112, 125, 112, 120, 669],
    ["2024-09-01", 120, 113, 76, 89, 2591],
    ["2024-10-01", 89, 150, 85, 125, 2881],
    ["2024-11-01", 125, 130, 45, 92, 1972],
    ["2024-12-01", 92, 120, 35, 75, 3599],
    ["2024-13-01", 75, 80, 26, 45, 5881],
    ["2024-14-01", 45, 60, 20, 30, 2881],
    ["2024-15-01", 30, 120, 10, 105, 2881]
]
</code>
</pre>                
                </div>
            </template>
            <template #tab1>
              <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
              <div class="mt-4">
                TS type: <code class="text-app-blue">VueUiCandlestickConfig</code>
              </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiCandlestickConfig" equal>
    <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <BaseAttr name="color" attr="style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <BaseAttr name="height" attr="style.height" type="number" defaultVal="316" :min="200" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="width" attr="style.width" type="number" defaultVal="500" :min="300" :max="1500" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="layout" :level="2" title="style.layout">
        <BaseDetails attr="candle" :level="3" title="style.layout.candle">
          <BaseAttr name="borderRadius" attr="style.layout.candle.borderRadius" type="number" defaultVal="1" :min="0" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="stroke" attr="style.layout.candle.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.layout.candle.strokeWidth" type="number" defaultVal="0.5" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="widthRatio" attr="style.layout.candle.widthRatio" type="range" defaultVal="0.5" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="colors" :level="4" title="style.layout.candle.colors">
            <BaseAttr name="bearish" attr="style.layout.candle.colors.bearish" type="color" defaultVal="#DC3912" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="bullish" attr="style.layout.candle.colors.bullish" type="color" defaultVal="#2CA02C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
          <BaseDetails attr="gradient" :level="4" title="style.layout.candle.gradient">
            <BaseAttr name="show" attr="style.layout.candle.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="underlayer" attr="style.layout.candle.gradient.underlayer" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="grid" :level="3" title="style.layout.grid">
          <BaseAttr name="show" attr="style.layout.grid.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          <BaseAttr name="stroke" attr="style.layout.grid.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.layout.grid.strokeWidth" type="number" defaultVal="0.5" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="xAxis" :level="4" title="style.layout.grid.xAxis">
            <BaseDetails attr="dataLabels" :level="5" title="style.layout.grid.xAxis.dataLabels">
              <BaseAttr name="show" attr="style.layout.grid.xAxis.dataLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.layout.grid.xAxis.dataLabels.fontSize" type="number" defaultVal="4" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
              <BaseAttr name="color" attr="style.layout.grid.xAxis.dataLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetY" attr="style.layout.grid.xAxis.dataLabels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
              <BaseAttr name="bold" attr="style.layout.grid.xAxis.dataLabels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="rotation" attr="style.layout.grid.xAxis.dataLabels.rotation" type="range" defaultVal="0" :min="-90" :max="90" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="yAxis" :level="4" title="style.layout.grid.yAxis">
            <BaseDetails attr="dataLabels" :level="5" title="style.layout.grid.yAxis.dataLabels">
              <BaseAttr name="show" attr="style.layout.grid.yAxis.dataLabels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="fontSize" attr="style.layout.grid.yAxis.dataLabels.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="color" attr="style.layout.grid.yAxis.dataLabels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
              <BaseAttr name="roundingValue" attr="style.layout.grid.yAxis.dataLabels.roundingValue" type="number" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="offsetX" attr="style.layout.grid.yAxis.dataLabels.offsetX" type="number" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="bold" attr="style.layout.grid.yAxis.dataLabels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="steps" attr="style.layout.grid.yAxis.dataLabels.steps" type="number" defaultVal="10" :min="2" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="prefix" attr="style.layout.grid.yAxis.dataLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
              <BaseAttr name="suffix" attr="style.layout.grid.yAxis.dataLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.layout.padding">
          <BaseAttr name="top" attr="style.layout.padding.top" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="right" attr="style.layout.padding.right" type="number" defaultVal="48" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bottom" attr="style.layout.padding.bottom" type="number" defaultVal="36" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="left" attr="style.layout.padding.left" type="number" defaultVal="48" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="selector" :level="3" title="style.layout.selector">
          <BaseAttr name="color" attr="style.layout.selector.color" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="opacity" attr="style.layout.selector.opacity" type="range" defaultVal="10" :min="0" :max="30" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="wick" :level="3" title="style.layout.wick">
          <BaseAttr name="stroke" attr="style.layout.wick.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="strokeWidth" attr="style.layout.wick.strokeWidth" type="number" defaultVal="0.5" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseDetails attr="extremity" :level="4" title="style.layout.wick.extremity">
            <BaseAttr name="shape" attr="style.layout.wick.extremity.shape" type="select" defaultVal="line" :options="['line', 'circle']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.layout.wick.extremity.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="size" attr="style.layout.wick.extremity.size" type="select" defaultVal="auto" :options="['auto', '1', '2', '4', '8', '12', '16', '20']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          </BaseDetails>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
        <BaseAttr name="paddingLeft" attr="style.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="paddingRight" attr="style.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
          <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
          <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
        <BaseAttr name="show" attr="style.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="color" attr="style.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="backgroundColor" attr="style.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="fontSize" attr="style.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="roundingValue" attr="style.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="prefix" attr="style.tooltip.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="suffix" attr="style.tooltip.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
        <BaseAttr name="borderRadius" attr="style.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="borderColor" attr="style.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="borderWidth" attr="style.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="backgroundOpacity" attr="style.tooltip.backgroundOpacity" type="range" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="position" attr="style.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="offsetY" attr="style.tooltip.offsetY" type="number" defaultVal="24" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
      <BaseDetails attr="zoom" :level="2" title="style.zoom">
        <BaseAttr name="show" attr="style.zoom.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.zoom.color" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="highlightColor" attr="style.zoom.highlightColor" type="color" defaultVal="#4A4A4A" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.zoom.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <span>useResetSlot: false, <span class="text-app-blue text-xs">// To use a custom slot for the reset feature (see slots tab)</span></span>
        <span>startIndex: number | null, <BaseComment>Force zoom start index</BaseComment></span>
        <span>endIndex: number | null, <BaseComment>Force zoom end index</BaseComment></span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="th" :level="2" title="table.th">
        <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="td" :level="2" title="table.td">
        <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="prefix" attr="table.td.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="suffix" attr="table.td.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <BaseAttr name="period" attr="translations.period" type="text" defaultVal="Period" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="open" attr="translations.open" type="text" defaultVal="Open" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="high" attr="translations.high" type="text" defaultVal="High" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="low" attr="translations.low" type="text" defaultVal="Low" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="last" attr="translations.last" type="text" defaultVal="Last" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="volume" attr="translations.volume" type="text" defaultVal="Volume" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>

            </template>
            <template #tab2>
              <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateCsv</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateCsv[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiCandlestick"
                    :types="[
                        'svg',
                        'legend',
                        'tooltip-before',
                        'tooltip-after',
                        'reset-action',
                        'watermark',
                        'source'
                    ]" 
                />
            </template>
            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config</span> }) => {
    <span class="text-gray-400">// use args to build your custom content</span>
    const content = "My custom content";
    return `&lt;div&gt;${content}&lt;/div&gt;`
}
</code>
</pre>            
Using custom mode, the tooltip will be headless.
Target the following css class to apply custom styles:
<pre>
<code>
.vue-data-ui-custom-tooltip
</code>
</pre>
            </template>

            <template #tab6>
              <ThemesVueUiCandlestick />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiCandlestick 
                    :dataset="dataset" 
                    :config="
                      isDarkMode 
                        ? {
                          ...mutableConfigDarkMode,
                          responsive: true
                        } 
                        : {
                          ...mutableConfig,
                          responsive: true
                        }
                      " 
                    :key="key"
                  />
                </template>
              </ResponsiveUnit>
            </template>
        </Box>
     </div>        
</template>