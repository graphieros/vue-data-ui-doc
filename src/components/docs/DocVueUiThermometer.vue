<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";

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

const dataset = ref({
  value: 37,
  from: -100,
  to: 100,
  steps: 20,
  colors: {
    from: "#42d392",
    to: "#5f8bee",
  }
});

const config = ref({
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#f3f4f6",
      color: "#2D353C",
      height: 360,
      thermometer: {
        width: 48
      },
      padding: {
        top: 12,
        bottom: 12,
        left: 64,
        right: 64
      },
      graduations: {
        show: true,
        sides: "both",
        height: 2,
        stroke: "#e1e5e8",
        strokeWidth: 1,
        showIntermediate: true,
        gradient: {
          show: true,
          intensity: 40
        }
      },
      animation: {
        use: true,
        speedMs: 1000
      },
      label: {
        fontSize: 20,
        rounding: 1,
        bold: true,
        color: "#2D353C"
      }
    },
    title: {
      useDiv: true,
      text: "Title",
      color: "#2D353C",
      fontSize: 20,
      bold: true,
      subtitle: {
        color: "#A1A1A1",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    }
  },
  userOptions: {
    show: true,
    title: "options",
    labels: {
      useDiv: "Title inside"
    }
  }
});

const darkModeConfig = ref({
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      height: 360,
      thermometer: {
        width: 48
      },
      padding: {
        top: 12,
        bottom: 12,
        left: 64,
        right: 64
      },
      graduations: {
        show: true,
        sides: "both",
        height: 2,
        stroke: "#e1e5e8",
        strokeWidth: 1,
        showIntermediate: true,
        gradient: {
          show: true,
          intensity: 40
        }
      },
      animation: {
        use: true,
        speedMs: 1000
      },
      label: {
        fontSize: 20,
        rounding: 1,
        bold: true,
        color: "#CCCCCC"
      }
    },
    title: {
      useDiv: true,
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
    }
  },
  userOptions: {
    show: true,
    title: "options",
    labels: {
      useDiv: "Title inside"
    }
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    forceChartUpdate();
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiThermometer</h1>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'sm:w-1/4 sm:max-w-[300px]'}`">
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
            <VueUiThermometer :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_thermometer)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
        </div>

        <Box showEmits>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        value: number;
        from: number;
        to: number;
        steps?: number; (default: 10)
        colors?: {
            from?: string; (default: "#dc3912")
            to?: string; (default: "#3366cc")
        }
    }
</code>
</pre>          {{ translations.docs.example[store.lang] }} :
                    <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = {
    value: 37,
    from: -100,
    to: 100,
    steps: 20,
    colors: {
        from: "#dc3912",
        to: "#3366cc",
    }
}
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
<pre>
<code>
const <span class="text-black dark:text-app-blue">config</span> = {
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            height: <input v-if="isDarkMode" type="number" min="100" max="1000" step="1" v-model="mutableConfigDarkMode.style.chart.height" @change="forceChartUpdate"><input v-else type="number" min="100" max="1000" step="1" v-model="mutableConfig.style.chart.height" @change="forceChartUpdate">, (default: 360)
            thermometer: {
                width: <input v-if="isDarkMode" type="number" min="10" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.thermometer.width" @change="forceChartUpdate"><input v-else type="number" min="10" max="100" step="1" v-model="mutableConfig.style.chart.thermometer.width" @change="forceChartUpdate">, (default: 48)
            },
            padding: {
                top: <input v-if="isDarkMode" type="number" min="0" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.padding.top" @change="forceChartUpdate"><input v-else type="number" min="0" max="100" step="1" v-model="mutableConfig.style.chart.padding.top" @change="forceChartUpdate">, (default: 12)
                bottom: <input v-if="isDarkMode" type="number" min="0" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.padding.bottom" @change="forceChartUpdate"><input v-else type="number" min="0" max="100" step="1" v-model="mutableConfig.style.chart.padding.bottom" @change="forceChartUpdate">, (default: 12)
                left: <input v-if="isDarkMode" type="number" min="0" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.padding.left" @change="forceChartUpdate"><input v-else type="number" min="0" max="100" step="1" v-model="mutableConfig.style.chart.padding.left" @change="forceChartUpdate">, (default: 64)
                right: <input v-if="isDarkMode" type="number" min="0" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.padding.right" @change="forceChartUpdate"><input v-else type="number" min="0" max="100" step="1" v-model="mutableConfig.style.chart.padding.right" @change="forceChartUpdate">, (default: 64)
            },
            graduations: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.graduations.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.graduations.show" @change="forceChartUpdate()">, (default: true)
                sides: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.graduations.sides"><option value="both">both</option><option value="left">left</option><option value="right">right</option><option value="none">none</option></select><select v-else v-model="mutableConfig.style.chart.graduations.sides"><option value="both">both</option><option value="left">left</option><option value="right">right</option><option value="none">none</option></select> , (default: "both")
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.graduations.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.graduations.stroke">, (default: "#e1e5e8")
                strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.graduations.strokeWidth" @change="forceChartUpdate"><input v-else type="number" min="0" max="100" step="1" v-model="mutableConfig.style.chart.graduations.strokeWidth" @change="forceChartUpdate">, (default: 1)
                showIntermediate: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.graduations.showIntermediate" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.graduations.showIntermediate" @change="forceChartUpdate()">, (default: true)
                gradient: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.graduations.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.graduations.gradient.show" @change="forceChartUpdate()">, (default: true)
                    intensity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.graduations.gradient.intensity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.graduations.gradient.intensity">, (default: 20)
                }
            },
            animation: {
                use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)
                speedMs: <input v-if="isDarkMode" type="range" min="50" max="1000" step="50" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.speedMs"><input v-else type="range" min="50" max="1000" step="50" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.speedMs">
            },
            label: {
                fontSize: <input v-if="isDarkMode" type="number" min="0" max="48" step="1" v-model="mutableConfigDarkMode.style.chart.label.fontSize" @change="forceChartUpdate"><input v-else type="number" min="0" max="48" step="1" v-model="mutableConfig.style.chart.label.fontSize" @change="forceChartUpdate">, (default: 20)
                rounding: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.label.rounding" @change="forceChartUpdate"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.label.rounding" @change="forceChartUpdate">, (default: 1)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.label.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.label.bold" @change="forceChartUpdate()">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.label.color"><input v-else type="color" v-model="mutableConfig.style.chart.label.color">, (default: "#2D353C")
            }
        },
        title: {
            useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.useDiv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.useDiv" @change="forceChartUpdate()">, (default: true)
            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
            fontSize: fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.title.fontSize">, (default: 20)
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
            subtitle: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
            }
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.title"><input v-else type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            useDiv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.useDiv"><input v-else type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title inside")
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
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
            </template>
        </Box>
    </div>
</template>