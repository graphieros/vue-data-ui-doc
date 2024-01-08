<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";


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
  useCssAnimation: true,
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    height: 316,
    width: 500,
    layout: {
      useDiv: true,
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
            bold: false
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
          underlayer: "#FFFFFF"
        },
        widthRatio: 0.5
      }
    },
    zoom: {
      show: true
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
      suffix: ""
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
    title: "options",
    labels: {
      useDiv: "Title inside",
      showTable: "Show table"
    }
  },
  table: {
    show: false,
    th: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "1px solid #C4C4C4"
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "1px solid #C4C4C4",
      roundingValue: 2,
      prefix: "$",
      suffix: ""
    }
  }
});

const darkModeConfig = ref({
  useCssAnimation: true,
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    height: 316,
    width: 500,
    layout: {
      useDiv: true,
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
            bold: false
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
      show: true
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
      suffix: ""
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
    title: "options",
    labels: {
      useDiv: "Title inside",
      showTable: "Show table"
    }
  },
  table: {
    show: false,
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "1px solid #e1e5e8"
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "1px solid #e1e5e8",
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
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[600px]'}`">
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
            <VueUiCandlestick :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_candlestick)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-candlestick"/>
        </div>
        <Box showEmits showSlots>
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
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiCandlestickConfig</span> = {
  useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)
  style: {
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.color"><input v-else type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")
    fontFamily: "inherit",
    height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="100" max="1000" v-model="mutableConfigDarkMode.style.height"><input v-else type="range" class="accent-app-blue" min="100" max="1000" v-model="mutableConfig.style.height">, (default: 316)
    width: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="300" max="1500" v-model="mutableConfigDarkMode.style.width"><input v-else type="range" class="accent-app-blue" min="300" max="1500" v-model="mutableConfig.style.width">, (default: 500)
    layout: {
      useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.useDiv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.useDiv" @change="forceChartUpdate()">, (default: true)
      padding: {
        top: 36,
        right: 48,
        bottom: 36,
        left: 48
      },
      selector: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.selector.color"><input v-else type="color" v-model="mutableConfig.style.layout.selector.color">, (default: "#E1E5E8")
        opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.selector.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.layout.selector.opacity">, (default: 10)
      },
      grid: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.show" @change="forceChartUpdate()">, (default: true)
        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.grid.stroke">, (default: "#e1e5e8")
        strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.strokeWidth">, (default: 0.5)
        xAxis: {
          dataLabels: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.xAxis.dataLabels.show" @change="forceChartUpdate()"> true,
            fontSize: <input v-if="isDarkMode" type="number" min="1" max="48" v-model="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.fontSize"><input v-else type="number" min="1" max="48" v-model="mutableConfig.style.layout.grid.xAxis.dataLabels.fontSize">, (default: 4)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.layout.grid.xAxis.dataLabels.color">, (default: "#2D353C")
            offsetY: 0,
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.xAxis.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.xAxis.dataLabels.bold" @change="forceChartUpdate()">, (default: false)
          }
        },
        yAxis: {
          dataLabels: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.show" @change="forceChartUpdate()"> true,
            fontSize: <input v-if="isDarkMode" type="number" min="1" max="48" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.fontSize"><input v-else type="number" min="1" max="48" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.fontSize">, (default: 12)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.color">, (default: "#2D353C")
            roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.layout.grid.yAxis.roundingValue">, (default: 0)
            offsetX: 0,
            bold:  <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.bold" @change="forceChartUpdate()">, (default: false)
            steps: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="2" max="20" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.steps"><input v-else type="range" class="accent-app-blue" min="2" max="20" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.steps">, (default: 10)
            prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.prefix">, (default: "")
            suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.grid.yAxis.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.layout.grid.yAxis.dataLabels.suffix">, (default: "")
          }
        }
      },
      wick: {
        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.wick.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.wick.stroke">, (default: "#2D353C")
        strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.wick.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.wick.strokeWidth">, (default: 0.5)
        extremity: {
          shape: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.layout.wick.extremity.shape"><option>line</option><option>circle</option></select><select v-else v-model="mutableConfig.style.layout.wick.extremity.shape"><option>line</option><option>circle</option></select>, (default: "line")
          size: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.layout.wick.extremity.size">
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
          </select>, (default: "auto")
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.wick.extremity.color"><input v-else type="color" v-model="mutableConfig.style.layout.wick.extremity.color">, (default: "#2D353C")
        }
      },
      candle: {
        borderRadius: <input v-if="isDarkMode" type="range" min="0" max="48" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.candle.borderRadius"><input v-else type="range" min="0" max="48" class="accent-app-blue" v-model="mutableConfig.style.layout.candle.borderRadius">, (default: 1)
        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.candle.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.candle.stroke">, (default: "#2D353C")
        strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.candle.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.candle.strokeWidth">, (default: 0.5)
        colors: {
          bearish:  <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.candle.colors.bearish"><input v-else type="color" v-model="mutableConfig.style.layout.candle.colors.bearish">, (default: "#dc3912")
          bullish: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.candle.colors.bullish"><input v-else type="color" v-model="mutableConfig.style.layout.candle.colors.bullish">, (default: "#109618")
        },
        gradient: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.candle.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.candle.gradient.show" @change="forceChartUpdate()">, (default: true)
          underlayer: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.candle.gradient.underlayer"><input v-else type="color" v-model="mutableConfig.style.layout.candle.gradient.underlayer">, (default: "#FFFFFF")
        },
        widthRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.1" max="1" step="0.1" v-model="mutableConfigDarkMode.style.layout.candle.widthRatio"><input v-else type="range" class="accent-app-blue" min="0.1" max="1" step="0.1" v-model="mutableConfig.style.layout.candle.widthRatio">, (default: 0.5)
      }
    },
    zoom: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.zoom.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.zoom.show" @change="forceChartUpdate()">, (default: true)
    },
    title: {
      text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="8" max="64" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="8" max="64" v-model="mutableConfig.style.title.fontSize">, (default: 20)
      bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
      subtitle: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#CCCCCC")
        text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
        fontSize: <input  v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
      }
    },
    tooltip: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show" @change="forceChartUpdate()">, (default: true)
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.tooltip.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)
      roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.tooltip.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.tooltip.roundingValue">, (default: 0)
      prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.prefix"><input v-else type="text" v-model="mutableConfig.style.tooltip.prefix">, (default: "")
      suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.suffix"><input v-else type="text" v-model="mutableConfig.style.tooltip.suffix">, (default: "")
    }
  },
  translations: {
    period: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.period"><input v-else type="text" v-model="mutableConfig.translations.period">, (default: "Period")
    open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.open"><input v-else type="text" v-model="mutableConfig.translations.open">, (default: "Open")
    high: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.high"><input v-else type="text" v-model="mutableConfig.translations.high">, (default: "High")
    low: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.low"><input v-else type="text" v-model="mutableConfig.translations.low">, (default: "Low")
    last: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.last"><input v-else type="text" v-model="mutableConfig.translations.last">, (default: "Last")
    volume: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.volume"><input v-else type="text" v-model="mutableConfig.translations.volume">, (default: "Volume") 
  },
  userOptions: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
    title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.title"><input v-else type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
    labels: {
      useDiv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.useDiv"><input v-else type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title inside")
      showTable: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.showTable"><input v-else type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
    }
  },
  table: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
    th: {
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
      outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
    },
    td: {
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
      outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
      roundingValue: <input type="number" min="0" max="5" v-model="mutableConfig.table.td.roundingValue">, (default: 2)
      prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.prefix"><input v-else type="text" v-model="mutableConfig.table.td.prefix">, (default: "")
      suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.suffix"><input v-else type="text" v-model="mutableConfig.table.td.suffix">, (default: "")
    }
  }
}
</code>
</pre>                
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

            </template>
        </Box>
     </div>        
</template>