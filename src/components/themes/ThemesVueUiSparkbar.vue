<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const dataset = ref([
    {
        name: "quality",
        value: 61.95,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "popularity",
        value: 2.04,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "maintenance",
        value: 33.33,
        rounding: 2,
        suffix: "%"
    },
]);

const config = ref({})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <ThemeTag type="default"/>
            <VueDataUi component="VueUiSparkbar" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiSparkbar" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiSparkbar" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiSparkbar" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>