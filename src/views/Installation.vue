<script setup>
</script>

<template>
    <div class="flex flex-col place-content-center place-items-center text-center mt-12">
        <div class="p-6 border border-gray-700 rounded-lg flex flex-col text-start text-app-green bg-[rgba(255,255,255,0.05)]">
            <code>npm i vue-data-ui</code>
            <code>yarn add vue-data-ui</code>
        </div>
        
        <div class="p-6 border border-gray-700 rounded-lg flex flex-col mt-12">
            <span class="text-app-blue">src/main.js</span>
            <code class="mt-3 text-start">
                import { createApp } from 'vue'<br>
                import App from "./App.vue"<br>
                import { <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiXy</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiTable</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiDonut</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiWaffle</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiRadar</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiQuadrant</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiGauge</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiChestnut</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiOnion</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiVerticalBar</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiScreenshot</span>, <br>
                    &nbsp;&nbsp;<span class="text-app-green">VueUiRating</span>, <br>
                } from "vue-data-ui"<br>
                import "vue-data-ui/style.css" <span class="text-app-orange">// don't forget the css</span><br><br>
                const app = createApp(App)<br><br>
                app.component("VueUiXy", <span class="text-app-green">VueUiXy</span>)<br>
                app.component("VueUiTable", <span class="text-app-green">VueUiTable</span>)<br>
                app.component("VueUiDonut", <span class="text-app-green">VueUiDonut</span>)<br>
                app.component("VueUiWaffle", <span class="text-app-green">VueUiWaffle</span>)<br>
                app.component("VueUiRadar", <span class="text-app-green">VueUiRadar</span>)<br>
                app.component("VueUiQuadrant", <span class="text-app-green">VueUiQuadrant</span>)<br>
                app.component("VueUiGauge", <span class="text-app-green">VueUiGauge</span>)<br>
                app.component("VueUiChestnut", <span class="text-app-green">VueUiChestnut</span>)<br>
                app.component("VueUiOnion", <span class="text-app-green">VueUiOnion</span>)<br>
                app.component("VueUiVerticalBar", <span class="text-app-green">VueUiVerticalBar</span>)<br>
                app.component("VueUiScreenshot", <span class="text-app-green">VueUiScreenshot</span>)<br>
                app.component("VueUiRating", <span class="text-app-green">VueUiRating</span>)<br><br>
                app.mount('#app')
            </code>
        </div>
    </div>
</template>