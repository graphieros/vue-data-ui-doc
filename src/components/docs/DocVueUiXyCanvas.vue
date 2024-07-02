<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon, ThumbUpIcon, ThumbDownIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";
import ucXy from "../useCases/uc-xy.vue";
import ThemesVueUiXy from "../themes/ThemesVueUiXy.vue";

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
        name: "Series 1",
        series: [-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: "rgb(95,139,238)",
        scaleSteps: 5,
        dataLabels: false
    },
    {
        name: "Series 2",
        series: [55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: "rgb(66,211,146)",
        useArea: true,
        dataLabels: false,
        scaleSteps: 5,
    },
    {
        name: "Series 3",
        series: [64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)",
        scaleSteps: 5,
    },
])

const config = ref({
    theme: "",
    customPalette: [],
    userOptions: {
        show: true
    },
    style: {
        fontFamily: "Arial",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            aspectRatio: "14 / 9",
            stacked: false,
            stackGapRatio: 0.8,
            scale: {
                ticks: 10
            },
            zoom: {
                show: true,
                color: "#CCCCCC",
                highlightColor: "#4A4A4A",
                fontSize: 14,
                useResetSlot: false
            },
            selector: {
                show: true,
                color: "#2D353C",
                dashed: true
            },
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#F3F4F6",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#e1e5e8",
                borderWidth: 1
            },
            legend: {
                backgroundColor: "#F3F4F6",
                color: "#2D353C",
                show: true,
                fontSize: 16,
                bold: false
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
            grid: {
                y: {
                    showAxis: true,
                    axisColor: "#2D353C",
                    axisThickness: 2,
                    axisName: "",
                    axisLabels: {
                        show: true,
                        fontSizeRatio: 1,
                        color: "#2D353C",
                        offsetX: 0,
                        rounding: 1,
                        prefix: "",
                        suffix: ""
                    },
                    verticalLines: {
                        show: true,
                        color: "#CCCCCC",
                        hideUnderXLength: 20
                    },
                    timeLabels: {
                        show: true,
                        fontSizeRatio: 0.8,
                        values: [],
                        rotation: 0,
                        offsetY: 30,
                        color: "#2D353C"
                    }
                },
                x: {
                    showAxis: true,
                    axisColor: "#2D353C",
                    axisThickness: 2,
                    axisName: "",
                    horizontalLines: {
                        show: true,
                        color: "#CCCCCC",
                        alternate: true,
                        opacity: 20
                    }
                },
                zeroLine: {
                    show: true,
                    color: "#2D353C",
                    dashed: true
                }
            },
            line: {
                plots: {
                    show: true,
                    radiusRatio: 1
                }
            },
            area: {
                opacity: 60
            },
            dataLabels: {
                show: true,
                fontSizeRatio: 1,
                useSerieColor: true,
                color: "#2D353C",
                offsetY: -12
            },
            paddingProportions: {
                top: 0.1,
                left: 0.1,
                right: 0.05,
                bottom: 0.1
            }
        }
    },
    table: {
        show: false,
        rounding: 1,
        responsiveBreakpoint: 400,
        columnNames: {
            period: "Period",
            total: "Total"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        }
    }
})

const darkModeConfig = ref({
    theme: "",
    customPalette: [],
    userOptions: {
        show: true
    },
    style: {
        fontFamily: "Satoshi",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            aspectRatio: "14 / 9",
            stacked: false,
            stackGapRatio: 0.8,
            scale: {
                ticks: 10
            },
            zoom: {
                show: true,
                color: "#6A6A6A",
                highlightColor: "#4A4A4A",
                fontSize: 14,
                useResetSlot: false,
            },
            selector: {
                show: true,
                color: "#e1e5e8",
                dashed: true
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: "#8A8A8A",
                borderWidth: 1
            },
            legend: {
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                show: true,
                fontSize: 16,
                bold: false
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
            grid: {
                y: {
                    showAxis: true,
                    axisColor: "#6A6A6A",
                    axisThickness: 2,
                    axisName: "Y Axis",
                    axisLabels: {
                        show: true,
                        fontSizeRatio: 1,
                        color: "#6A6A6A",
                        offsetX: 0,
                        rounding: 1,
                        prefix: "",
                        suffix: ""
                    },
                    verticalLines: {
                        show: true,
                        color: "#4A4A4A",
                        hideUnderXLength: 20
                    },
                    timeLabels: {
                        show: true,
                        fontSizeRatio: 0.8,
                        values: [],
                        rotation: 0,
                        offsetY: 30,
                        color: "#6A6A6A"
                    }
                },
                x: {
                    showAxis: true,
                    axisColor: "#4A4A4A",
                    axisThickness: 2,
                    axisName: "X Axis",
                    horizontalLines: {
                        show: true,
                        color: "#3A3A3A",
                        alternate: true,
                        opacity: 20
                    }
                },
                zeroLine: {
                    show: true,
                    color: "#6A6A6A",
                    dashed: true
                }
            },
            line: {
                plots: {
                    show: true,
                    radiusRatio: 1
                }
            },
            area: {
                opacity: 60
            },
            dataLabels: {
                show: true,
                fontSizeRatio: 1,
                useSerieColor: true,
                color: "#CCCCCC",
                offsetY: -12
            },
            paddingProportions: {
                top: 0.1,
                left: 0.1,
                right: 0.05,
                bottom: 0.1
            }
        }
    },
    table: {
        show: false,
        rounding: 1,
        responsiveBreakpoint: 400,
        columnNames: {
            period: "Period",
            total: "Total"
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
            <VueUiIcon name="chartLine" stroke="#42d392" :strokeWidth="1.5" />
            VueUiXyCanvas
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.xyCanvas[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-2/3'}`">
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
            <VueDataUi component="VueUiXyCanvas" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_xy_canvas)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-xy-canvas"/>
            <!-- <MakerLink to="VueUiXy"/> -->
        </div>

        <Box showEmits showSlots showUseCases showThemes>
            <template #tab0>
                Documentation will come soon :)
            </template>
            
            <template #tab1>
                Documentation will come soon :)
            </template>

            <!-- EMITS -->
            <template #tab2>
                Documentation will come soon :)

            </template>

            <!-- SLOTS -->
            <template #tab3>
                Documentation will come soon :)
            </template>

            <!-- USE CASES -->
            <template #tab5>
                Documentation will come soon :)
            </template>

            <!-- THEMES -->
            <template #tab6>
                Documentation will come soon :)
            </template>

        </Box>
    </div>
</template>