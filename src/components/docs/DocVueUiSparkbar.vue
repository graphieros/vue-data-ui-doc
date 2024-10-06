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
            backgroundColor: '#1A1A1A',
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
            <VueUiIcon name="chartSparkbar" stroke="#42d392" :strokeWidth="1.5" />
            VueUiSparkbar
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.sparkbar[store.lang] }}
        </p>
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
        </div>

        <BaseDocActions
            targetLink="vue-ui-sparkbar"
            targetMaker="VueUiSparkbar"
            :configSource="mainConfig.vue_ui_sparkbar"
        />

        <Box showSlots showEmits showThemes schema="vue_ui_sparkbar">
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
            prefix?: string; <span class="text-gray-500">// {{ translations.docs.comments.onion.prefix[store.lang] }}</span>
            suffix?: string; <span class="text-gray-500">// {{ translations.docs.comments.onion.suffix[store.lang] }}</span>
            rounding?: number;
            target?: number; <span class="text-gray-500">// {{ translations.docs.comments.sparkbar.target[store.lang] }}</span>
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
        suffix: "%"
    },
    {
        name: "popularity",
        value: 2.0412,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "maintenance",
        value: 33.3291,
        rounding: 2,
        suffix: "%"
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
        <span>customPalette: [], // string[]</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")</span>
            <span>gap: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.gap" :min="0" :max="64"/><BaseNumberInput v-else v-model:value="mutableConfig.style.gap" :min="0" :max="64"/>, (default: 4)</span>
            <BaseDetails attr="animation" :level="2" title="style.animation">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animation.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>animationFrames: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.animation.animationFrames" :min="0" :max="200"/><BaseNumberInput v-else v-model:value="mutableConfig.style.animation.animationFrames" :min="0" :max="200"/>, (default: 60)</span>
            </BaseDetails>
            <BaseDetails attr="bar" :level="2" title="style.bar">
                <BaseDetails attr="gradient" :level="3" title="style.bar.gradient">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.bar.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.bar.gradient.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>intensity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.bar.gradient.intensity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.bar.gradient.intensity">, (default: 40)</span>
                    <span>underlayerColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.bar.gradient.underlayerColor"><input v-else type="color" v-model="mutableConfig.style.bar.gradient.underlayerColor">, (default: "#FFFFFF")</span>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="gutter" :level="2" title="style.gutter">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.gutter.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.gutter.backgroundColor">, (default: "#e1e5e8")</span>
                <span>opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.gutter.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.gutter.opacity">, (default: 100) <span class="text-app-blue">// since v.1.9.17</span></span>
            </BaseDetails>
            <BaseDetails attr="labels" :level="2" title="style.labels">
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.labels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.labels.fontSize" :min="8" :max="42"/>, (default: 16)</span>
                <BaseDetails attr="name" :level="3" title="style.labels.name">
                    <span>position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.labels.name.position"><option>left</option><option>top-left</option><option>top-center</option><option>top-right</option><option>right</option></select><select v-else v-model="mutableConfig.style.labels.name.position"><option>left</option><option>top-left</option><option>top-center</option><option>top-right</option><option>right</option></select>, (default: "top-left")</span>
                    <span>width: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.labels.name.width"><input v-else type="text" v-model="mutableConfig.style.labels.name.width">, (default: "100%")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.labels.name.color"><input v-else type="color" v-model="mutableConfig.style.labels.name.color">, (default: "#2D353C")</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.name.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.name.bold" @change="forceChartUpdate()">, (default: false)</span>
                </BaseDetails>
                <BaseDetails attr="value" :level="3" title="style.labels.value">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.value.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.value.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.value.bold" @change="forceChartUpdate()">, (default: true)</span>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="layout" :level="2" title="style.layout">
                <span>independant: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.independant" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.independant" @change="forceChartUpdate()">, (default: true)</span>
                <span>percentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.percentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.percentage" @change="forceChartUpdate()">, (default: true)</span>
                <span>target: 0, <span class="text-app-blue text-xs">// Common to all bars. Use target in dataset for individual targets.</span></span>
                <span>showTargetValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.showTargetValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.showTargetValue" @change="forceChartUpdate()">, (default: false)</span>
                <span>targetValueText: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.targetValueText"><input v-else type="text" v-model="mutableConfig.style.layout.targetValueText">, (default: "")</span>
            </BaseDetails>
            <BaseDetails attr="title" :level="2" title="style.title">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.title.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")</span>
                <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")</span>
                <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
                <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.title.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "left")</span>
                <span>margin: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.margin"><input v-else type="text" v-model="mutableConfig.style.title.margin">, (default: "0 auto")</span>
                <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#CCCCCC")</span>
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: true)</span>
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
            </template>

            <template #tab6>
                <ThemesVueUiSparkbar />
            </template>
        </Box>
    </div>
</template>