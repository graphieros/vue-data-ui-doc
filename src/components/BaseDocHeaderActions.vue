<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { BrandGithubFilledIcon, CopyIcon } from "vue-tabler-icons";
import GitHubLink from "./GitHubLink.vue";
import MakerLink from "./MakerLink.vue";
import FlexibleTooltip from "./FlexibleTooltip.vue";

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
});

const store = useMainStore();

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
    <div class="flex flex-row gap-4 w-full justify-center my-4">
        <div class="relative">
            <FlexibleTooltip position="bottom" :content="translations.docs.copyDefaultConfig[store.lang]" width="w-fit min-w-[120px]" delay="delay-150">
                <button @click="copyToClipboard(configSource)" class="h-[50px] w-[50px] border border-gray-500 flex place-items-center justify-center rounded hover:bg-[#5f8bee20] transition-colors">
                    <CopyIcon/> 
                </button>
            </FlexibleTooltip>
        </div>
        <MakerLink v-if="targetMaker" :to="targetMaker" simple/>
        <GitHubLink v-if="targetLink" :link="targetLink" simple/>
    </div>
</template>