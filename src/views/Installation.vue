<script setup>
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "../stores";
import router from "../router";
import ChartSeeker from "../components/ChartSeeker.vue";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import colorBridge from "color-bridge";
import { VueHiCode } from "vue-hi-code";
import "vue-hi-code/style.css";
import BaseCard from "../components/BaseCard.vue";
import BackgroundPattern from "../components/BackgroundPattern.vue";
import BaseMenuPattern from "../components/BaseMenuPattern.vue";
import sdk from "@stackblitz/sdk";

const store = useMainStore();
const { utils } = colorBridge();
const { lightenHexColor } = utils();

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => {
    return store.translations;
});

onMounted(() => {
    window.scrollTo(0, 0);

    sdk.embedProjectId("stackblitz", "vitejs-vite-cjmxbt3n", {
        forceEmbedLayout: true,
        openFile: "src/App.vue",
    });
});

function gotoMaker() {
    router.push({ path: "/chart-builder" });
}

const codeParserConfig = computed(() => {
    return {
        backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FAFAFA",
        baseTextColor: isDarkMode.value ? "#CCCCCC" : "#3A3A3A",
        colorPunctuation: isDarkMode.value ? "#E1E5E8" : "#2A2A2A",
        colorFunction: isDarkMode.value ? "#DCDCAA" : "#1A1A1A",
        colorTitle: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
        copyIconColor: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
    };
});

const warning = ref({
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

const mainCodeContent = computed(() => {
    return `import { createApp } from 'vue';
import App from "./App.vue"; 
import "vue-data-ui/style.css"; // ${translations.value.installation.comments.includeCss[store.lang]}

// ${translations.value.installation.comments.global[store.lang]}
// Since v3.2.0 treeshake import (recommended):
import { VueUiXy } from "vue-data-ui/vue-ui-xy";

// Not treeshaken! (backwards compatible before v3.2.0)
import { VueUiRadar } from "vue-data-ui";

const app = createApp(App);

app.component("VueUiRadar", VueUiRadar);
app.component("VueUiXy", VueUiXy);
app.mount('#app');
`;
});

const componentContent = computed(() => {
    return `// ${translations.value.installation.comments.import[store.lang]}
import { ref } from "vue";
import { VueUiXy } from "vue-data-ui/vue-ui-xy"; // treeshaken (recommended)
import { VueUiRadar } from "vue-data-ui"; // not treeshaken

// With Typescript:
import {
    VueUiRadar,
    type VueUiRadarDataset,
    type VueUiRadarConfig
} from "vue-data-ui";

const dataset = ref<VueUiRadarDataset>(/* your dataset */);
const config = ref<VueUiRadarConfig>(/* your config (optional) */);
    `;
});

const universalComponentContent = computed(() => {
    return `// ${translations.value.installation.comments.universalComponent[store.lang]}

// ${warning.value[store.lang]}

import { ref } from "vue";
import { VueDataUi } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref(/* Your dataset */);
const config = ref(/* Your config (optional) */);
    `;
});

const universalComponentTemplateContent = computed(() => {
    return `<template>
    <!-- Caveat: universal component is not treeshakable -->
    <div style="width:600px;">
        <VueDataUi
            component="VueUiXy"
            :dataset="dataset"
            :config="config"
        />
    </div>
</template>
    `;
});
</script>

<template>
    <BackgroundPattern>
        <template #defs>
            <BaseMenuPattern
                menu="installation"
                id="pat"
                stroke="#5f8bee"
                patternTransform="scale(0.2)"
            />
        </template>
    </BackgroundPattern>
    <div
        class="flex flex-col place-content-center place-items-center text-center mb-12 z-10"
    >
        <div
            class="fixed top-0 left-0 h-screen w-screen z-0 pointer-events-none"
            style="opacity: 0.4"
        >
            <div
                class="absolute top-0 left-0 w-full h-full"
                :style="
                    isDarkMode
                        ? 'background:radial-gradient(at top left, #5f8bee, transparent) !important'
                        : 'background:radial-gradient(at top, #FFFFFF, transparent)'
                "
            />
        </div>
        <div
            class="w-full flex flex-row gap-4 place-items-center justify-center my-12"
        >
            <div class="relative w-[80px] h-[80px]">
                <VueUiIcon
                    :size="40"
                    name="starFill"
                    :stroke="isDarkMode ? '#42d392' : '#5f8bee'"
                    :is-spin="true"
                    spinDuration="10s"
                >
                    <template #exp>
                        <VueUiIcon
                            name="starFill"
                            :is-spin="true"
                            spinDuration="5s"
                            :stroke="isDarkMode ? '#87e6bb' : '#83a4f2'"
                        />
                    </template>
                </VueUiIcon>
            </div>
            <h1
                :class="`font-inter-bold text-[48px] sm:text-[72px] text-center ${isDarkMode ? 'bg-gradient-to-r from-app-green to-indigo-400 bg-clip-text text-transparent' : 'text-vue-blue'} z-10`"
                style="letter-spacing: -1px"
            >
                {{ translations.menu.installation[store.lang] }}
            </h1>
        </div>

        <BaseCard>
            <VueHiCode
                content="npm i vue-data-ui   "
                language="javascript"
                v-bind="codeParserConfig"
                @copy="store.copy()"
            />
        </BaseCard>

        <div class="mt-4 z-10">
            <a
                href="https://github.com/graphieros/vue-data-ui-nuxt"
                class="underline"
                target="_blank"
            >
                <div dir="auto" class="px-6">
                    {{ translations.nuxt.implementation[store.lang] }}
                </div>
            </a>
        </div>

        <div class="mt-4 z-10 flex flex-row place-items-center gap-2">
            <VueUiIcon name="robot" stroke="#5F8BEE" />
            <a
                href="https://vue-data-ui.graphieros.com/llms.txt"
                class="underline"
                target="_blank"
                >AI assistance (llms.txt)</a
            >
        </div>

        <BaseCard class="max-w-[1400px] max-12 mt-6">
            <div class="text-left">
                <VueHiCode
                    :content="mainCodeContent"
                    language="javascript"
                    @copy="store.copy()"
                    v-bind="{ ...codeParserConfig, title: 'src/main.js' }"
                />
            </div>

            <div class="text-left mt-6">
                <VueHiCode
                    :content="componentContent"
                    language="javascript"
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                    title="MyComponent.vue"
                />
            </div>

            <div class="text-left mt-6">
                <VueHiCode
                    :content="universalComponentContent"
                    language="javascript"
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                    title="MyUniversalChart.vue"
                />
            </div>
            <div class="text-left mt-6">
                <VueHiCode
                    :content="universalComponentTemplateContent"
                    language="html"
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                />
            </div>
        </BaseCard>

        <div
            class="flex flex-row place-items-center justify-center z-10 mt-10 px-4"
        >
            <div
                class="p-0.5 bg-gradient-to-r from-app-green to-app-blue rounded-full hover:shadow-xl transition-all"
            >
                <button
                    dir="auto"
                    @click="gotoMaker"
                    class="py-3 px-6 rounded-full text-xl flex flex-row gap-2 place-items-cente transition-colors bg-white dark:bg-[#1A1A1A] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                >
                    <VueUiIcon
                        name="arrowRight"
                        class="animate-pulse"
                        :stroke="isDarkMode ? '#42d392' : '#2A2A2A'"
                    />
                    <VueUiIcon
                        name="clipboardBar"
                        :stroke="isDarkMode ? '#42d392' : '#2A2A2A'"
                    />
                    {{ translations.makeNow[store.lang] }}
                </button>
            </div>
        </div>

        <div class="px-16 w-full">
            <div class="text-left font-mono">
                Stackblitz example
            </div>
            <div id="stackblitz" class="w-full mx-auto min-h-[1000px] mt-6" />
        </div>

        <ChartSeeker class="mt-12 z-10 max-w-[800px]" />
        <ConfirmCopy />
    </div>
</template>
