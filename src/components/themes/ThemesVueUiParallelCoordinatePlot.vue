<script setup>
import { ref } from "vue";

const dataset = ref([
    {
        name: "Series 1",
        shape: "triangle",
        series: [
            {
                name: 'Item 1.1',
                values: [1200, 300, 12, 1.2]
            },
            {
                name: 'Item 1.2',
                values: [1000, 100, 10, 1]
            },
            {
                name: 'Item 1.3',
                values: [-800, 85, 8.5, 0.85]
            },
        ]
    },
    {
        name: "Series 2",
        series: [
            {
                name: 'Item 2.1',
                values: [2300, 230, 23, 2.3]
            },
            {
                name: 'Item 2.2',
                values: [2500, 250, 25, 2.5]
            },
            {
                name: 'Item 2.3',
                values: [2800, 280, 28, 2.8]
            },
        ]
    },
])

const config = ref({
    style: {
        chart: {
            padding: {
                top: 24,
                left: 0,
                right: 0,
                bottom: 36
            },
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            },
            yAxis: {
                labels: {
                    axisNames: ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4'],
                    roundings: [0, 0, 0, 2]
                }
            }
        }
    }
})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiParallelCoordinatePlot" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiParallelCoordinatePlot" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiParallelCoordinatePlot" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiParallelCoordinatePlot" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>