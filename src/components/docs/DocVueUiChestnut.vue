<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";

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
    name: "Root1",
    color: "#ff6400",
    branches: [
      {
        name: "branch 1.1",
        value: 200,
        breakdown: [
          {
            name: "break 1.1.1",
            value: 50,
            color: "#F17171"
          },
          {
            name: "break 1.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 1.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.2",
        value: 100,
        breakdown: [
          {
            name: "break 1.2.1",
            value: 10,
            color: "#F17171"
          },
          {
            name: "break 1.2.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 1.2.3",
            value: 70,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.3",
        value: 175,
        breakdown: [
          {
            name: "break 1.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 1.3.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 1.3.3",
            value: 75,
            color: "#42d392"
          },
        ]
      },

    ]
  },
  {
    name: "Root2",
    color: "#5f8bee",
    branches: [
      {
        name: "branch 2.1",
        value: 200,
        breakdown: [
          {
            name: "break 2.1.1",
            value: 150,
            color: "#F17171"
          },
          {
            name: "break 2.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 2.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 2.2",
        value: 300,
        breakdown: [
          {
            name: "break 2.2.1",
            value: 100,
            color: "#F17171"
          },
          {
            name: "break 2.2.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 2.2.3",
            value: 150,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 2.3",
        value: 125,
        breakdown: [
          {
            name: "break 2.3.1",
            value: 80,
            color: "#F17171"
          },
          {
            name: "break 2.3.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 2.3.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
    ]
  },
  {
    name: "Root3",
    color: "#42d392",
    branches: [
      {
        name: "branch 3.1",
        value: 120,
        breakdown: [
          {
            name: "break 3.1.1",
            value: 100,
            color: "#F17171"
          },
          {
            name: "break 3.1.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 3.1.3",
            value: 10,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 3.2",
        value: 90,
        breakdown: [
          {
            name: "break 3.2.1",
            value: 30,
            color: "#F17171"
          },
          {
            name: "break 3.2.2",
            value: 30,
            color: "#ffc800"
          },
          {
            name: "break 3.2.3",
            value: 40,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 3.3",
        value: 390,
        breakdown: [
          {
            name: "break 3.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 3.3.2",
            value: 200,
            color: "#ffc800"
          },
          {
            name: "break 3.3.3",
            value: 100,
            color: "#42d392"
          },
        ]
      }
    ]
  },
]);

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            layout: {
                grandTotal: {
                    show: true,
                    fontSize: 20,
                    bold: true,
                    suffix: "",
                    prefix: "",
                    roundingValue: 0,
                    color: "#1A1A1A",
                    text: "Grand total",
                    offsetY: 0,
                },
                roots: {
                    stroke: "#F3F4F6",
                    strokeWidth: 5,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    labels: {
                        show: true,
                        fontSize: 16,
                        adaptColorToBackground: true,
                        color: "#1A1A1A",
                        bold: true,
                        roundingValue: 0,
                        prefix: "",
                        suffix: "",
                        name: {
                            color: "#1A1A1A",
                            fontSize: 16,
                            bold: true,
                        }
                    }
                },
                verticalSeparator: {
                    stroke: "#F3F4F6",
                    strokeWidth: 5,
                },
                links: {
                    opacity: 20,
                },
                branches: {
                    stroke: "#F3F4F6",
                    strokeWidth: 0,
                    borderRadius: 6,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    widthRatio: 1.5,
                    labels: {
                        show: true,
                        fontSize: 14,
                        color: "#1A1A1A",
                        bold: true,
                        dataLabels: {
                            show: true,
                            hideUnderValue: 5,
                            fontSize: 14,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            prefix: "",
                            suffix: "",
                        }
                    }
                },
                nuts: {
                    offsetX: 20,
                    useGradient: true,
                    gradientIntensity: 30,
                    selected: {
                        useMotion: true,
                        useGradient: true,
                        gradientIntensity: 20,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        labels: {
                            dataLabels: {
                                hideUnderValue: 5,
                                color: "#1A1A1A",
                                fontSize: 12,
                                bold: false,
                                prefix: "",
                                suffix: ""
                            },
                            core: {
                                total: {
                                    color: "#1A1A1A",
                                    fontSize: 24,
                                    bold: false,
                                },
                                value: {
                                    color: "#1A1A1A",
                                    fontSize: 24,
                                    bold: true,
                                    prefix: "",
                                    suffix: ""
                                }
                            }
                        }
                    }
                },
                legend: {
                    fontSize: 16,
                    color: "#1A1A1A",
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: "",
                    suffix: ""
                },
                title: {
                    color: "#1A1A1A",
                    fontSize: 20,
                    text: "Title",
                    bold: true,
                    offsetY:0,
                    subtitle: {
                        text: "Subtitle",
                        color: "#565656",
                        bold: false,
                        fontSize: 16,
                        offsetY: 0,
                    }
                }
            }
        }
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
            translations: {
                rootName: "root name",
                rootValue: "root value",
                rootToTotal: "%/total",
                branchName: "branch name",
                branchValue: "branch value",
                branchToRoot: "%/root",
                branchToTotal: "%/total",
                nutName: "nut name",
                nutValue: "nut value",
                nutToBranch: "%/branch",
                nutToRoot: "%/root",
                nutToTotal: "%/total"
            }
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "1px solid #C4C4C4",
            roundingValue: 0,
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            showTable: "Show table"
        }
    },
    translations: {
        total: "Total",
        proportionToTree: "of grand total",
        of: "of"
    }
});
const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                grandTotal: {
                    show: true,
                    fontSize: 20,
                    bold: true,
                    suffix: "",
                    prefix: "",
                    roundingValue: 0,
                    color: "#CCCCCC",
                    text: "Grand total",
                    offsetY: 0,
                },
                roots: {
                    stroke: "#1A1A1A",
                    strokeWidth: 5,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    labels: {
                        show: true,
                        fontSize: 16,
                        adaptColorToBackground: true,
                        color: "#CCCCCC",
                        bold: true,
                        roundingValue: 0,
                        prefix: "",
                        suffix: "",
                        name: {
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        }
                    }
                },
                verticalSeparator: {
                    stroke: "#1A1A1A",
                    strokeWidth: 5,
                },
                links: {
                    opacity: 20,
                },
                branches: {
                    stroke: "#1A1A1A",
                    strokeWidth: 0,
                    borderRadius: 6,
                    useGradient: true,
                    gradientIntensity: 30,
                    underlayerColor: "#1A1A1A",
                    widthRatio: 1.5,
                    labels: {
                        show: true,
                        fontSize: 14,
                        color: "#CCCCCC",
                        bold: true,
                        dataLabels: {
                            show: true,
                            hideUnderValue: 5,
                            fontSize: 14,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            prefix: "",
                            suffix: "",
                        }
                    }
                },
                nuts: {
                    offsetX: 20,
                    useGradient: true,
                    gradientIntensity: 30,
                    selected: {
                        useMotion: true,
                        useGradient: true,
                        gradientIntensity: 40,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        labels: {
                            dataLabels: {
                                hideUnderValue: 5,
                                color: "#CCCCCC",
                                fontSize: 12,
                                bold: false,
                                prefix: "",
                                suffix: ""
                            },
                            core: {
                                total: {
                                    color: "#CCCCCC",
                                    fontSize: 24,
                                    bold: false,
                                },
                                value: {
                                    color: "#FAFAFA",
                                    fontSize: 24,
                                    bold: true,
                                    prefix: "",
                                    suffix: ""
                                }
                            }
                        }
                    }
                },
                legend: {
                    fontSize: 16,
                    color: "#CCCCCC",
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: "",
                    suffix: ""
                },
                title: {
                    color: "#FAFAFA",
                    fontSize: 20,
                    text: "Title",
                    bold: true,
                    offsetY:0,
                    subtitle: {
                        text: "Subtitle",
                        color: "#CCCCCC",
                        bold: false,
                        fontSize: 16,
                        offsetY: 0,
                    }
                }
            }
        }
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #e1e5e8",
            translations: {
                rootName: "root name",
                rootValue: "root value",
                rootToTotal: "%/total",
                branchName: "branch name",
                branchValue: "branch value",
                branchToRoot: "%/root",
                branchToTotal: "%/total",
                nutName: "nut name",
                nutValue: "nut value",
                nutToBranch: "%/branch",
                nutToRoot: "%/root",
                nutToTotal: "%/total"
            }
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #e1e5e8",
            roundingValue: 0,
            roundingPercentage: 0
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            showTable: "Show table"
        }
    },
    translations: {
        total: "Total",
        proportionToTree: "of grand total",
        of: "of"
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
            <VueUiIcon name="chartChestnut" stroke="#42d392" :strokeWidth="1.5" />
            VueUiChestnut
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.chestnut[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
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
            <VueUiChestnut :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green hover:shadow-xl transition-all" @click="copyToClipboard(mainConfig.vue_ui_chestnut)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
        </div>
        <Box showEmits showSlots>
            <template v-slot:tab0>
              {{ translations.docs.datastructure[store.lang] }}
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            color: string; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.color[store.lang] }}</span>
            branches: [
                {
                    name: string;
                    value: number;
                    breakdown: [
                        {
                            name: string;
                            value: string;
                            color: string; <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.xy.color[store.lang] }}</span>
                        },
                        {...}
                    ]
                },
                {...}
            ]
        }
    ]
</code>
</pre>                
                </div>

                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = [
    {
    name: "Root1",
    color: "#ff6400",
    branches: [
      {
        name: "branch 1.1",
        value: 200,
        breakdown: [
          {
            name: "break 1.1.1",
            value: 50,
            color: "#F17171"
          },
          {
            name: "break 1.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 1.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.2",
        value: 100,
        breakdown: [
          {
            name: "break 1.2.1",
            value: 10,
            color: "#F17171"
          },
          {
            name: "break 1.2.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 1.2.3",
            value: 70,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.3",
        value: 175,
        breakdown: [
          {
            name: "break 1.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 1.3.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 1.3.3",
            value: 75,
            color: "#42d392"
          },
        ]
      },
    ]
  },
  {...and so on}
]
</code>
</pre>                
                </div>
            </template>

            <template v-slot:tab1>
              <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
                <div class="overflow-w-auto">
<pre>
<code>
const <span class="text-black dark:text-app-blue">config</span> = {
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                grandTotal: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grandTotal.show" @change="forceChartUpdate()">, (default: true)
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.grandTotal.fontSize">, (default: 20)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grandTotal.bold" @change="forceChartUpdate()">, (default: true)
                    prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.grandTotal.prefix">, (default: "")
                    suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.grandTotal.suffix">, (default: "")
                    roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.grandTotal.roundingValue">, (default: 0)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.grandTotal.color">, (default: "#2D353C")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.grandTotal.text">, (default: "Grand total")
                    offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.grandTotal.offsetY"><input v-else type="number" v-model="mutableConfig.style.chart.layout.grandTotal.offsetY">, (default: 0)
                },
                roots: {
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.roots.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.roots.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="50" v-model="mutableConfigDarkMode.style.chart.layout.roots.strokeWidth"><input v-else type="number" min="0" max="50" v-model="mutableConfig.style.chart.layout.roots.strokeWidth">, (default: 5)
                    useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.roots.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.roots.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.roots.gradientIntensity">, (default: 20)
                    unerlayerColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.roots.underlayerColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.roots.underlayerColor">, (default: "#FFFFFF")
                    labels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.labels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.roots.labels.fontSize">, (default: 16)
                        adaptColorToBackground: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.adaptColorToBackground" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.labels.adaptColorToBackground" @change="forceChartUpdate()">, (default: true)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.roots.labels.color">, (default: "#FFFFFF")
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.labels.bold" @change="forceChartUpdate()">, (default: true)
                        roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.roots.labels.roundingValue">, (default: 0)
                        prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.roots.labels.prefix">, (default: "")
                        suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.roots.labels.suffix">, (default: "")
                        name: {
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.name.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.roots.labels.name.color">, (default: "#2D353C")
                            fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.name.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.roots.labels.name.fontSize">, (default: 16)
                            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.roots.labels.name.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.labels.name.bold" @change="forceChartUpdate()">, (default: true)
                        }
                    }
                },
                verticalSeparator: {
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.verticalSeparator.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.verticalSeparator.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" v-model="mutableConfigDarkMode.style.chart.layout.verticalSeparator.strokeWidth"><input v-else type="number" min="0" max="20" v-model="mutableConfig.style.chart.layout.verticalSeparator.strokeWidth">, (default: 5)
                },
                links: {
                    opacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.links.opacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.links.opacity">, (default: 10)
                },
                branches: {
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.branches.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.branches.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input  v-if="isDarkMode" type="number" min="0" max="20" v-model="mutableConfigDarkMode.style.chart.layout.branches.strokeWidth"><input v-else type="number" min="0" max="20" v-model="mutableConfig.style.chart.layout.branches.strokeWidth">, (default: 0)
                    borderRadius: <input v-if="isDarkMode" type="number" min="0" max="16" v-model="mutableConfigDarkMode.style.chart.layout.branches.strokeWidth"><input v-else type="number" min="0" max="16" v-model="mutableConfig.style.chart.layout.branches.strokeWidth">, (default: 6)
                    useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.branches.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.branches.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.branches.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.branches.gradientIntensity">, (default: 20)
                    underlayerColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.branches.underlayerColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.branches.underlayerColor">, (default: "#FFFFFF")
                    widthRatio: <input v-if="isDarkMode" type="number" min="0" max="1.8" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.branches.widthRatio"><input v-else type="number" min="0" max="1.8" step="0.1" v-model="mutableConfig.style.chart.layout.branches.widthRatio">, (default: 1.5)
                    labels: {
                        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.branches.labels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.branches.labels.fontSize">, (default: 14)
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.branches.labels.color">, (default: "#2D353C")
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.branches.labels.bold" @change="forceChartUpdate()">, (default: true)
                        dataLabels: {
                            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.dataLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.show" @change="forceChartUpdate()">, (default: true)
                            hideUnderValue: <input v-if="isDarkMode" type="number" min="0" max="20" step="1" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.dataLabels.hideUnderValue"><input v-else type="number" min="0" max="20" step="1" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.hideUnderValue">, (default: 5)
                            fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.dataLabels.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.fontSize">, (default: 14)
                            roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.dataLabels.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.roundingValue">, (default: 0)
                            roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.dataLabels.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.roundingPercentage">, (default: 0)
                            prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.prefix">, (default: "")
                            suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.branches.labels.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.suffix">, (default: "")
                        }
                    }
                },
                nuts: {
                    offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.nuts.offsetX"><input v-else type="number" v-model="mutableConfig.style.chart.layout.nuts.offsetX">, (default: 20)
                    useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.nuts.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.nuts.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.nuts.gradientIntensity">, (default: 30)
                    selected: {
                        useMotion: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.useMotion" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.useMotion" @change="forceChartUpdate()">, (default: true)
                        useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.useGradient" @change="forceChartUpdate()">, (default: true)
                        gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.nuts.selected.gradientIntensity">, (default: 40)
                        roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.nuts.selected.roundingValue">, (default: 0)
                        roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.nuts.selected.roundingPercentage">, (default: 0)
                        labels: {
                            dataLabels: {
                                hideUnderValue: <input v-if="isDarkMode" type="number" min="0" max="20" step="1" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.dataLabels.hideUnderValue"><input v-else type="number" min="0" max="20" step="1" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.hideUnderValue">, (default: 5)
                                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.color">, (default: "#2D353C")
                                fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.dataLabels.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.fontSize">, (default: 12)
                                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.bold" @change="forceChartUpdate()">, (default: true)
                                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.dataLabels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.prefix">, (default: "")
                                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.dataLabels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.suffix">, (default: "")
                            },
                            core: {
                                total: {
                                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.core.total.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.total.color">, (default: "#2D353C")
                                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.core.total.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.total.fontSize">, (default: 24)
                                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.core.total.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.total.bold" @change="forceChartUpdate()">, (default: true)
                                },
                                value: {
                                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.core.value.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.color">, (default: "#2D353C")
                                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.core.value.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.fontSize">, (default: 24)
                                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.core.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.bold" @change="forceChartUpdate()">, (default: true)
                                    prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.core.value.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.prefix">, (default: "")
                                    suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.nuts.selected.labels.core.value.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.suffix">, (default: "")
                                }
                            }
                        }
                    }
                },
                legend: {
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.legend.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.legend.fontSize">, (default: 16)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.legend.color">, (default: "#2D353C")
                    roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.legend.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.legend.roundingValue">, (default: 0)
                    roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.chart.layout.legend.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.legend.roundingPercentage">, (default: 0)
                    prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.legend.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.legend.prefix">, (default: "")
                    suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.legend.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.legend.suffix">, (default: "")
                },
                title: {
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.title.text">, (default: "")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.title.color">, (default: "#2D353C")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.title.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.title.fontSize">, (default: 20)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.title.bold" @change="forceChartUpdate()">, (default: true)
                    offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.title.offsetY"><input v-else type="number" v-model="mutableConfig.style.chart.layout.title.offsetY">, (default: 0)
                    subtitle: {
                        text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.layout.title.subtitle.text">, (default: "")
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.title.subtitle.color">, (default: "#CCCCCC")
                        fontSize: <input v-if="isDarkMode" type="number" min="6" max="50" v-model="mutableConfigDarkMode.style.chart.layout.title.subtitle.fontSize"><input v-else type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.title.subtitle.fontSize">, (default: 16)
                        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                        offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.title.subtitle.offsetY"><input v-else type="number" v-model="mutableConfig.style.chart.layout.title.subtitle.offsetY">, (default: 0)
                    }
                }
            }
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        th: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
            translations: {
                rootName: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.rootName"><input v-else type="text" v-model="mutableConfig.table.th.translations.rootName">, (default: "root name")
                rootValue: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.rootValue"><input v-else type="text" v-model="mutableConfig.table.th.translations.rootValue">, (default: "root value")
                rootToTotal: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.rootToTotal"><input v-else type="text" v-model="mutableConfig.table.th.translations.rootToTotal">, (default: "%/total")
                branchName: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.branchName"><input v-else type="text" v-model="mutableConfig.table.th.translations.branchName">, (default: "branch name")
                branchValue: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.branchValue"><input v-else type="text" v-model="mutableConfig.table.th.translations.branchValue">, (default: "branch value")
                branchToRoot: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.branchToRoot"><input v-else type="text" v-model="mutableConfig.table.th.translations.branchToRoot">, (default: "%/root")
                branchToTotal: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.branchToTotal"><input v-else type="text" v-model="mutableConfig.table.th.translations.branchToTotal">, (default: "%/total")
                nutName: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.nutName"><input v-else type="text" v-model="mutableConfig.table.th.translations.nutName">, (default: "nut name")
                nutValue: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.nutValue"><input v-else type="text" v-model="mutableConfig.table.th.translations.nutValue">, (default: "nut value")
                nutToBranch: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.nutToBranch"><input v-else type="text" v-model="mutableConfig.table.th.translations.nutToBranch">, (default: "%/branch")
                nutToRoot: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.nutToRoot"><input v-else type="text" v-model="mutableConfig.table.th.translations.nutToRoot">, (default: "%/root")
                nutToTotal: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.translations.nutToTotal"><input v-else type="text" v-model="mutableConfig.table.th.translations.nutToTotal">, (default: "%/total")
            }
        },
        td: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
            roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
            roundingPercentage: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingPercentage"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.title"><input v-else type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            showTable: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.showTable"><input v-else type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
        }
    },
    translations: {
        total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.total"><input v-else type="text" v-model="mutableConfig.translations.total">, (default: "Total")
        proportionToTree: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.proportionToTree"><input v-else type="text" v-model="mutableConfig.translations.proportionToTree">, (default: "of grand total"),
        of: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.of"><input v-else type="text" v-model="mutableConfig.translations.of">, (default: "of")
    }
}
</code>
</pre>                
                </div>
            </template>

            <template v-slot:tab2>
              <div><code>@selectRoot</code></div>
              <div class="text-gray-400 pl-5">{{ translations.docs.emits.chestnut.selectRoot[store.lang] }}</div>
<pre>
<code>
{
  branches: [
    {
      breakdown: [
        {
          branchName: string;
          branchTotal: number;
          color: string;
          id: string;
          name: string;
          proportionToBranch: number;
          proportionToRoot: number;
          proportionToTree: number;
          rootIndex: number;
          rootName: string;
          table: {
            branchName: string;
            branchToRoot: number;
            branchToTotal: number;
            branchValue: number;
            nutName: string;
            nutToBranch: number;
            nutToRoot: number;
            nutToTotal: number;
            rootName: string;
            rootToTotal: number;
            rootValue: number;
          },
          type: "nut";
          value: number;
        },
        {...}
      ],
      color: string;
      id: string;
      name: string;
      proportionToTotal: number;
      rootIndex: number;
      rootName: string;
      type: "branch";
      value: number;
    },
    {...}
  ],
  color: string;
  id: string;
  name: string;
  r: number;
  rootIndex: number;
  total: number;
  type: "root",
  x: number;
  y: number;
}
</code>
</pre>
              <div><code>@selectBranch</code></div>
              <div class="text-gray-400 pl-5">{{ translations.docs.emits.chestnut.selectBranch[store.lang] }}</div>
<pre>
<code>
{
  breakdown: [
    {
      branchName: string;
      branchTotal: number;
      color: string;
      id: string;
      name: string;
      proportionToBranch: number;
      proportionToRoot: number;
      proportionToTree: number;
      rootIndex: number;
      rootName: string;
      table: {
        branchName: string;
        branchToRoot: number;
        branchToTotal: number;
        branchValue: number;
        nutName: string;
        nutToBranch: number;
        nutToRoot: number;
        nutToTotal: number;
        rootName: string;
        rootToTotal: number;
        rootValue: number;
      },
      type: "nut";
      value: number;
    },
    {...}
  ],
  color: string;
  id: string;
  name: string;
  proportionToTotal: number;
  rootIndex: number;
  rootName: string;
  type: "branch";
  value: number;
}
</code>
</pre>
              <div><code>@selectNut</code></div>
              <div class="text-gray-400 pl-5">{{  translations.docs.emits.chestnut.selectNut[store.lang] }}</div>
<pre>
<code>
[
  {
      branchName: string;
      branchTotal: number;
      color: string;
      id: string;
      name: string;
      proportionToBranch: number;
      proportionToRoot: number;
      proportionToTree: number;
      rootIndex: number;
      rootName: string;
      table: {
        branchName: string;
        branchToRoot: number;
        branchToTotal: number;
        branchValue: number;
        nutName: string;
        nutToBranch: number;
        nutToRoot: number;
        nutToTotal: number;
        rootName: string;
        rootToTotal: number;
        rootValue: number;
      },
      type: "nut";
      value: number;
    },
    {...}
]
</code>
</pre>

<div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const chestnutChart = ref(null);
            const chestnutDataset = ref([]);

            onMounted(() => {
                chestnutDataset.value = chestnutChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiChestnut
                ref="chestnutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiChestnut
                ref="chestnutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        chestnutDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.chestnutDataset = this.$refs.chestnutChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateXls</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateXls[store.lang] }}</div>
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
    &lt;VueUiChestnut
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiChestnut&gt;
</code>
</pre>                    

            </template>
        </Box>
    </div>
</template>