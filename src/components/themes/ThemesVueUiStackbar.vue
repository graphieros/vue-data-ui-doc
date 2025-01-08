<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const dataset = ref([
    {
        name: "Serie 1",
        series: [19, 20.07, 30, 40, 50, 60],
    },
    {
        name: "Serie 2",
        series: [13, 8, 9, 13, 25, 27],
    },
    {
        name: "Serie 3",
        series: [13, 10, 9, 13, 25, 19],
    },
    {
        name: "Serie 4",
        series: [25, 23, 9, 13, 25, 31],

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
            <VueUiStackbar :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueUiStackbar :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueUiStackbar :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueUiStackbar :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>