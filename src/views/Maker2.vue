<script setup>
import { useBuilderTranslations } from "../components/builder2/translations";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMainStore } from "../stores";
import { useDefaultDataStore } from "../stores/defaultData";
import { useMakerStore } from "../stores/maker";
import { convertArrayToObject } from "../components/maker/lib";
import { datasetOptions } from "../components/builder2/datasetOptions";
import { catalog } from "../components/builder2/catalog";
import { builderDefaults } from "../components/builder2/defaults";
import CodePanel from "../components/builder2/CodePanel.vue";
import { chartDataset, editorDataset } from "../components/builder2/dataset";
import {
    modelFromConfig,
    restoreConfigModel,
} from "../components/builder2/config.js";
import ConfigControl from "../components/builder2/ConfigControl.vue";
import ChartPreview from "../components/builder2/ChartPreview.vue";
import DataField from "../components/builder2/DataField.vue";
import BaseCard from "../components/BaseCard.vue";
import VueUiIcon from "vue-data-ui/vue-ui-icon";
import IconBlocks from "../components/IconBlocks.vue";

const t = useBuilderTranslations();
const store = useMainStore();
const route = useRoute();

const requestedChart = computed(() =>
    catalog.find(
        (chart) =>
            chart.name === route.query.component ||
            chart.key === route.query.component,
    ),
);

const translations = computed(() => store.translations);

const defaults = builderDefaults(
    useDefaultDataStore(),
    store.isDarkMode,
    store.lang,
);

const maker = useMakerStore();
const clone = (value) => JSON.parse(JSON.stringify(value));
const prefix = "vdu-chart-builder2:";
const selected = ref(catalog[0].key);
const search = ref("");
const tab = ref("data");
const category = ref("all");
const knobSearch = ref("");
const dataset = ref([]);
const model = ref([]);
const status = ref("");

const revision = ref(0);
const jsonMode = ref(false);
const jsonDraft = ref("");
const jsonError = ref("");
const configJsonMode = ref(false);
const configJsonDraft = ref("");
const configJsonError = ref("");
const resetPending = ref(false);
const largePreviewDialog = ref(null);
const largePreviewOpen = ref(false);
function openLargePreview() {
    largePreviewDialog.value.showModal();
    largePreviewOpen.value = true;
}
function closeLargePreview() {
    largePreviewDialog.value.close();
    largePreviewOpen.value = false;
}

const previewDataset = computed(() =>
    chartDataset(current.value.key, dataset.value),
);

let loading = false;
const current = computed(
    () => catalog.find((c) => c.key === selected.value) || catalog[0],
);

const charts = computed(() =>
    catalog.filter((c) =>
        c.name
            .toLowerCase()
            .includes(search.value.toLowerCase().replaceAll(" ", "")),
    ),
);

const config = computed(() => convertArrayToObject(model.value));

const datasetFieldOptions = computed(() =>
    datasetOptions(selected.value, dataset.value),
);

const largePreviewConfig = computed(() => {
    const previewConfig = clone(config.value);
    function targetTooltips(value) {
        if (!value || typeof value !== "object") return;
        for (const [key, child] of Object.entries(value)) {
            if (key === "tooltip" && child && typeof child === "object") {
                child.teleportTo = "#builder-large-preview";
            }
            targetTooltips(child);
        }
    }
    targetTooltips(previewConfig);
    return previewConfig;
});

const categories = computed(() => [
    ...new Set(model.value.map((k) => k.category || "other")),
]);

const knobs = computed(() =>
    model.value.filter(
        (k) =>
            (category.value === "all" ||
                (k.category || "other") === category.value) &&
            k.key.toLowerCase().includes(knobSearch.value.toLowerCase()),
    ),
);

function load() {
    loading = true;
    const base = defaults[current.value.key];
    dataset.value = clone(base.dataset);
    model.value = clone(base.model);
    status.value = "saved";
    try {
        const saved = JSON.parse(
            localStorage.getItem(prefix + current.value.key) || "null",
        );
        if (saved && "dataset" in saved && Array.isArray(saved.model)) {
            dataset.value =
                current.value.key === "vue_ui_radar" &&
                Array.isArray(saved.dataset)
                    ? {
                          categories: clone(base.dataset.categories),
                          series: saved.dataset,
                      }
                    : editorDataset(current.value.key, saved.dataset);
            model.value = restoreConfigModel(clone(base.model), saved.model);
        }
        localStorage.setItem(prefix + "selected", selected.value);
    } catch {
        status.value = "storageUnavailable";
    }
    category.value = "all";
    knobSearch.value = "";
    jsonMode.value = false;
    jsonError.value = "";
    configJsonMode.value = false;
    configJsonError.value = "";
    resetPending.value = false;
    revision.value++;
    loading = false;
}
try {
    const saved = localStorage.getItem(prefix + "selected");
    if (catalog.some((c) => c.key === saved)) selected.value = saved;
} catch {
    /* load reports storage failures */
}

if (requestedChart.value) selected.value = requestedChart.value.key;

load();

watch(selected, load, { flush: "sync" });

watch(requestedChart, (chart) => {
    if (chart) selected.value = chart.key;
});

watch(
    [dataset, model],
    () => {
        if (loading) return;
        try {
            localStorage.setItem(
                prefix + current.value.key,
                JSON.stringify({ dataset: dataset.value, model: model.value }),
            );
            status.value = "saved";
        } catch {
            status.value = "saveFailed";
        }
    },
    { deep: true, flush: "sync" },
);

function editJson() {
    jsonDraft.value = JSON.stringify(dataset.value, null, 2);
    jsonError.value = "";
    jsonMode.value = !jsonMode.value;
}

function applyJson() {
    try {
        const parsed = JSON.parse(jsonDraft.value);
        const example = defaults[current.value.key].dataset;
        if (
            Array.isArray(parsed) !== Array.isArray(example) ||
            typeof parsed !== typeof example ||
            parsed === null
        )
            throw new Error("datasetStructure");
        dataset.value = parsed;
        jsonError.value = "";
        jsonMode.value = false;
        revision.value++;
    } catch (error) {
        jsonError.value = {
            key:
                error.message === "datasetStructure"
                    ? "datasetStructure"
                    : "invalidJson",
        };
    }
}

function editConfigJson() {
    configJsonDraft.value = JSON.stringify(config.value, null, 2);
    configJsonError.value = "";
    configJsonMode.value = !configJsonMode.value;
}

function applyConfigJson() {
    try {
        const parsed = JSON.parse(configJsonDraft.value);
        model.value = restoreConfigModel(
            clone(defaults[current.value.key].model),
            modelFromConfig(parsed, defaults[current.value.key].model),
        );
        configJsonError.value = "";
        configJsonMode.value = false;
        revision.value++;
    } catch (error) {
        configJsonError.value = {
            key: error.translationKey || "invalidJson",
            params: error.translationParams,
        };
    }
}

function reset() {
    dataset.value = clone(defaults[current.value.key].dataset);
    model.value = clone(defaults[current.value.key].model);
    resetPending.value = false;
    jsonMode.value = false;
    jsonDraft.value = "";
    jsonError.value = "";
    configJsonMode.value = false;
    configJsonError.value = "";
    revision.value++;
}

function label(knob) {
    return Array.isArray(knob.label)
        ? knob.label
              .map((l) => maker.translations.labels[l]?.[store.lang] || l)
              .join(" ")
        : maker.translations.labels[knob.label]?.[store.lang] ||
              knob.label ||
              knob.key;
}

const thumbs = import.meta.glob("../assets/thumb_*", {
    eager: true,
    query: "?url",
    import: "default",
});
</script>

<template>
    <main class="builder2" :class="{ 'builder-dark': store.isDarkMode }">
        <header class="flex flex-row gap-4 place-items-center justify-start">
            <div class="relative h-[80px] w-[80px] hidden md:block">
                <IconBlocks
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lushicon"
                    :stroke="store.isDarkMode ? '#42D39290' : '#42D392'"
                    :size="80"
                />
            </div>
            <h1
                class="font-inter-bold text-[48px] sm:text-[72px] text-center bg-gradient-to-r from-app-green to-indigo-400 bg-clip-text text-transparent"
                style="letter-spacing: -1px"
            >
                {{ translations.menu.chartBuilder[store.lang] }}
            </h1>
        </header>

        <div class="builder-workspace">
            <!-- Component selector -->
            <aside class="chart-library panel">
                <BaseCard>
                    <div class="panel-title">
                        <h2>{{ t("availableBuilders") }}</h2>
                        <span class="pill">{{ catalog.length }}</span>
                    </div>
                    <label class="search-field"
                        ><span class="sr-only">{{ t("searchComponents") }}</span
                        ><input
                            v-model="search"
                            type="search"
                            :placeholder="t('searchCharts')"
                    /></label>
                    <div class="chart-list">
                        <button
                            v-for="chart in charts"
                            :key="chart.key"
                            :aria-pressed="selected === chart.key"
                            :class="[
                                'chart-option',
                                { selected: selected === chart.key },
                            ]"
                            @click="selected = chart.key"
                        >
                            <img
                                :src="
                                    thumbs[
                                        `../assets/${store.isDarkMode ? chart.thumb.replace('_light', '') : chart.thumb}`
                                    ]
                                "
                                alt=""
                                loading="lazy"
                            /><span>{{
                                chart.name
                                    .replace("VueUi", "")
                                    .replace(/([a-z])([A-Z])/g, "$1 $2")
                            }}</span>
                        </button>
                        <p v-if="!charts.length" class="muted empty">
                            {{ t("noCharts") }}
                        </p>
                    </div>
                </BaseCard>
            </aside>

            <!-- Preview -->
            <section class="builder-main">
                <section class="preview panel">
                    <BaseCard>
                        <div class="preview-toolbar">
                            <div class="flex flex-col">
                                <code class="text-2xl">{{ current.name }}</code>
                                <strong>{{ t("livePreview") }}</strong>
                                <p class="muted mt-2 max-w-prose">
                                    {{
                                        translations.docs.tooltips[
                                            current.descriptionKey
                                        ][store.lang]
                                    }}
                                </p>
                            </div>
                            <div class="preview-header-actions">
                                <button
                                    class="builder-button gap-2"
                                    @click="openLargePreview"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"
                                        />
                                    </svg>
                                    {{ t("largePreview") }}
                                </button>
                                <RouterLink
                                    class="builder-button gap-2"
                                    :to="`/docs#${current.key.replaceAll('_', '-')}`"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M12 5v16m0-16C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 1Z"
                                        />
                                    </svg>
                                    {{ translations.menu.docs[store.lang] }}
                                </RouterLink>
                            </div>
                        </div>
                        <div class="preview-stage">
                            <div class="preview-chart">
                                <ChartPreview
                                    :key="`${selected}-${revision}`"
                                    :component="current.name"
                                    :dataset="previewDataset"
                                    :config="config"
                                />
                            </div>
                        </div>
                        <div class="preview-footer">
                            <span role="status">{{
                                status ? t(status) : ""
                            }}</span
                            ><span>{{ t("liveChanges") }}</span>
                        </div>
                    </BaseCard>
                </section>
                <section class="editor panel">
                    <BaseCard>
                        <div class="editor-toolbar">
                            <nav :aria-label="t('editingPanels')">
                                <button
                                    v-for="(name, i) in [
                                        'data',
                                        'customize',
                                        'code',
                                    ]"
                                    :key="name"
                                    :class="{ active: tab === name }"
                                    :aria-pressed="tab === name"
                                    @click="tab = name"
                                >
                                    <span
                                        class="step-number border"
                                        :class="{
                                            'border-app-green': tab === name,
                                            'border-gray-500': tab !== name,
                                        }"
                                        >{{ i + 1 }}</span
                                    >{{
                                        name === "data"
                                            ? t("dataset")
                                            : name === "customize"
                                              ? t("customize")
                                              : t("getCode")
                                    }}
                                </button>
                            </nav>
                            <button
                                type="button"
                                class="reset-button"
                                :aria-expanded="resetPending"
                                aria-controls="restore-example-confirm"
                                @click="resetPending = !resetPending"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M3 10a9 9 0 1 1 2 8M3 4v6h6" />
                                </svg>
                                <span>{{ t("restoreExample") }}</span>
                            </button>
                        </div>
                        <div
                            v-if="resetPending"
                            id="restore-example-confirm"
                            class="reset-confirm border-l-2 border-app-warning mt-2"
                        >
                            <VueUiIcon
                                name="triangleExclamation"
                                stroke="#ff8c00"
                            />
                            <span>{{ t("restorePrompt") }}</span
                            ><button
                                class="builder-button !bg-app-warning !text-black font-inter-medium"
                                @click="reset"
                            >
                                {{ t("restore") }}</button
                            ><button
                                class="builder-button"
                                @click="resetPending = false"
                            >
                                {{ t("cancel") }}
                            </button>
                        </div>
                        <div v-show="tab === 'data'" class="editor-body">
                            <div class="section-heading">
                                <div>
                                    <h2>{{ t("componentDataset") }}</h2>
                                    <p class="muted">
                                        {{ t("datasetHelp") }}
                                    </p>
                                </div>
                                <button
                                    class="builder-button gap-2"
                                    @click="editJson"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"
                                        />
                                    </svg>
                                    {{
                                        jsonMode
                                            ? t("visualEditor")
                                            : t("editJson")
                                    }}
                                </button>
                            </div>
                            <template v-if="jsonMode"
                                ><label for="builder-json" class="muted">{{
                                    t("datasetJson")
                                }}</label
                                ><textarea
                                    id="builder-json"
                                    v-model="jsonDraft"
                                    class="code-input"
                                    spellcheck="false"
                                />
                                <p v-if="jsonError" role="alert" class="error">
                                    {{ t(jsonError.key, jsonError.params) }}
                                </p>
                                <button
                                    class="builder-button primary"
                                    @click="applyJson"
                                >
                                    {{ t("applyDataset") }}
                                </button></template
                            >
                            <DataField
                                :key="`${selected}-${revision}`"
                                v-else
                                v-model="dataset"
                                :field-options="datasetFieldOptions"
                                :template="defaults[current.key].dataset"
                            />
                        </div>
                        <div v-show="tab === 'customize'" class="editor-body">
                            <div class="section-heading">
                                <div>
                                    <h2>{{ t("componentConfig") }}</h2>
                                </div>
                                <button
                                    class="builder-button gap-2"
                                    @click="editConfigJson"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"
                                        />
                                    </svg>
                                    {{
                                        configJsonMode
                                            ? t("visualEditor")
                                            : t("editJson")
                                    }}
                                </button>
                            </div>
                            <template v-if="configJsonMode">
                                <label
                                    for="builder-config-json"
                                    class="muted"
                                    >{{ t("configJson") }}</label
                                >
                                <textarea
                                    id="builder-config-json"
                                    v-model="configJsonDraft"
                                    class="code-input"
                                    spellcheck="false"
                                />
                                <p
                                    v-if="configJsonError"
                                    role="alert"
                                    class="error"
                                >
                                    {{
                                        t(
                                            configJsonError.key,
                                            configJsonError.params,
                                        )
                                    }}
                                </p>
                                <button
                                    class="builder-button primary"
                                    @click="applyConfigJson"
                                >
                                    {{ t("applyConfig") }}
                                </button>
                            </template>
                            <template v-else>
                                <div class="knob-filters">
                                    <label
                                        ><span class="sr-only">{{
                                            t("configCategory")
                                        }}</span
                                        ><select v-model="category">
                                            <option value="all">
                                                {{ t("allCategories") }}
                                            </option>
                                            <option
                                                v-for="c in categories"
                                                :key="c"
                                                :value="c"
                                            >
                                                {{
                                                    maker.translations
                                                        .categories[c]?.[
                                                        store.lang
                                                    ] ||
                                                    (c === "other"
                                                        ? t("other")
                                                        : c)
                                                }}
                                            </option>
                                        </select></label
                                    ><input
                                        v-model="knobSearch"
                                        type="search"
                                        :aria-label="t('searchSettings')"
                                        :placeholder="
                                            t('searchSettingsPlaceholder')
                                        "
                                    />
                                </div>
                                <div class="knob-list">
                                    <div
                                        v-for="(knob, index) in knobs"
                                        :key="`${selected}-${knob.key}`"
                                        class="knob"
                                        :class="{
                                            'knob-color':
                                                knob.type === 'color' &&
                                                !knob.old,
                                        }"
                                    >
                                        <span :id="`builder-setting-${index}`"
                                            >{{ label(knob)
                                            }}<small
                                                ><code>{{
                                                    knob.key
                                                }}</code></small
                                            ></span
                                        >
                                        <ConfigControl
                                            :knob="knob"
                                            :label="label(knob)"
                                            :label-id="`builder-setting-${index}`"
                                        />
                                    </div>
                                    <p v-if="!knobs.length" class="muted">
                                        {{ t("noSettings") }}
                                    </p>
                                </div>
                            </template>
                        </div>
                        <div v-show="tab === 'code'" class="editor-body">
                            <CodePanel
                                :component="current.name"
                                :dataset="previewDataset"
                                :config="config"
                                @status="status = $event"
                            />
                        </div>
                    </BaseCard>
                </section>
            </section>
        </div>
        <dialog
            id="builder-large-preview"
            ref="largePreviewDialog"
            class="large-preview-dialog"
            aria-labelledby="large-preview-title"
            @close="largePreviewOpen = false"
            @click="
                $event.target === $event.currentTarget && closeLargePreview()
            "
        >
            <header class="large-preview-header">
                <div>
                    <h2 id="large-preview-title">{{ t("largePreview") }}</h2>
                    <p class="muted">{{ current.name }}</p>
                </div>
                <button
                    class="builder-button"
                    autofocus
                    @click="closeLargePreview"
                >
                    {{ t("closePreview") }}
                </button>
            </header>
            <div class="large-preview-stage">
                <ChartPreview
                    v-if="largePreviewOpen"
                    :key="`large-${selected}-${revision}`"
                    :component="current.name"
                    :dataset="previewDataset"
                    :config="largePreviewConfig"
                />
            </div>
        </dialog>
    </main>
</template>

<style scoped>
.builder2 {
    --surface: #fff;
    --surface-soft: #f5f7fa;
    --border: #dfe5eb;
    --text: #243044;
    --muted: #64748b;
    --accent: #1a1a1a;
    max-width: 1600px;
    margin: 0 auto;
    padding: 48px 28px 80px;
    color: var(--text);
    font-family: Inter, sans-serif;
}
.builder-dark {
    --surface: #242629;
    --surface-soft: #1c1e21;
    --border: #3a3e44;
    --text: #e2e8f0;
    --muted: #a0adbd;
    --accent: #42d392;
}
.builder-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
}

h1 {
    font-size: clamp(36px, 5vw, 58px);
    letter-spacing: -2px;
    font-weight: 750;
    line-height: 1.2;
    margin: 8px 0;
}
h1 span {
    color: var(--accent);
}
h1 small {
    vertical-align: top;
    display: inline-block;
    font-size: 11px;
    letter-spacing: 0;
    border: 1px solid var(--border);
    padding: 5px 7px;
    border-radius: 6px;
    margin: 8px 0 0 12px;
}
.builder-heading p,
.muted,
.local-note {
    color: var(--muted);
    font-size: 13px;
}
.builder-workspace {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 22px;
    align-items: start;
}
.panel {
    /* border: 1px solid var(--border);
    border-radius: 16px; */
    overflow: hidden;
    box-shadow: 0 4px 20px #00000004;
}
.chart-library {
    position: sticky;
    top: 90px;
}
.panel-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px 12px;
}
h2 {
    font-size: 15px;
    font-weight: 650;
}
.pill {
    font-size: 11px;
    padding: 3px 7px;
    border-radius: 20px;
    background: var(--surface-soft);
    color: var(--muted);
}
.search-field {
    display: block;
    padding: 0 12px 12px;
}
.builder2 input:not([type="checkbox"]):not([type="color"]),
.builder2 select,
.builder2 textarea {
    background: var(--surface-soft);
    border: 1px solid var(--border);
    border-radius: 7px;
    padding: 9px 10px;
    color: var(--text);
    min-width: 0;
    max-width: 100%;
    font-size: 13px;
}
.search-field input {
    width: 100%;
}
.chart-list {
    max-height: calc(100vh - 250px);
    overflow: auto;
    padding: 0 8px 10px;
}
.chart-option {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
    padding: 9px 8px;
    margin: 3px 0;
    border: 1px solid transparent;
    border-radius: 8px;
    text-align: left;
    font-size: 12px;
}
.chart-option img {
    width: 38px;
    height: 30px;
    object-fit: contain;
    background: var(--surface);
    border-radius: 4px;
}
.chart-option:hover {
    background: var(--surface-soft);
}
.chart-option.selected {
    background: #42d39214;
    border-color: #42d39266;
    color: var(--accent);
}
.selected-dot {
    margin-left: auto;
    font-size: 9px;
}
.builder-main {
    min-width: 0;
    display: grid;
    gap: 22px;
}
.preview-toolbar,
.preview-footer,
.editor-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 20px;
}
.preview-toolbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
}
.preview-toolbar > div:first-child {
    min-width: 0;
    overflow-wrap: anywhere;
}
.preview-header-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 8px;
    max-width: 240px;
    justify-self: end;
}

.component-name {
    margin-left: 14px;
    font-size: 11px;
}
.preview-stage {
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 16px 16px;
}
.preview-chart {
    width: 100%;
    max-width: 660px;
    overflow: auto;
    transition: max-width 0.2s;
}
.large-preview-dialog {
    width: min(1400px, calc(100% - 32px));
    max-width: none;
    max-height: calc(100dvh - 32px);
    margin: auto;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: var(--surface);
    color: var(--text);
    overflow: auto;
    box-shadow: 0 24px 80px #0006;
}
.large-preview-dialog::backdrop {
    background: #10151dbb;
    backdrop-filter: blur(4px);
}
.large-preview-header {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
}
.large-preview-stage {
    width: 100%;
    padding: clamp(12px, 3vw, 40px);
}
.preview-footer {
    font-size: 11px;
    color: var(--muted);
    border-top: 1px solid var(--border);
}
.builder-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    background: var(--surface);
    color: var(--text);
    text-decoration: none;
}
.builder-button:hover {
    border-color: var(--accent);
}
.primary {
    background: #42d392;
    color: #123529;
    border-color: #42d392;
    font-weight: 650;
}
.editor-toolbar {
    padding: 0 20px;
    border-bottom: 1px solid var(--border);
}
nav {
    display: flex;
    gap: 20px;
}
nav button {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 18px 0;
    border-bottom: 2px solid transparent;
    font-size: 13px;
    color: var(--muted);
}
nav button.active {
    color: var(--accent);
    border-color: var(--accent);
}
.step-number {
    font-size: 10px;
    width: 21px;
    background: var(--surface-soft);
    padding: 2px 6px;
    border-radius: 50%;
}
.reset-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    flex-shrink: 0;
    min-height: 36px;
    margin: 8px 0;
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    transition:
        background 0.15s,
        border-color 0.15s,
        color 0.15s;
}
.reset-button:hover,
.reset-button[aria-expanded="true"] {
    background: var(--surface-soft);
    border-color: var(--accent);
    color: var(--text);
}
.editor-body {
    padding: 24px;
}
.section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 22px;
}
.section-heading p {
    margin-top: 5px;
}
.code-input {
    display: block;
    width: 100%;
    height: 360px;
    font-family: monospace;
    margin: 10px 0;
}
.error {
    color: #e36955;
    margin: 10px 0;
}
.knob-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}
.knob-filters input {
    flex: 1;
}
.knob {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid var(--border);
    padding: 13px 0;
    font-size: 12px;
}
.knob > span {
    flex: 1 1 0;
    min-width: 0;
    overflow-wrap: anywhere;
}
.knob small {
    display: block;
    color: var(--muted);
    font-size: 10px;
    margin-top: 3px;
}
.knob input:not([type="checkbox"]),
.knob select,
.knob textarea {
    width: 190px;
    flex-shrink: 0;
}
.builder2 :deep(input[type="checkbox"]) {
    width: 3.75rem;
    height: 1.65rem;
    flex: 0 0 3.75rem;
}
.code-actions {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
}
.code-output {
    background: #171c24;
    color: #dce7f5;
    padding: 22px;
    border-radius: 10px;
    max-height: 520px;
    overflow: auto;
    font-size: 12px;
    line-height: 1.65;
}
.ts-toggle {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.local-note {
    text-align: center;
    font-size: 11px;
}
.reset-confirm {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 24px;
    background: var(--surface-soft);
    font-size: 12px;
}
.empty {
    padding: 15px;
}
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
summary:focus-visible,
pre:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
}
:deep(.data-group) {
    border: 1px solid var(--border);
    border-radius: 9px;
    margin-bottom: 10px;
    min-width: 0;
}
:deep(.data-group summary) {
    cursor: pointer;
    padding: 12px;
    font-size: 12px;
    font-weight: 600;
    background: var(--surface-soft);
    border-radius: 9px;
}
:deep(.data-group summary span) {
    margin-left: 10px;
    font-weight: 400;
}
:deep(.data-children) {
    padding: 12px;
}
:deep(.data-entry) {
    position: relative;
    min-width: 0;
    padding-right: 25px;
    margin-bottom: 8px;
}
:deep(.data-leaf) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    font-size: 12px;
    padding: 5px 0;
    overflow-wrap: anywhere;
}
:deep(.data-leaf input:not([type="checkbox"]):not([type="color"])),
:deep(.data-leaf select) {
    width: 55%;
    min-width: 0;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--surface-soft);
    color: var(--text);
}
:deep(.data-leaf input[type="color"]) {
    box-sizing: border-box;
    width: 100px;
    height: 32px;
    min-height: 32px;
    flex-shrink: 0;
    padding: 2px;
}
:deep(.data-leaf input[type="color"]::-webkit-color-swatch-wrapper) {
    padding: 0;
}
:deep(.data-leaf input[type="color"]::-webkit-color-swatch),
:deep(.data-leaf input[type="color"]::-moz-color-swatch) {
    border-radius: 4px;
    box-shadow: none;
}
:deep(.remove-item) {
    position: absolute;
    right: 0;
    top: 8px;
    color: var(--muted);
    padding: 2px 5px;
}
:deep(.remove-item:hover) {
    color: #e36955;
}
@media (min-width: 1300px) {
    .builder-workspace {
        grid-template-columns: 240px minmax(0, 1fr);
    }
    .builder-main {
        grid-template-columns: minmax(300px, 1fr) minmax(360px, 1fr);
        align-items: start;
    }
    .preview {
        position: sticky;
        top: 90px;
    }
    .local-note {
        grid-column: 1/-1;
    }
    .component-name {
        display: block;
        margin: 5px 0 0 15px;
    }
    .editor-toolbar {
        padding: 0 14px;
        flex-wrap: wrap;
        gap: 0;
    }
    .editor-toolbar nav {
        gap: 15px;
    }
}
@media (max-width: 760px) {
    .builder2 {
        padding: 28px 12px 50px;
    }
    .builder-heading {
        align-items: start;
        flex-direction: column;
    }
    .builder-workspace {
        grid-template-columns: 1fr;
    }
    .chart-library {
        position: static;
    }
    .chart-list {
        max-height: 190px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .preview-stage {
        padding: 12px;
    }
    .component-name {
        display: none;
    }
    .editor-body {
        padding: 16px;
    }
    .editor-toolbar {
        padding: 0 12px;
        flex-wrap: wrap;
    }
    .editor-toolbar nav {
        gap: 15px;
    }
    .knob-filters {
        flex-direction: column;
    }
    .knob input:not([type="checkbox"]),
    .knob select,
    .knob textarea {
        width: 42%;
    }
    .section-heading {
        flex-wrap: wrap;
    }
    .preview-footer {
        flex-wrap: wrap;
    }
    .reset-confirm {
        flex-wrap: wrap;
    }
}
</style>
