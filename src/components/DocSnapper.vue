<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import useMobile from "../useMobile";
import BaseSpinner from "./BaseSpinner.vue";
import { PinnedOffIcon, PinIcon } from "vue-tabler-icons";

const store = useMainStore();
const { isMobile } = useMobile();
const translations = computed(() => store.translations);
const hintPin = computed(() => store.hints.pin);

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
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="emit('resetDefault')" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="emit('copyToClipboard')" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
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