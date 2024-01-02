<script setup>
import { computed } from "vue";
import AppSkeletons from '../components/AppSkeletons.vue';
import { useMainStore } from '../stores';
const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => {
    return store.translations;
})

</script>

<template>
    <div class="flex flex-col place-content-center place-items-center text-center my-12 px-6">
        <div class="fixed top-0 left-0 h-screen w-screen z-0" style="opacity:0.4">
        <div class="absolute top-0 left-0 w-full h-full" :style="isDarkMode ? 'background:radial-gradient(#5f8bee, transparent) !important' : 'background:radial-gradient(#F3F4F6, transparent)'"/>
        <AppSkeletons/>
      </div>
        <div class="z-10 p-6 border border-gray-700 rounded-lg flex flex-col text-start text-gray-800 bg-gray-200 dark:text-app-green dark:bg-[rgb(26,26,26)]">
            <code>npm i vue-data-ui</code>
            <code>yarn add vue-data-ui</code>
        </div>

        <div class="mt-4 z-10">
            {{ translations.installation.tsUsers[store.lang] }}
        </div>

        <div class="mt-4 z-10">

            <a href="https://github.com/graphieros/vue-data-ui-nuxt" class="underline" target="_blank">
                {{ translations.nuxt.implementation[store.lang] }}
            </a>
        </div>
        
        <div class="z-10 p-6 border border-gray-700 rounded-lg flex flex-col mt-6 bg-gray-200 dark:bg-[rgb(26,26,26)] max-w-[800px]">
            <span class="text-app-blue">src/main.js</span>
            <code class="mt-3 text-start">
                import { createApp } from 'vue'<br>
                import App from "./App.vue"<br>
                <span class="text-red-600 dark:text-gray-500">// {{ translations.installation.comments.includeCss[store.lang] }}</span><br>
                import "<span class="text-gray-800 dark:text-app-green">vue-data-ui/style.css</span>"<br><br>
                
                <span class="text-gray-600 dark:text-gray-500">// {{ translations.installation.comments.global[store.lang] }}</span><br>
                import { <span class="text-gray-800 dark:text-app-green">VueUiRadar</span> } from "vue-data-ui"<br><br>

                const app = createApp(App)<br><br>

                app.component("VueUiRadar", <span class="text-gray-800 dark:text-app-green">VueUiRadar</span>)<br>

                app.mount('#app')<br><br>

                <span class="text-gray-600 dark:text-gray-500">// {{ translations.installation.comments.import[store.lang] }}</span><br>
            </code>
            <span class="text-app-blue">MyComponent.vue</span>
            <code class="mt-3 text-start">
               &lt;script setup&gt;<br>
               &nbsp;&nbsp;import { <span class="text-gray-800 dark:text-app-green">VueUiRadar, VueUiXy</span> } from "vue-data-ui";<br>
               &lt;/script&gt;<br><br>
               <span class="text-gray-600 dark:text-gray-500 text-left">// {{ translations.installation.comments.types[store.lang] }}</span><br><br>
               &lt;script setup&gt;<br>
               &nbsp;&nbsp;import { ref } from "vue";<br>
               &nbsp;&nbsp;import { <br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-gray-800 dark:text-app-green">VueUiRadar, <br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-gray-500">type </span>VueUiRadarDataset,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-gray-500">type </span>VueUiRadarConfig</span><br>
                &nbsp;&nbsp;} from "vue-data-ui";<br><br>
                const dataset = ref&lt;<span class="text-gray-800 dark:text-app-green">VueUiRadarDataset</span>&gt;({
                    ...
                })<br>
                const config = ref&lt;<span class="text-gray-800 dark:text-app-green">VueUiRadarConfig</span>&gt;({
                    ...
                })<br>
               &lt;/script&gt;<br><br>
            </code>

        </div>
    </div>
</template>