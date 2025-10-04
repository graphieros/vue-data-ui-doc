<script setup>
import { computed, nextTick } from "vue";
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker"
import { ClipboardTextIcon } from "vue-tabler-icons";

import { useRouter } from "vue-router"
import FlexibleTooltip from "./FlexibleTooltip.vue";

const store = useMainStore();
const router = useRouter()

const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode)

const props = defineProps({
    to: {
        type: String,
        default: ''
    },
    name: String,
    size: {
        type: String,
        default: 'py-3 px-4'
    },
    iconSize: {
        type: Number,
        default: 20
    },
    simple: {
        type: Boolean,
        default: false,
    },
    tooltipPosition: {
        type: String,
        default: 'bottom'
    }
})
function goToDocs() {
    nextTick(() => {
        router.push({ path: `/docs`, hash: `#${props.to}`})
        window.scrollTo(0,0)
    })
}

</script>

<template>
    <div class="relative" v-if="simple">
        <FlexibleTooltip :position="tooltipPosition" :content="translations.menu.docs[store.lang]" width="w-fit min-w-[120px]" delay="delay-150">
            <button @click="goToDocs" class="shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] h-[36px] w-[36px] sm:h-[50px] sm:w-[50px] flex place-items-center justify-center rounded-lg bg-gray-100 dark:bg-[#242424] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors">
                <VueUiIcon name="clipBoard" :stroke="isDarkMode ? '#FFFFFF' : '#1A1A1A'" :size="iconSize"/>
            </button>
        </FlexibleTooltip>
    </div>
    <button v-else @click="goToDocs" :class="`flex flex-row gap-2 place-items-center rounded-md border border-black dark:border-app-green ${props.size} hover:bg-[#42d39233] hover:shadow-xl`"><VueUiIcon name="clipBoard" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" :size="iconSize"/> {{ props.name }} {{ translations.menu.docs[store.lang] }}</button>
</template>