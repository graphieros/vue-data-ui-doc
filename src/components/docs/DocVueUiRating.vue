<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import { useConfigCode } from "../../useConfigCode";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import UcRating from "../useCases/uc-rating.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

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
})

const config = ref({
    type: "star",
    readonly: true,
    from: 1,
    to: 5,
    style: {
        fontFamily: "inherit",
        animated: true,
        itemSize: 32,
        backgroundColor: "#F3F4F6",
        star: {
            activeColor: "#FFD055",
            borderColor: "#FFD055",
            borderWidth: 3,
            apexes: 5,
            inactiveColor: "#FFFFFF",
            useGradient: true
        },
        image: {
            src: `https://vue-data-ui.graphieros.com/logo3.png`,
            inactiveOpacity: 0.3,
            alt: "rating image"
        },
        title: {
            textAlign: "center",
            fontSize: 20,
            color: "#1A1A1A",
            bold: true,
            text: "Title",
            offsetY: 6,
            subtitle: {
                fontSize: 14,
                color: "#565656",
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
            offsetY: 12,
            offsetX: 0,
            formatter: null
        },
        tooltip: {
            show: true,
            fontSize: 14,
            offsetY: 0,
            color: "#1A1A1A",
            bold: true,
            backgroundColor: "#F3F4F6",
            borderColor: "#404040",
            borderRadius: 4,
            boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
            roundingValue: 0,
            formatter: null
        }
    }
});
const darkModeConfig = ref({
    type: "star",
    readonly: true,
    from: 1,
    to: 5,
    style: {
        fontFamily: "inherit",
        animated: true,
        itemSize: 32,
        backgroundColor: "#2A2A2A",
        star: {
            activeColor: "#FFD055",
            borderColor: "#FFD055",
            borderWidth: 3,
            apexes: 5,
            inactiveColor: "#2A2A2A",
            useGradient: true
        },
        image: {
            src: `https://vue-data-ui.graphieros.com/logo3.png`,
            inactiveOpacity: 0.3,
            alt: "rating image"
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
            offsetY: 12,
            offsetX: 0,
            formatter: null
        },
        tooltip: {
            show: true,
            fontSize: 14,
            offsetY: 0,
            color: "#CCCCCC",
            bold: true,
            backgroundColor: "#1A1A1A",
            borderColor: "#404040",
            borderRadius: 4,
            boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
            roundingValue: 0,
            formatter: null
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

const dsTypeCode = ref(`type VueUiRatingDataset = {
    rating: number | {
        "1": number
        "2": number
        "3": number
        "4": number
        "5": number
    }
}`)

const codeDataset1 = ref(`const dataset: VueUiRatingDataset = { rating: 3.6 }`);
const codeDataset2 = ref(`const dataset: VueUiRatingDataset = {
    rating: {
        "1": 146,
        "2": 225,
        "3": 3920,
        "4": 1050,
        "5": 2125,
    }
};`);

const mode = ref("readonly");

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
    ja: 'デフォルト値:',
    es: 'Valor predeterminado:',
    ar: 'القيمة الافتراضية:'
})

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiRating" />

        <BaseDocDescription>
            {{ translations.docs.comments.rating.p1[store.lang] }}<br><br>
            {{ translations.docs.comments.rating.p2[store.lang] }}
        </BaseDocDescription>

        <BaseDocHeaderActions targetLink="vue-ui-rating" :configSource="mainConfig.vue_ui_rating" />


        <div :class="`transition-all mx-auto w-full sm:w-[300px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <div class="flex flex-row gap-6 justify-center my-4">
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
                    <VueUiRating
                        ref="rating"
                        :dataset="dataset"
                        :config="isDarkMode ? mutableConfigDarkMode : mutableConfig"
                        :key="key"
                        @rate="showRating"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Box showEmits showSlots showUseCases>
            <template v-slot:tab0>

                <div class="w-full overflow-x-auto">
        <CodeParser
            language="typescript"
            @copy="store.copy()"
            :content="dsTypeCode"
            :title="translations.docs.datastructure[store.lang]"
            class="my-6"
        />

        <CodeParser
            language="typescript"
            @copy="store.copy()"
            :content="codeDataset1"
            :title="translations.docs.comments.rating.simpleRating[store.lang]"
            class="my-6"
        />

        <CodeParser
            language="typescript"
            @copy="store.copy()"
            :content="codeDataset2"
            :title="translations.docs.comments.rating.breakdown[store.lang]"
        />
                </div>
            </template>
            <template v-slot:tab1>
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
                    TS type: <code class="text-app-blue">VueUiRatingConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>

                <code ref="configCode">
    <BaseDetails attr="const config: VueUiRatingConfig" equal>
        <BaseAttr name="type" attr="type" type="select" defaultVal="star" :options="['star', 'image']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <span>readonly: {{ mode === "readonly" ? "true" : "false" }}, <span dir="auto" class="pl-2 text-gray-600 dark:text-gray-400"> <span class="text-xs">{{ defaultValueTranslation[store.lang] }}</span> <span dir="ltr" class="text-black dark:text-white pl-1">false</span></span></span>
        <BaseAttr name="from" attr="from" type="number" defaultVal="1" :min="0" :max="10" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="to" attr="to" type="number" defaultVal="5" :min="0" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="itemSize" attr="style.itemSize" type="number" defaultVal="32" :min="24" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseDetails attr="star" :level="2" title="style.star">
                <BaseAttr name="activeColor" attr="style.star.activeColor" type="color" defaultVal="#FFD055" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="borderColor" attr="style.star.borderColor" type="color" defaultVal="#FFD055" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="borderWidth" attr="style.star.borderWidth" type="number" defaultVal="0" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="apexes" attr="style.star.apexes" type="number" defaultVal="5" :min="4" :max="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="inactiveColor" attr="style.star.inactiveColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="useGradient" attr="style.star.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="image" :level="2" title="style.image">
                <span>src: "{{ mutableConfig.style.image.src }}"<span dir="auto" class="pl-2 text-gray-600 dark:text-gray-400"> <span class="text-xs">{{ defaultValueTranslation[store.lang] }}</span> <span dir="ltr" class="text-black dark:text-white pl-1">''</span></span></span>
                <BaseAttr name="inactiveOpacity" attr="style.image.inactiveOpacity" type="number" defaultVal="0.3" :min="0.1" :max="0.9" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="alt" attr="style.image.alt" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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

            const ratingComponent = ref(null);
            const currentRating = ref(null);

            onMounted(async () => {
                currentRating.value = await ratingComponent.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            });

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiRating
                ref="ratingComponent"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiRating
                ref="ratingComponent"
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
                async mounted () {
                    this.currentRating = await this.$refs.ratingComponent.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>

                <ExposedMethods
                    component="VueUiRating"
                    :names="['toggleReadonly']"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiRating"
                    :types="['layer-under', 'layer-above']"
                />
            </template>

            <template #tab5>
                <UcRating/>
            </template>
        </Box>
    </div>
</template>
