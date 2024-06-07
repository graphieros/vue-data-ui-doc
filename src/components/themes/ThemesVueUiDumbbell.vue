<script setup>
import { ref } from "vue";

const dataset = ref([
    { name: 'Sweden', start: 5000, end: 7100 },
    { name: 'Korea, Rep.', start: 4900, end: 7050 },
    { name: 'Iceland', start: 6500, end: 8000 },
    { name: 'Finland', start: 6400, end: 7600 },
    { name: 'Norway', start: 5400, end: 6050 },
    { name: 'Ireland', start: 3000, end: 2000 }
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
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiDumbbell" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiDumbbell" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiDumbbell" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiDumbbell" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>