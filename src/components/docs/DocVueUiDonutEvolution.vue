<script setup>
import { ref, watch, nextTick, computed } from "vue";
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
        name: "Serie 1",
        values: [55, 34, 21, 13, 8, 5, 8, 13, 21, 34, 55 ]
    },
    {
        name: "Serie 2",
        values: [1, 12, 24, 32, 5, 8, 13, 21, 34, 55, 89 ]
    },
    {
        name: "Serie 3",
        values: [16, 2, 3, 5, 28, 13, 21, 34, 55, 89, 134 ]
    },
    {
        name: "Serie 3",
        values: [5, null, 5, 5, 5, 5 ]
    }
]);

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            layout: {
                height: 316,
                width: 500,
                padding: {
                    top: 24,
                    left: 48,
                    right: 48,
                    bottom: 24
                },
                grid: {
                show: true,
                stroke: "#e1e5e8",
                strokeWidth: 0.7,
                showVerticalLines: true,
                yAxis: {
                    dataLabels: {
                        show: true,
                        fontSize: 10,
                        color: "#2D353C",
                        roundingValue: 0,
                        offsetX: 0,
                        bold: false,
                        steps: 10
                    }
                },
                xAxis: {
                    dataLabels: {
                        show: true,
                        values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                        fontSize: 8,
                        showOnlyFirstAndLast: false
                    }
                }
                },
                line: {
                    show: true,
                    stroke: "#CCCCCC",
                    strokeWidth: 4
                },
                highlighter: {
                    color: "#2D353C",
                    opacity: 5
                },
                dataLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#2D353C",
                    bold: false,
                    rounding: 0,
                    prefix: "",
                    suffix: "",
                    offsetY: 0
                }
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

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                height: 316,
                width: 500,
                padding: {
                    top: 24,
                    left: 48,
                    right: 48,
                    bottom: 24
                },
                grid: {
                    show: true,
                    stroke: "#4A4A4A",
                    strokeWidth: 0.7,
                    showVerticalLines: true,
                    yAxis: {
                        dataLabels: {
                            show: true,
                            fontSize: 10,
                            color: "#CCCCCC",
                            roundingValue: 0,
                            offsetX: 0,
                            bold: false,
                            steps: 10
                        }
                    },
                    xAxis: {
                        dataLabels: {
                            show: true,
                            values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                            fontSize: 8,
                            showOnlyFirstAndLast: false,
                            color: "#CCCCCC"
                        }
                    }
                },
                line: {
                    show: true,
                    stroke: "#4A4A4A",
                    strokeWidth: 4
                },
                highlighter: {
                    color: "#FFFFFF",
                    opacity: 5
                },
                dataLabels: {
                    show: true,
                    fontSize: 10,
                    color: "#CCCCCC",
                    bold: false,
                    rounding: 0,
                    prefix: "",
                    suffix: "",
                    offsetY: 0
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
            outline: "1px solid #4A4A4A"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #4A4A4A",
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-2 text-2xl">VueUiDonutEvolution</h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.donutEvolution[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[700px]'}`">
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
            <VueUiDonutEvolution :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_donut_evolution)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
        </div>

        <Box showEmits>
            <template #tab0>
                We are working on the docs :)
            </template>

            <template #tab1>
                We are working on the docs :)
            </template>

            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
    <!-- <pre>
    <code>
    [
        {
            name: string;
            value: number;
            color: string;

        },
        {...}
    ]
    </code>
    </pre> -->
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const donutEvolutionChart = ref(null);
            const donutEvolutionDataset = ref([]);

            onMounted(() => {
                donutEvolutionDataset.value = donutEvolutionChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonutEvolution
                ref="donutEvolutionChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonutEvolution
                ref="donutEvolutionChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        donutEvolutionDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.donutEvolutionDataset = this.$refs.donutEvolutionChart.getData();
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
                    <div><code>generateXls</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateXls[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                </div>
            </template>
        </Box>
    </div>
</template>