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
import DetailedSatisfaction from "./components/DetailedSatisfaction.vue";
import MainStores from "./components/MainStores.vue";
import MarketShare from "./components/MarketShare.vue";
import SalesBar from "./components/SalesBar.vue";
import IceCubes from "./components/IceCubes.vue";
import MakerLink from "../MakerLink.vue";
import DocLink from "../DocLink.vue";
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
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiDonut" size="py-1 px-4"/>
                    <DocLink to="vue-ui-donut" size="py-1 px-4"/>
                    <Grabber v-if="revenueDonutDataset" :dataset="revenueDonutDataset" :config="revenueDonutConfig" componentName="VueUiDonut" id="donut1"/>
                </div>
                <RevenueDonut ref="revenueDonut" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiXy" size="py-1 px-4"/>
                    <DocLink to="vue-ui-xy" size="py-1 px-4"/>
                    <Grabber v-if="evolutionDataset" :dataset="evolutionDataset" :config="evolutionConfig" componentName="VueUiXy" id="xy1"/>
                </div>
                <ExampleXyEvolutionArea ref="evolutionArea" class="mt-12"/>
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiXy" size="py-1 px-4"/>
                    <DocLink to="vue-ui-xy" size="py-1 px-4"/>
                    <Grabber v-if="phoneCallsDataset" :dataset="phoneCallsDataset" :config="phoneCallsConfig" componentName="VueUiXy" id="xy2"/>
                </div>
                <ExampleXy ref="phoneCalls" class="mt-12"/>
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiNestedDonuts" size="py-1 px-4"/>
                    <DocLink to="vue-ui-nested-donuts" size="py-1 px-4"/>
                    <Grabber v-if="revenueBreakDataset" :dataset="revenueBreakDataset" :config="revenueBreakConfig" componentName="VueUiNestedDonuts" id="donut2"/>
                </div>
                <RevenueBreakdown ref="revenueBreak" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiWaffle" size="py-1 px-4"/>
                    <DocLink to="vue-ui-waffle" size="py-1 px-4"/>
                    <Grabber v-if="customerOsDataset" :dataset="customerOsDataset" :config="customerOsConfig" componentName="VueUiWaffle" id="waffle"/>
                </div>
                <CustomerOs ref="customerOs" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiRadar" size="py-1 px-4"/>
                    <DocLink to="vue-ui-radar" size="py-1 px-4"/>
                    <Grabber v-if="sprDataset" :dataset="sprDataset" :config="sprConfig" componentName="VueUiRadar" id="spr"/>
                </div>
                <ServicesPerRegion ref="spr" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-center" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiHeatmap" size="py-1 px-4"/>
                    <DocLink to="vue-ui-heatmap" size="py-1 px-4"/>
                    <Grabber v-if="temperaturesDataset" :dataset="temperaturesDataset" :config="temperaturesConfig" componentName="VueUiHeatmap" id="heat"/>
                </div>
                <ParisTemperatures ref="temperatures" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiGauge" size="py-1 px-4"/>
                    <DocLink to="vue-ui-gauge" size="py-1 px-4"/>
                    <Grabber v-if="worldDataset" :dataset="worldDataset" :config="worldConfig" componentName="VueUiGauge" id="world"/>
                </div>
                <WorldSatisfaction ref="world" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiOnion" size="py-1 px-4"/>
                    <DocLink to="vue-ui-onion" size="py-1 px-4"/>
                    <Grabber v-if="averageOccupancyDataset" :dataset="averageOccupancyDataset" :config="averageOccupancyConfig" componentName="VueUiOnion" id="averageOcc"/>
                </div>
                <AverageOccupancy ref="averageOccupancy" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-center" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiChestnut" size="py-1 px-4"/>
                    <DocLink to="vue-ui-chestnut" size="py-1 px-4"/>
                    <Grabber v-if="worldSalesDataset" :dataset="worldSalesDataset" :config="worldSalesConfig" componentName="VueUiChestnut" id="chest"/>
                </div>
                <WorldSales ref="worldSales" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiDonutEvolution" size="py-1 px-4"/>
                    <DocLink to="vue-ui-donut-evolution" size="py-1 px-4"/>
                    <Grabber v-if="salesProjectionsDataset" :dataset="salesProjectionsDataset" :config="salesProjectionsConfig" componentName="VueUiDonutEvolution" id="sales"/>
                </div>
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
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiWheel" size="py-1 px-4"/>
                    <DocLink to="vue-ui-wheel" size="py-1 px-4"/>
                    <Grabber v-if="detailedSatisfactionDataset" :dataset="detailedSatisfactionDataset" :config="detailedSatisfactionConfig" componentName="VueUiWheel" id="wheel"/>
                </div>
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
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiQuadrant" size="py-1 px-4"/>
                    <DocLink to="vue-ui-quadrant" size="py-1 px-4"/>
                    <Grabber v-if="mainStoresDataset" :dataset="mainStoresDataset" :config="mainStoresConfig" componentName="VueUiQuadrant" id="mainStores"/>
                </div>
                <MainStores ref="mainStores" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiRings" size="py-1 px-4"/>
                    <DocLink to="vue-ui-rings" size="py-1 px-4"/>
                    <Grabber v-if="marketShareDataset" :dataset="marketShareDataset" :config="marketShareConfig" componentName="VueUiRings" id="marketShare"/>
                </div>
                <MarketShare ref="marketShare" class="mt-12" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap sm:flex-nowrap gap-6">
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUiVerticalBar" size="py-1 px-4"/>
                    <DocLink to="vue-ui-vertical-bar" size="py-1 px-4"/>
                    <Grabber v-if="salesBarDataset" :dataset="salesBarDataset" :config="salesBarConfig" componentName="VueUiVerticalBar" id="salesBar"/>
                </div>
                <SalesBar ref="salesBar" class="mt-12" />
            </div>
            <div class="w-full sm:w-1/2 bg-white dark:bg-[#2A2A2A] p-6 rounded-md shadow-md flex flex-col place-items-center justify-center relative">
                <div class="absolute top-[24px] left-[24px] w-full flex flex-row gap-2 justify-between" style="width:calc(100% - 48px)">
                    <MakerLink to="VueUi3dBar" size="py-1 px-4"/>
                    <DocLink to="vue-ui-3d-bar" size="py-1 px-4"/>
                    <Grabber v-if="iceCubesDataset" :dataset="iceCubesDataset" :config="iceCubesConfig" componentName="VueUi3dBar" id="cubes"/>
                </div>
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

