<script setup>
import { ref, computed, inject } from "vue";
import { DOC_LAYOUT_TITLE } from "../performance/docHeader.js";
import { useIconMap } from "../useIconMap";
import { useMainStore } from "../stores";
import BaseTextCopy from "./BaseTextCopy.vue";
import { useImportMap } from "../useImportMap";
import CodeParser from "./customization/CodeParser.vue";

const props = defineProps({
    layoutOwned: { type: Boolean, default: false },
    name: {
        type: String,
        required: true,
    },
    universal: {
        type: Boolean,
        default: false,
    },
    hideTitle: {
        type: Boolean,
        default: false,
    },
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const imp = computed(() => useImportMap(props.name));
const layoutTitle = inject(DOC_LAYOUT_TITLE, null);
const showHeader = props.layoutOwned || !layoutTitle?.value;
</script>

<template>
    <template v-if="showHeader">
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-inter-medium text-app-blue-mid dark:text-gray-600 mb-2 text-2xl leading-10 sm:leading-10 min-h-10 mt-12"
            v-if="!hideTitle"
        >
            <span class="inline-flex h-8 w-8 shrink-0">
                <VueUiIcon
                    :name="useIconMap(name)"
                    :stroke="isDarkMode ? '#5f8aee' : '#3456a3'"
                    :strokeWidth="isDarkMode ? 1.5 : 1.9"
                    :size="32"
                />
            </span>
            <BaseTextCopy>
                <span class="sm:text-4xl" style="letter-spacing: -1px"
                    ><span v-if="!universal">VueUi</span
                    ><span class="text-app-blue-dark-mid dark:text-app-blue">{{
                        capitalizeFirstLetter(name.replaceAll("VueUi", ""))
                    }}</span></span
                >
            </BaseTextCopy>
        </h1>
        <div v-if="!!imp" class="w-fit max-w-full mx-auto imp mb-2">
            <span v-if="imp.treeshaken" class="block text-xs leading-4 ps-4">
                Treeshaken import (since v3.2.0)
            </span>
            <CodeParser
                language="javascript"
                :content="imp.treeshaken || imp.treeshaken"
                tw="me-8"
                @copy="store.copy()"
            />
        </div>
    </template>
</template>

<style>
.imp {
    width: 100%;
    max-width: 52rem;
    min-height: 4.4rem;
}
.imp .code-container {
    padding: 1rem 2.5rem 1rem 1rem !important;
    margin: 0 !important;
    line-height: 1.4rem !important;
    min-height: 3.4rem;
    white-space: pre !important;
    box-shadow: none !important;
}
</style>
