<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../../stores";
import GaugeNPS from "./components/GaugeNPS.vue"
import StackRespondents from "./components/StackRespondents.vue";
import MiniBar from "./components/MiniBar.vue";
import SparkRevenue from "./components/SparkRevenue.vue";
import BoutiqueVisitors from "./components/BoutiqueVisitors.vue";
import DocLink from "../DocLink.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const gauge1 = ref(7.8);
const gauge2 = ref(5.3);

const gauge3 = ref(6.9);
const gauge4 = ref(8.4);
const gauge5 = ref(9);

const to1 = ref(null)

const val1 = ref(24)
const val2 = ref(-3)
const val3 = ref(-5)
const val4 = ref(12)
const val5 = ref(22)

const val6 = ref(-7)
const val7 = ref(1)
const val8 = ref(12)

const resp1 = ref([256, 128, 64, 32])
const resp2 = ref([212, 180, 165, 87])
const resp3 = ref([455, 47, 78, 49])

const line1 = ref([320, 289, 275, 212, 288, 312, 180, 169, 256, 413, 420, 512])
const line2 = ref([280, 125, 300, 166, 300, 100, 80, 66, 320, 550, 660, 900])
const line3 = ref([800, 650, 120, 98, 78, 125, 147, 212, 127, 315, 712, 840])

const bar1 = ref([1150, 880, 912])
const bar2 = ref([1230, 900, 760])
const bar3 = ref([808, 760, 1240])

const hist1 = ref([3, 12, 48, 120, 140, 125, 15, 19, 98, 250, 212, 87])
const hist2 = ref([56, 120, 250, 90, 66, 87, 15, 19, 98, 250, 320, 19])
const hist3 = ref([9, 12, 27, 32, 300, 400, 100, 8, 9, 27, 120, 100])

const raf1 = ref(null)

function animGauge1() {
    to1.value = setTimeout(() => {

        hist1.value = [
            Math.random()*10,
            Math.random()*20,
            Math.random()*50,
            Math.random()*150,
            Math.random()*200,
            Math.random()*180,
            Math.random()*50,
            Math.random()*50,
            Math.random()*80,
            Math.random()*85,
            Math.random()*100,
            Math.random()*200
        ]
        hist2.value = [
            Math.random()*10,
            Math.random()*20,
            Math.random()*50,
            Math.random()*150,
            Math.random()*200,
            Math.random()*180,
            Math.random()*50,
            Math.random()*50,
            Math.random()*80,
            Math.random()*85,
            Math.random()*100,
            Math.random()*200
        ]
        hist3.value = [
            Math.random()*10,
            Math.random()*20,
            Math.random()*50,
            Math.random()*150,
            Math.random()*200,
            Math.random()*180,
            Math.random()*50,
            Math.random()*50,
            Math.random()*80,
            Math.random()*85,
            Math.random()*100,
            Math.random()*200
        ]

        gauge1.value = Math.random() * 10
        gauge2.value = Math.random() * 10
        gauge3.value = Math.random() * 10
        gauge4.value = Math.random() * 10
        gauge5.value = Math.random() * 10

        val1.value = Math.round(Math.random() * 100) - 30
        val2.value = Math.round(Math.random() * 100) - 30
        val3.value = Math.round(Math.random() * 100) - 30
        val4.value = Math.round(Math.random() * 100) - 30
        val5.value = Math.round(Math.random() * 100) - 30
        val6.value = Math.round(Math.random() * 100) - 30
        val7.value = Math.round(Math.random() * 100) - 30
        val8.value = Math.round(Math.random() * 100) - 30

        resp1.value = [
            Math.random() * 200,
            Math.random() * 150,
            Math.random() * 100,
            Math.random() * 80
        ]
        resp2.value = [
            Math.random() * 200,
            Math.random() * 150,
            Math.random() * 100,
            Math.random() * 80
        ]
        resp3.value = [
            Math.random() * 200,
            Math.random() * 150,
            Math.random() * 100,
            Math.random() * 80
        ]

        line1.value.shift()
        line1.value.push(Math.random()*500)
        line2.value.shift()
        line2.value.push(Math.random()*600)
        line3.value.shift()
        line3.value.push(Math.random()*800)

        bar1.value = [
            Math.random() * 1300,
            Math.random() * 900,
            Math.random() * 950
        ]
        bar2.value = [
            Math.random() * 1300,
            Math.random() * 900,
            Math.random() * 950
        ]
        bar3.value = [
            Math.random() * 1300,
            Math.random() * 900,
            Math.random() * 950
        ]

        animGauge1()
    }, 2000)
}

onMounted(() => {
    raf1.value = requestAnimationFrame(animGauge1)
})

onBeforeUnmount(() => {
    cancelAnimationFrame(raf1.value);
    clearTimeout(to1.value);
})

const carouselDataset = ref({
    head: ['Country', 'Total', 'Average', 'Visitors', 'Satisfaction'],
    body: [
        ['France', 3900, 350, 3715, '65%'],
        ['China', 12440, 312, 24552, '73%'],
        ['USA', 11450, 319, 22350, '71%'],
        ['Brazil', 7210, 215, 13411, '77%'],
        ['Spain', 2318, 290, 2950, '68%'],
        ['Portugal', 1313, 195, 1912, '74%'],
        ['Germany', 4522, 415, 5200, '69%'],
        ['Canada', 8201, 319, 7600, '89%'],
        ['India', 14500, 159, 27200, '58%'],
        ['Australia', 9420, 255, 10258, '72%'],
    ]
})

const carouselConfig = computed(() => {
    return {
        style: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        },
        animation: {
            type: 'marquee'
        },
        caption: {
            text: 'Current stats',
            style: {
                fontSize: '32px',
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            }
        },
        thead: {
            tr: {
                style: {
                    backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
                }
            }
        },
        tbody: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            tr: {
                style: {
                    backgroundColor: isDarkMode.value ? '#3A3A3A' : '#E1E5E8',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
                },
                td: {
                    style: {
                        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    }
                }
            },
        }
    }
})

const trendConfig = computed(() => {
    return {
        style: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        }
    }
})

</script>

<template>
    <div class="mt-12 flex flex-col gap-6">
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkgauge"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkgauge"
                    />
                </div>

                <div class="flex flex-row gap-4 justify-between place-items-center">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl">
                            Net Promoter Score<span class="text-gray-500 dark:text-gray-500"> Boutique</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span :class="`${val1 > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`">{{ val1 > 0 ? '+' : ''}}{{val1}}%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: gauge1,
                        min: 0,
                        max: 10,
                    }" />
                </div>
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkgauge"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkgauge"
                    />
                </div>

                <div class="flex flex-row gap-4 justify-between place-items-center">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl">
                            Net Promoter Score<span class="text-gray-500 dark:text-gray-500"> Office</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span :class="`${val2 > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`">{{ val2 > 0 ? '+' : ''}}{{val2}}%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: gauge2,
                        min: 0,
                        max: 10,
                    }" />
                </div>
            </div>
        </div>

        <div class="sm:flex flex-row flex-wrap sm:flex-nowrap gap-6">

                <div class="w-full bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                    <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                        <BaseDocHeaderActions
                            targetDoc="vue-ui-carousel-table"
                            :defaultConfig="false"
                            targetMaker="VueUiCarouselTable"
                        />
                    </div>

                    <div class="w-full">
                        <VueUiCarouselTable :dataset="carouselDataset" :config="carouselConfig"/>
                    </div>
                </div>

        </div>

        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md min-h-[400px]">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkstackbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkStackbar"
                    />
                </div>

                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Respondents<span class="text-gray-500 dark:text-gray-500"> France</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span :class="`${val3 > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`">{{ val3 > 0 ? '+' : ''}}{{val3}}%</span>
                        </div>
                    </div>
                        <StackRespondents :detail="resp1"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md min-h-[400px]">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkstackbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkStackbar"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Respondents<span class="text-gray-500 dark:text-gray-500"> Germany</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span :class="`${val4 > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`">{{ val4 > 0 ? '+' : ''}}{{val4}}%</span>
                        </div>
                    </div>
                        <StackRespondents :detail="resp2"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md min-h-[400px]">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkstackbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkStackbar"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Respondents<span class="text-gray-500 dark:text-gray-500"> Brazil</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span :class="`${val5 > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`">{{ val5 > 0 ? '+' : ''}}{{val5}}%</span>
                        </div>
                    </div>
                        <StackRespondents :detail="resp3"/>
                </div>
            </div>
        </div>

        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkgauge"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkgauge"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl">
                            NPS<span class="text-gray-500 dark:text-gray-500"> France</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span :class="`${val6 > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`">{{ val6 > 0 ? '+' : ''}}{{val6}}%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: gauge3,
                        min: 0,
                        max: 10,
                    }" />
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkgauge"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkgauge"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl">
                            NPS<span class="text-gray-500 dark:text-gray-500"> Germany</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span :class="`${val7 > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`">{{ val7 > 0 ? '+' : ''}}{{val7}}%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: gauge4,
                        min: 0,
                        max: 10,
                    }" />
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkgauge"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkgauge"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl">
                            NPS<span class="text-gray-500 dark:text-gray-500"> Brazil</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span :class="`${val8 > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`">{{ val8 > 0 ? '+' : ''}}{{val8}}%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: gauge5,
                        min: 0,
                        max: 10,
                    }" />
                </div>
            </div>
        </div>

        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] py-6 px-3 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkline"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkline"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center">
                    <SparkRevenue title="Expected sales France 2025" :values="line1" />
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] py-6 px-3 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkline"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkline"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center">
                    <SparkRevenue title="Expected sales Germany 2025" :values="line2" />
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] py-6 px-3 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkline"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkline"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center">
                    <SparkRevenue title="Expected sales Brazil 2025" :values="line3" />
                </div>
            </div>
        </div>

        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] py-6 px-3 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-spark-trend"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkTrend"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center mt-2">
                    <VueDataUi component="VueUiSparkTrend" :dataset="line1" :config="trendConfig"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] py-6 px-3 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-spark-trend"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkTrend"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center mt-2">
                    <VueDataUi component="VueUiSparkTrend" :dataset="line2" :config="trendConfig"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] py-6 px-3 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-spark-trend"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkTrend"
                    />
                </div>
                <div class="flex flex-row gap-4 justify-between place-items-center mt-2">
                    <VueDataUi component="VueUiSparkTrend" :dataset="line3" :config="trendConfig"/>
                </div>
            </div>
        </div>


        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkbar"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Targets<span class="text-gray-500 dark:text-gray-500"> France</span> 
                        </div>
                        <div class="text-gray-500">
                            2025
                        </div>
                    </div>
                        <MiniBar :detail="bar1"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkbar"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Targets<span class="text-gray-500 dark:text-gray-500"> Germany</span> 
                        </div>
                        <div class="text-gray-500">
                            2025
                        </div>
                    </div>
                        <MiniBar :detail="bar2"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkbar"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Targets<span class="text-gray-500 dark:text-gray-500"> Brazil</span> 
                        </div>
                        <div class="text-gray-500">
                            2025
                        </div>
                    </div>
                        <MiniBar :detail="bar3"/>
                </div>
            </div>
        </div>

        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6 visitors">
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkhistogram"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkHistogram"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Avg. clients per hour<span class="text-gray-500 dark:text-gray-500"> France</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025
                        </div>
                    </div>
                        <BoutiqueVisitors :values="hist1"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkhistogram"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkHistogram"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Avg. clients per hour<span class="text-gray-500 dark:text-gray-500"> Germany</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025
                        </div>
                    </div>
                        <BoutiqueVisitors :values="hist2"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkhistogram"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkHistogram"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[InterMedium] text-xl lg:text-3xl text-left">
                            Avg. clients per hour<span class="text-gray-500 dark:text-gray-500"> Brazil</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025
                        </div>
                    </div>
                        <BoutiqueVisitors :values="hist3"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.visitors rect {
    transition: all 0.2s ease-in-out !important;
}
</style>