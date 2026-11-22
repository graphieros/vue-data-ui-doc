<script setup>
import { computed, nextTick, ref, useId, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import VueUiGraph from "vue-data-ui/vue-ui-graph";
import { getVueDataUiConfig } from "vue-data-ui/utils";
import { useMainStore } from "../../stores";
import { CONFIG_COMPONENTS } from "../../assets/useConfig.js";
import { useImportMap } from "../../useImportMap.js";
import { docLoaders } from "./registry.js";
import ConfigSnippet from "./ConfigSnippet.vue";
import BaseAutoComplete from "../Base/BaseAutoComplete.vue";
import BaseDropdown from "../BaseDropdown.vue";
import BaseCard from "../BaseCard.vue";
import { useIconMap } from "../../useIconMap.js";
import {
    configSnippet,
    configSnippetRows,
    createConfigGraph,
    configBreadcrumbs,
    configBranch,
} from "./configExplorer.js";
import {
    explorerQuery,
    sameExplorerQuery,
} from "./configExplorerNavigation.js";
import { configExplorerTranslations } from "../../translations/configExplorer.js";

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const controlId = useId();
const text = computed(
    () =>
        configExplorerTranslations[store.lang] || configExplorerTranslations.en,
);
const components = Object.keys(docLoaders)
    .map((name) => name.replace(/^Docs?/, ""))
    .filter((name) => name.startsWith("VueUi"))
    .map((name) => ({
        name,
        icon: useIconMap(name),
        key: useImportMap(name)?.importName?.replaceAll("-", "_"),
    }))
    .filter(({ key }) => CONFIG_COMPONENTS.includes(key))
    .sort((a, b) => a.name.localeCompare(b.name));
const component = ref("vue_ui_xy");
const selectedId = ref("[]");
const graphChart = ref(null);
const json = ref(false);
const blockZoomPan = ref(false);
const branchOnly = ref(true);
const graph = computed(() =>
    createConfigGraph(getVueDataUiConfig(component.value)),
);
const properties = computed(() => [...graph.value.properties.values()]);
const selected = computed(
    () => graph.value.properties.get(selectedId.value) || properties.value[0],
);
const breadcrumbs = computed(() => configBreadcrumbs(selected.value.id));
const graphDataset = computed(() =>
    branchOnly.value
        ? configBranch(graph.value.dataset, selected.value.id)
        : graph.value.dataset,
);
// Reusing the graph retains the previous branch's coordinates. A fresh instance
// gives selections the same initial layout and framing as their shared URL.
const graphKey = computed(() =>
    JSON.stringify([component.value, branchOnly.value, selectedId.value]),
);
const propertyQuery = ref("");
const propertyPaths = computed(() => properties.value.map(({ path }) => path));
watch(
    selected,
    (property) => {
        propertyQuery.value = property.path;
    },
    { immediate: true, flush: "sync" },
);
let focusingNode = false;
function focusGraphNode(id) {
    // focusNode also emits selectNode; avoid recentering recursively.
    if (focusingNode) return;
    focusingNode = true;
    try {
        // Match initial-load framing instead of retaining a previous manual zoom.
        graphChart.value?.fitToView?.();
        graphChart.value?.focusNode?.(id);
    } finally {
        focusingNode = false;
    }
}
function selectProperty(path) {
    const property = properties.value.find(
        (property) => property.path === path,
    );
    if (property) {
        selectedId.value = property.id;
        focusGraphNode(property.id);
    }
}
const snippet = computed(() => configSnippet(selected.value.value, json.value));
const snippetRows = computed(() =>
    configSnippetRows(selected.value.value, selected.value.id, json.value),
);
function selectSnippetRow(id) {
    const property = graph.value.properties.get(id);
    if (property) selectProperty(property.path);
}
const drillUpLevels = computed(() => JSON.parse(selected.value.id).length);
const canDrillUp = computed(() => drillUpLevels.value > 0);
function drillUp() {
    if (!canDrillUp.value) return;
    const parentId = JSON.stringify(JSON.parse(selected.value.id).slice(0, -1));
    selectProperty(graph.value.properties.get(parentId).path);
}
watch(
    component,
    () => {
        selectedId.value = "[]";
    },
    { flush: "sync" },
);

function selectNode(node) {
    selectedId.value =
        node && graph.value.properties.has(node.id) ? node.id : "[]";
    propertyQuery.value = selected.value.path;
    if (node && graph.value.properties.has(node.id)) focusGraphNode(node.id);
}
function labelGraph() {
    graphChart.value?.$el
        ?.querySelector(".vue-ui-graph-svg")
        ?.setAttribute("aria-label", text.value.graphLabel);
}
function focusSelection() {
    labelGraph();
    if (selectedId.value !== "[]") focusGraphNode(selectedId.value);
}
function resetGraphView() {
    graphChart.value?.fitToView?.();
}

let applyingRoute = false;
let routeSelection = "";
function selectionSignature() {
    return JSON.stringify([
        component.value,
        selectedId.value,
        json.value,
        branchOnly.value,
    ]);
}
watch(
    () => route.query,
    (query) => {
        applyingRoute = true;
        try {
            const entry = components.find(
                ({ key, name }) =>
                    key === query.component || name === query.component,
            );
            component.value = entry?.key || "vue_ui_xy";
            selectedId.value =
                properties.value.find(({ path }) => path === query.property)
                    ?.id || "[]";
            json.value = query.json === "1";
            branchOnly.value = query.branch !== "0";
            routeSelection = selectionSignature();
        } finally {
            applyingRoute = false;
        }
        void nextTick(() => {
            if (graphChart.value) focusSelection();
        });
    },
    { immediate: true, flush: "sync" },
);
watch(
    [component, selectedId, json, branchOnly],
    () => {
        if (applyingRoute || routeSelection === selectionSignature()) return;
        const query = explorerQuery(route.query, {
            component: component.value,
            path: selected.value.path,
            json: json.value,
            branch: branchOnly.value,
        });
        if (!sameExplorerQuery(query, route.query)) void router.push({ query });
    },
    { flush: "post" },
);

const graphConfig = computed(() => ({
    theme: "dark",
    responsive: true,
    a11y: {
        translations: { keyboardNavigation: text.value.keyboardNavigation },
    },
    viewport: { fitOnResize: true, fitOnUpdate: true },
    style: {
        chart: {
            backgroundColor: "transparent",
            color: "#CCCCCC",
            height: 560,
            width: 680,
            padding: 32,
            nodes: {
                minRadius: 3,
                maxRadius: 9,
                gradient: false,
                stroke: "#1A1A1A",
                selected: { stroke: "#FFFFFF" },
                labels: {
                    color: "#CCCCCC",
                    fontSize: 10,
                    maxCount: graphDataset.value.nodes.length,
                    maxLength: 32,
                },
            },
            links: {
                opacity: 1,
                color: "#4A4A4A",
                pulses: {
                    show: true,
                    radius: 1,
                },
            },
            controls: { show: false },
        },
    },
    layout: {
        linkDistance: 36,
        chargeStrength: -45,
        collisionPadding: 4,
        iterations: 350,
    },
    interaction: {
        drag: { enabled: false },
        zoom: {
            enabled: !blockZoomPan.value,
            fitOnDoubleClick: !blockZoomPan.value,
            max: 12,
        },
        pan: { enabled: !blockZoomPan.value },
        highlight: { dimOpacity: 0.3 },
    },
    // Use SVG hit testing for every config size. With dragging disabled, the
    // per-node pointer-capture path can retarget clicks to the SVG and deselect.
    performance: { nodeBatchThreshold: 0 },
    animation: { enabled: false },
    tooltip: { show: false },
    userOptions: { show: false },
}));
</script>

<template>
    <section class="config-explorer" aria-labelledby="config-explorer-title">
        <div class="explorer-panels">
            <BaseCard class="explorer-detail" padding="p-0">
                <div class="explorer-component">
                    <label :for="`${controlId}-component`">{{
                        text.component
                    }}</label>
                    <BaseDropdown
                        :id="`${controlId}-component`"
                        v-model:value="component"
                        :options="components"
                        option-target="key"
                        additional-option-target="name"
                        :search-label="text.searchComponent"
                        :clear-search-label="text.clearSearch"
                    >
                        <template #selected="{ selectedOption }">
                            <div
                                v-if="selectedOption"
                                class="flex items-center gap-2 text-start text-sm"
                            >
                                <VueUiIcon
                                    :name="selectedOption.icon"
                                    :size="20"
                                    stroke="#5f8aee"
                                />
                                <span>{{ selectedOption.name }}</span>
                            </div>
                        </template>
                        <template #option="{ option, selected, current }">
                            <div
                                class="flex items-center gap-2 text-start text-sm"
                            >
                                <VueUiIcon
                                    :name="option.icon"
                                    :size="20"
                                    :stroke="
                                        selected || current
                                            ? '#FFFFFF'
                                            : store.isDarkMode
                                              ? '#CCCCCC'
                                              : '#1A1A1A'
                                    "
                                />
                                <span>{{ option.name }}</span>
                            </div>
                        </template>
                    </BaseDropdown>
                </div>
                <div class="explorer-property">
                    <label :for="`${controlId}-property`">{{
                        text.property
                    }}</label>
                    <div class="explorer-property-controls">
                        <BaseAutoComplete
                            :key="component"
                            v-model="propertyQuery"
                            :items="propertyPaths"
                            :input-id="`${controlId}-property`"
                            :placeholder="text.searchProperty"
                            :maximum-suggestions="30"
                            :no-results-text="text.noProperties"
                            show-on-empty
                            select-on-focus
                            @select="selectProperty"
                        />
                        <button
                            type="button"
                            class="explorer-drill-up transition-all"
                            :disabled="!canDrillUp"
                            :aria-label="`${text.drillUp}. ${text.levelsToRoot.replace('{count}', drillUpLevels.toLocaleString(store.lang))}`"
                            @click="drillUp"
                        >
                            <VueUiIcon
                                name="arrowTop"
                                :size="16"
                                :stroke="
                                    store.isDarkMode ? '#CCCCCC' : '#3456a3'
                                "
                                aria-hidden="true"
                            />
                            {{ text.drillUp }}
                            <span
                                v-if="drillUpLevels > 0"
                                class="explorer-depth-badge font-inter-bold shadow-md"
                                aria-hidden="true"
                                >{{
                                    drillUpLevels.toLocaleString(store.lang)
                                }}</span
                            >
                        </button>
                    </div>
                </div>
                <div class="explorer-code-controls">
                    <label class="explorer-json-toggle">
                        <input v-model="json" type="checkbox" />
                        <span>{{ text.json }}</span>
                    </label>
                </div>
                <nav
                    class="explorer-breadcrumbs"
                    :aria-label="text.breadcrumbs"
                >
                    <template
                        v-for="(crumb, index) in breadcrumbs"
                        :key="crumb.id"
                    >
                        <span v-if="index" aria-hidden="true">›</span>
                        <button
                            type="button"
                            :aria-current="
                                crumb.id === selected.id
                                    ? 'location'
                                    : undefined
                            "
                            @click="selectSnippetRow(crumb.id)"
                        >
                            {{ crumb.label }}
                        </button>
                    </template>
                </nav>
                <div class="explorer-code">
                    <ConfigSnippet
                        :rows="snippetRows"
                        :content="snippet"
                        :copy-label="text.copyCode"
                        @select="selectSnippetRow"
                    />
                </div>
            </BaseCard>
            <BaseCard
                class="explorer-map"
                background-color="bg-black"
                padding="p-0"
            >
                <div class="explorer-graph-controls">
                    <label class="explorer-navigation-toggle">
                        <input v-model="blockZoomPan" type="checkbox" />
                        <span>{{ text.blockZoomPan }}</span>
                    </label>
                    <label class="explorer-navigation-toggle">
                        <input v-model="branchOnly" type="checkbox" />
                        <span>{{ text.branchOnly }}</span>
                    </label>
                    <button
                        type="button"
                        class="explorer-reset"
                        @click="resetGraphView"
                    >
                        <VueUiIcon
                            name="refresh"
                            :size="16"
                            :stroke="store.isDarkMode ? '#CCCCCC' : '#3456a3'"
                            aria-hidden="true"
                        />
                        {{ text.resetView }}
                    </button>
                </div>
                <div class="explorer-chart">
                    <VueUiGraph
                        :key="graphKey"
                        ref="graphChart"
                        :dataset="graphDataset"
                        :config="graphConfig"
                        @select-node="selectNode"
                        @vue:mounted="labelGraph"
                        @vue:updated="labelGraph"
                        @layout-end="focusSelection"
                    />
                </div>
                <p v-if="!blockZoomPan" class="explorer-map-help">
                    {{ text.help }}
                </p>
            </BaseCard>
        </div>
    </section>
</template>

<style scoped>
.config-explorer {
    --explorer-surface: #f3f4f6;
    --explorer-muted: #6b7280;
    flex: 1;
    min-height: 0;
}
.dark .config-explorer {
    --explorer-surface: #2a2a2a;
    --explorer-muted: #9ca3af;
}
.explorer-map-help {
    color: var(--explorer-muted);
    font-size: 13px;
    line-height: 1.6;
}
label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    font-size: 12px;
    font-weight: 600;
}
.explorer-component {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding: 16px 16px 0;
}
.explorer-component :deep(.dropdown),
.explorer-component :deep(.dropdown-button),
.explorer-component :deep(.dropdown-options),
.explorer-component :deep(.dropdown-options ul) {
    width: 100% !important;
}
.explorer-component :deep(.dropdown-button) {
    border: 0;
}
.explorer-property {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding: 16px;
}
.explorer-property-controls {
    display: flex;
    align-items: center;
    gap: 12px;
}
.explorer-property :deep(.autocomplete) {
    flex: 1;
    min-width: 0;
}
.explorer-property-controls .explorer-drill-up {
    align-self: stretch;
    flex-shrink: 0;
}
.explorer-property :deep(.input),
.explorer-property :deep(.suggestions) {
    font-family: "JetBrainsMono", monospace;
}
.explorer-property :deep(.input) {
    background: var(--explorer-surface);
    color: inherit;
    border: 0;
    font-size: 13px;
}
.explorer-property :deep(.input:focus-visible) {
    outline: 2px solid #5f8aee;
    outline-offset: 3px;
}
.explorer-property :deep(.suggestions) {
    box-shadow: 0 4px 12px #00000025;
}
.explorer-property :deep(.suggestions li) {
    font-size: 12px;
    overflow-wrap: anywhere;
}
.explorer-property :deep(.suggestions strong) {
    background: #5f8aee25;
    color: #3456a3;
    border-radius: 2px;
    font-weight: 600;
}
.dark .explorer-property :deep(.suggestions strong) {
    background: #5f8aee40;
    color: #abc2f6;
}
.explorer-panels {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
    gap: 16px;
    height: 100%;
    min-height: 0;
    grid-template-rows: minmax(0, 1fr);
}
.explorer-map,
.explorer-detail {
    min-width: 0;
    min-height: 0;
}
.explorer-map {
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.explorer-chart {
    flex: 1;
    min-height: 0;
    position: relative;
}
.explorer-navigation-toggle {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    color: #ccc;
    cursor: pointer;
}
.explorer-graph-controls {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
    flex-shrink: 0;
    color: #ccc;
}
.explorer-reset {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-inline-start: auto;
    padding: 6px 10px;
    border-radius: 6px;
    background: #5f8aee25;
    font-size: 12px;
}
.explorer-reset:hover {
    background: #5f8aee40;
}
.explorer-breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 16px 8px;
    font-family: JetBrainsMono, monospace;
    font-size: 11px;
    max-height: 60px;
    overflow: auto;
}
.explorer-breadcrumbs button {
    overflow-wrap: anywhere;
    text-align: start;
}
.explorer-breadcrumbs button:hover {
    color: #5f8aee;
    text-decoration: underline;
}
.explorer-breadcrumbs button[aria-current] {
    color: #5f8aee;
}
.explorer-breadcrumbs button:focus-visible,
.explorer-reset:focus-visible {
    outline: 2px solid #5f8aee;
    outline-offset: 2px;
}
.explorer-navigation-toggle input {
    accent-color: #5f8aee;
}
.explorer-chart :deep(.vue-ui-graph) {
    height: 100%;
}
.explorer-detail {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
}
.explorer-detail > :not(.explorer-code) {
    flex-shrink: 0;
}
.explorer-map-help {
    padding: 8px 14px 12px;
    color: #9ca3af;
    font-size: 11px;
    flex-shrink: 0;
    text-align: center;
}
.explorer-code {
    flex: 1;
    min-height: 0;
    overflow: auto;
    margin: 0 8px 16px;
    border-radius: 0.3rem;
    background: #faf9f9;
}
.dark .explorer-code {
    background: #202020;
}
.explorer-json-toggle {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}
.explorer-code-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 16px 12px;
}
.explorer-drill-up {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 6px;
    background: #5f8aee20;
}
.explorer-depth-badge {
    position: absolute;
    top: -7px;
    right: -7px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: #3456a3;
    color: #fff;
    font-size: 10px;
    line-height: 1;
}
.dark .explorer-depth-badge {
    background: #abc2f6;
    color: #1a1a1a;
}
.explorer-drill-up:hover:not(:disabled) {
    background: #5f8aee40;
}
.explorer-drill-up:disabled {
    opacity: 0.4;
    cursor: default;
}
.explorer-drill-up:focus-visible {
    outline: 2px solid #5f8aee;
    outline-offset: 2px;
}
.explorer-json-toggle input {
    accent-color: #5f8aee;
}
@media (max-width: 760px) {
    .config-explorer {
        flex: none;
    }
    .explorer-panels {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: none;
        height: auto;
    }
    .explorer-detail,
    .explorer-map {
        height: calc(100dvh - var(--explorer-chrome-height, 120px) - 8rem);
    }
}
</style>
