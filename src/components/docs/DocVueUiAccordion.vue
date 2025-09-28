<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";

const mainConfig = useConfig();

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

const config = ref({
    open: false,
    maxHeight: 2000,
    head: {
        useArrowSlot: false,
        backgroundColor: "#e1e5e8",
        color: "#2D353C",
        iconColor: "#5f8bee",
        padding: "12px 6px",
        icon: 'arrowRight',
        iconSize: 20,
    },
    body: {
        backgroundColor: "#e1e5e8",
        color: "#2D353C"
    }
})

const darkModeConfig = ref({
    open: false,
    maxHeight: 2000,
  head: {
    useArrowSlot: false,
    backgroundColor: "#2A2A2A",
    color: "#CCCCCC",
    iconColor: "#5f8bee",
    padding: "12px 6px",
    icon: 'arrowRight',
    iconSize: 20
  },
  body: {
    backgroundColor: "#2A2A2A",
    color: "#CCCCCC"
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

const isFixed = ref(false);

const skeletonConfig = computed(() => {
    return {
        type: 'donut',
        style: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#e1e5e8', 
            animated: false,
            donut: {
                color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
            }
        }
    }
})

const { configCode, showAllConfig } = useConfigCode()

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
`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiAccordion" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.accordion[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-accordion"
            :configSource="mainConfig.vue_ui_accordion"
        />

        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[600px]'}`">
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <VueDataUi component="VueUiAccordion" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                <template #title="{color}">
                    <div :style="{ color }">Title</div>
                </template>
                <template #arrow="{ backgroundColor, color, iconColor, isOpen }">
                    <span class="text-gray-500">[your slot content here]</span>
                </template>
                <template #content>
                    <VueUiSkeleton :config="skeletonConfig"/>
                    <div class="pb-3 text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illum magni corporis ab, possimus reiciendis esse pariatur dolorem cum et veniam aliquam, accusamus optio iusto ea rem neque laboriosam fugiat perspiciatis! Eos aperiam iure earum suscipit fuga temporibus, consequatur tenetur ex, distinctio ullam reprehenderit, soluta mollitia eligendi. Similique, labore nam!
                    </div>
                </template>
            </VueDataUi>
        </div>

        <Box :activeTab="1" showSlots>
            <template #tab0>
                {{ translations.docs.comments.noDataset[store.lang] }}
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiAccordionConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>

                <code ref="configCode">
                    <BaseDetails attr="const config:VueUiAccordionConfig" equal>
                        <BaseAttr name="open" attr="open" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                        <BaseAttr name="maxHeight" attr="maxHeight" type="number" defaultVal="2000" :min="2000" :max="20000" :step="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="head" :level="1">
                            <BaseAttr name="useArrowSlot" attr="head.useArrowSlot" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="backgroundColor" attr="head.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                            <BaseAttr name="color" attr="head.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="iconColor" attr="head.iconColor" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="padding" attr="head.padding" type="text" defaultVal="12px 6px" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="icon" attr="head.icon" defaultVal="'arrowRight'" type="text" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="iconSize" attr="head.iconSize" defaultVal="20" type="number" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="body" :level="1">
                            <BaseAttr name="backgroundColor" attr="body.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="body.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </code>
            </template>
            <template #tab3>
                <ul class="mb-6">
                    <li>#arrow</li>
                    <li>#title</li>
                    <li>#content</li>
                </ul>
                <CodeParser
                    :content="slotContent"
                    language="html"
                />
            </template>
        </Box>
    </div>
</template>