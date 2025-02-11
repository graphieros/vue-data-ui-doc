<script setup>
import { ref } from "vue";
import BasePopoverButton from "./BasePopoverButton.vue"

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
    }
})

const isOpen = ref(false);

function open(state) {
    isOpen.value = state;
}

</script>

<template>
    <div class="flex flex-col" :style="isOpen ? `z-index: 10000` : ''">
        <BasePopoverButton
            :buttonClass="`${isOpen ? 'rounded-t-md' : 'rounded-md shadow-lg'}`"
            popoverClass="w-full bg-white dark:bg-[#2A2A2A] shadow-md py-2 rounded-b-md border-b border-gray-200 dark:border-b-[#6A6A6A]"
            @open="open"
        >
            <template #button-content>
                <div class="w-[150px] p-2 bg-[#FFFFFF] dark:bg-[#2A2A2A]">
                    <VueUiSparkgauge :dataset="datasetGauge" :config="configGauge" />
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
