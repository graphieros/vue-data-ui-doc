<script setup>
import { ref, onMounted } from "vue";

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

</script>

<template>
    <div class="text-left mt-12 w-5/6 sm:w-1/2 mx-auto mb-12">
        If you prefer not to use the charts' built-in user options menu, but need to create your own:

        <div class="mt-6 text-lg">
            1. Hide the built-in user options menu:
        </div>
        
<pre>
<code>
    const config = ref({
        userOptions: {
            show: false
        },
        ...
    })
</code>
</pre>
        <div class="mt-6 text-lg">
            2. Access exposed methods of the component:
        </div>
<pre>
<code>
    <span class="text-gray-500">// The ref used on the chart component</span>
    const donutChart = ref(null);

    <span class="text-gray-500">// Declare the methods used for the custom menu</span>
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
</code>
</pre>

        <div class="mt-6 text-lg">
            3. Create your own menu (very basic example):
        </div>
<pre>
<code>
    &lt;template&gt;
        &lt;div class="my-menu"&gt;
            &lt;button @click="toggleTooltip"&gt;VIEW TOOLTIP&lt;/button&gt;
            &lt;button @click="generatePdf"&gt;PDF&lt;/button&gt;
            &lt;button @click="generateImage"&gt;IMG&lt;/button&gt;
            &lt;button @click="generateCsv"&gt;CSV&lt;/button&gt;
            &lt;button @click="toggleTable"&gt;VIEW TABLE&lt;/button&gt;
            &lt;button @click="toggleLabels"&gt;VIEW LABELS&lt;/button&gt;
            &lt;button @click="toggleAnnotator"&gt;TOGGLE ANNOTATOR&lt;/button&gt;
        &lt;/div&gt;

        &lt;VueUiDonut
            ref="donutChart"
            :config="config"
            :dataset="dataset"
        /&gt;
    &lt;/template&gt;
</code>
</pre>

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