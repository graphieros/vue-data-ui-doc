<script setup>
import { ref, computed, nextTick, watch } from "vue";
import { useNestedProp } from "../../useNestedProp";
import { getVueDataUiConfig } from "vue-data-ui";
import { copyCode, jsonToJsObject } from "./lib";
import { useMainStore } from "../../stores";
import { CopyIcon, DatabaseIcon, RefreshDotIcon } from "vue-tabler-icons";
import { useMakerStore } from "../../stores/maker";
import IconSettings from "../IconSettings.vue";
import BaseDragMenu from "../BaseDragMenu.vue";
import FlexibleTooltip from "../FlexibleTooltip.vue";
import CodeParser from "../../components/customization/CodeParser.vue";
import CopyComponent from "./CopyComponent.vue";
import BaseCard from "../BaseCard.vue";
import { useImportMap } from "../../useImportMap";

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
const isVapor = ref(false);
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
        });
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

const isTreeshaken = ref(true);
const imp = useImportMap(props.componentName);

watch(
    () => isUniversal.value,
    (v) => {
        isTreeshaken.value = !v;
    },
);

watch(
    () => isTreeshaken.value,
    (v) => {
        if (v && isUniversal.value) {
            isUniversal.value = false;
        }
    },
);

const universalWarning = ref({
    en: "Using the universal component will pull all the components of the library into your build. Use this component for quick mock-ups, or if your project intends on using most components of the library. You should generally prefer the treeshaken imports, as documented on the component pages.",
    fr: "L’utilisation du composant universel inclura tous les composants de la bibliothèque dans votre build. Utilisez ce composant pour des maquettes rapides ou si votre projet prévoit d’utiliser la majorité des composants de la bibliothèque. Il est généralement préférable d’utiliser les imports optimisés (treeshaking), comme indiqué dans la documentation des composants.",
    pt: "Usar o componente universal irá incluir todos os componentes da biblioteca no seu build. Utilize este componente para protótipos rápidos ou se o seu projeto pretende usar a maioria dos componentes da biblioteca. Em geral, é preferível usar imports com treeshaking, conforme documentado nas páginas dos componentes.",
    de: "Die Verwendung der universellen Komponente fügt alle Komponenten der Bibliothek in Ihren Build ein. Verwenden Sie diese Komponente für schnelle Prototypen oder wenn Ihr Projekt die meisten Komponenten der Bibliothek nutzt. In der Regel sollten Sie die treeshaken Imports bevorzugen, wie in der Komponentendokumentation beschrieben.",
    zh: "使用通用组件会将库中的所有组件打包到你的构建中。该组件适用于快速原型开发，或当你的项目需要使用库中大多数组件时。通常建议优先使用按需引入（treeshaking），详见各组件文档。",
    ja: "ユニバーサルコンポーネントを使用すると、ライブラリ内のすべてのコンポーネントがビルドに含まれます。このコンポーネントは、迅速なモックアップや、プロジェクトでライブラリの大部分のコンポーネントを使用する場合に適しています。通常は、各コンポーネントのドキュメントに記載されているツリーシェイキングされたインポートを優先してください。",
    es: "El uso del componente universal incluirá todos los componentes de la biblioteca en tu build. Utiliza este componente para prototipos rápidos o si tu proyecto pretende usar la mayoría de los componentes de la biblioteca. Generalmente, es preferible usar imports con treeshaking, como se documenta en las páginas de los componentes.",
    ko: "유니버설 컴포넌트를 사용하면 라이브러리의 모든 컴포넌트가 빌드에 포함됩니다. 빠른 목업을 만들거나 프로젝트에서 대부분의 컴포넌트를 사용할 경우에 적합합니다. 일반적으로는 각 컴포넌트 문서에 설명된 트리쉐이킹(import)을 사용하는 것이 좋습니다.",
    ar: "سيؤدي استخدام المكوّن الشامل إلى تضمين جميع مكوّنات المكتبة في عملية البناء الخاصة بك. استخدم هذا المكوّن للنماذج الأولية السريعة، أو إذا كان مشروعك يهدف إلى استخدام معظم مكوّنات المكتبة. يُفضل عادةً استخدام الاستيرادات المعتمدة على التقليم (treeshaking)، كما هو موضح في صفحات توثيق المكوّنات.",
});

const scriptTag = computed(() => {
    return `<script${isVapor.value ? " vapor" : ""} setup>`;
});

const generatedScript = computed(() => {
    return `import { ${isComputed.value ? "computed" : "ref"} } from "vue";
${isTreeshaken.value ? imp.treeshaken : `import { ${isUniversal.value ? "VueDataUi" : props.componentName} } from "vue-data-ui";`}${isUniversal.value ? ` // ${universalWarning.value[store.lang]}` : ""}
import "vue-data-ui/style.css"; // ${store.translations.styleImport[store.lang]}

${
    isComputed.value
        ? `const config = computed(() => {
return ${jsonToJsObject(finalConfig.value, 4, true)} });`
        : `const config = ref(${jsonToJsObject(finalConfig.value, 4, true)});`
}

${
    isComputed.value
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
        <${isUniversal.value ? "VueDataUi" : props.componentName}${isUniversal.value ? `\n            component="${props.componentName}"` : ""}
            :config="config"
            :dataset="dataset"
       />
    </div>
</template>`;
});

const storageState = ref(false);

function toggleStorage() {
    storageState.value = !storageState.value;
}
</script>

<template>
    <BaseDragMenu>
        <div
            class="w-[48px] flex flex-col gap-2 place-items-center justify-center"
        >
            <FlexibleTooltip
                :content="makerTranslations.componentCode[store.lang]"
                position="right"
            >
                <button
                    @click="copyComponent"
                    class="p-2 rounded-full bg-gray-100 dark:bg-[#3A3A3A] hover:bg-gray-50 dark:hover:bg-[#4A4A4A] transition-colors h-12 w-12 flex place-items-center justify-center shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                >
                    <CopyIcon class="text-[#3A3A3A] dark:text-[#CCCCCC]" />
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip
                :content="makerTranslations.copyConfigOnly[store.lang]"
                position="right"
            >
                <button
                    @click="copyConfigOnly"
                    class="p-2 rounded-full bg-gray-100 dark:bg-[#3A3A3A] hover:bg-gray-50 dark:hover:bg-[#4A4A4A] transition-colors h-12 w-12 flex place-items-center justify-center shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                >
                    <IconSettings
                        :size="28"
                        :strokeWidth="1.4"
                        :stroke="isDarkMode ? '#CCCCCC' : '#3A3A3A'"
                    />
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip
                :content="makerTranslations.copyDatasetOnly[store.lang]"
                position="right"
            >
                <button
                    @click="copyDatasetOnly"
                    class="p-2 rounded-full bg-gray-100 dark:bg-[#3A3A3A] hover:bg-gray-50 dark:hover:bg-[#4A4A4A] transition-colors h-12 w-12 flex place-items-center justify-center shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                >
                    <VueUiIcon
                        name="numbers"
                        :size="28"
                        :stroke="isDarkMode ? '#CCCCCC' : '#3A3A3A'"
                    />
                </button>
            </FlexibleTooltip>
            <FlexibleTooltip
                :content="makerTranslations.clearStorage[store.lang]"
                position="right"
                width="w-[100px]"
            >
                <button
                    @click="nuke"
                    class="p-2 rounded-full bg-gradient-to-br from-white to-app-orange hover:from-app-orange hover:to-white h-12 w-12 flex place-items-center justify-center shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                >
                    <RefreshDotIcon class="text-[#3A3A3A]" />
                </button>
            </FlexibleTooltip>
            <!-- <FlexibleTooltip :content="makerTranslations.makerStorage[store.lang]" position="right" width="w-[100px]">
                <button @click="toggleStorage"
                    class="p-2 rounded-full bg-gradient-to-br from-app-blue to-app-blue-dark hover:from-app-blue-dark hover:to-app-blue h-12 w-12 flex place-items-center justify-center shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
                    <DatabaseIcon class="text-[#CCCCCC]" />
                </button>
            </FlexibleTooltip> -->
        </div>
        <!-- <div class="absolute top-1/2 left-full -translate-y-1/2" v-if="storageState">
            TEST
        </div> -->
    </BaseDragMenu>

    <BaseCard class="mt-6">
        <div class="flex flex-col sm:flex-row gap-4">
            <CopyComponent @click="copyComponent" />
            <button
                class="flex gap-1 bg-app-blue py-3 px-5 rounded-full opacity-80 hover:opacity-100 text-white dark:text-black hover:shadow-xl font-inter-medium transition-all place-items-center text-sm mb-4"
                @click="copyConfigOnly"
            >
                <IconSettings
                    :size="28"
                    :strokeWidth="1.4"
                    :stroke="isDarkMode ? '#1A1A1A' : '#FFFFFF'"
                />
                {{ makerTranslations.copyConfigOnly[store.lang] }}
            </button>
            <button
                class="flex gap-1 bg-app-green py-3 px-5 rounded-full opacity-80 hover:opacity-100 text-black hover:shadow-xl font-inter-medium transition-all place-items-center text-sm mb-4"
                @click="copyDatasetOnly"
            >
                <VueUiIcon name="numbers" :size="24" stroke="#3A3A3A" />
                {{ makerTranslations.copyDatasetOnly[store.lang] }}
            </button>
        </div>
        <div class="mb-4 flex flex-row gap-4 place-items-center">
            <input id="comp" type="checkbox" v-model="isComputed" />
            <label for="comp" class="text-sm cursor-pointer"
                >Use computed instead of ref</label
            >
        </div>
        <div class="mb-4 flex flex-row gap-4 place-items-center">
            <input id="vapor" type="checkbox" v-model="isVapor" />
            <label for="vapor" class="text-sm cursor-pointer"
                >Use Vapor instead of VDOM</label
            >
        </div>
        <div class="mb-4 flex flex-row gap-4 place-items-center">
            <input id="univ" type="checkbox" v-model="isUniversal" />
            <label for="univ" class="text-sm cursor-pointer"
                >Use VueDataUi universal component</label
            >
        </div>
        <div class="mb-4 flex flex-row gap-4 place-items-center">
            <input id="treesh" type="checkbox" v-model="isTreeshaken" />
            <label for="treesh" class="text-sm cursor-pointer"
                >Treeshaken import ( v3.2.0+ )</label
            >
        </div>
        <div
            class="relative p-3 rounded-xl border border-transparent hover:border-app-blue hover:bg-[#5f8aee20] dark:hover:bg-[#5f8aee20] transition-colors mb-12"
            ref="compContent"
        >
            <div>
                <CodeParser
                    :content="scriptTag"
                    language="html"
                    :withCopy="false"
                    noPointerEvents
                    borderRadius="none"
                />
                <CodeParser
                    :content="generatedScript"
                    language="javascript"
                    :withCopy="false"
                    noPointerEvents
                    borderRadius="none"
                />
                <CodeParser
                    content="</script>"
                    language="html"
                    :withCopy="false"
                    noPointerEvents
                    borderRadius="none"
                />
                <CodeParser
                    :content="generatedTemplate"
                    language="html"
                    :withCopy="false"
                    noPointerEvents
                    borderRadius="none"
                />
            </div>
            <button
                @click="copyComponent"
                class="cursor-pointer absolute top-4 right-4 flex flex-row place-items-center justify-center p-2 rounded-full hover:bg-[#3A3A3A] hover:shadow-md transition-colors"
            >
                <CopyIcon class="text-app-blue" />
            </button>
        </div>
    </BaseCard>
</template>
