<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseCard from "../BaseCard.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import DocSnapper from "../DocSnapper.vue";
import useMobile from "../../useMobile";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import VueUiLabel from "vue-data-ui/vue-ui-label";
import { mergeConfigs } from "vue-data-ui";
import CodeParser from "../customization/CodeParser.vue";
import { useRouter } from "vue-router";
import ComponentEmits from "../ComponentEmits.vue";
import ThemesVueUiLabel from "../themes/ThemesVueUiLabel.vue";
import ExposedMethods from "../ExposedMethods.vue";
import UcLabel from "../useCases/uc-label.vue";

const mainConfig = useConfig();

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const key = ref(0);
const translations = computed(() => store.translations);
const isFixed = ref(false);
const { isMobile } = useMobile();

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const isDragging = ref(false);

const configLine = computed(() => {
    return {
        theme: isDarkMode.value ? "dark" : undefined,
        chart: {
            highlighter: {
                opacity: 0,
            },
            userOptions: { show: false },
            legend: { show: false },
            tooltip: {
                show: false,
            },
            backgroundColor: "transparent",
            padding: {
                right: 24,
            },
            zoom: {
                autoFit: true,
                keepState: true,
                minimap: {
                    show: true,
                    frameColor: "transparent",
                },
            },
        },
    };
});

const config = ref({
    theme: "",
    a11y: {
        translations: {
            keyboardNavigation:
                "Use the arrow keys to move this label. Hold Shift while pressing an arrow key to move it by a larger step.",
        },
    },
    title: {
        text: "",
        color: "#1A1A1A",
        fontSize: 24,
        lineHeight: 24,
        bold: false,
        textAlign: "left",
        gap: 6,
        marker: {
            color: null,
            shape: "circle",
            beforeText: true,
            size: 14,
            offsetY: 0,
        },
    },
    content: {
        text: "",
        color: "#1A1A1A",
        fontSize: 20,
        lineHeight: 20,
        bold: false,
        textAlign: "left",
    },
    position: "top",
    box: {
        show: true,
        backgroundColor: "#FFFFFFDD",
        borderColor: "#6A6A6A",
        borderRadius: 3,
        borderWidth: 1,
        maxWidth: 256,
        padding: {
            top: 12,
            right: 12,
            bottom: 12,
            left: 12,
        },
    },
    drag: {
        enable: true,
        handlePosition: "left",
        handleWidth: 24,
        iconSize: 24,
        showSeparator: false,
        iconColor: "#1A1A1A",
        iconOpacity: 0.6,
    },
    link: {
        show: true,
        stroke: "#6A6A6A",
        strokeWidth: 1,
        strokeDasharray: "0",
        length: 60,
        targetPlot: {
            show: true,
            radius: 2,
            stroke: "#FFFFFF",
            strokeWidth: 1,
        },
    },
    overflow: false,
    overlap: false,
    collisionGap: 0,
});

const darkModeConfig = ref({
    theme: "",
    a11y: {
        translations: {
            keyboardNavigation:
                "Use the arrow keys to move this label. Hold Shift while pressing an arrow key to move it by a larger step.",
        },
    },
    title: {
        text: "",
        color: "#CCCCCC",
        fontSize: 24,
        lineHeight: 24,
        bold: false,
        textAlign: "left",
        gap: 6,
        marker: {
            color: null,
            shape: "circle",
            beforeText: true,
            size: 14,
            offsetY: 0,
        },
    },
    content: {
        text: "",
        color: "#CCCCCC",
        fontSize: 20,
        lineHeight: 20,
        bold: false,
        textAlign: "left",
    },
    position: "top",
    box: {
        show: true,
        backgroundColor: "#3A3A3ADD",
        borderColor: "#6A6A6A",
        borderRadius: 3,
        borderWidth: 1,
        maxWidth: 256,
        padding: {
            top: 12,
            right: 12,
            bottom: 12,
            left: 12,
        },
    },
    drag: {
        enable: true,
        handlePosition: "left",
        handleWidth: 24,
        iconSize: 24,
        showSeparator: false,
        iconColor: "#CCCCCC",
        iconOpacity: 0.6,
    },
    link: {
        show: true,
        stroke: "#6A6A6A",
        strokeWidth: 1,
        strokeDasharray: "0",
        length: 60,
        targetPlot: {
            show: true,
            radius: 2,
            stroke: "#1A1A1A",
            strokeWidth: 1,
        },
    },
    overflow: false,
    overlap: false,
    collisionGap: 0,
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(
    JSON.parse(JSON.stringify(darkModeConfig.value)),
);

const datasetLine = computed(() => [
    {
        name: "Series A",
        type: "line",
        smooth: true,
        series: [2, 3, 5, 8, 13, 21, 3, 5, 8, 13, 21, 34, 5, 8, 13, 21, 24],
        labels: [
            {
                index: 11,
                title: "We are so back",
                content: "The future looks bright from up there.",
                shape: isDarkMode.value
                    ? mutableConfigDarkMode.value.title.marker.shape
                    : mutableConfig.value.title.marker.shape,
                color: "#00DDAA",
                position: isDarkMode.value
                    ? mutableConfigDarkMode.value.position
                    : mutableConfig.value.position,
            },
        ],
    },
    {
        name: "Series B",
        type: "bar",
        smooth: true,
        series: [0, 1, 1, 2, 3, 5, 8, 2, 3, 5, 8, 13, 3, 5, 8, 13, 21],
        labels: [
            {
                index: 7,
                title: "Alert",
                content: "A sudden drop occurred here.",
                shape: isDarkMode.value
                    ? mutableConfigDarkMode.value.title.marker.shape
                    : mutableConfig.value.title.marker.shape,
                color: "#FFAA00",
                position: isDarkMode.value
                    ? mutableConfigDarkMode.value.position
                    : mutableConfig.value.position,
            },
        ],
    },
]);

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(
        JSON.stringify(darkModeConfig.value),
    );
}

function getLabelConfig(label) {
    return mergeConfigs({
        defaultConfig: isDarkMode.value
            ? mutableConfigDarkMode.value
            : mutableConfig.value,
        userConfig: {
            position: label.position,
            title: {
                text: label.title,
                marker: {
                    color: label.color,
                    shape: label.shape,
                },
            },
            content: {
                text: label.content,
            },
        },
    });
}

function getLabelCoordinates(label, series, svg) {
    return series.plots[label.index - svg.slicer.start];
}

const comment = ref({
    en: `Use the @dragEnd emit to get the label's new position. A label's position can be recorded in the backend, and restored via the position property of the dataset. By default, position.x and position.y are null, and labels are placed automatically. Use these properties to force a preferred placement.`,
    fr: `Utilisez l’événement @dragEnd pour obtenir la nouvelle position de l’étiquette. La position d’une étiquette peut être enregistrée dans le backend, puis restaurée via la propriété position du dataset. Par défaut, position.x et position.y sont null, et les étiquettes sont placées automatiquement. Utilisez ces propriétés pour imposer un placement préféré.`,
    pt: `Use o evento @dragEnd para obter a nova posição do rótulo. A posição de um rótulo pode ser registrada no backend e restaurada por meio da propriedade position do dataset. Por padrão, position.x e position.y são null, e os rótulos são posicionados automaticamente. Use essas propriedades para forçar um posicionamento preferencial.`,
    de: `Verwenden Sie das @dragEnd-Event, um die neue Position des Labels zu erhalten. Die Position eines Labels kann im Backend gespeichert und über die position-Eigenschaft des Datasets wiederhergestellt werden. Standardmäßig sind position.x und position.y null, und Labels werden automatisch platziert. Verwenden Sie diese Eigenschaften, um eine bevorzugte Platzierung zu erzwingen.`,
    zh: `使用 @dragEnd 事件获取标签的新位置。标签的位置可以记录在后端，并通过 dataset 的 position 属性恢复。默认情况下，position.x 和 position.y 为 null，标签会自动放置。使用这些属性可以强制指定首选位置。`,
    ja: `@dragEnd イベントを使用してラベルの新しい位置を取得します。ラベルの位置はバックエンドに保存し、dataset の position プロパティを使用して復元できます。デフォルトでは position.x と position.y は null で、ラベルは自動的に配置されます。これらのプロパティを使用して優先する配置を強制できます。`,
    es: `Utilice el evento @dragEnd para obtener la nueva posición de la etiqueta. La posición de una etiqueta puede guardarse en el backend y restaurarse mediante la propiedad position del dataset. De forma predeterminada, position.x y position.y son null, y las etiquetas se colocan automáticamente. Utilice estas propiedades para forzar una ubicación preferida.`,
    ko: `@dragEnd 이벤트를 사용하여 레이블의 새 위치를 가져옵니다. 레이블의 위치는 백엔드에 저장한 뒤 dataset의 position 속성을 통해 복원할 수 있습니다. 기본적으로 position.x와 position.y는 null이며 레이블은 자동으로 배치됩니다. 이 속성들을 사용하여 선호하는 위치를 강제로 지정할 수 있습니다.`,
    ar: `استخدم حدث @dragEnd للحصول على الموضع الجديد للتسمية. يمكن حفظ موضع التسمية في الواجهة الخلفية واستعادته عبر الخاصية position في dataset. بشكل افتراضي، تكون position.x وposition.y بقيمة null، ويتم وضع التسميات تلقائيًا. استخدم هذه الخصائص لفرض موضع مفضل.`,
});

const targetComment = ref({
    en: `Coordinate of the label's target`,
    fr: `Coordonnée de la cible de l’étiquette`,
    pt: `Coordenada do alvo do rótulo`,
    de: `Koordinate des Ziels des Labels`,
    zh: `标签目标的坐标`,
    ja: `ラベルのターゲット座標`,
    es: `Coordenada del objetivo de la etiqueta`,
    ko: `레이블 대상의 좌표`,
    ar: `إحداثيات هدف التسمية`,
});

const commentPosition = ref({
    en: `Coordinate at the label's top left`,
    fr: `Coordonnée en haut à gauche de l’étiquette`,
    pt: `Coordenada no canto superior esquerdo do rótulo`,
    de: `Koordinate oben links am Label`,
    zh: `标签左上角的坐标`,
    ja: `ラベル左上の座標`,
    es: `Coordenada en la esquina superior izquierda de la etiqueta`,
    ko: `레이블 왼쪽 상단의 좌표`,
    ar: `إحداثيات الزاوية العلوية اليسرى للتسمية`,
});

const dsTypeCode = computed(() => {
    return `type VueUiLabelDataset = {
    [key: string]: any;
    id?: number | string;
    x: number; // ${targetComment.value[store.lang]}
    y: number; // ${targetComment.value[store.lang]}
    position?: {
        // ${comment.value[store.lang]}
        x: number | null; // ${commentPosition.value[store.lang]}
        y: number | null; // ${commentPosition.value[store.lang]}
    };
}`;
});

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
        <BaseDocTitle name="VueUiLabel" />
        <BaseDocDescription
            :text="translations.docs.tooltips.label[store.lang]"
        />

        <div class="transition-all mx-auto w-full sm:w-1/2">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="
                    copyToClipboard(isDarkMode ? darkModeConfig : config)
                "
            >
                <BaseCard>
                    <VueUiXy :config="configLine" :dataset="datasetLine">
                        <template #svg="{ svg }">
                            <g
                                v-for="(series, i) in svg.data"
                                :key="series.name"
                            >
                                <VueUiLabel
                                    v-for="(label, j) in series.labels"
                                    :key="`label_${i}_${j}`"
                                    :dataset="
                                        getLabelCoordinates(label, series, svg)
                                    "
                                    :config="getLabelConfig(label)"
                                    @dragStart="isDragging = true"
                                    @drag="isDragging = true"
                                    @dragEnd="isDragging = false"
                                    @mouseenter="isDragging = true"
                                    @mouseleave="isDragging = false"
                                />
                            </g>
                        </template>
                    </VueUiXy>
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_label" />

        <Box ref="box" showEmits showSlots showThemes showUseCases>
            <template #tab0>
                <CodeParser
                    language="typescript"
                    @copy="store.copy()"
                    :content="dsTypeCode"
                    :title="translations.docs.datastructure[store.lang]"
                    class="my-6"
                />
            </template>

            <template #tab1>
                <BaseCopyConfig
                    :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
                    @reset="resetDefault"
                />
                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiLabelConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>
                <code ref="configCode">
                    <BaseDetails attr="const config: VueUiLabelConfig" equal>
                        <BaseAttr
                            inactive
                            name="theme"
                            defaultVal="''"
                            comment="'' | 'celebration' | 'celebrationNight' | 'zen' | 'hack' | 'concrete' | 'minimal' | 'minimalDark'"
                        />
                        <BaseAttr
                            name="overflow"
                            attr="overflow"
                            type="checkbox"
                            defaultVal="false"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="overlap"
                            attr="overlap"
                            type="checkbox"
                            defaultVal="false"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="collisionGap"
                            attr="collisionGap"
                            type="number"
                            defaultVal="0"
                            :min="0"
                            :max="100"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseAttr
                            name="position"
                            attr="position"
                            type="select"
                            :options="[
                                'auto',
                                'top',
                                'right',
                                'bottom',
                                'left',
                            ]"
                            defaultVal="auto"
                            :light="mutableConfig"
                            :dark="mutableConfigDarkMode"
                        />
                        <BaseDetails attr="a11y" title="a11y" :level="1">
                            <BaseDetails
                                attr="translations"
                                title="a11y.translations"
                                :level="2"
                            >
                                <BaseAttr
                                    name="keyboardNavigation"
                                    attr="a11y.translations.keyboardNavigation"
                                    type="text"
                                    defaultVal="Use the arrow keys to move this label. Hold Shift while pressing an arrow key to move it by a larger step."
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="title" name="title" :level="1">
                            <BaseAttr
                                inactive
                                name="text"
                                attr="title.text"
                                type="text"
                                defaultVal="''"
                            />
                            <BaseAttr
                                name="color"
                                attr="title.color"
                                type="color"
                                defaultVal="#2D353C"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="fontSize"
                                attr="title.fontSize"
                                defaultVal="14"
                                type="number"
                                :min="8"
                                :max="42"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="lineHeight"
                                attr="title.lineHeight"
                                defaultVal="14"
                                type="number"
                                :min="8"
                                :max="42"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="bold"
                                attr="title.bold"
                                type="checkbox"
                                defaultVal="false"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="textAlign"
                                attr="title.textAlign"
                                type="select"
                                defaultVal="left"
                                :options="['left', 'center', 'right']"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="gap"
                                attr="title.gap"
                                defaultVal="6"
                                type="number"
                                :min="0"
                                :max="100"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseDetails
                                attr="marker"
                                title="title.marker"
                                :level="2"
                            >
                                <BaseAttr
                                    name="color"
                                    attr="title.marker.color"
                                    type="color"
                                    defaultVal="null"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="shape"
                                    attr="title.marker.shape"
                                    type="select"
                                    :options="[
                                        'circle',
                                        'triangle',
                                        'square',
                                        'diamond',
                                        'pentagon',
                                        'hexagon',
                                    ]"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="beforeText"
                                    attr="title.marker.beforeText"
                                    type="checkbox"
                                    defaultVal="true"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="size"
                                    attr="title.marker.size"
                                    type="number"
                                    defaultVal="14"
                                    :min="0"
                                    :max="42"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="offsetY"
                                    attr="title.marker.offsetY"
                                    type="number"
                                    defaultVal="0"
                                    :min="-42"
                                    :max="42"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="content" title="content" :level="1">
                            <BaseAttr
                                inactive
                                name="text"
                                attr="content.text"
                                type="text"
                                defaultVal="''"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="color"
                                attr="content.color"
                                type="color"
                                defaultVal="#2D353C"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="fontSize"
                                attr="content.fontSize"
                                type="number"
                                defaultVal="12"
                                :min="8"
                                :max="42"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="lineHeight"
                                attr="content.lineHeight"
                                type="number"
                                defaultVal="12"
                                :min="8"
                                :max="42"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="bold"
                                attr="content.bold"
                                type="checkbox"
                                defaultVal="false"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="textAlign"
                                attr="content.textAlign"
                                defaultVal="left"
                                type="select"
                                :options="['left', 'center', 'right']"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                        </BaseDetails>
                        <BaseDetails attr="link" title="link" :level="1">
                            <BaseAttr
                                name="show"
                                attr="link.show"
                                type="checkbox"
                                defaultVal="true"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="stroke"
                                attr="link.stroke"
                                type="color"
                                defaultVal="#2D353C"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="strokeWidth"
                                attr="link.strokeWidth"
                                type="number"
                                :min="0"
                                :max="6"
                                defaultVal="1"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="strokeDasharray"
                                attr="link.strokeDasharray"
                                type="text"
                                defaultVal="'0'"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="length"
                                attr="link.length"
                                defaultVal="20"
                                type="number"
                                :min="0"
                                :max="100"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseDetails
                                attr="targetPlot"
                                title="link.targetPlot"
                                :level="2"
                            >
                                <BaseAttr
                                    name="show"
                                    attr="link.targetPlot.show"
                                    type="checkbox"
                                    defaultVal="true"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="radius"
                                    attr="link.targetPlot.radius"
                                    type="number"
                                    defaultVal="2"
                                    :min="0"
                                    :max="12"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="stroke"
                                    attr="link.targetPlot.stroke"
                                    type="color"
                                    defaultVal="#FFFFFF"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="strokeWidth"
                                    attr="link.targetPlot.strokeWidth"
                                    type="number"
                                    defaultVal="1"
                                    :min="0"
                                    :max="12"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="box" title="box" :level="1">
                            <BaseAttr
                                name="show"
                                attr="box.show"
                                type="checkbox"
                                defaultVal="true"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="backgroundColor"
                                attr="box.backgroundColor"
                                type="color"
                                defaultVal="#FFFFFF"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="borderColor"
                                attr="box.borderColor"
                                type="color"
                                defaultVal="#2D353C"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="borderWidth"
                                attr="box.borderWidth"
                                type="number"
                                defaultVal="1"
                                :min="0"
                                :max="6"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="borderRadius"
                                attr="box.borderRadius"
                                type="number"
                                defaultVal="3"
                                :min="0"
                                :max="24"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="maxWidth"
                                attr="box.maxWidth"
                                type="number"
                                :min="100"
                                :max="400"
                                :step="10"
                                defaultVal="200"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseDetails
                                attr="padding"
                                title="box.padding"
                                :level="2"
                            >
                                <BaseAttr
                                    name="top"
                                    attr="box.padding.top"
                                    type="number"
                                    defaultVal="8"
                                    :min="0"
                                    :max="42"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="right"
                                    attr="box.padding.right"
                                    type="number"
                                    defaultVal="8"
                                    :min="0"
                                    :max="42"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="bottom"
                                    attr="box.padding.bottom"
                                    type="number"
                                    defaultVal="8"
                                    :min="0"
                                    :max="42"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                                <BaseAttr
                                    name="left"
                                    attr="box.padding.left"
                                    type="number"
                                    defaultVal="8"
                                    :min="0"
                                    :max="42"
                                    :light="mutableConfig"
                                    :dark="mutableConfigDarkMode"
                                />
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="drag" title="drag" :level="1">
                            <BaseAttr
                                name="enable"
                                attr="drag.enable"
                                type="checkbox"
                                defaultVal="true"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="handlePosition"
                                attr="drag.handlePosition"
                                type="select"
                                defaultVal="left"
                                :options="['top', 'right', 'bottom', 'left']"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="handleWidth"
                                attr="drag.handleWidth"
                                type="number"
                                defaultVal="18"
                                :min="8"
                                :max="64"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="iconSize"
                                attr="drag.iconSize"
                                type="number"
                                defaultVal="16"
                                :min="12"
                                :max="24"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="showSeparator"
                                attr="drag.showSeparator"
                                type="checkbox"
                                defaultVal="false"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="iconColor"
                                attr="drag.iconColor"
                                type="color"
                                defaultVal="#2D353C"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                            <BaseAttr
                                name="iconOpacity"
                                attr="drag.iconOpacity"
                                type="number"
                                :min="0.1"
                                :max="1"
                                :step="0.1"
                                :light="mutableConfig"
                                :dark="mutableConfigDarkMode"
                            />
                        </BaseDetails>
                    </BaseDetails>
                </code>
            </template>

            <template #tab2>
                <ComponentEmits
                    component="VueUiLabel"
                    :names="[
                        'dragStart',
                        'drag',
                        'dragEnd',
                        'mouseenter',
                        'mouseleave',
                        'click',
                        'focus',
                        'blur',
                    ]"
                />
                <ExposedMethods component="VueUiLabel" :names="['reorder']" />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiLabel"
                    :types="[
                        'VueUiLabel__before',
                        'VueUiLabel__after',
                        'VueUiLabel__title',
                        'VueUiLabel__content',
                    ]"
                />
            </template>

            <template #tab5>
                <UcLabel />
            </template>

            <template #tab6>
                <ThemesVueUiLabel />
            </template>
        </Box>
    </div>
</template>
