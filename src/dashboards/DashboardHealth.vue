<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import BaseSpinner from "../components/BaseSpinner.vue";

const store = useMainStore();

const YEARS = computed(() => {
    let year = 2000;
    const arr = []
    for (let i = 0; i < 26; i += 1) {
        arr.push(year);
        year += 1;
    }
    return arr;
})

const DATASET_LIFE_EXPECTANCY = ref([
    {
        name: 'World life expectancy',
        series: [
            66.4,
            66.8,
            67.1,
            67.4,
            67.7,
            68.1,
            68.6,
            69,
            69.3,
            69.7,
            70.1,
            70.4,
            70.8,
            71.1,
            71.4,
            71.6,
            71.9,
            72.1,
            72.4,
            72.6,
            71.9,
            70.9,
            72.6,
            73.2,
            73.33,
            73.49
        ],
        type: 'line',
    },
]);

const CONFIG_XY = computed(() => {
    return {
        chart: {
            grid: {
                frame: {
                    show: true,
                    stroke: '#8A9F8A'
                },
                labels: {
                    yAxis: {
                        scaleMax: 80,
                        scaleMin: 60
                    },
                    xAxisLabels: {
                        values: YEARS.value.map(y => String(y)),
                        yOffset: 12
                    }
                },
            },
            labels: {
                fontSize: 18,
            },
            legend: {
                show: false,
            },
            padding: {
                left: 12,
                top: 12,
                right: 12,
                bottom: 12
            },
            title: {
                text: 'World average Life expectancy',
                textAlign: 'left',
                paddingLeft: 14,
                subtitle: {
                    text: `${YEARS.value[0]} - ${YEARS.value.at(-1)}`,
                }
            },
            tooltip: {
                showPercentage: false,
                backgroundOpacity: 30
            },
            zoom: {
                minimap: {
                    show: true,
                    selectedColor: '#4A6A75'
                }
            }
        },
        line: {
            radius: 6,
            useGradient: false,
            dot: {
                useSerieColor: false,
                fill: '#FFFFFF',
                strokeWidth: 3
            },
            labels: {
                show: true,
                offsetY: -16,
                rounding: 1
            }
        },
        table: {
            showSum: false
        }
    }
})

const DATASET_DEATHS_BY_AGE = ref([
    { name: '100+ years', value: 0.243, color: '#4A6A75' },
    { name: '95-99 years', value: 1.31, color: '#4A6A75' },
    { name: '90-94 years', value: 3.64, color: '#4A6A75' },
    { name: '85-89 years', value: 5.96, color: '#4A6A75' },
    { name: '80-84 years', value: 6.81, color: '#4A6A75' },
    { name: '75-79 years', value: 6.58, color: '#4A6A75' },
    { name: '75-79 years', value: 6.58, color: '#4A6A75' },
    { name: '70-74 years', value: 6.59, color: '#4A6A75' },
    { name: '65-69 years', value: 5.75, color: '#4A6A75' },
    { name: '60-64 years', value: 4.48, color: '#4A6A75' },
    { name: '55-59 years', value: 3.59, color: '#4A6A75' },
    { name: '50-54 years', value: 2.63, color: '#4A6A75' },
    { name: '45-49 years', value: 1.86, color: '#4A6A75' },
    { name: '40-44 years', value: 1.5, color: '#4A6A75' },
    { name: '35-39 years', value: 1.22, color: '#4A6A75' },
    { name: '30-34 years', value: 1.04, color: '#4A6A75' },
    { name: '25-29 years', value: 0.927, color: '#4A6A75' },
    { name: '20-24 years', value: 0.864, color: '#4A6A75' },
    { name: '15-19 years', value: 0.673, color: '#4A6A75' },
    { name: '10-14 years', value: 0.454, color: '#4A6A75' },
    { name: '5-9 years', value: 0.7, color: '#4A6A75' },
    { name: '0-4 years', value: 4.83, color: '#4A6A75' },
])

const CONFIG_VERTICAL_BAR = computed(() => {
    return {
        style: {
            chart: {
                width: 1000,
                height: 650,
                layout: {
                    bars: {
                        sort: 'none',
                        paddingRight: 64,
                        nameLabels: {
                            fontSize: 18,
                        },
                        dataLabels: {
                            fontSize: 18,
                            value: {
                                roundingValue: 2,
                                suffix: ' million',
                            }
                        }
                    },
                    separators: {
                        show: false,
                    }
                },
                legend: {
                    show: false
                },
                title: {
                    text: 'Number of deaths by age',
                    textAlign: 'left',
                    paddingLeft: 14,
                    subtitle: {
                        text: 'World, 2023',
                    }
                },
                tooltip: {
                    roundingValue: 2,
                    suffix: ' million',
                    backgroundOpacity: 0
                }
            }
        }
    }
})

</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 max-w-[1200px] mx-auto gap-4 mt-12 p-4 bg-white dark:bg-[#3A3A3A] min-h-[520px]">
        <div class="w-full h-full bg-[#f6f6fb]">
            <Suspense>
                <template #default>
                    <VueDataUi
                        component="VueUiXy"
                        :dataset="DATASET_LIFE_EXPECTANCY"
                        :config="{
                            ...CONFIG_XY,
                            theme: 'concrete'
                        }"
                    >
                        <template #chart-background v-if="!store.isSafari">
                            <div class="w-full h-full bg-gradient-to-t from-[#FFFFFF40] to-transparent">
                                <img src="../assets/tree.png" class="object-cover w-full h-full opacity-20">
                            </div>
                        </template>
                        <template #source>
                            <div class="text-xs px-4 text-left text-[#8A8A8A]">
                                Source: UN WPP (2024); HMD (2024); Zijdeman et al. (2015); Riley (2005)
                            </div>
                        </template>
                    </VueDataUi>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <div class="w-full h-full bg-[#f6f6fb]">
            <Suspense>
                <template #default>
                    <VueDataUi
                        component="VueUiVerticalBar"
                        :dataset="DATASET_DEATHS_BY_AGE"
                        :config="{
                            ...CONFIG_VERTICAL_BAR,
                            theme: 'concrete'
                        }"
                    >
                        <template #chart-background v-if="!store.isSafari">
                            <div class="w-full h-full bg-gradient-to-t from-[#FFFFFF40] to-transparent">
                                <img src="../assets/tree.png" class="object-cover w-full h-full opacity-20">
                            </div>
                        </template>
                        <template #source>
                            <div class="text-xs px-4 text-left text-[#8A8A8A]">
                                Source: UN, World Population Prospects (2024)
                            </div>
                        </template>
                    </VueDataUi>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>
    </div>
</template>