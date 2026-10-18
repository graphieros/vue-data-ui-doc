<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiTiremarksConfigFields from "./configuration/VueUiTiremarksConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiTiremarks from "../themes/ThemesVueUiTiremarks.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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

const dataset = ref({
    percentage: 66.5,
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            style: {
                fontFamily: "inherit",
                chart: {
                    width: 312,
                    height: 56,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    animation: { use: true, speed: 0.5, acceleration: 1 },
                    layout: {
                        display: "horizontal",
                        crescendo: false,
                        curved: false,
                        curveAngleX: 10,
                        curveAngleY: 10,
                        activeColor: "#FF0000",
                        inactiveColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                        ticks: {
                            gradient: { show: true, shiftHueIntensity: 30 },
                        },
                    },
                    percentage: {
                        show: true,
                        useGradientColor: false,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 16,
                        bold: true,
                        rounding: 1,
                        verticalPosition: "bottom",
                        horizontalPosition: "left",
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
                    pdf: true,
                    img: true,
                    fullscreen: true,
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

function randomizeData() {
    dataset.value.percentage = Math.random() * 100;
}

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
        <BaseDocTitle name="VueUiTiremarks" />

        <BaseDocDescription
            :text="translations.docs.tooltips.tiremarks[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-tiremarks"
            targetMaker="VueUiTiremarks"
            :configSource="mainConfig.vue_ui_tiremarks"
        />

        <div
            :class="`transition-all mx-auto ${config.style.chart.layout.display === 'vertical' ? 'max-w-[100px]' : 'max-w-[500px]'}`"
        >
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiTiremarks
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
        </div>

        <Rater itemId="vue_ui_tiremarks" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showResponsive
            showEmits
            showCallbacks
            showSlots
            showThemes
            schema="vue_ui_tiremarks"
            signInfo="positiveOnly"
        >
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type:
                    <code class="text-app-green">VueUiTiremarksDataset</code>
                </div>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <pre>
<code>
    {
        percentage: number; (from 0 to 100)
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
                    <pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiTiremarksDataset</span> = {
    percentage: 66.5
}
</code>
</pre>
                </div>
            </template>
            <template #tab1>
                <DebugHint
                    component="VueUiTiremarks"
                    configType="VueUiTiremarksConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiTiremarksConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiTiremarksConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            goToPage,
                            setActiveTab,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>
            <template #tab2>
                <ComponentEmits
                    component="VueUiTiremarks"
                    :names="['copyAlt']"
                />
                <ExposedMethods
                    component="VueUiTiremarks"
                    getImage
                    :names="['generatePdf', 'generateImage', 'generateSvg']"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiTiremarks"
                    :types="[
                        'svg',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-tiremarks.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiTiremarks />
            </template>

            <template #tab7>
                <ResponsiveUnit height="200px" minHeight="100px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiTiremarks"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="['annotator', 'fullscreen', 'img', 'pdf', 'svg']"
                />
            </template>
        </Box>
    </div>
</template>
