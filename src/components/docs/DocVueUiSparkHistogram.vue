<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUiSparkHistogram from "../themes/ThemesVueUiSparkHistogram.vue";

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

const currentShape = ref('square');

const shapes = ref([
  "circle",
  "triangle",
  "square",
  "diamond",
  "pentagon",
  "hexagon",
  "star"
]);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
  {
    value: 1.2,
    valueLabel: "20%",
    timeLabel: "09:00",
    intensity: 0.2,
  },
  {
    value: 1.3,
    valueLabel: "50%",
    timeLabel: "10:00",
    intensity: 0.5,

  },
  {
    value: 1.1,
    valueLabel: "60%",
    timeLabel: "11:00",
    intensity: 0.6,

  },
  {
    value: 0.8,
    valueLabel: "70%",
    timeLabel: "12:00",
    intensity: 0.7,

  },
  {
    value: 2,
    valueLabel: "100%",
    timeLabel: "13:00",
    intensity: 1,

  },
  {
    value: 2.1,
    valueLabel: "100%",
    timeLabel: "14:00",
    intensity: 1,

  },
  {
    value: 2.3,
    valueLabel: "80%",
    timeLabel: "15:00",
    intensity: 0.8,

  },
  {
    value: 2.1,
    valueLabel: "70%",
    timeLabel: "16:00",
    intensity: 0.7,

  },
  {
    value: 0.9,
    valueLabel: "60%",
    timeLabel: "17:00",
    intensity: 0.6,

  },
  {
    value: 0.7,
    valueLabel: "50%",
    timeLabel: "18:00",
    intensity: 0.5,

  },
  {
    value: 0.3,
    valueLabel: "30%",
    timeLabel: "19:00",
    intensity: 0.3,

  },
  {
    value: 0.2,
    valueLabel: "20%",
    timeLabel: "20:00",
    intensity: 0.2,

  },
]);

const config = ref({
  style: {
    backgroundColor: "#F3F4F6",
    fontFamily: "inherit",
    animation: {
      show: true,
      speedMs: 500,
    },
    layout: {
      height: 160,
      width: 1200,
      padding: {
        top: 36,
        right: 0,
        left: 0,
        bottom: 64
      }
    },
    bars: {
      shape: currentShape.value,
      strokeWidth: 0,
      colors: {
        positive: "#5f8bee",
        negative: "#ff6400",
        gradient: {
          show: true
        }
      },
      borderRadius: 24,
      gap: 12
    },
    labels: {
      value: {
        fontSize: 24,
        color: "#2D353C",
        bold: true,
        rounding: 1,
        prefix: "",
        suffix: "",
        offsetY: -4
      },
      valueLabel: {
        fontSize: 24,
        color: "#2D353C",
        bold: false,
        rounding: 0
      },
      timeLabel: {
        fontSize: 24,
        color: "#2D353C",
        bold: false
      }
    },
    selector: {
      stroke: "#5f8bee",
      borderRadius: 12,
      strokeWidth: 2,
      strokeDasharray: 0
    },
    title: {
      textAlign: "left",
      text: "Rainfall in mm",
      color: "#2D353C",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "",
        fontSize: 12,
        bold: false
      }
    }
  }
});

const darkModeConfig = ref({
  style: {
    backgroundColor: "#1A1A1A",
    fontFamily: "inherit",
    animation: {
      show: true,
      speedMs: 500,
    },
    layout: {
      height: 160,
      width: 1200,
      padding: {
        top: 36,
        right: 0,
        left: 0,
        bottom: 64
      }
    },
    bars: {
      shape: currentShape.value,
      strokeWidth: 0,
      colors: {
        positive: "#5f8bee",
        negative: "#ff6400",
        gradient: {
          show: true
        }
      },
      borderRadius: 24,
      gap: 12
    },
    labels: {
      value: {
        fontSize: 24,
        color: "#CCCCCC",
        bold: true,
        rounding: 1,
        prefix: "",
        suffix: "",
        offsetY: -4
      },
      valueLabel: {
        fontSize: 24,
        color: "#777777",
        bold: false,
        rounding: 0
      },
      timeLabel: {
        fontSize: 24,
        color: "#CCCCCC",
        bold: false
      }
    },
    selector: {
      stroke: "#5f8bee",
      borderRadius: 12,
      strokeWidth: 2,
      strokeDasharray: 0
    },
    title: {
      textAlign: "left",
      text: "Rainfall in mm",
      color: "#FAFAFA",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "",
        fontSize: 12,
        bold: false
      }
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
            <VueUiIcon name="chartSparkHistogram" stroke="#42d392" :strokeWidth="1.5" />
            VueUiSparkHistogram
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.histogram[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'sm:w-full max-w-[600px]'}`">
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
            <div class="w-full px-4">
                <VueUiSparkHistogram :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </div>
        </div>
            <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_sparkhistogram)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-sparkhistogram"/>
            <MakerLink to="VueUiSparkHistogram"/>
        </div>

        <Box showEmits showThemes>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                  TS type: <code class="text-app-green">VueUiSparkHistogramDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            value: number;
            intensity?: number; (between 0 and 1)
            valueLabel?: string;
            timeLabel?: string;
        },
        {...}
    ]
</code>
</pre>          {{ translations.docs.example[store.lang] }}:
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiSparkHistogramDatasetItem[]</span> = [
    {
        value: 1.2,
        valueLabel: "20%",
        timeLabel: "09:00",
        intensity: 0.2,
    },
    {
        value: 1.3,
        valueLabel: "50%",
        timeLabel: "10:00",
        intensity: 0.5,

    },
    {
        value: 1.1,
        valueLabel: "60%",
        timeLabel: "11:00",
        intensity: 0.6,

    },
    {
        value: 0.8,
        valueLabel: "70%",
        timeLabel: "12:00",
        intensity: 0.7,

    },
    {
        value: 2,
        valueLabel: "100%",
        timeLabel: "13:00",
        intensity: 1,

    },
    {
        value: 2.1,
        valueLabel: "100%",
        timeLabel: "14:00",
        intensity: 1,

    },
    {
        value: 2.3,
        valueLabel: "80%",
        timeLabel: "15:00",
        intensity: 0.8,

    },
    {
        value: 2.1,
        valueLabel: "70%",
        timeLabel: "16:00",
        intensity: 0.7,

    },
    {
        value: 0.9,
        valueLabel: "60%",
        timeLabel: "17:00",
        intensity: 0.6,

    },
    {
        value: 0.7,
        valueLabel: "50%",
        timeLabel: "18:00",
        intensity: 0.5,

    },
    {
        value: 0.3,
        valueLabel: "30%",
        timeLabel: "19:00",
        intensity: 0.3,

    },
    {
        value: 0.2,
        valueLabel: "20%",
        timeLabel: "20:00",
        intensity: 0.2,

    },
]
</code>
</pre>                
                </div>
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiSparkHistogramConfig</code>
                </div>

<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiSparkHistogramConfig</span> = {
    theme: ""; ("zen" | "hack" | "concrete" | "")
    style: {
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
        fontFamily: "inherit",
        animation: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animation.show" @change="forceChartUpdate()">, (default: true)
          speedMs: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1000" v-model="mutableConfigDarkMode.style.animation.speedMs"><input v-else type="number" class="accent-app-blue" min="0" max="1000" v-model="mutableConfig.style.animation.speedMs">, (default: 500)
        },
        layout: {
            height: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="64" max="600" v-model="mutableConfigDarkMode.style.layout.height"><input v-else type="range" class="accent-app-blue" min="64" max="600" v-model="mutableConfig.style.layout.height">, (default: 96)
            width: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="200" max="1600" v-model="mutableConfigDarkMode.style.layout.width"><input v-else type="range" class="accent-app-blue" min="200" max="1600" v-model="mutableConfig.style.layout.width">, (default: 640)
            padding: {
                top: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.layout.padding.top"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.layout.padding.top">, (default: 24)
                right: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.layout.padding.right"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.layout.padding.right">, (default: 0)
                left: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.layout.padding.left"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.layout.padding.left">, (default: 0)
                bottom: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.layout.padding.bottom"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.layout.padding.bottom">, (default: 36)
            }
        },
        bars: {
            shape: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.bars.shape" @change="forceChartUpdate"><option v-for="shape in shapes">{{ shape }}</option></select><select v-else v-model="mutableConfig.style.bars.shape" @change="forceChartUpdate"><option v-for="shape in shapes">{{ shape }}</option></select>
            strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.bars.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.bars.strokeWidth">, (default: 0)
            colors: {
                positive: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.bars.colors.positive"><input v-else type="color" v-model="mutableConfig.style.bars.colors.positive">, (default: "#3366cc")
                negative: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.bars.colors.negative"><input v-else type="color" v-model="mutableConfig.style.bars.colors.negative">, (default: "#dc3912")
                gradient: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.bars.colors.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.bars.colors.gradient.show" @change="forceChartUpdate()">, (default: true)
                }
            },
            borderRadius: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.bars.borderRadius"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.bars.borderRadius">, (default: 24)
            gap: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.bars.gap"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.bars.gap">, (default: 12)
        },
        labels: {
            value: {
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.labels.value.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.labels.value.fontSize">, (default: 14)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.labels.value.color"><input v-else type="color" v-model="mutableConfig.style.labels.value.color">, (default: "#2D353C")
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.value.bold" @change="forceChartUpdate()">, (default: true)
                rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.labels.value.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.labels.value.rounding">, (default: 1)
                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.labels.value.prefix"><input v-else type="text" v-model="mutableConfig.style.labels.value.prefix">, (default: "")
                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.labels.value.suffix"><input v-else type="text" v-model="mutableConfig.style.labels.value.suffix">, (default: "")
                offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.labels.value.offsetY"><input v-else type="number" v-model="mutableConfig.style.labels.value.offsetY">, (default: 0)
            },
            valueLabel: {
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.labels.valueLabel.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.labels.valueLabel.fontSize">, (default: 14)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.labels.valueLabel.color"><input v-else type="color" v-model="mutableConfig.style.labels.valueLabel.color">, (default: "#2D353C")
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.valueLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.valueLabel.bold" @change="forceChartUpdate()">, (default: false)
            },
            timeLabel: {
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.labels.timeLabel.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.labels.timeLabel.fontSize">, (default: 12)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.labels.timeLabel.color"><input v-else type="color" v-model="mutableConfig.style.labels.timeLabel.color">, (default: "#2D353C")
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.timeLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.timeLabel.bold" @change="forceChartUpdate()">, (default: false)
            }
        },
        selector: { <span class="text-gray-500">// since v.1.9.20</span>
          stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.selector.stroke"><input v-else type="color" v-model="mutableConfig.style.selector.stroke">, (default: "#3366cc")
          strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="6" v-model="mutableConfigDarkMode.style.selector.strokeWidth"><input v-else type="number" min="0" max="6" v-model="mutableConfig.style.selector.strokeWidth">, (default: 2)
          strokeDasharray: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.selector.strokeDasharray"><input v-else type="number" min="0" max="6" v-model="mutableConfig.style.selector.strokeDasharray">, (default: 0)
          borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.selector.borderRadius"><input v-else type="number" min="0" max="6" v-model="mutableConfig.style.selector.borderRadius">, (default: 2)
        },
        title: {
            textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.title.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "left")
            text: <input v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.text"><input v-else v-model="mutableConfig.style.title.text">, (default: "")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.title.fontSize">, (default: 16)
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
            margin: <input v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.margin"><input v-else v-model="mutableConfig.style.title.margin">, (default: "")
            subtitle: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">,(default: "#A1A1A1")
                text: <input v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else v-model="mutableConfig.style.title.subtitle.text">, (default: "")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 12)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
            }
        }
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
  &lt;VueUiSparkHistogram
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiSparkHistogramDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

            </template>

            <template #tab6>
              <ThemesVueUiSparkHistogram />
            </template>
        </Box>

    </div>
</template>