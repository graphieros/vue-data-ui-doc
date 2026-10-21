<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiMoleculeConfigFields from "./configuration/VueUiMoleculeConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
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

const dataset = ref([
    {
        name: "Root",
        details: "This is the root node",
        nodes: [
            {
                name: "node1",
                details: "Lorem ipsum",
                nodes: [
                    {
                        name: "node1.1",
                        details: "Lorem ipsum",
                        nodes: [
                            { name: "node1.1" },
                            { name: "node1.2" },
                            { name: "node1.3" },
                        ],
                    },
                    {
                        name: "node1.2",
                        nodes: [
                            { name: "node1.2.1" },
                            { name: "node1.2.2" },
                            { name: "node1.2.3" },
                            { name: "node1.2.4" },
                        ],
                    },
                    {
                        name: "node1.3",
                        nodes: [{ name: "node1.3.1" }, { name: "node1.3.2" }],
                    },
                    {
                        name: "node1.4",
                        nodes: [
                            { name: "node1.4.1" },
                            { name: "node1.4.2" },
                            { name: "node1.4.3" },
                            { name: "node1.4.4" },
                            { name: "node1.4.5" },
                            { name: "node1.4.6" },
                        ],
                    },
                    {
                        name: "node1.5",
                        nodes: [
                            { name: "node1.5.1" },
                            { name: "node1.5.2" },
                            { name: "node1.5.3" },
                            { name: "node1.5.4" },
                            { name: "node1.5.5" },
                            { name: "node1.5.6" },
                        ],
                    },
                    {
                        name: "node1.6",
                        nodes: [
                            { name: "node1.6.1" },
                            { name: "node1.6.2" },
                            { name: "node1.6.3" },
                            { name: "node1.6.4" },
                            { name: "node1.6.5" },
                            { name: "node1.6.6" },
                        ],
                    },
                ],
            },
            {
                name: "node2",
                nodes: [
                    {
                        name: "node2.1",
                        nodes: [
                            { name: "node2.1.1" },
                            { name: "node2.1.2" },
                            { name: "node2.1.3" },
                            { name: "node2.1.4" },
                            { name: "node2.1.5" },
                            {
                                name: "node2.1.6",
                                nodes: [
                                    { name: "node2.1.6.1" },
                                    { name: "node2.1.6.2" },
                                    { name: "node2.1.6.3" },
                                    { name: "node2.1.6.4" },
                                    { name: "node2.1.6.5" },
                                    {
                                        name: "node2.1.6.6",
                                        nodes: [
                                            { name: "node2.1.6.6.1" },
                                            { name: "node2.1.6.6.2" },
                                            { name: "node2.1.6.6.3" },
                                            { name: "node2.1.6.6.4" },
                                            { name: "node2.1.6.6.5" },
                                            {
                                                name: "node2.1.6.6.6",
                                                nodes: [
                                                    { name: "node2.1.6.6.6.1" },
                                                    { name: "node2.1.6.6.6.2" },
                                                    {
                                                        name: "node2.1.6.6.6.3",
                                                        nodes: [
                                                            {
                                                                name: "node2.1.6.6.6.3.1",
                                                            },
                                                            {
                                                                name: "node2.1.6.6.6.3.2",
                                                                nodes: [
                                                                    {
                                                                        name: "node2.1.6.6.6.3.2.1",
                                                                    },
                                                                    {
                                                                        name: "node2.1.6.6.6.3.2.2",
                                                                    },
                                                                    {
                                                                        name: "node2.1.6.6.6.3.2.3",
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                name: "node2.1.6.6.6.3.3",
                                                            },
                                                            {
                                                                name: "node2.1.6.6.6.3.4",
                                                            },
                                                            {
                                                                name: "node2.1.6.6.6.3.5",
                                                            },
                                                            {
                                                                name: "node2.1.6.6.6.3.6",
                                                            },
                                                        ],
                                                    },
                                                    { name: "node2.1.6.6.6.4" },
                                                    { name: "node2.1.6.6.6.5" },
                                                    { name: "node2.1.6.6.6.6" },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: "node3",
                nodes: [
                    { name: "node3.1" },
                    { name: "node3.2" },
                    { name: "node3.3" },
                ],
            },
            {
                name: "node4",
                nodes: [
                    { name: "node4.1" },
                    {
                        name: "node4.2",
                        nodes: [
                            { name: "node4.2.1" },
                            { name: "node4.2.2" },
                            { name: "node4.2.3" },
                        ],
                    },
                    { name: "node4.3" },
                    {
                        name: "node4.4",
                        nodes: [
                            { name: "node4.4.1" },
                            { name: "node4.4.2" },
                            { name: "node4.4.3" },
                            { name: "node4.4.4" },
                            { name: "node4.4.5" },
                        ],
                    },
                ],
            },
            {
                name: "node5",
                nodes: [
                    { name: "node4.1" },
                    { name: "node4.2" },
                    { name: "node4.3" },
                    { name: "node4.4" },
                    { name: "node4.5" },
                ],
            },
            {
                name: "node6",
                nodes: [
                    { name: "node4.1" },
                    { name: "node4.2" },
                    { name: "node4.3" },
                    { name: "node4.4" },
                ],
            },
        ],
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    nodes: {
                        stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                        strokeHovered: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                    },
                    links: {
                        stroke: isDarkMode.value ? "#3A3A3A" : "#DDDDDD",
                        strokeWidth: 2,
                        useChildColor: true,
                    },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "Subtitle",
                            fontSize: 16,
                            bold: false,
                        },
                    },
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#FFFFFF",
                        fontSize: 14,
                        customFormat: null,
                        borderRadius: 4,
                        borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                        borderWidth: 1,
                        backgroundOpacity: 30,
                        position: "center",
                        offsetY: 24,
                        offsetX: 0,
                        smooth: true,
                        smoothForce: 0.18,
                        smoothSnapThreshold: 0.25,
                    },
                    zoom: { show: true, speed: 1 },
                },
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                translations: {
                    nodeName: "Node name",
                    details: "Details",
                    ancestor: "Parent node",
                },
            },
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: false,
                buttons: {
                    tooltip: true,
                    pdf: true,
                    img: true,
                    csv: true,
                    table: true,
                    labels: true,
                    fullscreen: true,
                    annotator: true,
                    zoom: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    tooltip: "Toggle tooltip",
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    table: "Toggle table",
                    labels: "Toggle labels",
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

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode();

const dsTypeCode = computed(() => {
    return `type VueUiMoleculeDatasetNode = {
    name: string
    details?: string
    nodes?: VueUiMoleculeDatasetNode[]
    color?: string // since v2.6.41
}`;
});

const codeDataset = ref(`const dataset: VueUiMoleculeDatasetNode[] = [
    {
        name: "Root",
        details: "This is the root node",
        nodes: [
            {
                name: 'node1',
                details: 'Lorem ipsum',
                nodes: [
                    {
                        name: 'node1.1', details: 'Lorem ipsum', nodes: [
                            { name: 'node1.1' },
                            { name: 'node1.2' },
                            { name: 'node1.3' },
                        ]
                    },
                    {
                        name: 'node1.2', nodes: [
                            { name: 'node1.2.1' },
                            { name: 'node1.2.2' },
                            { name: 'node1.2.3' },
                            { name: 'node1.2.4' },
                        ]
                    },
                    {
                        name: 'node1.3', nodes: [
                            { name: 'node1.3.1' },
                            { name: 'node1.3.2' },
                        ]
                    },
                    {
                        name: 'node1.4', nodes: [
                            { name: 'node1.4.1' },
                            { name: 'node1.4.2' },
                            { name: 'node1.4.3' },
                            { name: 'node1.4.4' },
                            { name: 'node1.4.5' },
                            { name: 'node1.4.6' },
                        ]
                    },
                    {
                        name: 'node1.5', nodes: [
                            { name: 'node1.5.1' },
                            { name: 'node1.5.2' },
                            { name: 'node1.5.3' },
                            { name: 'node1.5.4' },
                            { name: 'node1.5.5' },
                            { name: 'node1.5.6' },
                        ]
                    },
                    {
                        name: 'node1.6', nodes: [
                            { name: 'node1.6.1' },
                            { name: 'node1.6.2' },
                            { name: 'node1.6.3' },
                            { name: 'node1.6.4' },
                            { name: 'node1.6.5' },
                            { name: 'node1.6.6' },
                        ]
                    },
                ]
            },
            {
                name: 'node2',
                nodes: [
                    {
                        name: 'node2.1', nodes: [
                            { name: 'node2.1.1' },
                            { name: 'node2.1.2' },
                            { name: 'node2.1.3' },
                            { name: 'node2.1.4' },
                            { name: 'node2.1.5' },
                            {
                                name: 'node2.1.6', nodes: [
                                    { name: 'node2.1.6.1' },
                                    { name: 'node2.1.6.2' },
                                    { name: 'node2.1.6.3' },
                                    { name: 'node2.1.6.4' },
                                    { name: 'node2.1.6.5' },
                                    {
                                        name: 'node2.1.6.6', nodes: [
                                            { name: 'node2.1.6.6.1' },
                                            { name: 'node2.1.6.6.2' },
                                            { name: 'node2.1.6.6.3' },
                                            { name: 'node2.1.6.6.4' },
                                            { name: 'node2.1.6.6.5' },
                                            {
                                                name: 'node2.1.6.6.6', 
                                                nodes: [
                                                    { name: 'node2.1.6.6.6.1' },
                                                    { name: 'node2.1.6.6.6.2' },
                                                    { name: 'node2.1.6.6.6.3' },
                                                    { name: 'node2.1.6.6.6.4' },
                                                    { name: 'node2.1.6.6.6.5' },
                                                    { name: 'node2.1.6.6.6.6' },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                name: 'node3',
                nodes: [
                    { name: 'node3.1' },
                    { name: 'node3.2' },
                    { name: 'node3.3' },
                ]
            },
            {
                name: 'node4',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2', nodes: [
                        { name: 'node4.2.1'},
                        { name: 'node4.2.2'},
                        { name: 'node4.2.3'},
                    ] },
                    { name: 'node4.3' },
                    { name: 'node4.4', nodes: [
                        { name: 'node4.4.1'},
                        { name: 'node4.4.2'},
                        { name: 'node4.4.3'},
                        { name: 'node4.4.4'},
                        { name: 'node4.4.5'},
                    ] },
                ]
            },
            {
                name: 'node5',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2' },
                    { name: 'node4.3' },
                    { name: 'node4.4' },
                    { name: 'node4.5' },
                ]
            },
            {
                name: 'node6',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2' },
                    { name: 'node4.3' },
                    { name: 'node4.4' },
                ]
            },
        ]
    }
]`);

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const customFormatCode = ref(`customFormat: ({ datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiMolecule" />

        <BaseDocDescription
            :text="translations.docs.tooltips.molecule[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-molecule"
            :configSource="mainConfig.vue_ui_molecule"
        />

        <div class="mx-auto w-full sm:w-1/2">
            <BaseCard>
                <VueUiMolecule :dataset="dataset" :config="config" :key="key" />
            </BaseCard>
        </div>

        <Rater itemId="vue_ui_molecule" />

        <BaseMigrationInfo debug />

        <Box ref="box" showEmits showSlots showTooltip showCallbacks>
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

                    <div class="w-full overflow-x-auto">
                        <CodeParser
                            language="typescript"
                            @copy="store.copy()"
                            :content="codeDataset"
                            :title="translations.docs.example[store.lang]"
                        />
                    </div>
                </div>
            </template>
            <template #configuration>
                <DebugHint
                    component="VueUiMolecule"
                    configType="VueUiMoleculeConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiMoleculeConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiMoleculeConfigFields
                        :config="config"
                        :context="{
                            isDarkMode,
                            config,
                            config,
                            setActiveTab,
                        }"
                    />
                </code>
            </template>
            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiMolecule"
                    :names="['selectNode', 'copyAlt']"
                />
                <ExposedMethods
                    component="VueUiMolecule"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                        'toggleLabels',
                    ]"
                />

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">
                        {{ translations.docs.emits.xy.getData[store.lang] }}
                    </div>
                    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const moleculeChart = ref(null);
            const moleculeDataset = ref([]);

            onMounted(async () => {
                moleculeDataset.value = await moleculeChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiMolecule
                ref="moleculeChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiMolecule
                ref="moleculeChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        moleculeDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.moleculeDataset = await this.$refs.moleculeChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>
            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiMolecule"
                    :types="[
                        'svg-underlayer',
                        'svg',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-molecule.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>
            <template #custom-tooltip>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.style.chart.tooltip.customFormat</code
                >
                <CodeParser
                    class="mt-4"
                    language="javascript"
                    :content="customFormatCode"
                />

                <h3 class="my-4">
                    {{ translations.customFormatCss[store.lang] }}
                </h3>
                <CodeParser
                    language="css"
                    content=".vue-data-ui-custom-tooltip{ }"
                />
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'labels',
                        'pdf',
                        'table',
                        'tooltip',
                        'svg',
                        'zoom',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
