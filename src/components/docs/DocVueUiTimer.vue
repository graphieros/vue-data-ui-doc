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
            text: "",
            color: "#2D353C",
            fontSize: 20,
            bold: true,
            subtitle: {
                color: "#A1A1A1",
                text: "",
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
            text: "",
            color: "#2D353C",
            fontSize: 20,
            bold: true,
            subtitle: {
                color: "#A1A1A1",
                text: "",
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
                We are currently working on the docs :)
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