<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiBulletConfigFields from "./configuration/VueUiBulletConfigFields.vue";
import { ref, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
import ThemesVueUiBullet from "../themes/ThemesVueUiBullet.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import UcBullet from "../useCases/uc-bullet.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";

const mainConfig = useConfig();
const store = useMainStore();
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

const dataset = ref({
    value: 85,
    target: 80,
    segments: [
        {
            name: "Low",
            from: 0,
            to: 50,
        },
        {
            name: "Medium",
            from: 50,
            to: 70,
        },
        {
            name: "High",
            from: 70,
            to: 100,
        },
    ],
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            theme: "",
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
                    csv: false,
                    img: true,
                    table: false,
                    labels: false,
                    fullscreen: true,
                    sort: false,
                    stack: false,
                    animation: false,
                    annotator: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    img: "Download PNG",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
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
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    height: 96,
                    width: 600,
                    padding: { top: 24, right: 24, bottom: 24, left: 12 },
                    animation: { show: true, animationFrames: 60 },
                    segments: {
                        baseColor: isDarkMode.value ? "#5A5A5A" : "#9A9A9A",
                        dataLabels: {
                            show: true,
                            color: isDarkMode.value ? "#5A5A5A" : "#2D353C",
                            fontSize: 10,
                            formatter: null,
                            bold: false,
                            prefix: "",
                            suffix: "",
                            rounding: 0,
                            offsetY: 0,
                        },
                        ticks: { show: true, divisions: 10, stroke: "#8A8A8A" },
                    },
                    target: {
                        show: true,
                        onTop: true,
                        color: "#1A1A1A",
                        rounded: true,
                        heightRatio: 0.8,
                        stroke: isDarkMode.value ? "#CCCCCC" : "#FFFFFF",
                        strokeWidth: 1,
                        width: 6,
                    },
                    valueBar: {
                        color: "#3A3A3A",
                        heightRatio: 0.33,
                        stroke: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                        strokeWidth: 1,
                        label: {
                            show: true,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            fontSize: 14,
                            bold: true,
                            offsetY: 0,
                        },
                    },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 12,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "Subtitle",
                            fontSize: 16,
                            bold: false,
                        },
                    },
                    legend: {
                        show: true,
                        bold: false,
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#FFFFFF",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        fontSize: 14,
                        roundingValue: 0,
                        position: "bottom",
                    },
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
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

function randomizeData() {
    dataset.value.value = Math.random() * 100;
}

const dsTypeCode = computed(() => {
    return `type VueUiBulletDataset = {
    value: number
    target: number
    segments: Array<{
        name: string;
        from: number;
        to: number;
        color?: string
    }>
}`;
});

const codeDataset = ref(`const dataset: VueUiBulletDataset = {
    value: 85,
    target: 80,
    segments: [
        {
            name: "Low",
            from: 0,
            to: 50,
        },
        {
            name: "Medium",
            from: 50,
            to: 70,
        },
        {
            name: "High",
            from: 70,
            to: 100,
        },
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
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiBullet" />

        <BaseDocDescription
            :text="translations.docs.tooltips.bullet[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-bullet"
            targetMaker="VueUiBullet"
            :configSource="mainConfig.vue_ui_bullet"
        />

        <div :class="`transition-all mx-auto w-full sm:w-3/4`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueDataUi
                        component="VueUiBullet"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>

            <BaseRandomButton @click="randomizeData" />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-bullet" />
        </div>

        <Rater itemId="vue_ui_bullet" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showCallbacks
            showResponsive
            showUseCases
            signInfo="both"
            schema="vue_ui_bullet"
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
                        :content="codeDataset"
                        :title="translations.docs.example[store.lang]"
                    />
                </div>
            </template>

            <template #tab1>
                <DebugHint
                    component="VueUiBullet"
                    configType="VueUiBulletConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiBulletConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiBulletConfigFields
                        :config="config"
                        :context="{
                            goToPage,
                            setActiveTab,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>

            <template #tab2>
                <ComponentEmits component="VueUiBullet" :names="['copyAlt']" />
                <ExposedMethods
                    component="VueUiBullet"
                    getImage
                    :names="['generatePdf', 'generateImage', 'generateSvg']"
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

            const bulletChart = ref(null);
            const bulletDataset = ref({});

            onMounted(async () => {
                bulletDataset.value = await bulletChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            });

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiBullet
                ref="bulletChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiBullet
                ref="bulletChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        bulletDataset: {},
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        }
                    }
                },
                async mounted () {
                    this.bulletDataset = await this.$refs.bulletChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiBullet"
                    :types="[
                        'svg',
                        'legend',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-bullet.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiBullet />
            </template>

            <template #tab7>
                <ResponsiveUnit height="248px" minHeight="150px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiBullet"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab5>
                <UcBullet />
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="['annotator', 'fullscreen', 'img', 'pdf', 'svg']"
                />
            </template>
        </Box>
    </div>
</template>
