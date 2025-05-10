<script setup>
import { ref, onMounted } from "vue";
import CodeParser from "./CodeParser.vue";
import { useMainStore } from "../../stores";

const store = useMainStore()

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
    {
        name: 'Serie 4',
        values: [16]
    }
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
})

const donutChart = ref(null)

function generatePdf() {
    donutChart.value.generatePdf();
}

function generateImage() {
    donutChart.value.generateImage();
}

function generateCsv() {
    donutChart.value.generateCsv();
}

function toggleLabels() {
    donutChart.value.toggleLabels();
}

function toggleTable() {
    donutChart.value.toggleTable();
}

function toggleTooltip() {
    donutChart.value.toggleTooltip();
}

function toggleAnnotator() {
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

function toggleLabels() {
    donutChart.value.toggleLabels();
}

function toggleTable() {
    donutChart.value.toggleTable();
}

function toggleTooltip() {
    donutChart.value.toggleTooltip();
}

function toggleAnnotator() {
    donutChart.value.toggleAnnotator();
}
`)

const code2 = ref(`<template>
<div class="my-menu">
    <button @click="toggleTooltip">VIEW TOOLTIP</button>
    <button @click="generatePdf">PDF</button>
    <button @click="generateImage">IMG</button>
    <button @click="generateCsv">CSV</button>
    <button @click="toggleTable">VIEW TABLE</button>
    <button @click="toggleLabels">VIEW LABELS</button>
    <button @click="toggleAnnotator">TOGGLE ANNOTATOR</button>
</div>

<VueUiDonut
    ref="donutChart"
    :config="config"
    :dataset="dataset"
/>
</template>`
)

</script>

<template>
    <div class="text-left mt-12 w-5/6 sm:w-1/2 mx-auto mb-12">
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
        <div class="p-2 my-4 flex flex-row flex-wrap gap-4 bg-gray-300 dark:bg-[#FFFFFF10]">
            <button class="bg-gray-100 dark:bg-[#FFFFFF10] p-2 rounded shadow-md border hover:border-app-green" @click="toggleTooltip">TOGGLE TOOLTIP</button>
            <button class="bg-gray-100 dark:bg-[#FFFFFF10] p-2 rounded shadow-md border hover:border-app-green" @click="toggleLabels">TOGGLE LABELS</button>
            <button class="bg-gray-100 dark:bg-[#FFFFFF10] p-2 rounded shadow-md border hover:border-app-green" @click="toggleTable">TOGGLE TABLE</button>
            <button class="bg-gray-100 dark:bg-[#FFFFFF10] p-2 rounded shadow-md border hover:border-app-green" @click="generatePdf">PDF</button>
            <button class="bg-gray-100 dark:bg-[#FFFFFF10] p-2 rounded shadow-md border hover:border-app-green" @click="generateImage">IMG</button>
            <button class="bg-gray-100 dark:bg-[#FFFFFF10] p-2 rounded shadow-md border hover:border-app-green" @click="generateCsv">CSV</button>
            <button class="bg-gray-100 dark:bg-[#FFFFFF10] p-2 rounded shadow-md border hover:border-app-green" @click="toggleAnnotator">TOGGLE ANNOTATOR</button>
        </div>
        <VueUiDonut ref="donutChart" :dataset="dataset" :config="config"/>
    </div>
</div>
    </div>
    
</template>