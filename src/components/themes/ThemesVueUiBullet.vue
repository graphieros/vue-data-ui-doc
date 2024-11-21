<script setup>
import { ref } from "vue";

const dataset = ref({
    value: 85,
    target: 80,
    segments: [
        {
            name: "Low",
            from: 0,
            to: 50,
        },
        {
            name: "Medium",
            from: 50,
            to: 70,
        },
        {
            name: "High",
            from: 70,
            to: 100,
        },
    ],
});
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
            <VueDataUi component="VueUiBullet" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiBullet" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiBullet" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiBullet" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>