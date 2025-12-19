<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkStackbar from "../themes/ThemesVueUiSparkStackbar.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import { useRouter } from "vue-router";
import BaseTabLink from "../BaseTabLink.vue";
import ExposedMethods from "../ExposedMethods.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

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
  debug: false,
  loading: false,
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
    },
    tooltip: {
        show: true,
        color: "#1A1A1A",
        backgroundColor: "#F3F4F6",
        fontSize: 14,
        customFormat: null,
        borderRadius: 4,
        borderColor:"#e1e5e8",
        borderWidth: 1,
        backgroundOpacity: 30,
        position: "center",
        offsetY: 24,
        smooth: true,
        smoothForce: 0.18,
        smoothSnapThreshold: 0.25
    }
  }
});

const darkModeConfig = ref({
  debug: false,
  loading: false,
  style: {
    backgroundColor: "#1A1A1A00",
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
    },
    tooltip: {
        show: true,
        color: "#CCCCCC",
        backgroundColor: "#1A1A1A",
        fontSize: 14,
        customFormat: null,
        borderRadius: 4,
        borderColor:"#3A3A3A",
        borderWidth: 1,
        backgroundOpacity: 30,
        position: "center",
        offsetY: 24,
        smooth: true,
        smoothForce: 0.18,
        smoothSnapThreshold: 0.25
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
    store.docSnap = !store.docSnap;
} 

const { configCode, showAllConfig } = useConfigCode()

function randomizeData() {
  dataset.value[0].value = Math.random() * 200;
  dataset.value[1].value = Math.random() * 150;
  dataset.value[2].value = Math.random() * 100;
}

const codeDataset = ref(`const dataset: VueUiSparkStackbarDatasetItem[] = [
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
  }
]`);

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

</script>

<template>
    <div>
      <BaseDocTitle name="VueUiSparkStackbar" />

      <BaseDocDescription :text="translations.docs.tooltips.stackbar[store.lang]" />

        <BaseDocHeaderActions
          targetLink="vue-ui-sparkstackbar"
          targetMaker="VueUiSparkStackbar"
          :configSource="mainConfig.vue_ui_sparkstackbar"
        />

        <div :class="`transition-all mx-auto sm:w-1/2`">
          <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
          >
            <BaseCard>
              <VueUiSparkStackbar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </BaseCard>
          </DocSnapper>
          <BaseRandomButton @click="randomizeData"/>
          <Rater itemId="vue_ui_sparkstackbar" />
        </div>

        <BaseMigrationInfo
            debug 
        />

        <Box ref="box" showEmits showThemes showSlots schema="vue_ui_sparkstackbar" signInfo="positiveOrNegativeOnly">
            <template #tab0>
                <div class="w-full overflow-x-auto">

  <CodeParser
    language="typescript"
    @copy="store.copy()"
    :title="translations.docs.datastructure[store.lang]"
    :content="`type VueUiSparkStackbarDatasetItem = {
  name: string
  value: number
  color?: string
}
    `"
    class="my-6"
  />

                <div class="w-full overflow-x-auto">
    <CodeParser
      language="typescript"
      @copy="store.copy()"
      :content="codeDataset"
      :title="translations.docs.example[store.lang]"
    />               
                </div>
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiSparkStackbarConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiSparkStackBarConfig" equal>
    <BaseAttr inactive name="debug" defaultVal="false"/>
    <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr inactive name="theme" defaultVal="''" comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete'"/>
    <BaseAttr inactive name="customPalette" defaultVal="[]" comment="string[]"/>
    <BaseDetails attr="events" :level="1">
        <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
        <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
    </BaseDetails>
    <BaseDetails attr="style" :level="1">
      <BaseAttr inactive name="fontFamily" defaultVal="'inherit'"/>
      <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="animation" :level="2" title="style.animation">
        <BaseAttr name="show" attr="style.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="animationFrames" attr="style.animation.animationFrames" type="number" defaultVal="60" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="bar" :level="2" title="style.bar">
        <BaseDetails attr="gradient" :level="3" title="style.bar.gradient">
          <BaseAttr name="show" attr="style.bar.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
          <BaseAttr name="intensity" attr="style.bar.gradient.intensity" type="number" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="underlayerColor" attr="style.bar.gradient.underlayerColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="legend" :level="2" title="style.legend">
        <BaseAttr name="show" attr="style.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="textAlign" attr="style.legend.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="fontSize" attr="style.legend.fontSize" type="number" defaultVal="12" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="margin" attr="style.legend.margin" type="text" defaultVal="6px 0 0 0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="name" :level="3" title="style.legend.name">
          <BaseAttr name="color" attr="style.legend.name.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.legend.name.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="percentage" :level="3" title="style.legend.percentage">
          <BaseAttr name="show" attr="style.legend.percentage.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.legend.percentage.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.legend.percentage.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="rounding" attr="style.legend.percentage.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="value" :level="3" title="style.legend.value">
          <BaseAttr name="show" attr="style.legend.value.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.legend.value.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.legend.value.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="rounding" attr="style.legend.value.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="prefix" attr="style.legend.value.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>          
          <BaseAttr name="suffix" attr="style.legend.value.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <div class="flex flex-row gap-2 place-items-center">
              <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
              <div class="min-w-[200px]">
                  <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                      Go to page
                  </BaseTabLink>
              </div>
          </div>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="margin" attr="style.title.margin" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
          <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
          <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails> 
      </BaseDetails>
      <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
        <BaseAttr name="show" attr="style.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="backgroundColor" attr="style.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="style.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="style.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab"/>
        <BaseAttr name="borderRadius" attr="style.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderColor" attr="style.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="borderWidth" attr="style.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="position" attr="style.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="offsetY" attr="style.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="smooth" attr="style.tooltip.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="smoothForce" attr="style.tooltip.smoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="smoothSnapThreshold" attr="style.tooltip.smoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>
              
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

<ExposedMethods
  component="VueUiSparkStackbar"
  showHideSeries
/>

            </template>

            <template #tab3>
              <BaseSlotDocumenter
                    componentName="VueUiSparkStackbar"
                    :types="[
                        'tooltip-before',
                        'tooltip-after',
                        'source'
                    ]" 
                />
            </template>

            <template #tab6>
              <ThemesVueUiSparkStackbar />
            </template>
        </Box>
    </div>
</template>
