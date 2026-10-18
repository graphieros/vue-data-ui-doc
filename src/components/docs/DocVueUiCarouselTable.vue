<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiCarouselTableConfigFields from "./configuration/VueUiCarouselTableConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import ComponentEmits from "../ComponentEmits.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

function generateBody(n) {
    let arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push([
            Math.round(Math.random() * Math.random() * 1000000),
            Math.round(Math.random() * Math.random() * 100000),
            Math.round(Math.random() * Math.random() * 10000),
            Math.round(Math.random() * Math.random() * 100),
            Math.round(Math.random() * Math.random() * 10),
        ]);
    }
    return arr;
}

const dataset = ref({
    head: ["Column 1 has a long name", "col2", "col3", "col4", "col5"],
    body: generateBody(12),
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            debug: false,
            devHints: { enable: false },
            responsiveBreakpoint: 400,
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: false,
                buttons: {
                    tooltip: false,
                    pdf: true,
                    csv: true,
                    img: true,
                    table: false,
                    labels: false,
                    fullscreen: true,
                    sort: false,
                    stack: false,
                    animation: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    fullscreen: "Toggle fullscreen",
                    animation: "Toggle animation",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            animation: {
                type: "scroll",
                use: true,
                speedMs: 1000,
                pauseOnHover: true,
            },
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                fontFamily: "inherit",
            },
            border: { size: 0, color: "#2D353C" },
            scrollbar: { showOnlyOnHover: false, hide: false },
            caption: {
                text: "Gentle random data",
                padding: { top: 12, right: 12, bottom: 12, left: 12 },
                style: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    color: isDarkMode.value ? "#42d392" : "#2D353C",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "left",
                },
            },
            thead: {
                style: { verticalAlign: "middle" },
                tr: {
                    height: 32,
                    border: { size: 0, color: "#2D353C" },
                    style: {
                        backgroundColor: isDarkMode.value
                            ? "#3A3A3A"
                            : "#FFFFFF",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        boxShadow: isDarkMode.value
                            ? "0px 6px 12px -6px #1A1A1A"
                            : "0px 6px 12px -6px #2D353C50",
                    },
                    th: {
                        border: { size: 0, color: "#2D353C" },
                        padding: { top: 0, right: 12, bottom: 0, left: 0 },
                        style: {
                            borderSpacing: 0,
                            border: "none",
                            textAlign: "right",
                            fontVariantNumeric: "tabular-nums",
                        },
                    },
                },
            },
            tbody: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                tr: {
                    visible: 5,
                    height: 32,
                    border: { size: 0, color: "#2D353C" },
                    style: {
                        backgroundColor: isDarkMode.value
                            ? "#4A4A4A"
                            : "#FFFFFF",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    },
                    td: {
                        alternateColor: true,
                        alternateOpacity: isDarkMode.value ? 0.8 : 0.5,
                        border: { size: 0, color: "#2D353C" },
                        padding: { top: 0, right: 12, bottom: 0, left: 0 },
                        style: {
                            fontVariantNumeric: "tabular-nums",
                            textAlign: "right",
                            backgroundColor: isDarkMode.value
                                ? "#2A2A2A"
                                : "#e1e5e8",
                        },
                    },
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    store.copy();
}

const { configCode, showAllConfig } = useConfigCode();

const dsTypeCode = ref(`type VueUiCarouselTableDataset = {
    head: string[]
    body: Array<Array<number | string>>
}`);

const dsExample = ref(`const dataset: VueUiCarouselTableDataset = {
    head: ["col1", "col2", "col3", "col4", "col5"],
    body: [
        [10000, 1000, 100, 10, 0],
        [10001, 1001, 101, 11, 1],
        [10002, 1002, 102, 12, 2],
        [10003, 1003, 103, 13, 3],
        [10004, 1004, 104, 14, 4],
        [10005, 1005, 105, 15, 5],
        [10006, 1006, 106, 16, 6],
        [10007, 1007, 107, 17, 7],
        [10008, 1008, 108, 18, 8],
        [10009, 1009, 109, 19, 9]
    ]
}`);

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const slotCode = computed(() => {
    return `<VueUiCarouselTable :dataset="dataset" :config="config">
    <template #caption>
        My custom caption
    </template>
    
    <template #th="{ th, colIndex }">
        {{ colIndex }} - {{ th }}
    </template>

    <template #td="{ td, colIndex, rowIndex }">
        {{ colIndex }} - {{ rowIndex }} - {{ td }}
    </template>

    <template #source>
        <div>Source: Lorem ipsum...</div>
    </template>
</VueUiCarouselTable>`;
});
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiCarouselTable" />

        <BaseDocDescription
            :text="translations.docs.tooltips.carouselTable[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-carousel-table"
            targetMaker="VueUiCarouselTable"
            :configSource="mainConfig.vue_ui_carousel_table"
        />

        <BaseCard>
            <div :class="`transition-all mx-auto w-full overflow`">
                <Suspense>
                    <template #default>
                        <VueUiCarouselTable
                            :dataset="dataset"
                            :config="config"
                            :key="key"
                        >
                            <template #plot-comment="{ plot }">
                                <div
                                    :style="`text-align:${plot.textAlign};font-size: 10px; padding: 6px;`"
                                >
                                    {{ plot.comment }}
                                </div>
                            </template>
                        </VueUiCarouselTable>
                    </template>
                    <template #fallback>
                        <BaseSpinner />
                    </template>
                </Suspense>
            </div>
        </BaseCard>

        <Rater itemId="vue_ui_carousel_table" />

        <Box
            ref="box"
            showEmits
            showSlots
            showCallbacks
            schema="vue_ui_carousel_table"
            hideSchemaDisclaimer
        >
            <template #tab0>
                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        :title="translations.docs.datastructure[store.lang]"
                        class="my-6"
                    />
                </div>

                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsExample"
                        :title="translations.docs.example[store.lang]"
                        class="my-6"
                    />
                </div>
            </template>

            <template #tab1>
                <DebugHint
                    component="VueUiCarouselTable"
                    configType="VueUiCarouselTableConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="my-4">
                    TS type:
                    <code class="text-app-blue">VueUiCarouselTableConfig</code>
                </div>
                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiCarouselTableConfigFields
                        :config="config"
                        :context="{ forceChartUpdate, setActiveTab }"
                    />
                </code>
            </template>

            <template #tab2>
                <ComponentEmits
                    component="VueUiCarouselTable"
                    :names="['copyAlt']"
                />

                <ExposedMethods
                    component="VueUiCarouselTable"
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleAnimation',
                        'pauseAnimation',
                        'resumeAnimation',
                    ]"
                />
            </template>

            <template #tab3>
                <BaseSlotsImplementationLink
                    link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-carousel-table.vue"
                />

                <div><code>#caption</code></div>
                <div class="text-gray-400 pl-5 mb-4">
                    {{ translations.slots.caption[store.lang] }}
                </div>
                <div><code>#th</code></div>
                <div class="text-gray-400 pl-5 mb-4">
                    {{ translations.slots.th[store.lang] }}
                </div>
                <div><code>#td</code></div>
                <div class="text-gray-400 pl-5 mb-4">
                    {{ translations.slots.td[store.lang] }}
                </div>
                <div><code>#source</code></div>
                <div class="text-gray-400 pl-5 mb-4">
                    {{ translations.slots.source[store.lang] }}
                </div>

                <CodeParser
                    language="html"
                    :content="slotCode"
                    @copy="store.copy()"
                />
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="['csv', 'fullscreen', 'img', 'pdf']"
                />
            </template>
        </Box>
    </div>
</template>
