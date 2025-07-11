<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import AboutComponentTypes from "../components/AboutComponentTypes.vue";
import SatisfactionStats from "../components/SatisfactionStats.vue";
import { useConfig } from "../assets/useConfig";
import { CheckIcon } from "vue-tabler-icons";
import BaseSpinner from "../components/BaseSpinner.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
  return store.translations;
});

const contributors = ref(null);

// onMounted(() => {
//   window.scrollTo(0,0)
//   fetch('https://api.github.com/repos/graphieros/vue-data-ui/contributors').then(response => {
//     if(!response.ok) {
//       throw new Error('Meh')
//     }
//     return response.json()
//   }).then(data => {
//     contributors.value = data;
//     console.log({data})
//   })
// })

// https://api.github.com/repos/graphieros/vue-data-ui/contributors

const skeletonConfig = ref({
  type: "line",
  style: {
    backgroundColor: "#F3F4F6",
    color: "#CCCCCC",
    maxHeight: 500,
    animated: false,
    line: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      path: {
        color: "#5f8aee",
        strokeWidth: 1,
        showPlots: true,
      },
    },
    bar: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      borderRadius: 0.5,
      color: "#5c5c5c",
      barWidth: 9,
    },
    chestnut: {
      color: "#5C5C5C",
    },
    donut: {
      color: "#5f8aee",
      strokeWidth: 64,
    },
    onion: {
      color: "#5f8aee",
    },
    gauge: {
      color: "#5f8aee",
    },
    quadrant: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      plots: {
        radius: 1.5,
        color: "#5f8aee",
      },
    },
    radar: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      shapes: {
        color: "#5f8aee",
      },
    },
    waffle: {
      color: "#5c5c5c",
    },
    table: {
      th: {
        color: "#5c5c5c",
      },
      td: {
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
    },
    rating: {
      color: "#5f8aee",
      filled: false,
      strokeWidth: 1,
      maxWidth: 200,
    },
    verticalBar: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      borderRadius: 0.5,
      color: "#5c5c5c",
    },
  },
});

const skeletonConfigDark = ref({
  type: "line",
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    maxHeight: 500,
    animated: false,
    line: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      path: {
        color: "#42d392",
        strokeWidth: 1,
        showPlots: true,
      },
    },
    bar: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      borderRadius: 0.5,
      color: "#5c5c5c",
      barWidth: 9,
    },
    chestnut: {
      color: "#5C5C5C",
    },
    donut: {
      color: "#42d392",
      strokeWidth: 64,
    },
    onion: {
      color: "#42d392",
    },
    gauge: {
      color: "#42d392",
    },
    quadrant: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      plots: {
        radius: 1.5,
        color: "#42d392",
      },
    },
    radar: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      shapes: {
        color: "#42d392",
      },
    },
    waffle: {
      color: "#5c5c5c",
    },
    table: {
      th: {
        color: "#5c5c5c",
      },
      td: {
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
    },
    rating: {
      color: "#42d392",
      filled: false,
      strokeWidth: 1,
      maxWidth: 200,
    },
    verticalBar: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5,
      },
      borderRadius: 0.5,
      color: "#5c5c5c",
    },
  },
});

const skeletons = [
  { ...skeletonConfig.value },
  { ...skeletonConfig.value, type: "quadrant" },
  { ...skeletonConfig.value, type: "donut" },
  { ...skeletonConfig.value, type: "verticalBar" },
  { ...skeletonConfig.value, type: "radar" },
  { ...skeletonConfig.value, type: "table" },
  { ...skeletonConfig.value, type: "gauge" },
  { ...skeletonConfig.value, type: "waffle" },
  { ...skeletonConfig.value, type: "onion" },
  { ...skeletonConfig.value, type: "bar" },
  { ...skeletonConfig.value, type: "rating" },
  { ...skeletonConfig.value, type: "chestnut" },
];

const skeletonsDarkMode = [
  { ...skeletonConfigDark.value },
  { ...skeletonConfigDark.value, type: "quadrant" },
  { ...skeletonConfigDark.value, type: "donut" },
  { ...skeletonConfigDark.value, type: "verticalBar" },
  { ...skeletonConfigDark.value, type: "radar" },
  { ...skeletonConfigDark.value, type: "table" },
  { ...skeletonConfigDark.value, type: "gauge" },
  { ...skeletonConfigDark.value, type: "waffle" },
  { ...skeletonConfigDark.value, type: "onion" },
  { ...skeletonConfigDark.value, type: "bar" },
  { ...skeletonConfigDark.value, type: "rating" },
  { ...skeletonConfigDark.value, type: "chestnut" },
];

const stackConfigDarkMode = ref({
  style: {
    backgroundColor: "#1A1A1A",
    fontFamily: "inherit",
    bar: {
      gradient: { show: true, intensity: 40, underlayerColor: "#FFFFFF" },
    },
    legend: {
      margin: "6px 0 0 0",
      textAlign: "left",
      show: true,
      fontSize: 12,
      name: { color: "#CCCCCC", bold: false },
      value: {
        show: true,
        bold: false,
        color: "#DDDDDD",
        prefix: "",
        suffix: "",
        rounding: 0,
      },
      percentage: { show: true, bold: true, color: "#DDDDDD", rounding: 1 },
    },
    title: {
      textAlign: "left",
      text: "Vue Data UI",
      color: "#FAFAFA",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "Component types",
        fontSize: 12,
        bold: false,
      },
    },
  },
});

const stackConfig = ref({
  style: {
    backgroundColor: "#F3F4F6",
    fontFamily: "inherit",
    bar: {
      gradient: { show: true, intensity: 40, underlayerColor: "#FFFFFF" },
    },
    legend: {
      margin: "6px 0 0 0",
      textAlign: "left",
      show: true,
      fontSize: 12,
      name: { color: "#2D353C", bold: false },
      value: {
        show: true,
        bold: false,
        color: "#2D353C",
        prefix: "",
        suffix: "",
        rounding: 0,
      },
      percentage: { show: true, bold: true, color: "#2D353C", rounding: 1 },
    },
    title: {
      textAlign: "left",
      text: "Vue Data UI",
      color: "#2D353C",
      fontSize: 16,
      bold: true,
      margin: "0 0 6px 0",
      subtitle: {
        color: "#A1A1A1",
        text: "Component types",
        fontSize: 12,
        bold: false,
      },
    },
  },
});

const configs = useConfig();

const componentsLen = computed(() => Object.keys(configs).length + 1);

const advantages = computed(() => {
  return [
  {
    en: "Vue-native, no runtime deps – the package reports 0 dependencies on npm, so you’re shipping only the library code itself",
    fr: "Natif Vue, sans dépendances à l'exécution – le package affiche 0 dépendance sur npm, donc vous ne livrez que le code de la bibliothèque",
    pt: "Nativo Vue, sem dependências em tempo de execução – o pacote reporta 0 dependências no npm, então você está enviando apenas o código da biblioteca",
    de: "Vue-nativ, keine Laufzeitabhängigkeiten – das Paket weist 0 Abhängigkeiten auf npm aus, sodass nur der Bibliothekscode ausgeliefert wird",
    zh: "原生 Vue，无运行时依赖 – 该包在 npm 上显示为零依赖，因此你只需部署库本身的代码",
    jp: "Vueネイティブ、ランタイム依存なし – npmでは依存が0と表示されており、ライブラリコードのみを配布できます",
    es: "Nativo de Vue, sin dependencias en tiempo de ejecución – el paquete informa 0 dependencias en npm, por lo que solo se envía el código de la biblioteca",
    ko: "Vue 네이티브, 런타임 의존성 없음 – npm에 의존성이 0개로 표시되어 라이브러리 코드만 배포됩니다",
    ar: "مبني على Vue أصلي، بدون تبعيات وقت التشغيل – الحزمة تُظهر 0 تبعيات على npm، لذا يتم شحن كود المكتبة فقط",
  },
  {
    en: `${componentsLen.value} ready-made components`,
    fr: `${componentsLen.value} composants prêts à l'emploi`,
    pt: `${componentsLen.value} componentes prontos para uso`,
    de: `${componentsLen.value} fertige Komponenten`,
    zh: `${componentsLen.value} 个现成组件`,
    jp: `既製コンポーネント ${componentsLen.value} 個`,
    es: `${componentsLen.value} componentes listos para usar`,
    ko: `미리 제작된 컴포넌트 ${componentsLen.value}개`,
    ar: `${componentsLen.value} مكوّنات جاهزة`,
  },
  {
    en: "A “universal” component so you can lazy-load just a single component in most screens and swap chart types at runtime",
    fr: "Un composant « universel » pour pouvoir charger dynamiquement un seul composant dans la plupart des écrans et changer de type de graphique à l'exécution",
    pt: "Um componente “universal” para que você possa carregar apenas um único componente na maioria das telas e trocar o tipo de gráfico em tempo de execução",
    de: "Eine „universelle“ Komponente, mit der man in den meisten Ansichten nur eine Komponente lazy-loaden und Diagrammtypen zur Laufzeit austauschen kann",
    zh: "一个“通用”组件，可在大多数页面中按需加载单个组件，并在运行时切换图表类型",
    jp: "“ユニバーサル”コンポーネントにより、ほとんどの画面で1つのコンポーネントだけを遅延読み込みし、実行時にチャートタイプを切り替えられます",
    es: "Un componente “universal” que permite cargar solo uno en la mayoría de las pantallas y cambiar el tipo de gráfico en tiempo de ejecución",
    ko: "“범용” 컴포넌트 하나로 대부분의 화면에서 하나만 lazy-load 하고 실행 중 차트 유형을 바꿀 수 있습니다",
    ar: "مكوّن “عام” يتيح لك تحميل مكوّن واحد فقط عند الطلب في معظم الشاشات وتبديل نوع المخطط أثناء وقت التشغيل",
  },
  {
    en: "Deep slot-based customisation",
    fr: "Personnalisation approfondie basée sur les slots",
    pt: "Personalização profunda baseada em slots",
    de: "Tiefgreifende Slot-basierte Anpassung",
    zh: "基于插槽的深度自定义",
    jp: "スロットベースの高度なカスタマイズ",
    es: "Personalización profunda basada en slots",
    ko: "슬롯 기반의 깊이 있는 사용자 정의",
    ar: "تخصيص عميق قائم على الـ slot",
  },
  {
    en: "“User options” burger menu out-of-the-box – PDF/PNG/CSV export, full-screen, tooltip toggle, table toggle, annotator overlay and more, all wired in for every chart type ",
    fr: "Menu burger des « options utilisateur » prêt à l'emploi – export PDF/PNG/CSV, plein écran, bascule des infobulles, tableau, superposition d’annotations, etc., intégré à chaque type de graphique",
    pt: "Menu tipo hambúrguer com “opções do usuário” pronto para uso – exportação em PDF/PNG/CSV, tela cheia, alternância de dicas, tabela, sobreposição de anotações e mais, tudo integrado para cada tipo de gráfico",
    de: "„Benutzeroptionen“-Burger-Menü direkt einsatzbereit – PDF/PNG/CSV-Export, Vollbild, Tooltip-Umschaltung, Tabellenansicht, Anmerkungs-Overlay und mehr, für jeden Diagrammtyp integriert",
    zh: "开箱即用的“用户选项”汉堡菜单 – 支持导出 PDF/PNG/CSV、全屏、提示开关、表格切换、注释叠加等，适用于每种图表类型",
    jp: "“ユーザーオプション”バーガーメニューを標準搭載 – PDF/PNG/CSV出力、全画面表示、ツールチップ切替、テーブル表示、注釈オーバーレイなど、すべてのチャートタイプで対応",
    es: "Menú tipo hamburguesa con “opciones de usuario” listo para usar – exportación a PDF/PNG/CSV, pantalla completa, activación de tooltips, tabla, superposición de anotaciones y más, todo integrado en cada tipo de gráfico",
    ko: "모든 차트 유형에 기본 제공되는 '사용자 옵션' 버거 메뉴 – PDF/PNG/CSV 내보내기, 전체 화면, 툴팁 토글, 표 토글, 주석 오버레이 등 포함",
    ar: "قائمة “خيارات المستخدم” (قائمة برغر) جاهزة – تصدير PDF/PNG/CSV، وضع ملء الشاشة، تبديل التلميحات، تبديل الجداول، تراكب التعليقات والمزيد، وكل ذلك مدمج في كل نوع من الرسوم",
  },
  {
    en: "Programmatic helpers on each component (generatePdf(), toggleTable(), getData(), etc.) ",
    fr: "Fonctions utilitaires programmatiques sur chaque composant (generatePdf(), toggleTable(), getData(), etc.)",
    pt: "Funções auxiliares programáticas em cada componente (generatePdf(), toggleTable(), getData(), etc.)",
    de: "Programmierbare Hilfsfunktionen in jeder Komponente (generatePdf(), toggleTable(), getData(), etc.)",
    zh: "每个组件都支持编程式辅助方法（如 generatePdf(), toggleTable(), getData() 等）",
    jp: "各コンポーネントにプログラマブルなヘルパー機能あり（generatePdf()、toggleTable()、getData() など）",
    es: "Asistentes programáticos en cada componente (generatePdf(), toggleTable(), getData(), etc.)",
    ko: "각 컴포넌트에 프로그래밍 헬퍼 기능 제공 (generatePdf(), toggleTable(), getData() 등)",
    ar: "مساعدات برمجية على كل مكوّن (مثل generatePdf()، toggleTable()، getData()، إلخ)",
  },
  {
    en: "Dashboard & utility widgets (VueUiDashboard, VueUiKpi, accordions, timers, loaders…) for building full BI panels without mixing multiple UI kits",
    fr: "Tableaux de bord et widgets utilitaires (VueUiDashboard, VueUiKpi, accordéons, minuteries, chargeurs…) pour construire des panneaux BI complets sans mélanger plusieurs kits UI",
    pt: "Widgets de dashboard e utilitários (VueUiDashboard, VueUiKpi, acordeões, temporizadores, carregadores…) para construir painéis BI completos sem misturar vários kits de UI",
    de: "Dashboards und Hilfs-Widgets (VueUiDashboard, VueUiKpi, Akkordeons, Timer, Ladesymbole …), um vollständige BI-Panels ohne mehrere UI-Kits zu bauen",
    zh: "仪表盘与工具小部件（VueUiDashboard、VueUiKpi、手风琴、计时器、加载器等），可构建完整 BI 面板而无需混用多个 UI 套件",
    jp: "ダッシュボードとユーティリティウィジェット（VueUiDashboard、VueUiKpi、アコーディオン、タイマー、ローダーなど）を使って、複数のUIキットを混在させずに完全なBIパネルを構築可能",
    es: "Widgets de panel y utilidades (VueUiDashboard, VueUiKpi, acordeones, temporizadores, cargadores…) para crear paneles BI completos sin mezclar múltiples kits de UI",
    ko: "여러 UI 키트를 혼용하지 않고도 완전한 BI 패널을 만들 수 있는 대시보드 및 유틸리티 위젯 (VueUiDashboard, VueUiKpi, 아코디언, 타이머, 로더 등)",
    ar: "عناصر واجهة (Widgets) للوحة التحكم والأدوات (VueUiDashboard، VueUiKpi، قوائم مطوية، مؤقتات، محملات...) لبناء لوحات BI كاملة دون الحاجة لاستخدام عدة حزم UI مختلفة",
  },
]
})

const advantagesTitle = ref({
  "en": "Vue Data UI advantages",
  "fr": "Avantages de Vue Data UI",
  "pt": "Vantagens do Vue Data UI",
  "de": "Vorteile von Vue Data UI",
  "zh": "Vue Data UI 的优势",
  "jp": "Vue Data UI の利点",
  "es": "Ventajas de Vue Data UI",
  "ko": "Vue Data UI의 장점",
  "ar": "مميزات Vue Data UI"
})

</script>

<template>
  <div :class="{ vdui: isDarkMode, 'pointer-events-none': true }" />
  <div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 sm:w-1/2 mx-auto">
    <h1 class="text-[64px] sm:text-[96px] text-center">
      {{ translations.menu.about[store.lang] }}
    </h1>

    <div class="w-full max-w-[500px] max-h-[500px] mx-auto p-4">
      <Suspense>
        <template #default>
          <AboutComponentTypes />
        </template>
        <template #fallback>
          <BaseSpinner/>
        </template>
      </Suspense>
    </div>

    <div class="w-full mb-3 overflow-x-auto">
      <table class="w-full border-separate border-spacing-y-2 text-sm text-gray-800 dark:text-gray-200">
        <tbody>
          <tr v-for="adv in advantages" :key="adv[store.lang]" class="bg-white dark:bg-[#FFFFFF10] shadow-sm rounded-md">
            <td class="px-4 py-3 rounded-md flex flex-row place-items-center gap-4">
              <div class="w-[40px]">
                <CheckIcon class="text-app-green"/>
              </div>
              {{ adv[store.lang] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="mt-12 mb-3" dir="auto">
      {{ translations.about.p1[store.lang] }}
    </p>
    <p class="my-3" dir="auto">
      {{ translations.about.p2[store.lang] }}
    </p>
    

    <p class="my-3" dir="auto">
      {{ translations.about.p3[store.lang] }}
      <span class="text-black font-bold dark:text-app-green hover:underline"><router-link
          to="/docs#vue-ui-chestnut">VueUiChestnut</router-link></span>,
      <span class="text-black font-bold dark:text-app-green hover:underline"><router-link
          to="/docs#vue-ui-quadrant">VueUiQuadrant</router-link></span>,
      <span class="text-black font-bold dark:text-app-green hover:underline"><router-link
          to="/docs#vue-ui-table">VueUiTable</router-link></span>.
    </p>

    <div v-if="isDarkMode" class="w-full grid grid-cols-3 gap-6 mt-12 mx-auto max-w-[500px]">
      <div v-for="skeleton in skeletonsDarkMode.slice(0, 3)" class="max-w-1/3">
        <VueUiSkeleton :config="skeleton" />
      </div>
    </div>
    <div v-else class="w-full grid grid-cols-3 gap-6 mt-12 mx-auto max-w-[500px]">
      <div v-for="skeleton in skeletons.slice(0, 3)" class="max-w-1/3">
        <VueUiSkeleton :config="skeleton" />
      </div>
    </div>

    <a href="https://github.com/graphieros/vue-data-ui/graphs/contributors" target="_blank" v-if="contributors"
      class="w-full mt-12 flex flex-row gap-4 place-items-center justify-center">
      <div
        class="mx-auto flex flex-row gap-4 p-4 bg-gray-200 shadow-md dark:bg-[#FFFFFF10] place-items-center rounded-md">
        <div class="h-[40px]">
          <VueUiDigits :dataset="contributors.length" :config="{
            backgroundColor: 'transparent',
            digits: {
              color: isDarkMode ? '#42d392' : '#1A1A1A',
              skeletonColor: isDarkMode ? '#3A3A3A' : '#e1e5e8',
            },
          }" />
        </div>
        {{ translations.about.contributors[store.lang] }}
      </div>
    </a>

    <div class="text-center w-full text-app-blue font-satoshi-bold text-2xl mt-12">
      {{ translations.about.maintainers[store.lang] }}
    </div>
    <div class="w-full mt-12 flex place-items-center place-content-center">
      <div class="flex gap-6 flex-col md:flex-row place-items-center place-content-center">
        <img src="../assets/alec_lloyd_probert.png" class="h-[200px] rounded" alt="A picture of Alec Lloyd Probert" />
        <p dir="auto">
          {{ translations.about.alp[store.lang] }}<br /><br />
          <a class="text-app-blue hover:underline" href="https://github.com/graphieros" target="_blank">GitHub</a>
        </p>
      </div>
    </div>

    <SatisfactionStats />

    <div v-if="isDarkMode" class="w-full grid grid-cols-3 gap-6 mt-12 mx-auto max-w-[500px] mb-12">
      <div v-for="skeleton in skeletonsDarkMode.slice(3, skeletons.length)" class="max-w-1/3">
        <VueUiSkeleton :config="skeleton" />
      </div>
    </div>
    <div v-else class="w-full grid grid-cols-3 gap-6 mt-12 mx-auto max-w-[500px] mb-12">
      <div v-for="skeleton in skeletons.slice(3, skeletons.length)" class="max-w-1/3">
        <VueUiSkeleton :config="skeleton" />
      </div>
    </div>
  </div>
</template>
