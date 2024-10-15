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

</script>

<template>
    <div class="px-4 max-w-[1200px] mx-auto mt-4 mb-8" dir="auto">
        {{ translations.customization.legend[store.lang] }}
    </div>

    <BaseCustomizationBox>
        <template #code>
            <pre>
&lt;template&gt;
    &lt;VueUiXy
        :dataset="dataset"
        :config="config"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            { ... your custom content here }
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
&lt;/template&gt;
</pre>
        </template>
        <template #chart>
            <p class="my-6" dir="auto">{{ translations.customization.legendAllowed[store.lang] }}</p>
            <ul>
                <RouterLink v-for="allowed in allowedComponents" :to="allowed.link">
                    <li class="flex flex-row gap-2 py-1 px-2 rounded text-xs hover:bg-[#5f8bee20]">
                        <VueUiIcon :name="allowed.icon" :size="16" :stroke="isDarkMode ? '#5f8bee' : '#3A3A3A'" />
                        <span>{{ allowed.name }}</span>
                    </li>
                </RouterLink>
            </ul>
        </template>
    </BaseCustomizationBox>

</template>