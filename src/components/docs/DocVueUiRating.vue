<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiRatingConfigFields from "./configuration/VueUiRatingConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import { useConfigCode } from "../../useConfigCode";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import UcRating from "../useCases/uc-rating.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
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
            type: "star",
            readonly: true,
            from: 1,
            to: 5,
            style: {
                fontFamily: "inherit",
                animated: true,
                itemSize: 32,
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                star: {
                    activeColor: "#FFD055",
                    borderColor: "#FFD055",
                    borderWidth: 3,
                    apexes: 5,
                    inactiveColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    useGradient: true,
                },
                image: {
                    src: `https://vue-data-ui.graphieros.com/logo3.png`,
                    inactiveOpacity: 0.3,
                    alt: "rating image",
                },
                title: {
                    textAlign: "center",
                    fontSize: 20,
                    color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
                    bold: true,
                    text: "Title",
                    offsetY: 6,
                    subtitle: {
                        fontSize: 14,
                        color: isDarkMode.value ? "#CCCCCC" : "#565656",
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
                    offsetY: 12,
                    offsetX: 0,
                    formatter: null,
                },
                tooltip: {
                    show: true,
                    fontSize: 14,
                    offsetY: 0,
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    bold: true,
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                    borderColor: "#404040",
                    borderRadius: 4,
                    boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
                    roundingValue: 0,
                    formatter: null,
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

const mode = ref("readonly");

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

const { configCode, showAllConfig } = useConfigCode();
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiRating" />

        <BaseDocDescription>
            {{ translations.docs.comments.rating.p1[store.lang] }}<br /><br />
            {{ translations.docs.comments.rating.p2[store.lang] }}
        </BaseDocDescription>

        <BaseDocHeaderActions
            targetLink="vue-ui-rating"
            :configSource="mainConfig.vue_ui_rating"
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
                    <VueUiRating
                        ref="rating"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                        @rate="showRating"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Box showEmits showSlots showUseCases>
            <template v-slot:dataset>
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
            <template v-slot:configuration>
                <DebugHint
                    component="VueUiRating"
                    configType="VueUiRatingConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiRatingConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiRatingConfigFields
                        :config="config"
                        :context="{
                            defaultValueTranslation,
                            forceChartUpdate,
                            mode,
                            config,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>
            <template v-slot:events-and-methods>
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

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiRating"
                    :types="['layer-under', 'layer-above']"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-rating.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #use-cases>
                <UcRating />
            </template>
        </Box>
    </div>
</template>
