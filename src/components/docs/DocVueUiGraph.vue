<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import DocSnapper from "../DocSnapper.vue";
import useMobile from "../../useMobile";
import { graphTranslations } from "../../translations/graph.js";
import { useMainStore } from "../../stores";
import { useDocConfigState } from "../../useDocConfigState";
import { useConfig } from "../../assets/useConfig";
import { graphDataset, createGraphConfig } from "./graph";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseCard from "../BaseCard.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import DebugHint from "../DebugHint.vue";
import Box from "../Box.vue";
import CodeParser from "../customization/CodeParser.vue";
import VueUiGraphConfigFields from "./configuration/VueUiGraphConfigFields.vue";
import ThemesVueUiGraph from "../themes/ThemesVueUiGraph.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import ComponentEmits from "../ComponentEmits.vue";
import ExposedMethods from "../ExposedMethods.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import BaseAttr from "../BaseAttr.vue";
import { graphLayoutHints } from "../../translations/graphLayout.js";
import { createVueUiGraphConfigFields } from "./configuration/vue-ui-graph-config.js";
import Rater from "../Rater.vue";
const store = useMainStore();
const text = computed(
    () => graphTranslations[store.lang] || graphTranslations.en,
);
const mainConfig = useConfig();
const layoutControls = createVueUiGraphConfigFields()[0].children.find(
    (field) => field.attr === "layout",
).children;
const layoutHints = computed(
    () => graphLayoutHints[store.lang] || graphLayoutHints.en,
);
const isDarkMode = computed(() => store.isDarkMode);
const configState = useDocConfigState(isDarkMode);

const config = computed({
    get: () => configState.get(createGraphConfig(isDarkMode.value, store.lang)),
    set: configState.set,
});

const chart = ref(null);
const { isMobile } = useMobile();
const isFixed = ref(false);

onMounted(() => (store.docSnap = false));
onBeforeUnmount(() => (store.docSnap = false));

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = isFixed.value;
}

function copyToClipboard() {
    const textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.value = JSON.stringify(config.value);
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    store.copy();
}
const datasetCode = `const dataset: VueUiGraphDataset = ${JSON.stringify(graphDataset, null, 4)}`;
const types = `type VueUiGraphId = string | number;
type VueUiGraphNode = {
    id: VueUiGraphId;
    label?: string;
    group?: string | number;
    value?: number;
    color?: string;
    radius?: number;
    x?: number;
    y?: number;
    fixed?: boolean;
    metadata?: unknown;
};
type VueUiGraphLink = {
    source: VueUiGraphId;
    target: VueUiGraphId;
    value?: number;
    color?: string;
    width?: number;
    label?: string;
    directed?: boolean;
    metadata?: unknown;
};
type VueUiGraphDataset = { nodes: VueUiGraphNode[]; links: VueUiGraphLink[] };`;
const tooltipCode = computed(
    () => `tooltip: {
    showMetadata: true,
    customFormat: ({ datapoint, node, connections, config }) => {
        return String(connections ?? 0) + ${JSON.stringify(" " + text.value.connections)};
    }
}`,
);
</script>
<template>
    <BaseDocTitle name="VueUiGraph" />
    <BaseDocDescription
        :text="store.translations.docs.tooltips.graph[store.lang]"
    />
    <BaseDocHeaderActions
        targetLink="vue-ui-graph"
        targetMaker="VueUiGraph"
        :configSource="mainConfig.vue_ui_graph"
    />
    <div class="transition-all mx-auto w-full sm:w-1/2 min-w-[300px]">
        <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="configState.reset()"
            @copyToClipboard="copyToClipboard"
        >
            <BaseCard>
                <VueUiGraph
                    ref="chart"
                    :dataset="graphDataset"
                    :config="config"
                />
            </BaseCard>
        </DocSnapper>
    </div>

    <details
        class="mx-auto mt-4 w-full max-w-[720px] rounded-xl border border-gray-300 dark:border-[#4A4A4A] bg-gray-100 dark:bg-[#242424]"
    >
        <summary class="cursor-pointer px-4 py-2 text-sm">
            {{ text.layoutControlsTitle }}
        </summary>
        <div class="px-4 pb-3">
            <p class="mb-3 text-xs text-gray-600 dark:text-gray-400">
                {{ text.layoutControlsDescription }}
            </p>
            <div
                class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-2 font-jetbrains"
            >
                <BaseAttr
                    v-for="field in layoutControls"
                    :key="field.attr"
                    compact
                    :config="config"
                    :name="field.name"
                    :attr="field.attr"
                    type="range"
                    :min="field.min"
                    :max="field.max"
                    :step="field.step"
                    :defaultVal="field.defaultVal"
                    :tooltip="layoutHints[field.name]"
                    @change="chart?.fitToView()"
                />
            </div>
        </div>
    </details>

    <div class="w-full flex justify-center mt-6">
        <BaseViewExampleButton link="/examples/categories#vue-ui-graph" />
    </div>
    <Rater itemId="vue_ui_graph" />
    <Box
        schema="vue_ui_graph"
        showEmits
        showSlots
        showTooltip
        showThemes
        showResponsive
    >
        <template #dataset>
            <p class="my-4">{{ text.datasetHelp }}</p>
            <CodeParser
                language="typescript"
                :content="types"
                @copy="store.copy()"
            />
            <CodeParser
                language="typescript"
                :content="datasetCode"
                @copy="store.copy()"
            />
        </template>
        <template #configuration>
            <DebugHint component="VueUiGraph" configType="VueUiGraphConfig" />
            <BaseCopyConfig :config="config" @reset="configState.reset()" />
            <p class="my-4">{{ text.arrowsHelp }}</p>
            <VueUiGraphConfigFields :config="config" :context="{}" />
        </template>
        <template #events-and-methods>
            <ComponentEmits
                component="VueUiGraph"
                :names="[
                    'selectNode',
                    'hoverNode',
                    'zoom',
                    'zoomReset',
                    'layoutStart',
                    'layoutEnd',
                    'copyAlt',
                ]"
            />
            <ExposedMethods
                component="VueUiGraph"
                getImage
                :names="[
                    'getData',
                    'zoomIn',
                    'zoomOut',
                    'resetZoom',
                    'fitToView',
                    'focusNode',
                    'resetLayout',
                    'generatePdf',
                    'generateCsv',
                    'generateImage',
                    'generateSvg',
                    'toggleTable',
                    'toggleFullscreen',
                    'toggleZoom',
                    'toggleTooltip',
                    'toggleAnnotator',
                    'copyAlt',
                ]"
            />
        </template>
        <template #slots>
            <BaseSlotDocumenter
                componentName="VueUiGraph"
                :types="[
                    'svg-underlayer',
                    'hint',
                    'node',
                    'svg',
                    'chart-background',
                    'tooltip-before',
                    'tooltip',
                    'tooltip-after',
                    'watermark',
                    'source',
                    'skeleton',
                    'user-menu',
                    'annotator-actions',
                ]"
            />
        </template>
        <template #custom-tooltip
            ><CodeParser language="javascript" :content="tooltipCode"
        /></template>
        <template #themes><ThemesVueUiGraph /></template>
        <template #responsive
            ><ResponsiveUnit height="500px"
                ><template #chart
                    ><VueUiGraph
                        :dataset="graphDataset"
                        :config="{
                            ...config,
                            responsive: true,
                        }" /></template></ResponsiveUnit
        ></template>
    </Box>
</template>
