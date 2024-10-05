<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiCandlestick from "../themes/ThemesVueUiCandlestick.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})


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
    },
    title: {
      text: "Title",
      color: "#1A1A1A",
      fontSize: 20,
      bold: true,
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
      backgroundOpacity: 90
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
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true
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
    },
    title: {
      text: "Title",
      color: "#fafafa",
      fontSize: 20,
      bold: true,
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
      backgroundOpacity: 90
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
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true
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
} 

const configCode = ref(null)
const showAllConfig = ref(false);

watch(() => showAllConfig.value, (v) => {
    if (v) {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
    } else {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
            if (d.hasAttribute('open')) {
                d.removeAttribute('open')
            }
        })
    }
})

</script>

<template>
     <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartCandlestick" stroke="#42d392" :strokeWidth="1.5" />
            VueUiCandlestick
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.candlestick[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[600px]'}`">
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
            <Suspense>
              <template #default>
                <VueUiCandlestick :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
              </template>
              <template #fallback>
                    <div class="min-h-[500px]"></div>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
          targetLink="vue-ui-candlestick"
          :configSource="mainConfig.vue_ui_candlestick"
        />

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_candlestick">
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
    <span>useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)</span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")</span>
      <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.color"><input v-else type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")</span>
      <span>height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="100" max="1000" v-model="mutableConfigDarkMode.style.height"><input v-else type="range" class="accent-app-blue" min="100" max="1000" v-model="mutableConfig.style.height">, (default: 316)</span>
      <span>width: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1500" v-model="mutableConfigDarkMode.style.width"><input v-else type="range" class="accent-app-blue" min="300" max="1500" v-model="mutableConfig.style.width">, (default: 500)</span>
      <BaseDetails attr="layout" :level="2" title="style.layout">
        <BaseDetails attr="candle" :level="3" title="style.layout.candle">
          <span>borderRadius: <input v-if="isDarkMode" type="range" min="0" max="48" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.candle.borderRadius"><input v-else type="range" min="0" max="48" class="accent-app-blue" v-model="mutableConfig.style.layout.candle.borderRadius">, (default: 1)</span>
          <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.candle.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.candle.stroke">, (default: "#2D353C")</span>
          <span>strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.candle.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.candle.strokeWidth">, (default: 0.5)</span>
          <span>widthRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.1" max="1" step="0.1" v-model="mutableConfigDarkMode.style.layout.candle.widthRatio"><input v-else type="range" class="accent-app-blue" min="0.1" max="1" step="0.1" v-model="mutableConfig.style.layout.candle.widthRatio">, (default: 0.5)</span>
          <BaseDetails attr="colors" :level="4" title="style.layout.candle.colors">
            <span>bearish:  <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.candle.colors.bearish"><input v-else type="color" v-model="mutableConfig.style.layout.candle.colors.bearish">, (default: "#dc3912")</span>
            <span>bullish: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.candle.colors.bullish"><input v-else type="color" v-model="mutableConfig.style.layout.candle.colors.bullish">, (default: "#2CA02C")</span>
          </BaseDetails>
          <BaseDetails attr="gradient" :level="4" title="style.layout.candle.gradient">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.candle.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.candle.gradient.show" @change="forceChartUpdate()">, (default: true)</span>
            <span>underlayer: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.candle.gradient.underlayer"><input v-else type="color" v-model="mutableConfig.style.layout.candle.gradient.underlayer">, (default: "#FFFFFF")</span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="grid" :level="3" title="style.layout.grid">
          <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.show" @change="forceChartUpdate()">, (default: true)</span>
          <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.grid.stroke">, (default: "#e1e5e8")</span>
          <span>strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.strokeWidth">, (default: 0.5)</span>
          <BaseDetails attr="xAxis" :level="4" title="style.layout.grid.xAxis">
            <BaseDetails attr="dataLabels" :level="5" title="style.layout.grid.xAxis.dataLabels">
              <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.xAxis.dataLabels.show" @change="forceChartUpdate()">, (defaut: true)</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.grid.xAxis.dataLabels.fontSize" :min="8" :max="42"/>, (default: 4)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.layout.grid.xAxis.dataLabels.color">, (default: "#2D353C")</span>
              <span>offsetY: 0,</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.xAxis.dataLabels.bold" @change="forceChartUpdate()">, (default: false)</span>
              <span>rotation: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.rotation" :min="-360" :max="360"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.grid.xAxis.dataLabels.rotation" :min="-360" :max="360"/>, (default: 0)</span>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="yAxis" :level="4" title="style.layout.grid.yAxis">
            <BaseDetails attr="dataLabels" :level="5" title="style.layout.grid.yAxis.dataLabels">
              <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.show" @change="forceChartUpdate()">, (default: true)</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.grid.yAxis.dataLabels.fontSize" :min="8" :max="42"/>, (default: 12)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.color">, (default: "#2D353C")</span>
              <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.grid.yAxis.dataLabels.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
              <span>offsetX: 0,</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.bold" @change="forceChartUpdate()">, (default: false)</span>
              <span>steps: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="2" max="20" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.steps"><input v-else type="range" class="accent-app-blue" min="2" max="20" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.steps">, (default: 10)</span>
              <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.prefix">, (default: "")</span>
              <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.suffix">, (default: "")</span>
            </BaseDetails>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.layout.padding">
          <span>top: 36,</span>
          <span>right: 48,</span>
          <span>bottom: 36,</span>
          <span>left: 48,</span>
        </BaseDetails>
        <BaseDetails attr="selector" :level="3" title="style.layout.selector">
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.selector.color"><input v-else type="color" v-model="mutableConfig.style.layout.selector.color">, (default: "#E1E5E8")</span>
          <span>opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.selector.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.layout.selector.opacity">, (default: 10)</span>
        </BaseDetails>
        <BaseDetails attr="wick" :level="3" title="style.layout.wick">
          <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.wick.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.wick.stroke">, (default: "#2D353C")</span>
          <span>strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.wick.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.wick.strokeWidth">, (default: 0.5)</span>
          <BaseDetails attr="extremity" :level="4" title="style.layout.wick.extremity">
              <span>shape: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.layout.wick.extremity.shape"><option>line</option><option>circle</option></select><select v-else v-model="mutableConfig.style.layout.wick.extremity.shape"><option>line</option><option>circle</option></select>, (default: "line")</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.wick.extremity.color"><input v-else type="color" v-model="mutableConfig.style.layout.wick.extremity.color">, (default: "#2D353C")</span>
              <span>size: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.layout.wick.extremity.size">
            <option>auto</option>
            <option>1</option>
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
            <option>10</option>
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
            <option>20</option>
          </select><select v-else v-model="mutableConfig.style.layout.wick.extremity.size">
            <option>auto</option>
            <option>1</option>
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
            <option>10</option>
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
            <option>20</option>
          </select>, (default: "auto")</span>
          </BaseDetails>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")</span>
        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)</span>
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#CCCCCC")</span>
          <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show" @change="forceChartUpdate()">, (default: true)</span>
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")</span>
        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.fontSize" :min="8" :max="42"/>, (default: 14)</span>
        <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
        <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.prefix"><input v-else type="text" v-model="mutableConfig.style.tooltip.prefix">, (default: "")</span>
        <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.suffix"><input v-else type="text" v-model="mutableConfig.style.tooltip.suffix">, (default: "")</span>
        <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
        <span>borderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.borderRadius" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.borderRadius" :min="0" :max="24"/>, (default: 4)</span>
        <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.borderColor">, (default: "#e1e5e8"),</span>
        <span>borderWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.borderWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.borderWidth" :min="0" :max="24"/>, (default: 1)</span>
        <span>backgroundOpacity: <input v-if="isDarkMode" v-model="mutableConfigDarkMode.style.tooltip.backgroundOpacity" type="range" class="accent-app-blue" min="0" max="100"/><input v-else v-model="mutableConfig.style.tooltip.backgroundOpacity" type="range" class="accent-app-blue" min="0" max="100"/>, (default: 100)</span>
      </BaseDetails>
      <BaseDetails attr="zoom" :level="2" title="style.zoom">
        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.zoom.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.zoom.show" @change="forceChartUpdate()">, (default: true)</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.zoom.color" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.style.zoom.color" @change="forceChartUpdate()">, (default: "#CCCCCC")</span>
        <span>highlightColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.zoom.highlightColor" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.style.zoom.highlightColor" @change="forceChartUpdate()">, (default: "#4A4A4A")</span>
        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.zoom.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.zoom.fontSize" :min="8" :max="42"/>, (default: 14)</span>
        <span>useResetSlot: false, <span class="text-app-blue text-xs">// To use a custom slot for the reset feature (see slots tab)</span></span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
      <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400)</span>
      <BaseDetails attr="th" :level="2" title="table.th">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
        <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
      </BaseDetails>
      <BaseDetails attr="td" :level="2" title="table.td">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
        <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
        <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingValue"/>, (default: 2)</span>
        <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.prefix"><input v-else type="text" v-model="mutableConfig.table.td.prefix">, (default: "")</span>
        <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.suffix"><input v-else type="text" v-model="mutableConfig.table.td.suffix">, (default: "")</span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <span>period: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.period"><input v-else type="text" v-model="mutableConfig.translations.period">, (default: "Period")</span>
      <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.open"><input v-else type="text" v-model="mutableConfig.translations.open">, (default: "Open")</span>
      <span>high: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.high"><input v-else type="text" v-model="mutableConfig.translations.high">, (default: "High")</span>
      <span>low: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.low"><input v-else type="text" v-model="mutableConfig.translations.low">, (default: "Low")</span>
      <span>last: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.last"><input v-else type="text" v-model="mutableConfig.translations.last">, (default: "Last")</span>
      <span>volume: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.volume"><input v-else type="text" v-model="mutableConfig.translations.volume">, (default: "Volume") </span>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
        <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
        <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
        <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
        <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
        <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
        <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
        <span>tooltip: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.tooltip"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.tooltip">, (default: "Toggle tooltip")</span>
        <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
        <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
        <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
        <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
        <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
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
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiCandlestick
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiCandlestick&gt;
</code>
</pre>  
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiCandlestick
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiCandlestick&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiCandlestick
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiCandlestick&gt;
</code>
</pre> 

<div class="text-gray-500">
    {{ translations.slots.resetButton[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiXy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #reset-action="{ reset }"&gt;
            &lt;button @click="reset()"&gt;Refresh&lt;/button&gt;
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>

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