<script setup>
import { ref, computed, watch, nextTick } from "vue";
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
    period: "period 1",
    value: 0
  },
  {
    period: "period 2",
    value: 1
  },
  {
    period: "period 3",
    value: 0
  },
  {
    period: "period 4",
    value: 2
  },
  {
    period: "period 5",
    value: 1
  },
  {
    period: "period 6",
    value: 3
  },
  {
    period: "period 7",
    value: 2
  },
  {
    period: "period 8",
    value: 5
  },
  {
    period: "period 9",
    value: 3
  },
  {
    period: "period 10",
    value: 8
  },
  {
    period: "period 11",
    value: 5
  },
  {
    period: "period 12",
    value: 13
  },
  {
    period: "period 13",
    value: 8
  },
  {
    period: "period 14",
    value: 21
  },
  {
    period: "period 15",
    value: 13
  },
  {
    period: "period 16",
    value: 34
  },
  {
    period: "period 17",
    value: 21
  },
]);

const darkModeConfig = ref({
  type: 'line',
  style: {
    backgroundColor: "#242424",
    fontFamily: "inherit",
    chartWidth: 290,
    animation: {
      show: true,
      animationFrames: 360,
    },
    line: {
      color: "#5f8bee",
      strokeWidth: 3,
      smooth: true,
    },
    bar: {
      borderRadius: 3,
      color: "#5f8bee",
    },
    zeroLine: {
      color: "#505050",
      strokeWidth: 1
    },
    plot: {
      show: true,
      radius: 4,
      stroke: "#FFFFFF",
      strokeWidth: 1
    },
    verticalIndicator: {
      show: true,
      strokeWidth: 1.5,
      color: "#5f8bee",
      strokeDasharray: 3
    },
    dataLabel: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      position: "left",
      fontSize: 48,
      bold: true,
      color: "#CCCCCC",
      roundingValue: 1,
      valueType: "latest",
      prefix: "",
      suffix: ""
    },
    title: {
      show: true,
      textAlign: "left",
      color: "#FAFAFA",
      fontSize: 16,
      bold: true,
      text: "Title"
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#5f8bee"
    }
  }
});
const config = ref({
  type: 'line',
  style: {
    backgroundColor: "#e1e5e8",
    fontFamily: "inherit",
    chartWidth: 290,
    animation: {
      show: true,
      animationFrames: 360
    },
    line: {
      color: "#5f8bee",
      strokeWidth: 3,
      smooth: true
    },
    bar: {
      borderRadius: 3,
      color: "#5f8bee",
    },
    zeroLine: {
      color: "#505050",
      strokeWidth: 1
    },
    plot: {
      show: true,
      radius: 4,
      stroke: "#FFFFFF",
      strokeWidth: 1
    },
    verticalIndicator: {
      show: true,
      strokeWidth: 1.5,
      color: "#5f8bee",
      strokeDasharray: 3
    },
    dataLabel: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      position: "left",
      fontSize: 48,
      bold: true,
      color: "#1A1A1A",
      roundingValue: 1,
      valueType: "latest",
      prefix: "",
      suffix: ""
    },
    title: {
      show: true,
      textAlign: "left",
      color: "#1A1A1A",
      fontSize: 16,
      bold: true,
      text: "Title"
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#5f8bee"
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
            <VueUiIcon name="chartSparkline" stroke="#42d392" :strokeWidth="1.5" />
            VueUiSparkline
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.sparkline[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
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
            <VueUiSparkline :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_sparkline)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-sparkline"/>
            <MakerLink to="VueUiSparkline"/>
        </div>
        <Box showSlots showEmits>
            <template v-slot:tab0>
              {{ translations.docs.datastructure[store.lang] }}
              <div class="mt-4">
                TS type: <code class="text-app-green">VueUiSparklineDatasetItem[]</code>
              </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            period: string;
            value: number;
        },
        {...}
    ]
</code>
</pre>          {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiSparklineDatasetItem[]</span> = [
    {
      period: "period 1",
      value: 0
    },
    {
      period: "period 2",
      value: -1
    },
    {
      period: "period 3",
      value: 2
    },
    {
      period: "period 4",
      value: -3
    },
    {
      period: "period 5",
      value: 4
    },
    {
      period: "period 6",
      value: -5
    },
    {
      period: "period 7",
      value: 6
    },
    {
      period: "period 8",
      value: -7
    },
    {
      period: "period 9",
      value: 8
    },
    {
      period: "period 10",
      value: -9
    },
    {
      period: "period 11",
      value: 10
    },
    {
      period: "period 12",
      value: -11
    },
    {
      period: "period 13",
      value: 12
    },
    {
      period: "period 14",
      value: -13
    },
    {
      period: "period 15",
      value: 14
    },
    {
      period: "period 16",
      value: -15
    },
    {
      period: "period 17",
      value: 16
    },
]
</code>
</pre>                
                </div>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
                  <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiSparklineConfig</code>
                </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiSparklineConfig</span> = {
  type: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.type"><option>line</option><option>bar</option></select><select v-else v-model="mutableConfig.type"><option>line</option><option>bar</option></select> <span class="text-gray-400">// since v.1.9.6</span>
  style: {
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    fontFamily: "inherit",
    chartWidth: <input v-if="isDarkMode" type="number" min="200" max="400" v-model="mutableConfigDarkMode.style.chartWidth"><input v-else type="number" min="200" max="400" v-model="mutableConfig.style.chartWidth">, (default: 290),
    animation: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animation.show" @change="forceChartUpdate()">, (default: true)
      animationFrames: <input v-if="isDarkMode" type="number" min="0" max="200" v-model="mutableConfigDarkMode.style.animation.animationFrames" @change="forceChartUpdate()"><input v-else type="number" min="0" max="200" v-model="mutableConfig.style.animation.animationFrames" @change="forceChartUpdate()">, (default: 60),
    },
    line: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.line.color"><input v-else type="color" v-model="mutableConfig.style.line.color"> (default: "#3366cc"),
      strokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="10" step="0.1" v-model="mutableConfigDarkMode.style.line.strokeWidth"><input v-else type="number" min="0.1" max="10" step="0.1" v-model="mutableConfig.style.line.strokeWidth">, (default: 3),
      smooth: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.line.smooth" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.line.smooth" @change="forceChartUpdate()">, (default: false) <span class="text-gray-400">// since v.1.9.1</span>
    },
    bar: {
      borderRadius: <input v-if="isDarkMode" type="number" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.bar.borderRadius"><input v-else type="number" min="0.1" max="12" step="0.1" v-model="mutableConfig.style.bar.borderRadius">, (default: 3)
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.bar.color"><input v-else type="color" v-model="mutableConfig.style.bar.color"> (default: "#3366cc"),
    },
    zeroLine: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.zeroLine.color"><input v-else type="color" v-model="mutableConfig.style.zeroLine.color">, (default: "#2D353C")
      strokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="6" step="0.1" v-model="mutableConfigDarkMode.style.zeroLine.strokeWidth"><input v-else type="number" min="0.1" max="6" step="0.1" v-model="mutableConfig.style.zeroLine.strokeWidth">, (default: 1)
    },
    plot: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.plot.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.plot.show">, (default: true)
      radius: <input v-if="isDarkMode" type="number" min="1" max="20" step="0.1" v-model="mutableConfigDarkMode.style.plot.radius"><input v-else type="number" min="1" max="20" step="0.1" v-model="mutableConfig.style.plot.radius">, (default: 4)
      stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.plot.stroke"><input v-else type="color" v-model="mutableConfig.style.plot.stroke">, (default: "#FFFFFF")
      strokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="10" step="0.1" v-model="mutableConfigDarkMode.style.plot.strokeWidth"><input v-else type="number" min="0.1" max="10" step="0.1" v-model="mutableConfig.style.plot.strokeWidth">, (default: 1)
    },
    verticalIndicator: {
      show:  <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.verticalIndicator.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.verticalIndicator.show">, (default: true)
      strokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="10" step="0.1" v-model="mutableConfigDarkMode.style.verticalIndicator.strokeWidth"><input v-else type="number" min="0.1" max="10" step="0.1" v-model="mutableConfig.style.verticalIndicator.strokeWidth">, (default: 1.5)
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.verticalIndicator.color"><input v-else type="color" v-model="mutableConfig.style.verticalIndicator.color"> (default: "#3366cc"), <span class="text-gray-400">// since v.1.9.7</span>
      strokeDasharray: <input v-if="isDarkMode" type="number" min="0" max="8" step="0.1" v-model="mutableConfigDarkMode.style.verticalIndicator.strokeDasharray"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.verticalIndicator.strokeDasharray">, (default: 3) <span class="text-gray-400">// since v.1.9.7</span>
    },
    dataLabel: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.dataLabel.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.dataLabel.show" @change="forceChartUpdate()">, (default: true)
      position: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dataLabel.position"><input v-else type="text" v-model="mutableConfig.style.dataLabel.position">, (default: "left", other option: "right")
      offsetX: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.dataLabel.offsetX"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.dataLabel.offsetX">, (default: 0),
      offsetY: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.dataLabel.offsetY"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.dataLabel.offsetY">, (default: 0),
      fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.dataLabel.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.dataLabel.fontSize">, (default: 20)
      bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.dataLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.dataLabel.bold" @change="forceChartUpdate()">, (default: true)
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.dataLabel.color"><input v-else type="color" v-model="mutableConfig.style.dataLabel.color">, (default: "#2D353C")
      roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.dataLabel.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.dataLabel.roundingValue">, (default: 0)
      valueType: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dataLabel.valueType"><input v-else type="text" v-model="mutableConfig.style.dataLabel.valueType">, (default: "latest", other options: "sum"; "average")
      prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dataLabel.prefix"><input v-else type="text" v-model="mutableConfig.style.dataLabel.prefix">, (default: "")
      suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dataLabel.suffix"><input v-else type="text" v-model="mutableConfig.style.dataLabel.suffix">, (default: "")
    },
    title: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.show">, (default: true)
      textAlign: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.textAlign"><input v-else type="text" v-model="mutableConfig.style.title.textAlign"> (default: "left", other options: "center"; "right")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.title.fontSize">, (default: 16)
      bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
      text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")
    },
    area: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.area.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.area.show">, (default: true)
      useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.area.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.area.useGradient">, (default: true)
      opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.area.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.area.opacity">, (default: 30)
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.area.color"><input v-else type="color" v-model="mutableConfig.style.area.color">, (default: "#3366cc")
    }
  }
}
</code>
</pre>                    
                </div>
            </template>

            <template #tab2>
@selectDatapoint<br><br>

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiSparkline
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiSparklineDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiSparkline
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiSparkline&gt;
</code>
</pre>                    


            </template>
        </Box>
    </div>
</template>