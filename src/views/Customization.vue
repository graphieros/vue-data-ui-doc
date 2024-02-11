<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
  return store.translations;
})

const xyDataset = ref([
    {
        name: "Series 1",
        series: [-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "line",
        color: "rgb(66,211,146)",
        shape: "circle",
        smooth: true
    }
])

const donutDataset = ref([
    {
        name: "Serie 1",
        color: "#5f8bee",
        values: [100]
    },
    {
        name: "Serie 2",
        color: "#42d392",
        values: [200]
    },
    {
        name: "Serie 1",
        color: "#ff6400",
        values: [300, 1]
    },
]);

const xyConfig = ref({
    chart: {
        zoom: {
            show: false
        },
        userOptions: {
            show: false
        }
    },
})

const donutConfig = ref({
    style: {
        chart: {
            legend: {
                show: false
            },
            title: {
                text: "Donut title"
            }
        }
    },
    userOptions: {
        show: false
    }
})

</script>

<template>
    <div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 sm:w-1/2 mx-auto mb-12">
        <h1 class="text-xl text-app-blue">{{ translations.menu.customization[store.lang] }}</h1>

        <p class="my-6">{{ translations.customization.p1[store.lang] }}</p>
        
        <div class="w-full">
            <p class="text-lg dark:text-app-green">1. {{ translations.customization.comment[store.lang] }}</p>
            <div class="my-6 p-3 w-full bg-gray-200 dark:bg-[#2A2A2A] overflow-auto text-xs md:text-base">
<pre>
<code>
&lt;VueUiXy :dataset="dataset" :config="config"&gt;
    &lt;template #svg="{ svg }"&gt;
        &lt;foreignObject 
            :x="svg.width / 2 - 90" 
            :y="svg.height / 2 - 250" 
            height="100" 
            width="180"
        &gt;
            &lt;div class="bg-gray-100 p-3 shadow"&gt;
                This comment was added in the slot
            &lt;/div&gt;
        &lt;/foreignObject&gt;
    &lt;/template&gt;
&lt;/VueUiXy&gt;
</code>
</pre>            
            </div>
        </div>

        <div class="w-full">
            <VueUiXy :dataset="xyDataset" :config="xyConfig">
                <template #svg="{ svg }">
                    <foreignObject :x="svg.width / 2 - 90" :y="svg.height / 2 - 250" height="100" width="180">
                        <div class="bg-gray-100 p-3 shadow">This comment was added in the slot</div>
                    </foreignObject>
                </template>
            </VueUiXy>
        </div>

        <div class="w-full mt-6">
            <p class="text-lg dark:text-app-green">2. {{ translations.customization.otherChart[store.lang] }}</p>
            <div class="my-6 p-3 w-full bg-gray-200 dark:bg-[#2A2A2A] overflow-auto text-xs md:text-base">
<pre>
<code>
&lt;VueUiXy :dataset="dataset" :config="config"&gt;
    &lt;template #svg&gt;
        &lt;foreignObject 
            :x="50" 
            :y="0" 
            height="250" 
            width="250"
        &gt;
            &lt;div class="w-full"&gt;
                &lt;VueUiDonut 
                    :dataset="donutDataset" 
                    :config="donutConfig"
                /&gt;
            &lt;/div&gt;
        &lt;/foreignObject&gt;
    &lt;/template&gt;
&lt;/VueUiXy&gt;
</code>
</pre> 
            </div>
        </div>
        <div class="w-full">
            <VueUiXy :dataset="xyDataset" :config="xyConfig">
                <template #svg>
                    <foreignObject :x="50" :y="0" height="250" width="250">
                        <div class="w-full">
                            <VueUiDonut :dataset="donutDataset" :config="donutConfig"/>
                        </div>
                    </foreignObject>
                </template>
            </VueUiXy>
        </div>


        <div class="w-full mt-6">
            <p class="text-lg dark:text-app-green">3. {{ translations.customization.arrow[store.lang] }}</p>
            <details>
                <summary class="cursor-pointer">{{ translations.customization.arrowDetails[store.lang]  }}</summary>
                <div class="px-4 py-2 bg-gray-100 dark:bg-[#2A2A2A]">
                    <h5>Props :</h5>
                    <ul class="pl-3">
                        <li><code>markerEnd?: boolean;</code> (default: true)</li>
                        <li><code>markerSize?: number;</code> (default: 10)</li>
                        <li><code>markerStart?: boolean;</code> (default: false)</li>
                        <li><code>stroke?: string;</code> (default: "#2D353C")</li>
                        <li><code>strokeDahsarray?: number;</code> (default: 0)</li>
                        <li><code>strokeLinecap?: "round" | "butt" | "square";</code> (default: "round")</li>
                        <li><code>strokeWidth?: number;</code> (default: 1)</li>
                        <li><code>x1: number;</code> (default: 0)</li>
                        <li><code>x2: number;</code> (default: 0)</li>
                        <li><code>y1: number;</code> (default: 0)</li>
                        <li><code>y2: number;</code> (default: 0)</li>
                    </ul>
                </div>
            </details>
            <div class="my-6 p-3 w-full bg-gray-200 dark:bg-[#2A2A2A] overflow-auto text-xs md:text-base">
                <pre>
<code>
&lt;script setup&gt;
import { Arrow } from "vue-data-ui"
&lt;/script&gt;

&lt;template&gt;
    &lt;VueUiXy :dataset="dataset" :config="config"&gt;
        &lt;template #svg&gt;
            &lt;g&gt;
                &lt;Arrow 
                    :x1="150"
                    :y1="100"
                    :x2="270"
                    :y2="300"
                    :markerSize="20"
                /&gt;
                &lt;foreignObject 
                    :x="100" 
                    :y="100" 
                    height="100" 
                    width="180"
                &gt;
                    &lt;div class="bg-gray-100 p-3 shadow"&gt;
                        Wow this random datapoint is pretty
                    &lt;/div&gt;
                &lt;/foreignObject&gt;
            &lt;/g&gt;
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
&lt;/template&gt;
</code>
</pre> 
                <div class="w-full">
                <VueUiXy :dataset="xyDataset" :config="xyConfig">
                    <template #svg>
                        <g>
                            <Arrow :x1="150" :x2="270" :y1="100" :y2="300" :markerSize="20"/>
                            <foreignObject :x="100" :y="100" height="100" width="180">
                                <div class="bg-gray-100 p-3 shadow">Wow this random datapoint is pretty</div>
                            </foreignObject>
                        </g>
                    </template>
                </VueUiXy>
            </div>
        </div>

    </div>


    </div>

</template>