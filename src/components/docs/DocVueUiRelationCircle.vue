<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiRelationCircleConfigFields from "./configuration/VueUiRelationCircleConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiRelationCircle from "../themes/ThemesVueUiRelationCircle.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
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
        id: "01",
        label: "Lorem",
        relations: [
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
        ],
        weights: [5, 3, 10, 2, 9, 3, 1, 2, 3, 7, 1],
        color: "#eb4034",
    },
    {
        id: "02",
        label: "Ipsum",
        relations: ["01", "03", "07", "06", "07"],
        weights: [3, 2, 9, 7, 1],
        color: "#e0992d",
    },
    {
        id: "03",
        label: "Dolor",
        relations: ["01", "02"],
        weights: [2, 5],
        color: "#decc2c",
    },
    {
        id: "04",
        label: "Consectetur",
        relations: ["01", "05", "10"],
        weights: [2, 1, 4],
        color: "#a8de2a",
    },
    {
        id: "05",
        label: "Amet",
        relations: ["01", "04", "07", "10"],
        weights: [2, 3, 4, 5],
        color: "#5ed622",
    },
    {
        id: "06",
        label: "Rherum",
        relations: ["01", "02"],
        weights: [4, 1],
        color: "#21d92d",
    },
    {
        id: "07",
        label: "Delecta",
        relations: ["01", "02", "08", "12"],
        weights: [4, 8, 2, 1],
        color: "#23d97b",
    },
    {
        id: "08",
        label: "Nitimur",
        relations: ["01", "07", "12", "01"],
        weights: [7, 3, 2, 3],
        color: "#29d6c2",
    },
    {
        id: "09",
        label: "Vetitum",
        relations: ["01"],
        weights: [1],
        color: "#2aacdb",
    },
    {
        id: "10",
        label: "Monumentum",
        relations: ["01", "04", "05"],
        weights: [4, 1, 4],
        color: "#295bd9",
    },
    {
        id: "11",
        label: "Aere",
        relations: ["01"],
        weights: [3],
        color: "#523ed6",
    },
    {
        id: "12",
        label: "Perennius",
        relations: ["01", "07", "08"],
        weights: [8, 1, 1],
        color: "#8235db",
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            responsiveProportionalSizing: true,
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
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                fontFamily: "inherit",
                size: 400,
                limit: 50,
                animation: { show: true, speedMs: 300 },
                labels: {
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    fontSize: 10,
                    minFontSize: 6,
                },
                weightLabels: {
                    show: true,
                    size: 8,
                    prefix: "",
                    suffix: "",
                    rounding: 0,
                },
                links: { curved: false, maxWidth: 3 },
                circle: {
                    radiusProportion: 0.26,
                    stroke: isDarkMode.value ? "#565656" : "#CCCCCC",
                    strokeWidth: 1,
                    offsetY: 0,
                },
                plot: {
                    radius: 2,
                    useSerieColor: true,
                    color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
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

const dsTypeCode = computed(() => {
    return `type VueUiRelationCircleDatasetItem = {
  id: string | number
  label: string
  relations: (string | number)[] // ${translations.value.docs.comments.relationCircle.relations[store.lang]}
  weights?: number[] // ${translations.value.docs.comments.relationCircle.weight[store.lang]}
  color?: string
}`;
});

const codeDataset = ref(`const dataset: VueUiRelationCircleDatasetItem[] = [
  {
    id: "01",
    label: "Lorem",
    relations: ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    weights: [5, 3, 10, 2, 9, 3, 1, 2, 3, 7, 1],
    color: "#eb4034",
  },
  {
      id: "02",
      label: "Ipsum",
      relations: ["01", "03", "07", "06", "07"],
      weights: [3, 2, 9, 7, 1],
      color: "#e0992d",
  },
  {
      id: "03",
      label: "Dolor",
      relations: ["01", "02"],
      weights: [2, 5],
      color: "#decc2c",
  },
  {
      id: "04",
      label: "Consectetur",
      relations: ["01", "05", "10"],
      weights: [2, 1, 4],
      color: "#a8de2a",
  },
  {
      id: "05",
      label: "Amet",
      relations: ["01", "04", "07", "10"],
      weights: [2, 3, 4, 5],
      color: "#5ed622",
  },
  {
      id: "06",
      label: "Rherum",
      relations: ["01", "02"],
      weights: [4, 1],
      color: "#21d92d",
  },
  {
      id: "07",
      label: "Delecta",
      relations: ["01", "02", "08", "12"],
      weights: [4, 8, 2, 1],
      color: "#23d97b",
  },
  {
      id: "08",
      label: "Nitimur",
      relations: ["01", "07", "12", "01"],
      weights: [7, 3, 2, 3],
      color: "#29d6c2",
  },
  {
      id: "09",
      label: "Vetitum",
      relations: ["01"],
      weights: [1],
      color: "#2aacdb",
  },
  {
      id: "10",
      label: "Monumentum",
      relations: ["01", "04", "05"],
      weights: [4, 1, 4],
      color: "#295bd9",
  },
  {
      id: "11",
      label: "Aere",
      relations: ["01"],
      weights: [3],
      color: "#523ed6",
  },
  {
      id: "12",
      label: "Perennius",
      relations: ["01", "07", "08"],
      weights: [8, 1, 1],
      color: "#8235db",
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
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiRelationCircle" />

        <BaseDocDescription
            :text="translations.docs.tooltips.relationCircle[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-relation-circle"
            targetMaker="VueUiRelationCircle"
            :configSource="mainConfig.vue_ui_relation_circle"
        />

        <div :class="`transition-all mx-auto w-full sm:w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiRelationCircle
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_relation_circle" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showCallbacks
            showResponsive
            schema="vue_ui_relation_circle"
        >
            <template v-slot:tab0>
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

            <template v-slot:tab1>
                <DebugHint
                    component="VueUiRelationCircle"
                    configType="VueUiReltionCircleConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiRelationCircleConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiRelationCircleConfigFields
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
                    component="VueUiRelationCircle"
                    :names="['copyAlt']"
                />
                <ExposedMethods
                    component="VueUiRelationCircle"
                    getImage
                    :names="['generatePdf', 'generateImage', 'generateSvg']"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiRelationCircle"
                    :types="[
                        'hint',
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-relation-circle.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiRelationCircle />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiRelationCircle
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
