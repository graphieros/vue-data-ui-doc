<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiHeatmap from "../themes/ThemesVueUiHeatmap.vue";
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
            <VueUiIcon name="chartHeatmap" stroke="#42d392" :strokeWidth="1.5" />
            VueUiHeatmap
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.heatmap[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : ''}`">
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

        <BaseDocActions
          targetLink="vue-ui-heatmap"
          targetMaker="VueUiHeatmap"
          :configSource="mainConfig.vue_ui_heatmap"
        />

        <Box showEmits showSlots showTooltip showThemes schema="vue_ui_heatmap">
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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiHeatmapConfig" equal>
      <span>heme: "", ("zen" | "hack" | "concrete" | "")</span>
      <BaseDetails attr="style" :level="1">
        <span> backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.color"><input v-else type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")</span>
        <span>fontFamily: "inherit",</span>
        <BaseDetails attr="layout" :level="2" title="style.layout">
          <BaseDetails attr="cells" :level="3" title="style.layout.cells">
            <span>height: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.cells.height" :min="16" :max="48"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.cells.height" :min="16" :max="48"/>, (default: 36)</span>
            <span>spacing: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.cells.spacing" :min="0" :max="12" /><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.cells.spacing" :min="0" :max="12" />, (default: 2)</span>
            <BaseDetails attr="colors" :level="4" title="style.layout.cells.colors">
              <span>hot: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.cells.colors.hot"><input v-else type="color" v-model="mutableConfig.style.layout.cells.colors.hot">, (default: "#dc3912")</span>
              <span>cold: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.cells.colors.cold"><input v-else type="color" v-model="mutableConfig.style.layout.cells.colors.cold">, (default: "#5F8BEE")</span>
              <span>underlayer: "#FFFFFF"</span>
            </BaseDetails>
            <BaseDetails attr="selected" :level="4" title="style.layout.cells.selected">
              <span>border: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.cells.selected.border" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.cells.selected.border" :min="0" :max="12"/>, (default: 2)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.cells.selected.color"><input v-else type="color" v-model="mutableConfig.style.layout.cells.selected.color">, (default: "#2D353C")</span>
            </BaseDetails>
            <BaseDetails attr="value" :level="4" title="style.layout.cells.value">
              <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.cells.value.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.cells.value.show" @change="forceChartUpdate()">, (default: false)</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.cells.value.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.cells.value.fontSize" :min="8" :max="42"/>, (default: 18)</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.cells.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.cells.value.bold" @change="forceChartUpdate()">, (default: false)</span>
              <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.cells.value.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.cells.value.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.cells.value.color"><input v-else type="color" v-model="mutableConfig.style.layout.cells.value.color">, (default: "#2D353C")</span>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="dataLabels" :level="3" title="style.layout.dataLabels">
            <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.prefix">, (default: "")</span>
            <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.suffix">, (default: "")</span>
            <BaseDetails attr="xAxis" :level="4" title="style.layout.dataLabels.xAxis">
              <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.show" @change="forceChartUpdate()">, (default: false)</span>
              <span>values: [],</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.xAxis.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.xAxis.fontSize" :min="8" :max="42"/>, (default: 8)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.xAxis.color">, (default: "#2D353C")</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.bold" @change="forceChartUpdate()">, (default: false)</span>
              <span>offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.xAxis.offsetX" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.xAxis.offsetX" :min="-100" :max="100"/>, (default: 0)</span>
              <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.xAxis.offsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.xAxis.offsetY" :min="-100" :max="100"/>, (default: 0)</span>
            </BaseDetails>
            <BaseDetails attr="yAxis" :level="4" title="style.layout.dataLabels.yAxis">
              <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.show" @change="forceChartUpdate()">, (default: true)</span>
              <span>values: [],</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.yAxis.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.yAxis.fontSize" :min="8" :max="42"/>, (default: 8)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.yAxis.color">, (default: "#2D353C")</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.bold" @change="forceChartUpdate()">, (default: false)</span>
              <span>offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.yAxis.offsetX" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.yAxis.offsetX" :min="-100" :max="100"/>, (default: 0)</span>
              <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.dataLabels.yAxis.offsetY" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.dataLabels.yAxis.offsetY" :min="-100" :max="100"/>, (default: 0)</span>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="padding" :level="3" title="style.layout.padding">
            <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.padding.top" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.padding.top" :min="0" :max="100"/>, (default: 36)</span>
            <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.padding.right" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.padding.right" :min="0" :max="100"/>, (default: 12)</span>
            <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.padding.bottom" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.padding.bottom" :min="0" :max="100"/>, (default: 12)</span>
            <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.layout.padding.left" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.layout.padding.left" :min="0" :max="100"/>, (default: 48)</span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="legend" :level="2" title="style.legend">
          <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.show" @change="forceChartUpdate()">, (default: true)</span>
          <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.legend.backgroundColor">, (default: "#FFFFFF")</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.color"><input v-else type="color" v-model="mutableConfig.style.legend.color">, (default: "#2D353C")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.legend.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.legend.fontSize" :min="8" :max="42"/>, (default: 12)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.bold" @change="forceChartUpdate()">, (default: true)</span>
          <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.legend.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.legend.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
          <span>position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.legend.position"><option>right</option><option>bottom</option></select><select v-else v-model="mutableConfig.style.legend.position"><option>right</option><option>bottom</option></select>, (default: "right")</span>
          <span>scaleBorderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.legend.scaleBorderRadius" :min="0" :max="48"/><BaseNumberInput v-else v-model:value="mutableConfig.style.legend.scaleBorderRadius" :min="0" :max="48"/>, (default: 18)</span>
        </BaseDetails>
        <BaseDetails attr="title" :level="2" title="style.title">
          <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)</span>
          <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")</span>
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
          <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
          <span>borderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.borderRadius" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.borderRadius" :min="0" :max="24"/>, (default: 4)</span>
          <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.borderColor">, (default: "#e1e5e8"),</span>
          <span>borderWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.borderWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.borderWidth" :min="0" :max="24"/>, (default: 1)</span>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="table" :level="1">
        <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
        <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400)</span>
        <BaseDetails attr="colNames" :level="2" title="table.colNames">
          <span>xAxis: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.colNames.xAxis"><input v-else type="text" v-model="mutableConfig.table.colNames.xAxis">, (default: "X")</span>
        </BaseDetails>
        <BaseDetails attr="th" :level="2" title="table.th">
          <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
          <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
        </BaseDetails>
        <BaseDetails attr="td" :level="2" title="table.td">
          <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
          <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
          <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
        </BaseDetails>
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