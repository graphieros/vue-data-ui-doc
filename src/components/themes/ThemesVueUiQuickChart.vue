<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const quickDatasetDonut = ref([
    {
        name: 'serie1',
        value: 20,
    },
    {
        name: 'Serie 2',
        value: 10,
    },
    {
        name: 'Serie 3',
        value: 5,
    },
    {
        name: 'Serie 4',
        value: 2,
    },
    {
        name: 'Serie 5',
        value: 1,
    },
]);

const quickDatasetLine = ref([
    {
        name: 'Serie1',
        values: [1, 2, 3, 2, 3, 4, 3, 4, 5]
    },
    {
        name: 'Serie2',
        values: [5, 6, 7, 6, 7, 8, 7, 8, 9]
    },
    {
        name: 'Serie3',
        values: [1, 2, 3, 5, 8, 13, 21, 13, 8]
    },
])

const config = ref({
})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <ThemeTag type="default"/>
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetLine" :config="{...config, theme: ''}" />
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetDonut" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetLine" :config="{...config, theme: 'zen'}" />
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetDonut" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetLine" :config="{...config, theme: 'concrete'}" />
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetDonut" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetLine" :config="{...config, theme: 'hack'}" />
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetDonut" :config="{...config, theme: 'hack'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="celebration"/>
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetLine" :config="{...config, theme: 'celebration'}" />
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetDonut" :config="{...config, theme: 'celebration'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="celebrationNight"/>
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetLine" :config="{...config, theme: 'celebrationNight'}" />
            <VueDataUi component="VueUiQuickChart" :dataset="quickDatasetDonut" :config="{...config, theme: 'celebrationNight'}" />
        </div>
    </div>
</template>