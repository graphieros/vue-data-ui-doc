<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiDagConfigFields from "./configuration/VueUiDagConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted, useTemplateRef } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseAttr from "../BaseAttr.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ThemesVueUiDag from "../themes/ThemesVueUiDag.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";

const mainConfig = useConfig();
const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

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

const dataset = ref({
    nodes: [
        { id: "A", label: "A" },
        { id: "B", label: "B" },
        { id: "C", label: "C" },
        { id: "D", label: "D" },
    ],
    edges: [
        { from: "A", to: "B" },
        { from: "B", to: "A" },
        { from: "B", to: "A" },
        { from: "C", to: "A" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
        { from: "D", to: "A" },
    ],
});

const message = ref({ text: "", type: "success" });

const chartRef = useTemplateRef("chartRef");

const selectedId = ref(null);
const detailsOpen = ref(false);

const detailsRef = useTemplateRef("detailsRef");

function closeDetails() {
    detailsRef.value.removeAttribute("open");
}

const defaultFocusOptions = {
    smooth: true,
    duration: 300,
    zoomReset: true,
    zoom: null,
};

const focusOptions = ref({
    smooth: true,
    duration: 300,
    zoomReset: true,
    zoom: null,
});

function resetFocusOptions() {
    focusOptions.value = defaultFocusOptions;
}

async function focusOnNode(id, options) {
    if (!chartRef.value) {
        return;
    }

    selectedId.value = id;

    const success = await chartRef.value.focusOnNode(id, {
        ...options,
        zoom: options.zoom == null ? null : Number(options.zoom),
    });

    if (success) {
        message.value = {
            text: `Successfully focused on node with id: ${id}`,
            type: "success",
        };
    } else {
        message.value = {
            text: `Invalid node id: ${id}`,
            type: "error",
        };
    }
}

const codeFocus = computed(
    () => `import { type VueUiDagFocusOnNodeOptions } from "vue-data-ui/vue-ui-dag";
const chartRef = useTemplateRef('chartRef');

// Not really necessary, just for dev mode maybe
const message = ref<{ text: string; type: 'success' | 'error' }>({});

const focusOnNodeOptions: VueUiDagFocusOnNodeOptions = {
    smooth: true,
    duration: 300,
    zoomReset: true,
    zoom: null,
}

// Plug this method on a list of nodes for example
async function focusOnNode(id: string) {
    if (!chartRef.value) {
        return;
    }

    const success = await chartRef.value.focusOnNode(id, focusOnNodeOptions);

    if (success) {
        message.value = {
            text: \`Successfully focused on node with id: \${id}\`,
            type: "success",
        }
    } else {
        message.value = {
            text: \`Invalid node id: \${id}\`,
            type: "error",
        };
    }
}
`,
);

const codeDataset = ref(`const dataset: VueUiDagDataset = {
    nodes: [
        { id: "A", label: "A",},
        { id: "B", label: "B",},
        { id: "C", label: "C",},
        { id: "D", label: "D" },
    ],
    edges: [
        { from: "A", to: "B",},
        { from: "B", to: "A" },
        { from: "B", to: "A" },
        { from: "C", to: "A" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
        { from: "D", to: "A" },
    ]
}`);

const dsTypeCode = ref(`type VueUiDagNode = {
    [key: string]: any;
    id: string;
    label: string;
    backgroundColor?: string; // set a specific background color for a given node
    color?: string; // set a specific text color for a given node
}

type VueUiDagEdge = {
    from: string;
    to: string;
    color?: string;
    animated?: boolean;
    dasharray?: \`\${number} \${number}\`; // If not provided, defaults to config
    animationDurationMs?: number; // If not provided, defaults to config
    animationDirection?: 1 | -1; // If not provided, animates towards the arrow
}

type VueUiDagDataset = {
    nodes: VueUiDagNode[];
    edges: VueUiDagEdge[];
}`);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            loading: false,
            debug: false,
            theme: "",
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            userOptions: {
                annotator: { showGroupActions: true, followZoom: true },
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: false,
                buttons: {
                    img: true,
                    svg: true,
                    fullscreen: true,
                    annotator: true,
                    zoom: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    img: "Download PNG",
                    svg: "Download SVG",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                    zoom: "Toggle zoom lock",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    width: null,
                    height: null,
                    backgroundPattern: {
                        show: false,
                        spacingRatio: 3,
                        dotRadiusRatio: 5,
                        dotColor: isDarkMode.value ? "#3A3A3A" : "#E1E5E8",
                        opacity: 1,
                    },
                    layout: {
                        rankDirection: "TB",
                        rankSeparation: 60,
                        nodeSeparation: 50,
                        edgeSeparation: 30,
                        nodeWidth: 100,
                        nodeHeight: 40,
                        curvedEdges: true,
                        padding: 48,
                        arrowShape: "vee",
                        arrowSize: 8,
                        align: undefined,
                    },
                    nodes: {
                        stroke: isDarkMode.value ? "#6A6A6A" : "#8A8A8A",
                        strokeWidth: 1,
                        borderRadius: 3,
                        backgroundColor: isDarkMode.value
                            ? "#3A3A3A"
                            : "#E1E5E8",
                        labels: {
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            fontSize: 12,
                            bold: false,
                        },
                        tooltip: {
                            showOnClick: true,
                            backgroundColor: isDarkMode.value
                                ? "#2A2A2A"
                                : "#3A3A3A",
                            color: "#CCCCCC",
                            maxWidth: "300px",
                        },
                        selected: {
                            stroke: null,
                            strokeWidth: null,
                            backgroundColor: null,
                            labelColor: null,
                            downstreamEdges: { stroke: null, animated: null },
                            upstreamEdges: { stroke: null, animated: null },
                        },
                    },
                    edges: {
                        stroke: isDarkMode.value ? "#6A6A6A" : "#8A8A8A",
                        strokeWidth: 1,
                        animations: {
                            dasharray: "2 6",
                            animationDurationMs: 1000,
                        },
                    },
                    midpoints: {
                        show: true,
                        radius: 4,
                        stroke: isDarkMode.value ? "#6A6A6A" : "#8A8A8A",
                        fill: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                        strokeWidth: 1,
                        tooltip: {
                            maxWidth: "300px",
                            backgroundColor: isDarkMode.value
                                ? "#2A2A2A"
                                : "#3A3A3A",
                            color: "#CCCCCC",
                        },
                        selectedEdge: { stroke: null, animated: null },
                    },
                    controls: {
                        position: "bottom",
                        show: true,
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#F3F4F6",
                        buttonColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                        color: isDarkMode.value ? "#8A8A8A" : "#1A1A1A",
                        fontSize: 14,
                        border: isDarkMode.value
                            ? "1px solid #3A3A3A"
                            : "1px solid #CCCCCC",
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                    },
                    zoom: { active: true },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: isDarkMode.value ? "#CCCCCC" : "#A1A1A1",
                            text: "Subtitle",
                            fontSize: 16,
                            bold: false,
                        },
                    },
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
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

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode();

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiDag" />
        <BaseDocDescription
            :text="translations.docs.tooltips.dag[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-dag"
            targetMaker="VueUiDag"
            :configSource="mainConfig.vue_ui_dag"
        />

        <div :class="`mx-auto max-w-[400px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiDag
                        ref="chartRef"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div
            class="w-full flex flex-col mt-6 p-2 justify-center place-items-center"
        >
            <div
                class="flex flex-row gap-2 flex-wrap justify-center border-b border-gray-200 dark:border-[#FFFFFF50] pb-2 mb-2"
            >
                <code>focusOnNode</code><span>exposed method</span> (since
                <code>v3.23.11</code>)
            </div>
            <details ref="detailsRef">
                <summary class="w-full text-center select-none mb-4">
                    Try it out:
                </summary>
                <p class="text-center">
                    Click on a node id to focus on a node:
                </p>
                <div
                    class="flex flex-row gap-2 flex-wrap justify-center mt-2 mb-4"
                >
                    <button
                        v-for="node in dataset.nodes"
                        @click="focusOnNode(node.id, focusOptions)"
                        :class="`px-2 border rounded transition-colors ${selectedId === node.id ? 'border border-app-green bg-app-green-dark text-white' : 'border-gray-400 hover:bg-gray-300 dark:hover:bg-[#FFFFFF20]'}`"
                    >
                        {{ node.id }}
                    </button>
                </div>
                <div
                    class="flex flex-col py-4 px-8 border border-gray-400 dark:border-[#FFFFFF30] bg-gray-300 dark:bg-[#FFFFFF10] rounded font-jetbrains text-xs relative"
                >
                    <div class="font-inter-medium text-xl mb-2">
                        <code>focusOnNode</code>
                        <span class="text-gray-500 pl-2">options</span>
                    </div>
                    <div class="absolute top-2 right-2">
                        <button @click="closeDetails">
                            <VueUiIcon
                                name="close"
                                :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"
                            />
                        </button>
                    </div>
                    <BaseAttr
                        name="smooth"
                        attr="smooth"
                        type="checkbox"
                        defaultVal="true"
                        :light="focusOptions"
                        :dark="focusOptions"
                    />
                    <BaseAttr
                        name="duration"
                        attr="duration"
                        type="range"
                        :min="0"
                        :max="1000"
                        :step="50"
                        defaultVal="300"
                        :light="focusOptions"
                        :dark="focusOptions"
                    />
                    <BaseAttr
                        name="zoomReset"
                        attr="zoomReset"
                        type="checkbox"
                        defaultVal="false"
                        :light="focusOptions"
                        :dark="focusOptions"
                    />
                    <BaseAttr
                        name="zoom"
                        attr="zoom"
                        type="range"
                        :min="50"
                        :max="200"
                        :step="10"
                        defaultVal="null"
                        :light="focusOptions"
                        :dark="focusOptions"
                    />
                    <CodeParser
                        class="mt-6"
                        language="typescript"
                        :content="codeFocus"
                        @copy="store.copy()"
                    />
                </div>
            </details>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-dag" />
        </div>

        <Rater itemId="vue_ui_dag" />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showCallbacks
            showResponsive
            schema="vue_ui_dag"
        >
            <template #dataset>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
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
                        :content="codeDataset"
                        :title="translations.docs.example[store.lang]"
                    />
                </div>
            </template>

            <template #configuration>
                <DebugHint component="VueUiDag" configType="VueUiDagConfig" />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiDagConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>
                <code ref="configCode">
                    <VueUiDagConfigFields
                        :config="config"
                        :context="{ setActiveTab }"
                    />
                </code>
            </template>

            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiDag"
                    :names="[
                        'onNodeClick',
                        'onMidpointEnter',
                        'onMidpointLeave',
                        'rotate',
                        'copyAlt',
                    ]"
                />
                <ExposedMethods
                    component="VueUiDag"
                    getImage
                    :names="[
                        'getData',
                        'generatePdf',
                        'generateImage',
                        'generateSvg',
                        'resetZoom',
                        'zoomIn',
                        'zoomOut',
                        'switchDirection',
                    ]"
                >
                    <template #before>
                        <div class="flex flex-col mt-4 py-4 gap-2">
                            <div
                                class="text-xs bg-[#DCDCAA] text-[#1A1A1A] font-inter-medium px-2 py-0.5 rounded-full w-fit"
                            >
                                EXPOSED METHOD
                            </div>
                            <code
                                class="text-xl text-[#559AD3] dark:text-[#DCDCAA]"
                                >focusOnNode</code
                            >
                            <div class="text-gray-500">{{ description }}</div>
                        </div>
                        <CodeParser
                            :content="codeFocus"
                            language="typescript"
                            @copy="store.copy()"
                        />
                    </template>
                </ExposedMethods>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiDag"
                    :types="[
                        'svg-underlayer',
                        'hint',
                        'background-pattern',
                        'svg',
                        'watermark',
                        'source',
                        'user-menu',
                        'annotator-actions',
                        'node',
                        'node-label',
                        'free-node-label',
                        'tooltip-node',
                        'tooltip-midpoint',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-dag.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiDag />
            </template>

            <template #responsive>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueUiDag
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'fullscreen',
                        'img',
                        'pdf',
                        'svg',
                        'zoom',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
