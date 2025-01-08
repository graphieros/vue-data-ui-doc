<script setup>
import { ref } from "vue";
import BaseTag from "../BaseTag.vue";
import ThemeTag from "../ThemeTag.vue";

const dataset = ref([
    {
        name: 'Serie 1',
        series: [13, 25, 29, 22, 18, 33, 16, 32, 12, 8, 23, 29],
        type: 'bar',
        dataLabels: true
    },
    {
        name: 'Serie 2',
        series: [8, 25, 13, 29, 31, 42, 23, 29, 12, 44, 13, 20],
        type: 'line',
        dataLabels: true
    }
])

const config = ref({ // TODO
    bar: {
        labels: {
            show: true,
        }
    },
    line: {
        strokeWidth: 4
    },
    chart: {
        title: {
            text: "Title",
            subtitle: {
                text: "Subtitle"
            }
        },
        padding: {
            bottom: 36,
        },
        labels: {
            fontSize: 24
        },
        grid: {
            labels: {
                fontSize: 24,
                xAxisLabels: {
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                    fontSize: 24
                }
            }
        }
    }
})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <ThemeTag type="default"/>
            <VueDataUi component="VueUiXy" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiXy" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiXy" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiXy" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>