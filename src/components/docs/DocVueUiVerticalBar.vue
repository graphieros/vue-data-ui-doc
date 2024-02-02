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
    {
    name: "Serie 1",
    color: "#5f8bee",
    value: 100,
    children: [
      {
        name: "serie 1 child 1",
        value: 80
      },
      {
        name: "serie 1 child 2",
        value: 20
      },
    ]
  },
  {
    name: "Serie 2",
    value: 345,
    color: "#ff6400",
  },
  {
    name: "Serie 3",
    color: "#42d392",
    value: 210,
  },
  {
    name: "Serie 4",
    color:"rgb(200,200,50)",
    value: 188,
  },
  {
    name: "Serie 5",
    value: 120,
    color: "rgb(100,50,200)",
    children: [
      {
        name: "Serie 5 child 1",
        value: 60,
      },
      {
        name: "Serie 5 child 2",
        value: 20,
      },
      {
        name: "Serie 5 child 3",
        value: 40,
      },
    ]
  }
]);

const config = ref({
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      layout: {
        useDiv: true,
        bars: {
          sort: "desc",
          useStroke: false,
          strokeWidth: 2,
          height: 32,
          gap: 6,
          borderRadius: 4,
          offsetX: 64,
          paddingRight: 0,
          useGradient: true,
          gradientIntensity: 20,
          fillOpacity: 10,
          underlayerColor: "#FFFFFF",
          dataLabels: {
            color: "#1A1A1A",
            bold: true,
            fontSize: 12,
            value: {
              show: true,
              roundingValue: 0,
              prefix: "",
              suffix: ""
            },
            percentage: {
              show: true,
              roundingPercentage: 0
            },
            offsetX: 0
          },
          nameLabels: {
            show: true,
            color: "#1A1A1A",
            bold: false,
            fontSize: 10,
            offsetX: 0
          },
          parentLabels: {
            show: true,
            color: "#1A1A1A",
            bold: false,
            fontSize: 10,
            offsetX: 0
          }
        },
        highlighter: {
          color: "#1A1A1A",
          opacity: 5
        },
        separators: {
          show: true,
          color: "#CCCCCC",
          strokeWidth: 1
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
        position: "top",
        show: true,
        fontSize: 14,
        color: "#1A1A1A",
        bold: true,
        roundingValue: 0,
        backgroundColor: "#F3F4F6",
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      },
      tooltip: {
        show: true,
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      }
    }
  },
  userOptions: {
    show: true,
    title: "options",
    labels: {
      useDiv: "Title & legend inside",
      showTable: "Show table",
      sort: "Sort desc"
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
      roundingValue: 0,
      roundingPercentage: 0,
      prefix: "",
      suffix: ""
    }
  },
  translations: {
    parentName: "Serie",
    childName: "Child",
    value: "value",
    percentageToTotal: "%/total",
    percentageToSerie: "%/serie"
  }
});
const darkModeConfig = ref({
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      layout: {
        useDiv: true,
        bars: {
          sort: "desc",
          useStroke: false,
          strokeWidth: 2,
          height: 32,
          gap: 6,
          borderRadius: 4,
          offsetX: 64,
          paddingRight: 0,
          useGradient: true,
          gradientIntensity: 20,
          fillOpacity: 10,
          underlayerColor: "#FFFFFF",
          dataLabels: {
            color: "#CCCCCC",
            bold: true,
            fontSize: 12,
            value: {
              show: true,
              roundingValue: 0,
              prefix: "",
              suffix: ""
            },
            percentage: {
              show: true,
              roundingPercentage: 0
            },
            offsetX: 0
          },
          nameLabels: {
            show: true,
            color: "#CCCCCC",
            bold: false,
            fontSize: 10,
            offsetX: 0
          },
          parentLabels: {
            show: true,
            color: "#CCCCCC",
            bold: false,
            fontSize: 10,
            offsetX: 0
          }
        },
        highlighter: {
          color: "#FFFFFF",
          opacity: 5
        },
        separators: {
          show: true,
          color: "#343434",
          strokeWidth: 1
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
        position: "top",
        show: true,
        fontSize: 14,
        color: "#CCCCCC",
        bold: true,
        roundingValue: 0,
        backgroundColor: "#1A1A1A",
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      },
      tooltip: {
        show: true,
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      }
    }
  },
  userOptions: {
    show: true,
    title: "options",
    labels: {
      useDiv: "Title & legend inside",
      showTable: "Show table",
      sort: "Sort desc"
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
      roundingValue: 0,
      roundingPercentage: 0,
      prefix: "",
      suffix: ""
    }
  },
  translations: {
    parentName: "Serie",
    childName: "Child",
    value: "value",
    percentageToTotal: "%/total",
    percentageToSerie: "%/serie"
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
            <VueUiIcon name="chartVerticalBar" stroke="#42d392" :strokeWidth="1.5" />
            VueUiVerticalBar
        </h1>
    <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.verticalBar[store.lang] }}
        </p>
    <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
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
            <VueUiVerticalBar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_vertical_bar)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-vertical-bar"/>
        </div>
        <Box showEmits showSlots>
            <template v-slot:tab0>
              {{ translations.docs.datastructure[store.lang] }}
              <div class="mt-4">
                TS type: <code class="text-app-green">VueUiVerticalBarDatasetItem[]</code>
              </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            value: number;
            color: string; <span class="text-app-green">// {{ translations.docs.comments.xy.color[store.lang] }}</span>
            children: [
                <span class="text-app-green">// {{ translations.docs.comments.verticalBar.breakdown[store.lang] }}</span>
                {
                    name: string;
                    value: number;
                },
                {...}
            ]
        },
        {...}
    ]
</code>
</pre>          
                </div>
                {{ translations.docs.example[store.lang] }}:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-app-green">dataset: VueUiVerticalBarDatasetItem[]</span> = [
    {
        name: "Serie 1",
        value: 100,
        children: [
        {
            name: "serie 1 child 1",
            value: 80
        },
        {
            name: "serie 1 child 2",
            value: 20
        },
        ]
    },
    {
        name: "Serie 2",
        value: 345,
    },
    {
        name: "Serie 3",
        value: 210,
    },
    {
        name: "Serie 4",
        value: 188,
    },
    {
        name: "Serie 5",
        value: 120,
        children: [
        {
            name: "Serie 5 child 1",
            value: 60,
        },
        {
            name: "Serie 5 child 2",
            value: 20,
        },
        {
            name: "Serie 5 child 3",
            value: 40,
        },
        ]
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
                  TS type: <code class="text-app-blue">VueUiVerticalBarConfig</code>
                </div>
                <div class="overflow-x-auto">
<pre>
<code>
const <span class="text-app-blue">config: VueUiVerticalBarConfig</span> = {
    useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.useDiv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: true)
                bars: {
                    sort: "desc", <span class="text-gray-600 dark:text-app-green">// "desc" | "asc"</span>
                    useStroke: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.useStroke" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.useStroke" @change="forceChartUpdate()">, (default: false)
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" v-model="mutableConfigDarkMode.style.chart.layout.bars.strokeWidth"><input v-else type="number" min="0" max="20" v-model="mutableConfig.style.chart.layout.bars.strokeWidth">, (default: 2)
                    height: <input v-if="isDarkMode" type="number" min="1" max="100" v-model="mutableConfigDarkMode.style.chart.layout.bars.height"><input v-else type="number" min="1" max="100" v-model="mutableConfig.style.chart.layout.bars.height">, (default: 32)
                    gap: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.bars.gap"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.layout.bars.gap">, (default: 6)
                    borderRadius: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.bars.borderRadius"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.layout.bars.borderRadius">, (default: 4)
                    offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.bars.offsetX"><input v-else type="number" v-model="mutableConfig.style.chart.layout.bars.offsetX">, (default: 64)
                    paddingRight: <input v-if="isDarkMode" type="number" min="0" v-model="mutableConfigDarkMode.style.chart.layout.bars.paddingRight"><input v-else type="number" min="0" v-model="mutableConfig.style.chart.layout.bars.paddingRight">, (default: 0)
                    useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.bars.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.bars.gradientIntensity">, (default: 20)
                    fillOpacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.bars.fillOpacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.bars.fillOpacity">, (default: 90)
                    underlayerColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bars.underlayerColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bars.underlayerColor">,  (default: "#FFFFFF")
                    dataLabels: {
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bars.dataLabels.color">, (default: "#2D353C")
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.dataLabels.bold" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.bars.dataLabels.fontSize">, (default: 12)
                        offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.offsetX"><input v-else type="number" v-model="mutableConfig.style.chart.layout.bars.dataLabels.offsetX">, (default: 0)
                        value: {
                            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.value.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.dataLabels.value.show" @change="forceChartUpdate()">, (default: true)
                            roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.value.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.bars.dataLabels.value.roundingValue">, (default: 0)
                            prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.value.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.bars.dataLabels.value.prefix">, (default: "")
                            suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.value.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.bars.dataLabels.value.suffix">, (default: "")
                        },
                        percentage: {
                            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.percentage.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.dataLabels.percentage.show" @change="forceChartUpdate()">, (default: true)
                            roundingPercentage: roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.percentage.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.bars.dataLabels.percentage.roundingPercentage">, (default: 0)
                        },
                    },
                    nameLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.nameLabels.show" @change="forceChartUpdate()">, (default: true)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bars.nameLabels.color">, (default: "#2D353C")
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.nameLabels.bold" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.bars.nameLabels.fontSize">, (default: 10)
                        offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.offsetX"><input v-else type="number" v-model="mutableConfig.style.chart.layout.bars.nameLabels.offsetX">, (default: 0)
                    },
                    parentLabels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.parentLabels.show" @change="forceChartUpdate()">, (default: true)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bars.parentLabels.color">, (default: "#2D353C")
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.parentLabels.bold" @change="forceChartUpdate()">, (default: false)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.bars.parentLabels.fontSize">, (default: 10)
                        offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.offsetX"><input v-else type="number" v-model="mutableConfig.style.chart.layout.bars.parentLabels.offsetX">, (default: 0)
                    }
                },
                highlighter: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.highlighter.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.highlighter.color">, (default: "#2D353C")
                    opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.highlighter.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.highlighter.opacity">, (default: 5)
                },
                separators: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.separators.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.separators.show" @change="forceChartUpdate()">, (default: true)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.separators.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.separators.color">, (default: "#E1E5E8")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="30" v-model="mutableConfigDarkMode.style.chart.layout.separators.strokeWidth"><input type="number" min="0" max="30" v-model="mutableConfig.style.chart.layout.separators.strokeWidth">, (default: 1)
                }
            },
            title: {
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default:"#A1A1A1")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            legend: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.legend.position"><option>top</option><option>bottom</option></select><select v-else v-model="mutableConfig.style.chart.legend.position"><option>top</option><option>bottom</option></select>
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: true)
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue">, (default: 0)
                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.legend.prefix">, (default: "")
                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.legend.suffix">, (default: "")
            },
            tooltip: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)
                showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue">, (default: 0)
                roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.tooltip.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingPercentage">, (default: 0)
                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.tooltip.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.tooltip.prefix">, (default: "")
                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.tooltip.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.tooltip.suffix">, (default: "")
            }
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.title"><input v-else type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            useDiv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.useDiv"><input v-else type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside")
            showTable: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.showTable"><input v-else type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
            sort: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.sort"><input v-else type="text" v-model="mutableConfig.userOptions.labels.sort">, (default: "Sort desc")
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
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
            roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)
            prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.prefix"><input v-else type="text" v-model="mutableConfig.table.td.prefix">, (default: "")
            suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.suffix"><input v-else type="text" v-model="mutableConfig.table.td.suffix">, (default: "")
        }
    },
    translations: {
        parentName: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.parentName"><input v-else type="text" v-model="mutableConfig.translations.parentName">, (default: "Serie")
        childName: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.childName"><input v-else type="text" v-model="mutableConfig.translations.childName">, (default: "Child")
        value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.value"><input v-else type="text" v-model="mutableConfig.translations.value">, (default: "value")
        percentageToTotal: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.percentageToTotal"><input v-else type="text" v-model="mutableConfig.translations.percentageToTotal">, (default: "%/total")
        percentageToSerie: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.percentageToSerie"><input v-else type="text" v-model="mutableConfig.translations.percentageToSerie">, (default: "%/serie")
    }
}
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
<pre>
<code>
[
    {
        children: [
            {
                childIndex: number;
                color: string;
                isChild: boolean;
                isFirstChild: boolean;
                isLastChild: boolean;
                name: string;
                parentId: string;
                parentName: string;
                parentValue: number;
                value: number;
            },
            {...}
        ],
        color: string;
        hasChildren: boolean;
        id: string;
        isChild: boolean;
        name: string;
        value: number;
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

            const verticalBarChart = ref(null);
            const verticalBarDataset = ref([]);

            onMounted(() => {
                verticalBarDataset.value = verticalBarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiVerticalBar
                ref="verticalBarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiVerticalBar
                ref="verticalBarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        verticalBarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.verticalBarDataset = this.$refs.verticalBarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
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
    &lt;VueUiVerticalBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiVerticalBar&gt;
</code>
</pre>                    

            </template>
        </Box>
    </div>
</template>