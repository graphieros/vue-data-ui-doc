<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiAnnotatorConfigFields from "./configuration/VueUiAnnotatorConfigFields.vue";
import { ref, computed, watch, nextTick, onBeforeMount, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon, InfoTriangleIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { donutConfig, donutDataset, donutDataset2 } from "./dash";
import { useConfig } from "../../assets/useConfig";
import SuspenseWrapper from "../SuspenseWrapper.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import { useConfigCode } from "../../useConfigCode";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

onMounted(() => (store.docSnap = false));

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            alwaysVisible: false,
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontFamily: "inherit",
                showPrint: true,
                showSave: true,
                showTooltips: true,
                showImage: true,
                buttons: {
                    borderRadius: 6,
                    controls: {
                        backgroundColor: isDarkMode.value
                            ? "#4A4A4A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        border: "1px solid #5A5A5A",
                        selected: {
                            backgroundColor: isDarkMode.value
                                ? "#5f8aee"
                                : "#2D353C",
                            color: "#fafafa",
                            border: "1px solid #CCCCCC",
                        },
                    },
                    shapes: {
                        backgroundColor: isDarkMode.value
                            ? "#4A4A4A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        border: "1px solid #5A5A5A",
                        selected: {
                            backgroundColor: isDarkMode.value
                                ? "#CCCCCC"
                                : "#2D353C",
                            color: isDarkMode.value ? "#1A1A1A" : "#FAFAFA",
                            border: "1px solid #CCCCCC",
                        },
                    },
                },
                tooltips: {
                    backgroundColor: isDarkMode.value ? "#4A4A4A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    border: "1px solid #5A5A5A",
                    borderRadius: 6,
                    boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
                },
            },
            translations: {
                colorAlpha: "Color alpha",
                dashedLines: "Dashed lines",
                filled: "Filled",
                fontSize: "Font size",
                thickness: "Thickness",
                title: "Annotations",
                tooltipGroup: "Select & group",
                tooltipDelete: "Delete",
                tooltipMove: "Move",
                tooltipResize: "Resize",
                tooltipBringToFront: "Bring to front",
                tooltipBringToBack: "Bring to back",
                tooltipDuplicate: "Duplicate",
                tooltipUndo: "Undo last shape",
                tooltipRedo: "Redo last shape",
                tooltipPdf: "Save pdf",
                tooltipSave: "Save annotations",
                tooltipShapeCircle: "Draw circle",
                tooltipShapeRect: "Draw rect",
                tooltipShapeArrow: "Draw arrow",
                tooltipShapeFreehand: "Freehand line",
                tooltipShapeText: "Text mode",
                tooltipShapeTextLeft: "Align left",
                tooltipShapeTextCenter: "Align center",
                tooltipShapeTextRight: "Align right",
                tooltipShapeTextBullet: "Bullet points",
                tooltipShapeTextBold: "Bold",
                tooltipShapeTextItalic: "Italic",
                tooltipShapeTextUnderline: "Underlined",
                tooltipShapeColor: "Color",
                tooltipImage: "Download PNG",
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

const isAnnotatorOpen = ref(false);

function toggleOpenState(state) {
    isAnnotatorOpen.value = state.isOpen;
}

const initShapes = ref([]);

const initLastSelectedShape = ref({
    alpha: "FA",
    id: "circle_4641.74639444795_1697899591317",
    color: "#ff6400",
    isFilled: true,
    circleRadius: 23.086461422195327,
    circleStrokeWidth: 2,
    type: "circle",
    x: 83.33469387819179,
    y: 141.20597309543473,
    strokeWidth: 1,
    isDash: false,
});

const shapes = ref([]);

const lastSelectedShape = ref(undefined);

onBeforeMount(() => {
    if (localStorage.getItem("vue-data-ui-annotator") === null) {
        localStorage.setItem(
            "vue-data-ui-annotator",
            JSON.stringify({
                shapes: initShapes.value,
                lastSelectedShape: initLastSelectedShape.value,
            }),
        );
        shapes.value = initShapes.value;
        lastSelectedShape.value = initLastSelectedShape.value;
    } else {
        shapes.value = JSON.parse(
            localStorage.getItem("vue-data-ui-annotator"),
        ).shapes;
        lastSelectedShape.value = JSON.parse(
            localStorage.getItem("vue-data-ui-annotator"),
        ).lastSelectedShape;
    }
});

function saveAnnotations({ shapes, lastSelectedShape }) {
    console.log("VueUiAnnotator docs - saved shapes: ", shapes);
    localStorage["vue-data-ui-annotator"] = JSON.stringify({
        shapes,
        lastSelectedShape,
    });
}

const { configCode, showAllConfig } = useConfigCode();

const comment = ref({
    en: "This content is placed inside the default slot. Use the annotator to superimpose annotations.",
    fr: "Ce contenu est placé dans le slot par défaut. Utilisez l’annotateur pour superposer des annotations.",
    pt: "Este conteúdo é colocado no slot padrão. Use o anotador para sobrepor anotações.",
    de: "Dieser Inhalt befindet sich im Standard-Slot. Verwenden Sie den Annotator, um Anmerkungen zu überlagern.",
    zh: "此内容放置在默认插槽中。使用标注工具叠加注释。",
    ja: "このコンテンツはデフォルトスロット内に配置されています。アノテーションツールを使って注釈を重ねます。",
    es: "Este contenido se coloca en el slot predeterminado. Use el anotador para superponer anotaciones.",
    ko: "이 콘텐츠는 기본 슬롯에 배치되어 있습니다. 주석 도구를 사용해 주석을 겹쳐 표시하세요.",
    ar: "يوضع هذا المحتوى داخل الـslot الافتراضي. استخدم أداة التعليق التوضيحي لإضافة تعليقات متراكبة.",
});

const exampleScript = ref(`const dataset = ref({});

function saveAnnotations(data) {
  dataset.value = data;
}
`);

const exampleTemplate = ref(`<VueUiAnnotator
  :dataset="dataset"
  :config="config"
  @saveAnnotations="saveAnnotations"
>
  <div class="my-content">
    <!-- Slotted content -->
  </div>
</VueUiAnnotator>
`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiAnnotator" />

        <div class="mx-auto w-full max-w-[400px] text-center mb-4">
            {{ translations.docs.comments.annotator.description[store.lang]
            }}<br />
        </div>

        <BaseDocHeaderActions
            targetLink="vue-ui-annotator"
            :configSource="mainConfig.vue_ui_annotator"
        />

        <div
            class="text-app-orange flex flex-row gap-2 mx-auto text-center w-full place-items-center justify-center"
        >
            <InfoTriangleIcon />
            {{ translations.docs.comments.annotator.warning[store.lang] }}
        </div>
        <div :class="`transition-all mx-auto`">
            <div v-if="isAnnotatorOpen" class="py-2">
                {{ translations.docs.comments.annotator.openState[store.lang] }}
            </div>
            <div v-else class="py-2">
                {{
                    translations.docs.comments.annotator.closedState[store.lang]
                }}
            </div>

            <BaseCard>
                <SuspenseWrapper :width="200" :height="200">
                    <VueUiAnnotator
                        :dataset="{ shapes, lastSelectedShape }"
                        :config="config"
                        @toggleOpenState="toggleOpenState"
                        @saveAnnotations="saveAnnotations"
                    >
                        <div
                            class="flex flex-row gap-2 p-2 bg-gray-100 dark:bg-[#2A2A2A]"
                        >
                            <div class="w-full">
                                <div
                                    class="w-full h-[500px] bg-gray-200 dark:bg-[#3A3A3A] text-black dark:text-[#CCCCCC] flex place-items-center justify-center"
                                >
                                    {{ comment[store.lang] }}
                                </div>
                            </div>
                        </div>
                    </VueUiAnnotator>
                </SuspenseWrapper>
            </BaseCard>
        </div>

        <div class="flex flex-col gap-4 my-4">
            <CodeParser
                title="script"
                :content="exampleScript"
                language="javascript"
                @copy="store.copy"
            />
            <CodeParser
                title="template"
                :content="exampleTemplate"
                language="html"
                @copy="store.copy"
            />
        </div>

        <Box showEmits showSlots>
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiAnnotator"
                    :types="[
                        'toggle',
                        'icon-move',
                        'icon-resize',
                        'icon-delete',
                        'icon-select-group',
                        'icon-bring-to-front',
                        'icon-bring-to-back',
                        'icon-copy',
                        'icon-undo',
                        'icon-redo',
                        'icon-print',
                        'icon-export-image',
                        'icon-save',
                        'icon-circle',
                        'icon-rect',
                        'icon-arrow',
                        'icon-freehand',
                        'icon-text',
                        'icon-text-align-left',
                        'icon-text-align-center',
                        'icon-text-align-right',
                        'icon-text-bullet-points',
                        'icon-text-bold',
                        'icon-text-italic',
                        'icon-text-underline',
                        'icon-color',
                    ]"
                />
            </template>

            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}<br />
                {{
                    translations.docs.comments.annotator.datastructure[
                        store.lang
                    ]
                }}
                <div class="mt-4">
                    TS type:
                    <code class="text-app-green">VueUiAnnotatorDataset</code>
                </div>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <pre>
<code>
    {
      shapes: [],
      lastSelectedShape: {}
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
                    <span class="text-app-orange">{{
                        translations.docs.comments.annotator.notByYourself[
                            store.lang
                        ]
                    }}</span>
                    <pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiAnnotatorDataset</span> = {
    shapes: [
        {
            "alpha": "FA",
            "id": "rect_5984.908326049341_1697899539759",
            "color": "#ffffff",
            "isFilled": true,
            "rectStrokeWidth": 2,
            "rectHeight": 112.14181105579797,
            "rectWidth": 305.56046572706396,
            "type": "rect",
            "x": 83.33469387819179,
            "y": 137.0906650348501,
            "strokeWidth": 1,
            "isDash": false
        },
        {
            "id": "text_262.5479805029807_56906.53122089711",
            "type": "text",
            "lines": 2,
            "x": 104.93996308004542,
            "y": 181.3300697001898,
            "textContent": "Serie 1 represents half of ‎the total, with an increase ‎by 10 points from last quarter.",
            "fontSize": 20,
            "textAlign": "start",
            "isBold": false,
            "isItalic": false,
            "isUnderline": false,
            "color": "#000000",
            "isBulletTextMode": false
        },
        {
            "id": "arrow_3029.9709482549497_1697899520213",
            "x": 389.9239669971587,
            "y": 200.87770449499425,
            "endX": 478.40273708135186,
            "endY": 288.32766718728436,
            "type": "arrow",
            "color": "#000000",
            "strokeWidth": 1,
            "isDash": false
        },
        {
            "alpha": "FA",
            "id": "circle_4641.74639444795_1697899591317",
            "color": "#ff6400",
            "isFilled": true,
            "circleRadius": 23.086461422195327,
            "circleStrokeWidth": 2,
            "type": "circle",
            "x": 83.33469387819179,
            "y": 141.20597309543473,
            "strokeWidth": 1,
            "isDash": false
        }
    ],
    lastSelectedShape: {
        "alpha": "FA",
        "id": "circle_4641.74639444795_1697899591317",
        "color": "#ff6400",
        "isFilled": true,
        "circleRadius": 23.086461422195327,
        "circleStrokeWidth": 2,
        "type": "circle",
        "x": 83.33469387819179,
        "y": 141.20597309543473,
        "strokeWidth": 1,
        "isDash": false
    }
}
</code>
</pre>
                </div>
            </template>
            <template #tab1>
                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiAnnotatorConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiAnnotatorConfigFields
                        :config="config"
                        :context="{}"
                    />
                </code>
            </template>
            <template #tab2>
                <div>
                    <code><b>@toggleOpenState</b></code>
                </div>
                <div class="text-gray-400 pl-5 mb-4">
                    {{
                        translations.docs.comments.annotator.emits
                            .toggleOpenState[store.lang]
                    }}
                </div>
                <pre>
<code>
    {
        isOpen: boolean,
    }
</code>
</pre>
                <div class="border-t border-gray-500 pt-4">
                    <code><b>@saveAnnotations</b></code>
                </div>
                <div class="text-gray-400 pl-5 mb-4">
                    {{
                        translations.docs.comments.annotator.emits
                            .saveAnnotations[store.lang]
                    }}
                </div>
                <pre>
<code>
    {
        shapes: [],
        lastSelectedShape: {}
    }
</code>
</pre>
                <div class="text-gray-400 pl-5 mb-4">
                    {{
                        translations.docs.comments.annotator.emits.calledWhen[
                            store.lang
                        ]
                    }}
                </div>
            </template>
        </Box>
    </div>
</template>

<style>
.vue-ui-annotator input[type="color"] {
    width: 28px !important;
    height: 32px !important;
    background: white;
}

.vue-ui-annotator input[type="color"]::-webkit-color-swatch {
    border: 1px solid #2d353c !important;
    border-radius: 6px !important;
    box-shadow: none !important;
}

.vue-ui-annotator input[type="number"] {
    background: white;
    border: 1px solid #2d353c !important;
    border-radius: 6px !important;
    color: #2d353c !important;
}
</style>
