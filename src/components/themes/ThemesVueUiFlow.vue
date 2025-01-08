<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const dataset = ref([
    ['A1', 'B1', 10],
    ['A1', 'B2', 10],
    ['B1', 'C1', 5],
    ['B1', 'C2', 5],
    ['B1', 'C3', 5],
    ['B1', 'C4', 5],
    ['A2', 'B1', 10],
    ['B2', 'C5', 10],
    ['C3', 'D1', 2],
    ['C4', 'D1', 2],
    ['C5', 'D1', 2],
    ['C2', 'D2', 2],
    ['C3', 'D2', 1],
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
            <VueDataUi component="VueUiFlow" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiFlow" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiFlow" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiFlow" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>