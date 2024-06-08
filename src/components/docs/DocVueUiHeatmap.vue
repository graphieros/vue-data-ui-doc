<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUiHeatmap from "../themes/ThemesVueUiHeatmap.vue";

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

const dataset = computed(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const arr = [];
    const dsLen = 26;
    const serieLen = days.length;
    for (let i = 0; i < serieLen; i += 1) {
        const values = [];
        for (let j = 0; j < dsLen; j += 1) {
        values.push((i + j * 2))
        }
        arr.push({
            name: `${days[i]}`,
            values
        })
    }
    return arr
});

const config = ref({
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    layout: {
      padding: {
        top: 36,
        right: 12,
        bottom: 12,
        left: 48
      },
      cells: {
        height: 36,
        value: {
          show: true,
          fontSize: 12,
          bold: false,
          roundingValue: 0,
          color: "#1A1A1A"
        },
        colors: {
          hot: "#ff6400",
          cold: "#5f8bee",
          underlayer: "#F3F4F6"
        },
        spacing: 0.5,
        selected: {
          border: 2,
          color: "#1A1A1A"
        }
      },
      dataLabels: {
        prefix: "",
        suffix: "",
        xAxis: {
          show: true,
          values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
          fontSize: 12,
          color: "#1A1A1A",
          bold: false,
          offsetX: 0,
          offsetY: 0
        },
        yAxis: {
          show: true,
          values: [],
          fontSize: 12,
          color: "#1A1A1A",
          bold: false,
          offsetY: 0,
          offsetX: 0
        }
      }
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
    legend: {
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 12,
      bold: true,
      roundingValue: 0,
      position: "right",
      scaleBorderRadius: 18,
    },
    tooltip: {
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 14,
      roundingValue: 0,
      customFormat: null,
      borderRadius: 4,
      borderColor:"#e1e5e8",
      borderWidth: 1
    }
  },
  userOptions: {
    show: true,
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    colNames: {
      xAxis: "Week"
    },
    th: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none"
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none",
      roundingValue: 0
    }
  }
});
const darkModeConfig = ref({
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    layout: {
      padding: {
        top: 36,
        right: 12,
        bottom: 12,
        left: 48
      },
      cells: {
        height: 36,
        value: {
          show: true,
          fontSize: 12,
          bold: false,
          roundingValue: 0,
          color: "#FFFFFF"
        },
        colors: {
          hot: "#ff6400",
          cold: "#5f8bee",
          underlayer: "#1A1A1A"
        },
        spacing: 0.5,
        selected: {
          border: 2,
          color: "#FFFFFF"
        }
      },
      dataLabels: {
        prefix: "",
        suffix: "",
        xAxis: {
          show: true,
          values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          offsetX: 0,
          offsetY: 0
        },
        yAxis: {
          show: true,
          values: [],
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          offsetY: 0,
          offsetX: 0
        }
      }
    },
    title: {
      text: "Title",
      color: "#FAFAFA",
      fontSize: 20,
      bold: true,
      subtitle: {
        color: "#A1A1A1",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    },
    legend: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 12,
      bold: true,
      roundingValue: 0,
      position: "right",
      scaleBorderRadius: 18,
    },
    tooltip: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 14,
      roundingValue: 0,
      customFormat: null,
      borderRadius: 4,
      borderColor:"#3A3A3A",
      borderWidth: 1
    }
  },
  userOptions: {
    show: true,
    title: "options",
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    colNames: {
      xAxis: "Week"
    },
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none"
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
      roundingValue: 0
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
            <VueUiIcon name="chartHeatmap" stroke="#42d392" :strokeWidth="1.5" />
            VueUiHeatmap
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.heatmap[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : ''}`">
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
            <VueUiHeatmap :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_heatmap)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-heatmap"/>
            <MakerLink to="VueUiHeatmap" />
        </div>
        <Box showEmits showSlots showTooltip showThemes>
            <template v-slot:tab0>
              {{ translations.docs.datastructure[store.lang] }}
              <div class="mt-4">
                TS type: <code class="text-app-green">VueUiHeatmapDatasetItem[]</code>
              </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            values: number[];
        },
        {...}
    ]
</code>
</pre>                
                </div>

                {{ translations.docs.example[store.lang] }}:
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiHeatmapDatasetItem[]</span> = [
    {
        name: "Mon",
        values: [31, 58, 12, 25, 13]
    },
    {
        name: "Tue",
        values: [3, 12, 7, 9, 15, 27]
    },
    {
        name: "Wed",
        values: [8, 9, 3, 18, 11, 7]
    }
]
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab1>
              <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiHeatmapConfig</code>
                </div>
<pre>
<code>
const <span class="text-app-blue">config: VueUiHeatmapConfig</span> = {
  theme: ""; ("zen" | "hack" | "concrete" | "")
  style: {
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.color"><input v-else type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")
    fontFamily: "inherit",
    layout: {
      padding: {
        top: <input v-if="isDarkMode" type="number" min="0" v-model="mutableConfigDarkMode.style.layout.padding.top"><input v-else type="number" min="0" v-model="mutableConfig.style.layout.padding.top">, (default: 36)
        right: <input v-if="isDarkMode" type="number" min="0" v-model="mutableConfigDarkMode.style.layout.padding.right"><input v-else type="number" min="0" v-model="mutableConfig.style.layout.padding.right">, (default: 12)
        bottom: <input v-if="isDarkMode" type="number" min="0" v-model="mutableConfigDarkMode.style.layout.padding.bottom"><input v-else type="number" min="0" v-model="mutableConfig.style.layout.padding.bottom">, (default: 12)
        left: <input v-if="isDarkMode" type="number" min="0" v-model="mutableConfigDarkMode.style.layout.padding.left"><input v-else type="number" min="0" v-model="mutableConfig.style.layout.padding.left">, (default: 48)
      },
      cells: {
        height: <input v-if="isDarkMode" type="number" min="12" max="100" v-model="mutableConfigDarkMode.style.layout.cells.height"><input v-else type="number" min="12" max="100" v-model="mutableConfig.style.layout.cells.height">, (default: 36)
        value: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.cells.value.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.cells.value.show" @change="forceChartUpdate()">, (default: false)
          fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.layout.cells.value.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.layout.cells.value.fontSize">, (default: 18)
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.cells.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.cells.value.bold" @change="forceChartUpdate()">, (default: false)
          roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.layout.cells.value.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.layout.cells.value.roundingValue">, (default: 0)
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.cells.value.color"><input v-else type="color" v-model="mutableConfig.style.layout.cells.value.color">, (default: "#2D353C")
        },
        colors: {
          hot: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.cells.colors.hot"><input v-else type="color" v-model="mutableConfig.style.layout.cells.colors.hot">, (default: "#dc3912")
          cold: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.cells.colors.cold"><input v-else type="color" v-model="mutableConfig.style.layout.cells.colors.cold">, (default: "#3366cc")
          underlayer: "#FFFFFF"
        },
        spacing: <input v-if="isDarkMode" type="number" min="0" max="28" v-model="mutableConfigDarkMode.style.layout.cells.spacing"><input v-else type="number" min="0" max="28" v-model="mutableConfig.style.layout.cells.spacing">, (default: 2)
        selected: {
          border: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.layout.cells.selected.border"><input v-else type="number" min="0" max="12" v-model="mutableConfig.style.layout.cells.selected.border">, (default: 2)
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.cells.selected.color"><input v-else type="color" v-model="mutableConfig.style.layout.cells.selected.color">, (default: "#2D353C")
        }
      },
      dataLabels: {
        prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.prefix">, (default: "")
        suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.suffix">, (default: "")
        xAxis: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.show" @change="forceChartUpdate()">, (default: false)
          values: [],
          fontSize: <input v-if="isDarkMode" type="number" min="4" max="36" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.fontSize"><input v-else type="number" min="4" max="36" v-model="mutableConfig.style.layout.dataLabels.xAxis.fontSize">, (default: 8)
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.xAxis.color">, (default: "#2D353C")
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.bold" @change="forceChartUpdate()">, (default: false)
          offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.offsetX"><input v-else type="number" v-model="mutableConfig.style.layout.dataLabels.xAxis.offsetX">, (default: 0)
          offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.offsetY"><input v-else type="number" v-model="mutableConfig.style.layout.dataLabels.xAxis.offsetY">, (default: 0)
        },
        yAxis: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.show" @change="forceChartUpdate()">, (default: true)
          values: [],
          fontSize: <input v-if="isDarkMode" type="number" min="4" max="36" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.fontSize"><input v-else type="number" min="4" max="36" v-model="mutableConfig.style.layout.dataLabels.yAxis.fontSize">, (default: 8)
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.yAxis.color">, (default: "#2D353C")
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.bold" @change="forceChartUpdate()">, (default: false)
          offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.offsetX"><input v-else type="number" v-model="mutableConfig.style.layout.dataLabels.yAxis.offsetX">, (default: 0)
          offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.offsetY"><input v-else type="number" v-model="mutableConfig.style.layout.dataLabels.yAxis.offsetY">, (default: 0)
        }
      }
    },
    title: {
      text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="6" max="64" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="6" max="64" v-model="mutableConfig.style.title.fontSize">, (default: 20)
      bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
      subtitle: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")
        text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
        fontSize: <input v-if="isDarkMode" type="number" min="6" max="64" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="64" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
      }
    },
    legend: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.show" @change="forceChartUpdate()">, (default: true)
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.legend.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.color"><input v-else type="color" v-model="mutableConfig.style.legend.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="6" max="36" v-model="mutableConfigDarkMode.style.legend.fontSize"><input v-else type="number" min="6" max="36" v-model="mutableConfig.style.legend.fontSize">, (default: 12)
      bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.bold" @change="forceChartUpdate()">, (default: true)
      roundingValue: <input v-if="isDarkMode" type="number" min="0"  max="3" v-model="mutableConfigDarkMode.style.legend.roundingValue"><input v-else type="number" min="0"  max="3" v-model="mutableConfig.style.legend.roundingValue">, (default: 0)
      position: "right",
      scaleBorderRadius: <input v-if="isDarkMode" type="number" min="0"  max="18" v-model="mutableConfigDarkMode.style.legend.scaleBorderRadius"><input v-else type="number" min="0"  max="18" v-model="mutableConfig.style.legend.scaleBorderRadius">, (default: 18)
    },
    tooltip: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show" @change="forceChartUpdate()">, (default: true)
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="6" max="36" v-model="mutableConfigDarkMode.style.tooltip.fontSize"><input v-else type="number" min="6" max="36" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)
      roundingValue: <input v-if="isDarkMode" type="number" min="0"  max="3" v-model="mutableConfigDarkMode.style.tooltip.roundingValue"><input v-else type="number" min="0"  max="3" v-model="mutableConfig.style.tooltip.roundingValue">, (default: 0)
      customFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
      borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)
      borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.borderColor">, (default: "#e1e5e8"),
      borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)
    }
  },
  userOptions: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
  },
  table: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
    responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
    colNames: {
      xAxis: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.colNames.xAxis"><input v-else type="text" v-model="mutableConfig.table.colNames.xAxis">, (default: "X")
    }
    th: {
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
      outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
    },
    td: {
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
      outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
      roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
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
    &lt;VueUiHeatmap
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiHeatmap&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiHeatmap
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiHeatmap&gt;
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
              <ThemesVueUiHeatmap />
            </template>
        </Box>
    </div>
</template>