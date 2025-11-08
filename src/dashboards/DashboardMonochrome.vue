<script setup>
import { ref, computed } from "vue";
import { darkenColor, getPalette, VueUiHorizontalBar } from "vue-data-ui";
import { useMainStore } from "../stores";
import BaseSpinner from "../components/BaseSpinner.vue";
import BaseCard from "../components/BaseCard.vue";
import { lightenColor } from "vue-data-ui";
import BaseColorInput from "../components/BaseColorInput.vue";
import { adaptColorToBackground } from "../components/maker/lib";
import { convertColorToHex } from "../components/maker/lib";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const emit = defineEmits('changeBaseColor')

function makeDs(n, m) {
    const arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push(Math.random() * m + i)
    }
    return arr;
}

function makeDates(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];

    // Ensure we move day by day until end date (inclusive)
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        dates.push(`${year}-${month}-${day}`);
    }
    return dates;
}

const baseColor = ref('#1f77b4');

const colors = computed(() => ({
    BG: baseColor.value,
    TEXT_PRIMARY: lightenColor(baseColor.value, 0.7),
    TEXT_SECONDARY: lightenColor(baseColor.value, 0.5),
}));

function makeSparkline() {
    const dates = makeDates('2027-01-01', '2027-01-31');
    const ds = makeDs(100, 31);
    return dates.map((period, i) => ({
        period,
        value: ds[i]
    }))
}

function makeSparkStackbar() {
    return [
        { name: 'Series A', value: Math.max(20, Math.random() * 100), color: lightenColor(baseColor.value, 0.9) },
        { name: 'Series B', value: Math.max(20, Math.random() * 100), color: lightenColor(baseColor.value, 0.6) },
        { name: 'Series C', value: Math.max(20, Math.random() * 100), color: lightenColor(baseColor.value, 0.4) },
    ]
}

function makeGauge() {
    return {
        value: Math.random() * 100,
        series: [
            { from: 0, to: 20, color: lightenColor(baseColor.value, 0.1 ) },
            { from: 20, to: 40, color: lightenColor(baseColor.value, 0.3 ) },
            { from: 40, to: 60, color: lightenColor(baseColor.value, 0.5 ) },
            { from: 60, to: 80, color: lightenColor(baseColor.value, 0.7 ) },
            { from: 80, to: 100, color: lightenColor(baseColor.value, 0.9 ) },
        ]
    }
}

function makeStackline() {
    return [
        {
            name: 'Series A',
            series: makeDs(31, 100),
            color: lightenColor(colors.value.BG, 0.8)
        },
        {
            name: 'Series B',
            series: makeDs(31, 100),
            color: lightenColor(colors.value.BG, 0.5)
        },
        {
            name: 'Series C',
            series: makeDs(31, 100),
            color: lightenColor(colors.value.BG, 0.2)
        },
    ]
}

function makeDonut() {
    return [
        {
            name: 'Series A',
            values: [100],
            color: lightenColor(colors.value.BG, 0.8)
        },
        {
            name: 'Series B',
            values: [60],
            color: lightenColor(colors.value.BG, 0.5)
        },
        {
            name: 'Series C',
            values: [30],
            color: lightenColor(colors.value.BG, 0.2)
        },
    ]
}

function makeHorizontalBar() {
    return [
        {
            name: 'Series A',
            value: 100,
            color: lightenColor(colors.value.BG, 0.9)
        },
        {
            name: 'Series B',
            value: 80,
            color: lightenColor(colors.value.BG, 0.8)
        },
        {
            name: 'Series C',
            value: 70,
            color: lightenColor(colors.value.BG, 0.7)
        },
        {
            name: 'Series D',
            value: 60,
            color: lightenColor(colors.value.BG, 0.6)
        },
        {
            name: 'Series E',
            value: 50,
            color: lightenColor(colors.value.BG, 0.5)
        },
        {
            name: 'Series F',
            value: 40,
            color: lightenColor(colors.value.BG, 0.4)
        },
        {
            name: 'Series G',
            value: 30,
            color: lightenColor(colors.value.BG, 0.3)
        },
        {
            name: 'Series H',
            value: 20,
            color: lightenColor(colors.value.BG, 0.2)
        },
    ]
}

const datasets = computed(() => ({
    SPARKLINE: makeSparkline(),
    SPARK_STACKBAR: makeSparkStackbar(),
    GAUGE: makeGauge(),
    STACKLINE: makeStackline(),
    DONUT: makeDonut(),
    HORIZONTAL_BAR: makeHorizontalBar()
}))

const configs = computed(() => ({
SPARKLINE: {
        style: {
            backgroundColor: colors.value.BG,
            area: { show: false },
            dataLabel: {
                color: colors.value.TEXT_SECONDARY,
                fontSize: 64
            },
            line: {
                color: colors.value.TEXT_PRIMARY,
                smooth: true
            },
            padding: {
                left: -80
            },
            title: { show: false },
            tooltip: {
                show: true,
                backgroundColor: lightenColor(colors.value.BG, 0.1),
                borderColor: lightenColor(colors.value.BG, 0.3),
                color: adaptColorToBackground(colors.value.BG),
                borderWidth: 1,
                backgroundOpacity: 0
            },
            verticalIndicator: {
                color: colors.value.TEXT_SECONDARY
            }
        }
    },
    SPARK_STACKBAR: {
        style: {
            backgroundColor: colors.value.BG,
            bar: {
                gradient: { show: false }
            },
            legend: {
                name: {
                    color: colors.value.TEXT_PRIMARY
                },
                percentage: {
                    color: colors.value.TEXT_PRIMARY,
                    bold: true
                },
                value: {
                    color: colors.value.TEXT_PRIMARY
                }
            },
            tooltip: {
                backgroundColor: lightenColor(colors.value.BG, 0.1),
                color: adaptColorToBackground(colors.value.BG),
                borderColor: lightenColor(colors.value.BG, 0.3)
            }
        }
    },
    GAUGE: {
        userOptions: { show: false },
        style: {
            chart: {
                backgroundColor: colors.value.BG,
                layout: {
                    markers: { color: colors.value.TEXT_PRIMARY },
                    pointer: {
                        stroke: colors.value.BG,
                        useRatingColor: false,
                        color: lightenColor(colors.value.BG, 0.5),
                        circle: {
                            stroke: colors.value.BG,
                            color: lightenColor(colors.value.BG, 0.3)
                        }
                    },
                    track: { useGradient: false },
                },
                legend: {
                    fontSize: 64,
                    useRatingColor: false,
                    color: colors.value.TEXT_SECONDARY
                }
            }
        }
    },
    STACKLINE: {
        style: {
            chart: {
                backgroundColor: colors.value.BG,
                color: colors.value.TEXT_PRIMARY,
                height: 500,
                width: 1500,
                grid: {
                    scale: {
                        scaleMax: 400 
                    },
                    x: {
                        axisColor: lightenColor(colors.value.BG, 0.3),
                        axisName: {
                            text: 'X AXIS',
                            color: colors.value.TEXT_PRIMARY
                        },
                        timeLabels: {
                            color: colors.value.TEXT_PRIMARY,
                            values: makeDates('2027-01-01', '2027-01-31'),
                        }
                    },
                    y: {
                        axisColor: lightenColor(colors.value.BG, 0.3),
                        axisName: {
                            text: 'Y AXIS',
                            color: colors.value.TEXT_PRIMARY
                        },
                        axisLabels: {
                            color: colors.value.TEXT_PRIMARY
                        }
                    }
                },
                highlighter: {
                    useLine: true,
                    color: colors.value.TEXT_PRIMARY
                },
                legend: {
                    backgroundColor: colors.value.BG,
                    position: 'top',
                    color: colors.value.TEXT_PRIMARY
                },
                lines: {
                    smooth: true,
                    areaOpacity: 0.8,
                    strokeWidth: 4,
                    totalValues: {
                        color: colors.value.TEXT_PRIMARY,
                        offsetY: 6,
                        bold: true
                    },
                },
                tooltip: {
                    backgroundColor: lightenColor(colors.value.BG, 0.1),
                    borderColor: lightenColor(colors.value.BG, 0.3),
                    color: adaptColorToBackground(colors.value.BG),
                    borderWidth: 1,
                    backgroundOpacity: 80
                },
                zoom: {
                    minimap: {
                        show: true,
                        indicatorColor: colors.value.TEXT_PRIMARY,
                        frameColor: lightenColor(colors.value.BG, 0.5),
                        selectedColor: lightenColor(colors.value.BG, 0.5),
                    },
                    preview: {
                        fill: convertColorToHex(lightenColor(colors.value.BG, 0.5)).slice(0, -2) + '50',
                        stroke: colors.value.TEXT_SECONDARY,
                        strokeDasharray: 4
                    }
                }
            }
        }
    },
    DONUT: {
        style: {
            chart: {
                backgroundColor: colors.value.BG,
                color: colors.value.TEXT_PRIMARY,
                useGradient: false,
                layout: {
                    donut: {
                        useShadow: true,
                        shadowColor: darkenColor(colors.value.BG, 0.5)
                    },
                    labels: {
                        hollow: {
                            average: {
                                color: colors.value.TEXT_SECONDARY,
                                value: {
                                    color: colors.value.TEXT_PRIMARY
                                }
                            },
                            total: {
                                color: colors.value.TEXT_SECONDARY,
                                offsetY: -6,
                                value: {
                                    color: colors.value.TEXT_PRIMARY,
                                    offsetY: -6
                                }
                            }
                        },
                        name: {
                            color: colors.value.TEXT_SECONDARY
                        },
                        percentage: {
                            color: colors.value.TEXT_PRIMARY
                        },
                    }
                },
                legend: {
                    // position: 'top',
                    backgroundColor: colors.value.BG,
                    color: colors.value.TEXT_PRIMARY
                },
                tooltip: {
                    backgroundColor: lightenColor(colors.value.BG, 0.1),
                    borderColor: lightenColor(colors.value.BG, 0.3),
                    color: adaptColorToBackground(colors.value.BG),
                    borderWidth: 1,
                    backgroundOpacity: 80
                },
            }
        }
    },
    HORIZONTAL_BAR: {
        style: {
            chart: {
                backgroundColor: colors.value.BG,
                color: colors.value.TEXT_PRIMARY,
                layout: {
                    bars: {
                        borderRadius: 2,
                        gap: 12,
                        useGradient: false,
                        dataLabels: {
                            color: colors.value.TEXT_PRIMARY,
                            offsetX: 6
                        },
                        nameLabels: {
                            color: colors.value.TEXT_PRIMARY,
                            offsetX: -6
                        }
                    },
                    highlighter: {
                        color: colors.value.TEXT_PRIMARY
                    }
                },
                legend: {
                    position: 'bottom',
                    backgroundColor: colors.value.BG,
                    color: colors.value.TEXT_PRIMARY
                },
                tooltip: {
                    backgroundColor: lightenColor(colors.value.BG, 0.1),
                    borderColor: lightenColor(colors.value.BG, 0.3),
                    color: adaptColorToBackground(colors.value.BG),
                    borderWidth: 1,
                    backgroundOpacity: 80
                },
            }
        }
    }
}));

function setBaseColor(c) {
    baseColor.value = c;
    changeBaseColor();
}

function changeBaseColor() {
    emit('changeBaseColor', baseColor.value)
}

</script>

<template>
    <BaseCard class="max-w-[1200px] mx-auto p-4 mt-12">
        <BaseCard class="w-fit mb-4" type="light">
            <div class="flex flex-row flex-wrap gap-4">
                <button class="hover:outline hover:outline-[#1A1A1A] dark:hover:outline-[#CCCCCC] transition-all h-[48px] w-[48px] rounded-md bg-[#1f77b4]" @click="setBaseColor('#1f77b4')"/>
                <button class="hover:outline hover:outline-[#1A1A1A] dark:hover:outline-[#CCCCCC] transition-all h-[48px] w-[48px] rounded-md bg-[#9467bd]" @click="setBaseColor('#9467bd')"/>
                <button class="hover:outline hover:outline-[#1A1A1A] dark:hover:outline-[#CCCCCC] transition-all h-[48px] w-[48px] rounded-md bg-[#393b79]" @click="setBaseColor('#393b79')"/>
                <button class="hover:outline hover:outline-[#1A1A1A] dark:hover:outline-[#CCCCCC] transition-all h-[48px] w-[48px] rounded-md bg-[#d62728]" @click="setBaseColor('#d62728')"/>
                <button class="hover:outline hover:outline-[#1A1A1A] dark:hover:outline-[#CCCCCC] transition-all h-[48px] w-[48px] rounded-md bg-[#ff7f0e]" @click="setBaseColor('#ff7f0e')"/>
                <button class="hover:outline hover:outline-[#1A1A1A] dark:hover:outline-[#CCCCCC] transition-all h-[48px] w-[48px] rounded-md bg-[#2ca02c]" @click="setBaseColor('#2ca02c')"/>
            </div>
        </BaseCard>
        <div class="grid grid-cols-1 sm:grid-cols-2 max-w-[1200px] mx-auto gap-6">
        
            <div class="col-span-1 sm:col-span-2 rounded-md grid grid-cols-1 sm:grid-cols-3 gap-4 sm:max-h-[300px]">
                <div class="w-full h-full rounded-md" :style="{ background: baseColor }">
                    <Suspense>
                    <template #default>
                        <div class="h-full flex flex-col place-items-center justify-center p-4">
                            <p class="text-left w-full p-3 font-inter-medium" :style="{ color: colors.TEXT_PRIMARY }">Title</p>
                            <div class="h-full w-full flex place-items-center">
                                <VueUiSparkline :dataset="datasets.SPARKLINE" :config="configs.SPARKLINE" />
                            </div>
                        </div>
                    </template>
                    <template #fallback><BaseSpinner /></template>
                    </Suspense>
                </div>
                <div class="w-full h-full rounded-md" :style="{ background: baseColor }">
                    <Suspense>
                    <template #default>
                        <div class="h-full flex flex-col place-items-center justify-between p-4">
                            <p class="text-left w-full p-3 font-inter-medium" :style="{ color: colors.TEXT_PRIMARY }">Title</p>
                            <div class="h-full w-full flex place-items-center">
                                <VueUiSparkStackbar :dataset="datasets.SPARK_STACKBAR" :config="configs.SPARK_STACKBAR" />
                            </div>
                        </div>
                    </template>
                    <template #fallback><BaseSpinner /></template>
                    </Suspense>
                </div>
                <div class="w-full h-full rounded-md" :style="{ background: baseColor }">
                    <Suspense>
                    <template #default>
                        <div class="h-full flex flex-col place-items-center justify-center p-4">
                            <p class="text-left w-full p-3 font-inter-medium" :style="{ color: colors.TEXT_PRIMARY }">Title</p>
                            <VueUiGauge :dataset="datasets.GAUGE" :config="configs.GAUGE" />
                        </div>
                    </template>
                    <template #fallback><BaseSpinner /></template>
                    </Suspense>
                </div>
            </div>

            <div class="w-full h-full rounded-md col-span-1 sm:col-span-2 mt-4" :style="{ background: baseColor }">
                <Suspense>
                <template #default>
                    <div class="h-full flex flex-col place-items-center justify-center p-4">
                        <p class="text-left w-full p-3 font-inter-medium" :style="{ color: colors.TEXT_PRIMARY }">Title</p>
                        <VueUiStackline :dataset="datasets.STACKLINE" :config="configs.STACKLINE" />
                    </div>
                </template>
                <template #fallback><BaseSpinner /></template>
                </Suspense>
            </div>

            <div class="w-full place-items-center h-full rounded-md mt-2" :style="{ background: baseColor }">
                <Suspense>
                <template #default>
                    <div class="h-full w-full flex flex-col place-items-center justify-center p-4">
                        <p class="text-left w-full p-3 font-inter-medium" :style="{ color: colors.TEXT_PRIMARY }">Title</p>
                        <VueUiDonut :dataset="datasets.DONUT" :config="configs.DONUT" />
                    </div>
                </template>
                <template #fallback><BaseSpinner /></template>
                </Suspense>
            </div>

            <div class="w-full place-items-center h-full rounded-md mt-2" :style="{ background: baseColor }">
                <Suspense>
                <template #default>
                    <div class="h-full w-full flex flex-col place-items-center justify-center p-4">
                        <p class="text-left w-full p-3 font-inter-medium" :style="{ color: colors.TEXT_PRIMARY }">Title</p>
                        <VueUiHorizontalBar :dataset="datasets.HORIZONTAL_BAR" :config="configs.HORIZONTAL_BAR" />
                    </div>
                </template>
                <template #fallback><BaseSpinner /></template>
                </Suspense>
            </div>
        </div>

        <div class="mt-6 hover:underline text-xl">
            <a href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/dashboards/DashboardMonochrome.vue" target="_blank">View source code</a>
        </div>
    </BaseCard>
</template>