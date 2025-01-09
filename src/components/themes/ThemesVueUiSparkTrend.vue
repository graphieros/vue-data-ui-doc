<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const positiveDs = ref([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
const neutralDs = ref([10, 10, 10, 10, 10, 10, 10, 10, 10])
const negativeDs = ref([89, 55, 34, 21, 13, 8, 5, 3, 2, 1])

const config = ref({})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <ThemeTag type="default"/>
            <VueDataUi component="VueUiSparkTrend" :dataset="positiveDs" :config="{...config, theme: ''}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="neutralDs" :config="{...config, theme: ''}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="negativeDs" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiSparkTrend" :dataset="positiveDs" :config="{...config, theme: 'zen'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="neutralDs" :config="{...config, theme: 'zen'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="negativeDs" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiSparkTrend" :dataset="positiveDs" :config="{...config, theme: 'concrete'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="neutralDs" :config="{...config, theme: 'concrete'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="negativeDs" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiSparkTrend" :dataset="positiveDs" :config="{...config, theme: 'hack'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="neutralDs" :config="{...config, theme: 'hack'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="negativeDs" :config="{...config, theme: 'hack'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="celebration"/>
            <VueDataUi component="VueUiSparkTrend" :dataset="positiveDs" :config="{...config, theme: 'celebration'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="neutralDs" :config="{...config, theme: 'celebration'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="negativeDs" :config="{...config, theme: 'celebration'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="celebrationNight"/>
            <VueDataUi component="VueUiSparkTrend" :dataset="positiveDs" :config="{...config, theme: 'celebrationNight'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="neutralDs" :config="{...config, theme: 'celebrationNight'}" />
            <VueDataUi component="VueUiSparkTrend" :dataset="negativeDs" :config="{...config, theme: 'celebrationNight'}" />
        </div>
    </div>
</template>