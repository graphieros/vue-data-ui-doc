<script setup>
import { ref, computed, onMounted } from "vue";
import db from "./index.json"
import BaseText from "./BaseText.vue";
import { useMainStore } from "../stores";
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"
import DocLink from "../components/DocLink.vue";

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

</script>

<template>
    <div class="schema p-4 w-full max-w-[600px]">
        <div class="mb-4">
            <VueUiIcon :name="selectedComponent.icon" :stroke="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
        </div>
        <div class="mb-4">
            <BaseText :label="translations.overview.component[store.lang]" :text="`${selectedComponent.name}`" />
            <BaseText :label="translations.overview.description[store.lang]" :text="selectedComponent.description" />
            <BaseText v-if="selectedComponent.props.includes('dataset')" label="Dataset TS type" isCode :text="selectedComponent.types.dataset" />
            <BaseText v-if="selectedComponent.props.includes('dataset')" label="Config TS type" isCode :text="selectedComponent.types.config" />
            <div class="mt-8">
                <DocLink :to="selectedComponent.path.replace('/docs#', '')"/>
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
                </tr>
            </tbody>
        </table>

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
                <code class="language-javascript" style="white-space: pre-wrap; background: transparent">
                    const dataset = ref<{{ selectedComponent.types.dataset }}>({{ typeof selectedComponent.examples[0].dataset === 'string' ? `"${selectedComponent.examples[0].dataset}"`: selectedComponent.examples[0].dataset }})
                </code>
            </template>
        </VueDataUi>
    </div>
</template>

<style scoped>
table.schema td {
    text-align:center !important;
}
</style>