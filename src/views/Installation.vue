<script setup>
import { computed, onMounted } from "vue";
import AppSkeletons from '../components/AppSkeletons.vue';
import { useMainStore } from '../stores';
import router from "../router";
import ChartSeeker from "../components/ChartSeeker.vue";
const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => {
    return store.translations;
})

onMounted(() => {
    window.scrollTo(0,0)
})

function gotoMaker() {
    router.push({ path: '/chart-builder'})
}

</script>

<template>
    <div class="flex flex-col place-content-center place-items-center text-center my-12 px-6">
        <div class="fixed top-0 left-0 h-screen w-screen z-0 pointer-events-none" style="opacity:0.4">
        <div class="absolute top-0 left-0 w-full h-full" :style="isDarkMode ? 'background:radial-gradient(#5f8bee, transparent) !important' : 'background:radial-gradient(#F3F4F6, transparent)'"/>
        <AppSkeletons/>
      </div>

      <h1 class="text-[64px] sm:text-[96px] text-center">
          {{ translations.menu.installation[store.lang] }}
      </h1>


        <div class="z-10 mt-10 p-6 border border-gray-700 rounded-lg flex flex-col text-start text-gray-800 bg-gray-200 dark:text-app-green dark:bg-[rgb(26,26,26)]">
            <code>npm i vue-data-ui</code>
            <code>yarn add vue-data-ui</code>
        </div>

        <div class="mt-4 z-10" dir="auto">
            {{ translations.installation.tsUsers[store.lang] }}
        </div>

        <div class="mt-4 z-10">

            <a href="https://github.com/graphieros/vue-data-ui-nuxt" class="underline" target="_blank">
                <div dir="auto">
                    {{ translations.nuxt.implementation[store.lang] }}
                </div>
            </a>
        </div>
        
        <div class="z-10 p-6 border border-gray-700 rounded-lg flex flex-col mt-6 bg-gray-200 dark:bg-[rgb(26,26,26)] max-w-[800px]">
            <span class="text-app-blue">src/main.js</span>
            <code class="mt-3 text-start">
                import { createApp } from 'vue'<br>
                import App from "./App.vue"<br>
                <span class="text-red-600 dark:text-gray-500">// {{ translations.installation.comments.includeCss[store.lang] }}</span><br>
                import "<span class="text-gray-800 dark:text-app-green">vue-data-ui/style.css</span>"<br><br>
                
                <span class="text-gray-600 dark:text-gray-500">// <span dir="auto">{{ translations.installation.comments.global[store.lang] }}</span></span><br>
                import { <span class="text-gray-800 dark:text-app-green">VueUiRadar</span> } from "vue-data-ui"<br><br>

                const app = createApp(App)<br><br>

                app.component("VueUiRadar", <span class="text-gray-800 dark:text-app-green">VueUiRadar</span>)<br>

                app.mount('#app')<br><br>

                <span class="text-gray-600 dark:text-gray-500">// <span dir="auto">{{ translations.installation.comments.import[store.lang] }}</span></span><br>
            </code>

            <span class="text-app-blue">MyComponent.vue</span>
            <code class="mt-3 text-start">
               &lt;script setup&gt;<br>
               &nbsp;&nbsp;import { <span class="text-gray-800 dark:text-app-green">VueUiRadar, VueUiXy</span> } from "vue-data-ui";<br>
               
               &lt;/script&gt;<br><br>
               <span class="text-gray-600 dark:text-gray-500 text-left">// Typescript</span><br><br>
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

               <span class="text-gray-600 dark:text-gray-500">// <span dir="auto">{{ translations.installation.comments.universalComponent[store.lang] }}</span></span><br>
            </code>

            <span class="text-app-blue">MyComponent.vue</span>
            <code class="mt-3 text-start">
                &lt;script setup&gt;<br>
                &nbsp;&nbsp;import { ref } from "vue"; <br>
                &nbsp;&nbsp;import { <span class="text-gray-800 dark:text-app-green">VueDataUi</span> } from "vue-data-ui";<br>
                &nbsp;&nbsp;import "<span class="text-gray-800 dark:text-app-green">vue-data-ui/style.css</span>";<br><br>
                &nbsp;&nbsp;const dataset = ref([...]);<br>
                &nbsp;&nbsp;const config = ref({...});<br>
                &lt;/script&gt;<br><br>
                &lt;template&gt;<br>
                &nbsp;&nbsp;&lt;div style="width:600px;"&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="text-gray-800 dark:text-app-green">VueDataUi</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;component="VueUiXy"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:dataset="dataset"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:config="config"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>
                &nbsp;&nbsp;&lt;/div&gt;<br>
                &lt;/template&gt;
            </code>
        </div>
        <div class="flex flex-row place-items-center justify-center z-10 mt-10">
            <button dir="auto" @click="gotoMaker" class="bg-gradient-to-br from-app-blue-light to-app-blue text-black py-3 px-6 rounded-full text-xl flex flex-row gap-2 place-items-center hover:from-app-blue hover:to-app-blue-light transition-colors shadow-md">
                <VueUiIcon name="arrowRight" class="animate-pulse" stroke="#2A2A2A"/>
                <VueUiIcon name="clipboardBar" stroke="#2A2A2A"/>
                {{ translations.makeNow[store.lang] }}
            </button>
        </div>

        <ChartSeeker class="mt-12"/>
    </div>
</template>