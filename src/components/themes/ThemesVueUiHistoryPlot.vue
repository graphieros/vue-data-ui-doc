<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const dataset = ref([
    {
        name: "Series 1",
        values: [
            { x: 355, y: 2.3, label: "January" },
            { x: 112, y: 1.2, label: "February" },
            { x: 313, y: 0.4, label: "March" },
            { x: 555, y: 1.2, label: "April" },
        ],
    },
    {
        name: "Series 2",
        values: [
            { x: 1000, y: 2, label: "January" },
            { x: 655, y: 4, label: "February" },
            { x: 350, y: 3, label: "March" },
            { x: 815, y: 2.5, label: "April" },
        ],
    },
]);

const config = ref({
    style: {
        chart: {
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
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
            <VueDataUi component="VueUiHistoryPlot" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiHistoryPlot" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiHistoryPlot" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiHistoryPlot" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>