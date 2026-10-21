<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiAgePyramidConfigFields from "./configuration/VueUiAgePyramidConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiAgePyramid from "../themes/ThemesVueUiAgePyramid.vue";
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
    ["<=1922", 100, 25745, 4277],
    ["1923", 99, 15028, 3284],
    ["1924", 98, 20911, 4787],
    ["1925", 97, 29496, 7310],
    ["1926", 96, 40212, 10858],
    ["1927", 95, 51604, 15240],
    ["1928", 94, 65489, 21814],
    ["1929", 93, 80263, 29551],
    ["1930", 92, 101803, 40794],
    ["1931", 91, 117375, 51502],
    ["1932", 90, 136362, 63495],
    ["1933", 89, 144334, 72742],
    ["1934", 88, 163504, 87182],
    ["1935", 87, 173069, 96916],
    ["1936", 86, 185617, 113163],
    ["1937", 85, 193010, 122661],
    ["1938", 84, 201331, 134533],
    ["1939", 83, 213155, 145977],
    ["1940", 82, 205289, 149241],
    ["1941", 81, 201481, 149738],
    ["1942", 80, 229671, 175016],
    ["1943", 79, 251396, 194632],
    ["1944", 78, 260729, 205234],
    ["1945", 77, 270554, 215908],
    ["1946", 76, 360229, 294509],
    ["1947", 75, 382802, 318941],
    ["1948", 74, 393918, 330809],
    ["1949", 73, 397980, 334869],
    ["1950", 72, 406186, 347191],
    ["1951", 71, 395165, 339003],
    ["1952", 70, 408892, 351245],
    ["1953", 69, 402938, 350286],
    ["1954", 68, 412362, 360581],
    ["1955", 67, 417746, 364324],
    ["1956", 66, 421921, 372735],
    ["1957", 65, 425143, 380771],
    ["1958", 64, 427408, 385431],
    ["1959", 63, 437495, 399222],
    ["1960", 62, 440031, 404615],
    ["1961", 61, 440838, 409935],
    ["1962", 60, 441677, 411946],
    ["1963", 59, 458019, 427867],
    ["1964", 58, 463713, 436775],
    ["1965", 57, 458021, 434732],
    ["1966", 56, 456200, 435374],
    ["1967", 55, 443201, 426371],
    ["1968", 54, 445982, 426911],
    ["1969", 53, 450429, 434516],
    ["1970", 52, 454624, 442538],
    ["1971", 51, 464859, 454831],
    ["1972", 50, 468092, 457790],
    ["1973", 49, 459061, 445647],
    ["1974", 48, 436700, 427666],
    ["1975", 47, 416726, 406790],
    ["1976", 46, 404733, 393123],
    ["1977", 45, 416080, 404238],
    ["1978", 44, 418005, 402427],
    ["1979", 43, 428335, 409645],
    ["1980", 42, 455337, 432659],
    ["1981", 41, 449043, 427052],
    ["1982", 40, 446946, 425275],
    ["1983", 39, 422931, 399376],
    ["1984", 38, 429907, 404828],
    ["1985", 37, 436180, 407776],
    ["1986", 36, 436039, 409529],
    ["1987", 35, 429765, 403630],
    ["1988", 34, 428232, 405642],
    ["1989", 33, 419725, 400620],
    ["1990", 32, 413380, 402198],
    ["1991", 31, 402304, 390496],
    ["1992", 30, 395137, 383535],
    ["1993", 29, 375228, 367127],
    ["1994", 28, 372462, 362967],
    ["1995", 27, 375987, 372252],
    ["1996", 26, 374287, 374366],
    ["1997", 25, 369379, 374512],
    ["1998", 24, 376420, 382554],
    ["1999", 23, 376314, 389580],
    ["2000", 22, 399322, 421152],
    ["2001", 21, 395152, 418256],
    ["2002", 20, 396836, 418660],
    ["2003", 19, 399346, 422821],
    ["2004", 18, 406838, 432885],
    ["2005", 17, 413489, 437659],
    ["2006", 16, 423157, 447090],
    ["2007", 15, 419925, 440752],
    ["2008", 14, 420554, 444448],
    ["2009", 13, 419008, 440783],
    ["2010", 12, 424529, 445511],
    ["2011", 11, 413317, 433203],
    ["2012", 10, 410103, 432223],
    ["2013", 9, 404450, 422473],
    ["2014", 8, 402149, 417528],
    ["2015", 7, 388256, 407067],
    ["2016", 6, 377726, 394679],
    ["2017", 5, 366538, 382762],
    ["2018", 4, 356873, 376705],
    ["2019", 3, 351707, 368670],
    ["2020", 2, 341042, 356678],
    ["2021", 1, 343026, 357351],
    ["2022", 0, 330929, 345538],
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontFamily: "inherit",
                height: 500,
                width: 500,
                layout: {
                    padding: { top: 12, right: 12, bottom: 36, left: 12 },
                    grid: {
                        show: true,
                        stroke: isDarkMode.value ? "#CCCCCC" : "#C4C4C4",
                        strokeWidth: 1,
                    },
                    dataLabels: {
                        sideTitles: {
                            show: true,
                            fontSize: 18,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            useSideColor: true,
                            bold: false,
                            offsetY: 0,
                        },
                        xAxis: {
                            show: true,
                            fontSize: 12,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            scale: 1000,
                            translation: "in thousands",
                            rotation: 0,
                            autoRotate: { enable: true, angle: -30 },
                        },
                        yAxis: {
                            show: true,
                            display: "age",
                            fontSize: 12,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            showEvery: 5,
                        },
                    },
                    centerSlit: { width: 20 },
                    bars: {
                        gap: 0,
                        borderRadius: 1,
                        left: { color: "#ff7f0e" },
                        right: { color: "#1f77b4" },
                        gradient: {
                            show: true,
                            underlayer: "#FFFFFF",
                            intensity: 60,
                            shiftHue: 0.05,
                        },
                        labels: {
                            show: true,
                            showOnHover: true,
                            fontSize: 12,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            formatter: null,
                            offsetX: 0,
                        },
                    },
                },
                highlighter: {
                    color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                    opacity: 0,
                },
                title: {
                    text: "Title",
                    color: isDarkMode.value ? "#fafafa" : "#1A1A1A",
                    fontSize: 20,
                    bold: true,
                    textAlign: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        color: isDarkMode.value ? "#A1A1A1" : "#565656",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false,
                    },
                },
                tooltip: {
                    teleportTo: "body",
                    show: true,
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 14,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                    borderWidth: 1,
                    backgroundOpacity: isDarkMode.value ? 50 : 30,
                    position: "center",
                    offsetY: 24,
                    offsetX: 0,
                    smooth: true,
                    smoothForce: 0.18,
                    smoothSnapThreshold: 0.25,
                },
            },
            translations: {
                age: "age",
                male: "male",
                female: "female",
                total: "total",
                year: "year",
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
                    fullscreen: true,
                    annotator: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    tooltip: "Toggle tooltip",
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    table: "Toggle table",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
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
    return `Array<Array<string | number>>`;
});

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const customFormatCode =
    ref(`customFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiAgePyramid" />

        <BaseDocDescription
            :text="translations.docs.tooltips.agePyramid[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-age-pyramid"
            targetMaker="VueUiAgePyramid"
            :configSource="mainConfig.vue_ui_age_pyramid"
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
                    <VueUiAgePyramid
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_age_pyramid" />

        <BaseMigrationInfo autoRotate debug padding />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showThemes
            showResponsive
            showCallbacks
            schema="vue_ui_age_pyramid"
            signInfo="positiveOnly"
        >
            <template #dataset>
                <CodeParser
                    language="typescript"
                    @copy="store.copy()"
                    :content="dsTypeCode"
                    class="my-6"
                />
                {{ translations.docs.example[store.lang] }}:
                <br />
                {{
                    translations.docs.comments.agePyramid.arrayOfEach[
                        store.lang
                    ]
                }}<br /><br />
                {{ translations.docs.comments.agePyramid.cols[store.lang] }}
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <pre>
<code>
[
    [...], <span class="text-gray-500">// {{ translations.docs.comments.agePyramid.start[store.lang] }}</span>
    ['2017', 5, 366538, 382762],
    ['2018', 4, 356873, 376705],
    ['2019', 3, 351707, 368670],
    ['2020', 2, 341042, 356678],
    ['2021', 1, 343026, 357351],
    ['2022', 0, 330929, 345538]
]
</code>
</pre>
                </div>
            </template>
            <template #configuration>
                <DebugHint
                    component="VueUiAgePyramid"
                    configType="VueUiAgePyramidConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiAgePyramidConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiAgePyramidConfigFields
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
            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiAgePyramid"
                    :names="['copyAlt']"
                />
                <ExposedMethods
                    component="VueUiAgePyramid"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                    ]"
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiAgePyramid"
                    :types="[
                        'svg-underlayer',
                        'hint',
                        'svg',
                        'legend',
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-age-pyramid.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>
            <template #custom-tooltip>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.style.tooltip.customFormat</code
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

            <template #themes>
                <ThemesVueUiAgePyramid />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiAgePyramid
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

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'pdf',
                        'table',
                        'tooltip',
                        'svg',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
