<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();

const YEARS = computed(() => {
    let year = 2000;
    const arr = []
    for (let i = 0; i < 25; i += 1) {
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
            73.2
        ],
        type: 'line',
    }
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
                        scaleMax: 100,
                    },
                    xAxisLabels: {
                        values: YEARS.value.map(y => String(y)),
                        rotation: -33,
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
                left: 80,
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
                showPercentage: false
            }
        },
        bar: {
            periodGap: 0.1,
            border: {
                useSerieColor: false,
                strokeWidth: 1,
            },
            labels: {
                show: true
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
                offsetY: -16
            }
        },
        table: {
            showSum: false
        }
    }
})

</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 max-w-[1200px] mx-auto gap-4 mt-12 p-4 bg-white dark:bg-[#3A3A3A]">
        <div class="w-full h-full bg-[#fff8e1]">
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
        </div>
    </div>
</template>