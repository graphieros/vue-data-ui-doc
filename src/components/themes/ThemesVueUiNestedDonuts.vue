<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const dataset = ref([
    {
        name: "Group 1",
        series: [
            {
                name: 'Serie 1',
                values: [50]
            },
            {
                name: 'Serie 2',
                values: [30]
            },
            {
                name: 'Serie 3',
                values: [20]
            },
        ]
    },
    {
        name: "Group 2",
        series: [
            {
                name: 'Serie 1',
                values: [40]
            },
            {
                name: 'Serie 2',
                values: [40]
            },
            {
                name: 'Serie 3',
                values: [30]
            },
        ]
    },
])

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
            <VueDataUi component="VueUiNestedDonuts" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiNestedDonuts" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiNestedDonuts" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiNestedDonuts" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>