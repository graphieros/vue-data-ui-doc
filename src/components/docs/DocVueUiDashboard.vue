<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { xyConfig, xyDataset, donutConfig, donutDataset, waffleConfig, waffleDataset, radarConfig, radarDataset, chestnutConfig, chestnutDataset } from "./dash";
import GitHubLink from "../GitHubLink.vue";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocActions from "./BaseDocActions.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const config = ref(
    {
    locked: false,
    style: {
        board: {
            backgroundColor: "#FFFFFF",
            color: "#CCCCCC",
            aspectRatio: "1/1.4141",
            border: "1px solid #e1e5e8"
        },
        item: {
            backgroundColor: "transparent",
            borderColor: "#e1e5e8"
        },
        resizeHandles: {
            backgroundColor: "#42d392",
            border: "none"
        }
    },
        allowPrint: true
    }
)

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

const dashboardComponents = computed(() => {
    return [
        { id: 1, width: 50, height: 25, left: 3, top: 2, component: 'VueUiXy', props: { config: xyConfig, dataset: xyDataset}},
        { id: 2, width: 35, height: 25, left: 62, top: 2, component: 'VueUiDonut', props: { config: donutConfig, dataset: donutDataset}},
        { id: 3, width: 35, height: 33, left: 3, top: 29, component: 'VueUiWaffle', props: { config: waffleConfig, dataset: waffleDataset}},
        { id: 4, width: 55, height: 33, left: 42, top: 31, component: 'VueUiRadar', props: { config: radarConfig, dataset: radarDataset}},
        { id: 5, width: 94, height: 36, left: 3, top: 62, component: 'VueUiChestnut', props: { config: chestnutConfig, dataset: chestnutDataset}},
    ]
});

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="dashboard" stroke="#42d392" :strokeWidth="1.5" />
            VueUiDashboard
        </h1>
        <div class="w-full max-w-[300px] mx-auto text-gray-500 text-center">
            {{ translations.docs.comments.dashboard.p1[store.lang] }}
        </div>

        <Suspense>
            <template #default>
                <VueUiDashboard :dataset="dashboardComponents" :config="mutableConfig" :key="key">
                    <template #content="{ item }">
                        <div style="padding: 12px">
                            <component :is="item.component" v-bind="item.props"/>
                        </div>
                    </template>
                </VueUiDashboard>
            </template>
            <template #fallback>
                <BaseSpinner/>
            </template>
        </Suspense>

        <BaseDocActions
            targetLink="vue-ui-dashboard"
            :configSource="mainConfig.vue_ui_dashboard"
        />

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
        component: 'VueUiDonut',
        props: {
            config: myDonutConfig,
            dataset: myDonutDataset
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
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiDashboardConfig</span> = {
    allowPrint: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.allowPrint" @change="forceChartUpdate()">
    style: {
        board: {
            backgroundColor:  <input type="color" v-model="mutableConfig.style.board.backgroundColor">, (default: "#FFFFFF")
            border:  <input type="text" v-model="mutableConfig.style.board.border">, (default: "1px solid #e1e5e8")
            aspectRatio: <input type="text" v-model="mutableConfig.style.board.aspectRatio">, (default: "1 / 1.4141")
            color: <input type="color" v-model="mutableConfig.style.board.color">, (default: "#2D353C")
        },
        item: {
            backgroundColor:  <input type="color" v-model="mutableConfig.style.item.backgroundColor">, (default: "#FFFFFF")
            borderColor: <input type="color" v-model="mutableConfig.style.item.borderColor">, (default: "#e1e5e8")
        },
        resizeHandles: {
            backgroundColor: <input type="color" v-model="mutableConfig.style.resizeHandles.backgroundColor">, (default: "#2D353C")
        },
    },
}
</code>
</pre>                
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
            </template>
        </Box>
    </div>
</template>

<style>
.vue-ui-dashboard-button {
    padding: 0 12px !important;
}
</style>