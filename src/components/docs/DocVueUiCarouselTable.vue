<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseAttr from "../BaseAttr.vue";
import { useConfigCode } from "../../useConfigCode";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

function generateBody(n) {
    let arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push([
            Math.round(Math.random() * Math.random() * 1000000),
            Math.round(Math.random() * Math.random() * 100000),
            Math.round(Math.random() * Math.random() * 10000),
            Math.round(Math.random() * Math.random() * 100),
            Math.round(Math.random() * Math.random() * 10),
        ])
    }
    return arr
}

const dataset = ref({
    head: ['Column 1 has a long name', 'col2', 'col3', 'col4', 'col5'],
    body: generateBody(12)
})

const darkModeConfig = ref({
    responsiveBreakpoint: 400,
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            tooltip: false,
            pdf: true,
            csv: true,
            img: true,
            table: false,
            labels: false,
            fullscreen: true,
            sort: false,
            stack: false,
            animation: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
            animation: "Toggle animation"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    animation: {
        type: 'scroll',
        use: true,
        speedMs: 1000,
        pauseOnHover: true
    },
    style: {
        backgroundColor: "#2A2A2A",
        color: "#CCCCCC",
        fontFamily: "inherit"
    },
    border: {
        size: 0,
        color: "#2D353C"
    },
    scrollbar: {
        showOnlyOnHover: false,
        hide: false,
    },
    caption: {
        text: "Gentle random data",
        padding: {
            top: 12,
            right: 12,
            bottom: 12,
            left: 12
        },
        style: {
            backgroundColor: "#2A2A2A",
            color: "#42d392",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "left"
        }
    },
    thead: {
        style: {
            verticalAlign: "middle"
        },
        tr: {
            height: 32,
            border: {
                size: 0,
                color: "#2D353C"
            },
            style: {
                backgroundColor: "#3A3A3A",
                color: "#CCCCCC",
                boxShadow: "0px 6px 12px -6px #1A1A1A"
            },
            th: {
                border: {
                    size: 0,
                    color: "#2D353C"
                },
                padding: {
                    top: 0,
                    right: 12,
                    bottom: 0,
                    left: 0
                },
                style: {
                    borderSpacing: 0,
                    border: "none",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums"
                }
            }
        }
    },
    tbody: {
        backgroundColor: '#2A2A2A',
        tr: {
            visible: 5,
            height: 32,
            border: {
                size: 0,
                color: "#2D353C"
            },
            style: {
                backgroundColor: "#4A4A4A",
                color: "#CCCCCC"
            },
            td: {
                alternateColor: true,
                alternateOpacity: 0.8,
                border: {
                    size: 0,
                    color: "#2D353C"
                },
                padding: {
                    top: 0,
                    right: 12,
                    bottom: 0,
                    left: 0
                },
                style: {
                    fontVariantNumeric: "tabular-nums",
                    textAlign: "right",
                    backgroundColor: "#2A2A2A"
                }
            }
        }
    }
})

const config = ref({
    responsiveBreakpoint: 400,
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            tooltip: false,
            pdf: true,
            csv: true,
            img: true,
            table: false,
            labels: false,
            fullscreen: true,
            sort: false,
            stack: false,
            animation: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
            animation: "Toggle animation"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    animation: {
        type: 'scroll',
        use: true,
        speedMs: 1000,
        pauseOnHover: true
    },
    style: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
        fontFamily: "inherit"
    },
    border: {
        size: 0,
        color: "#2D353C"
    },
    scrollbar: {
        showOnlyOnHover: false,
        hide: false,
    },
    caption: {
        text: "Gentle random data",
        padding: {
            top: 12,
            right: 12,
            bottom: 12,
            left: 12
        },
        style: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "left"
        }
    },
    thead: {
        style: {
            verticalAlign: "middle"
        },
        tr: {
            height: 32,
            border: {
                size: 0,
                color: "#2D353C"
            },
            style: {
                backgroundColor: "#FFFFFF",
                color: "#2D353C",
                boxShadow: "0px 6px 12px -6px #2D353C50"
            },
            th: {
                border: {
                    size: 0,
                    color: "#2D353C"
                },
                padding: {
                    top: 0,
                    right: 12,
                    bottom: 0,
                    left: 0
                },
                style: {
                    borderSpacing: 0,
                    border: "none",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums"
                }
            }
        }
    },
    tbody: {
        backgroundColor: '#FFFFFF',
        tr: {
            visible: 5,
            height: 32,
            border: {
                size: 0,
                color: "#2D353C"
            },
            style: {
                backgroundColor: "#FFFFFF",
                color: "#2D353C"
            },
            td: {
                alternateColor: true,
                alternateOpacity: 0.5,
                border: {
                    size: 0,
                    color: "#2D353C"
                },
                padding: {
                    top: 0,
                    right: 12,
                    bottom: 0,
                    left: 0
                },
                style: {
                    fontVariantNumeric: "tabular-nums",
                    textAlign: "right",
                    backgroundColor: "#e1e5e8"
                }
            }
        }
    }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}

function forceChartUpdate() {
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

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = ref(`type VueUiCarouselTableDataset = {
    head: string[]
    body: Array<Array<number | string>>
}`)

const dsExample = ref(`const dataset = {
    head: ["col1", "col2", "col3", "col4", "col5"],
    body: [
        [10000, 1000, 100, 10, 0],
        [10001, 1001, 101, 11, 1],
        [10002, 1002, 102, 12, 2],
        [10003, 1003, 103, 13, 3],
        [10004, 1004, 104, 14, 4],
        [10005, 1005, 105, 15, 5],
        [10006, 1006, 106, 16, 6],
        [10007, 1007, 107, 17, 7],
        [10008, 1008, 108, 18, 8],
        [10009, 1009, 109, 19, 9]
    ]
}`)

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiCarouselTable" />

        <BaseDocDescription :text="translations.docs.tooltips.carouselTable[store.lang]" />

        <BaseDocHeaderActions
            targetLink="vue-ui-carousel-table"
            targetMaker="VueUiCarouselTable"
            :configSource="mainConfig.vue_ui_carousel_table"
        />

        <BaseCard>
            <div :class="`transition-all mx-auto w-full overflow`">
                <Suspense>
                    <template #default>
                        <VueUiCarouselTable :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                            <template #plot-comment="{ plot }">
                                <div :style="`text-align:${plot.textAlign};font-size: 10px; padding: 6px;`">
                                    {{ plot.comment }}
                                </div>
                            </template>
                        </VueUiCarouselTable>
                    </template>
                    <template #fallback>
                        <BaseSpinner/>
                    </template>
                </Suspense>
            </div>
        </BaseCard>

        <Rater itemId="vue_ui_carousel_table" />

        <Box ref="box" showEmits showSlots showCallbacks schema="vue_ui_carousel_table" hideSchemaDisclaimer>
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
            :content="dsExample"
            :title="translations.docs.example[store.lang]"
            class="my-6"
        />                    
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiCarouselTableConfig</code>
                </div>
<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiCarouselTableConfig" equal>
        <BaseAttr name="responsiveBreakpoint" attr="responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="animation" :level="1">
            <BaseAttr name="type" attr="animation.type" type="select" defaultVal="scroll" :options="['scroll', 'marquee']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="use" attr="animation.use" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
            <BaseAttr name="speedMs" attr="animation.speedMs" type="range" defaultVal="1000" :min="500" :max="5000" :step="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="pauseOnHover" attr="animation.pauseOnHover" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="border" :level="1">
            <BaseAttr name="size" attr="border.size" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="border.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="scrollbar" :level="1">
            <BaseAttr name="showOnlyOnHover" attr="scrollbar.showOnlyOnHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="hide" attr="scrollbar.hide" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
        <BaseDetails attr="caption" :level="1">
            <BaseAttr name="text" attr="caption.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="padding" :level="2" title="caption.padding">
                <BaseAttr name="top" attr="caption.padding.top" type="number" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="right" attr="caption.padding.right" type="number" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bottom" attr="caption.padding.bottom" type="number" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="left" attr="caption.padding.left" type="number" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="style" :level="2" title="caption.style">
                <BaseAttr name="backgroundColor" attr="caption.style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="caption.style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="caption.style.fontSize" type="text" defaultVal="16px" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontWeight" attr="caption.style.fontWeight" type="select" defaultVal="bold" :options="['normal', 'bold']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="textAlign" attr="caption.style.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="thead" :level="1">
            <BaseDetails attr="style" :level="2" title="thead.style">
                <BaseAttr name="verticalAlign" attr="thead.style.verticalAlign" type="select" defaultVal="middle" :options="['baseline', 'top', 'middle', 'bottom', 'sub', 'text-top']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="tr" :level="2" title="thead.tr">
                <BaseAttr name="height" attr="thead.tr.height" type="number" defaultVal="32" :min="24" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseDetails attr="border" :level="3" title="thead.tr.border">
                    <BaseAttr name="size" attr="thead.tr.border.size" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="thead.tr.border.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="style" :level="3" title="thead.tr.style">
                    <BaseAttr name="backgroundColor" attr="thead.tr.style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="thead.tr.style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="boxShadow" attr="thead.tr.style.boxShadow" type="text" defaultVal="0 6px 12px -6px #2D353C50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="th" :level="3" title="thead.tr.th">
                    <BaseDetails attr="border" :level="4" title="thead.tr.th.border">
                        <BaseAttr name="size" attr="thead.tr.th.border.size" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="thead.tr.th.border.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="padding" :level="4" title="thead.tr.th.padding">
                        <BaseAttr name="top" attr="thead.tr.th.padding.top" type="number" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="right" attr="thead.tr.th.padding.right" type="number" defaultVal="12" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bottom" attr="thead.tr.th.padding.bottom" type="number" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="left" attr="thead.tr.th.padding.left" type="number" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="style" :level="4" title="thead.tr.th.style">
                        <BaseAttr name="borderSpacing" attr="thead.tr.th.style.borderSpacing" type="number" defaultVal="0" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="border" attr="thead.tr.th.style.border" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="textAlign" attr="thead.tr.th.style.textAlign" type="select" defaultVal="right" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontVariantNumeric" attr="thead.tr.th.style.fontVariantNumeric" type="select" defaultVal="tabular-nums" :options="['normal', 'tabular-nums', 'slashed-zero', 'oldstyle-nums']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="tbody" :level="1">
            <BaseAttr name="backgroundColor" attr="tbody.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="tr" :level="2" title="tbody.tr">
                <BaseAttr name="visible" attr="tbody.tr.visible" type="number" defaultVal="5" :min="1" :max="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="height" attr="tbody.tr.height" type="number" defaultVal="32" :min="24" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseDetails attr="border" :level="3" title="tbody.tr.border">
                    <BaseAttr name="size" attr="tbody.tr.border.size" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="tbody.tr.border.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="style" :level="3" title="tbody.tr.style">
                    <BaseAttr name="backgroundColor" attr="tbody.tr.style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="tbody.tr.style.backgroundCOlor" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="td" :level="3" title="tbody.tr.td">
                    <BaseAttr name="alternateColor" attr="tbody.tr.td.alternateColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="alternateOpacity" attr="tbody.tr.td.alternateOpacity" type="range" defaultVal="0.5" :min="0" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="border" :level="4" title="tbody.tr.td.border">
                        <BaseAttr name="size" attr="tbody.tr.td.border.size" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="tbody.tr.td.border.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="padding" :level="4" title="tbody.tr.td.padding">
                        <BaseAttr name="top" attr="tbody.tr.td.padding.top" type="number" defaultVal="0"  :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="right" attr="tbody.tr.td.padding.right" type="number" defaultVal="12" :min="0" :max="24"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bottom" attr="tbody.tr.td.padding.bottom" type="number" defaultVal="0" :min="0" :max="24"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="left" attr="tbody.tr.td.padding.left" type="number" defaultVal="0" :min="0" :max="24"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="style" :level="4" title="tbody.tr.td.style">
                        <BaseAttr name="textAlign" attr="tbody.tr.td.style.textAlign" type="select" defaultVal="right" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontVariantNumeric" attr="tbody.tr.td.style.fontVariantNumeric" type="select" defaultVal="tabular-nums" :options="['normal', 'tabular-nums', 'slashed-zero', 'oldstyle-nums']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="backgroundColor" attr="tbody.tr.td.style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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
                <ExposedMethods
                    component="VueUiCarouselTable"
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleAnimation',
                        'pauseAnimation',
                        'resumeAnimation'
                    ]"
                />
            </template>

            <template #tab3>
                <div><code>#caption</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.slots.caption[store.lang] }}</div>
                <div><code>#th</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.slots.th[store.lang] }}</div>
                <div><code>#td</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.slots.td[store.lang] }}</div>
<pre>
<code>
    &lt;VueUiCarouselTable
        :dataset="dataset"
        :config="config"
    &gt;
        &lt;template #caption&gt;
            My custom caption
        &lt;/template&gt;
        
        &lt;template #th="{ th, colIndex }"&gt;
            <span v-pre>{{ colIndex }} - {{ th }}</span>
        &lt;/template&gt;

        &lt;template #td="{ td, colIndex, rowIndex }"&gt;
            <span v-pre>{{ colIndex }} - {{ rowIndex }} - {{ td }}</span>
        &lt;/template&gt;
    &lt;/VueUiCarouselTable&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.source[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiCarouselTable
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #source&gt;
            &lt;div&gt;Source: Lorem ipsum...&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiCarouselTable&gt;
</code>
</pre>
                    
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="[
                        'csv',
                        'fullscreen',
                        'img',
                        'pdf',
                    ]"
                />
            </template>

        </Box>
</div>

</template>