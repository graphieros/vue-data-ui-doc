<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";

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

const config = ref({
    type: "stopwatch",
    responsive: false,
    style: {
        backgroundColor: "#F3F4F6",
        fontFamily: "inherit",
        height: 300,
        width: 300,
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
                bold: false
            }
        }
    },
    stopwatch: {
        showHours: false,
        showHundredth: true,
        cycleSeconds: 5,
        track: {
            radiusRatio: 1,
            stroke: "#e1e5e8",
            fill: "#F3F4F6",
            strokeWidth: 2
        },
        tracker: {
            radiusRatio: 1,
            stroke: "#F3F4F6",
            strokeWidth: 1,
            fill: "#5f8aee",
            gradient: {
                show: true,
                color: "#F3F4F6"
            },
            aura: {
                show: true,
                radiusRatio: 1,
                fill: "#5f8aee",
                stroke: "#F3F4F6",
                strokeWidth: 0
            }
        },
        cycleTrack: {
            show: true,
            stroke: "#5f8aee",
            strokeWidth: 4
        },
        label: {
            fontSize: 24,
            color: "#2D353C",
            bold: false
        },
        legend: {
            backgroundColor: "#F3F4F6",
            buttons: {
                start: true,
                pause: true,
                reset: true,
                restart: true,
                lap: true,
                iconColor: '#1A1A1A'
            },
            buttonTitles: {
                start: "Start",
                pause: "Pause",
                resume: "Resume",
                reset: "Reset",
                restart: "Restart",
                lap: "Lap"
            }
        }
    }
})

const darkModeConfig = ref({
    type: "stopwatch",
    responsive: false,
    style: {
        backgroundColor: "#1A1A1A",
        fontFamily: "inherit",
        height: 300,
        width: 300,
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
                bold: false
            }
        }
    },
    stopwatch: {
        showHours: false,
        showHundredth: true,
        cycleSeconds: 5,
        track: {
            radiusRatio: 1,
            stroke: "#5A5A5A",
            fill: "#1A1A1A",
            strokeWidth: 2
        },
        tracker: {
            radiusRatio: 1,
            stroke: "#1A1A1A",
            strokeWidth: 1,
            fill: "#42d392",
            gradient: {
                show: true,
                color: "#FFFFFF"
            },
            aura: {
                show: true,
                radiusRatio: 1,
                fill: "#42d392",
                stroke: "#1A1A1A",
                strokeWidth: 0
            }
        },
        cycleTrack: {
            show: true,
            stroke: "#42d392",
            strokeWidth: 4
        },
        label: {
            fontSize: 24,
            color: "#42d392",
            bold: false
        },
        legend: {
            backgroundColor: "#1A1A1A",
            buttons: {
                start: true,
                pause: true,
                reset: true,
                restart: true,
                lap: true,
                iconColor: '#42d392'
            },
            buttonTitles: {
                start: "Start",
                pause: "Pause",
                resume: "Resume",
                reset: "Reset",
                restart: "Restart",
                lap: "Lap"
            }
        }
    }
})

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

const timer = ref(null);

const timerLaps = ref([])

function updateLaps(laps) {
    timerLaps.value = laps
}

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div class="overflow-x-auto">
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="lap" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Timer</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.timer[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-timer"
            :configSource="mainConfig.vue_ui_timer"
        />

        <div :class="`transition-all mx-auto no-style ${isFixed ? 'fixed bottom-16 w-[300px] max-h-[500px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[400px] overflow-x-auto'}`">
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
                    <VueDataUi 
                        @lap="updateLaps" 
                        @reset="timerLaps = []"
                        @restart="timerLaps = []"
                        ref="timer" 
                        component="VueUiTimer" 
                        :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" 
                        :key="key"
                    />
                </template>
                <template #fallback>
                    <BaseSpinner />
                </template>
            </Suspense>
            <div class="flex flex-col py-6" v-if="timerLaps.length">
                Laps:
                <div v-for="lap in timerLaps">
                    {{  lap }}
                </div>
            </div>
        </div>

        <Box showEmits showSlots :activeTab="1">
            <template #tab0>{{ translations.docs.comments.noDataset[store.lang] }}</template>
            <template #tab1>
                <div class="w-full overflow-x-auto">
                    <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
                    <div class="mt-4">
                        TS type: <code class="text-app-blue">VueUiTimerConfig</code>
                    </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiTimerConfig" equal>
        <span>responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment> </span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="backgroundColor" attr="style.backgroundColor"  type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="height" attr="style.height" type="number" defaultVal="300" :min="100" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="width" attr="style.width" type="number" defaultVal="300" :min="100" :max="1000" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseDetails attr="title" :level="2" title="style.title">
                <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="paddingLeft" attr="style.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="paddingRight" attr="style.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
                    <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="stopwatch" :level="1">
            <BaseAttr name="showHours" attr="stopwatch.showHours" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="showHundredth" attr="stopwatch.showHundredth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="cycleSeconds" attr="stopwatch.cycleSeconds" type="number" defaultVal="5" :min="1" :max="60" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="track" :level="2" title="stopwatch.track">
                <BaseAttr name="radiusRatio" attr="stopwatch.track.radiusRatio" type="range" defaultVal="1" :min="0.4" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="stroke" attr="stopwatch.track.stroke" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeWidth" attr="stopwatch.track.strokeWidth" type="range" defaultVal="2" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fill" attr="stopwatch.track.fill" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="tracker" :level="2" title="stopwatch.tracker">
                <BaseAttr name="radiusRatio" attr="stopwatch.tracker.radiusRatio" type="range" defaultVal="1" :min="0.4" :max="2" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="stroke" attr="stopwatch.tracker.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeWidth" attr="stopwatch.tracker.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fill" attr="stopwatch.tracker.fill" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="gradient" :level="3" title="stopwatch.tracker.gradient">
                    <BaseAttr name="show" attr="stopwatch.tracker.gradient.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="stopwatch.tracker.gradient.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="aura" :level="3" title="stopwatch.tracker.aura">
                    <BaseAttr name="show" attr="stopwatch.tracker.aura.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="radiusRatio" attr="stopwatch.tracker.aura.radiusRatio" type="range" defaultVal="1" :min="0.4" :max="3" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fill" attr="stopwatch.tracker.aura.fill" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="stopwatch.tracker.aura.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="stopwatch.tracker.aura.strokeWidth" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="cycleTrack" :level="2" title="stopwatch.cycleTrack">
                <BaseAttr name="show" attr="stopwatch.cycleTrack.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="stroke" attr="stopwatch.cycleTrack.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="strokeWidth" attr="stopwatch.cycleTrack.strokeWidth" type="number" defaultVal="3" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="label" :level="2" title="stopwatch.label">
                <BaseAttr name="fontSize" attr="stopwatch.label.fontSize" type="number" defaultVal="24" :min="8" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="stopwatch.label.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="stopwatch.label.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="legend" :level="2" title="stopwatch.legend">
                <BaseAttr name="backgroundColor" attr="stopwatch.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="buttons" :level="3" title="stopwatch.legend.buttons">
                    <BaseAttr name="start" attr="stopwatch.legend.buttons.start" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="pause" attr="stopwatch.legend.buttons.pause" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="reset" attr="stopwatch.legend.buttons.reset" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="restart" attr="stopwatch.legend.buttons.restart" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="lap" attr="stopwatch.legend.buttons.lap" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="iconColor" attr="stopwatch.legend.buttons.iconColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="buttonTitles" :level="3" title="stopwatch.legend.buttonTitles">
                    <BaseAttr name="start" attr="stopwatch.legend.buttonTitles.start" type="text" defaultVal="Start" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="pause" attr="stopwatch.legend.buttonTitles.pause" type="text" defaultVal="Pause" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="resume" attr="stopwatch.legend.buttonTitles.resume" type="text" defaultVal="Resume" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="reset" attr="stopwatch.legend.buttonTitles.reset" type="text" defaultVal="Reset" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="restart" attr="stopwatch.legend.buttonTitles.restart" type="text" defaultVal="Restart" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="lap" attr="stopwatch.legend.buttonTitles.lap" type="text" defaultVal="Lap" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>

                </div> 
            </template>
            <!-- EMITS -->
            <template #tab2>
                Exposed methods:

                <ul>
                    <li>. start</li>
                    <li>. pause</li>
                    <li>. reset</li>
                    <li>. restart</li>
                    <li>. lap</li>
                </ul>

<pre>
<code>
&lt;template&gt;
    &lt;button @click="startTimer"&gt;START&lt;/button&gt;
    &lt;VueUiTimer ref="timer" :config="config" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
    const timer = ref(null);

    function startTimer() {
        if (!timer.value) return;
        timer.value.start();
    }

&lt;/script&gt;  
</code>
</pre>                
            </template>
            <!-- SLOTS -->
            <template #tab3>
                Available slots:

<div class="text-xl">#controls</div>               
<pre>
<code>
&lt;template&gt;
    &lt;VueUiTimer :config="config"&gt;
        &lt;template #controls="{ start, pause, reset, restart, lap, laps, isRunning, isPaused, timestamp, elapsed, formatted }"&lt;
            <span class="text-gray-500">&lt;!-- Make your own menu --&gt;</span>
        &lt;/template&lt;
    &lt;/VueUiTimer&gt;
&lt;/template&gt;
</code>
</pre>

<div class="text-xl border-t border-gray-500 pt-4">#laps</div>   
<pre>
<code>
&lt;template&gt;
    &lt;VueUiTimer :config="config"&gt;
        &lt;template #laps="{ laps, lap, isRunning, isPaused, timestamp, elapsed, formatted }"&lt;
            <span class="text-gray-500">&lt;!-- Show a stack of laps --&gt;</span>
        &lt;/template&lt;
    &lt;/VueUiTimer&gt;
&lt;/template&gt;
</code>
</pre>

<div class="text-xl border-t border-gray-500 pt-4">#time</div>   
<pre>
<code>
&lt;template&gt;
    &lt;VueUiTimer :config="config"&gt;
        &lt;template #time="{ timestamp, elapsed, formatted }"&lt;
            <span class="text-gray-500">&lt;!-- Format your own time label --&gt;</span>
        &lt;/template&lt;
    &lt;/VueUiTimer&gt;
&lt;/template&gt;
</code>
</pre>                
            </template>
        </Box>
    </div>
</template>