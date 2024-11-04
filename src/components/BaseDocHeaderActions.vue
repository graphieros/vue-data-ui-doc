<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { BrandGithubFilledIcon, CopyIcon } from "vue-tabler-icons";
import GitHubLink from "./GitHubLink.vue";
import MakerLink from "./MakerLink.vue";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import DocLink from "./DocLink.vue";

const props = defineProps({
    targetLink: {
        type: String,
        default: ''
    },
    targetMaker: {
        type: String,
        default: ''
    },
    configSource: {
        type: Object,
        default() {
            return {}
        }
    },
    defaultConfig: {
        type: Boolean,
        default: true
    },
    targetDoc: {
        type: String,
        default: ''
    },
    customConfig: {
        type: Object,
        default() {
            return null
        }
    },
    customDataset: {
        type: [Array, Object],
        default() {
            return null
        }
    },
    justify: {
        type: String,
        default: 'justify-center'
    }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => store.translations);

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
    
</script>

<template>
    <div :class="`flex flex-row gap-4 w-full my-4 ${justify}`">
        <div class="relative" v-if="defaultConfig">
            <FlexibleTooltip position="bottom" :content="translations.docs.copyDefaultConfig[store.lang]" width="w-fit min-w-[120px]" delay="delay-150">
                <button @click="copyToClipboard(configSource)" class="h-[50px] w-[50px] border border-gray-500 flex place-items-center justify-center rounded hover:bg-[#5f8bee20] transition-colors">
                    <CopyIcon/> 
                </button>
            </FlexibleTooltip>
        </div>
        <div class="relative" v-if="customConfig">
            <FlexibleTooltip position="bottom" :content="translations.docs.copyThisConfig[store.lang]" width="w-fit min-w-[120px]" delay="delay-150">
                <button @click="copyToClipboard(customConfig)" class="h-[36px] w-[36px] sm:h-[50px] sm:w-[50px] border border-gray-500 flex place-items-center justify-center rounded bg-white dark:bg-[#FFFFFF05] hover:bg-[#5f8bee20] dark:hover:bg-[#5f8bee20] transition-colors">
                    <VueUiIcon name="settings" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'" />
                </button>
            </FlexibleTooltip>
        </div>
        <div class="relative" v-if="customDataset">
            <FlexibleTooltip position="bottom" :content="translations.docs.copyThisDataset[store.lang]" width="w-fit min-w-[120px]" delay="delay-150">
                <button @click="copyToClipboard(customDataset)" class="h-[36px] w-[36px] sm:h-[50px] sm:w-[50px] border border-gray-500 flex place-items-center justify-center rounded bg-white dark:bg-[#FFFFFF05] hover:bg-[#5f8bee20] dark:hover:bg-[#5f8bee20] transition-colors">
                    <VueUiIcon name="numbers" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'" />
                </button>
            </FlexibleTooltip>
        </div>
        <MakerLink v-if="targetMaker" :to="targetMaker" simple/>
        <GitHubLink v-if="targetLink" :link="targetLink" simple/>
        <DocLink v-if="targetDoc" :to="targetDoc" simple/>
        <slot name="grabber"/>
    </div>
</template>

<style>
.vue-ui-xy-legend {
    margin-top: 12px !important;
}
</style>