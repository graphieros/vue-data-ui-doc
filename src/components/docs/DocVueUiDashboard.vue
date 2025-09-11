<script setup>
import { ref, computed, watch, nextTick, onMounted, markRaw } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { xyConfig, xyDataset, donutConfig, donutDataset, waffleConfig, waffleDataset, radarConfig, radarDataset, chestnutConfig, chestnutDataset } from "./dash";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseButtonSparkline from "../BaseButtonSparkline.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => store.isDarkMode)

const config = ref({
    locked: false,
    style: {
        board: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            aspectRatio: "1/1.4141",
            border: "1px solid #e1e5e8"
        },
        item: {
            backgroundColor: "transparent",
            borderColor: "#e1e5e8"
        },
        resizeHandles: {
            backgroundColor: "#42d392",
        }
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            annotator: true,
        },
        callbacks: {
            pdf: null,
            img: null,
            annotator: null,
        },
        buttonTitles: {
            pdf: 'Download PDF',
            img: 'Download PNG',
            annotator: 'Toggle annotator'
        },
        print: {
            scale: 2,
            filename: '',
        }
    },
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const sparklineDatasetUsers = computed(() => {
    const arr = [];

    for (let i = 0; i < 31; i += 1) {
        arr.push({
            period: `${i + 1 < 10 ? "0" : ""}${i + 1}-01-2026`,
            value: Math.round(Math.random() * 1000),
        });
    }

    return arr;
});


const sparklineConfigUsers = computed(() => {
    return {
        theme: "",
        responsive: false,
        type: "line",
        downsample: { threshold: 500 },
        style: {
            scaleMax: 1000,
            chartWidth: 290,
            animation: { show: true, animationFrames: 360 },
            fontFamily: "inherit",
            backgroundColor: 'transparent',
            line: { color: "#5f8bee", strokeWidth: 3, smooth: true },
            bar: { borderRadius: 3, color: "#5f8bee" },
            zeroLine: { color: "#2D353C", strokeWidth: 1 },
            plot: { show: true, radius: 8, stroke: "#FFFFFF", strokeWidth: 1 },
            verticalIndicator: {
                show: true,
                strokeWidth: 1.5,
                color: isDarkMode.value ? "#FFFFFF" : "#5f8bee",
                strokeDasharray: 0,
            },
            dataLabel: {
                show: false,
            },
            title: {
                show: false,
            },
            area: { show: true, useGradient: true, opacity: 30, color: "#5f8bee" },
        },
    };
});

const dashboardComponents = computed(() => {
    return [
        { id: 1, width: 50, height: 25, left: 3, top: 2, component: 'VueUiXy', props: { config: xyConfig, dataset: xyDataset}},
        { id: 2, width: 35, height: 25, left: 62, top: 2, component: 'VueUiDonut', props: { config: donutConfig, dataset: donutDataset}},
        { id: 5, width: 94, height: 36, left: 3, top: 28, component: 'VueUiChestnut', props: { config: chestnutConfig, dataset: chestnutDataset}},
        { id: 3, width: 25, height: 7, left: 71, top: 50, component: markRaw(BaseButtonSparkline), props: {
            title: 'Daily users',
            buttonClass: 'bg-gradient-to-bl from-app-blue-light to-app-blue hover:bg-gradient-to-l text-black transition-all',
            popoverClass: 'rounded-b-md py-1 bg-white dark:bg-[#2A2A2A] shadow-md',
            sparklineDataset: sparklineDatasetUsers.value,
            sparklineConfig: sparklineConfigUsers.value,
            openState: true
        }},
        { id: 4, width: 55, height: 33, left: 22, top: 65, component: 'VueUiRadar', props: { config: radarConfig, dataset: radarDataset}},
    ]
});

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiDashboard" />

        <div class="w-full max-w-[300px] mx-auto text-gray-500 text-center">
            {{ translations.docs.comments.dashboard.p1[store.lang] }}
        </div>

        <BaseDocHeaderActions
            targetLink="vue-ui-dashboard"
            :configSource="mainConfig.vue_ui_dashboard"
        />

        <Suspense>
            <template #default>
                <VueUiDashboard :dataset="dashboardComponents" :config="mutableConfig" :key="key">
                    <template #content="{ item }">
                        <div style="padding: 12px; width: 100%; height: 100%">
                            <component :is="item.component" v-bind="item.props"/>
                        </div>
                    </template>
                </VueUiDashboard>
            </template>
            <template #fallback>
                <BaseSpinner/>
            </template>
        </Suspense>

        <Box showEmits showSlots>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiDashboardElement[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    <span class="text-red-500">// {{  translations.docs.comments.dashboard.warning[store.lang] }}</span>
    [
        {
            width: number; (0 to 100)
            height: number; (0 to 100)
            left: number; (0 to 100)
            top: number; (0 to 100)
            component: string; ("VueUiXy", "VueUiDonut"...)
            props: {
                config: object; (the component's config object)
                dataset: object | array; (the component's dataset)
            }
        },
        {...}
    ]
</code>
</pre>                
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiDashboardElement[]</span> = [
    {
        width: 55,
        height: 25,
        left: 3,
        top: 2,
        component: 'VueUiXy',
        props: {
            config: myXyConfig,
            dataset: myXyDataset
        }
    },
    {
        width: 35,
        height: 25,
        left: 62,
        top: 2,
        component: markRaw(MyCustomComponent), // VueUiDashboard supports custom components since v2.8.1
        props: {
            str: 'My custom string'
        }
    }
]
</code>
</pre>                
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiDashboardConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiDashboardConfig" equal>
        <BaseAttr name="locked" attr="locked" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfig" @change="forceChartUpdate()"/>

        <BaseDetails attr="style" :level="1">
            <BaseDetails attr="board" :level="2" title="style.board">
                <BaseAttr name="backgroundColor" attr="style.board.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfig"/>
                <BaseAttr name="color" attr="style.board.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfig"/>
                <BaseAttr name="aspectRatio" attr="style.board.aspectRatio" type="text" defaultVal="1/1.4141" :light="mutableConfig" :dark="mutableConfig"/>
                <BaseAttr name="border" attr="style.board.border" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfig"/>
            </BaseDetails>

            <BaseDetails attr="item" :level="2" title="style.item">
                <BaseAttr name="backgroundColor" attr="style.item.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfig"/>  
                <BaseAttr name="borderColor" attr="style.item.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfig"/>
            </BaseDetails>

            <BaseDetails attr="resizeHandles" :level="2" title="style.resizeHandles">
                <BaseAttr name="backgroundColor" attr="style.resizeHandles.backgroundColor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfig"/>
            </BaseDetails>
        </BaseDetails>

        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfig"/>
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfig" />
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfig"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfig"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfig"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfig"/>
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfig"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfig"/>
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfig"/>
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfig"/>
            </BaseDetails>
            <BaseDetails attr="print" :level="2" title="userOptions.print">
                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfig" comment="Set print quality (higher = larger file)"/>
                <BaseAttr name="filename" attr="userOptions.print.filename" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfig"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>                

            </template>
            <template #tab2>
                <div><code><b>@change</b></code></div>
                <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.dashboard.change[store.lang] }}</div>
                
                <div class="pt-4 border-t border-gray-700 overflow-x-auto"><code><b>toggleLock</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.dashboard.toggleLock[store.lang] }}</div>
            <pre>

<code>
<span class="text-gray-400">&lt;script setup&gt;</span>
    import { ref } from "vue";

    const dashboard = ref(null);

    function toggleLock() {
        dashboard.value.toggleLock();
    }

<span class="text-gray-400">&lt;/script&gt;</span>

<span class="text-gray-400">&lt;template&gt;</span>
    &lt;button @click="toggleLock"&gt;Toggle lock&lt;/button&gt;

    &lt;VueUiDashboard
        ref="dashboard"
        :config="config"
        :dataset="dataset"
    /&gt;
<span class="text-gray-400">&lt;/template&gt;</span>
</code>
</pre>
            </template>
            <template #tab3>
                To display charts on the dashboard, use the #content slot:

<pre>
<code>
    &lt;template&gt;
        &lt;VueUiDashboard :dataset="dataset" :config="config"&gt;
            &lt;template #content="{ item }"&gt;
                &lt;component :is="item.component" v-bind="item.props" /&gt;
            &lt;/template&gt;
        &lt;/VueUiDashboard&gt;
    &lt;/template&gt;
</code>
</pre>                

<br>
Use #top and #bottom slots to add custom content aboveor below the components
<pre>
<code>
    &lt;template&gt;
        &lt;VueUiDashboard :dataset="dataset" :config="config"&gt;
            &lt;template #top="{ item }"&gt;
                &lt;button&gt;My button on top&lt;/button&gt;
            &lt;/template&gt;

            &lt;template #content="{ item }"&gt;
                &lt;component :is="item.component" v-bind="item.props" /&gt;
            &lt;/template&gt;

            &lt;template #bottom="{ item }"&gt;
                Content below
            &lt;/template&gt;
        &lt;/VueUiDashboard&gt;
    &lt;/template&gt;
</code>
</pre>

            </template>
        </Box>
    </div>
</template>

<style>
.vue-ui-dashboard-button {
    padding: 0 12px !important;
}
</style>