<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import useMobile from "../../useMobile";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import CodeParser from "../customization/CodeParser.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import { VueUiPattern } from "vue-data-ui";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseComment from "../BaseComment.vue";
import ExposedMethods from "../ExposedMethods.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

const mainConfig = useConfig();
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
})

const dataset = ref({
  AFG: { value: 20 },     // Afghanistan
  ALB: { value: 18 },     // Albania
  DZA: { value: 225 },    // Algeria
  AND: { value: 3 },      // Andorra
  AGO: { value: 74 },     // Angola
  ATG: { value: 2 },      // Antigua and Barbuda
  ARG: { value: 641 },    // Argentina
  ARM: { value: 21 },     // Armenia
  AUS: { value: 1622 },   // Australia
  AUT: { value: 501 },    // Austria
  AZE: { value: 78 },     // Azerbaijan
  BHS: { value: 13 },     // Bahamas
  BHR: { value: 45 },     // Bahrain
  BGD: { value: 460 },    // Bangladesh
  BRB: { value: 6 },      // Barbados
  BLR: { value: 69 },     // Belarus
  BEL: { value: 582 },    // Belgium
  BLZ: { value: 2 },      // Belize
  BEN: { value: 18 },     // Benin
  BTN: { value: 3 },      // Bhutan
  BOL: { value: 44 },     // Bolivia
  BIH: { value: 27 },     // Bosnia and Herzegovina
  BWA: { value: 20 },     // Botswana
  BRA: { value: 2136 },   // Brazil
  BRN: { value: 18 },     // Brunei
  BGR: { value: 89 },     // Bulgaria
  BFA: { value: 20 },     // Burkina Faso
  BDI: { value: 4 },      // Burundi
  KHM: { value: 30 },     // Cambodia
  CMR: { value: 46 },     // Cameroon
  CAN: { value: 2250 },   // Canada
  CPV: { value: 2 },      // Cape Verde
  CAF: { value: 2 },      // Central African Republic
  TCD: { value: 12 },     // Chad
  CHL: { value: 334 },    // Chile
  CHN: { value: 17679 },  // China
  COL: { value: 314 },    // Colombia
  COM: { value: 2 },      // Comoros
  COD: { value: 63 },     // Congo (Dem. Rep.)
  COG: { value: 16 },     // Congo (Rep.)
  CRI: { value: 74 },     // Costa Rica
  CIV: { value: 70 },     // Côte d’Ivoire
  HRV: { value: 79 },     // Croatia
  CUB: { value: 100 },    // Cuba (estimate)
  CYP: { value: 29 },     // Cyprus
  CZE: { value: 326 },    // Czechia
  DNK: { value: 406 },    // Denmark
  DJI: { value: 3 },      // Djibouti
  DMA: { value: 1 },      // Dominica
  DOM: { value: 113 },    // Dominican Republic
  ECU: { value: 115 },    // Ecuador
  EGY: { value: 474 },    // Egypt
  SLV: { value: 32 },     // El Salvador
  GNQ: { value: 12 },     // Equatorial Guinea
  ERI: { value: 3 },      // Eritrea
  EST: { value: 39 },     // Estonia
  SWZ: { value: 5 },      // Eswatini
  ETH: { value: 156 },    // Ethiopia
  FJI: { value: 5 },      // Fiji
  FIN: { value: 300 },    // Finland
  FRA: { value: 3040 },   // France
  GAB: { value: 21 },     // Gabon
  GMB: { value: 2 },      // Gambia
  GEO: { value: 25 },     // Georgia
  DEU: { value: 4212 },   // Germany
  GHA: { value: 72 },     // Ghana
  GRC: { value: 239 },    // Greece
  GRD: { value: 1 },      // Grenada
  GTM: { value: 95 },     // Guatemala
  GIN: { value: 19 },     // Guinea
  GNB: { value: 2 },      // Guinea-Bissau
  GUY: { value: 15 },     // Guyana
  HTI: { value: 14 },     // Haiti
  HND: { value: 32 },     // Honduras
  HUN: { value: 194 },    // Hungary
  ISL: { value: 30 },     // Iceland
  IND: { value: 3743 },   // India
  IDN: { value: 1321 },   // Indonesia
  IRN: { value: 413 },    // Iran
  IRQ: { value: 267 },    // Iraq
  IRL: { value: 504 },    // Ireland
  ISR: { value: 525 },    // Israel
  ITA: { value: 2212 },   // Italy
  JAM: { value: 17 },     // Jamaica
  JPN: { value: 4389 },   // Japan
  JOR: { value: 51 },     // Jordan
  KAZ: { value: 226 },    // Kazakhstan
  KEN: { value: 113 },    // Kenya
  KIR: { value: 0.2 },    // Kiribati
  PRK: { value: 31 },     // North Korea (estimate)
  KOR: { value: 1735 },   // South Korea
  KWT: { value: 183 },    // Kuwait
  KGZ: { value: 9 },      // Kyrgyzstan
  LAO: { value: 17 },     // Laos
  LVA: { value: 46 },     // Latvia
  LBN: { value: 20 },     // Lebanon
  LSO: { value: 2 },      // Lesotho
  LBR: { value: 4 },      // Liberia
  LBY: { value: 44 },     // Libya
  LIE: { value: 7 },      // Liechtenstein (est.)
  LTU: { value: 71 },     // Lithuania
  LUX: { value: 89 },     // Luxembourg
  MDG: { value: 15 },     // Madagascar
  MWI: { value: 13 },     // Malawi
  MYS: { value: 434 },    // Malaysia
  MDV: { value: 6 },      // Maldives
  MLI: { value: 20 },     // Mali
  MLT: { value: 20 },     // Malta
  MHL: { value: 0.3 },    // Marshall Islands
  MRT: { value: 11 },     // Mauritania
  MUS: { value: 13 },     // Mauritius
  MEX: { value: 1710 },   // Mexico
  FSM: { value: 0.4 },    // Micronesia
  MDA: { value: 15 },     // Moldova
  MCO: { value: 7 },      // Monaco (est.)
  MNG: { value: 16 },     // Mongolia
  MNE: { value: 6 },      // Montenegro
  MAR: { value: 140 },    // Morocco
  MOZ: { value: 19 },     // Mozambique
  MMR: { value: 59 },     // Myanmar
  NAM: { value: 13 },     // Namibia
  NRU: { value: 0.1 },    // Nauru
  NPL: { value: 44 },     // Nepal
  NLD: { value: 1070 },   // Netherlands
  NZL: { value: 248 },    // New Zealand
  NIC: { value: 15 },     // Nicaragua
  NER: { value: 16 },     // Niger
  NGA: { value: 477 },    // Nigeria
  MKD: { value: 15 },     // North Macedonia
  NOR: { value: 578 },    // Norway
  OMN: { value: 97 },     // Oman
  PAK: { value: 374 },    // Pakistan
  PLW: { value: 0.3 },    // Palau
  PAN: { value: 76 },     // Panama
  PNG: { value: 28 },     // Papua New Guinea
  PRY: { value: 44 },     // Paraguay
  PER: { value: 268 },    // Peru
  PHL: { value: 441 },    // Philippines
  POL: { value: 789 },    // Poland
  PRT: { value: 272 },    // Portugal
  QAT: { value: 219 },    // Qatar
  ROU: { value: 350 },    // Romania
  RUS: { value: 2275 },   // Russia
  RWA: { value: 14 },     // Rwanda
  KNA: { value: 1 },      // St. Kitts & Nevis
  LCA: { value: 2 },      // St. Lucia
  VCT: { value: 1 },      // St. Vincent & Grenadines
  WSM: { value: 1 },      // Samoa
  SMR: { value: 2 },      // San Marino
  STP: { value: 0.5 },    // Sao Tome & Principe
  SAU: { value: 1107 },   // Saudi Arabia
  SEN: { value: 28 },     // Senegal
  SRB: { value: 63 },     // Serbia
  SYC: { value: 2 },      // Seychelles
  SLE: { value: 4 },      // Sierra Leone
  SGP: { value: 497 },    // Singapore
  SVK: { value: 120 },    // Slovakia
  SVN: { value: 69 },     // Slovenia
  SLB: { value: 1 },      // Solomon Islands
  SOM: { value: 8 },      // Somalia
  ZAF: { value: 406 },    // South Africa
  SSD: { value: 4 },      // South Sudan
  ESP: { value: 1495 },   // Spain
  LKA: { value: 91 },     // Sri Lanka
  SDN: { value: 34 },     // Sudan
  SUR: { value: 6 },      // Suriname
  SWE: { value: 604 },    // Sweden
  CHE: { value: 892 },    // Switzerland
  SYR: { value: 21 },     // Syria
  TWN: { value: 789 },    // Taiwan (estimate)
  TJK: { value: 11 },     // Tajikistan
  TZA: { value: 85 },     // Tanzania
  THA: { value: 536 },    // Thailand
  TLS: { value: 2 },      // Timor-Leste
  TGO: { value: 8 },      // Togo
  TON: { value: 0.5 },    // Tonga
  TTO: { value: 30 },     // Trinidad and Tobago
  TUN: { value: 54 },     // Tunisia
  TUR: { value: 1148 },   // Turkey
  TKM: { value: 46 },     // Turkmenistan
  TUV: { value: 0.05 },   // Tuvalu
  UGA: { value: 46 },     // Uganda
  UKR: { value: 156 },    // Ukraine
  ARE: { value: 509 },    // United Arab Emirates
  GBR: { value: 3205 },   // United Kingdom
  USA: { value: 26465 },  // United States
  URY: { value: 74 },     // Uruguay
  UZB: { value: 89 },     // Uzbekistan
  VUT: { value: 1 },      // Vanuatu
  VEN: { value: 210 },    // Venezuela (estimate)
  VNM: { value: 430 },    // Vietnam
  YEM: { value: 21 },     // Yemen
  ZMB: { value: 29 },     // Zambia
  ZWE: { value: 29 }      // Zimbabwe
});

const currentProjection = ref('globe');

// aitoff: { width: width || 1000, height: height || 500},
//         azimuthalEquidistant: { width: width || 1000, height: height || 1000},
//         bonne: { width: width || 1000, height: height || 1000},
//         equirectangular: { width: width || 1000, height: height || 700 },
//         gallPeters: { width: width || 1000, height: height || 800},
//         globe: { width: width || 1000, height: height || 1000},
//         hammer: { width: width || 1000, height: height || 500},
//         mercator: { width: width || 1000, height: height || 750 },
//         mollweide: { width: width || 1000, height: height || 600},
//         robinson: { width: width || 1000, height: height || 600 },
//         sinusoidal: { width: width || 1000, height: height || 500},
//         vanDerGrinten: { width: width || 1000, height: height || 1000},
//         winkelTripel: { width: width || 1000, height: height || 1000},

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

const darkModeConfig = ref({
    debug: false,
    loading: false,
    projection: currentProjection.value,
    style: {
        fontFamily: 'inherit',
        chart: {
            backgroundColor: '#2A2A2A',
            color: '#CCCCCC',
            padding: {
                top: 12,
                right: 12,
                bottom: 12,
                left: 12
            },
            dataLabels: {
                prefix: '$',
                suffix: 'bn',
                rounding: 0,
            },
            dimensions: {
                height: null,
                width: null
            },
            globe: {
                center: {
                    x: 0,
                    y: 0
                },
                waterColor: '#1f77b4'
            },
            territory: {
                stroke: '#666666',
                    emptyColor: '#E0E0E0',
                    strokeWidth: 0.5,
                    strokeWidthSelected: 2,
                    colors: {
                        min: '#E0E0E0',
                        max: '#fdd663'
                    },
                    showTaiwanAsPartOfChina: false,
            },
            legend: {
                show: true,
                backgroundColor: '#2A2A2A',
                color: '#CCCCCC',
                fontSize: 16,
                bold:false,
                position: 'bottom',
                selectAllToggle: {
                    show: false,
                    backgroundColor: '#3A3A3A',
                    color: '#CCCCCC'
                }
            },
            title: {
                text: "GDP per country",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#CCCCCC",
                    text: "2023 World Bank, IMF, or estimates",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                teleportTo: 'body',
                show: true,
                showMinimap: true,
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
            }
        }
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true,
            annotator: true
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
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    }, 
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value",
            category: "Category"
        },
        th: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0,
        }
    }
})

const config = ref({
    debug: false,
    loading: false,
    projection: currentProjection.value,
    style: {
        fontFamily: 'inherit',
        chart: {
            backgroundColor: '#F3F4F6',
            color: '#1A1A1A',
            padding: {
                top: 12,
                right: 12,
                bottom: 12,
                left: 12
            },
            dataLabels: {
                prefix: '$',
                suffix: 'bn',
                rounding: 0,
            },
            dimensions: {
                height: null,
                width: null
            },
            globe: {
                center: {
                    x: 0,
                    y: 0
                },
                waterColor: '#1f77b4'
            },
            legend: {
                show: true,
                backgroundColor: '#FFFFFF',
                color: '#1A1A1A',
                fontSize: 16,
                bold:false,
                position: 'bottom',
                selectAllToggle: {
                    show: false,
                    backgroundColor: '#E1E5E8',
                    color: '#1A1A1A'
                }
            },
            territory: {
                stroke: '#666666',
                    emptyColor: '#E0E0E0',
                    strokeWidth: 0.5,
                    strokeWidthSelected: 2,
                    colors: {
                        min: '#E0E0E0',
                        max: '#fdd663'
                    },
                    showTaiwanAsPartOfChina: false,
            },
            title: {
                text: "GDP per country",
                color: "#1A1A1A",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#565656",
                    text: "2023 World Bank, IMF, or estimates",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                teleportTo: 'body',
                show: true,
                showMinimap: true,
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
            }
        }
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true,
            annotator: true
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
            annotator: "Toggle annotator"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    }, 
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Series",
            value: "Value",
            category: "Category"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            outline: "none",
            roundingValue: 0,
        }
    }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
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

const dsTypeCode = computed(() => {
    return `type VueUiWorldDataset = {
    [key: string]: {
        value: number
        category?: string
        color?: string
    }
}`
})

const codeDataset = ref(`const dataset: VueUiWorldDataset = {
    USA: { value: 26465 },
    CHN: { value: 17679 },
    // etc...
};`)

const { configCode, showAllConfig } = useConfigCode()

function setProjection(p) {
    mutableConfig.value.projection = p;
    mutableConfigDarkMode.value.projection = p;
    currentProjection.value = p
}

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

const customFormatCode = ref(`customFormat: ({ datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiWorld" />

        <BaseDocDescription :text="translations.docs.tooltips.world[store.lang]" />

        <BaseDocHeaderActions
            targetLink="vue-ui-world"
            targetMaker="VueUiWorld"
            :configSource="mainConfig.vue_ui_world"
        />

        <div :class="`transition-all mx-auto w-full sm:w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <VueDataUi component="VueUiWorld" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" >
                    </VueDataUi>
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-world"/>
        </div>

        <Rater itemId="vue_ui_world" />

        <BaseMigrationInfo
            debug 
        />

        <Box ref="box" showEmits showSlots showTooltip showCallbacks showPatterns schema="vue_ui_world">
            <template v-slot:tab0>
                You can also use this component without a dataset, it will just show the naked map.
                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        :title="translations.docs.datastructure[store.lang]"
                        class="my-6"
                    /> 
                </div>
                <CodeParser
                    language="typescript"
                    @copy="store.copy()"
                    :content="codeDataset"
                    :title="translations.docs.example[store.lang]"
                /> 
            </template>

            <template v-slot:tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiWorldConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>

                <code ref="configCode">
                    <BaseDetails attr="const config: VueUiWorldConfig" equal>
                        <BaseAttr inactive name="debug" defaultVal="false"/>
                        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="projection" attr="projection" type="select" defaultVal="globe" :options="projections" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>customPalette: [], <span class="text-xs text-app-blue">// string[]</span></span>
                        <BaseDetails attr="events" :level="1">
                            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
                            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
                            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
                        </BaseDetails>
                        <BaseDetails attr="style" :level="1">
                            <span>fontFamily: "inherit",</span>
                            <BaseDetails attr="chart" :level="2" title="style.chart">
                                <BaseAttr name="backgroundColor" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.backgroundColor" defaultVal="#FFFFFF"/>                
                                <BaseAttr name="color" :light="mutableConfig" :dark="mutableConfigDarkMode" type="color" attr="style.chart.color" defaultVal="#2D353C"/>
                                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" :min="0" :max="100" defaultVal="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" :min="0" :max="100" defaultVal="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" :min="0" :max="100" defaultVal="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" :min="0" :max="100" defaultVal="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                </BaseDetails>
                                <BaseDetails attr="dataLabels" :level="3" title="style.chart.dataLabels">
                                    <BaseAttr name="prefix" attr="style.chart.dataLabels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="suffix" attr="style.chart.dataLabels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="rounding" attr="style.chart.dataLabels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                                </BaseDetails>
                                <BaseDetails attr="dimensions" :level="3" title="style.chart.dimensions">
                                    <BaseAttr name="height" attr="style.chart.dimensions.height" type="number" defaultVal="null" :min="500" :max="2000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="width" attr="style.chart.dimensions.width" type="number" defaultVal="null" :min="500" :max="2000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                </BaseDetails>
                                <BaseDetails attr="globe" :level="3" title="style.chart.globe">
                                    <BaseDetails attr="center" :level="4" title="style.chart.globe.center">
                                        <BaseAttr name="x" attr="style.chart.globe.center.x" type="number" defaultVal="0" :min="-500" :max="500" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="y" attr="style.chart.globe.center.y" type="number" defaultVal="0" :min="-500" :max="500" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                    <BaseAttr name="waterColor" attr="style.chart.globe.waterColor" type="color" defaultVal="#1f77b4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                </BaseDetails>
                                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="position" attr="style.chart.legend.position" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseDetails attr="selectAllToggle" :level="4" title="style.chart.legend.selectAllToggle">
                                        <BaseAttr name="show" attr="style.chart.legend.selectAllToggle.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="backgroundColor" attr="style.chart.legend.selectAllToggle.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="color" attr="style.chart.legend.selectAllToggle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                </BaseDetails>
                                <BaseDetails attr="territory" :level="3" title="style.chart.territory">
                                    <BaseAttr name="stroke" attr="style.chart.territory.stroke" type="color" defaultVal="#666666" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="emptyColor" attr="style.chart.territory.emptyColor" type="color" defaultVal="#E0E0E0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="strokeWidth" attr="style.chart.territory.strokeWidth" type="number" :min="0" :max="12" defaultVal="0.5" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="strokeWidthSelected" attr="style.chart.territory.strokeWidthSelected" type="number" :min="0" :max="12" defaultVal="2" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseDetails attr="colors" :level="4" title="style.chart.territory.colors">
                                        <BaseAttr name="min" attr="style.chart.territory.colors.min" type="color" defaultVal="#E0E0E0" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                        <BaseAttr name="max" attr="style.chart.territory.colors.max" type="color" defaultVal="null" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    </BaseDetails>
                                    <BaseAttr name="showTaiwanAsPartOfChina" attr="style.chart.territory.showTaiwanAsPartOfChina" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="showMinimap" attr="style.chart.tooltip.showMinimap" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="table" :level="1">
                            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
                            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Series" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="value" attr="table.columnNames.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="category" attr="table.columnNames.category" type="text" defaultVal="Percentage" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            </BaseDetails>
                            <BaseDetails attr="th" :level="2" title="table.th">
                                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                            <BaseDetails attr="td" :level="2" title="table.td">
                                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                        </BaseDetails>
                        <BaseDetails attr="userOptions" :level="1">
                            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" />
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
                    </BaseDetails>
                </code>
            </template>

            <template #tab2>
                @selectDatapoint<br><br>

                Emitted when clicing on a country

{{ translations.docs.emits.selectDatapoint[store.lang] }}
<br><br>
<pre>
<code>
&lt;template&gt;
  &lt;VueUiWorld
    :dataset="dataset"
    :config="config"
    @selectDatapoint="selectDatapoint"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
  function selectDatapoint(datapoint) {
    console.log(datapoint)
  }
&lt;/script&gt;
</code>
</pre>

                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const worldChart = ref(null);
            const worldDataset = ref([]);

            onMounted(async () => {
                worldDataset.value = await worldChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWorld
                ref="worldChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWorld
                ref="worldChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        worldDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.worldDataset = await this.$refs.worldChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <ExposedMethods
                    component="VueUiWorld"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                    ]"
                />
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiWorld"
                    :types="[
                        'svg',
                        'tooltip-before',
                        'tooltip-after',
                        'legend',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions'
                    ]" 
                />
            </template>

                        <!-- TOOLTIP -->
                        <template #tab4>
                <h3 class="mb-4">{{ translations.customFormat[store.lang] }}</h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]">config.style.chart.tooltip.customFormat</code>
                <CodeParser
                    class="mt-4"
                    language="javascript"
                    :content="customFormatCode"
                />

                <h3 class="my-4">{{ translations.customFormatCss[store.lang] }}</h3>
                <CodeParser
                    language="css"
                    content=".vue-data-ui-custom-tooltip{ }"
                />  
            </template>

            <template #tab8>
                <VueDataUi component="VueUiWorld" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig">
                    <template #pattern="{ country, patternId }">
                        <VueUiPattern :id="patternId" name="wave" stroke="#8A8A8A" :strokeWidth="1" :scale="0.6"/>
                    </template>
                </VueDataUi>
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'pdf',
                        'table',
                        'tooltip',
                        'svg'
                    ]"
                />
            </template>
        </Box>

    </div>
</template>