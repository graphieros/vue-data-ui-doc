<script setup>
</script>

<template>
    <div class="flex flex-col place-content-center place-items-center text-center mt-12">
        <div class="p-6 border border-gray-700 rounded-lg flex flex-col text-start text-gray-800 bg-gray-200 dark:text-app-green dark:bg-[rgba(255,255,255,0.05)]">
            <code>npm i vue-data-ui</code>
            <code>yarn add vue-data-ui</code>
        </div>

        <div class="mt-4">
            For TypeScript users: types are available in <b>vue-data-ui.d.ts</b> file under the types folder of the package.
        </div>
        
        <div class="p-6 border border-gray-700 rounded-lg flex flex-col mt-6 bg-gray-200 dark:bg-transparent">
            <span class="text-app-blue">src/main.js</span>
            <code class="mt-3 text-start">
                import { createApp } from 'vue'<br>
                import App from "./App.vue"<br>
                import { <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiXy</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiTable</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiDonut</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiWaffle</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiRadar</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiQuadrant</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiGauge</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiChestnut</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiOnion</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiVerticalBar</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiScreenshot</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiRating</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiSkeleton</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiSparkline</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiHeatmap</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiScatter</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiCandlestick</span>, <br>
                    &nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiAgePyramid</span>, <br>
                } from "vue-data-ui"<br>
                import "vue-data-ui/style.css" <span class="text-red-600 dark:text-app-orange">// don't forget the css</span><br><br>
                const app = createApp(App)<br><br>
                app.component("VueUiXy", <span class="text-gray-800 dark:text-app-green">VueUiXy</span>)<br>
                app.component("VueUiTable", <span class="text-gray-800 dark:text-app-green">VueUiTable</span>)<br>
                app.component("VueUiDonut", <span class="text-gray-800 dark:text-app-green">VueUiDonut</span>)<br>
                app.component("VueUiWaffle", <span class="text-gray-800 dark:text-app-green">VueUiWaffle</span>)<br>
                app.component("VueUiRadar", <span class="text-gray-800 dark:text-app-green">VueUiRadar</span>)<br>
                app.component("VueUiQuadrant", <span class="text-gray-800 dark:text-app-green">VueUiQuadrant</span>)<br>
                app.component("VueUiGauge", <span class="text-gray-800 dark:text-app-green">VueUiGauge</span>)<br>
                app.component("VueUiChestnut", <span class="text-gray-800 dark:text-app-green">VueUiChestnut</span>)<br>
                app.component("VueUiOnion", <span class="text-gray-800 dark:text-app-green">VueUiOnion</span>)<br>
                app.component("VueUiVerticalBar", <span class="text-gray-800 dark:text-app-green">VueUiVerticalBar</span>)<br>
                app.component("VueUiScreenshot", <span class="text-gray-800 dark:text-app-green">VueUiScreenshot</span>)<br>
                app.component("VueUiRating", <span class="text-gray-800 dark:text-app-green">VueUiRating</span>)<br>
                app.component("VueUiSkeleton", <span class="text-gray-800 dark:text-app-green">VueUiSkeleton</span>)<br>
                app.component("VueUiSparkline", <span class="text-gray-800 dark:text-app-green">VueUiSparkline</span>)<br>
                app.component("VueUiHeatmap", <span class="text-gray-800 dark:text-app-green">VueUiHeatmap</span>)<br>
                app.component("VueUiScatter", <span class="text-gray-800 dark:text-app-green">VueUiScatter</span>)<br>
                app.component("VueUiCandlestick", <span class="text-gray-800 dark:text-app-green">VueUiCandlestick</span>)<br>
                app.component("VueUiAgePyramid", <span class="text-gray-800 dark:text-app-green">VueUiAgePyramid</span>)<br><br>
                app.mount('#app')
            </code>
        </div>
    </div>
</template>