<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUiSparkStackbar from "../themes/ThemesVueUiSparkStackbar.vue";

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
});

const dataset = ref([
  {
    name: "Vue",
    value: 258,
    color: "#42d392"
  },
  {
    name: "JS",
    value: 36,
    color: "#ff9900"
  },
  {
    name: "Other",
    value: 16,
    color: "#5f8bee"
  },
]);

const config = ref({
  style: {
    backgroundColor: "#F3F4F6",
    fontFamily: "inherit",
    animation: {
      show: true,
      animationFrames: 60
    },
    bar: {
      gradient: {
        show: true,
        intensity: 40,
        underlayerColor: "#FFFFFF"
      }
    },
    legend: {
        margin: "6px 0 0 0",
      textAlign: "left",
      show: true,
      fontSize: 12,
      name: {
        color: "#2D353C",
        bold: false
      },
      value: {
        show: true,
        bold: false,
        color: "#2D353C",
        prefix: "",
        suffix: "",
        rounding: 0
      },
      percentage: {
        show: true,
        bold: true,
        color: "#2D353C",
        rounding: 1
      }
    },
    title: {
      textAlign: "left",
      text: "Title",
      color: "#2D353C",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "Subtitle",
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
      animationFrames: 60
    },
    bar: {
      gradient: {
        show: true,
        intensity: 40,
        underlayerColor: "#FFFFFF"
      }
    },
    legend: {
        margin: "6px 0 0 0",
      textAlign: "left",
      show: true,
      fontSize: 12,
      name: {
        color: "#CCCCCC",
        bold: false
      },
      value: {
        show: true,
        bold: false,
        color: "#DDDDDD",
        prefix: "",
        suffix: "",
        rounding: 0
      },
      percentage: {
        show: true,
        bold: true,
        color: "#DDDDDD",
        rounding: 1
      }
    },
    title: {
      textAlign: "left",
      text: "Title",
      color: "#FAFAFA",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "Subtitle",
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
            <VueUiIcon name="chartSparkStackbar" stroke="#42d392" :strokeWidth="1.5" />
            VueUiSparkStackbar
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.stackbar[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'sm:w-1/2'}`">
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
                <VueUiSparkStackbar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </div>
        </div>
        <div class="mx-auto">
          <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
                <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_sparkstackbar)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
                <GitHubLink link="vue-ui-sparkstackbar"/>
                <MakerLink to="VueUiSparkStackbar"/>
            </div>
        </div>
        <Box showEmits showThemes>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                  TS type: <code class="text-app-green">VueUiSparkStackBarDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            value: number;
            color?: string;
        },
        {...}
    ]
</code>
</pre>          {{ translations.docs.example[store.lang] }}:
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiSparkStackBarDatasetItem[]</span> = [
    {
        name: "Vue",
        value: 258,
        color: "#42d392"
    },
    {
        name: "Javascript",
        value: 36,
        color: "#ff9900"
    },
    {
        name: "Other",
        value: 16,
        color: "#5f8bee"
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
                  TS type: <code class="text-app-blue">VueUiSparkStackBarConfig</code>
                </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiSparkStackBarConfig</span> = {
    theme: ""; ("zen" | "hack" | "concrete" | "")
    customPalette: []; // string[]
    style: {
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
        fontFamily: "inherit",
        animation: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animation.show" @change="forceChartUpdate()">, (default: true)
          animationFrames: <input v-if="isDarkMode" type="number" min="0" max="200" v-model="mutableConfigDarkMode.style.animation.animationFrames" @change="forceChartUpdate()"><input v-else type="number" min="0" max="200" v-model="mutableConfig.style.animation.animationFrames" @change="forceChartUpdate()">, (default: 60),
        },
        bar: {
            gradient: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.bar.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.bar.gradient.show" @change="forceChartUpdate()">, (default: true)
                intensity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.bar.gradient.intensity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.bar.gradient.intensity">, (default: 40)
                    underlayerColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.bar.gradient.underlayerColor"><input v-else type="color" v-model="mutableConfig.style.bar.gradient.underlayerColor">, (default: "#FFFFFF")
            }
        },
        legend: {
            textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.legend.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.legend.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "left")
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.show" @change="forceChartUpdate()">, (default: true)
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.legend.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.legend.fontSize">, (default: 12)
            margin: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.legend.margin"><input v-else type="text" v-model="mutableConfig.style.legend.margin">, (default: "6px 0 0 0")
            name: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.name.color"><input v-else type="color" v-model="mutableConfig.style.legend.name.color">, (default: "#2D353C")
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.name.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.name.bold" @change="forceChartUpdate()">, (default: false)
            },
            value: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.value.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.value.show" @change="forceChartUpdate()">, (default: true)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.value.bold" @change="forceChartUpdate()">, (default: false)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.value.color"><input v-else type="color" v-model="mutableConfig.style.legend.value.color">, (default: "#2D353C")
                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.legend.value.prefix"><input v-else type="text" v-model="mutableConfig.style.legend.value.prefix">, (default: "")
                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.legend.value.suffix"><input v-else type="text" v-model="mutableConfig.style.legend.value.suffix">, (default: "")
                rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.legend.value.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.legend.value.rounding">, (default: 0)
            },
            percentage: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.percentage.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.percentage.show" @change="forceChartUpdate()">, (default: true)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.percentage.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.percentage.bold" @change="forceChartUpdate()">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.percentage.color"><input v-else type="color" v-model="mutableConfig.style.legend.percentage.color">, (default: "#2D353C")
                rounding: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.legend.percentage.rounding"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.legend.percentage.rounding">, (default: 0)
            }
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
  &lt;VueUiSparkStackbar
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiSparkStackBarDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

            </template>

            <template #tab6>
              <ThemesVueUiSparkStackbar />
            </template>
        </Box>
    </div>
</template>
