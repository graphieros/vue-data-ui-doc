<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import ExampleButton from "../components/examples/ExampleButton.vue";
import ExampleSpark from "../components/examples/ExampleSpark.vue";
import ExampleCharts from "../components/examples/ExampleCharts.vue";

const store = useMainStore();
const translations = computed(() => store.translations);
const lang = computed(() => store.lang);
const isDarkMode = computed(() => store.isDarkMode);
const currentMenu = ref('mini')

</script>

<template>
    <div class="max-w-[1280px] px-12 2xl:px-4 mx-auto relative my-12">
        <h1 class="flex flex-row gap-4 place-items-center justify-center text-3xl text-center mb-12">
            <img src="../assets/logo.png" class="h-6">
            {{ translations.menu.examples[lang] }}
        </h1>
        <div class="flex gap-4 place-items-center justify-center">
            <ExampleButton @click="currentMenu = 'mini'" :selected="currentMenu === 'mini'" :isDarkMode="isDarkMode">
                {{ translations.sideMenu.miniCharts[lang] }}
            </ExampleButton>
            <ExampleButton @click="currentMenu = 'charts'" :selected="currentMenu === 'charts'" :isDarkMode="isDarkMode">
                {{ translations.sideMenu.charts[lang] }}
            </ExampleButton>
        </div>

        <ExampleSpark v-if="currentMenu === 'mini'"/>
        <ExampleCharts v-if="currentMenu === 'charts'" />
    </div>
</template>