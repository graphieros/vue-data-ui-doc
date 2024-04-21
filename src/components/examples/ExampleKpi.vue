<script setup>
import { computed, ref } from "vue";
import { useMainStore } from '../../stores';
import DocLink from "../DocLink.vue";
const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode)

const sparkstackDataset = ref([
    { name: 'Germany', value: 542000 },
    { name: 'France', value: 443250 },
    { name: 'Spain', value: 275405 },
])

const tableDataset = ref([
    {
        name: "Germany",
        values: [120, 124, 112, 115, 136, 145, 155, 160, 123, 135, 133, 141]
    },
    {
        name: "France",
        values: [112, 105, 119, 121, 101, 100, 125, 123, 116, 115, 132, 155]
    },
    {
        name: "Spain",
        values: [100, 107, 103, 108, 109, 113, 117, 100, 101, 103, 109, 117]
    },
])

const tableConfig = computed(() => {
    return {
        style: {
            backgroundColor: isDarkMode.value ? "#2A2A2A" :  "#FFFFFF",
            color: isDarkMode.value ? "#CCCCCC" :  "#1A1A1A",
            fontFamily: "inherit",
            heatmapColors: {
                useIndividualScale: true,
                min: isDarkMode.value ? "#2A2A2A" :  "#FFFFFF",
                max: "#42d392",
            },
        },
        table: {
            responsiveBreakpoint: 300,
            borderWidth: 1,
            showSum: true,
            showAverage: true,
            showMedian: true,
            head: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" :  "#FFFFFF",
                values: ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "TOTAL", "AVG", "MED"],
            },
        },
        userOptions: {
            show: true,
        },
    }
})

</script>

<template>
    <div class="max-w-[1200px] mx-auto flex gap-4 flex-wrap mt-12 justify-center">
        <VueDataUi
            component="VueUiKpi"
            :dataset="135.42"
            :config="{
                title: 'Average basket',
                layoutClass: 'p-4 rounded-md shadow-md bg-white dark:bg-[#FFFFFF10]',
                backgroundColor: 'null',
                titleColor: 'null',
                titleClass: 'text-gray-800 dark:text-gray-400',
                prefix: '$ ',
                valueColor: 'null',
                valueClass: 'text-app-blue dark:text-app-green',
                valueRounding: 2
            }"
        >
            <template #comment-before>
                <div class="max-w-[200px] text-xs my-2 text-gray-500">
                    2025 data collected from all shops located in eastern Europe.
                </div>
            </template>
            <template #comment-after>
                <div class="w-[200px]">
                    <VueDataUi
                        component="VueUiSparkline"
                        :dataset="[
                            { period: 'JAN', value: 138 },
                            { period: 'FEB', value: 124 },
                            { period: 'MAR', value: 112 },
                            { period: 'APR', value: 146 },
                            { period: 'MAY', value: 141 },
                            { period: 'JUN', value: 175 },
                            { period: 'JUL', value: 112 },
                            { period: 'AUG', value: 122 },
                            { period: 'SEP', value: 125 },
                            { period: 'OCT', value: 128 },
                            { period: 'NOV', value: 137 },
                            { period: 'DEC', value: 165 },
                        ]"
                        :config="{
                            style: {
                                backgroundColor: isDarkMode ? '#FFFFFF10' : '#FFFFFF',
                                area: {
                                    color: isDarkMode ? '#42d392' : '#5f8bee',
                                },
                                line: {
                                    color: isDarkMode ? '#42d392' : '#5f8bee',
                                    smooth: true
                                },
                                dataLabel: {
                                    valueType: 'average',
                                    prefix: '$ ',
                                    roundingValue: 2,
                                    fontSize: 36,
                                    color: '#8A8A8A'
                                },
                                plot: {
                                    radius: 8,
                                },
                                title: {
                                    color: isDarkMode ? '#8A8A8A' : '#3A3A3A'
                                },
                                verticalIndicator: {
                                    color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                                }
                            }
                        }"
                    />
                </div>
                <DocLink to="vue-ui-sparkline" size="py-1 px-2 text-xs mt-4" :iconSize="14" />
            </template>
        </VueDataUi>

        <VueDataUi
            component="VueUiKpi"
            :dataset="1260655"
            :config="{
                title: 'Expected revenue',
                layoutClass: 'p-4 rounded-md shadow-md bg-white dark:bg-[#FFFFFF10]',
                backgroundColor: 'null',
                titleColor: 'null',
                titleClass: 'text-gray-800 dark:text-gray-400',
                prefix: '$ ',
                valueColor: 'null',
                valueClass: 'text-app-blue dark:text-app-green',
            }"
        >
            <template #comment-before>
                <div class="max-w-[300px] text-xs my-2 text-gray-500">
                    2026 projections based on 2025 revenue collected from all shops located in eastern Europe.
                </div>
            </template>

            <template #comment-after>
                <div class="w-full max-w-[300px] mt-2">
                    <VueDataUi
                        component="VueUiSparkStackbar"
                        :dataset="sparkstackDataset"
                        :config="{
                            style: {
                                backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                                legend: {
                                    name: {
                                        color: isDarkMode ? '#8A8A8A' : '#3A3A3A',
                                    },
                                    percentage: {
                                        color: isDarkMode ? '#BABABA' : '#1A1A1A',
                                    },
                                    value: {
                                        color: isDarkMode ? '#8A8A8A' : '#3A3A3A',
                                        prefix: '$ '
                                    }
                                }
                            }
                        }"
                    />
                </div>
                <DocLink to="vue-ui-sparkstackbar" size="py-1 px-2 text-xs mt-4" :iconSize="14" />
            </template>
        </VueDataUi>

        <VueDataUi
            component="VueUiKpi"
            :dataset="1022"
            :config="{
                title: 'Average customers per day',
                layoutClass: 'p-4 rounded-md shadow-md bg-white dark:bg-[#FFFFFF10]',
                backgroundColor: 'null',
                titleColor: 'null',
                titleClass: 'text-gray-800 dark:text-gray-400',
                valueColor: 'null',
                valueClass: 'text-app-blue dark:text-app-green',
                valueRounding: 0
            }"
        >
            <template #comment-before>
                <div class="max-w-[300px] text-xs my-2 text-gray-500">
                    2025 results based on data collected from all shopw located in eastern Europe.
                </div>
            </template>

            <template #comment-after>
                <div class="w-full max-w-[300px]">
                    <VueDataUi
                        component="VueUiSparkHistogram"
                        :dataset="[
                            { value: 212, timeLabel: 'MORNING'},
                            { value: 420, timeLabel: 'NOON'},
                            { value: 390, timeLabel: 'EVENING'}
                        ]"
                        :config="{
                            style: {
                                backgroundColor: isDarkMode ? '#FFFFFF10' : '#FFFFFF',
                                layout: {
                                    height: 160
                                },
                                bars: {
                                    borderRadius: 2,
                                    gap: 1,
                                    colors: {
                                        positive: '#42d392'
                                    }
                                },
                                labels: {
                                    value: {
                                        fontSize: 24,
                                        color: isDarkMode ? '#8A8A8A' : '#3A3A3A',
                                    },
                                    timeLabel: {
                                        fontSize: 24,
                                        color: isDarkMode ? '#8A8A8A' : '#3A3A3A',
                                    }
                                },
                                selector: {
                                    stroke: 'transparent'
                                }
                            }
                        }"
                    />
                    <DocLink to="vue-ui-sparkhistogram" size="py-1 px-2 text-xs mt-4" :iconSize="14" />
                </div>
            </template>
        </VueDataUi>
    </div>

    <div class="max-w-[927px] mx-auto bg-white dark:bg-[#2A2A2A] mt-4 rounded p-2 shadow-md relative">
        <VueDataUi component="VueUiTableHeatmap" :dataset="tableDataset" :config="tableConfig">
            <template #caption>
                    <div style="width: 100%; height: 40px" class="pb-8 font-black text-[#3A3A3A] dark:text-gray-400 text-left pl-2">
                        Average basket 2024 in $
                    </div>
                </template>

                <template #head="{ value, rowIndex, type }">
                    <div class="text-xs">
                        {{ value }}
                    </div>
                </template>

                <template #rowTitle="{ value, rowIndex, colIndex, type, isResponsive }">
                    <div :style="`height: 40px; display: flex; align-items:center; justify-content: flex-start; padding: 0 6px;font-weight:${isResponsive ? 'bold' : 'normal'}`"
                        >
                        {{ value }}
                    </div>
                </template>
                <template #cell="{ value, rowIndex, colIndex, type, color, textColor }">
                    <div :style="`height: 40px; display: flex; align-items:center; justify-content: flex-end; padding: 0 6px;background:${color};color:${textColor}`"
                        class="relative">
                        {{ value }}
                    </div>
                </template>
                <template #sum="{ value }">
                    <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                        class="bg-gray-200 dark:bg-[#3A3A3A]">
                        {{ value }}
                    </div>
                </template>
                <template #average="{ value }">
                    <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                        class="bg-gray-200 dark:bg-[#3A3A3A]">
                        {{ value.toFixed(1) }}
                    </div>
                </template>
                <template #median="{ value }">
                    <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                        class="bg-gray-200 dark:bg-[#3A3A3A]">
                        {{ value.toFixed(1) }}
                    </div>
                </template>
        </VueDataUi>
        <DocLink to="vue-ui-table-heatmap" size="py-1 px-2 text-xs mt-4" :iconSize="14" />
    </div>
</template>