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
                import { VueUiXy, VueUiTable } from "vue-data-ui"<br>
                import "vue-data-ui/style.css"<br><br>
                const app = createApp(App)<br><br>
                app.component("VueUiXy", VueUiXy)<br>
                app.component("VueUiTable", VueUiTable)<br><br>
                app.mount('#app')
            </code>
        </div>
    </div>
</template>