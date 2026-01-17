<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { BrandGithubFilledIcon } from "vue-tabler-icons";
import CodeParser from "./customization/CodeParser.vue";
import SUMMER1 from "../assets/treemap/summer1.png"
import SUMMER2 from "../assets/treemap/summer2.png"
import SUMMER3 from "../assets/treemap/summer3.png"
import SUMMER4 from "../assets/treemap/summer4.png"

import SPRING1 from "../assets/treemap/spring1.png"
import SPRING2 from "../assets/treemap/spring2.png"
import SPRING3 from "../assets/treemap/spring3.png"

import FALL1 from "../assets/treemap/fall1.png"
import FALL2 from "../assets/treemap/fall2.png"
import FALL3 from "../assets/treemap/fall3.png"

import WINTER1 from "../assets/treemap/winter1.png"
import WINTER2 from "../assets/treemap/winter2.png"
import WINTER3 from "../assets/treemap/winter3.png"

const store = useMainStore()
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const dataset = computed(() => {
    return [
        {
        name: "Summer",
        value: 100,
        children: [
            { name: "P1 C1", value: 233, url: SUMMER1 },
            { name: "P1 C2", value: 144, url: SUMMER2 },
            { name: "P1 C3", value: 89, url: SUMMER3 },
            { name: "P1 C4", value: 55, url: SUMMER4 },
        ],
        },
        {
            name: "Spring",
            value: 110,
            color: '#ff7f0e',
            children: [
                { name: "P2 C1", value: 80, url: SPRING1 },
                { name: "P2 C2", value: 20, url: SPRING2 },
                { name: "P2 C3", value: 10, url: SPRING3 },
            ],
        },
        {
            name: "Fall",
            value: 90,
            color: '#ff7f0e',
            children: [
                { name: "P2 C1", value: 50, url: FALL1 },
                { name: "P2 C2", value: 25, url: FALL2 },
                { name: "P2 C3", value: 15, url: FALL3 },
            ],
        },
        {
            name: "Winter",
            value: 120,
            color: '#ff7f0e',
            children: [
                { name: "P2 C1", value: 50, url: WINTER1 },
                { name: "P2 C2", value: 40, url: WINTER2 },
                { name: "P2 C3", value: 30, url: WINTER3 },
            ],
        },
    ];
});



</script>

<template>
    <div class="flex flex-col gap-4 treem">
        <VueDataUi component="VueUiTreemap" :dataset="dataset" :config="config">
        <template #rect="{ rect }">
                <div :style="{ width: '100%', height: '100%' }" xmlns="http://www.w3.org/1999/xhtml">
                    <img :src="rect.url" style="width: 100%; height: 100%; object-fit: cover;" 
                    
                    />
                </div>
        </template>
        </VueDataUi>
    </div>
</template>

<style>
    .treem .vue-ui-treemap-cell {
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
    }
</style>
