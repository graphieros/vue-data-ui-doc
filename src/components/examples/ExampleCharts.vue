<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import ExampleXy from "./components/ExampleXy.vue";
import ExampleXyEvolutionArea from "./components/ExampleXyEvolutionArea.vue";
import RevenueDonut from "./components/RevenueDonut.vue";
import RevenueBreakdown from "./components/RevenueBreakdown.vue";
import Grabber from "./Grabber.vue";

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const revenueDonut = ref(null);
const revenueDonutDataset = ref(null);
const revenueDonutConfig = ref(null);

onMounted(() => {
    if(revenueDonut.value) {
        revenueDonutDataset.value = revenueDonut.value.getData().dataset;
        revenueDonutConfig.value = revenueDonut.value.getData().config;
    }
})

</script>

<template>
    <div class="mt-12 flex flex-col gap-6">
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <RevenueDonut ref="revenueDonut" />
                <Grabber v-if="revenueDonutDataset" :dataset="revenueDonutDataset" :config="revenueDonutConfig" componentName="VueUiDonut"/>
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <ExampleXyEvolutionArea />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <ExampleXy />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md">
                <RevenueBreakdown />
            </div>
        </div>
        <div class="mt-12">
            ... more examples to come
        </div>
    </div>
</template>