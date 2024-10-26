<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);


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
        }
    },
    animation: {
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
        }
    },
    animation: {
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

const configCode = ref(null)
const showAllConfig = ref(false);

watch(() => showAllConfig.value, (v) => {
    if (v) {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
    } else {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
            if (d.hasAttribute('open')) {
                d.removeAttribute('open')
            }
        })
    }
})

</script>

<template>
   <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="carouselTable" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">CarouselTable</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.carouselTable[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-carousel-table"
            targetMaker="VueUiCarouselTable"
            :configSource="mainConfig.vue_ui_carousel_table"
        />

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

        <Box showEmits showSlots schema="vue_ui_carousel_table" hideSchemaDisclaimer>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mb-4">
                    TS type: <code class="text-app-green">VueUiCarouselDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        head: string[];
        body: Array&lt;Array&lt;number | string&gt;&gt;;
    }
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiCarouselTableDataset</span> = {
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
}
</code>
</pre>                    
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
        <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.responsiveBreakpoint" :min="300" :max="800"/> (default: 400)</span>
        <BaseDetails attr="userOptions" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
                <span>animation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.animation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.animation" @change="forceChartUpdate()">, (default: true)</span>
                <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
                <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
                <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
                <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
                <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
                <span>animation: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.animation"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.animation">, (default: "Toggle animation")</span>
                <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="animation" :level="1">
            <span>use: <input type="checkbox" v-if="isDarkMode" v-model="mutableConfigDarkMode.animation.use" class="accent-app-blue"><input type="checkbox" v-else v-model="mutableConfig.animation.use" class="accent-app-blue"/> ,(default: true)</span>
            <span>speedMs: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.animation.speedMs" :min="500" :max="5000" :step="100"/><BaseNumberInput v-else v-model:value="mutableConfig.animation.speedMs" :min="500" :max="5000" :step="100"/> , (default: 1000)</span>
            <span>pauseOnHover: <input type="checkbox" v-if="isDarkMode" v-model="mutableConfigDarkMode.animation.pauseOnHover" class="accent-app-blue"><input type="checkbox" v-else v-model="mutableConfig.animation.pauseOnHover" class="accent-app-blue"/> ,(default: true)</span>
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <span>backgroundColor: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.backgroundColor"/><input type="color" v-else v-model="mutableConfig.style.backgroundColor"/>, (default: "#FFFFFF")</span>
            <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.style.color"/><input type="color" v-else v-model="mutableConfig.style.color" />, (default: "#2D353C")</span>
            <span>fontFamily: "inherit",</span>
        </BaseDetails>
        <BaseDetails attr="border" :level="1">
            <span>size: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.border.size" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.border.size" :min="0" :max="12"/>, (default: 0)</span>
            <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.border.color"/><input type="color" v-else v-model="mutableConfig.border.color" />, (default: "#2D353C")</span>
        </BaseDetails>
        <BaseDetails attr="caption" :level="1">
            <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.caption.text"/><input v-else v-model="mutableConfig.caption.text"/> , (default: "")</span>
            <BaseDetails attr="padding" :level="2" title="caption.padding">
                <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.caption.padding.top" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.caption.padding.top" :min="0" :max="24" /> , (default: 12)</span>
                <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.caption.padding.right" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.caption.padding.right" :min="0" :max="24" /> , (default: 12)</span>
                <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.caption.padding.bottom" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.caption.padding.bottom" :min="0" :max="24" /> , (default: 12)</span>
                <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.caption.padding.left" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.caption.padding.left" :min="0" :max="24" /> , (default: 12)</span>
            </BaseDetails>
            <BaseDetails attr="style" :level="2" title="caption.style">
                <span>backgroundColor: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.caption.style.backgroundColor"/><input type="color" v-else v-model="mutableConfig.caption.style.backgroundColor" />, (default: "#FFFFFF")</span>
                <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.caption.style.color"/><input type="color" v-else v-model="mutableConfig.caption.style.color" />, (default: "#2D353C")</span>
                <span>fontSize: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.caption.style.fontSize"><input v-else type="text" v-model="mutableConfig.caption.style.fontSize">, (default: "16px")</span>
                <span>fontWeight: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.caption.style.fontWeight"><input v-else type="text" v-model="mutableConfig.caption.style.fontWeight">, (default: "bold")</span>
                <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.caption.style.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.caption.style.textAlign"><option>left</option><option>center</option><option>right</option></select></span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="thead" :level="1">
            <BaseDetails attr="style" :level="2" title="thead.style">
                <span>verticalAlign: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.thead.style.verticalAlign"><input v-else type="text" v-model="mutableConfig.thead.style.verticalAlign">, (default: 'middle')</span>
            </BaseDetails>
            <BaseDetails attr="tr" :level="2" title="thead.tr">
                <span>height: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.tr.height" :min="32" :max="64"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.tr.height" :min="32" :max="64"/> , (default: 32)</span>
                <BaseDetails attr="border" :level="3" title="thead.tr.border">
                    <span>size: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.tr.border.size" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.tr.border.size" :min="0" :max="12"/>, (default: 0)</span>
                    <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.tr.border.color"/><input type="color" v-else v-model="mutableConfig.thead.tr.border.color" />, (default: "#2D353C")</span>
                </BaseDetails>
                <BaseDetails attr="style" :level="3" title="thead.tr.style">
                    <span>backgroundColor: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.tr.style.backgroundColor"/><input type="color" v-else v-model="mutableConfig.thead.tr.style.backgroundColor" />, (default: "#FFFFFF")</span>
                    <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.tr.style.color"/><input type="color" v-else v-model="mutableConfig.thead.tr.style.color" />, (default: "#2D353C")</span>
                    <span>boxShadow: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.thead.tr.style.boxShadow"><input v-else type="text" v-model="mutableConfig.thead.tr.style.boxShadow"> , (default: "0px 6px 12px -6px #2D353C50")</span>
                </BaseDetails>
                <BaseDetails attr="th" :level="3" title="thead.tr.th">
                    <BaseDetails attr="border" :level="4" title="thead.tr.th.border">
                        <span>size: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.tr.th.border.size" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.tr.th.border.size" :min="0" :max="12"/>, (default: 0)</span>
                        <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.tr.th.border.color"/><input type="color" v-else v-model="mutableConfig.thead.tr.th.border.color" />, (default: "#2D353C")</span>
                    </BaseDetails>
                    <BaseDetails attr="padding" :level="4" title="thead.tr.th.padding">
                        <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.tr.th.padding.top" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.tr.th.padding.top" :min="0" :max="24" /> , (default: 0)</span>
                        <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.tr.th.padding.right" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.tr.th.padding.right" :min="0" :max="24" /> , (default: 12)</span>
                        <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.tr.th.padding.bottom" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.tr.th.padding.bottom" :min="0" :max="24" /> , (default: 0)</span>
                        <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.tr.th.padding.left" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.tr.th.padding.left" :min="0" :max="24" /> , (default: 0)</span>
                    </BaseDetails>
                    <BaseDetails attr="style" :level="4" title="thead.tr.th.style">
                        <span>borderSpacing: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.tr.th.style.borderSpacing" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.tr.th.style.borderSpacing" :min="0" :max="24"/> , (default: 0)</span>
                        <span>border: <input type="text" v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.tr.th.style.border"><input v-else v-model="mutableConfig.thead.tr.th.style.border"/> , (default: "none")</span>
                        <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.tr.th.style.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.thead.tr.th.style.textAlign"><option>left</option><option>center</option><option>right</option></select></span>
                        <span>fontVariantNumeric: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.tr.th.style.fontVariantNumeric"><option>normal</option><option>slashed-zero</option><option>tabular-nums</option><option>oldstyle-nums</option></select><select v-else v-model="mutableConfig.thead.tr.th.style.fontVariantNumeric"><option>normal</option><option>slashed-zero</option><option>tabular-nums</option><option>oldstyle-nums</option></select></span>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="tbody" :level="1">
            <BaseDetails attr="tr" :level="2" title="tbody.tr">
                <span>visible: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.visible" :min="1" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.visible" :min="1" :max="12"/> , (default: 5)</span>
                <span>height: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.height" :min="32" :max="64"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.height" :min="32" :max="64"/> , (default: 32)</span>
                <BaseDetails attr="border" :level="3" title="tbody.tr.border">
                    <span>size: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.border.size" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.border.size" :min="0" :max="12"/>, (default: 0)</span>
                    <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.tr.border.color"/><input type="color" v-else v-model="mutableConfig.tbody.tr.border.color" />, (default: "#2D353C")</span>
                </BaseDetails>
                <BaseDetails attr="style" :level="3" title="tbody.tr.style">
                    <span>backgroundColor: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.tr.style.backgroundColor"/><input type="color" v-else v-model="mutableConfig.tbody.tr.style.backgroundColor" />, (default: "#FFFFFF")</span>
                    <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.tr.style.color"/><input type="color" v-else v-model="mutableConfig.tbody.tr.style.color" />, (default: "#2D353C")</span>
                </BaseDetails>
                <BaseDetails attr="td" :level="3" title="tbody.tr.td">
                    <span>alternateColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.tbody.tr.td.alternateColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.tbody.tr.td.alternateColor" @change="forceChartUpdate()">, (default: true)</span>
                    <span>alternateOpacity: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.td.alternateOpacity" :min="0" :max="1" :step="0.01"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.td.alternateOpacity" :min="0" :max="1" :step="0.01"/> , (default: 0.5)</span>
                    <BaseDetails attr="border" :level="4" title="tbody.tr.td.border">
                        <span>size: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.td.border.size" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.td.border.size" :min="0" :max="12"/>, (default: 0)</span>
                        <span>color: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.tr.td.border.color"/><input type="color" v-else v-model="mutableConfig.tbody.tr.td.border.color" />, (default: "#2D353C")</span>
                    </BaseDetails>
                    <BaseDetails attr="padding" :level="4" title="tbody.tr.td.padding">
                        <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.td.padding.top" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.td.padding.top" :min="0" :max="24" /> , (default: 0)</span>
                        <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.td.padding.right" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.td.padding.right" :min="0" :max="24" /> , (default: 12)</span>
                        <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.td.padding.bottom" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.td.padding.bottom" :min="0" :max="24" /> , (default: 0)</span>
                        <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.tr.td.padding.left" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.tr.td.padding.left" :min="0" :max="24" /> , (default: 0)</span>
                    </BaseDetails>
                    <BaseDetails attr="style" :level="4" title="tbody.tr.td.style">
                        <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.tr.td.style.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.tbody.tr.td.style.textAlign"><option>left</option><option>center</option><option>right</option></select></span>
                        <span>fontVariantNumeric: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.tr.td.style.fontVariantNumeric"><option>normal</option><option>slashed-zero</option><option>tabular-nums</option><option>oldstyle-nums</option></select><select v-else v-model="mutableConfig.tbody.tr.td.style.fontVariantNumeric"><option>normal</option><option>slashed-zero</option><option>tabular-nums</option><option>oldstyle-nums</option></select></span>
                        <span>backgroundColor: <input type="color" v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.tr.td.style.backgroundColor"/><input type="color" v-else v-model="mutableConfig.tbody.tr.td.style.backgroundColor" />, (default: "#FFFFFF")</span>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab2>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateCsv</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateCsv[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleAnimation</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleAnimation[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>pauseAnimation</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.pauseAnimation[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>resumeAnimation</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.resumeAnimation[store.lang] }}</div>
                </div>
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
                    
            </template>
        </Box>
</div>

</template>