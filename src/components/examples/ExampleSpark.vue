<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import GaugeNPS from "./components/GaugeNPS.vue"
import StackRespondents from "./components/StackRespondents.vue";

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);



</script>

<template>
    <div class="mt-12 flex flex-col gap-6">
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
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
    </div>
</template>