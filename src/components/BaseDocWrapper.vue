<script setup>
import { computed } from "vue"
import BaseButton from './BaseButton.vue';
import { useMainStore } from "../stores";
import { CopyIcon, PinIcon, PinnedOffIcon } from "vue-tabler-icons";
import { useConfig } from "../assets/useConfig";

const mainConfig = useConfig()

const props = defineProps(['title', 'subtitle', 'isFixed', 'config', 'callbacks', 'updateKey', 'jsonConfig'])

const store = useMainStore();
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-blue mb-2 text-2xl">{{ title }}</h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ subtitle }} {{ updateKey }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-2/3'}`">
            <button @click="callbacks.fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="callbacks.resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="callbacks.copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <slot name="component"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <BaseButton
                :text="translations.docs.copyDefaultConfig[store.lang]"
                :callback="() => callbacks.copyToClipboard(mainConfig[jsonConfig])"
            >
                <template #icon>
                    <CopyIcon/>
                </template>
            </BaseButton>
        </div>

        <slot name="content" />
    </div>
</template>