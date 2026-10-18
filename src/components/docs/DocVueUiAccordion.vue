<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiAccordionConfigFields from "./configuration/VueUiAccordionConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));

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
            open: false,
            maxHeight: 2000,
            head: {
                useArrowSlot: false,
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#e1e5e8",
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                iconColor: "#5f8bee",
                padding: "12px 6px",
                icon: "arrowRight",
                iconSize: 20,
            },
            body: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#e1e5e8",
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
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

const skeletonConfig = computed(() => {
    return {
        type: "donut",
        style: {
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#e1e5e8",
            animated: false,
            donut: {
                color: isDarkMode ? "#CCCCCC" : "#1A1A1A",
            },
        },
    };
});

const { configCode, showAllConfig } = useConfigCode();

const slotContent = ref(`
<VueUiAccordion :config="config">
    <template #arrow="{ backgroundColor, color, iconColor, isOpen }">
        <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
    </template>

    <template #title="{ color, isOpen }">
        <div :style="{ color }">
            My Title
        </div>
    </template>

    <template #content="{ backgroundColor, color, isOpen }">
        <div :style="{ color }">
            My content, components, etc
        </div>
    </template>
</VueUiAccordion>
`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiAccordion" />

        <BaseDocDescription
            :text="translations.docs.tooltips.accordion[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-accordion"
            :configSource="mainConfig.vue_ui_accordion"
        />

        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[600px]'}`"
        >
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button
                    @click="resetDefault"
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6"
                >
                    {{ translations.docs.reset[store.lang] }}
                </button>
                <button
                    @click="copyToClipboard(config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"
                >
                    <CopyIcon />
                    {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <VueDataUi component="VueUiAccordion" :config="config" :key="key">
                <template #title="{ color }">
                    <div :style="{ color }">Title</div>
                </template>
                <template
                    #arrow="{ backgroundColor, color, iconColor, isOpen }"
                >
                    <span class="text-gray-500">[your slot content here]</span>
                </template>
                <template #content>
                    <VueUiSkeleton :config="skeletonConfig" />
                    <div class="pb-3 text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi illum magni corporis ab, possimus reiciendis esse
                        pariatur dolorem cum et veniam aliquam, accusamus optio
                        iusto ea rem neque laboriosam fugiat perspiciatis! Eos
                        aperiam iure earum suscipit fuga temporibus, consequatur
                        tenetur ex, distinctio ullam reprehenderit, soluta
                        mollitia eligendi. Similique, labore nam!
                    </div>
                </template>
            </VueDataUi>
        </div>

        <Box :activeTab="1" showSlots>
            <template #dataset>
                {{ translations.docs.comments.noDataset[store.lang] }}
            </template>
            <template #configuration>
                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiAccordionConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiAccordionConfigFields
                        :config="config"
                        :context="{ forceChartUpdate }"
                    />
                </code>
            </template>
            <template #slots>
                <ul class="mb-6">
                    <li>#arrow</li>
                    <li>#title</li>
                    <li>#content</li>
                </ul>
                <CodeParser :content="slotContent" language="html" />
            </template>
        </Box>
    </div>
</template>
