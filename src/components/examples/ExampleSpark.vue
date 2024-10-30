<script setup>
import { ref, computed } from "vue";
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl">
                            Net Promoter Score<span class="text-gray-500 dark:text-gray-500"> Boutique</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span class="text-green-600 dark:text-green-500">+24%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: 7.8,
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl">
                            Net Promoter Score<span class="text-gray-500 dark:text-gray-500"> Office</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span class="text-red-600 dark:text-red-500">-3%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: 5.3,
                        min: 0,
                        max: 10,
                    }" />
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkstackbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkStackbar"
                    />
                </div>

                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Respondents<span class="text-gray-500 dark:text-gray-500"> France</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span class="text-red-600 dark:text-red-500">-5%</span>
                        </div>
                    </div>
                        <StackRespondents :detail="[256, 128, 64, 32]"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkstackbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkStackbar"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Respondents<span class="text-gray-500 dark:text-gray-500"> Germany</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span class="text-green-600 dark:text-green-500">+8%</span>
                        </div>
                    </div>
                        <StackRespondents :detail="[212, 180, 165, 87]"/>
                </div>
            </div>
            <div class="w-full sm:w-1/3 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <div class="w-full dark:bg-[#FFFFFF05] bg-gray-100 rounded shadow py-0.5 mb-4">
                    <BaseDocHeaderActions
                        targetDoc="vue-ui-sparkstackbar"
                        :defaultConfig="false"
                        targetMaker="VueUiSparkStackbar"
                    />
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col">
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Respondents<span class="text-gray-500 dark:text-gray-500"> Brazil</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span class="text-green-600 dark:text-green-500">+12%</span>
                        </div>
                    </div>
                        <StackRespondents :detail="[455, 47, 78, 49]"/>
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl">
                            NPS<span class="text-gray-500 dark:text-gray-500"> France</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span class="text-red-600 dark:text-red-500">-7%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: 6.9,
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl">
                            NPS<span class="text-gray-500 dark:text-gray-500"> Germany</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span class="text-green-600 dark:text-green-500">+1%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: 8.4,
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl">
                            NPS<span class="text-gray-500 dark:text-gray-500"> Brazil</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025 <span class="text-green-600 dark:text-green-500">+12%</span>
                        </div>
                    </div>
                    <GaugeNPS :dataset="{
                        value: 9,
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
                    <SparkRevenue title="Expected sales France 2025" :values="[320, 289, 275, 212, 288, 312, 180, 169, 256, 413, 420, 512]" />
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
                    <SparkRevenue title="Expected sales Germany 2025" :values="[280, 125, 300, 166, 300, 100, 80, 66, 320, 550, 660, 900]" />
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
                    <SparkRevenue title="Expected sales Brazil 2025" :values="[800, 650, 120, 98, 78, 125, 147, 212, 127, 315, 712, 840]" />
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Targets<span class="text-gray-500 dark:text-gray-500"> France</span> 
                        </div>
                        <div class="text-gray-500">
                            2025
                        </div>
                    </div>
                        <MiniBar :detail="[1150, 880, 912]"/>
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Targets<span class="text-gray-500 dark:text-gray-500"> Germany</span> 
                        </div>
                        <div class="text-gray-500">
                            2025
                        </div>
                    </div>
                        <MiniBar :detail="[1230, 900, 760]"/>
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Targets<span class="text-gray-500 dark:text-gray-500"> Brazil</span> 
                        </div>
                        <div class="text-gray-500">
                            2025
                        </div>
                    </div>
                        <MiniBar :detail="[808, 760, 1240]"/>
                </div>
            </div>
        </div>

        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Avg. clients per hour<span class="text-gray-500 dark:text-gray-500"> France</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025
                        </div>
                    </div>
                        <BoutiqueVisitors :values="[3, 12, 48, 120, 140, 125, 15, 19, 98, 250, 212, 87]"/>
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Avg. clients per hour<span class="text-gray-500 dark:text-gray-500"> Germany</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025
                        </div>
                    </div>
                        <BoutiqueVisitors :values="[56, 120, 250, 90, 66, 87, 15, 19, 98, 250, 320, 19]"/>
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
                        <div class="font-[SatoshiBold] text-xl lg:text-3xl text-left">
                            Avg. clients per hour<span class="text-gray-500 dark:text-gray-500"> Brazil</span> 
                        </div>
                        <div class="text-gray-500">
                            Q1 2025
                        </div>
                    </div>
                        <BoutiqueVisitors :values="[9, 12, 27, 32, 300, 400, 100, 8, 9, 27, 120, 100]"/>
                </div>
            </div>
        </div>
    </div>
</template>