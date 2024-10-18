<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ucSparkline from "../useCases/uc-sparkline.vue"
import ThemesVueUiSparkline from "../themes/ThemesVueUiSparkline.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from '../BaseNumberInput.vue';
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";

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
            <VueUiIcon name="chartSparkline" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Sparkline</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.sparkline[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
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
                <VueUiSparkline :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
              </template>
              <template #fallback>
                  <BaseSpinner />
              </template>
            </Suspense>
        </div>

        <BaseDocActions
          targetLink="vue-ui-sparkline"
          targetMaker="VueUiSparkline"
          :configSource="mainConfig.vue_ui_sparkline"
        />

        <Box showSlots showEmits showUseCases showThemes schema="vue_ui_sparkline">
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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiSparklineConfig" equal>
    <span>theme: "", ("" | "zen" | "hack" | "concrete")</span>
    <BaseAttr name="type" attr="type" type="select" defaultVal="line" :options="['line', 'bar']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="chartWidth" attr="style.chartWidth" type="number" defaultVal="290" :min="100" :max="400" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="animation" :level="2" title="style.animation">
        <BaseAttr name="show" attr="style.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="animationFrames" attr="style.animation.animationFrames" type="number" defaultVal="60" :min="0" :max="500" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
      <BaseDetails attr="area" :level="2" title="style.area">
        <BaseAttr name="show" attr="style.area.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="useGradient" attr="style.area.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="opacity" attr="style.area.opacity" type="number" defaultVal="30" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.area.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="bar" :level="2" title="style.bar">
        <BaseAttr name="borderRadius" attr="style.bar.borderRadius" type="number" defaultVal="3" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.bar.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="dataLabel" :level="2" title="style.dataLabel">
        <BaseAttr name="show" attr="style.dataLabel.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="position" attr="style.dataLabel.position" type="select" defaultVal="left" :options="['left', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="offsetX" attr="style.dataLabel.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="offsetY" attr="style.dataLabel.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.dataLabel.fontSize" type="number" defaultVal="20" :min="8" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="bold" attr="style.dataLabel.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.dataLabel.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="roundingValue" attr="style.dataLabel.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="valueType" attr="style.dataLabel.valueType" type="select" defaultVal="latest" :options="['latest', 'sum', 'average']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="prefix" attr="style.dataLabel.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="suffix" attr="style.dataLabel.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="line" :level="2" title="style.line">
        <BaseAttr name="color" attr="style.line.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeWidth" attr="style.line.strokeWidth" type="number" defaultVal="3" :min="0.1" :max="10" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="smooth" attr="style.line.smooth" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="plot" :level="2" title="style.plot">
        <BaseAttr name="show" attr="style.plot.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="radius" attr="style.plot.radius" type="number" defaultVal="4" :min="1" :max="20" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="stroke" attr="style.plot.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeWidth" attr="style.plot.strokeWidth" type="number" defaultVal="1" :min="0" :max="10" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <BaseAttr name="show" attr="style.title.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      </BaseDetails>
      <BaseDetails attr="verticalIndicator" :level="2" title="style.verticalIndicator">
        <BaseAttr name="show" attr="style.verticalIndicator.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="strokeWidth" attr="style.verticalIndicator.strokeWidth" type="number" defaultVal="1.5" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="color" attr="style.verticalIndicator.color" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="strokeDasharray" attr="style.verticalIndicator.strokeDasharray" type="number" defaultVal="3" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="zeroLine" :level="2" title="style.zeroLine">
        <BaseAttr name="color" attr="style.zeroLine.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="strokeWidth" attr="style.zeroLine.strokeWidth" type="number" defaultVal="1" :min="0.1" :max="12" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>
                
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
    {{ translations.slots.sparklineBefore[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiSparkline
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #before="{ selected, latest, sum, average, median, trend }"&gt;
            &lt;ul&gt;
              &lt;li&gt;Latest: <span v-pre>{{ latest }}</span>&gt;
              &lt;li&gt;Sum: <span v-pre>{{ sum }}</span>&gt;
              &lt;li&gt;Average: <span v-pre>{{ average }}</span>&gt;
              &lt;li&gt;Median: <span v-pre>{{ median }}</span>&gt;
              &lt;li&gt;Trend: <span v-pre>{{ trend }}</span>&gt;
              &lt;li&gt;Selected: <span v-pre>{{ selected }}</span>&gt;
            &lt;/ul&gt;
        &lt;/template&gt;
    &lt;/VueUiSparkline&gt;
</code>
</pre>  
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

            <template #tab5>
              <ucSparkline/>
            </template>

            <template #tab6>
              <ThemesVueUiSparkline />
            </template>
        </Box>
    </div>
</template>