<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiWheelConfigFields from "./configuration/VueUiWheelConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiWheel from "../themes/ThemesVueUiWheel.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
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
            layout: "classic",
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    animation: { use: true, speed: 0.5, acceleration: 1 },
                    layout: {
                        wheel: {
                            radiusRatio: 1,
                            tiltAngle3d: 50,
                            ticks: {
                                type: "classic",
                                rounded: true,
                                inactiveColor: isDarkMode.value
                                    ? "#3A3A3A"
                                    : "#e1e5e8",
                                activeColor: "#5f8bee",
                                sizeRatio: 0.9,
                                stroke: "transparent",
                                strokeWidth: 5,
                                depth3d: 0,
                                spacingRatio3d: 1,
                                shadeColorRatio3d: 0.15,
                                gradient: {
                                    show: true,
                                    shiftHueIntensity: 100,
                                },
                            },
                        },
                        innerCircle: {
                            show: true,
                            stroke: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                            strokeWidth: 1,
                            radiusRatio: 1,
                        },
                        percentage: {
                            show: true,
                            fontSize: 48,
                            rounding: 1,
                            bold: true,
                            offsetX: 0,
                            offsetY: 0,
                            stroke: "transparent",
                            strokeWidth: 0,
                        },
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
    forceChartUpdate();
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
        <BaseDocTitle name="VueUiWheel" />

        <BaseDocDescription
            :text="translations.docs.tooltips.wheel[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-wheel"
            targetMaker="VueUiWheel"
            :configSource="mainConfig.vue_ui_wheel"
        />

        <!-- <CuteLink
          path="/examples/categories"
          hash="vue-ui-wheel"
          target="wheel-less-gradient-pie-plain"
        >
          TEST
        </CuteLink> -->

        <div :class="`transition-all mx-auto max-w-[450px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiWheel
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-wheel" />
        </div>

        <Rater itemId="vue_ui_wheel" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showCallbacks
            showResponsive
            schema="vue_ui_wheel"
            signInfo="positiveOnly"
        >
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type:
                    <code class="text-app-green">VueUiWheelDataset</code>
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
const <span class="text-black dark:text-app-green">dataset: VueUiWheelDataset</span> = {
    percentage: 66.5
}
</code>
</pre>
                </div>
            </template>
            <template #tab1>
                <DebugHint
                    component="VueUiWheel"
                    configType="VueUiWheelConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiWheelConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiWheelConfigFields
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

                <div class="overflow-w-auto"></div>
            </template>
            <template #tab2>
                <ComponentEmits component="VueUiWheel" :names="['copyAlt']" />
                <ExposedMethods
                    component="VueUiWheel"
                    getImage
                    :names="['generatePdf', 'generateImage', 'generateSvg']"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiWheel"
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-wheel.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiWheel />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiWheel
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                            :key="key"
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

<style>
.vue-ui-wheel * {
    font-variant-numeric: tabular-nums !important;
}
</style>
