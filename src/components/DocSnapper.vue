<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import useMobile from "../useMobile";
import BaseSpinner from "./BaseSpinner.vue";
import { PinnedOffIcon, PinIcon, CopyIcon } from "vue-tabler-icons";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import IconSettings from "./IconSettings.vue";

const store = useMainStore();
const { isMobile } = useMobile();
const translations = computed(() => store.translations);
const hintPin = computed(() => store.hints.pin);
const isDarkMode = computed(() => store.isDarkMode);

const props = defineProps({
    disabled: {
        type: Boolean,
        default: true
    },
    isFixed: {
        type: Boolean,
        default: false
    },
});

const emit = defineEmits(['resetDefault', 'copyToClipboard', 'fixChart']);

</script>

<template>
    <Teleport to="#docSnap" :disabled="disabled">
        <template v-if="!isMobile">
            <button v-if="isFixed" @click="emit('fixChart')" class="p-2 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-50 dark:hover:bg-[#3A3A3A] mb-2 shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] bg-gray-100 dark:bg-[#2A2A2A] transition-colors absolute top-4 left-4">
                <PinnedOffIcon :size="20"/>
            </button>
            <FlexibleTooltip v-else position="top" :content="hintPin[store.lang]" width="w-[200px] dark:bg-[#3A3A3A]">
                <button @click="emit('fixChart')" class="p-2 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-50 dark:hover:bg-[#3A3A3A] mb-2 shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] bg-gray-100 dark:bg-[#2A2A2A] transition-colors">
                    <div class="relative overflow-visible">
                        <PinIcon class="peer overflow-visible"/>
                    </div>
                </button>
            </FlexibleTooltip>
            <div class="flex flex-row gap-3 place-items-center justify-center mb-4" v-if="isFixed">
                <FlexibleTooltip position="bottom" :content="translations.docs.reset[store.lang]">
                    <button 
                        @click="emit('resetDefault')"
                        class="h-[36px] w-[36px] flex place-items-center justify-center rounded-full bg-[#ff660040] hover:bg-[#ff660090] transition-colors relative shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                    >
                        <VueUiIcon name="restart" :stroke="isDarkMode ? '#CCCCCC' : '#2A2A2A'"/>
                    </button>
                </FlexibleTooltip>
                <FlexibleTooltip position="bottom" :content="translations.docs.copyThisConfig[store.lang]" width="min-w-[140px]">
                    <button 
                        @click="emit('copyToClipboard')"
                        class="h-[36px] w-[36px] flex place-items-center justify-center rounded-full bg-[#5f8bee40] hover:bg-[#5f8bee90] transition-colors relative shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                    >
                        <CopyIcon class="text-[#2A2A2A] dark:text-[#CCCCCC]" />
                    </button>
                </FlexibleTooltip>
            </div>
        </template>

        <Suspense>
            <template #default>
                <slot/>
            </template>
            <template #fallback>
                <BaseSpinner />
            </template>
        </Suspense>
    </Teleport>
</template>