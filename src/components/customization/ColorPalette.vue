<script setup>
import { ref, computed } from "vue";
import {adaptColorToBackground} from '../maker/lib'
import { useMainStore } from "../../stores";
import { CheckIcon } from "vue-tabler-icons";

const store = useMainStore()
const isCopy = computed(() => store.isCopy);
const translations = computed(() => {
    return store.translations;
})

const palette = ref([
    "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
    "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
    "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939",
    "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39",
    "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b",
    "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
]);

function copyContent(color) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = color;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

</script>

<template>
    
    <div style="z-index:10000000" v-if="isCopy" class="animate-pulse origin-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] w-[80px] flex place-items-center place-content-center border-2 border-gray-400 dark:border-app-green dark:bg-black rounded-full bg-white">
        <CheckIcon size="42" class="dark:text-app-green"/>
    </div>
    <div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 sm:w-1/2 mx-auto mb-12">
        <p class="my-6">{{ translations.customization.palette[store.lang] }}</p>
        <div class="w-full text-left mb-10 p-2 bg-gray-200 dark:bg-[#2A2A2A] rounded-md">
            <code class="text-xs text-left">
                import { getPalette } from "vue-data-ui";<br>
                const palette = getPalette();
            </code>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in palette">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>
    </div>
</template>