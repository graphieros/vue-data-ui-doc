<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import ExampleXy from "./components/ExampleXy.vue";
import ExampleXyEvolutionArea from "./components/ExampleXyEvolutionArea.vue";
import RevenueDonut from "./components/RevenueDonut.vue";
import RevenueBreakdown from "./components/RevenueBreakdown.vue";
import CustomerOs from "./components/CustomerOs.vue";
import ServicesPerRegion from "./components/ServicesPerRegion.vue";
import ParisTemperatures from "./components/ParisTemperatures.vue";
import WorldSatisfaction from "./components/WorldSatisfaction.vue";
import AverageOccupancy from "./components/AverageOccupancy.vue";
import WorldSales from "./components/WorldSales.vue";
import SalesProjections from "./components/SalesProjections.vue";
import Grabber from "./Grabber.vue";

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const revenueDonut = ref(null);
const revenueDonutDataset = ref(null);
const revenueDonutConfig = ref(null);
const evolutionArea = ref(null);
const evolutionDataset = ref(null);
const evolutionConfig = ref(null);
const phoneCalls = ref(null);
const phoneCallsConfig = ref(null);
const phoneCallsDataset = ref(null);
const revenueBreak = ref(null);
const revenueBreakDataset = ref(null);
const revenueBreakConfig = ref(null);
const customerOs = ref(null);
const customerOsConfig = ref(null);
const customerOsDataset = ref(null);
const spr = ref(null);
const sprDataset = ref(null);
const sprConfig = ref(null);
const temperatures = ref(null);
const temperaturesConfig = ref(null);
const temperaturesDataset = ref(null);
const world = ref(null);
const worldConfig = ref(null);
const worldDataset = ref(null);
const averageOccupancy = ref(null);
const averageOccupancyDataset = ref(null);
const averageOccupancyConfig = ref(null);
const worldSales = ref(null);
const worldSalesDataset = ref(null);
const worldSalesConfig = ref(null);
const salesProjections = ref(null);
const salesProjectionsDataset = ref(null);
const salesProjectionsConfig = ref(null);

onMounted(() => {
    if(revenueDonut.value) {
        revenueDonutDataset.value = revenueDonut.value.getData().dataset;
        revenueDonutConfig.value = revenueDonut.value.getData().config;
    }
    if(evolutionArea.value) {
        evolutionDataset.value = evolutionArea.value.getData().dataset;
        evolutionConfig.value = evolutionArea.value.getData().config;
    }
    if(phoneCalls.value) {
        phoneCallsDataset.value = phoneCalls.value.getData().dataset;
        phoneCallsConfig.value = phoneCalls.value.getData().config;
    }
    if(revenueBreak.value) {
        revenueBreakDataset.value = revenueBreak.value.getData().dataset;
        revenueBreakConfig.value = revenueBreak.value.getData().config;
    }
    if(customerOs.value) {
        customerOsDataset.value = customerOs.value.getData().dataset;
        customerOsConfig.value = customerOs.value.getData().config;
    }
    if(spr.value) {
        sprDataset.value = spr.value.getData().dataset;
        sprConfig.value = spr.value.getData().config;
    }
    if(temperatures.value) {
        temperaturesDataset.value = temperatures.value.getData().dataset;
        temperaturesConfig.value = temperatures.value.getData().config;
    }
    if(world.value) {
        worldDataset.value = world.value.getData().dataset;
        worldConfig.value = world.value.getData().config;
    }
    if(averageOccupancy.value) {
        averageOccupancyDataset.value = averageOccupancy.value.getData().dataset;
        averageOccupancyConfig.value = averageOccupancy.value.getData().config;
    }
    if(worldSales.value) {
        worldSalesDataset.value = worldSales.value.getData().dataset;
        worldSalesConfig.value = worldSales.value.getData().config;
    }
    if(salesProjections.value) {
        salesProjectionsDataset.value = salesProjections.value.getData().dataset;
        salesProjectionsConfig.value = salesProjections.value.getData().config;
    }
})

</script>

<template>
    <div class="mt-12 flex flex-col gap-6">
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="revenueDonutDataset" :dataset="revenueDonutDataset" :config="revenueDonutConfig" componentName="VueUiDonut" id="donut1"/>
                <RevenueDonut ref="revenueDonut" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="evolutionDataset" :dataset="evolutionDataset" :config="evolutionConfig" componentName="VueUiXy" id="xy1"/>
                <ExampleXyEvolutionArea ref="evolutionArea" class="mt-12"/>
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="phoneCallsDataset" :dataset="phoneCallsDataset" :config="phoneCallsConfig" componentName="VueUiXy" id="xy2"/>
                <ExampleXy ref="phoneCalls" class="mt-12"/>
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="revenueBreakDataset" :dataset="revenueBreakDataset" :config="revenueBreakConfig" componentName="VueUiNestedDonuts" id="donut2"/>
                <RevenueBreakdown ref="revenueBreak" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="customerOsDataset" :dataset="customerOsDataset" :config="customerOsConfig" componentName="VueUiWaffle" id="waffle"/>
                <CustomerOs ref="customerOs" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="sprDataset" :dataset="sprDataset" :config="sprConfig" componentName="VueUiRadar" id="spr"/>
                <ServicesPerRegion ref="spr" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="temperaturesDataset" :dataset="temperaturesDataset" :config="temperaturesConfig" componentName="VueUiHeatmap" id="heat"/>
                <ParisTemperatures ref="temperatures" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="worldDataset" :dataset="worldDataset" :config="worldConfig" componentName="VueUiGauge" id="world"/>
                <WorldSatisfaction ref="world" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="averageOccupancyDataset" :dataset="averageOccupancyDataset" :config="averageOccupancyConfig" componentName="VueUiOnion" id="averageOcc"/>
                <AverageOccupancy ref="averageOccupancy" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="worldSalesDataset" :dataset="worldSalesDataset" :config="worldSalesConfig" componentName="VueUiChestnut" id="chest"/>
                <WorldSales ref="worldSales" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <Grabber v-if="salesProjectionsDataset" :dataset="salesProjectionsDataset" :config="salesProjectionsConfig" componentName="VueUiDonutEvolution" id="sales"/>
                <SalesProjections ref="salesProjections" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                ... more examples to come
            </div>
        </div>
        <!-- <div class="mt-12">
            ... more examples to come
        </div> -->
    </div>
</template>