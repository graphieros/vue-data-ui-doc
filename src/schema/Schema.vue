<script setup>
import { ref, computed, onMounted } from "vue";
import db from "./index.json"
import BaseText from "./BaseText.vue";
import { useMainStore } from "../stores";
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"
import DocLink from "../components/DocLink.vue";
import { CopyIcon } from "vue-tabler-icons";

const store = useMainStore()

const isDarkMode = computed(() => {
    return store.isDarkMode
})

const translations = computed(() => {
    return store.translations
})

const props = defineProps({
    component: {
        type: String,
        default: 'vue_ui_xy'
    },
    showLink: {
        type: Boolean,
        default: true
    },
    hideDisclaimer: {
        type: Boolean,
        default: false
    }
}) 

const selectedComponent = computed(() => {
    return db[props.component]
})

onMounted(() => {
    window.Prism = window.Prism || {}
    window.Prism.manual = true
    Prism.highlightAll()
})


// TODO: add tables for emits & exposed methods

function copyToClipboard(el) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    if(typeof el === 'object') {
        selBox.value = JSON.stringify(conf);
    } else {
        selBox.value = el;
    }
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const codeContent = ref(null);

function copyContent() {
    const content = codeContent.value.innerText;
    copyToClipboard(content);
}

const isTs = ref(true);

const excl1 = 'Array<Array<string | number>>';
const excl2 = 'number[]';
const excl3 = ' | string';
const excl4 = '[]';
const excl5 = 'number';

</script>

<template>
    <div class="schema p-4 w-full max-w-[600px]">
        <div class="mb-4 flex flex-row gap-4">
            <VueUiIcon :name="selectedComponent.icon" :stroke="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
            <div class="text-xl">{{ selectedComponent.name }}</div>
        </div>
        <div class="mb-4">
            <BaseText :label="translations.overview.description[store.lang]" :text="translations.docs.tooltips[selectedComponent.description][store.lang]" />
            <div class="flex flew-row gap-2 place-items-center">
                <BaseText v-if="selectedComponent.props.includes('dataset')" label="Dataset TS type" isCode :text="selectedComponent.types.dataset" /> 
                <button title="Copy" class="dark:text-app-green" @click="copyToClipboard(selectedComponent.types.dataset)"><CopyIcon/></button>
            </div>
            <div class="flex flew-row gap-2 place-items-center">
                <BaseText v-if="selectedComponent.props.includes('dataset')" label="Config TS type" isCode :text="selectedComponent.types.config" />
                <button title="Copy" class="dark:text-app-green" @click="copyToClipboard(selectedComponent.types.config)"><CopyIcon/></button>
            </div>
            <div class="mt-8" v-if="showLink">
                <DocLink :to="selectedComponent.path.replace('/docs#', '')"/>
            </div>

            <div class="mt-8 mb-2" dir="auto">{{ translations.universalBoilerplate[store.lang] }}</div>
            <div class="flex flex-row gap-2 place-items-center mb-2" dir="auto">
                <label for="useTS">{{ translations.useTs[store.lang] }}</label><input type="checkbox" v-model="isTs" id="useTS">
            </div>
            <div class="bg-black text-gray-400 p-2 sm:p-6 rounded relative">
                <button title="Copy" class="text-app-green absolute right-4 top-4" @click="copyContent"><CopyIcon/></button>
<pre>
<code class="text-xs" ref="codeContent">
&lt;script setup<span v-if="isTs"> lang="ts"</span>&gt;
    import { ref } from "vue";<span v-if="isTs">
    import <span v-pre>{
        </span>VueDataUi,<span v-if="selectedComponent.types.dataset.replace(excl1, '').replace(excl2, '').replace(excl3, '').replace(excl4, '').replace(excl5, '').length">
        type {{ selectedComponent.types.dataset.replace(excl1, '').replace(excl2, '').replace(excl3, '').replace(excl4, '').replace(excl5, '') }}, 
        </span>type {{ selectedComponent.types.config }} <span v-pre>
    }</span> from "vue-data-ui";
    import "vue-data-ui/style.css";
    </span>
    <span v-if="!isTs">import { VueDataUi } from "vue-data-ui";
    import "vue-data-ui/style.css";
    </span>
    const dataset = ref<span v-if="isTs"><{{ selectedComponent.types.dataset }}></span>();
    const config = ref<span v-if="isTs"><{{ selectedComponent.types.config }}></span>();
&lt;/script&gt;

&lt;template&gt;
    &lt;VueDataUi
        component="{{ selectedComponent.name }}"
        :dataset="dataset"
        :config="config"
    /&gt;
&lt;/template&gt;
</code>
</pre>
            </div>

        </div>

        <table class="schema table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="caption-top py-4 text-left">
                {{ translations.overview.features[store.lang] }}
            </caption>
            <thead>
                <tr class="bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">{{ translations.overview.themes[store.lang] }}</th>
                    <th class="border border-slate-600 p-2">Slots</th>
                    <th class="border border-slate-600 p-2">Emits</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.exposedMethods[store.lang] }}</th>
                    <th class="border border-slate-600 p-2">Responsive<sup v-if="!hideDisclaimer">1</sup></th>
                </tr>

            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-700">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.hasThemes ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.hasThemes ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-700">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.hasSlots ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.hasSlots ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-700">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.hasEmits ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.hasEmits ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-700">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.hasExposed ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.hasExposed ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-700">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.responsive ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.responsive ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <span v-if="!hideDisclaimer" dir="auto">
            1. {{ translations.responsiveUsage[store.lang] }} {{ translations.responsive[store.lang] }}
        </span>

        <table v-if="selectedComponent.userOptions" class="table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="caption-top py-4 text-left">
                {{ translations.overview.userOptions[store.lang] }}
            </caption>
            <thead>
                <tr class="bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">{{ translations.overview.icon[store.lang] }}</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF10]" v-for="option in selectedComponent.userOptions">
                    <td class="p-2 border border-slate-700">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="option.icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-700 text-xs">
                        {{ option.description }}
                    </td>
                </tr>
            </tbody>
        </table>

        <table v-if="selectedComponent.slots" class="table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="caption-top py-4 text-left">
                Slots
            </caption>
            <thead>
                <tr class="bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Slot</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF10]" v-for="option in selectedComponent.slots">
                    <td class="p-2 border border-slate-700 text-xs">
                        #{{ option.name }}
                    </td>
                    <td class="p-2 border border-slate-700 text-xs">
                        {{ option.description }}
                    </td>
                </tr>
            </tbody>
        </table>

        <table v-if="selectedComponent.emits" class="table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="caption-top py-4 text-left">
                Emits
            </caption>
            <thead>
                <tr class="bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Emit</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF10]" v-for="option in selectedComponent.emits">
                    <td class="p-2 border border-slate-700 text-xs">
                        @{{ option.name }}
                    </td>
                    <td class="p-2 border border-slate-700 text-xs">
                        {{ option.description }}
                    </td>
                </tr>
            </tbody>
        </table>

        <table v-if="selectedComponent.exposed" class="table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="caption-top py-4 text-left">
                {{ translations.overview.exposedMethods[store.lang] }}
            </caption>
            <thead>
                <tr class="bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Method</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF10]" v-for="option in selectedComponent.exposed">
                    <td class="p-2 border border-slate-700 text-xs">
                        {{ option.name }}
                    </td>
                    <td class="p-2 border border-slate-700 text-xs">
                        {{ option.description }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mb-2">{{ translations.overview.basicRendering[store.lang] }}</div>
        <div :class="`w-full mx-auto p-4 bg-white ${selectedComponent.chartSize ? `max-w-[${selectedComponent.chartSize}px]` : ''}`" v-for="example in selectedComponent.examples">
            <VueDataUi :component="selectedComponent.name" :dataset="example.dataset" :config="example.config"/>
        </div>

        <VueDataUi 
            component="VueUiAccordion" 
            v-if="selectedComponent.examples"
            :config="{
                maxHeight: 20000,
                head: {
                    backgroundColor: 'transparent'
                },
                body: {
                    backgroundColor: 'transparent'
                }
            }"
        >
            <template #title>
                {{ translations.overview.viewSampleDataset[store.lang] }}
            </template>
            <template #content>
                <div class="bg-[#272822] p-4 rounded-md">
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const dataset = ref<{{ selectedComponent.types.dataset }}>({{ typeof selectedComponent.examples[0].dataset === 'string' ? `"${selectedComponent.examples[0].dataset}"`: selectedComponent.examples[0].dataset }})
                    </code>
                </div>
            </template>
        </VueDataUi>
    </div>
</template>

<style scoped>
table.schema td {
    text-align:center !important;
}
</style>