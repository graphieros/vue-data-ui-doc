<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiWheel from "../themes/ThemesVueUiWheel.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseDocActions from "./BaseDocActions.vue";
import BaseSpinner from "../BaseSpinner.vue";

const mainConfig = useConfig()

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
        textAlign: 'center',
        paddingLeft: 0,
        paddingRight: 0,
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
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
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
        textAlign: 'center',
        paddingLeft: 0,
        paddingRight: 0,
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
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
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
            <VueUiIcon name="chartWheel" stroke="#42d392" :strokeWidth="1.5" />
            VueUiWheel
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.wheel[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[450px]'}`">
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
                <VueUiWheel :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
              </template>
              <template #fallback>
                <BaseSpinner/>    
              </template>
            </Suspense>
        </div>

        <BaseDocActions
          targetLink="vue-ui-wheel"
          targetMaker="VueUiWheel"
          :configSource="mainConfig.vue_ui_wheel"
        />

        <Box showEmits showSlots showThemes showResponsive schema="vue_ui_wheel">
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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiWheelConfig" equal>
    <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
        <BaseDetails attr="animation" :level="3" title="style.chart.animation">
          <span>use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)</span>
          <span>speed: 1,</span>
          <span>acceleration: 1,</span>
        </BaseDetails>
        <BaseDetails attr="layout" :level="3" title="style.chart.layout">
          <BaseDetails attr="innerCircle" :level="4" title="style.chart.layout.innerCircle">
            <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.innerCircle.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.innerCircle.show" @change="forceChartUpdate()">, (default: true)</span>
            <span> stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.innerCircle.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.innerCircle.stroke">, (default: "#e1e5e8")</span>
            <span>strokeWidth: <input v-if="isDarkMode" type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.innerCircle.strokeWidth"><input v-else type="range" min="0" max="12" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.innerCircle.strokeWidth">, (default: 1)</span>
          </BaseDetails>
          <BaseDetails attr="percentage" :level="4" title="style.chart.layout.percentage">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.percentage.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.percentage.show" @change="forceChartUpdate()">, (default: true)</span>
            <span>fontSize: <input v-if="isDarkMode" type="range" min="8" max="96" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.percentage.fontSize"><input v-else type="range" min="8" max="96" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.percentage.fontSize">, (default: 48)</span>
            <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.percentage.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.percentage.rounding" :min="0" :max="6"/>, (default: 1)</span>
            <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.percentage.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.percentage.bold" @change="forceChartUpdate()">, (default: true)</span>
          </BaseDetails>
          <BaseDetails attr="wheel" :level="4" title="style.chart.layout.wheel">
            <BaseDetails attr="ticks" :level="5" title="style.chart.layout.wheel.ticks">
              <span>rounded: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.rounded" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.wheel.ticks.rounded" @change="forceChartUpdate()">, (default: true)</span>
              <span> inactiveColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.inactiveColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.wheel.ticks.inactiveColor">, (default: "#e1e5e8")</span>
              <span>activeColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.activeColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.wheel.ticks.activeColor">, (default: "#5f8bee")</span>
              <BaseDetails attr="gradient" :level="6" title="style.chart.layout.wheel.ticks.gradient">
                <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.wheel.ticks.gradient.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>shiftHueIntensity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.wheel.ticks.gradient.shiftHueIntensity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.wheel.ticks.gradient.shiftHueIntensity">, (default: 100)</span>
              </BaseDetails>
            </BaseDetails>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="title" :level="3" title="style.chart.title">
          <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate">, (default: "")</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.color" @change="forceChartUpdate">, (default: "#2D353C")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
          <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select></span>
          <span>paddingLeft: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
          <span>paddingRight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
          <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color" @change="forceChartUpdate"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color" @change="forceChartUpdate">, (default: "#A1A1A1")</span>
            <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text" @change="forceChartUpdate"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text" @change="forceChartUpdate">, (default: "")</span>
            <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
            <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
          </BaseDetails>
        </BaseDetails>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <span> pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
        <span> img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
        <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <span> open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
        <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
        <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
        <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
        <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>

                <div class="overflow-w-auto">              
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

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiWheel
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
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
