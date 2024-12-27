<script setup>
import { ref, computed } from "vue";
import CodeParser from "./CodeParser.vue";

const code1 = ref(`<VueUiXy :config="config" :dataset="dataset">
    <template #optionPdf>
        PRINT PDF
    </template>
</VueUiXy>`
)

const code2 = ref(`<VueUiXy :config="config" :dataset="dataset">
    <template #optionFullscreen="{ isFullscreen, toggleFullscreen }">
        <div @click="toggleFullscreen(isFullscreen ? 'out' : 'in')">
            TOGGLE FULLSCREEN
        </div>
    </template>
</VueUiXy>`
)

const code0 = ref(`const config = ref({
    userOptions: {
        tooltip: true,
        pdf: true,
        csv: true,
        img: true,
        table: true,
        labels: true,
        sort: true,
        stack: true,
        fullscreen: true
    },
    // Rest of your config
})`
)

</script>

<template>
    <div class="text-left mt-12 w-5/6 sm:w-1/2 mx-auto mb-12">
        Config also allows you to hide some actions.<br>
        The example below illustrates all the possible options.<br>
        <span class="text-orange-500">Check out the docs to know what options are available for a given chart.</span>
        <div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
            <CodeParser :content="code0" language="javascript"/>
        </div>

        If you want to customize the contents of the options menu, you can leverage the slots provided with each chart. The click event is managed by the component.<br>

        Example:
<div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
    <CodeParser :content="code1" language="html"/>
</div>

    The #optionFullscreen slot has a specific implementation, where you need to apply a click event with the exposed data:

<div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
    <CodeParser :content="code2" language="html"/>
</div>


        <table class="schema table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="my-6">User options</caption>
            <thead>
                <tr class="bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Config attribute (show | hide option)</th>
                    <th class="border border-slate-600 p-2">Slot name (customize content)</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">tooltip</td>
                    <td class="p-2 border border-slate-700">#optionTooltip</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">pdf</td>
                    <td class="p-2 border border-slate-700">#optionPdf</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">csv</td>
                    <td class="p-2 border border-slate-700">#optionCsv</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">img</td>
                    <td class="p-2 border border-slate-700">#optionImg</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">table</td>
                    <td class="p-2 border border-slate-700">#optionTable</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">labels</td>
                    <td class="p-2 border border-slate-700">#optionLabels</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">sort</td>
                    <td class="p-2 border border-slate-700">#optionSort</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">stack</td>
                    <td class="p-2 border border-slate-700">#optionStack</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">fullscreen</td>
                    <td class="p-2 border border-slate-700">#optionFullscreen</td>
                </tr>
            </tbody>
        </table>

        <table class="schema table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="my-6">User options per chart</caption>
            <thead>
                <tr class="bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Chart component</th>
                    <th class="border border-slate-600 p-2">Available options in config</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-3d-bar">VueUi3dBar</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-age-pyramid">VueUiAgePyramid</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-candlestick">VueUiCandlestick</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-chestnut">VueUiChestnut</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-donut">VueUiDonut</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, labels</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-donut-evolution">VueUiDonutEvolution</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-dumbbell">VueUiDumbbell</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-flow">VueUiFlow</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-galaxy">VueUiGalaxy</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-gauge">VueUiGauge</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-heatmap">VueUiHeatmap</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-molecule">VueUiMolecule</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, labels</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-mood-radar">VueUiMoodRadar</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-nested-donuts">VueUiNestedDonuts</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, labels</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-nested-onion">VueUiOnion</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-parallel-coordinate-plot">VueUiParallelCoordinatePlot</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, labels</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-quadrant">VueUiQuadrant</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, labels</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-quick-chart">VueUiQuickChart</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-radar">VueUiRadar</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-relation-circle">VueUiRelationCircle</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-rings">VueUiRings</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-scatter">VueUiScatter</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-sparkhistogram">VueUiSparkHistogram</RouterLink></td>
                    <td class="p-2 border border-slate-700 text-orange-500">No user options menu</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-sparkstackbar">VueUiSparkStackbar</RouterLink></td>
                    <td class="p-2 border border-slate-700 text-orange-500">No user options menu</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-spark-trend">VueUiSparkTrend</RouterLink></td>
                    <td class="p-2 border border-slate-700 text-orange-500">No user options menu</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-sparkbar">VueUiSparkbar</RouterLink></td>
                    <td class="p-2 border border-slate-700 text-orange-500">No user options menu</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-sparkgauge">VueUiSparkgauge</RouterLink></td>
                    <td class="p-2 border border-slate-700 text-orange-500">No user options menu</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-sparkline">VueUiSparkline</RouterLink></td>
                    <td class="p-2 border border-slate-700 text-orange-500">No user options menu</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-strip-plot">VueUiStripPlot</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, labels</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-table-heatmap">VueUiTableHeatmap</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-table-sparkline">VueUiTableSparkline</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-thermometer">VueUiThermometer</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-tiremarks">VueUiTiremarks</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-treemap">VueUiTreemap</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-vertical-bar">VueUiVerticalBar</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, sort</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-waffle">VueUiWaffle</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-wheel">VueUiWheel</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-word-cloud">VueUiWordCloud</RouterLink></td>
                    <td class="p-2 border border-slate-700">pdf, img, csv, table, fullscreen</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-xy">VueUiXy</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, labels, stack</td>
                </tr>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700 underline text-app-blue"><RouterLink to="/docs#vue-ui-xy-canvas">VueUiXyCanvas</RouterLink></td>
                    <td class="p-2 border border-slate-700">tooltip, pdf, img, csv, table, fullscreen, labels, stack</td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>