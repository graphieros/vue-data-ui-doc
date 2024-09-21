<script setup>
import { ref, computed } from "vue";
import {adaptColorToBackground} from '../maker/lib'
import { useMainStore } from "../../stores";
import { CheckIcon } from "vue-tabler-icons";
import { getPalette } from "vue-data-ui";

const store = useMainStore()
const isCopy = computed(() => store.isCopy);
const translations = computed(() => {
    return store.translations;
})

const palette = ref([
    "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
    "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
    "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939",
    "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39",
    "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b",
    "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
]);

// TODO: THEMES HERE ?

function copyContent(color) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = color;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}
</script>

<template>
    
    <div style="z-index:10000000" v-if="isCopy" class="origin-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col place-items-center gap-2">    
        <div style="z-index:10000000" v-if="isCopy" class="animate-pulse h-[80px] w-[80px] flex place-items-center place-content-center border-2 border-gray-400 dark:border-app-green dark:bg-black rounded-full bg-white">
            <CheckIcon size="42" class="dark:text-app-green"/>
        </div>
        <span class="animate-pulse text-black dark:text-app-green bg-white dark:bg-black px-4 py-2 rounded-full">
            {{ translations.clipboard[store.lang] }}
        </span>
    </div>
    <div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 sm:w-1/2 mx-auto mb-12">
        <p class="my-6">
            You can use config.customPalette (string[]]) to use your own color palette. Colors provided in datasets will always override custom and default palettes. Allowed color formats: HEX, RGB, HSL, named colors.
            The config.customPalette attribute can be used on the following components:
        </p>
        <ul>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUi3dBar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiChestnut
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiDonut
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiDonutEvolution
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiGalaxy
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiGauge
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiMolecule
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiNestedDonuts
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiOnion
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiParallelCoordinatePlot
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiQuadrant
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiQuickChart
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiRadar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiRelationCircle
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiRings
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiScatter
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiSparkStackbar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiSparkbar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiStripPlot
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiTableSparkline
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiThermometer
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiTreemap
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiVerticalBar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiWaffle
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiWordCloud
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiXy
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiXyCanvas
            </li>
        </ul>
        <p class="my-6">{{ translations.customization.palette[store.lang] }}</p>
        <div class="w-full text-left mb-10 p-2 bg-gray-200 dark:bg-[#2A2A2A] rounded-md">
            <code class="text-xs text-left">
                import { getPalette } from "vue-data-ui";<br>
                const palette = getPalette(); // Default palette
            </code>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in palette">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="w-full text-left mb-10 p-2 bg-gray-200 dark:bg-[#2A2A2A] rounded-md mt-12">
            <code class="text-xs text-left">
                import { getPalette } from "vue-data-ui";<br>
                const palette = getPalette('zen');
            </code>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in getPalette('zen')">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="w-full text-left mb-10 p-2 bg-gray-200 dark:bg-[#2A2A2A] rounded-md mt-12">
            <code class="text-xs text-left">
                import { getPalette } from "vue-data-ui";<br>
                const palette = getPalette('concrete');
            </code>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in getPalette('concrete')">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="w-full text-left mb-10 p-2 bg-gray-200 dark:bg-[#2A2A2A] rounded-md mt-12">
            <code class="text-xs text-left">
                import { getPalette } from "vue-data-ui";<br>
                const palette = getPalette('hack');
            </code>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in getPalette('hack')">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>
    </div>
</template>