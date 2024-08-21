<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import ThemesVueUiWheel from "../themes/ThemesVueUiWheel.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";

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

const dataset = ref({
  percentage: 66.5,
});

const config = ref({
  responsive: false,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#2D353C",
      animation: {
        use: true,
        speed: 0.5,
        acceleration: 1,
      },
      layout: {
        wheel: {
          ticks: {
            rounded: true,
            inactiveColor: "#e1e5e8",
            activeColor: "#5f8bee",
            gradient: {
              show: true,
              shiftHueIntensity: 100,
            },
          },
        },
        innerCircle: {
          show: true,
          stroke: "#e1e5e8",
          strokeWidth: 1,
        },
        percentage: {
          show: true,
          fontSize: 48,
          rounding: 1,
          bold: true,
        },
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
    },
  },
  userOptions: {
    show: true,
    buttons: {
            pdf: true,
            img: true,
            fullscreen: true
        }
  },
});

const darkModeConfig = ref({
  responsive: false,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      animation: {
        use: true,
        speed: 0.5,
        acceleration: 1,
      },
      layout: {
        wheel: {
          ticks: {
            rounded: true,
            inactiveColor: "#3A3A3A",
            activeColor: "#5f8bee",
            gradient: {
              show: true,
              shiftHueIntensity: 100,
            },
          },
        },
        innerCircle: {
          show: true,
          stroke: "#3A3A3A",
          strokeWidth: 1,
        },
        percentage: {
          show: true,
          fontSize: 48,
          rounding: 1,
          bold: true,
        },
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
    },
  },
  userOptions: {
    show: true,
    buttons: {
            pdf: true,
            img: true,
            fullscreen: true
        }
  },
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
            <VueUiIcon name="chartWheel" stroke="#42d392" :strokeWidth="1.5" />
            VueUiWheel
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.wheel[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[450px]'}`">
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
            <VueUiWheel :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_wheel)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-wheel"/>
            <MakerLink to="VueUiWheel" />
        </div>

        <Box showEmits showSlots showThemes showResponsive>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                  TS type: <code class="text-app-green">VueUiWheelDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        percentage: number; (from 0 to 100)
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiWheelDataset</span> = {
    percentage: 66.5
}
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
                  TS type: <code class="text-app-blue">VueUiWheelConfig</code>
                </div>
                <div class="overflow-w-auto">
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiWheelConfig</span> = {
  responsive: false; <span class="text-app-orange break-keep text-xs">// {{ translations.responsive[store.lang] }}</span>
  theme: ""; ("zen" | "hack" | "concrete" | "")
  style: {
    fontFamily: "inherit",
    chart: {
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
        animation: {
            use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)
            speed: 1,
            acceleration: 1,
        },
        layout: {
            wheel: {
                ticks: {
                    rounded: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.rounded" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.wheel.ticks.rounded" @change="forceChartUpdate()">, (default: true)
                    inactiveColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.inactiveColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.wheel.ticks.inactiveColor">, (default: "#e1e5e8")
                    activeColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.activeColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.wheel.ticks.activeColor">, (default: "#5f8bee")
                    gradient: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.wheel.ticks.gradient.show" @change="forceChartUpdate()">, (default: true)
                    shiftHueIntensity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.gradient.shiftHueIntensity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.wheel.ticks.gradient.shiftHueIntensity">, (default: 100)
                    }
                }
            },
            innerCircle: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.innerCircle.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.innerCircle.show" @change="forceChartUpdate()">, (default: true)
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.innerCircle.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.innerCircle.stroke">, (default: "#e1e5e8")
                strokeWidth: <input v-if="isDarkMode" type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.innerCircle.strokeWidth"><input v-else type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.innerCircle.strokeWidth">, (default: 1)
            },
            percentage: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.percentage.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.percentage.show" @change="forceChartUpdate()">, (default: true)
                fontSize: <input v-if="isDarkMode" type="range" min="8" max="96" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.percentage.fontSize"><input v-else type="range" min="8" max="96" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.percentage.fontSize">, (default: 48)
                rounding: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.layout.percentage.rounding" @change="forceChartUpdate"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.layout.percentage.rounding" @change="forceChartUpdate">, (default: 1)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.percentage.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.percentage.bold" @change="forceChartUpdate()">, (default: true)
            }
      },
      title: {
        text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "")
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.color" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "#2D353C")
        fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
        subtitle: {
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "#A1A1A1")
            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
        }
    },
    }
  },
  userOptions: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
    buttons: {
        pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)
        img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)
        fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)
    }
  }
}
</code>
</pre>                
                </div>
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

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiWheel
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiWheel&gt;
</code>
</pre>                    

            </template>

            <template #tab6>
              <ThemesVueUiWheel />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiWheel 
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
