<script setup>
    import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import { useUniversalStore } from "../stores/universal"
import SideMenu from "../components/SideMenu.vue";
import CodeParser from "../components/customization/CodeParser.vue";

import sdk from '@stackblitz/sdk'
import BaseDocTitle from "../components/BaseDocTitle.vue";
import BaseCard from "../components/BaseCard.vue";

onMounted(() => {
    window.Prism = window.Prism || {}
    window.Prism.manual = true
    Prism.highlightAll();

    sdk.embedProjectId(
        'stackblitz',
        'vitejs-vite-cjmxbt3n',
        {
            forceEmbedLayout: true,
            openFile: 'src/App.vue',
        }
    );
})

    const store = useMainStore()
    const universalStore = useUniversalStore()
    const isDarkMode = computed(() => store.isDarkMode);
    const isOpen = ref(window.innerWidth > 768);

    const translations = computed(() => universalStore.translations)

    function toggleMenu(state) {
        isOpen.value = state;
    }

    const setupStart = ref(`<script setup>`)
    const setupCode = ref(`import { VueDataUi } from "vue-data-ui";

const lineConfig = ref({}); // A config corresponding to VueUiXy specs
const donutConfig  = ref({}); // A config corresponding to VueUiDonut specs    
const lineDataset = ref([]); // A dataset corresponding to VueUiXy specs
const donutDataset = ref([]); // A dataset corresponding to VueUiDonut specs`)
    const setupEnd = ref(`${'<'}/script>`)
    const templateCode = ref(`<template>
    <VueDataUi
        component="VueUiXy"
        :dataset="lineDataset"
        :config="lineConfig"
    />

    <VueDataUi
        component="VueUiDonut"
        :dataset="donutDataset"
        :config="donutConfig"
    />
</template>`)

const warning = ref({
    en: 'Using the universal component will pull all the components of the library into your build. Use this component for quick mock-ups, or if your project intends on using most components of the library. You should generally prefer the treeshaken imports, as documented on the component pages.',
    fr: 'L’utilisation du composant universel inclura tous les composants de la bibliothèque dans votre build. Utilisez ce composant pour des maquettes rapides ou si votre projet prévoit d’utiliser la majorité des composants de la bibliothèque. Il est généralement préférable d’utiliser les imports optimisés (treeshaking), comme indiqué dans la documentation des composants.',
    pt: 'Usar o componente universal irá incluir todos os componentes da biblioteca no seu build. Utilize este componente para protótipos rápidos ou se o seu projeto pretende usar a maioria dos componentes da biblioteca. Em geral, é preferível usar imports com treeshaking, conforme documentado nas páginas dos componentes.',
    de: 'Die Verwendung der universellen Komponente fügt alle Komponenten der Bibliothek in Ihren Build ein. Verwenden Sie diese Komponente für schnelle Prototypen oder wenn Ihr Projekt die meisten Komponenten der Bibliothek nutzt. In der Regel sollten Sie die treeshaken Imports bevorzugen, wie in der Komponentendokumentation beschrieben.',
    zh: '使用通用组件会将库中的所有组件打包到你的构建中。该组件适用于快速原型开发，或当你的项目需要使用库中大多数组件时。通常建议优先使用按需引入（treeshaking），详见各组件文档。',
    ja: 'ユニバーサルコンポーネントを使用すると、ライブラリ内のすべてのコンポーネントがビルドに含まれます。このコンポーネントは、迅速なモックアップや、プロジェクトでライブラリの大部分のコンポーネントを使用する場合に適しています。通常は、各コンポーネントのドキュメントに記載されているツリーシェイキングされたインポートを優先してください。',
    es: 'El uso del componente universal incluirá todos los componentes de la biblioteca en tu build. Utiliza este componente para prototipos rápidos o si tu proyecto pretende usar la mayoría de los componentes de la biblioteca. Generalmente, es preferible usar imports con treeshaking, como se documenta en las páginas de los componentes.',
    ko: '유니버설 컴포넌트를 사용하면 라이브러리의 모든 컴포넌트가 빌드에 포함됩니다. 빠른 목업을 만들거나 프로젝트에서 대부분의 컴포넌트를 사용할 경우에 적합합니다. 일반적으로는 각 컴포넌트 문서에 설명된 트리쉐이킹(import)을 사용하는 것이 좋습니다.',
    ar: 'سيؤدي استخدام المكوّن الشامل إلى تضمين جميع مكوّنات المكتبة في عملية البناء الخاصة بك. استخدم هذا المكوّن للنماذج الأولية السريعة، أو إذا كان مشروعك يهدف إلى استخدام معظم مكوّنات المكتبة. يُفضل عادةً استخدام الاستيرادات المعتمدة على التقليم (treeshaking)، كما هو موضح في صفحات توثيق المكوّنات.'
})
    
</script>

<template>
    <SideMenu @toggle="toggleMenu"/>
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden relative z-1`">

        <BaseDocTitle name="VueDataUi" universal/>

        <p class="mx-auto max-w-[600px] text-md text-black dark:text-gray-500 mb-2 text-left px-4">
            {{ translations.presentation[store.lang] }}
        </p>
        <p class="mx-auto max-w-[600px] text-md  mb-2 text-left px-4">
            {{ translations.features[store.lang] }}
        </p>

        <BaseCard class="max-w-[600px] mx-auto mt-4" backgroundColor="bg-app-orange bg-opacity-30">
            <VueUiIcon name="triangleExclamation" class="mb-2" :stroke="isDarkMode ? '#FFFFFF' : '#a32300'"/>
            {{ warning[store.lang] }}
        </BaseCard>

        <BaseCard class="my-6">
            <div class="mx-auto rounded-md">
    
            <CodeParser :content="setupStart" language="html" :withCopy="false" borderRadius="none"/>
            <CodeParser :content="setupCode" language="javascript" :withCopy="false" borderRadius="none"/>
            <CodeParser :content="setupEnd" language="html" :withCopy="false" borderRadius="none"/>
            <CodeParser :content="templateCode" language="html" :withCopy="false" borderRadius="none"/>
    
            </div>
        </BaseCard>
        <div 
            id="stackblitz"
            class="w-full mx-auto min-h-[1000px]"
        />
    </div>
</template>