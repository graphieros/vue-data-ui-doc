<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseColorInfo from "../BaseColorInfo.vue";
import BaseComment from "../BaseComment.vue";
import useMobile from "../../useMobile";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
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

const config = ref({
    readonly: false,
    style: {
        fontFamily: "inherit",
        itemSize: 32,
        backgroundColor: "#f3f4f6",
        colors: {
            activeReadonly: [
                "#e20001",
                "#ff9f03",
                "#ffd004",
                "#61c900",
                "#059f00"
            ],
            active: [
                "#e20001",
                "#ff9f03",
                "#ffd004",
                "#61c900",
                "#059f00"
            ],
            inactive: [
                "#CCCCCC",
                "#CCCCCC",
                "#CCCCCC",
                "#CCCCCC",
                "#CCCCCC"
            ]
        },
        icons: {
            filled: false,
            useGradient: true
        },
        title: {
            textAlign: "center",
            fontSize: 20,
            color: "#2D353C",
            bold: true,
            text: "Title",
            offsetY: 6,
            subtitle: {
                fontSize: 14,
                color: "#CCCCCC",
                bold: false,
                text: "Subtitle",
                offsetY: 12
            }
        },
        rating: {
            show: true,
            fontSize: 28,
            bold: true,
            roundingValue: 1,
            position: "bottom",
            offsetY: 0,
            offsetX: 0,
            formatter: null
        },
        tooltip: {
            show: true,
            fontSize: 14,
            offsetY: 0,
            color: "#2D353C",
            bold: true,
            backgroundColor: "#FFFFFF",
            borderColor: "#e1e5e8",
            borderRadius: 4,
            boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
            formatter: null,
            roundingValue: 0
        }
    }
});

const darkModeConfig = ref({
    readonly: false,
    style: {
        fontFamily: "inherit",
        itemSize: 32,
        backgroundColor: "#1A1A1A",
        colors: {
            activeReadonly: [
                "#e20001",
                "#ff9f03",
                "#ffd004",
                "#61c900",
                "#059f00"
            ],
            active: [
                "#e20001",
                "#ff9f03",
                "#ffd004",
                "#61c900",
                "#059f00"
            ],
            inactive: [
                "#565656",
                "#565656",
                "#565656",
                "#565656",
                "#565656"
            ]
        },
        icons: {
            filled: false,
            useGradient: true
        },
        title: {
            textAlign: "center",
            fontSize: 20,
            color: "#FAFAFA",
            bold: true,
            text: "Title",
            offsetY: 6,
            subtitle: {
                fontSize: 14,
                color: "#CCCCCC",
                bold: false,
                text: "Subtitle",
                offsetY: 12
            }
        },
        rating: {
            show: true,
            fontSize: 28,
            bold: true,
            roundingValue: 1,
            position: "bottom",
            offsetY: 0,
            offsetX: 0
        },
        tooltip: {
            show: true,
            fontSize: 14,
            offsetY: 0,
            color: "#CCCCCC",
            bold: true,
            backgroundColor: "#1A1A1A",
            borderColor: "#e1e5e8",
            borderRadius: 4,
            boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)"
        }
    }
});

const dataset = ref({
    // rating: 4
    rating: {
        "1": 146,
        "2": 225,
        "3": 3920,
        "4": 1050,
        "5": 2125
    }
});

const mode = ref("active");

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    mutableConfig.value.readonly = mode.value === "readonly";
    mutableConfigDarkMode.value.readonly = mode.value === "readonly";
    forceChartUpdate();
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

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

function setReadonly(isTrue) {
    mutableConfig.value.readonly = isTrue;
    mutableConfigDarkMode.value.readonly = isTrue;
    key.value += 1;
}

function showRating(r) {
    console.log("Rating : ", r)
}

const defaultValueTranslation = ref({
    en: 'Default value:',
    fr: 'Valeur par défaut:',
    pt: 'Valor padrão:',
    de: 'Standardwert:',
    zh: '默认值：',
    jp: 'デフォルト値:',
    es: 'Valor predeterminado:',
    ar: 'القيمة الافتراضية:'
})

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="smiley" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Smiley</span></span>
        </h1>
        <h2 class="text-center text-gray-500">
            {{ translations.docs.comments.smiley.p1[store.lang] }}<br><br>
            {{ translations.docs.comments.rating.p2[store.lang] }}
        </h2>


        <BaseDocHeaderActions targetLink="vue-ui-smiley" :configSource="mainConfig.vue_ui_smiley" />

        <div
        :class="`transition-all mx-auto w-fit`">
        <Teleport to="#docSnap" :disabled="!isFixed || isMobile">
            <div class="flex flex-row gap-6 justify-center mt-6">
                <div class="flex flex-row gap-1">
                    <input type="radio" id="r-read" name="r-readonly" value="readonly" v-model="mode"
                        class="accent-app-green" @change="setReadonly(true)">
                    <label for="r-read">{{ translations.docs.comments.rating.readonly[store.lang] }}</label>
                </div>
                <div class="flex flex-row gap-1">
                    <input type="radio" id="r-act" name="r-readonly" value="active" v-model="mode" class="accent-app-green"
                        @change="setReadonly(false)">
                    <label for="r-act">{{ translations.docs.comments.rating.active[store.lang] }}</label>
                </div>
            </div>
                <template v-if="!isMobile">
                    <button @click="fixChart"
                        class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <PinnedOffIcon v-if="isFixed" />
                        <div v-else class="relative overflow-visible">
                            <PinIcon class="peer overflow-visible" />
                            <div
                                class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                                {{ hintPin[store.lang] }}
                            </div>
                        </div>
                    </button>
                    <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                        <button @click="resetDefault"
                            class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                        translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                            class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                            <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                        </button>
                    </div>
                </template>
                <div class="w-fit mx-auto">
                    <Suspense>
                        <template #default>
                            <VueUiSmiley ref="rating" :dataset="dataset"
                                :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"
                                @rate="showRating" />
                        </template>
                        <template #fallback>
                            <BaseSpinner />
                        </template>
                    </Suspense>
                </div>
            </Teleport>
        </div>

        <Box showEmits>
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiRatingDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <pre>
<code>
<span class="text-gray-500">
// {{ translations.docs.comments.rating.simpleRating[store.lang] }} :
</span>
const <span class="text-black dark:text-app-green">dataset: VueUiRatingDataset</span> = { rating: 3.6 };

<span class="text-gray-500">
// {{ translations.docs.comments.rating.breakdown[store.lang] }} :
</span>
const <span class="text-black dark:text-app-green">dataset: VueUiRatingDataset</span> = {
    rating: {
        "1": 146,
        "2": 225,
        "3": 3920,
        "4": 1050,
        "5": 2125
    }
};
<span class="text-gray-500">// {{ translations.docs.comments.rating.calculation[store.lang] }} 
// {{ translations.docs.comments.rating.tooltip[store.lang] }}</span>
</code>
</pre>
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiSmileyConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>

                <code ref="configCode">
                    <BaseDetails attr="const config:VueUiSmileyConfig" equal>
                        <span>readonly: {{ mode === "readonly" ? "true" : "false" }}, <span dir="auto" class="pl-2 text-gray-600 dark:text-gray-400"> <span class="text-xs">{{ defaultValueTranslation[store.lang] }}</span> <span dir="ltr" class="text-black dark:text-white pl-1">false</span></span></span>
                        <BaseDetails attr="style" :level="1">
                            <span>fontFamily: "inherit",</span>
                            <BaseAttr name="itemSize" attr="style.itemSize" type="number" defaultVal="32" :min="24" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                            <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                            <BaseDetails attr="colors" :level="2" title="style.colors">
                                <span>activeReadonly: [<br>
                                    <span><span class="ml-4 mr-2">"#E20001"</span><BaseColorInfo color="#E20001"/></span><br>
                                    <span><span class="ml-4 mr-2">"#ff9f03"</span><BaseColorInfo color="#ff9f03"/></span><br>
                                    <span><span class="ml-4 mr-2">"#ffd004"</span><BaseColorInfo color="#ffd004"/></span><br>
                                    <span><span class="ml-4 mr-2">"#61c900"</span><BaseColorInfo color="#61c900"/></span><br>
                                    <span><span class="ml-4 mr-2">"#059f00"</span><BaseColorInfo color="#059f00"/></span><br>
                                    ],</span>
                                <span>active: [<br>
                                    <span><span class="ml-4 mr-2">"#E20001"</span><BaseColorInfo color="#E20001"/></span><br>
                                    <span><span class="ml-4 mr-2">"#ff9f03"</span><BaseColorInfo color="#ff9f03"/></span><br>
                                    <span><span class="ml-4 mr-2">"#ffd004"</span><BaseColorInfo color="#ffd004"/></span><br>
                                    <span><span class="ml-4 mr-2">"#61c900"</span><BaseColorInfo color="#61c900"/></span><br>
                                    <span><span class="ml-4 mr-2">"#059f00"</span><BaseColorInfo color="#059f00"/></span><br>
                                    ],</span>
                                <span>inactive: [<br>
                                    <span><span class="ml-4 mr-2">"#e1e5e8"</span><BaseColorInfo color="#e1e5e8"/></span><br>
                                    <span><span class="ml-4 mr-2">"#e1e5e8"</span><BaseColorInfo color="#e1e5e8"/></span><br>
                                    <span><span class="ml-4 mr-2">"#e1e5e8"</span><BaseColorInfo color="#e1e5e8"/></span><br>
                                    <span><span class="ml-4 mr-2">"#e1e5e8"</span><BaseColorInfo color="#e1e5e8"/></span><br>
                                    <span><span class="ml-4 mr-2">"#e1e5e8"</span><BaseColorInfo color="#e1e5e8"/></span><br>
                                    ],</span>
                            </BaseDetails>
                            <BaseDetails attr="icons" :level="2" title="style.icons">
                                <BaseAttr name="filled" attr="style.icons.filled" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="useGradient" attr="style.icons.useGradient" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                            <BaseDetails attr="title" :level="2" title="style.title">
                                <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.title.offsetY" type="number" defaultVal="6" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
                                    <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                    <BaseAttr name="offsetY" attr="style.title.subtitle.offsetY" type="number" defaultVal="6" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                </BaseDetails>
                            </BaseDetails>
                            <BaseDetails attr="rating" :level="2" title="style.rating">
                                <BaseAttr name="show" attr="style.rating.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fontSize" attr="style.rating.fontSize" type="number" defaultVal="28" :min="8" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.rating.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="roundingValue" attr="style.rating.roundingValue" type="number" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="position" attr="style.rating.position" type="select" defaultVal="bottom" :options="['top', 'right', 'bottom', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.rating.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetX" attr="style.rating.offsetX" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                            </BaseDetails>
                            <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
                                <BaseAttr name="show" attr="style.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="fontSize" attr="style.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="offsetY" attr="style.tooltip.offsetY" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="color" attr="style.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="bold" attr="style.tooltip.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="backgroundColor" attr="style.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="borderColor" attr="style.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="borderRadius" attr="style.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="boxShadow" attr="style.tooltip.boxShadow" type="text" defaultVal="0 6px 12px -6px rgba(0,0,0,0.2)" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="roundingValue" attr="style.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
                </code>
            </template>

            <template v-slot:tab2>
                <div><code>@rate</code></div>
                <div class="text-gray-400 pl-5 mb-6">{{ translations.docs.emits.rating.rate[store.lang] }}</div>

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.rating.getData[store.lang] }}</div>
                    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const smileyComponent = ref(null);
            const currentRating = ref(null);

            onMounted(() => {
                currentRating.value = smileyComponent.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            });

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiSmiley
                ref="smileyComponent"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiSmiley
                ref="smileyComponent"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        currentRating: null,
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        }
                    }
                },
                mounted () {
                    this.currentRating = this.$refs.smileyComponent.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>
        </Box>
    </div>
</template>