<script setup>
import { ref, computed, nextTick } from "vue";
import { useNestedProp } from "../../useNestedProp";
import { getVueDataUiConfig } from "vue-data-ui";
import { copyCode, jsonToJsObject } from "./lib";
import { useMainStore } from "../../stores";
import { CopyIcon, RefreshDotIcon } from "vue-tabler-icons";
import { useMakerStore } from "../../stores/maker";
import IconSettings from "../IconSettings.vue";
import BaseDragMenu from "../BaseDragMenu.vue";
import FlexibleTooltip from "../FlexibleTooltip.vue";
import CodeParser from "../../components/customization/CodeParser.vue";
import CopyComponent from "./CopyComponent.vue"

const props = defineProps({
    dataset: {
        type: [Array, Object, Number, String],
    },
    config: {
        type: Object,
        default() {
            return {};
        },
    },
    componentName: {
        type: String,
        default: "",
    },
    configName: {
        type: String,
        default: "",
    },
    copyComponentFunc: {
        type: Function,
    },
    resetFunction: {
        type: Function,
    },
    keyConfig: {
        type: String,
        default: "",
    },
    keyDataset: {
        type: String,
        default: "",
    },
});

const store = useMainStore();
const makerStore = useMakerStore();
const makerTranslations = computed(() => makerStore.translations);
const isDarkMode = computed(() => store.isDarkMode);

const emit = defineEmits(["click"]);

const isComputed = ref(false);
const isUniversal = ref(false);

const finalConfig = computed(() => {
    if (!props.configName) return props.config;
    const defaultConfig = getVueDataUiConfig(props.configName);

    const final = useNestedProp({
        userConfig: props.config,
        defaultConfig,
    });

    return final;
});

const configTextComputed = computed(() => {
    return `
    const config = computed(() => { 
return ${jsonToJsObject(finalConfig.value, 4, true)}})`;
});

const configTextRef = computed(() => {
    return `const config = ref(${jsonToJsObject(finalConfig.value, 4, true)})`;
});

const datasetTextComputed = computed(() => {
    return `const dataset = computed(() => { return ${typeof props.dataset === "string" ? `"${props.dataset}"` : jsonToJsObject(props.dataset)}});`;
});

const datasetTextRef = computed(() => {
    return `const dataset = ref(${typeof props.dataset === "string" ? `"${props.dataset}"` : jsonToJsObject(props.dataset)});`;
});

const compContent = ref(null);

function copyConfigOnly() {
    if (isComputed.value) {
        copyCode(configTextComputed.value);
    } else {
        copyCode(configTextRef.value);
    }
    store.copy();
}

function copyDatasetOnly() {
    if (isComputed.value) {
        copyCode(datasetTextComputed.value);
    } else {
        copyCode(datasetTextRef.value);
    }
    store.copy();
}

function copyComponent() {
    if (compContent.value) {
        copyCode(compContent.value.innerText).then(() => {
            store.copy();
        })
    }
}

function nuke() {
    if (!!localStorage[props.keyConfig]) {
        localStorage.removeItem(props.keyConfig);
    }
    if (!!localStorage[props.keyDataset]) {
        localStorage.removeItem(props.keyDataset);
    }
    nextTick(() => location.reload());
}

const generatedScript = computed(() => {
    return `import { ${isComputed.value ? "computed" : "ref"} } from "vue";
import { ${isUniversal.value ? "VueDataUi" : props.componentName} } from "vue-data-ui";
import "vue-data-ui/style.css"; // ${store.translations.styleImport[store.lang]}

${isComputed.value
            ? `const config = computed(() => { 
return ${jsonToJsObject(finalConfig.value, 4, true)} });`
            : `const config = ref(${jsonToJsObject(finalConfig.value, 4, true)});`
        }

${isComputed.value
            ? `const dataset = computed(() => { 
return ${typeof dataset === "string" ? `"${props.dataset}"` : jsonToJsObject(props.dataset)} });`
            : `const dataset = ref(${typeof dataset === "string" ? `"${props.dataset}"` : jsonToJsObject(props.dataset)});`
        }
`;
});

const generatedTemplate = computed(() => {
    return `<template>
    <!-- Using a wrapper is optional -->
    <div :style="{ width: '600px'}">
        <${isUniversal.value ? 'VueDataUi' : props.componentName}${isUniversal.value ? `\n            component="${props.componentName}"` : ''}
            :config="config"
            :dataset="dataset"
       />
    </div>
</template>`
});

</script>

<template>
    <BaseDragMenu>
        <div class="w-[48px] flex flex-col gap-2 place-items-center justify-center">
            <FlexibleTooltip :content="makerTranslations.componentCode[store.lang]" position="right">
                <button @click="copyComponent"
                    class="p-2 rounded-md bg-gradient-to-br from-gray-300 to-white h-12 w-12 flex place-items-center justify-center shadow border border-transparent hover:border-app-blue-light">
                    <CopyIcon class="text-[#3A3A3A]" />
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip :content="makerTranslations.copyConfigOnly[store.lang]" position="right">
                <button @click="copyConfigOnly"
                    class="p-2 rounded-md bg-gradient-to-br from-gray-300 to-white h-12 w-12 flex place-items-center justify-center shadow border border-transparent hover:border-app-blue-light">
                    <IconSettings :size="28" :strokeWidth="1.4" stroke="#3A3A3A" />
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip :content="makerTranslations.copyDatasetOnly[store.lang]" position="right">
                <button @click="copyDatasetOnly"
                    class="p-2 rounded-md bg-gradient-to-br from-gray-300 to-white h-12 w-12 flex place-items-center justify-center shadow border border-transparent hover:border-app-blue-light">
                    <VueUiIcon name="numbers" :size="28" stroke="#3A3A3A" />
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip :content="makerTranslations.clearStorage[store.lang]" position="right" width="w-[200px]">
                <button @click="nuke"
                    class="p-2 rounded-full bg-gradient-to-br from-white to-app-orange h-12 w-12 flex place-items-center justify-center shadow border border-transparent hover:border-app-blue-light">
                    <RefreshDotIcon class="text-[#3A3A3A]" />
                </button>
            </FlexibleTooltip>
        </div>
    </BaseDragMenu>

    <div class="flex flex-col sm:flex-row gap-4 mt-6">
        <CopyComponent @click="copyComponent"/>
        <button
            class="flex gap-1 bg-app-blue py-3 px-5 rounded-md opacity-80 hover:opacity-100 text-white dark:text-black hover:shadow-xl font-satoshi-bold transition-all place-items-center text-sm mb-4"
            @click="copyConfigOnly">
            <IconSettings :size="28" :strokeWidth="1.4" :stroke="isDarkMode ? '#1A1A1A' : '#FFFFFF'" />
            {{ makerTranslations.copyConfigOnly[store.lang] }}
        </button>
        <button
            class="flex gap-1 bg-app-green py-3 px-5 rounded-md opacity-80 hover:opacity-100 text-black hover:shadow-xl font-satoshi-bold transition-all place-items-center text-sm mb-4"
            @click="copyDatasetOnly">
            <VueUiIcon name="numbers" :size="24" stroke="#3A3A3A" />
            {{ makerTranslations.copyDatasetOnly[store.lang] }}
        </button>
    </div>
    <div class="mb-4 flex flex-row gap-4 place-items-center">
        <input id="comp" type="checkbox" v-model="isComputed" />
        <label for="comp" class="text-sm cursor-pointer">Use computed instead of ref</label>
    </div>
    <div class="mb-4 flex flex-row gap-4 place-items-center">
        <input id="univ" type="checkbox" v-model="isUniversal" />
        <label for="univ" class="text-sm cursor-pointer">Use VueDataUi universal component</label>
    </div>

    <div class="relative bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded border border-transparent hover:border-app-blue hover:bg-[#5f8aee20] dark:hover:bg-[#5f8aee20] transition-colors mb-12" ref="compContent">
        <div>
            <CodeParser content="<script setup>" :language="`html`" :withCopy="false" noPointerEvents borderRadius="none"/>
            <CodeParser :content="generatedScript" language="javascript" :withCopy="false" noPointerEvents borderRadius="none"/>
            <CodeParser content="</script>" :language="`html`" :withCopy="false" noPointerEvents borderRadius="none"/>
            <CodeParser :content="generatedTemplate" :language="`html`" :withCopy="false" noPointerEvents borderRadius="none"/>
        </div>
        <button @click="copyComponent" class="cursor-pointer absolute top-4 right-4 flex flex-row place-items-center justify-center p-2 rounded-full hover:bg-[#3A3A3A] hover:shadow-md transition-colors">
            <CopyIcon class="text-app-blue" />
        </button>
    </div>
</template>
