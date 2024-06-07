<script setup>
import { ref } from "vue";

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
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiSparkbar" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiSparkbar" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiSparkbar" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiSparkbar" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>