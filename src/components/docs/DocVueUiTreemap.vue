<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    }
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref(
    [
        {
            name: "Parent 1",
            value: 100,
            children: [
                {
                    name: "P1 C1",
                    value: 70,
                },
                {
                    name: 'P1 C2',
                    value: 20
                },
                {
                    name: 'P1 C3',
                    value: 10,
                },
            ]
        },
        {
            name: "Parent 2",
            value: 110,
            children: [
                {
                    name: "P2 C1",
                    value: 80,
                },
                {
                    name: 'P2 C2',
                    value: 20
                },
                {
                    name: 'P2 C3',
                    value: 10,
                },
            ]
        },
        {
            name: "Parent 3",
            value: 75,
            children: [
                {
                    name: "P3 C1",
                    value: 20,
                },
                {
                    name: 'P3 C2',
                    value: 10
                },
                {
                    name: 'P3 C3',
                    value: 10
                },
                {
                    name: 'P3 C4',
                    value: 5
                },
                {
                    name: 'P3 C5',
                    value: 5
                },
                {
                    name: 'P3 C6',
                    value: 10
                },
                {
                    name: 'P3 C7',
                    value: 5
                },
                {
                    name: 'P3 C8',
                    value: 10,
                    children: [
                        {
                            name: 'P3 C8 CC1',
                            value: 5,
                        },
                        {
                            name: 'P3 C8 CC2',
                            value: 5,
                        },
                    ]
                },
            ]
        },
    ]
)

const config = ref({
    userOptions: {
        show: true
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            height: 500,
            width: 800,
            padding: {
                top: 0,
                left: 6,
                bottom: 12,
                right: 6
            },
            layout: {
                sorted: true,
                rects: {
                    stroke: "#FFFFFF",
                    strokeWidth: 1,
                    borderRadius: 0,
                    colorRatio: 0.3,
                    gradient: {
                        show: true,
                        intensity: 30
                    },
                    selected: {
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        unselectedOpacity: 0.6
                    }
                },
                labels: {
                    showDefaultLabels: true,
                    fontSize: 24,
                    minFontSize: 10,
                    hideUnderProportion: 0.03,
                    prefix: "Value: ",
                    suffix: "",
                    rounding: 0
                }
            },
            legend: {
                backgroundColor: "#F3F4F6",
                color: "#2D353C",
                show: true,
                fontSize: 16,
                bold: false,
                roundingValue: 0,
                roundingPercentage: 0
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
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#FFFFFF",
                fontSize: 14,
                roundingValue: 1,
                customFormat: null
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value",
            percentage: "Percentage"
        },
        th: {
            backgroundColor: "#FAFAFA",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0
        }
    }
})

const darkModeConfig = ref({
    userOptions: {
        show: true
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            height: 500,
            width: 800,
            padding: {
                top: 0,
                left: 6,
                bottom: 12,
                right: 6
            },
            layout: {
                sorted: true,
                rects: {
                    stroke: "#1A1A1A",
                    strokeWidth: 1,
                    borderRadius: 0,
                    colorRatio: 0.3,
                    gradient: {
                        show: true,
                        intensity: 30
                    },
                    selected: {
                        stroke: "#1A1A1A",
                        strokeWidth: 1,
                        unselectedOpacity: 0.6
                    }
                },
                labels: {
                    showDefaultLabels: true,
                    fontSize: 24,
                    minFontSize: 10,
                    hideUnderProportion: 0.03,
                    prefix: "Value: ",
                    suffix: "",
                    rounding: 0
                }
            },
            legend: {
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                show: true,
                fontSize: 16,
                bold: false,
                roundingValue: 0,
                roundingPercentage: 0
            },
            title: {
                text: "Title",
                color: "#fafafa",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                roundingValue: 1,
                customFormat: null
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value",
            percentage: "Percentage"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0
        }
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(
    JSON.parse(JSON.stringify(darkModeConfig.value))
);

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(
        JSON.stringify(darkModeConfig.value)
    );
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
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
            <VueUiIcon name="chartTreemap" stroke="#42d392" :strokeWidth="1.5" />
            VueUiTreemap
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.treemap[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed
                    ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl'
                    : 'w-1/2'
                }`">
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
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">
                    {{ translations.docs.reset[store.lang] }}
                </button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <VueDataUi component="VueUiTreemap" :dataset="dataset"
                :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
        </div>

        <div
            class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row"
            >
            <button
                class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all"
                @click="copyToClipboard(mainConfig.vue_ui_treemap)"
            >
                <CopyIcon /> {{ translations.docs.copyDefaultConfig[store.lang] }}
            </button>
            <GitHubLink link="vue-ui-treemap" />
            <!-- <MakerLink to="VueUiGalaxy" /> -->
            </div>

            <Box showEmits showSlots showTooltip>
                <template #tab0>We are currently working on the docs :)</template>
                <template #tab1>We are currently working on the docs :)</template>
                <template #tab2>We are currently working on the docs :)</template>
                <template #tab3>We are currently working on the docs :)</template>
                <template #tab4>We are currently working on the docs :)</template>
            </Box>
    </div>

</template>