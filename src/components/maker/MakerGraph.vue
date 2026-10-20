<script setup>
import { ref, computed, watch } from "vue";
import { getPalette } from "vue-data-ui/utils";
import { useMakerStore } from "../../stores/maker";
import { graphMakerTranslations } from "../../translations/graphMaker.js";
import {
    getGraphMakerControlType,
    getGraphMakerPresentation,
} from "./graphMaker.js";
import { graphTranslations } from "../../translations/graph.js";
import { useMainStore } from "../../stores";
import {
    graphDataset,
    createGraphConfig,
    graphConfigLeaves,
} from "../docs/graph";
import { convertArrayToObject, copyComponent } from "./lib";
import useMaker from "./useMaker";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import GraphDatasetEditor from "./GraphDatasetEditor.vue";
import MakerKnobs from "./MakerKnobs.vue";
import ComponentContent from "./ComponentContent.vue";
import CopyComponent from "./CopyComponent.vue";
const store = useMainStore();
const makerStore = useMakerStore();
const text = computed(
    () => graphTranslations[store.lang] || graphTranslations.en,
);
const { isFixed, chart, fixChart, step } = useMaker();
const clone = (value) => JSON.parse(JSON.stringify(value));
function load(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? clone(fallback);
    } catch {
        return clone(fallback);
    }
}
const excludedConfigSections = new Set([
    "theme",
    "responsive",
    "loading",
    "a11y",
    "debug",
]);
const isMakerField = (path) => !excludedConfigSections.has(path.split(".")[0]);

function defaultModel() {
    return graphConfigLeaves(createGraphConfig(store.isDarkMode, store.lang))
        .filter(({ path }) => isMakerField(path))
        .map(({ path, value, type }) => ({
            key: path,
            def: value,
            type: getGraphMakerControlType(path, type),
            ...getGraphMakerPresentation(path),
            ...(type === "number"
                ? { min: -100000, max: 100000, step: 0.01 }
                : {}),
        }));
}
const model = ref(
    load("graphConfig", defaultModel()).filter(({ key }) => isMakerField(key)),
);
const dataset = ref(load("graphDataset", graphDataset));
const config = computed(() => convertArrayToObject(model.value));
// The narrow floating preview has no fixed-height responsive container.
// Preserve the configured aspect ratio there without changing exported settings.
const previewConfig = computed(() =>
    isFixed.value ? { ...config.value, responsive: false } : config.value,
);
function translateLabel(key) {
    const translations = makerStore.translations;
    return (
        translations.labels[key]?.[store.lang] ||
        translations.categories[key]?.[store.lang] ||
        graphMakerTranslations[key]?.[store.lang] ||
        key
    );
}

// Rebuild presentation for saved models and language changes while editing the
// original values, so labels never become part of the exported chart config.
const makerModel = computed(() =>
    model.value
        .filter((item) => item.key !== "customPalette")
        .map((item) => {
            const presentation = getGraphMakerPresentation(item.key);
            return {
                ...item,
                ...presentation,
                type: getGraphMakerControlType(item.key, item.type),
                label: presentation.label.map(translateLabel).join(" · "),
                get def() {
                    return item.def;
                },
                set def(value) {
                    item.def = value;
                },
            };
        }),
);
const categories = computed(() =>
    [...new Set(makerModel.value.map((item) => item.category))].map((key) => ({
        key,
        title: translateLabel(key),
    })),
);
const storageKey = ref(0);
watch(
    model,
    (value) => {
        localStorage.setItem("graphConfig", JSON.stringify(value));
        storageKey.value++;
    },
    { deep: true },
);
watch(
    dataset,
    (value) => {
        localStorage.setItem("graphDataset", JSON.stringify(value));
        storageKey.value++;
    },
    { deep: true },
);
function setGroupColor({ group, color }) {
    const groups = [...new Set(dataset.value.nodes.map((node) => node.group))];
    const index = groups.indexOf(group);
    if (index < 0) return;
    const existing = model.value.find((item) => item.key === "customPalette");
    const current = existing?.def?.length
        ? existing.def
        : getPalette("default");
    const palette = groups.map((_, i) => current[i % current.length]);
    palette[index] = color;
    if (existing) existing.def = palette;
    else model.value.push({ key: "customPalette", def: palette, type: "none" });
    const colorByGroup = model.value.find(
        (item) => item.key === "style.chart.nodes.colorByGroup",
    );
    if (colorByGroup) colorByGroup.def = true;
}
function resetModel() {
    model.value = defaultModel();
    step.value++;
}
</script>
<template>
    <ClearStorageAndRefresh
        keyConfig="graphConfig"
        keyDataset="graphDataset"
        :key="storageKey"
    />
    <BaseDocExampleLink link="vue-ui-graph" componentName="VueUiGraph" />
    <BaseMakerChart
        :isFixed="isFixed"
        @fixChart="fixChart"
        @resetModel="resetModel"
    >
        <VueUiGraph
            ref="chart"
            :dataset="dataset"
            :config="previewConfig"
            :key="step"
        />
    </BaseMakerChart>
    <details open class="mt-16">
        <summary class="cursor-pointer mb-4">{{ text.dataset }}</summary>
        <GraphDatasetEditor
            :dataset="dataset"
            :palette="config.customPalette || []"
            :colorByGroup="config.style?.chart?.nodes?.colorByGroup ?? true"
            @groupColor="setGroupColor"
            :defaultColor="config.style?.chart?.nodes?.color || '#42A5F5'"
        />
    </details>
    <details open class="mt-6">
        <summary>{{ text.configuration }}</summary>
        <MakerKnobs
            :categories="categories"
            :model="makerModel"
            @change="step++"
        />
    </details>
    <div class="overflow-x-auto text-xs max-w-[800px] mx-auto">
        <ComponentContent
            :dataset="dataset"
            :config="config"
            componentName="VueUiGraph"
            configName="vue_ui_graph"
            keyConfig="graphConfig"
            keyDataset="graphDataset"
            :copyComponentFunc="() => copyComponent('componentContent', store)"
            @click="copyComponent('componentContent', store)"
        >
            <template #component-copy
                ><CopyComponent
                    @click="copyComponent('componentContent', store)"
            /></template>
        </ComponentContent>
        <slot name="rater" />
    </div>
</template>
