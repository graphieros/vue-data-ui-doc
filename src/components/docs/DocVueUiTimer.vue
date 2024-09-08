<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";


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

</script>

<template>
    <div class="overflow-x-auto">
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="lap" stroke="#42d392" :strokeWidth="1.5" />
            VueUiTimer
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.timer[store.lang] }}
        </p>
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
            <VueDataUi 
                @lap="updateLaps" 
                @reset="timerLaps = []"
                @restart="timerLaps = []"
                ref="timer" 
                component="VueUiTimer" 
                :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" 
                :key="key"
            />
            <div class="flex flex-col py-6" v-if="timerLaps.length">
                Laps:
                <div v-for="lap in timerLaps">
                    {{  lap }}
                </div>
            </div>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_timer)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-timer"/>
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
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiTimerConfig</span> =  {
    type: "stopwatch",
    responsive: false; <span class="text-app-orange break-keep text-xs">// {{ translations.responsive[store.lang] }}</span>
    style: {
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
        fontFamily: "inherit",
        height: 300,
        width: 300,
        title: {
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.title.fontSize">, (default: 20)
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
            subtitle: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
            }
        },
    },
    stopwatch: {
        showHours: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.showHours" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.showHours" @change="forceChartUpdate()">, (default: false)
        showHundredth: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.showHundredth" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.showHundredth" @change="forceChartUpdate()">, (default: true)
        cycleSeconds: <input v-if="isDarkMode" type="number" min="1" max="60" v-model="mutableConfigDarkMode.stopwatch.cycleSeconds"><input v-else type="number" min="1" max="60" v-model="mutableConfig.stopwatch.cycleSeconds">, (default: 5)
        track: {
            radiusRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.4" max="1" v-model="mutableConfigDarkMode.stopwatch.track.radiusRatio" step="0.01"><input v-else type="range" class="accent-app-blue" min="0.4" max="1" v-model="mutableConfig.stopwatch.track.radiusRatio" step="0.01">, (default: 1)
            stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.track.stroke"><input v-else type="color" v-model="mutableConfig.stopwatch.track.stroke">, (default: "#e1e5e8")
            fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.track.fill"><input v-else type="color" v-model="mutableConfig.stopwatch.track.fill">, (default: "#FFFFFF")
            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.stopwatch.track.strokeWidth"><input v-else type="number" min="0" max="24" v-model="mutableConfig.stopwatch.track.strokeWidth">, (default: 2)
        },
        tracker: {
            radiusRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.4" max="2" v-model="mutableConfigDarkMode.stopwatch.tracker.radiusRatio" step="0.01" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="0.4" max="2" v-model="mutableConfig.stopwatch.tracker.radiusRatio" step="0.01" @change="forceChartUpdate()">, (default: 1)
            stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.tracker.stroke"><input v-else type="color" v-model="mutableConfig.stopwatch.tracker.stroke">, (default: "#FFFFFF")
            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.stopwatch.tracker.strokeWidth"><input v-else type="number" min="0" max="24" v-model="mutableConfig.stopwatch.tracker.strokeWidth">, (default: 1)
            fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.tracker.fill"><input v-else type="color" v-model="mutableConfig.stopwatch.tracker.fill">, (default: "#2D353C")
            gradient: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.tracker.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.tracker.gradient.show" @change="forceChartUpdate()">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.tracker.gradient.color"><input v-else type="color" v-model="mutableConfig.stopwatch.tracker.gradient.color">, (default: "#FFFFFF")
            },
            aura: {
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.tracker.aura.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.tracker.aura.show" @change="forceChartUpdate()">, (default: true)
                radiusRatio: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0.4" max="2" v-model="mutableConfigDarkMode.stopwatch.tracker.aura.radiusRatio" step="0.01" @change="forceChartUpdate()"><input v-else type="range" class="accent-app-blue" min="0.4" max="2" v-model="mutableConfig.stopwatch.tracker.aura.radiusRatio" step="0.01" @change="forceChartUpdate()">, (default: 1)
                fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.tracker.aura.fill"><input v-else type="color" v-model="mutableConfig.stopwatch.tracker.aura.fill">, (default: "#2D353C")
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.tracker.aura.stroke"><input v-else type="color" v-model="mutableConfig.stopwatch.tracker.aura.stroke">, (default: "#FFFFFF")
                strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.stopwatch.tracker.aura.strokeWidth"><input v-else type="number" min="0" max="24" v-model="mutableConfig.stopwatch.tracker.aura.strokeWidth">, (default: 0)
            }
        },
        cycleTrack: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.cycleTrack.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.cycleTrack.show" @change="forceChartUpdate()">, (default: true)
            stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.cycleTrack.stroke"><input v-else type="color" v-model="mutableConfig.stopwatch.cycleTrack.stroke">, (default: "#2D353C")
            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.stopwatch.cycleTrack.strokeWidth"><input v-else type="number" min="0" max="24" v-model="mutableConfig.stopwatch.cycleTrack.strokeWidth">, (default: 3)
        },
        label: {
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.stopwatch.label.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.stopwatch.label.fontSize">, (default: 24)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.label.color"><input v-else type="color" v-model="mutableConfig.stopwatch.label.color">, (default: "#2D353C")
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.label.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.label.bold" @change="forceChartUpdate()">, (default: false)
        },
        legend: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.stopwatch.legend.backgroundColor">, (default: "#FFFFFF")
            buttons: {
                start: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.legend.buttons.start" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.legend.buttons.start" @change="forceChartUpdate()">, (default: true)
                pause: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.legend.buttons.pause" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.legend.buttons.pause" @change="forceChartUpdate()">, (default: true)
                reset: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.legend.buttons.reset" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.legend.buttons.reset" @change="forceChartUpdate()">, (default: true)
                restart: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.legend.buttons.restart" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.legend.buttons.restart" @change="forceChartUpdate()">, (default: true)
                lap: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.stopwatch.legend.buttons.lap" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.stopwatch.legend.buttons.lap" @change="forceChartUpdate()">, (default: true)
                iconColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.stopwatch.legend.buttons.iconColor"><input v-else type="color" v-model="mutableConfig.stopwatch.legend.buttons.iconColor">, (default: "#2D353C")
            },
            buttonTitles: {
                start: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.stopwatch.legend.buttonTitles.start"><input v-else type="text" v-model="mutableConfig.stopwatch.legend.buttonTitles.start">, (default: "Start")
                pause: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.stopwatch.legend.buttonTitles.pause"><input v-else type="text" v-model="mutableConfig.stopwatch.legend.buttonTitles.pause">, (default: "Pause")
                resume: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.stopwatch.legend.buttonTitles.resume"><input v-else type="text" v-model="mutableConfig.stopwatch.legend.buttonTitles.resume">, (default: "Resume")
                reset: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.stopwatch.legend.buttonTitles.reset"><input v-else type="text" v-model="mutableConfig.stopwatch.legend.buttonTitles.reset">, (default: "Reset")
                restart: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.stopwatch.legend.buttonTitles.restart"><input v-else type="text" v-model="mutableConfig.stopwatch.legend.buttonTitles.restart">, (default: "Restart")
                lap: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.stopwatch.legend.buttonTitles.lap"><input v-else type="text" v-model="mutableConfig.stopwatch.legend.buttonTitles.lap">, (default: "Lap")
            }
        }
    }
}
</code>
</pre>                    
                </div> 
            </template>
            <!-- EMITS -->
            <template #tab2>
                We are currently working on the docs :)
            </template>
            <!-- SLOTS -->
            <template #tab3>
                We are currently working on the docs :)
            </template>
        </Box>
    </div>
</template>