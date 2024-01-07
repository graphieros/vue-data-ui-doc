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

const dataset = ref({
    "1": 96,
    "2": 64,
    "3": 128,
    "4": 256,
    "5": 384
})

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                grid: {
                    show: true,
                    stroke: "#5A5A5A",
                    strokeWidth: 0.5,
                },
                outerPolygon: {
                    stroke: "#5A5A5A",
                    strokeWidth: 1
                },
                dataPolygon: {
                    color: "#5f8bee",
                    opacity: 60,
                    gradient: {
                        show: true,
                        intensity: 5
                    },
                    stroke: "#5f8bee",
                    strokeWidth: 0
                },
                smileys: {
                    strokeWidth: 1,
                    colors: {
                        1: "#e20001",
                        2: "#ff9f03",
                        3: "#ffd004",
                        4: "#9ac900",
                        5: "#059f00"
                    }
                },
                dataLabel: {
                    color: "#CCCCCC",
                    roundingPercentage: 0,
                    roundingValue: 0,
                    bold: true
                }
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
                    bold: false
                }
            },
            legend: {
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                bold: false,
                show: true,
                fontSize: 16,
                roundingPercentage: 0,
                roundingValue: 0
            }
        }
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #5A5A5A"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #5A5A5A",
            roundingValue: 0,
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: true
    }
})

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            layout: {
                grid: {
                    show: true,
                    stroke: "#e1e5e8",
                    strokeWidth: 0.5,
                },
                outerPolygon: {
                    stroke: "#e1e5e8",
                    strokeWidth: 1
                },
                dataPolygon: {
                    color: "#5f8bee",
                    opacity: 60,
                    gradient: {
                        show: true,
                        intensity: 5
                    },
                    stroke: "#5f8bee",
                    strokeWidth: 0
                },
                smileys: {
                    strokeWidth: 1,
                    colors: {
                        1: "#e20001",
                        2: "#ff9f03",
                        3: "#ffd004",
                        4: "#9ac900",
                        5: "#059f00"
                    }
                },
                dataLabel: {
                    color: "#2D353C",
                    roundingPercentage: 0,
                    roundingValue: 0,
                    bold: true
                }
            },
            title: {
                text: "Title",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "",
                    fontSize: 16,
                    bold: false
                }
            },
            legend: {
                color: "#2D353C",
                backgroundColor: "#F3F4F6",
                bold: false,
                show: true,
                fontSize: 16,
                roundingPercentage: 0,
                roundingValue: 0
            }
        }
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#FAFAFA",
            color: "#2D353C",
            outline: "1px solid #e1e5e8"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            outline: "1px solid #e1e5e8",
            roundingValue: 0,
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: true
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

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartMoodRadar" stroke="#42d392" :strokeWidth="1.5" />
            VueUiMoodRadar
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.moodRadar[store.lang] }}
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
            <VueUiMoodRadar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_mood_radar)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-mood-radar"/>
        </div>

        <Box showEmits showSlots>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
    }
</code>
</pre>      {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
    const <span class="text-black dark:text-app-green">dataset</span> = {
        "1": 96,
        "2": 64,
        "3": 128,
        "4": 256,
        "5": 384
    }
</code>
</pre>                
                </div>
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
<pre>
<code>
const <span class="text-app-blue">config</span> = {
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                grid: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grid.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.show" @change="forceChartUpdate()">, (default: true)
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grid.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grid.stroke">, (default: "#e1e5e8")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.grid.strokeWidth"><input v-else type="number" min="0" max="6" step="0.1" v-model="mutableConfig.style.chart.layout.grid.strokeWidth">, (default: 0.5)
                },
                outerPolygon: {
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.outerPolygon.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.outerPolygon.stroke">, (default: "#e1e5e8")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.outerPolygon.strokeWidth"><input v-else type="number" min="0" max="6" step="0.1" v-model="mutableConfig.style.chart.layout.outerPolygon.strokeWidth">, (default: 1)
                },
                dataPolygon: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.dataPolygon.color">, (default: "#5f8bee")
                    opacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.opacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.dataPolygon.opacity">, (default: 60)
                    gradient: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.gradient.show" @change="forceChartUpdate()">, (default: true)
                        intensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.gradient.intensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.dataPolygon.gradient.intensity">, (default: 5)
                    },
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.dataPolygon.stroke">, (default: "#5f8bee")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.dataPolygon.strokeWidth"><input v-else type="number" min="0" max="6" step="0.1" v-model="mutableConfig.style.chart.layout.dataPolygon.strokeWidth">, (default: 0)
                },
                smileys: {
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.smileys.strokeWidth"><input v-else type="number" min="0" max="6" step="0.1" v-model="mutableConfig.style.chart.layout.smileys.strokeWidth">, (default: 1)
                    colors: {
                        "1": <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.smileys.colors['1']"><input v-else type="color" v-model="mutableConfig.style.chart.layout.smileys.colors['1']">, (default: "#e20001")
                        "2": <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.smileys.colors['2']"><input v-else type="color" v-model="mutableConfig.style.chart.layout.smileys.colors['2']">, (default: "#ff9f03")
                        "3": <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.smileys.colors['3']"><input v-else type="color" v-model="mutableConfig.style.chart.layout.smileys.colors['3']">, (default: "#ffd004")
                        "4": <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.smileys.colors['4']"><input v-else type="color" v-model="mutableConfig.style.chart.layout.smileys.colors['4']">, (default: "#9ac900")
                        "5": <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.smileys.colors['5']"><input v-else type="color" v-model="mutableConfig.style.chart.layout.smileys.colors['5']">, (default: "#059f00")
                    }
                },
                dataLabel: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.dataLabel.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.dataLabel.color">, (default: "#2D353C")
                    roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.dataLabel.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.dataLabel.roundingPercentage">, (default: 0)
                    roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.dataLabel.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.dataLabel.roundingValue">, (default: 0)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.dataLabel.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataLabel.bold" @change="forceChartUpdate()">, (default: true)
                }
            },
            title: {
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            legend: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
                show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
                roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage">, (default: 0)
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue">, (default: 0)
            }
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        th: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")
        },
        td: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #E1E5E8")
            roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
            roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
    }
}
</code>
</pre>                
            </template>

            <template #tab2>
            <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const moodRadarChart = ref(null);
            const moodRadarDataset = ref([]);

            onMounted(() => {
                moodRadarDataset.value = moodRadarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiMoodRadar
                ref="moodRadarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiMoodRadar
                ref="moodRadarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        moodRadarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.moodRadarDataset = this.$refs.moodRadarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateCsv</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateCsv[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                </div>
            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiMoodRadar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiMoodRadar&gt;
</code>
</pre>                    

            </template>
        </Box>
    </div>
</template>