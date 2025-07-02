<script setup>
import { ref, computed, onMounted } from "vue";
import BaseDragElement from "./BaseDragElement.vue";
import { useMainStore } from "../stores";
import { copyCode, jsonToJsObject } from "./maker/lib";
import { getVueDataUiConfig } from "vue-data-ui";
import CodeParser from "./customization/CodeParser.vue";
import { CopyIcon, XIcon } from "vue-tabler-icons";
import { useNestedProp } from "../useNestedProp";
import { useMakerStore } from "../stores/maker";

const store = useMainStore();
const makerStore = useMakerStore();

const isDarkMode = computed(() => store.isDarkMode);

const props = defineProps({
    isOpen: { type: Boolean, default: false },
    example: { type: Object, default(){ return {} }},
})

const emit = defineEmits(['close']);

const finalConfig = computed(() => {
    // const defaultConfig = getVueDataUiConfig(props.example.link.replaceAll('-', '_'));

    // const final = useNestedProp({
    //     userConfig: props.example.config,
    //     defaultConfig,
    // });

    return props.example.config;
});

const generatedScript = computed(() => {
    return `import { ref } from "vue";
import { ${props.example.component}${props.example.pattern || props.example.multiPattern ? ', VueUiPattern' : ''} } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place styles import in your main

${`const config = ref(${jsonToJsObject(finalConfig.value, 4, true)});`}

${`const dataset = ref(${typeof props.example.dataset === "string" ? `"${props.example.dataset}"` : jsonToJsObject(props.example.dataset)});`
        }
`;
});

const generatedTemplate = computed(() => {
    return `<template>
    <!-- Using a wrapper div is optional -->
    <div :style="{ width: '600px'}">
        <${props.example.component} :config="config" :dataset="dataset">
            <!-- SLOTS -->
            ${props.example.slot || ''}
        </${props.example.component}>
    </div>
</template>`
});

const compContent = ref(null);

function copyComponent() {
    if (compContent.value) {
        copyCode(compContent.value.innerText).then(() => {
            store.copy();
        })
    }
}

</script>

<template>
    <transition name="fade">
        <BaseDragElement v-if="isOpen" snap-on-resize resizable :startTop="130" width="w-[300px] sm:w-[600px]">
            <template #header>
                <button class="absolute -top-10 right-0 hover:bg-gray-200 dark:hover:bg-[#FFFFFF20] transition-colors rounded-full p-1" @click="emit('close')">
                    <XIcon/>
                </button>

                <button @click="copyComponent" class="py-1 px-2 rounded-md bg-gradient-to-br from-app-blue-light to-app-blue text-app-blue-dark transition-colors shadow-md hover:from-app-blue hover:to-app-blue-light absolute -top-10 flex flex-row gap-2 place-items-center">
                    <VueUiIcon name="htmlTag" stroke="#314063"/>
                        {{ makerStore.translations.steps.three[store.lang] }}
                </button>
            </template>

            <div class="w-full max-h-[calc(100vh-200px)] overflow-visible px-4 pb-4">
                <div class="flex flex-row gap-10 place-items-center">
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row place-items-center">
                            <VueUiIcon :name="example.icon" :stroke="isDarkMode ? '#5F8aee' : '#2A2A2A'" class="mr-2"/>
                            <span class="text-gray-500 text-xl">VueUi</span><span class="text-app-blue text-xl">{{ example.component.replaceAll('VueUi', '') }}</span>
                        </div>
                        <div dir="auto" class="mb-4">
                            {{ example.description[store.lang] }}
                        </div>
                    </div>
                </div>

                <div
                    ref="compContent"
                    class="relative bg-[#e1e5e866] shadow dark:shadow-md dark:bg-[#e1e5e812]
                        p-3 rounded border border-transparent
                        hover:border-app-blue hover:bg-[#5f8aee20] dark:hover:bg-[#5f8aee20]
                        transition-colors mb-12"
                >
                    <div class="h-full w-full overflow-visible">
                        <CodeParser content="<script setup>" :language="`html`" :withCopy="false" noPointerEvents borderRadius="none"/>
                        <CodeParser :content="generatedScript" language="javascript" :withCopy="false" noPointerEvents borderRadius="none"/>
                        <CodeParser content="</script>" :language="`html`" :withCopy="false" noPointerEvents borderRadius="none"/>
                        <CodeParser :content="generatedTemplate" :language="`html`" :withCopy="false" noPointerEvents borderRadius="none"/>
                    </div>
                    <button
                    @click="copyComponent"
                    class="cursor-pointer absolute top-4 right-4 flex items-center justify-center
                            p-2 rounded-full hover:bg-[#3A3A3A] hover:shadow-md transition-colors"
                    >
                        <CopyIcon class="text-app-blue" />
                    </button>
                </div>
            </div>
        </BaseDragElement>
    </transition>
</template>