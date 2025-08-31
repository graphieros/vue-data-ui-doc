<script setup>
import { computed, onMounted, ref } from "vue";
import { useMainStore } from '../stores';
import router from "../router";
import ChartSeeker from "../components/ChartSeeker.vue";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import colorBridge from "color-bridge";
import { VueHiCode } from "vue-hi-code";
import "vue-hi-code/style.css"


const store = useMainStore();
const { utils } = colorBridge();
const { lightenHexColor } = utils();

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

const codeParserConfig = computed(() => {
    return {
        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FAFAFA',
        baseTextColor: isDarkMode.value ? '#CCCCCC' : '#3A3A3A',
        colorPunctuation: isDarkMode.value ? '#E1E5E8' : '#2A2A2A',
        colorFunction: isDarkMode.value ? '#DCDCAA' : '#1A1A1A',
        colorTitle: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        copyIconColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
    }
})

const mainCodeContent = computed(() => {
    return `import { createApp } from 'vue'
import App from "./App.vue" 
import "vue-data-ui/style.css" // ${translations.value.installation.comments.includeCss[store.lang]}

// ${translations.value.installation.comments.global[store.lang]}
import { VueUiRadar } from "vue-data-ui"

const app = createApp(App)

app.component("VueUiRadar", VueUiRadar)
app.mount('#app')
`
});

const componentContent = computed(() => {
    return `// ${translations.value.installation.comments.import[store.lang]}
import { VueUiRadar, VueUiXy } from "vue-data-ui";

// With Typescript:
import { ref } from "vue";
import {
    VueUiRadar,
    type VueUiRadarDataset,
    type VueUiRadarConfig
} from "vue-data-ui";

const dataset = ref<VueUiRadarDataset>(/* your dataset */);
const config = ref<VueUiRadarConfig>(/* your config (optional) */);
    `
})

const universalComponentContent = computed(() => {
    return `// ${translations.value.installation.comments.universalComponent[store.lang]}

import { ref } from "vue";
import { VueDataUi } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref(/* Your dataset */);
const config = ref(/* Your config (optional) */);
    `
})

const universalComponentTemplateContent = computed(() => {
    return `<template>
    <div style="width:600px;">
        <VueDataUi
            component="VueUiXy"
            :dataset="dataset"
            :config="config"
        />
    </div>
</template>
    `
})

</script>

<template>
    <div class="flex flex-col place-content-center place-items-center text-center my-12 px-6">
        <div class="fixed top-0 left-0 h-screen w-screen z-0 pointer-events-none" style="opacity:0.4">
            <div class="absolute top-0 left-0 w-full h-full" :style="isDarkMode ? 'background:radial-gradient(#5f8bee, transparent) !important' : 'background:radial-gradient(#F3F4F6, transparent)'"/>

        </div>
        <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
            <div class="relative w-[80px] h-[80px]">
                <VueUiIcon name="starFill" :size="80" :strokeWidth="0.8" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" stroke="#5f8bee"/>
                <VueUiIcon name="starFill" :size="60" :strokeWidth="0.8" class="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="lightenHexColor({ hexColor: '#5F8BEE' , force: 0.2 })"/>
                <VueUiIcon name="starFill" :size="40" :strokeWidth="0.8" class="animate-ping hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="lightenHexColor({ hexColor: '#5F8BEE' , force: 0.4 })"/>
                <VueUiIcon name="starFill" :size="20" :strokeWidth="0.8" class="animate-ping hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="lightenHexColor({ hexColor: '#5F8BEE' , force: 0.6 })"/>
                <VueUiIcon name="starFill" :size="5" :strokeWidth="0.8" class="animate-ping hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="lightenHexColor({ hexColor: '#5F8BEE' , force: 0.8 })"/>
            </div>
            <h1 class="font-inter-bold text-[48px] sm:text-[72px] text-center">
                {{ translations.menu.installation[store.lang] }}
            </h1>
        </div>

        <div class="z-10 p-3 shadow-md rounded-lg flex flex-col mt-6 bg-gray-600 dark:bg-[rgb(26,26,26)]">
            <VueHiCode content="npm i vue-data-ui   " language="javascript" v-bind="codeParserConfig" @copy="store.copy()"/>
        </div>

        <!-- <div class="mt-4 z-10" dir="auto">
            {{ translations.installation.tsUsers[store.lang] }}
        </div> -->

        <div class="mt-4 z-10">

            <a href="https://github.com/graphieros/vue-data-ui-nuxt" class="underline" target="_blank">
                <div dir="auto">
                    {{ translations.nuxt.implementation[store.lang] }}
                </div>
            </a>
        </div>

        <div class="mt-4 z-10 flex flex-row place-items-center gap-2">
            <VueUiIcon name="robot" stroke="#5F8BEE"/>
            <a href="https://vue-data-ui.graphieros.com/llms.txt" class="underline" target="_blank">AI assistance (llms.txt)</a>
        </div>
        
        <div class="z-10 p-6 shadow-md rounded-lg flex flex-col mt-6 bg-gray-200 dark:bg-[rgb(26,26,26)] max-w-[800px]">

            <div class="text-left">
                <VueHiCode 
                    :content="mainCodeContent" 
                    language="javascript" 
                    @copy="store.copy()"
                    v-bind="{...codeParserConfig, title: 'src/main.js'}"
                />
            </div>

            <div class="text-left mt-6">
                <VueHiCode 
                    :content="componentContent" 
                    language="javascript" 
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                    title="MyComponent.vue"
                />
            </div>

            <div class="text-left mt-6">
                <VueHiCode 
                    :content="universalComponentContent" 
                    language="javascript" 
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                    title="MyUniversalChart.vue"
                />
            </div>
            <div class="text-left mt-6">
                <VueHiCode 
                    :content="universalComponentTemplateContent" 
                    language="html" 
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                />
            </div>
        </div>
        <div class="flex flex-row place-items-center justify-center z-10 mt-10">
            <div class="p-0.5 bg-gradient-to-r from-app-green to-app-blue rounded-lg hover:shadow-xl transition-all">
                <button dir="auto" @click="gotoMaker" class="py-3 px-6 rounded-md text-xl flex flex-row gap-2 place-items-cente transition-colors bg-white dark:bg-[#1A1A1A]">
                    <VueUiIcon name="arrowRight" class="animate-pulse" :stroke="isDarkMode ? '#42d392' : '#2A2A2A'"/>
                    <VueUiIcon name="clipboardBar" :stroke="isDarkMode ? '#42d392' : '#2A2A2A'"/>
                    {{ translations.makeNow[store.lang] }}
                </button>
            </div>
        </div>

        <ChartSeeker class="mt-12 z-10"/>

        <div class="mt-8 w-full max-w-[800px] text-[18px]">
            Check out awesome free tools provided by our friends at
        </div>
        <a href="https://fncsy.com/" target="_blank" class="mt-2 w-full max-w-[800px] flex flex-col gap-4 p-4 rounded border border-app-green bg-white dark:bg-[#1A1A1A] z-50 hover:bg-[#E1E5E6] hover:dark:bg-[#2A2A2A] transition-colors">
            <div class="flex flex-row gap-2 place-items-center justify-center">
                <img src="../assets/fncsy-logo.webp" height="64" width="64"/>
                <code class="text-app-green-dark text-[32px]">FNCSY</code>
            </div>
            <code class="text-left">
                <span class="text-app-green-dark dark:text-app-green">Save Hours of Work</span> with
                Smart Digital Tools
                Stop wasting time with complex setups. 
                <br/>
                <br/>
                Get instant access to <span class="text-app-green-dark dark:text-app-green">production-ready tools</span> that creators, designers, and developers trust. Extract data with smart patterns, generate QR codes, convert currencies, transform CSV data, encode Base64, generate UUIDs, check your IP, calculate subnets, create patterns — <span class="text-app-green-dark dark:text-app-green">all in seconds, completely free</span>.
            </code>
        </a>
        <ConfirmCopy/>
    </div>
</template>