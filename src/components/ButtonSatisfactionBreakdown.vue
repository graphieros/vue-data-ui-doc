<script setup>
import { ref, computed } from "vue";
import BasePopoverButton from "./BasePopoverButton.vue"
import { useMainStore } from "../stores";
import { useIconMap } from "../useIconMap";

const props = defineProps({
    datasetGauge: {
        type: Object
    },
    datasetXy: {
        type: Array
    },
    configGauge: {
        type: Object
    },
    configXy: {
        type: Object
    },
    datasetRating: {
        type: Object,
    },
    configRating: {
        type: Object,
        default() {
            return {}
        }
    },
    name: {
        type: String
    },
    total: {
        type: Number
    }
})

const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode);

const isOpen = ref(false);

function open(state) {
    isOpen.value = state;
}

</script>

<template>
    <div class="flex flex-col" :style="isOpen ? `z-index: 10000` : ''">
        <BasePopoverButton
            :buttonClass="`${isOpen ? 'rounded-t-md' : 'rounded-md shadow-lg'}`"
            :popoverClass="`w-full ${isOpen ? 'bg-white dark:bg-[#3A3A3A]' : 'bg-white dark:bg-[#2A2A2A]'} dark:shadow-black shadow-2xl py-2 rounded-b-md border-b border-gray-200 dark:border-b-[#6A6A6A] transition-colors`"
            @open="open"
        >
            <template #button-content>
                <div :class="`transition-colors w-[150px] ${isOpen ? 'bg-[#FFFFFF] dark:bg-[#3A3A3A]' : 'bg-[#FFFFFF] dark:bg-[#2A2A2A]'}`">
                    <div class="flex flex-col place-items-center pt-4">
                        <VueUiIcon :name="useIconMap(name)" :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'"/>
                        <div :class="`pt-2 text-xs flex flex-col border-b ${isOpen ? 'border-[#E1E5E8] dark:border-[#5A5A5A]' : 'border-[#E1E5E8] dark:border-[#4A4A4A]'} w-full pb-2`">
                            <span>
                                <span class="text-gray-500">VueUi</span>
                                <span>{{ name.replaceAll('VueUi', '') }}</span>
                            </span>
                            <span>{{ total }} votes</span>
                        </div>
                    </div>
                    <div :style="{ transform: 'scale(0.7, 0.7)', pointerEvents:'none', cursor: 'default' }">
                        <VueUiRating
                            :dataset="datasetRating"
                            :config="configRating"
                        />
                    </div>
                    <!-- <VueUiSparkgauge :dataset="datasetGauge" :config="configGauge" /> -->
                </div>
            </template>
            <template #popover-content>
                <VueUiXy
                    :dataset="datasetXy"
                    :config="configXy"
                />
            </template>
        </BasePopoverButton>
    </div>
</template>
