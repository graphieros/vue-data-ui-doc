<script setup>
import { ref, computed, onMounted } from "vue";
import db from "./index.json"
import BaseText from "./BaseText.vue";
import { useMainStore } from "../stores";
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"
import DocLink from "../components/DocLink.vue";
import { CopyIcon } from "vue-tabler-icons";
import CodeParser from "../components/customization/CodeParser.vue";

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

const datasetRefContent = computed(() => {
    return `const dataset = ref<${selectedComponent.value.types.dataset}>(${typeof selectedComponent.value.examples[0].dataset === 'string' ? `${selectedComponent.value.examples[0].dataset}` : JSON.stringify(selectedComponent.value.examples[0].dataset, null, 2)})`
})

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
                <button title="Copy" class="text-[#6A6A6A] absolute right-4 top-4" @click="copyContent"><CopyIcon/></button>
<pre>
<code class="text-xs" ref="codeContent">
&lt;<span class="code-html">script</span> <span class="code-attr">setup</span><span v-if="isTs"> <span class="code-attr">lang</span>=<span class="code-string">"ts"</span></span>&gt;
    <span class="code-key">import</span> { <span class="code-attr">ref</span> } <span class="code-key">from</span> <span class="code-string">"vue"</span>;<span v-if="isTs">
    <span class="code-key">import</span> <span v-pre>{
        </span><span class="code-attr">VueDataUi</span>,<span v-if="selectedComponent.types.dataset.replace(excl1, '').replace(excl2, '').replace(excl3, '').replace(excl4, '').replace(excl5, '').length">
        <span class="code-key">type</span> <span class="code-attr">{{ selectedComponent.types.dataset.replace(excl1, '').replace(excl2, '').replace(excl3, '').replace(excl4, '').replace(excl5, '') }}</span>, 
        </span><span class="code-key">type</span> <span class="code-attr">{{ selectedComponent.types.config }}</span> <span v-pre>
    }</span> <span class="code-key">from</span> <span class="code-string">"vue-data-ui"</span>;
    <span class="code-key">import</span> <span class="code-string">"vue-data-ui/style.css"</span>;
    </span>
    <span v-if="!isTs"><span class="code-key">import</span> { <span class="code-attr">VueDataUi</span> } <span class="code-key">from</span> <span class="code-string">"vue-data-ui"</span>;
    <span class="code-key">import</span> <span class="code-string">"vue-data-ui/style.css"</span>;
    </span>
    <span class="code-html">const</span> <span class="code-attr">dataset</span> = <span class="code-fn">ref</span><span v-if="isTs"><<span class="code-type">{{ selectedComponent.types.dataset.includes('[]') ? selectedComponent.types.dataset.replace('[]', '') : selectedComponent.types.dataset}}</span><span>{{ selectedComponent.types.dataset.includes('[]') ? '[]' : '' }}</span>></span>();
    <span class="code-html">const</span> <span class="code-attr">config</span> = <span class="code-fn">ref</span><span v-if="isTs"><<span class="code-type">{{ selectedComponent.types.config }}</span>></span>();
&lt;/<span class="code-html">script</span>&gt;

&lt;<span class="code-html">template</span>&gt;
    &lt;<span class="code-html">VueDataUi</span>
        <span class="code-attr">component</span>="<span class="code-string">{{ selectedComponent.name }}</span>"
        :<span class="code-attr">dataset</span>="<span class="code-attr">dataset</span>"
        :<span class="code-attr">config</span>="<span class="code-attr">config</span>"
    /&gt;
&lt;/<span class="code-html">template</span>&gt;
</code>
</pre>
            </div>

        </div>

        <table class="schema table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="caption-top py-4 text-left">
                {{ translations.overview.features[store.lang] }}
            </caption>
            <thead>
                <tr class="bg-[#FFFFFF80] dark:bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">{{ translations.overview.themes[store.lang] }}</th>
                    <th class="border border-slate-600 p-2">Slots</th>
                    <th class="border border-slate-600 p-2">Emits</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.exposedMethods[store.lang] }}</th>
                    <th class="border border-slate-600 p-2">Responsive<sup v-if="!hideDisclaimer">1</sup></th>
                </tr>

            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF60] dark:bg-[#FFFFFF10]">
                    <td class="p-2 border border-slate-600">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.hasThemes ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.hasThemes ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-600">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.hasSlots ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.hasSlots ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-600">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.hasEmits ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.hasEmits ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-600">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="selectedComponent.hasExposed ? 'circleCheck' : 'circleCancel'" :stroke="selectedComponent.hasExposed ? '#42d392' : '#ff6400'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-600">
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

        <div v-if="selectedComponent.hasLttb" class="mt-6 bg-[#42d39230] dark:bg-[#42d39210] py-2 px-4 border-l-2 border-app-green font-black" dir="auto">
            {{ translations.lttb[store.lang] }}
        </div>

        <table v-if="selectedComponent.userOptions" class="table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="caption-top py-4 text-left">
                {{ translations.overview.userOptions[store.lang] }}
            </caption>
            <thead>
                <tr class="bg-[#FFFFFF80] dark:bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">{{ translations.overview.icon[store.lang] }}</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF60] dark:bg-[#FFFFFF10]" v-for="option in selectedComponent.userOptions">
                    <td class="p-2 border border-slate-600">
                        <div class="w-full flex justify-center">
                            <VueUiIcon :name="option.icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                        </div>
                    </td>
                    <td class="p-2 border border-slate-600 text-xs">
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
                <tr class="bg-[#FFFFFF80] dark:bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Slot</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF60] dark:bg-[#FFFFFF10]" v-for="option in selectedComponent.slots">
                    <td class="p-2 border border-slate-600 text-xs dark:bg-[#1A1A1A]">
                        <code>#{{ option.name }}</code>
                    </td>
                    <td class="p-2 border border-slate-600 text-xs">
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
                <tr class="bg-[#FFFFFF80] dark:bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Emit</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF60] dark:bg-[#FFFFFF10]" v-for="option in selectedComponent.emits">
                    <td class="p-2 border border-slate-600 text-xs dark:bg-[#1A1A1A]">
                        <code>@{{ option.name }}</code>
                    </td>
                    <td class="p-2 border border-slate-600 text-xs">
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
                <tr class="bg-[#FFFFFF80] dark:bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Method</th>
                    <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-[#FFFFFF60] dark:bg-[#FFFFFF10]" v-for="option in selectedComponent.exposed">
                    <td class="p-2 border border-slate-600 text-xs dark:bg-[#1A1A1A]">
                        <code>{{ option.name }}</code>
                    </td>
                    <td class="p-2 border border-slate-600 text-xs">
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
                <CodeParser
                    language="typescript"
                    :content="datasetRefContent"
                    @copy="store.copy()"
                />
            </template>
        </VueDataUi>
    </div>
</template>

<style scoped>
table.schema td {
    text-align:center !important;
}

.code-key {
    color: #B37BAE;
}

.code-html {
    color: #559AD3;
}

.code-attr {
    color: #9cdcfe;
}

.code-string {
    color: #CD9077;
}

.code-fn {
    color: #DCDCAA;
}

.code-type {
    color: #4dc6ae;
}
</style>