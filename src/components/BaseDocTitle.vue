<script setup>
import { ref, computed } from "vue";
import { useIconMap } from "../useIconMap";
import { useMainStore } from "../stores";
import BaseTextCopy from "./BaseTextCopy.vue";
import { useImportMap } from "../useImportMap";
import CodeParser from "./customization/CodeParser.vue";

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    universal: {
        type: Boolean,
        default: false
    }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const imp = useImportMap(props.name);

</script>

<template>
    <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-inter-medium text-app-blue-mid dark:text-gray-600 mb-2 text-2xl mt-12">
        <VueUiIcon 
            :name="useIconMap(name)" 
            :stroke="isDarkMode ? '#5f8aee' : '#3456a3'" 
            :strokeWidth="isDarkMode ? 1.5 : 1.9"
            :size="32"
        />
        <BaseTextCopy>
            <span class="sm:text-4xl" style="letter-spacing: -1px;"><span v-if="!universal">VueUi</span><span class="text-app-blue-dark-mid dark:text-app-blue">{{ capitalizeFirstLetter(name.replaceAll('VueUi', '')) }}</span></span>
        </BaseTextCopy>
    </h1>
    <div v-if="!!imp" class="w-fit mx-auto imp mb-2">
        <span v-if="imp.treeshaken" class="text-xs pl-4">
            Treeshaken import (since v3.2.0)
        </span>
        <CodeParser language="javascript" :content="imp.treeshaken || imp.treeshaken" line-height="0.8rem" tw="mr-8" @copy="store.copy()"/>
    </div>
</template>

<style>
.imp .code-container {
    padding-right: 12px !important;
    box-shadow: none !important;
}
</style>