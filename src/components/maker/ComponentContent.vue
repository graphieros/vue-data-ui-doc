<script setup>
import { ref, computed, nextTick } from "vue";
import { useNestedProp } from "../../useNestedProp";
import { getVueDataUiConfig } from "vue-data-ui";
import { copyText } from "./lib";
import { useMainStore } from "../../stores";
import { NumbersIcon, CopyIcon, RefreshDotIcon } from "vue-tabler-icons";
import { useMakerStore } from "../../stores/maker";
import IconSettings from "../IconSettings.vue";
import BaseDragMenu from "../BaseDragMenu.vue";
import FlexibleTooltip from "../FlexibleTooltip.vue";

const props = defineProps({
    dataset: {
        type: [Array, Object, Number, String]
    },
    config: {
        type: Object,
        default() {
            return {}
        }
    },
    componentName: {
        type: String,
        default: ''
    },
    configName: {
        type: String,
        default: ''
    },
    copyComponentFunc: {
        type: Function
    },
    resetFunction: {
        type: Function
    },
    keyConfig: {
        type: String,
        default: ''
    },
    keyDataset: {
        type: String,
        default: ''
    }
})

const store = useMainStore()
const makerStore = useMakerStore()
const makerTranslations = computed(() => makerStore.translations)
const isDarkMode = computed(() => store.isDarkMode)

const emit = defineEmits(['click'])

const isComputed = ref(false);
const isUniversal = ref(false);

const finalConfig = computed(() => {
    if(!props.configName) return props.config
    const defaultConfig = getVueDataUiConfig(props.configName);

    const final = useNestedProp({
        userConfig: props.config,
        defaultConfig
    })

    return final
})

const configTextComputed = computed(() => {
    return `
    const config = computed(() => {
        return ${JSON.stringify(finalConfig.value)}
    })
    `;
})

const configTextRef = computed(() => {
    return `
    const config = ref(${JSON.stringify(finalConfig.value)})
    `;
})

const datasetTextComputed = computed(() => {
    return `
    const dataset = computed(() => {
        return ${typeof props.dataset === 'string' ? `"${props.dataset}"` : JSON.stringify(props.dataset)}
    });
    `
})

const datasetTextRef = computed(() => {
    return `
    const dataset = ref(${typeof props.dataset === 'string' ? `"${props.dataset}"` : JSON.stringify(props.dataset)});
    `
})

const compContent = ref(null)

function copyConfigOnly() {
    if (isComputed.value) {
        copyText(configTextComputed.value, compContent.value);
    } else {
        copyText(configTextRef.value, compContent.value);
    }
    store.copy()
}

function copyDatasetOnly() {
    if (isComputed.value) {
        copyText(datasetTextComputed.value, compContent.value);
    } else {
        copyText(datasetTextRef.value, compContent.value);
    }
    store.copy()
}

function nuke() {
    if(!!localStorage[props.keyConfig]) {
        localStorage.removeItem(props.keyConfig)
    }
    if(!!localStorage[props.keyDataset]) {
        localStorage.removeItem(props.keyDataset)
    }
    nextTick(() => location.reload())
}

</script>

<template>

    <BaseDragMenu>
        <div class="w-[48px] flex flex-col gap-2 place-items-center justify-center">
            <FlexibleTooltip
                :content="makerTranslations.componentCode[store.lang]"
                position="right"
            >
                <button @click="copyComponentFunc" class="p-2 rounded-md bg-gradient-to-br from-gray-300 to-white h-12 w-12 flex place-items-center justify-center shadow border border-transparent hover:border-app-blue-light">
                    <CopyIcon class="text-[#3A3A3A]" />
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip
                :content="makerTranslations.copyConfigOnly[store.lang]"
                position="right"
            >
                <button @click="copyConfigOnly" class="p-2 rounded-md bg-gradient-to-br from-gray-300 to-white h-12 w-12 flex place-items-center justify-center shadow border border-transparent hover:border-app-blue-light">
                    <IconSettings :size="28" :strokeWidth="1.4" stroke="#3A3A3A"/>
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip
                :content="makerTranslations.copyDatasetOnly[store.lang]"
                position="right"
            >
                <button @click="copyDatasetOnly" class="p-2 rounded-md bg-gradient-to-br from-gray-300 to-white h-12 w-12 flex place-items-center justify-center shadow border border-transparent hover:border-app-blue-light">
                    <NumbersIcon class="text-[#3A3A3A]" />
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip
                :content="makerTranslations.clearStorage[store.lang]"
                position="right"
                width="w-[200px]"
            >
                <button @click="nuke" class="p-2 rounded-full bg-gradient-to-br from-white to-app-orange h-12 w-12 flex place-items-center justify-center shadow border border-transparent hover:border-app-blue-light">
                    <RefreshDotIcon class="text-[#3A3A3A]" />
                </button>
            </FlexibleTooltip>
        </div>
    </BaseDragMenu>

    <div class="flex flex-col sm:flex-row gap-4 mt-6">
        <slot name="component-copy"/>
        <button class="flex gap-1 bg-app-blue py-3 px-5 rounded-md opacity-80 hover:opacity-100 text-white dark:text-black hover:shadow-xl font-satoshi-bold transition-all place-items-center text-sm mb-4" @click="copyConfigOnly">
            <IconSettings :size="28" :strokeWidth="1.4" :stroke="isDarkMode ? '#1A1A1A' : '#FFFFFF'"/>
            {{ makerTranslations.copyConfigOnly[store.lang] }}
        </button>
        <button class="flex gap-1 bg-app-green py-3 px-5 rounded-md opacity-80 hover:opacity-100 text-black hover:shadow-xl font-satoshi-bold transition-all place-items-center text-sm mb-4" @click="copyDatasetOnly">
            <NumbersIcon />
            {{ makerTranslations.copyDatasetOnly[store.lang] }}
        </button>
    </div>
    <div class="mb-4 flex flex-row gap-4 place-items-center">
        <input id="comp" type="checkbox" v-model="isComputed">
        <label for="comp" class="text-sm cursor-pointer">Use computed instead of ref</label>
    </div>
    <div class="mb-4 flex flex-row gap-4 place-items-center">
        <input id="univ" type="checkbox" v-model="isUniversal">
        <label for="univ" class="text-sm cursor-pointer">Use VueDataUi universal component</label>
    </div>
    
<pre class="bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812] p-3 rounded cursor-pointer border border-transparent hover:border-app-blue transition-colors mb-12"  @click="emit('click')">
<code id="componentContent" ref="compContent">
&lt;script setup&gt;
    import { {{ isComputed ? 'computed' : 'ref' }} } from "vue";
    import { {{ isUniversal ? 'VueDataUi' : componentName }} } from "vue-data-ui";
    import "vue-data-ui/style.css"
    <template v-if="isComputed">
    const config = computed(() => {
        return {{ finalConfig }}
    })
    </template>
    <template v-else>
    const config = ref({{ finalConfig }});
    </template>
    <template v-if="isComputed">
    const dataset = computed(() => {
        return {{ typeof dataset === 'string' ? `"${dataset}"` : dataset }}
    })
    </template>
    <template v-else>
    const dataset = ref({{ typeof dataset === 'string' ? `"${dataset}"` : dataset }});
    </template>
&lt;/script&gt;

&lt;template&gt;
    &lt;div style="width:600px"&gt;
        &lt;{{ isUniversal ? 'VueDataUi' : componentName }}{{ isUniversal ? ` component="${componentName}"` : '' }} :config="config" :dataset="dataset" /&gt;
    &lt;/div&gt;
&lt;/template&gt;

</code>
</pre>  
</template>


