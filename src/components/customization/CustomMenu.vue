<script setup>
import { ref, onMounted, computed } from "vue";
import CodeParser from "./CodeParser.vue";
import { useMainStore } from "../../stores";
import BaseCard from "../BaseCard.vue";
import BaseButton from "../Base/BaseButton.vue";

const store = useMainStore()

const isDarkMode = computed(() => store.isDarkMode);

const dataset = ref([
    {
        name: 'Serie 1',
        values: [128]
    },
    {
        name: 'Serie 2',
        values: [64]
    },
    {
        name: 'Serie 3',
        values: [32]
    },
]);

const config = ref({
    userOptions: {
        show: false
    },
    style: {
        chart: {
            layout: {
                curvedMarkers: true,
                donut: {
                    strokeWidth: 64
                }
            },
            title: {
                text: 'Title',
                subtitle: {
                    text: 'Subtitle'
                }
            }
        }
    }
});

const donutChart = ref(null);

function generatePdf() {
    donutChart.value.generatePdf();
}

function generateImage() {
    donutChart.value.generateImage();
}

function generateCsv() {
    donutChart.value.generateCsv();
}

const areLabelsEnabled = ref(true);
function toggleLabels() {
    areLabelsEnabled.value = !areLabelsEnabled.value;
    donutChart.value.toggleLabels();
}

const isTableOpen = ref(false);
function toggleTable() {
    isTableOpen.value = !isTableOpen.value;
    donutChart.value.toggleTable();
}

const isTooltipEnabled = ref(true);
function toggleTooltip() {
    isTooltipEnabled.value = !isTooltipEnabled.value;
    donutChart.value.toggleTooltip();
}

const isAnnotatorOpen = ref(false);
function toggleAnnotator() {
    isAnnotatorOpen.value = !isAnnotatorOpen.value;
    donutChart.value.toggleAnnotator();
}


const code0 = ref(`const config = ref({
    userOptions: {
        show: false
    },
    // Rest of your config
})`
)

const code1 = ref(`// The ref used on the chart component
const donutChart = ref(null);

// Use your own dark/light theme detection
const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode);

// VueUiDonut dataset
const dataset = ref([
    {
        name: 'Serie 1',
        values: [128]
    },
    {
        name: 'Serie 2',
        values: [64]
    },
    {
        name: 'Serie 3',
        values: [32]
    },
]);

// Basic VueUiDonut config
const config = ref({
    userOptions: {
        show: false
    },
    style: {
        chart: {
            layout: {
                curvedMarkers: true,
                donut: {
                    strokeWidth: 64
                }
            },
            title: {
                text: 'Title',
                subtitle: {
                    text: 'Subtitle'
                }
            }
        }
    }
});

// Declare the methods used for the custom menu
function generatePdf() {
    donutChart.value.generatePdf();
}

function generateImage() {
    donutChart.value.generateImage();
}

function generateCsv() {
    donutChart.value.generateCsv();
}

// To render different icons depending on the labels state
const areLabelsEnabled = ref(true);

function toggleLabels() {
    areLabelsEnabled.value = !areLabelsEnabled.value;
    donutChart.value.toggleLabels();
}

// To render different icons depending on the table state
const isTableOpen = ref(false);
function toggleTable() {
    isTableOpen.value = !isTableOpen.value;
    donutChart.value.toggleTable();
}

// To render different icons depending on the tooltip state
const isTooltipEnabled = ref(false);

function toggleTooltip() {
    isTooltipEnabled.value = !isTooltipEnabled.value;
    donutChart.value.toggleTooltip();
}

// To render different icons depending on the annotator state
const isAnnotatorOpen = ref(false);
function toggleAnnotator() {
    isAnnotatorOpen.value = !isAnnotatorOpen.value;
    donutChart.value.toggleAnnotator();
}

// Assuming tailwind css is used
const commonButtonStyle = 'bg-gray-50 dark:bg-[#2A2A2A] hover:bg-white dark:hover:bg-[#1A1A1A] transition-colors';
`)

const code2 = ref(`<template>
    <!-- Assuming you alreeady have a card and a button components -->
    <BaseCard class="mb-2 w-fit mx-auto">
        <div class="flex flex-row flex-wrap">
            <BaseButton @click="toggleTooltip" :size="12" padding="p-3" tw="rounded-r-[0px]" :color="commonButtonStyle" tooltip="Show tooltip">
                <VueUiIcon :name="isTooltipEnabled ? 'tooltip' : 'tooltipDisabled'" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
            </BaseButton>

            <BaseButton @click="toggleLabels" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Show labels">
                <VueUiIcon :name="areLabelsEnabled ? 'labelOpen' : 'labelClose'" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
            </BaseButton>

            <BaseButton @click="toggleTable" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Toggle data table">
                <VueUiIcon :name="isTableOpen ? 'tableOpen' : 'tableClose'" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
            </BaseButton>

            <BaseButton @click="generatePdf" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Download PDF">
                <VueUiIcon name="pdf" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
            </BaseButton>

            <BaseButton @click="generateImage" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Download PNG">
                <VueUiIcon name="image" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
            </BaseButton>

            <BaseButton @click="generateCsv" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Download CSV">
                <VueUiIcon name="csv" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
            </BaseButton>

            <BaseButton @click="toggleAnnotator" :size="12" padding="p-3" tw="rounded-l-[0]" :color="commonButtonStyle" tooltip="Toggle annotator">
                <VueUiIcon :name="isAnnotatorOpen ? 'annotator' : 'annotatorDisabled'" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
            </BaseButton>
        </div>
    </BaseCard>

    <BaseCard type="light">
        <VueUiDonut ref="donutChart" :dataset="dataset" :config="config"/>
    </BaseCard>
</template>`
)

const commonButtonStyle = 'bg-gray-50 dark:bg-[#2A2A2A] hover:bg-white dark:hover:bg-[#1A1A1A] transition-colors';

</script>

<template>
    <div class="text-left mt-12 w-5/6 mx-auto mb-12 max-w-[1200px]">
        If you prefer not to use the charts' built-in user options menu, but need to create your own:

        <div class="mt-6 text-lg">
            1. Hide the built-in user options menu:
        </div>

        <div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
            <CodeParser :content="code0" language="javascript" @copy="store.copy()"/>
        </div>
        
        <div class="mt-6 text-lg">
            2. Access exposed methods of the component:
        </div>

        <div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
            <CodeParser :content="code1" language="javascript" @copy="store.copy()"/>
        </div>
        <div class="mt-6 text-lg">
            3. Create your own menu (very basic example):
        </div>

        <div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
            <CodeParser :content="code2" language="html" @copy="store.copy()"/>
        </div>

<div class="p-4 bg-gray-200 dark:bg-[#FFFFFF10]">
    Example:
    <div class="w-full">
        <BaseCard class="mb-2 w-fit mx-auto">
            <div class="flex flex-row flex-wrap">
                <BaseButton @click="toggleTooltip" :size="12" padding="p-3" tw="rounded-r-[0px]" :color="commonButtonStyle" tooltip="Show tooltip">
                    <VueUiIcon :name="isTooltipEnabled ? 'tooltip' : 'tooltipDisabled'" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
                </BaseButton>

                <BaseButton @click="toggleLabels" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Show labels">
                    <VueUiIcon :name="areLabelsEnabled ? 'labelOpen' : 'labelClose'" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
                </BaseButton>

                <BaseButton @click="toggleTable" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Toggle data table">
                    <VueUiIcon :name="isTableOpen ? 'tableOpen' : 'tableClose'" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
                </BaseButton>

                <BaseButton @click="generatePdf" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Download PDF">
                    <VueUiIcon name="pdf" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
                </BaseButton>

                <BaseButton @click="generateImage" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Download PNG">
                    <VueUiIcon name="image" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
                </BaseButton>

                <BaseButton @click="generateCsv" :size="12" padding="p-3" tw="rounded-[0]" :color="commonButtonStyle" tooltip="Download CSV">
                    <VueUiIcon name="csv" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
                </BaseButton>

                <BaseButton @click="toggleAnnotator" :size="12" padding="p-3" tw="rounded-l-[0]" :color="commonButtonStyle" tooltip="Toggle annotator">
                    <VueUiIcon :name="isAnnotatorOpen ? 'annotator' : 'annotatorDisabled'" :stroke="isDarkMode ? '#83a4f2' : '#3456a3'"/>
                </BaseButton>
            </div>
        </BaseCard>

        <BaseCard type="light">
            <VueUiDonut ref="donutChart" :dataset="dataset" :config="config"/>
        </BaseCard>
    </div>
</div>
    </div>
    
</template>