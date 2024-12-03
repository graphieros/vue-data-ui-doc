<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCustomizationBox from "./BaseCustomizationBox.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
    return store.translations;
})

const allowedComponents = ref([
    { name: "VueUiAgePyramid", icon: 'chartAgePyramid', link: '/docs#vue-ui-age-pyramid' },
    { name: "VueUiCandlestick", icon: 'chartCandlestick', link: '/docs#vue-ui-candlestick' },
    { name: "VueUiChestnut", icon: 'chartChestnut', link: '/docs#vue-ui-chestnut' },
    { name: "VueUiDonut", icon: 'chartDonut', link: '/docs#vue-ui-donut' },
    { name: "VueUiDonutEvolution", icon: 'chartDonutEvolution', link: '/docs#vue-ui-donut-evolution' },
    { name: "VueUiDumbbell", icon: 'chartDumbbell', link: '/docs#vue-ui-dumbbell' },
    { name: "VueUiGauge", icon: 'chartGauge', link: '/docs#vue-ui-gauge' },
    { name: "VueUiMoodRadar", icon: 'chartMoodRadar', link: '/docs#vue-ui-mood-radar' },
    { name: "VueUiNestedDonuts", icon: 'chartNestedDonuts', link: '/docs#vue-ui-nested-donuts' },
    { name: "VueUiOnion", icon: 'chartOnion', link: '/docs#vue-ui-onion' },
    { name: "VueUiParallelCoordinatePlot", icon: "chartParallelCoordinatePlot", link: '/docs#vue-ui-parallel-coordinate-plot' },
    { name: "VueUiQuadrant", icon: 'chartQuadrant', link: '/docs#vue-ui-quadrant' },
    { name: "VueUiQuickChart", icon: 'vueDataUi', link: '/docs#vue-ui-quick-chart' },
    { name: "VueUiRadar", icon: 'chartRadar', link: '/docs#vue-ui-radar' },
    { name: "VueUiRings", icon: 'chartRings', link: '/docs#vue-ui-rings' },
    { name: "VueUiScatter", icon: 'chartScatter', link: '/docs#vue-ui-scatter' },
    { name: "VueUiVerticalBar", icon: 'chartBar', link: '/docs#vue-ui-vertical-bar' },
    { name: "VueUiWaffle", icon: 'chartWaffle', link: '/docs#vue-ui-waffle' },
    { name: 'VueUiXy', icon: 'chartLine', link: '/docs#vue-ui-xy' },
    { name: 'VueUiXyCanvas', icon: 'chartLine', link: '/docs#vue-ui-xy-canvas' },
])

function makeDs({n, m, type, name, smooth=false}) {
    let series = [];
    for(let i = 0; i < n; i += 1) {
        series.push(Math.random() * m);
    }
    return {
        series,
        name,
        type,
        smooth
    }
}

const dataset = computed(() => {
    return [
        makeDs({ n: 12, m: 100, type: 'line', name: 'Serie 1', smooth: false }),
        makeDs({ n: 12, m: 90, type: 'bar', name: 'Serie 2', smooth: false }),
        makeDs({ n: 12, m: 80, type: 'bar', name: 'Serie 3', smooth: false }),
    ]
})

const config = computed(() => {
    return {
        chart: {
            padding: {
                bottom: 6,
            },
            legend: {
                show: false
            },
            userOptions: {
                position: 'left'
            }
        }
    }
})

</script>

<template>
    <div class="px-4 max-w-[1200px] mx-auto mt-4 mb-8" dir="auto">
        {{ translations.customization.legend[store.lang] }}
    </div>

    <BaseCustomizationBox>
        <template #code>
            <pre>
&lt;script setup&gt;
    import { computed, ref } from "vue";

    const config = computed(() => {
        return {
            chart: {
                padding: {
                    bottom: 6,
                },
                legend: {
                    show: false
                },
                userOptions: {
                    position: 'left'
                }
            }
        }
    })

    const dataset = ref([]);

&lt;/script&gt;

&lt;template&gt;
    &lt;div class="pr-[140px] bg-white"&gt;
        &lt;VueUiXy
            :dataset="dataset"
            :config="config"
        &gt;
            &lt;template #legend="{ legend }"&gt;
                &lt;div class="absolute -right-[125px] bottom-20 flex flex-col gap-2 p-2 border"&gt;
                    &lt;div
                        v-for="datapoint in legend"
                        class="flex flex-row gap-2 place-items-center"
                        @click="datapoint.segregate()"
                        :style="{
                            opacity: datapoint.isSegregated ? 0.5 : 1,
                            cursor: 'pointer'
                        }"
                    &gt;
                        &lt;div
                            :style="{
                                backgroundColor: datapoint.color,
                                height: '16px',
                                width: '48px'
                            }"
                        &gt;
                            <span v-pre>{{ datapoint.name }}</span>
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/template&gt;
        &lt;/VueUiXy&gt;
    &lt;/div&gt;
&lt;/template&gt;
</pre>
        </template>
        <template #chart>
            <div class="pr-[140px] bg-white">
                <VueUiXy
                    :dataset="dataset"
                    :config="config"
                >
                    <template #legend="{ legend }">
                        <div class="absolute -right-[125px] bottom-20 flex flex-col gap-2 p-2 border">
                            <div 
                                v-for="datapoint in legend"
                                class="flex flex-row gap-2 place-items-center"
                                @click="datapoint.segregate()"
                                :style="{
                                    opacity: datapoint.isSegregated ? 0.5 : 1,
                                    cursor: 'pointer'
                                }"
                            >
                                <div
                                    :style="{
                                        backgroundColor: datapoint.color,
                                        height: '16px',
                                        width: '48px'
                                    }"
                                />
                                {{ datapoint.name }}
                            </div>
                        </div>
                    </template>
                </VueUiXy>
            </div>
        </template>

    </BaseCustomizationBox>
    <div class="mx-auto max-w-[1000px]">
        <p class="my-6" dir="auto">{{ translations.customization.legendAllowed[store.lang] }}</p>
            <ul>
                <RouterLink v-for="allowed in allowedComponents" :to="allowed.link">
                    <li class="flex flex-row gap-2 py-1 px-2 rounded text-xs hover:bg-[#5f8bee20]">
                        <VueUiIcon :name="allowed.icon" :size="16" :stroke="isDarkMode ? '#5f8bee' : '#3A3A3A'" />
                        <span>{{ allowed.name }}</span>
                    </li>
                </RouterLink>
            </ul>
    </div>

</template>