<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiSmileyConfigFields from "./configuration/VueUiSmileyConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

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

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            debug: false,
            devHints: { enable: false },
            readonly: false,
            style: {
                fontFamily: "inherit",
                itemSize: 32,
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                colors: {
                    activeReadonly: [
                        "#e20001",
                        "#ff9f03",
                        "#ffd004",
                        "#61c900",
                        "#059f00",
                    ],
                    active: [
                        "#e20001",
                        "#ff9f03",
                        "#ffd004",
                        "#61c900",
                        "#059f00",
                    ],
                    inactive: isDarkMode.value
                        ? [
                              "#565656",
                              "#565656",
                              "#565656",
                              "#565656",
                              "#565656",
                          ]
                        : [
                              "#CCCCCC",
                              "#CCCCCC",
                              "#CCCCCC",
                              "#CCCCCC",
                              "#CCCCCC",
                          ],
                },
                icons: { filled: false, useGradient: true },
                title: {
                    textAlign: "center",
                    fontSize: 20,
                    color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                    bold: true,
                    text: "Title",
                    offsetY: 6,
                    subtitle: {
                        fontSize: 14,
                        color: "#CCCCCC",
                        bold: false,
                        text: "Subtitle",
                        offsetY: 12,
                    },
                },
                rating: {
                    show: true,
                    fontSize: 28,
                    bold: true,
                    roundingValue: 1,
                    position: "bottom",
                    offsetY: 0,
                    offsetX: 0,
                    formatter: isDarkMode.value ? undefined : null,
                },
                tooltip: {
                    show: true,
                    fontSize: 14,
                    offsetY: 0,
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    bold: true,
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                    borderColor: "#e1e5e8",
                    borderRadius: 4,
                    boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
                    formatter: isDarkMode.value ? undefined : null,
                    roundingValue: isDarkMode.value ? undefined : 0,
                },
            },
        }),
    set: configState.set,
});

const dataset = ref({
    // rating: 4
    rating: {
        1: 146,
        2: 225,
        3: 3920,
        4: 1050,
        5: 2125,
    },
});

const mode = ref("active");

function resetDefault() {
    configState.reset();
    config.value.readonly = mode.value === "readonly";

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

function setReadonly(isTrue) {
    config.value.readonly = isTrue;

    key.value += 1;
}

function showRating(r) {
    console.log("Rating : ", r);
}

const defaultValueTranslation = ref({
    en: "Default value:",
    fr: "Valeur par défaut:",
    pt: "Valor padrão:",
    de: "Standardwert:",
    zh: "默认值：",
    ja: "デフォルト値:",
    es: "Valor predeterminado:",
    ar: "القيمة الافتراضية:",
});

const dsTypeCode = ref(`type VueUiRatingDataset = {
    rating: number | {
        "1": number
        "2": number
        "3": number
        "4": number
        "5": number
    }
}`);

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

const { configCode, showAllConfig } = useConfigCode();
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiSmiley" />

        <BaseDocDescription>
            {{ translations.docs.comments.smiley.p1[store.lang] }}<br /><br />
            {{ translations.docs.comments.rating.p2[store.lang] }}
        </BaseDocDescription>

        <BaseDocHeaderActions
            targetLink="vue-ui-smiley"
            :configSource="mainConfig.vue_ui_smiley"
        />

        <div :class="`transition-all mx-auto w-full sm:w-[300px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <div class="flex flex-row gap-6 justify-center my-4">
                        <div class="flex flex-row gap-1">
                            <input
                                type="radio"
                                id="r-read"
                                name="r-readonly"
                                value="readonly"
                                v-model="mode"
                                class="accent-app-green"
                                @change="setReadonly(true)"
                            />
                            <label for="r-read">{{
                                translations.docs.comments.rating.readonly[
                                    store.lang
                                ]
                            }}</label>
                        </div>
                        <div class="flex flex-row gap-1">
                            <input
                                type="radio"
                                id="r-act"
                                name="r-readonly"
                                value="active"
                                v-model="mode"
                                class="accent-app-green"
                                @change="setReadonly(false)"
                            />
                            <label for="r-act">{{
                                translations.docs.comments.rating.active[
                                    store.lang
                                ]
                            }}</label>
                        </div>
                    </div>
                    <VueUiSmiley
                        ref="rating"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                        @rate="showRating"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Box showEmits>
            <template v-slot:tab0>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
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
                        :title="
                            translations.docs.comments.rating.simpleRating[
                                store.lang
                            ]
                        "
                        class="my-6"
                    />

                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDataset2"
                        :title="
                            translations.docs.comments.rating.breakdown[
                                store.lang
                            ]
                        "
                    />
                </div>
            </template>

            <template #tab1>
                <DebugHint
                    component="VueUiSmiley"
                    configType="VueUiSmileyConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiSmileyConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiSmileyConfigFields
                        :config="config"
                        :context="{
                            defaultValueTranslation,
                            forceChartUpdate,
                            mode,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>

            <template v-slot:tab2>
                <div><code>@rate</code></div>
                <div class="text-gray-400 pl-5 mb-6">
                    {{ translations.docs.emits.rating.rate[store.lang] }}
                </div>

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">
                        {{ translations.docs.emits.rating.getData[store.lang] }}
                    </div>
                    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const smileyComponent = ref(null);
            const currentRating = ref(null);

            onMounted(async () => {
                currentRating.value = await smileyComponent.value.getData();
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
                async mounted () {
                    this.currentRating = await this.$refs.smileyComponent.getData();
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
