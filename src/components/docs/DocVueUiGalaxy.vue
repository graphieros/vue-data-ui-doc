<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(
  () => store.isDarkMode,
  (val) => {
    nextTick(() => {
      key.value += 1;
    });
  }
);

const isDarkMode = computed(() => {
  return store.isDarkMode;
});

const dataset = ref([
  {
    name: "Serie 1",
    color: "#5f8bee",
    values: [100],
  },
  {
    name: "Serie 2",
    color: "#42d392",
    values: [200],
  },
  {
    name: "Serie 1",
    color: "#ff6400",
    values: [300, 1],
  },
]);

const config = ref({
  useCssAnimation: true,
  useBlurOnHover: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#2D353C",
      layout: {
        arcs: {
          strokeWidth: 24,
          borderWidth: 12,
          offsetX: 0,
          offsetY: 0,
          hoverEffect: {
            show: true,
            multiplicator: 1.1
          },
          gradient: {
            show: true,
            intensity: 30,
            color: "#FFFFFF"
          }
        },
        labels: {
          dataLabels: {
            prefix: "",
            suffix: ""
          }
        }
      },
      legend: {
        backgroundColor: "#F3F4F6",
        color: "#2D353C",
        show: true,
        fontSize: 16,
        bold: false,
        roundingValue: 0,
        roundingPercentage: 0,
      },
      title: {
        text: "Title",
        color: "#2D353C",
        fontSize: 20,
        bold: true,
        subtitle: {
          color: "#A1A1A1",
          text: "Subtitle",
          fontSize: 16,
          bold: false,
        },
      },
      tooltip: {
        show: true,
        color: "#2D353C",
        backgroundColor: "#FFFFFF",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        customFormat: null,
      },
    },
  },
  table: {
    show: false,
    responsiveBreakpoint: 300,
    columnNames: {
      series: "Series",
      value: "Value",
      percentage: "Percentage",
    },
    th: {
      backgroundColor: "#FAFAFA",
      color: "#2D353C",
      outline: "none",
    },
    td: {
      backgroundColor: "#FFFFFF",
      color: "#2D353C",
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0,
    },
  },
  userOptions: {
    show: true,
  },
});

const darkModeConfig = ref({
  useCssAnimation: true,
  useBlurOnHover: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      layout: {
        arcs: {
          strokeWidth: 24,
          borderWidth: 12,
          offsetX: 0,
          offsetY: 0,
          hoverEffect: {
            show: true,
            multiplicator: 1.1
          },
          gradient: {
            show: true,
            intensity: 30,
            color: "#FFFFFF"
          }
        },
        labels: {
          dataLabels: {
            prefix: "",
            suffix: ""
          }
        }
      },
      legend: {
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        show: true,
        fontSize: 16,
        bold: false,
        roundingValue: 0,
        roundingPercentage: 0,
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
          bold: false,
        },
      },
      tooltip: {
        show: true,
        color: "#CCCCCC",
        backgroundColor: "#1A1A1A",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        customFormat: null,
      },
    },
  },
  table: {
    show: false,
    responsiveBreakpoint: 300,
    columnNames: {
      series: "Series",
      value: "Value",
      percentage: "Percentage",
    },
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0,
    },
  },
  userOptions: {
    show: true,
  },
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(
  JSON.parse(JSON.stringify(darkModeConfig.value))
);
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));
function resetDefault() {
  mutableConfig.value = JSON.parse(JSON.stringify(config.value));
  mutableConfigDarkMode.value = JSON.parse(
    JSON.stringify(darkModeConfig.value)
  );
}

function forceChartUpdate() {
  key.value += 1;
}

function copyToClipboard(conf) {
  let selBox = document.createElement("textarea");
  selBox.style.position = "fixed";
  selBox.style.left = "0";
  selBox.style.top = "0";
  selBox.style.opacity = "0";
  selBox.value = JSON.stringify(conf);
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand("copy");
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
    <h1
      class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl"
    >
      <VueUiIcon name="chartGalaxy" stroke="#42d392" :strokeWidth="1.5" />
      VueUiGalaxy
    </h1>
    <p
      class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center"
    >
      {{ translations.docs.tooltips.galaxy[store.lang] }}
    </p>
    <div
      :class="`transition-all mx-auto ${
        isFixed
          ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl'
          : 'w-1/2'
      }`"
    >
      <button
        @click="fixChart"
        class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <PinnedOffIcon v-if="isFixed" />
        <div v-else class="relative overflow-visible">
          <PinIcon class="peer overflow-visible" />
          <div
            class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded"
          >
            {{ hintPin[store.lang] }}
          </div>
        </div>
      </button>
      <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
        <button
          @click="resetDefault"
          class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6"
        >
          {{ translations.docs.reset[store.lang] }}
        </button>
        <button
          @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"
        >
          <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
        </button>
      </div>
      <VueDataUi
        component="VueUiGalaxy"
        :dataset="mutableDataset"
        :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
        :key="key"
      />
    </div>
    <div
      class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row"
    >
      <button
        class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all"
        @click="copyToClipboard(mainConfig.vue_ui_galaxy)"
      >
        <CopyIcon /> {{ translations.docs.copyDefaultConfig[store.lang] }}
      </button>
      <GitHubLink link="vue-ui-galaxy" />
      <MakerLink to="VueUiGalaxy" />
    </div>

    <Box showEmits showSlots showTooltip>
      <template #tab0>
        {{ translations.docs.datastructure[store.lang] }}
        <div>
          TS type: <code class="text-app-green">VueUiGalaxyDatasetItem[]</code>
        </div>
        <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
          <pre>
<code>
    [
        {
            name: string;
            color: string; <span class="text-gray-600 dark:text-app-orange">// HEX, RGB, HSL</span>
            values: number[];
        },
        {...}
    ]
</code>
</pre>
        </div>

        {{ translations.docs.example[store.lang] }} :
        <div class="w-full overflow-x-auto">
          <pre>
    
    <code>
        const <span class="text-black dark:text-app-green">dataset: VueUiGalaxyDatasetItem[]</span> = [
        {
            name: "Series 1",
            color: <input type="color" v-model="mutableDataset[0].color">,
            values: [100]
        },
        {
            name: "Series 2",
            color: <input type="color" v-model="mutableDataset[1].color">,
            values: [200]
        },
        {
            name: "Series 1",
            color: <input type="color" v-model="mutableDataset[2].color">,
            values: [300, 1]
        },
        ]
    </code>
</pre>
        </div>
      </template>

      <template #tab1>
        <div class="flex gap-2">
          <button
            @click="resetDefault"
            class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all"
          >
            {{ translations.docs.reset[store.lang] }}
          </button>
          <button
            @click="
              copyToClipboard(
                isDarkMode ? mutableConfigDarkMode : mutableConfig
              )
            "
            class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"
          >
            <CopyIcon />{{ translations.docs.copyThisConfig[store.lang] }}
          </button>
        </div>
        <div class="mt-4">
          TS type: <code class="text-app-blue">VueUiGalaxyConfig</code>
        </div>
        <pre>
<code>
const <span class="text-app-blue">config: VueUiGalaxyConfig</span> = {
  useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)
  useBlurOnHover: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useBlurOnHover" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useBlurOnHover" @change="forceChartUpdate()">, (default: true) 
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
      layout: {
        arcs: {
          strokeWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.layout.arcs.strokeWidth" ><input v-else type="number" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfig.style.chart.layout.arcs.strokeWidth" >, (default: 6)
          borderWidth: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" v-model="mutableConfigDarkMode.style.chart.layout.arcs.borderWidth" ><input v-else type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.chart.layout.arcs.borderWidth" >, (default: 2)
          offsetX: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" v-model="mutableConfigDarkMode.style.chart.layout.arcs.offsetX" ><input v-else type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.chart.layout.arcs.offsetX" >, (default: 0)
          offsetY: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="12" v-model="mutableConfigDarkMode.style.chart.layout.arcs.offsetY" ><input v-else type="number" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.chart.layout.arcs.offsetY" >, (default: 0)
          hoverEffect: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.arcs.hoverEffect.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.arcs.hoverEffect.show" @change="forceChartUpdate()">, (default: true) 
            multiplicator: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="1" max="1.4" step="0.01" v-model="mutableConfigDarkMode.style.chart.layout.arcs.hoverEffect.multiplicator" ><input v-else type="number" class="accent-app-blue" min="1" max="1.4" step="0.01" v-model="mutableConfig.style.chart.layout.arcs.hoverEffect.multiplicator" >, (default: 1.1)
          },
          gradient: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.arcs.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.arcs.gradient.show" @change="forceChartUpdate()">, (default: true)
            intensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.arcs.gradient.intensity" ><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.arcs.gradient.intensity" >, (default: 30)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.arcs.gradient.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.arcs.gradient.color">, (default: "#FFFFFF")
          }
        },
        labels: {
          dataLabels: {
            prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.prefix">, (default: "")
            suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.labels.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.labels.dataLabels.suffix">, (default: "")
          }
        },
      },
      legend: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
          backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
          fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
          roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue" @change="forceChartUpdate()">, (default: 0)
          roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
      },
      title: {
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
          text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
          fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
          subtitle: {
              color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
              text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
              fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
              bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
          }
      },
      tooltip: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
          backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
          fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
          showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)
          showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)
          roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue" @change="forceChartUpdate()">, (default: 0)
          roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingPercentage" @change="forceChartUpdate()"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
          customFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
      }
    }
  },
  table: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
      responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 300)
      columnNames: {
          series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Series")
          value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")
          percentage: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.percentage"><input v-else type="text" v-model="mutableConfig.table.columnNames.percentage">, (default: "Percebtage")
      },
      th: {
          backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
          outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")
      },
      td: {
          backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
          outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #E1E5E8")
          roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
          roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)
      }
  },
  userOptions: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: false)
  }
}
</code>
</pre>
      </template>

      <template #tab2>
        @selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiGalaxy
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiGalaxyDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <pre>
    <code>
    [
        {
            name: string;
            value: number;
            color: string;
        },
        {...}
    ]
    </code>
    </pre>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const galaxyChart = ref(null);
            const galaxyDataset = ref([]);

            onMounted(() => {
                galaxyDataset.value = galaxyChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiGalaxy
                ref="galaxyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiGalaxy
                ref="galaxyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        galaxyDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.galaxyDataset = this.$refs.galaxyChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
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
                </div>

      </template>

      <template #tab3>
        <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiGalaxy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiGalaxy&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiGalaxy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiGalaxy&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiGalaxy
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiGalaxy&gt;
</code>
</pre> 
      </template>

      <template #tab4>
        <pre>
<code>
<span class="text-gray-400">config.style.chart.tooltip.customFormat</span>

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
    </Box>
  </div>
</template>
