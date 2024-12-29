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
            <button v-if="isFixed" @click="emit('fixChart')" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 absolute top-1 left-1">
                <PinnedOffIcon />
            </button>
            <button v-else @click="emit('fixChart')" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-row gap-3 place-items-center justify-center mb-4" v-if="isFixed">
                <FlexibleTooltip position="bottom" :content="translations.docs.reset[store.lang]">
                    <button 
                        @click="emit('resetDefault')"
                        class="h-[36px] w-[36px] border border-app-orange flex place-items-center justify-center rounded bg-[#ff660040] hover:bg-[#ff660090] transition-colors relative"
                    >
                        <VueUiIcon name="restart" :stroke="isDarkMode ? '#CCCCCC' : '#2A2A2A'"/>
                    </button>
                </FlexibleTooltip>
                <FlexibleTooltip position="bottom" :content="translations.docs.copyThisConfig[store.lang]" width="min-w-[140px]">
                    <button 
                        @click="emit('copyToClipboard')"
                        class="h-[36px] w-[36px] border border-app-blue flex place-items-center justify-center rounded bg-[#5f8bee40] hover:bg-[#5f8bee90] transition-colors relative"
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