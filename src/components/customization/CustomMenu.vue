<script setup>
import { ref, computed } from "vue";

    
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
    const generatePdf = ref(() => {});
    const generateImage = ref(() => {});
    const generateCsv = ref(() => {});
    const toggleTable = ref(() => {});
    const toggleLabels = ref(() => {});

    <span class="text-gray-500">// When the component is mounted, assign the exposed methods</span>
    onMounted(() => {
        generatePdf.value = donutChart.value.generatePdf;
        generateImage.value = donutChart.value.generateImage;
        generateCsv.value = donutChart.value.generateCsv;
        toggleTable.value = donutChart.value.toggleTable;
        toggleLabels.value = donutChart.value.toggleLabels;
    })
</code>
</pre>

        <div class="mt-6 text-lg">
            3. Create your own menu (very basic example):
        </div>
<pre>
<code>
    &lt;template&gt;
        &lt;div class="my-menu"&gt;
            &lt;button @click="generatePdf"&gt;PDF&lt;/button&gt;
            &lt;button @click="generateImage"&gt;IMG&lt;/button&gt;
            &lt;button @click="generateCsv"&gt;CSV&lt;/button&gt;
            &lt;button @click="toggleTable"&gt;VIEW TABLE&lt;/button&gt;
            &lt;button @click="toggleLabels"&gt;VIEW LABELS&lt;/button&gt;
        &lt;/div&gt;

        &lt;VueUiDonut
            ref="donutChart"
            :config="config"
            :dataset="dataset"
        /&gt;
    &lt;/template&gt;
</code>
</pre>
    </div>
    
</template>