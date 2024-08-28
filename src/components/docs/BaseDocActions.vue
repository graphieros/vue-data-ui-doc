<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import { CopyIcon } from "vue-tabler-icons";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";

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
    }
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
    <div class="w-fit mx-auto flex flex-col sm:flex-row gap-4 place-items-center align-center my-12">
        <button 
            class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" 
            @click="copyToClipboard(configSource)"
        >
            <CopyIcon/> 
            {{ translations.docs.copyDefaultConfig[store.lang]}}
        </button>

        <GitHubLink :link="targetLink"/>
        <MakerLink v-if="targetMaker" :to="targetMaker"/>
    </div>
</template>