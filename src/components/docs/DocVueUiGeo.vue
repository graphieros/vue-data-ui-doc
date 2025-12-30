<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseComment from "../BaseComment.vue";
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
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ThemesVueUiGeo from "../themes/ThemesVueUiGeo.vue";
import FRANCE from "../../resources/FRANCE.json"

const mainConfig = useConfig()
const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    {
        name: "Paris",
        coordinates: [2.3522, 48.8566], // longitude, latitude
        description: "Capital of France",
        color: "#E63946",
        radius: 2,
        dix: 'wut',
    },
    {
        name: "Lyon",
        coordinates: [4.8357, 45.7640],
        description: "Auvergne-Rhône-Alpes",
        color: "#457B9D",
        radius: 1,
    },
    {
        name: "Marseille",
        coordinates: [5.3698, 43.2965],
        description: "Provence-Alpes-Côte d’Azur",
        color: "#2A9D8F",
        radius: 0.8,
    },
    {
        name: "Bordeaux",
        coordinates: [-0.5792, 44.8378],
        description: "Nouvelle-Aquitaine",
        color: "#F4A261",
        radius: 0.7,
    },
    {
        name: "Lille",
        coordinates: [3.0573, 50.6292],
        description: "Hauts-de-France",
        color: "#8D99AE",
        radius: 0.5,
    },
]);

const projections = ref([
    'aitoff',
    'azimuthalEquidistant',
    'bonne',
    'equirectangular',
    'gallPeters',
    'globe',
    'hammer',
    'mercator',
    'mollweide',
    'robinson',
    'sinusoidal',
    'vanDerGrinten',
    'winkelTripel'
])

const currentProjection = ref('equirectangular');

const config = ref({
    loading: false,
    debug: false,
    responsive: false,
    projection: currentProjection.value,
    theme: '',
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            img: true,
            svg: true,
            fullscreen: true,
            annotator: true,
            zoom: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            svg: "Download SVG",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator",
            zoom: "Toggle zoom lock"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    map: {
        geoJson: FRANCE,
        center: [0, 0],
        fitPadding: 24,
    },
    events: {
        datapointEnter: null,
        datapointLeave: null,
        datapointClick: null,
        territoryEnter: null,
        territoryLeave: null,
        territoryClick: null,
    },
    style: {
        fontFamily: 'inherit',
        chart: {
            dimensions: {
                width: null,
                height: null
            },
            backgroundColor: '#FFFFFF',
            color: '#1A1A1A',
            territory: {
                fill: '#F2F3F5',
                stroke: '#D0D4D8',
                strokeWidth: 1,
                hover: {
                    enabledWhenEmpty: false,
                    fill: '#E7E1EE',
                    stroke: '#CCCCCC',
                    strokeWidth: 1.5
                }
            },
            points: {
                radius: 1,
                stroke: '#FFFFFF',
                strokeWidth: 1,
                fill: '#4A4A4A',
                hoverRadiusRatio: 1.2,
                labels: {
                    show: true,
                    fontSizeRatio: 1,
                    color: '#1A1A1A',
                    offsetY: 0,
                }
            },
            controls: {
                position: 'bottom',
                show: true,
                backgroundColor: '#E1E5E8',
                buttonColor: '#E1E5E8',
                color: '#1A1A1A',
                fontSize: 14,
                border: `1px solid #CCCCCC`,
                padding: `0.5rem`,
                borderRadius: `0.25rem`
            },
            title: {
                text: "Title",
                color: "#1A1A1A",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                teleportTo: 'body',
                show: true,
                color: "#1A1A1A",
                backgroundColor: "#F3F4F6",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24,
                smooth: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25
            },
            zoom: {
                active: true,
            }
        }
    },
});

const darkModeConfig = ref({
    loading: false,
    debug: false,
    responsive: false,
    projection: currentProjection.value,
    theme: '',
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            img: true,
            svg: true,
            fullscreen: true,
            annotator: true,
            zoom: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            svg: "Download SVG",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator",
            zoom: "Toggle zoom lock"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    map: {
        geoJson: FRANCE,
        center: [0, 0],
        fitPadding: 24,
    },
    events: {
        datapointEnter: null,
        datapointLeave: null,
        datapointClick: null,
        territoryEnter: null,
        territoryLeave: null,
        territoryClick: null,
    },
    style: {
        fontFamily: 'inherit',
        chart: {
            dimensions: {
                width: null,
                height: null
            },
            backgroundColor: '#1A1A1A',
            color: '#CCCCCC',
            territory: {
                fill: '#2A2A2A',
                stroke: '#5A5A5A',
                strokeWidth: 1,
                hover: {
                    enabledWhenEmpty: false,
                    fill: '#3A3A3A',
                    stroke: '#6A6A6A',
                    strokeWidth: 1.5
                }
            },
            points: {
                radius: 1,
                stroke: '#1A1A1A',
                strokeWidth: 1,
                fill: '#CCCCCC',
                hoverRadiusRatio: 1.2,
                labels: {
                    show: true,
                    fontSizeRatio: 1,
                    color: '#CCCCCC',
                    offsetY: 0,
                }
            },
            controls: {
                position: 'bottom',
                show: true,
                backgroundColor: '#2A2A2A',
                buttonColor: '#2A2A2A',
                color: '#CCCCCC',
                fontSize: 14,
                border: `1px solid #4A4A4A`,
                padding: `0.5rem`,
                borderRadius: `0.25rem`
            },
            title: {
                text: "Title",
                color: "#CCCCCC",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                teleportTo: 'body',
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#5A5A5A",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24,
                smooth: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25
            },
            zoom: {
                active: true,
            }
        }
    },
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode()

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

const dsTypeCode = ref(`type VueUiGeoDatasetItem = {
    [key: string]: any;
    name: string;
    coordinates: [longitude: number, latitude: number];
    description?: string;
    color?: string;
    radius?: number;
}`);

const codeDataset = ref(`const dataset: VueUiGeoDatasetItem[] = [
    {
        name: "Paris",
        coordinates: [2.3522, 48.8566], // longitude, latitude
        description: "Capital of France",
        color: "#E63946",
        radius: 1,
        dix: 'wut',
    },
    {
        name: "Lyon",
        coordinates: [4.8357, 45.7640],
        description: "Auvergne-Rhône-Alpes",
        color: "#457B9D",
        radius: 1,
    },
    {
        name: "Marseille",
        coordinates: [5.3698, 43.2965],
        description: "Provence-Alpes-Côte d’Azur",
        color: "#2A9D8F",
        radius: 1,
    },
    {
        name: "Bordeaux",
        coordinates: [-0.5792, 44.8378],
        description: "Nouvelle-Aquitaine",
        color: "#F4A261",
        radius: 1,
    },
    {
        name: "Lille",
        coordinates: [3.0573, 50.6292],
        description: "Hauts-de-France",
        color: "#8D99AE",
        radius: 1,
    },
]`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiGeo" />
        <BaseDocDescription :text="translations.docs.tooltips.geo[store.lang]" />
        <BaseDocHeaderActions
            targetLink="vue-ui-geo"
            :configSource="mainConfig.vue_ui_geo"
        />

        <div :class="`mx-auto max-w-[600px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <VueUiGeo :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-geo"/>
        </div>

        <Rater itemId="vue_ui_geo" />

        <Box ref="box" showEmits showSlots showThemes showCallbacks showResponsive schema="vue_ui_geo">
            <template #tab0>
                The component also works without dataset.
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
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
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiGeoConfig</code>
                </div>
                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>
<code ref="configCode">
    <BaseDetails attr="const config: VueUiGeoConfig" equal>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr inactive name="debug" attr="debug" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>theme: "", <BaseComment>"dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
        <BaseAttr name="projection" attr="projection" type="select" defaultVal="globe" :options="projections" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="map" :level="1">
            <BaseAttr inactive name="geoJson" defaultVal="null" comment="Use a valid geoJSON format"/>
            <BaseAttr inactive name="center" defaultVal="[0, 0]" comment="Center map on specific coordinates"/>
            <BaseAttr name="fitPadding" attr="map.fitPadding" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="zoom" attr="userOptions.buttons.zoom" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="zoom" attr="userOptions.buttonTitles.zoom" type="text" defaultVal="Toggle zoom lock" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
            </BaseDetails>
            <BaseDetails attr="callbacks" :level="2" title="userOptions.callbacks">
                <BaseTabLink :action="() => setActiveTab(11)" icon="lambda">
                    Check out 'callbacks' tab
                </BaseTabLink>
            </BaseDetails>
            <BaseDetails attr="print" :level="2" title="userOptions.print">
                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
                <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
                <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="events" :level="1">
            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="territoryEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
            <BaseAttr inactive name="territoryLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="territoryClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                <BaseDetails attr="territory" :level="3" title="style.chart.territory">
                    <BaseAttr name="fill" attr="style.chart.territory.fill" type="color" defaultVal="#F2F3F5" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="stroke" attr="style.chart.territory.stroke" type="color" defaultVal="#D0D4D8" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="strokeWidth" attr="style.chart.territory.strokeWidth" type="number" defaultVal="1" :min="0.1" :max="6" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="hover" :level="4" title="style.chart.territory.hover">
                        <BaseAttr name="enabledWhenEmpty" attr="style.chart.territory.hover.enabledWhenEmpty" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fill" attr="style.chart.territory.hover.fill" type="color" defaultVal="#E7E1EE" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="stroke" attr="style.chart.territory.hover.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                        <BaseAttr name="strokeWidth" attr="style.chart.territory.hover.strokeWidth" type="number" defaultVal="1.5" :min="0.1" :max="6" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="points" :level="3" title="style.chart.points">
                    <BaseAttr name="radius" attr="style.chart.points.radius" type="number" defaultVal="1" :min="0.1" :max="6" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Radius can be set on individual datapoints through the dataset"/>
                    <BaseAttr name="stroke" attr="style.chart.points.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="fill" attr="style.chart.points.fill" type="color" defaultVal="#4A4A4A" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Fill can be set on individual datapoints through the dataset"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.points.strokeWidth" type="number" defaultVal="1" :min="0.1" :max="6" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="hoverRadiusRatio" attr="style.chart.points.hoverRadiusRatio" type="number" defaultVal="1.2" :min="1" :max="1.5" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="labels" :level="4" title="style.chart.points.labels">
                        <BaseAttr name="show" attr="style.chart.points.labels.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSizeRatio" attr="style.chart.points.labels.fontSizeRatio" type="number" defaultVal="1" :min="0.5" :max="2" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.points.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="offsetY" attr="style.chart.points.labels.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="controls" title="style.chart.controls" :level="3">
                    <BaseAttr name="show" attr="style.chart.controls.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.controls.position" type="select" defaultVal="'bottom'" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.controls.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.controls.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.controls.fontSize" type="number" defaultVal="14" :min="8" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="border" attr="style.chart.controls.border" type="text" defaultVal="'1px solid #CCCCCC'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="padding" attr="style.chart.controls.padding" type="text" defaultVal="'0.5rem'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderRadius" attr="style.chart.controls.borderRadius" type="text" defaultVal="'0.25rem'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <BaseAttr inactive name="teleportTo" defaultVal="'body'" comment="Sets the 'to' attr of the Teleport Vue component"/>
                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <div class="flex flex-row gap-2 place-items-center">
                        <BaseAttr inactive name="customFormat" defaultVal="null" comment="default behavior. To customize content, see 'custom tooltip' tab (works the same way as the tooltip)"/>
                        <div class="min-w-[200px]">
                            <BaseTabLink :action="() => setActiveTab(4)" icon="tooltip">
                                Check out 'Custom tooltip' tab
                            </BaseTabLink>
                        </div>
                    </div>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smooth" attr="style.chart.tooltip.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smoothForce" attr="style.chart.tooltip.smoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smoothSnapThreshold" attr="style.chart.tooltip.smoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="zoom" title="style.chart.zoom" :level="3">
                    <BaseAttr name="active" attr="style.chart.zoom.active" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="When inactive, pan zoom is disabled, but controls can still be used"/>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab2>
                <ExposedMethods
                    component="VueUiGeo"
                    getImage
                    :names="[
                        'toggleTooltip',
                        'toggleAnnotator',
                        'toggleFullscreen',
                        'generatePdf',
                        'generateImage',
                        'generateSvg',
                        'resetZoom',
                        'zoomIn',
                        'zoomOut',
                        'focusLocation'
                    ]"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiGeo"
                    :types="[
                        'datapoint',
                        'svg',
                        'tooltip-before',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'user-menu',
                        'annotator-actions'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiGeo />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueUiGeo :dataset="dataset" :config="
                            isDarkMode ? {
                                ...mutableConfigDarkMode,
                                responsive: true
                            } : {
                                ...mutableConfig,
                                responsive: true
                            }
                        "/>
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'fullscreen',
                        'img',
                        'pdf',
                        'svg',
                        'zoom'
                    ]"
                />
            </template>
        </Box>

    </div>
</template>