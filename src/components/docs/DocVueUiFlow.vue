<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon, ThumbUpIcon, ThumbDownIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ThemesVueUiFlow from "../themes/ThemesVueUiFlow.vue";

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
    ['A1', 'B1', 10],
    ['A1', 'B2', 10],
    ['B1', 'C1', 5],
    ['B1', 'C2', 5],
    ['B1', 'C3', 5],
    ['B1', 'C4', 5],
    ['A2', 'B1', 10],
    ['B2', 'C5', 10],
    ['C3', 'D1', 2],
    ['C4', 'D1', 2],
    ['C5', 'D1', 2],
    ['C2', 'D2', 2],
    ['C3', 'D2', 1],
]);

const config = ref({
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            padding: {
                top: 0,
                left: 24,
                right: 24,
                bottom: 0
            },
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
            },
            nodes: {
                gap: 10,
                minHeight: 20,
                width: 40,
                labels: {
                    fontSize: 14,
                    abbreviation: {
                        use: true,
                        length: 3
                    },
                    prefix: "",
                    suffix: "",
                    rounding: 0
                },
                stroke: "#FFFFFF",
                strokeWidth: 1
            },
            links: {
                width: 200,
                opacity: 0.8,
                stroke: "#FFFFFF",
                strokeWidth: 1
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            source: "Source",
            target: "Target",
            value: "Value"
        },
        th: {
            backgroundColor: "#FAFAFA",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            outline: "none"
        }
    }
});

const darkModeConfig = ref({
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            padding: {
                top: 0,
                left: 24,
                right: 24,
                bottom: 0
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
            nodes: {
                gap: 10,
                minHeight: 20,
                width: 40,
                labels: {
                    fontSize: 14,
                    abbreviation: {
                        use: true,
                        length: 3
                    },
                    prefix: "",
                    suffix: "",
                    rounding: 0
                },
                stroke: "#1A1A1A",
                strokeWidth: 1
            },
            links: {
                width: 200,
                opacity: 0.8,
                stroke: "#1A1A1A",
                strokeWidth: 1
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            source: "Source",
            target: "Target",
            value: "Value"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
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
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartFlow" stroke="#42d392" :strokeWidth="1.5" />
            VueUiFlow
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.flow[store.lang] }}
        </p>
        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
            <button @click="fixChart"
                class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed" />
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible" />
                    <div
                        class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault"
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <VueDataUi component="VueUiFlow" :dataset="dataset"
                :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button
                class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all"
                @click="copyToClipboard(mainConfig.vue_ui_flow)">
                <CopyIcon /> {{ translations.docs.copyDefaultConfig[store.lang]}}
            </button>
            <GitHubLink link="vue-ui-flow" />
            <MakerLink to="VueUiFlow"/>
        </div>

        <Box showSlots showThemes showEmits>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiFlowDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700 mt-4">
<pre>
<code>
    [
        [ string, string, number ],
        [...]
    ]
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiFlowDatasetItem[]</span> = [
    ['A1', 'B1', 10],
    ['A1', 'B2', 10],
    ['B1', 'C1', 5],
    ['B1', 'C2', 5],
    ['B1', 'C3', 5],
    ['B1', 'C4', 5],
    ['A2', 'B1', 10],
    ['B2', 'C5', 10],
    ['C3', 'D1', 2],
    ['C4', 'D1', 2],
    ['C5', 'D1', 2],
    ['C2', 'D2', 2],
    ['C3', 'D2', 1],
]
</code>
</pre>                    
                </div>
            </template>

            <!-- CONFIG -->
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiFlowConfig</code>
                </div>
<pre>
<code>
const <span class="text-app-blue">config: VueUiFlowConfig</span> = {
    theme: ""; ("zen" | "hack" | "concrete" | "")
    customPalette: []; // string[]
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        buttons: {
            pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)
            img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)
            csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)
            table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)
            fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            padding: {
                top: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.top"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.padding.top">, (default: 0)
                left: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.left"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.padding.left">, (default: 24)
                right: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.right"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.padding.right">, (default: 24)
                bottom: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.padding.bottom"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.padding.bottom">, (default: 0)
            },
            title: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            nodes: {
                gap: <input v-if="isDarkMode" type="number" min="0" max="40" v-model="mutableConfigDarkMode.style.chart.nodes.gap"><input v-else type="number" min="0" max="40" v-model="mutableConfig.style.chart.nodes.gap">, (default: 10)
                minHeight: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.nodes.minHeight"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.nodes.minHeight">, (default: 20)
                width: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.nodes.width"><input v-else type="number" min="0" max="100" v-model="mutableConfig.style.chart.nodes.width">, (default: 40)
                labels: {
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.nodes.labels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.nodes.labels.fontSize">, (default: 14)
                    abbreviation: {
                        use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.nodes.labels.abbreviation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.nodes.labels.abbreviation.use" @change="forceChartUpdate()">, (default: true)
                        length: <input v-if="isDarkMode" type="number" min="1" max="12" v-model="mutableConfigDarkMode.style.chart.nodes.labels.abbreviation.length"><input v-else type="number" min="1" max="12" v-model="mutableConfig.style.chart.nodes.labels.abbreviation.length">, (default: 3)
                    },
                    prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.nodes.labels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.nodes.labels.prefix">, (default: "")
                    suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.nodes.labels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.nodes.labels.suffix">, (default: "")
                    rounding: <input v-if="isDarkMode" type="number" min="0" max="6" v-model="mutableConfigDarkMode.style.chart.nodes.labels.rounding"><input v-else type="number" min="0" max="6" v-model="mutableConfig.style.chart.nodes.labels.rounding">, (default: 0)
                },
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.nodes.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.nodes.stroke">, (default: "#FFFFFF")
                strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.chart.nodes.strokeWidth"><input v-else type="number" min="0" max="12" v-model="mutableConfig.style.chart.nodes.strokeWidth">, (default: 1)
            },
            links: {
                width: <input v-if="isDarkMode" type="number" min="100" max="300" v-model="mutableConfigDarkMode.style.chart.links.width"><input v-else type="number" min="100" max="300" v-model="mutableConfig.style.chart.links.width">, (default: 200)
                opacity: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.chart.links.opacity"><input v-else type="number" min="0" max="1" step="0.01" v-model="mutableConfig.style.chart.links.opacity">, (default: 0.8)
                stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.links.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.links.stroke">, (default: "#FFFFFF")
                strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.chart.links.strokeWidth"><input v-else type="number" min="0" max="12" v-model="mutableConfig.style.chart.links.strokeWidth">, (default: 1)
            }
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
        columnNames: {
            source: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.source"><input v-else type="text" v-model="mutableConfig.table.columnNames.source">, (default: "Source"),
            target: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.target"><input v-else type="text" v-model="mutableConfig.table.columnNames.target">, (default: "Target")
            value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")
        },
        th: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")
        },
        td: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #E1E5E8")
        }
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

            const flowChart = ref(null);
            const flowDataset = ref([]);

            onMounted(() => {
                flowDataset.value = flowChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiFlow
                ref="flowChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiFlow
                ref="flowChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        flowDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.flowDataset = this.$refs.flowChart.getData();
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
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
                </div>
            </template>

            <!-- SLOTS -->
            <template #tab3>
                <div class="text-gray-500">
    {{ translations.slots.presentation[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiFlow
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiFlow&gt;
</code>
</pre>
            </template>

            <!-- THEMES -->
            <template #tab6>
                <ThemesVueUiFlow/>
            </template>
        </Box>
    </div>
</template>