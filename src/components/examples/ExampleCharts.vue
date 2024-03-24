<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import TokoTsubo from "./components/TokoTsubo.vue";
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
import DetailedSatisfaction from "./components/DetailedSatisfaction.vue";
import MainStores from "./components/MainStores.vue";
import MarketShare from "./components/MarketShare.vue";
import SalesBar from "./components/SalesBar.vue";
import IceCubes from "./components/IceCubes.vue";

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
const detailedSatisfaction = ref(null);
const detailedSatisfactionDataset = ref(null);
const detailedSatisfactionConfig = ref(null);
const mainStores = ref(null);
const mainStoresDataset = ref(null);
const mainStoresConfig = ref(null);
const marketShare = ref(null);
const marketShareDataset = ref(null);
const marketShareConfig = ref(null);
const salesBar = ref(null);
const salesBarDataset = ref(null);
const salesBarConfig = ref(null);
const iceCubes = ref(null);
const iceCubesDataset = ref(null);
const iceCubesConfig = ref(null);

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
    if(detailedSatisfaction.value) {
        detailedSatisfactionDataset.value = detailedSatisfaction.value.getData().dataset;
        detailedSatisfactionConfig.value = detailedSatisfaction.value.getData().config;
    }
    if(mainStores.value) {
        mainStoresDataset.value = mainStores.value.getData().dataset;
        mainStoresConfig.value = mainStores.value.getData().config;
    }
    if(marketShare.value) {
        marketShareDataset.value = marketShare.value.getData().dataset;
        marketShareConfig.value = marketShare.value.getData().config;
    }
    if(salesBar.value) {
        salesBarDataset.value = salesBar.value.getData().dataset;
        salesBarConfig.value = salesBar.value.getData().config;
    }
    if(iceCubes.value) {
        iceCubesDataset.value = iceCubes.value.getData().dataset;
        iceCubesConfig.value = iceCubes.value.getData().config;
    }
})

</script>

<template>
    <div class="mt-12 flex flex-col gap-6">
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="revenueDonutDataset"
                    :config="revenueDonutConfig"
                    componentName="VueUiDonut"
                    link="vue-ui-donut"
                    id="donut1"
                />
                <RevenueDonut ref="revenueDonut" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="evolutionDataset"
                    :config="evolutionConfig"
                    componentName="VueUiXy"
                    link="vue-ui-xy"
                    id="xy1"
                />
                <ExampleXyEvolutionArea ref="evolutionArea" class="mt-12"/>
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="phoneCallsDataset"
                    :config="phoneCallsConfig"
                    componentName="VueUiXy"
                    link="vue-ui-xy"
                    id="xy2"
                />
                <ExampleXy ref="phoneCalls" class="mt-12"/>
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="revenueBreakDataset"
                    :config="revenueBreakConfig"
                    componentName="VueUiNestedDonuts"
                    link="vue-ui-nested-donuts"
                    id="donut2"
                />
                <RevenueBreakdown ref="revenueBreak" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="customerOsDataset"
                    :config="customerOsConfig"
                    componentName="VueUiWaffle"
                    link="vue-ui-waffle"
                    id="waffle"
                />
                <CustomerOs ref="customerOs" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="sprDataset"
                    :config="sprConfig"
                    componentName="VueUiRadar"
                    link="vue-ui-radar"
                    id="spr"
                />
                <ServicesPerRegion ref="spr" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="temperaturesDataset"
                    :config="temperaturesConfig"
                    componentName="VueUiHeatmap"
                    link="vue-ui-heatmap"
                    id="heat"
                />
                <ParisTemperatures ref="temperatures" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="worldDataset"
                    :config="worldConfig"
                    componentName="VueUiGauge"
                    link="vue-ui-gauge"
                    id="world"
                />
                <WorldSatisfaction ref="world" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="averageOccupancyDataset"
                    :config="averageOccupancyConfig"
                    componentName="VueUiOnion"
                    link="vue-ui-onion"
                    id="averageOcc"
                />
                <AverageOccupancy ref="averageOccupancy" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="worldSalesDataset"
                    :config="worldSalesConfig"
                    componentName="VueUiChestnut"
                    link="vue-ui-chestnut"
                    id="chest"
                />
                <WorldSales ref="worldSales" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="salesProjectionsDataset"
                    :config="salesProjectionsConfig"
                    componentName="VueUiDonutEvolution"
                    link="vue-ui-donut-evolution"
                    id="sales"
                />
                <SalesProjections ref="salesProjections" class="mt-12">
                    <foreignObject
                    :x="58"
                    :y="0"
                    height="80"
                    width="80"
                    style="overflow: visible"
                    >
                    <div style="width:80px;">
                        <DetailedSatisfaction :titleFontSize="8" :subtitleFontSize="8" :value="53.2" title="World" mainTitle="Retail to Service"/>
                    </div>
                </foreignObject>
            </SalesProjections>
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="detailedSatisfactionDataset"
                    :config="detailedSatisfactionConfig"
                    componentName="VueUiWheel"
                    link="vue-ui-wheel"
                    id="wheel"
                />
                <div class="grid grid-cols-2 gap-0 mt-12 place-content-center place-items-center">
                    <div class="w-full max-w-[200px]">
                        <DetailedSatisfaction :value="87.6" title="Europe 2025" :isModel="true" ref="detailedSatisfaction" />
                    </div>
                    <div class="w-full max-w-[200px]">
                        <DetailedSatisfaction :value="83.2" title="America 2025" />
                    </div>
                    <div class="w-full max-w-[200px]">
                        <DetailedSatisfaction :value="72.7" title="Asia 2025" />
                    </div>
                    <div class="w-full max-w-[200px]">
                        <DetailedSatisfaction :value="68.9" title="Africa 2025" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="mainStoresDataset"
                    :config="mainStoresConfig"
                    componentName="VueUiQuadrant"
                    link="vue-ui-quadrant"
                    id="mainStores"
                />
                <MainStores ref="mainStores" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="marketShareDataset"
                    :config="marketShareConfig"
                    componentName="VueUiRings"
                    link="vue-ui-rings"
                    id="marketShare"
                />
                <MarketShare ref="marketShare" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="salesBarDataset"
                    :config="salesBarConfig"
                    componentName="VueUiVerticalBar"
                    link="vue-ui-vertical-bar"
                    id="salesBar"
                />
                <SalesBar ref="salesBar" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <TokoTsubo
                    :dataset="iceCubesDataset"
                    :config="iceCubesConfig"
                    componentName="VueUi3dBar"
                    link="vue-ui-3d-bar"
                    id="cubes"
                />
                <div class="w-full max-w-[200px]">
                    <IceCubes ref="iceCubes" class="mt-12" />
                </div>
            </div>
        </div>
        <!-- <div class="mt-12">
            ... more examples to come
        </div> -->
    </div>
</template>

