<script setup>
import { ref, computed } from "vue";

const dataset = computed(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const arr = [];
    const dsLen = 10;
    const serieLen = days.length;
    for (let i = 0; i < serieLen; i += 1) {
        const values = [];
        for (let j = 0; j < dsLen; j += 1) {
        values.push((i + j * 2))
        }
        arr.push({
            name: `${days[i]}`,
            values
        })
    }
    return arr
});

const config = ref({
    style: {
        layout: {
            dataLabels: {
                xAxis: {
                    values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    fontSize: 18
                },
                yAxis: {
                    fontSize: 18
                }
            }
        },
        title: {
            text: "Title",
            subtitle: {
                text: "Subtitle"
            }
        },
        legend: {
            show: false,
        }
    }
})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiHeatmap" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiHeatmap" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiHeatmap" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiHeatmap" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>