<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { useRoute, useRouter } from "vue-router";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import ExampleLoadingXy from "../components/examples/ExampleLoadingXy.vue";

const store = useMainStore();
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const router = useRouter();
const route = useRoute();

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
        link: '/examples'
    },
    {
        description: translations.value.docs.loadingStates[store.lang]
    }
]);

const localTranslations = ref({
    description: {
        en: "What to display while data is loading? This page presents some examples and strategies to keep your design appealing while users are waiting for data to be loaded from the server.",
        fr: "Que montrer pendant le chargement des données ? Cette page présente des exemples et des stratégies pour garder votre design attrayant pendant que les utilisateurs attendent le chargement des données depuis le serveur.",
        pt: "O que exibir enquanto os dados estão carregando? Esta página apresenta alguns exemplos e estratégias para manter seu design atraente enquanto os usuários aguardam o carregamento dos dados do servidor.",
        de: "Was anzeigen, während Daten geladen werden? Diese Seite zeigt einige Beispiele und Strategien, um Ihr Design ansprechend zu halten, während die Benutzer auf das Laden der Daten vom Server warten.",
        zh: "数据加载时显示什么？本页展示了一些示例和策略，以在用户等待从服务器加载数据时保持设计的吸引力。",
        jp: "データをロード中に何を表示するか？このページでは、サーバーからデータがロードされるのを待っている間、デザインを魅力的に保つための例や戦略を紹介します。",
        es: "¿Qué mostrar mientras se cargan los datos? Esta página presenta algunos ejemplos y estrategias para mantener un diseño atractivo mientras los usuarios esperan que los datos se carguen desde el servidor.",
        ko: "데이터가 로드되는 동안 무엇을 표시해야 할까요? 이 페이지에서는 사용자가 서버에서 데이터를 로드하는 동안 디자인을 매력적으로 유지하기 위한 몇 가지 예와 전략을 제공합니다.",
        ar: "ماذا يتم عرضه أثناء تحميل البيانات؟ تقدم هذه الصفحة بعض الأمثلة والاستراتيجيات للحفاظ على جاذبية التصميم أثناء انتظار المستخدمين لتحميل البيانات من الخادم."
    },
    toggleState: {
        en: "Toggle loading state",
        fr: "Basculer l'état de chargement",
        pt: "Alternar estado de carregamento",
        de: "Ladezustand umschalten",
        zh: "切换加载状态",
        jp: "ロード状態を切り替え",
        es: "Alternar estado de carga",
        ko: "로딩 상태 전환",
        ar: "تبديل حالة التحميل"
    },
    twinChart: {
        en: "Twin static chart: the best option",
        fr: "Graphique statique jumeau : la meilleure option",
        pt: "Gráfico estático duplo: a melhor opção",
        de: "Zwillings-Statikdiagramm: die beste Option",
        zh: "双静态图表：最佳选项",
        jp: "ツイン静的チャート：最適なオプション",
        es: "Gráfico estático gemelo: la mejor opción",
        ko: "쌍둥이 정적 차트: 최고의 선택",
        ar: "مخطط ثابت مزدوج: الخيار الأفضل"
    },
    twinChartDescription: {
        en: "Use hardcoded data on the same component, with different config settings to signify the loading state",
        fr: "Utilisez des données codées en dur sur le même composant, avec des paramètres de configuration différents pour indiquer l'état de chargement",
        pt: "Use dados codificados no mesmo componente, com configurações diferentes para indicar o estado de carregamento",
        de: "Verwenden Sie fest codierte Daten in derselben Komponente, mit unterschiedlichen Konfigurationseinstellungen, um den Ladezustand anzuzeigen",
        zh: "在同一组件上使用硬编码数据，通过不同的配置设置表示加载状态",
        jp: "同じコンポーネントでハードコードされたデータを使用し、異なる設定でロード状態を示します",
        es: "Usa datos codificados en el mismo componente, con diferentes configuraciones para indicar el estado de carga",
        ko: "동일한 구성 요소에서 하드코딩된 데이터를 사용하고, 로딩 상태를 나타내기 위해 다른 설정을 사용합니다",
        ar: "استخدم بيانات مُشفرة يدويًا على نفس المكون مع إعدادات تكوين مختلفة للإشارة إلى حالة التحميل"
    }
})

const loadingStates = ref({
    twin: true
})

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>
    <div class="max-w-[1280px] px-12 2xl:px-4 mx-auto relative my-12">
        <h1 dir="auto" class="text-[36px] text-center">{{ translations.docs.loadingStates[store.lang] }}</h1>
    </div>

    <div class="flex place-items-center mx-auto max-w-[1000px] justify-center mb-12" dir="auto">
        {{ localTranslations.description[store.lang] }}
    </div>

    <article class="mx-auto max-w-[1000px] bg-white dark:bg-[#2A2A2A] py-2 px-4" dir="auto">
        <h2 class="text-2xl text-app-blue">
            1. {{ localTranslations.twinChart[store.lang] }}
        </h2>
        <p class="text-gray-500">{{ localTranslations.twinChartDescription[store.lang] }}</p>
        <div class="flex flex-row gap-2 place-items-center my-4">
            <label for="toggleTwin">{{ localTranslations.toggleState[store.lang] }}</label>
            <input id="toggleTwin" type="checkbox" v-model="loadingStates.twin">
        </div>
        <div class="w-full max-w-[600px] mx-auto">
            <ExampleLoadingXy :loading="loadingStates.twin"/>
        </div>

        <div class="mt-12">
            ... more examples are coming
        </div>
    </article>
</template>