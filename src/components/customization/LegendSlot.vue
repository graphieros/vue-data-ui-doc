<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCustomizationBox from "./BaseCustomizationBox.vue";
import ComponentsTable from "../docs/ComponentsTable.vue";
import { CheckIcon } from "vue-tabler-icons";
import FlexibleTooltip from "../FlexibleTooltip.vue";
import { useFeatures } from "../../useFeatures";
import { VueUiIcon } from "vue-data-ui";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const { components } = useFeatures();

const translations = computed(() => {
    return store.translations;
})

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
            },
            grid: {
                labels: {
                    yAxis: {
                        scaleMax: 100
                    }
                }
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
                        <div class="absolute -right-[125px] bottom-20 flex flex-col gap-2 p-2 border shadow">
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

    <!-- <div class="flex-1 text-center max-w-[600px] mx-auto">
            {{ translations.customization.legendAllowed[store.lang] }}

            <div class="flex flex-row gap-10 flex-wrap place-items-center justify-center mt-8">
                <FlexibleTooltip
                    v-for="c in components.filter(c => c.legend)"
                    position="bottom"
                    :content="c.name"
                    width="w-fit"
                    delay="delay-150"
                    :always-blue="true"
                >
                    <RouterLink :to="`/docs#${c.link}`">
                        <button
                            class="relative flex place-items-center justify-center p-4 bg-[#FFFFFF10] shadow hover:outline hover:outline-app-blue hover:bg-[#5f8aee20] transition-colors"
                        >
                            <div class="text-[8px] absolute -top-4">{{ c.name }}</div>
                            <VueUiIcon :name="c.icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                        </button>
                    </RouterLink>
                </FlexibleTooltip>
            </div>
        </div> -->

    <div class="mx-auto max-w-[1000px]">
        <p class="my-6 text-center" dir="auto">{{ translations.customization.legendAllowed[store.lang] }}</p>
        <ComponentsTable :cols="['Component', 'Legend']" class="mx-auto">
            <template #th="{ col }">
                {{ col }}
            </template>

            <template #Component="{ row }">
                <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon :name="row.icon" :stroke="isDarkMode ? '#CCCCCC' : '#4A4A4A'" />
                    <RouterLink :to="`/docs#${row.link}`" class="hover:underline">
                        <span class="text-gray-500">VueUi</span><span>{{ row.name.replaceAll("VueUi", "") }}</span>
                    </RouterLink>
                </div>
            </template>

            <template #Legend="{ row }">
                <div class="w-full h-full flex justify-center" :style="{ background: row.legend ? '#42d39230' : 'transparent'}">
                    <CheckIcon v-if="row.legend" :stroke="isDarkMode ? '#42d392': '#1d915d'" />
                </div>
            </template>
        </ComponentsTable>
    </div>

</template>