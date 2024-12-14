<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkbar from "../themes/ThemesVueUiSparkbar.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";

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
});

const dataset = ref([
    {
        name: "quality",
        value: 61.95,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "popularity",
        value: 2.04,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "maintenance",
        value: 33.33,
        rounding: 2,
        suffix: "%"
    },
]);

const darkModeConfig = ref(
    {
        style: {
            backgroundColor: '#1A1A1A00',
            fontFamily: "inherit",
            animation: {
                show: true,
                animationFrames: 60
            },
            layout: {
                independant: true,
                percentage: true,
                target: 0,
                showTargetValue: false,
                targetValueText: ''
            },
            gutter: {
                backgroundColor: "#3A3A3A",
                opacity: 100
            },
            bar: {
                gradient: {
                    show: true,
                    intensity: 40,
                    underlayerColor: "#FFFFFF"
                }
            },
            labels: {
                fontSize: 16,
                name: {
                    position: "top-left",
                    width: "100%",
                    color: "#BABABA",
                    bold: false
                },
                value: {
                    show: true,
                    bold: true
                }
            },
            title: {
                backgroundColor: '#1A1A1A',
                text: 'Title',
                color: '#FAFAFA',
                fontSize: 20,
                bold: true,
                textAlign: "left",
                margin: '0 0 12px 0',
                subtitle: {
                    color: '#CCCCCC',
                    text: 'Subtitle',
                    fontSize: 16,
                    bold: false,
                }
            },
            gap: 4
        }
    }
);
const config = ref(
    {
        style: {
            backgroundColor: "#F3F4F6",
            fontFamily: "inherit",
            animation: {
                show: true,
                animationFrames: 60
            },
            layout: {
                independant: true,
                percentage: true,
                target: 0,
                showTargetValue: false,
                targetValueText: ''
            },
            gutter: {
                backgroundColor: "#e1e5e8",
                opacity: 100
            },
            bar: {
                gradient: {
                    show: true,
                    intensity: 40,
                    underlayerColor: "#FFFFFF"
                }
            },
            labels: {
                fontSize: 16,
                name: {
                    position: "top-left",
                    width: "100%",
                    color: "#2D353C",
                    bold: false
                },
                value: {
                    show: true,
                    bold: true
                }
            },
            title: {
                backgroundColor: '#F3F4F6',
                text: 'Title',
                color: '#1A1A1A',
                fontSize: 20,
                bold: true,
                textAlign: "left",
                margin: '0 0 12px 0',
                subtitle: {
                    color: '#CCCCCC',
                    text: 'Subtitle',
                    fontSize: 16,
                    bold: false,
                }
            },
            gap: 4
        }
    }
);

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

const { configCode, showAllConfig } = useConfigCode()

function randomizeData() {
    dataset.value[0].value = Math.random() * 100;
    dataset.value[1].value = Math.random() * 100;
    dataset.value[2].value = Math.random() * 100;
}

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartSparkbar" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Sparkbar</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.sparkbar[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-sparkbar"
            targetMaker="VueUiSparkbar"
            :configSource="mainConfig.vue_ui_sparkbar"
        />

        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'sm:w-1/2'}`">
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
                <Suspense>
                    <template #default>
                        <VueUiSparkbar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                    </template>
                    <template #fallback>
                        <BaseSpinner/>
                    </template>
                </Suspense>
            </div>
            <BaseRandomButton @click="randomizeData"/>
        </div>

        <Box showSlots showEmits showThemes schema="vue_ui_sparkbar" signInfo="positiveOnly">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiSparkbarDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            value: number;
            prefix?: string; <BaseComment>{{ translations.docs.comments.onion.prefix[store.lang] }}</BaseComment>
            suffix?: string; <BaseComment>{{ translations.docs.comments.onion.suffix[store.lang] }}</BaseComment>
            rounding?: number;
            target?: number; <BaseComment>{{ translations.docs.comments.sparkbar.target[store.lang] }}</BaseComment>
            formatter?: null | ({ value: number; config?: any }) => number | string <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment>
        }
    ]
</code>
</pre>          {{ translations.docs.example[store.lang] }}:
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiSparkbarDatasetItem[]</span> = [
    {
        name: "quality",
        value: 61.953,
        rounding: 2,
        suffix: "%",
    },
    {
        name: "popularity",
        value: 2.0412,
        rounding: 2,
        suffix: "%",
    },
    {
        name: "maintenance",
        value: 33.3291,
        rounding: 2,
        suffix: "%",
    },
]
</code>
</pre>                
                </div>
                </div>
            </template>
            <template #tab1>
                <div class="w-full overflow-x-auto">
                    <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
                    <div class="mt-4">
                        TS type: <code class="text-app-blue">VueUiSparkbarConfig</code>
                    </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiSparkbarConfig" equal>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: [], <span class="text-app-blue text-xs">// string[]</span></span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="gap" attr="style.gap" type="number" defaultVal="4" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="animation" :level="2" title="style.animation">
                <BaseAttr name="show" attr="style.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="animationFrames" attr="style.animation.animationFrames" type="number" defaultVal="60" :min="0" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="bar" :level="2" title="style.bar">
                <BaseDetails attr="gradient" :level="3" title="style.bar.gradient">
                    <BaseAttr name="show" attr="style.bar.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="intensity" attr="style.bar.gradient.intensity" type="number" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="underlayerColor" attr="style.bar.gradient.underlayerColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="gutter" :level="2" title="style.gutter">
                <BaseAttr name="backgroundColor" attr="style.gutter.backgroundColor" type="color" defaultVal="#e1e5e8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="opacity" attr="style.gutter.opacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="style.labels">
                <BaseAttr name="fontSize" attr="style.labels.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="name" :level="3" title="style.labels.name">
                    <BaseAttr name="position" attr="style.labels.name.position" type="select" defaultVal="top-left" :options="['left', 'top-left', 'top-center', 'top-right', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="width" attr="style.labels.name.width" type="text" defaultVal="100%" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.labels.name.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.labels.name.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="value" :level="3" title="style.labels.value">
                    <BaseAttr name="show" attr="style.labels.value.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.labels.value.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="layout" :level="2" title="style.layout">
                <BaseAttr name="independant" attr="style.layout.independant" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="percentage" attr="style.layout.percentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <span>target: 0, <span class="text-app-blue text-xs">// Common to all bars. Use target in dataset for individual targets.</span></span>
                <BaseAttr name="showTargetValue" attr="style.layout.showTargetValue" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="targetValueText" attr="style.layout.targetValueText" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="title" :level="2" title="style.title">
                <BaseAttr name="backgroundColor" attr="style.title.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="margin" attr="style.title.margin" type="text" defaultVal="0 auto" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
                    <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                </BaseDetails>
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
  &lt;VueUiSparkbar
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint({ datapoint, index }: { datapoint: VueUiSparkbarDatasetItem, index: number }) {
    console.log({ datapoint, index })
  }
&lt;/script&gt;
</code>
</pre>

            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.dataLabel[store.lang]  }}
                </div>
                <pre>
<code>
    &lt;VueUiSparkbar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #data-label="{ bar }"&gt;
            &lt;div style="width:100%"&gt;
                <span v-pre>{{ bar.name }}: {{ bar.labelValue }} / {{ bar.labelTarget }}</span>
            &lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiSparkbar&gt;
</code>
</pre>
                <div class="text-gray-500">
                    {{ translations.slots.title[store.lang]  }}
                </div>
                <pre>
<code>
    &lt;VueUiSparkbar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #title="{ title }"&gt;
            &lt;div&gt;<span v-pre>{{ title.title }}</span>&lt;/div&gt;
            &lt;div&gt;<span v-pre>{{ title.subtitle }}</span>&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiSparkbar&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.source[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiSparkbar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #source&gt;
            &lt;div&gt;Source: Lorem ipsum...&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiSparkbar&gt;
</code>
</pre>
            </template>

            <template #tab6>
                <ThemesVueUiSparkbar />
            </template>
        </Box>
    </div>
</template>