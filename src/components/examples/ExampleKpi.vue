<script setup>
import { computed, ref } from "vue";
import { useMainStore } from '../../stores';
const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode)

const sparkstackDataset = ref([
    { name: 'Germany', value: 542000 },
    { name: 'France', value: 443250 },
    { name: 'Spain', value: 275405 },
])

</script>

<template>
    <div class="max-w-[1200px] mx-auto flex gap-4 flex-wrap my-12 justify-center">
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
                </div>
            </template>
        </VueDataUi>
    </div>
</template>