<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import BasePopoverButton from "../BasePopoverButton.vue";
import { useMainStore } from "../../stores";
import { UserIcon, EyeIcon, UserPlusIcon } from "vue-tabler-icons";
import BaseButtonSparkline from "../BaseButtonSparkline.vue";
import BaseButtonSparklineFree from "../BaseButtonSparklineFree.vue";
import LinkedSparklines from "./LinkedSparklines.vue";
import KpiTable from "./KpiTable.vue";
import RegionExplorer from "./RegionExplorer.vue";
import { additionalComponentIdeas } from "./additionalComponentIdeas";

const store = useMainStore();
const route = useRoute();
const isDarkMode = computed(() => store.isDarkMode);

const ideaDefinitions = [
    { id: "idea-button-sparkline" },
    { id: "idea-chart-popover" },
    { id: "idea-linked-sparklines" },
    { id: "idea-sparklines-waffle" },
    { id: "idea-sparklines-donut" },
    { id: "idea-kpi-table" },
    ...additionalComponentIdeas.map((idea) => ({
        ...idea,
        component: RegionExplorer,
    })),
];

const summaryTitles = {
    en: [
        "KPI buttons with sparklines",
        "Chart button with a popover",
        "Linked sparklines",
        "Sparklines with a waffle chart",
        "Sparklines with a donut chart",
        "KPI table with gauges",
    ],
    fr: [
        "Boutons KPI avec mini-graphes",
        "Bouton graphique avec popover",
        "Mini-graphes liés",
        "Mini-graphes et graphique en mosaïque",
        "Mini-graphes et graphique en anneau",
        "Tableau de KPI avec jauges",
    ],
    pt: [
        "Botões de KPI com minigráficos",
        "Botão de gráfico com popover",
        "Minigráficos vinculados",
        "Minigráficos com gráfico waffle",
        "Minigráficos com gráfico de rosca",
        "Tabela de KPIs com medidores",
    ],
    de: [
        "KPI-Schaltflächen mit Sparklines",
        "Diagrammschaltfläche mit Popover",
        "Verknüpfte Sparklines",
        "Sparklines mit Waffeldiagramm",
        "Sparklines mit Ringdiagramm",
        "KPI-Tabelle mit Messanzeigen",
    ],
    zh: [
        "带迷你折线图的 KPI 按钮",
        "带弹出框的图表按钮",
        "联动迷你折线图",
        "迷你折线图与华夫图",
        "迷你折线图与环形图",
        "带仪表的 KPI 表格",
    ],
    ja: [
        "ミニ折れ線グラフ付き KPI ボタン",
        "ポップオーバー付きチャートボタン",
        "連動するミニ折れ線グラフ",
        "ミニ折れ線グラフとワッフルチャート",
        "ミニ折れ線グラフとドーナツチャート",
        "ゲージ付き KPI テーブル",
    ],
    es: [
        "Botones de KPI con minigráficos",
        "Botón de gráfico con popover",
        "Minigráficos vinculados",
        "Minigráficos con gráfico waffle",
        "Minigráficos con gráfico de anillos",
        "Tabla de KPI con indicadores",
    ],
    ko: [
        "미니 차트가 있는 KPI 버튼",
        "팝오버가 있는 차트 버튼",
        "연동 미니 선 차트",
        "미니 선 차트와 와플 차트",
        "미니 선 차트와 도넛 차트",
        "게이지가 있는 KPI 테이블",
    ],
    ar: [
        "أزرار مؤشرات أداء مع مخططات مصغرة",
        "زر مخطط مع نافذة منبثقة",
        "مخططات خطية مصغرة مترابطة",
        "مخططات مصغرة مع مخطط وافل",
        "مخططات مصغرة مع مخطط دونات",
        "جدول مؤشرات أداء مع مقاييس",
    ],
};

const ideas = computed(() => {
    const titles = summaryTitles[store.lang] || summaryTitles.en;
    return ideaDefinitions.map((idea, index) => ({
        ...idea,
        number: idea.number || index + 1,
        title: titles[index] || idea.title[store.lang] || idea.title.en,
    }));
});

async function scrollToIdea(id) {
    if (!ideaDefinitions.some((idea) => idea.id === id)) return;
    await nextTick();
    const heading = document.getElementById(id);
    if (!heading) return;
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        block: "start",
    });
}

watch(() => route.query.idea, scrollToIdea, { immediate: true, flush: "post" });

const translations = computed(() => {
    return {
        summary: {
            en: "Explore the component ideas",
            fr: "Explorer les idées de composants",
            pt: "Explore as ideias de componentes",
            de: "Komponentenideen entdecken",
            zh: "探索组件创意",
            ja: "コンポーネントのアイデアを見る",
            es: "Explora las ideas de componentes",
            ko: "컴포넌트 아이디어 살펴보기",
            ar: "استكشف أفكار المكونات",
        },
        ideas: {
            en: "This section is designed to provide ideas on how to use components out of the box, or compose them in an original fashion.",
            fr: "Cette section est conçue pour fournir des idées sur la façon d'utiliser les composants tels quels ou de les composer de manière originale.",
            pt: "Esta seção foi criada para fornecer ideias sobre como usar os componentes prontos ou compô-los de forma original.",
            de: "Dieser Abschnitt soll Ideen geben, wie Komponenten sofort einsatzbereit verwendet oder auf originelle Weise kombiniert werden können.",
            zh: "本节旨在提供如何直接使用组件或以原创方式组合它们的灵感。",
            ja: "このセクションは、コンポーネントをそのまま使用する方法や、独自の方法で組み合わせるアイデアを提供することを目的としています。",
            es: "Esta sección está diseñada para proporcionar ideas sobre cómo usar componentes listos para usar o componerlos de manera original.",
            ko: "이 섹션은 구성 요소를 바로 사용하거나 독창적인 방식으로 구성하는 방법에 대한 아이디어를 제공하도록 설계되었습니다.",
            ar: "تم تصميم هذا القسم لتقديم أفكار حول كيفية استخدام المكونات مباشرة أو تركيبها بطريقة أصلية.",
        },
        buttonSparkline: {
            en: "This component consists of a button, displaying a KPI, that when clicked, shows a sparkline chart inside a popover.",
            fr: "Ce composant se compose d'un bouton affichant un KPI, qui lorsqu'il est cliqué, affiche un graphique sparkline dans une popover.",
            pt: "Este componente consiste em um botão, exibindo um KPI, que ao ser clicado, mostra um gráfico sparkline dentro de um popover.",
            de: "Diese Komponente besteht aus einer Schaltfläche, die eine KPI anzeigt und beim Klicken ein Sparkline-Diagramm in einem Popover anzeigt.",
            zh: "该组件由一个按钮组成，显示一个KPI，点击后会在弹出框中显示一个折线图。",
            ja: "このコンポーネントは、KPIを表示するボタンで構成され、クリックするとポップオーバー内にスパークラインチャートが表示されます。",
            es: "Este componente consiste en un botón que muestra un KPI y, al hacer clic, muestra un gráfico sparkline dentro de un popover.",
            ko: "이 구성 요소는 KPI를 표시하는 버튼으로 구성되며, 클릭하면 팝오버 안에 스파크라인 차트를 표시합니다.",
            ar: "يتكون هذا المكون من زر يعرض مؤشر KPI، وعند النقر عليه، يعرض مخطط شرارة داخل نافذة منبثقة.",
        },
        buttonSparklineOnion: {
            en: "This component consists of a large button; displaying a chart, that when clicked, shows a series of sparklines inside a popover",
            fr: "Ce composant se compose d'un grand bouton affichant un graphique qui, lorsqu'il est cliqué, affiche une série de mini-graphes dans une infobulle",
            pt: "Este componente consiste em um botão grande exibindo um gráfico que, ao ser clicado, mostra uma série de mini-gráficos em um popover",
            de: "Dieses Element besteht aus einer großen Schaltfläche, die ein Diagramm anzeigt und bei Klick eine Reihe von Sparklines in einem Popover zeigt",
            zh: "该组件由一个大型按钮组成，显示一个图表，点击后会在弹出框中显示一系列微型图表",
            ja: "このコンポーネントは、大きなボタンで構成されており、チャートを表示し、クリックするとポップオーバー内に一連のスパークラインが表示されます",
            es: "Este componente consta de un botón grande que muestra un gráfico y, al hacer clic, muestra una serie de gráficos en un popover",
            ko: "이 구성 요소는 차트를 표시하는 큰 버튼으로 구성되어 있으며 클릭하면 팝오버 안에 일련의 스파크라인이 표시됩니다",
            ar: "يتكون هذا المكون من زر كبير يعرض مخططًا وعند النقر عليه يعرض سلسلة من الرسومات الصغيرة داخل نافذة منبثقة",
        },
        linkedSparklines: {
            en: "This component consists of a series of sparklines, linked by the current selected index on mouseover",
            fr: "Ce composant se compose d'une série de mini-graphes, reliés par l'index sélectionné actuel lors du survol de la souris",
            pt: "Este componente consiste em uma série de mini-gráficos, ligados pelo índice selecionado atual ao passar o mouse",
            de: "Dieses Element besteht aus einer Reihe von Sparklines, die durch den aktuell ausgewählten Index bei Mausüberfahrt verbunden sind",
            zh: "该组件由一系列微型图表组成，通过鼠标悬停时的当前选定索引进行链接",
            ja: "このコンポーネントは、一連のスパークラインで構成されており、マウスオーバー時に現在選択されているインデックスによってリンクされています",
            es: "Este componente consta de una serie de gráficos, vinculados por el índice seleccionado actual al pasar el ratón",
            ko: "이 구성 요소는 일련의 스파크라인으로 구성되며, 마우스오버 시 현재 선택된 인덱스에 의해 연결됩니다",
            ar: "يتكون هذا المكون من سلسلة من الرسوم البيانية الصغيرة المرتبطة بالمؤشر المحدد حاليًا عند تحريك الماوس فوقها",
        },
        linkedSparklinesWithWaffle: {
            en: "This component consists of a series of sparklines, linked by the current selected index on mouseover, with a waffle chart showing the breakdown of all series at the selected index.",
            fr: "Ce composant se compose d'une série de mini-graphes, reliés par l'index sélectionné actuel lors du survol de la souris, avec un graphique en mosaïque affichant la répartition de toutes les séries à l'index sélectionné.",
            pt: "Este componente consiste em uma série de mini-gráficos, ligados pelo índice selecionado atual ao passar o mouse, com um gráfico de waffle mostrando a distribuição de todas as séries no índice selecionado.",
            de: "Dieses Element besteht aus einer Reihe von Sparklines, die durch den aktuell ausgewählten Index bei Mausüberfahrt verbunden sind, mit einem Waffeldiagramm, das die Aufschlüsselung aller Serien am ausgewählten Index zeigt.",
            zh: "该组件由一系列微型图表组成，通过鼠标悬停时的当前选定索引进行链接，并包含一个华夫图表显示所选索引处所有系列的细分。",
            ja: "このコンポーネントは、一連のスパークラインで構成されており、マウスオーバー時に現在選択されているインデックスによってリンクされ、選択されたインデックスで全シリーズの内訳を示すワッフルチャートが表示されます。",
            es: "Este componente consta de una serie de gráficos, vinculados por el índice seleccionado actual al pasar el ratón, con un gráfico de waffle que muestra la descomposición de todas las series en el índice seleccionado.",
            ko: "이 구성 요소는 일련의 스파크라인으로 구성되며, 마우스오버 시 현재 선택된 인덱스에 의해 연결되고, 선택된 인덱스에서 모든 시리즈의 분포를 보여주는 와플 차트를 포함합니다.",
            ar: "يتكون هذا المكون من سلسلة من الرسوم البيانية الصغيرة المرتبطة بالمؤشر المحدد حاليًا عند تحريك الماوس فوقها، مع رسم بياني من نوع وافل يوضح توزيع جميع السلاسل عند المؤشر المحدد.",
        },
        linkedSparklinesWithDonut: {
            en: "This component consists of a series of sparklines, linked by the current selected index on mouseover, with a donut chart showing the breakdown of all series at the selected index.",
            fr: "Ce composant se compose d'une série de mini-graphes, reliés par l'index sélectionné actuel lors du survol de la souris, avec un diagramme en anneau affichant la répartition de toutes les séries à l'index sélectionné.",
            pt: "Este componente consiste em uma série de mini-gráficos, ligados pelo índice selecionado atual ao passar o mouse, com um gráfico de rosquinha mostrando a distribuição de todas as séries no índice selecionado.",
            de: "Dieses Element besteht aus einer Reihe von Sparklines, die durch den aktuell ausgewählten Index bei Mausüberfahrt verbunden sind, mit einem Donut-Diagramm, das die Aufschlüsselung aller Serien am ausgewählten Index zeigt.",
            zh: "该组件由一系列微型图表组成，通过鼠标悬停时的当前选定索引进行链接，并包含一个环形图显示所选索引处所有系列的细分。",
            ja: "このコンポーネントは、一連のスパークラインで構成されており、マウスオーバー時に現在選択されているインデックスによってリンクされ、選択されたインデックスで全シリーズの内訳を示すドーナツチャートが表示されます。",
            es: "Este componente consta de una serie de gráficos, vinculados por el índice seleccionado actual al pasar el ratón, con un gráfico de dona que muestra la descomposición de todas las series en el índice seleccionado.",
            ko: "이 구성 요소는 일련의 스파크라인으로 구성되며, 마우스오버 시 현재 선택된 인덱스에 의해 연결되고, 선택된 인덱스에서 모든 시리즈의 분포를 보여주는 도넛 차트를 포함합니다.",
            ar: "يتكون هذا المكون من سلسلة من الرسوم البيانية الصغيرة المرتبطة بالمؤشر المحدد حاليًا عند تحريك الماوس فوقها، مع رسم بياني دائري يوضح توزيع جميع السلاسل عند المؤشر المحدد.",
        },
        kpiTable: {
            en: "A KPI table with a VueUiGizmo gauge in each row to show progress toward a target.",
            fr: "Un tableau de KPI avec une jauge VueUiGizmo dans chaque ligne pour afficher la progression vers un objectif.",
            pt: "Uma tabela de KPIs com um medidor VueUiGizmo em cada linha para mostrar o progresso em relação à meta.",
            de: "Eine KPI-Tabelle mit einer VueUiGizmo-Anzeige in jeder Zeile, die den Fortschritt zum Ziel zeigt.",
            zh: "一个 KPI 表格，每行使用 VueUiGizmo 仪表展示目标达成进度。",
            ja: "各行の VueUiGizmo ゲージで目標達成状況を示す KPI テーブルです。",
            es: "Una tabla de KPI con un indicador VueUiGizmo en cada fila para mostrar el progreso hacia un objetivo.",
            ko: "각 행의 VueUiGizmo 게이지로 목표 달성 현황을 보여주는 KPI 테이블입니다.",
            ar: "جدول مؤشرات أداء يتضمن مقياس VueUiGizmo في كل صف لعرض التقدم نحو الهدف.",
        },
        seeHowItsMade: {
            en: "See how it is made",
            fr: "Découvrez comment c'est fait",
            pt: "Veja como é feito",
            de: "Sehen Sie, wie es gemacht wird",
            zh: "看看它是如何制作的",
            ja: "作り方を見てみましょう",
            es: "Mira cómo está hecho",
            ko: "어떻게 만들어졌는지 확인하세요",
            ar: "شاهد كيف تم صنعه",
        },
    };
});

const sparklineConfigUsers = computed(() => {
    return {
        theme: "",
        responsive: false,
        type: "line",
        downsample: { threshold: 500 },
        style: {
            scaleMax: 1000,
            chartWidth: 290,
            animation: { show: true, animationFrames: 360 },
            fontFamily: "inherit",
            backgroundColor: "transparent",
            line: { color: "#5f8bee", strokeWidth: 1, smooth: true },
            bar: { borderRadius: 3, color: "#5f8bee" },
            zeroLine: { color: "#2D353C", strokeWidth: 1 },
            plot: { show: true, radius: 8, stroke: "#FFFFFF", strokeWidth: 1 },
            verticalIndicator: {
                show: true,
                strokeWidth: 1.5,
                color: isDarkMode.value ? "#FFFFFF" : "#5f8bee",
                strokeDasharray: 0,
            },
            dataLabel: {
                show: false,
            },
            title: {
                show: false,
            },
            area: {
                show: true,
                useGradient: true,
                opacity: 30,
                color: "#5f8bee",
            },
        },
    };
});

const sparklineDatasetUsers = computed(() => {
    const arr = [];

    for (let i = 0; i < 31; i += 1) {
        arr.push({
            period: `${i + 1 < 10 ? "0" : ""}${i + 1}-01-2026`,
            value: Math.round(Math.random() * 1000),
        });
    }

    return arr;
});
const sparklineConfigViewers = computed(() => {
    return {
        theme: "",
        responsive: false,
        type: "line",
        downsample: { threshold: 500 },
        style: {
            scaleMax: 750,
            chartWidth: 290,
            animation: { show: true, animationFrames: 360 },
            fontFamily: "inherit",
            backgroundColor: "transparent",
            line: { color: "#ff6600", strokeWidth: 1, smooth: true },
            bar: { borderRadius: 3, color: "#ff6600" },
            zeroLine: { color: "#2D353C", strokeWidth: 1 },
            plot: { show: true, radius: 8, stroke: "#FFFFFF", strokeWidth: 1 },
            verticalIndicator: {
                show: true,
                strokeWidth: 1.5,
                color: isDarkMode.value ? "#FFFFFF" : "#ff6600",
                strokeDasharray: 0,
            },
            dataLabel: {
                show: false,
            },
            title: {
                show: false,
            },
            area: {
                show: false,
                useGradient: true,
                opacity: 30,
                color: "#ff6600",
            },
        },
    };
});

const sparklineDatasetViewers = computed(() => {
    const arr = [];

    for (let i = 0; i < 31; i += 1) {
        arr.push({
            period: `${i + 1 < 10 ? "0" : ""}${i + 1}-01-2026`,
            value: Math.round(Math.random() * 750),
        });
    }

    return arr;
});
const sparklineConfigSubscribers = computed(() => {
    return {
        theme: "",
        responsive: false,
        type: "bar",
        downsample: { threshold: 500 },
        style: {
            scaleMax: 500,
            chartWidth: 290,
            animation: { show: true, animationFrames: 360 },
            fontFamily: "inherit",
            backgroundColor: "transparent",
            line: { color: "#42d392", strokeWidth: 1, smooth: true },
            bar: { borderRadius: 3, color: "#42d392" },
            zeroLine: { color: "#2D353C", strokeWidth: 1 },
            plot: { show: true, radius: 8, stroke: "#FFFFFF", strokeWidth: 1 },
            verticalIndicator: {
                show: true,
                strokeWidth: 1.5,
                color: isDarkMode.value ? "#FFFFFF" : "#42d392",
                strokeDasharray: 0,
            },
            dataLabel: {
                show: false,
            },
            title: {
                show: false,
            },
            area: {
                show: true,
                useGradient: true,
                opacity: 30,
                color: "#42d392",
            },
        },
    };
});

const sparklineDatasetSubscribers = computed(() => {
    const arr = [];

    for (let i = 0; i < 31; i += 1) {
        arr.push({
            period: `${i + 1 < 10 ? "0" : ""}${i + 1}-01-2026`,
            value: Math.round(Math.random() * 500),
        });
    }

    return arr;
});

const onionConfig = computed(() => {
    return {
        responsive: false,
        theme: "",
        customPalette: [],
        useCssAnimation: true,
        useStartAnimation: true,
        useBlurOnHover: false,
        style: {
            fontFamily: "inherit",
            chart: {
                backgroundColor: "transparent",
                color: "#2D353C",
                useGradient: false,
                gradientIntensity: 20,
                layout: {
                    maxThickness: 52,
                    gutter: {
                        color: isDarkMode.value ? "#e1e5e820" : "#1A1A1A15",
                        width: 1,
                    },
                    track: { width: 1 },
                    labels: {
                        show: true,
                        fontSize: 30,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        roundingValue: 0,
                        roundingPercentage: 0,
                        bold: true,
                        offsetX: 0,
                        offsetY: 0,
                        value: { show: false, formatter: null },
                        percentage: { show: false },
                    },
                },
                title: {
                    text: "",
                },
                legend: {
                    show: false,
                },
                tooltip: {
                    show: false,
                },
            },
        },
        userOptions: {
            show: false,
        },
    };
});

const onionDataset = ref([
    {
        name: "Users",
        percentage: 80,
        color: "#5f8aee",
    },
    {
        name: "Subscribers",
        percentage: 65,
        color: "#ff6600",
    },
    {
        name: "Viewers",
        percentage: 60,
        color: "#42d392",
    },
]);

const selectedIndex = ref(undefined);

function hoverIndex({ index }) {
    selectedIndex.value = index;
}

const max = computed(() => {
    return Math.max(
        Math.max(...sparklineDatasetUsers.value.map((s) => s.value)),
        Math.max(...sparklineDatasetSubscribers.value.map((s) => s.value)),
        Math.max(...sparklineDatasetViewers.value.map((s) => s.value)),
    );
});
</script>

<template>
    <h1
        class="font-inter-bold mx-auto text-center max-w-[50ch] text-xl border-b border-gray-500 pb-6"
        dir="auto"
    >
        {{ translations.ideas[store.lang] }}
    </h1>

    <nav
        aria-labelledby="ideas-summary-title"
        class="mx-auto max-w-[1000px] p-4 my-6"
        dir="auto"
    >
        <h2 id="ideas-summary-title" class="text-base font-semibold mb-2">
            {{ translations.summary[store.lang] }}
        </h2>
        <ol class="grid gap-x-5 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="idea in ideas" :key="idea.id">
                <RouterLink
                    :to="{
                        query: { ...route.query, idea: idea.id },
                        hash: '#experiments',
                    }"
                    @click.left.exact="
                        route.query.idea === idea.id && scrollToIdea(idea.id)
                    "
                    class="flex h-full items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-[#242424] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-blue"
                >
                    <span
                        aria-hidden="true"
                        class="text-app-blue text-xs tabular-nums w-5 shrink-0"
                        >{{ idea.number }}</span
                    >
                    <span class="flex-1 text-start">{{ idea.title }}</span>
                    <span aria-hidden="true" class="text-app-blue text-xs"
                        >↓</span
                    >
                </RouterLink>
            </li>
        </ol>
    </nav>

    <!-- 1 -->
    <!-- KPI in a button with sparkline in popover -->
    <div class="mx-auto max-w-[1000px] p-4 rounded">
        <div
            class="flex flex-row gap-6 max-w-[50ch] mx-auto place-items-center py-6"
        >
            <div class="text-app-blue text-[52px]">1</div>
            <h2
                id="idea-button-sparkline"
                tabindex="-1"
                class="scroll-mt-8"
                dir="auto"
            >
                {{ translations.buttonSparkline[store.lang] }}
                <a
                    href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/BaseButtonSparkline.vue"
                    target="_blank"
                    class="text-app-blue underline"
                >
                    {{ translations.seeHowItsMade[store.lang] }}
                </a>
            </h2>
        </div>

        <div class="flex flex-row gap-4 flex-wrap justify-center">
            <BaseButtonSparkline
                title="Daily users"
                :buttonClass="`bg-gradient-to-bl from-app-blue-light to-app-blue hover:bg-gradient-to-l text-black transition-all`"
                popoverClass="rounded-b-md py-1 bg-white dark:bg-[#2A2A2A] shadow-md"
                :sparklineDataset="sparklineDatasetUsers"
                :sparklineConfig="sparklineConfigUsers"
                style="z-index: 2"
            >
                <template #icon>
                    <UserIcon class="text-app-blue" />
                </template>
            </BaseButtonSparkline>
            <BaseButtonSparkline
                title="Daily viewers"
                :buttonClass="`bg-gradient-to-bl from-app-orange-light to-app-orange hover:bg-gradient-to-l text-black transition-all`"
                popoverClass="rounded-b-md py-1 bg-white dark:bg-[#2A2A2A] shadow-md"
                :sparklineDataset="sparklineDatasetViewers"
                :sparklineConfig="sparklineConfigViewers"
                style="z-index: 1"
            >
                <template #icon>
                    <EyeIcon class="text-app-orange" />
                </template>
            </BaseButtonSparkline>
            <BaseButtonSparkline
                title="Daily subscribers"
                :buttonClass="`bg-gradient-to-bl from-app-green-light to-app-green hover:bg-gradient-to-l text-black transition-all`"
                popoverClass="rounded-b-md py-1 bg-white dark:bg-[#2A2A2A] shadow-md"
                :sparklineDataset="sparklineDatasetSubscribers"
                :sparklineConfig="sparklineConfigSubscribers"
            >
                <template #icon>
                    <UserPlusIcon class="text-app-green-dark" />
                </template>
            </BaseButtonSparkline>
        </div>
    </div>

    <!-- 2 -->
    <!-- Chart in a button with linked sparklines in popover -->
    <div class="mx-auto max-w-[1000px] p-4 rounded">
        <div
            class="flex flex-row gap-6 max-w-[50ch] mx-auto place-items-center py-6"
        >
            <div class="text-app-blue text-[52px]">2</div>
            <h2
                id="idea-chart-popover"
                tabindex="-1"
                class="scroll-mt-8"
                dir="auto"
            >
                {{ translations.buttonSparklineOnion[store.lang] }}
                <a
                    href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/customization/ComposedComponents.vue"
                    target="_blank"
                    class="text-app-blue underline"
                >
                    {{ translations.seeHowItsMade[store.lang] }}
                </a>
            </h2>
        </div>

        <div dir="ltr" class="flex flex-row gap-4 flex-wrap justify-center">
            <BaseButtonSparklineFree
                :buttonClass="`bg-gradient-to-b from-[#DDDDDD] to-[#EEEEEE] dark:from-[#1A1A1A] dark:to-[#2A2A2A] text-black transition-all`"
                popoverClass="rounded-b-md py-1 bg-[#EEEEEE] dark:bg-[#2A2A2A] shadow-md"
                :sparklineDataset="sparklineDatasetUsers"
                :sparklineConfig="sparklineConfigUsers"
                style="z-index: 1"
            >
                <template #button-content>
                    <div dir="ltr" class="relative w-full h-full">
                        <VueDataUi
                            component="VueUiOnion"
                            :config="onionConfig"
                            :dataset="onionDataset"
                        />
                        <template
                            v-if="![null, undefined].includes(selectedIndex)"
                        >
                            <div
                                class="absolute start-0 top-[150px] flex flex-col w-full"
                            >
                                <span
                                    class="text-[#8A8A8A] text-xs text-center w-full pt-2"
                                    >{{
                                        sparklineDatasetUsers[selectedIndex]
                                            .period
                                    }}</span
                                >
                                <div class="flex flex-row gap-2 justify-center">
                                    <div>
                                        <span class="text-app-blue">{{
                                            sparklineDatasetUsers[selectedIndex]
                                                .value
                                        }}</span>
                                    </div>
                                    <div>
                                        <span class="text-app-orange">{{
                                            sparklineDatasetViewers[
                                                selectedIndex
                                            ].value
                                        }}</span>
                                    </div>
                                    <div>
                                        <span class="text-app-green">{{
                                            sparklineDatasetSubscribers[
                                                selectedIndex
                                            ].value
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>

                <template #popover-content>
                    <VueUiSparkline
                        :config="{
                            ...sparklineConfigUsers,
                            style: {
                                ...sparklineConfigUsers.style,
                                scaleMax: max,
                            },
                        }"
                        :dataset="sparklineDatasetUsers"
                        @hoverIndex="hoverIndex"
                        class="-ms-1"
                        :selectedIndex="selectedIndex"
                    />
                    <VueUiSparkline
                        component="VueUiSparkline"
                        :config="{
                            ...sparklineConfigViewers,
                            type: 'line',
                            style: {
                                ...sparklineConfigViewers.style,
                                scaleMax: max,
                                area: {
                                    ...sparklineConfigViewers.style.area,
                                    show: true,
                                },
                            },
                        }"
                        :dataset="sparklineDatasetViewers"
                        @hoverIndex="hoverIndex"
                        class="-ms-1"
                        :selectedIndex="selectedIndex"
                    />
                    <VueUiSparkline
                        :config="{
                            ...sparklineConfigSubscribers,
                            type: 'line',
                            style: {
                                ...sparklineConfigSubscribers.style,
                                scaleMax: max,
                            },
                        }"
                        :dataset="sparklineDatasetSubscribers"
                        @hoverIndex="hoverIndex"
                        class="-ms-1"
                        :selectedIndex="selectedIndex"
                    />
                </template>
            </BaseButtonSparklineFree>
        </div>
    </div>

    <!-- 3 -->
    <!-- Linked sparklines -->
    <div class="mx-auto max-w-[1000px] p-4 rounded">
        <div
            class="flex flex-row gap-6 max-w-[50ch] mx-auto place-items-center py-6"
        >
            <div class="text-app-blue text-[52px]">3</div>
            <h2
                id="idea-linked-sparklines"
                tabindex="-1"
                class="scroll-mt-8"
                dir="auto"
            >
                {{ translations.linkedSparklines[store.lang] }}
                <a
                    href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/customization/LinkedSparklines.vue"
                    target="_blank"
                    class="text-app-blue underline"
                >
                    {{ translations.seeHowItsMade[store.lang] }}
                </a>
            </h2>
        </div>

        <div class="">
            <LinkedSparklines />
        </div>
    </div>

    <!-- 4 -->
    <!-- Linked sparklines with waffle -->
    <div class="mx-auto max-w-[1000px] p-4 rounded">
        <div
            class="flex flex-row gap-6 max-w-[50ch] mx-auto place-items-center py-6"
        >
            <div class="text-app-blue text-[52px]">4</div>
            <h2
                id="idea-sparklines-waffle"
                tabindex="-1"
                class="scroll-mt-8"
                dir="auto"
            >
                {{ translations.linkedSparklinesWithWaffle[store.lang] }}
                <a
                    href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/customization/LinkedSparklines.vue"
                    target="_blank"
                    class="text-app-blue underline"
                >
                    {{ translations.seeHowItsMade[store.lang] }}
                </a>
            </h2>
        </div>

        <div class="">
            <LinkedSparklines waffle />
        </div>
    </div>

    <!-- 5 -->
    <!-- Linked sparklines with donut -->
    <div class="mx-auto max-w-[1000px] p-4 rounded">
        <div
            class="flex flex-row gap-6 max-w-[50ch] mx-auto place-items-center py-6"
        >
            <div class="text-app-blue text-[52px]">5</div>
            <h2
                id="idea-sparklines-donut"
                tabindex="-1"
                class="scroll-mt-8"
                dir="auto"
            >
                {{ translations.linkedSparklinesWithDonut[store.lang] }}
                <a
                    href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/customization/LinkedSparklines.vue"
                    target="_blank"
                    class="text-app-blue underline"
                >
                    {{ translations.seeHowItsMade[store.lang] }}
                </a>
            </h2>
        </div>

        <div class="">
            <LinkedSparklines donut />
        </div>
    </div>

    <!-- 6 -->
    <!-- KPI table with gauges -->
    <div class="mx-auto max-w-[1000px] p-4 rounded">
        <div
            class="flex flex-row gap-6 max-w-[50ch] mx-auto place-items-center py-6"
        >
            <div class="text-app-blue text-[52px]">6</div>
            <h2
                id="idea-kpi-table"
                tabindex="-1"
                class="scroll-mt-8"
                dir="auto"
            >
                {{ translations.kpiTable[store.lang] }}
                <a
                    href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/customization/KpiTable.vue"
                    target="_blank"
                    class="text-app-blue underline"
                >
                    {{ translations.seeHowItsMade[store.lang] }}
                </a>
            </h2>
        </div>
        <KpiTable />
    </div>
    <section
        v-for="idea in ideas.slice(6)"
        :key="idea.id"
        class="mx-auto max-w-[1000px] p-4 rounded"
    >
        <div class="flex gap-6 items-start py-6">
            <div
                class="text-app-blue text-[52px] leading-none"
                aria-hidden="true"
            >
                {{ idea.number }}
            </div>
            <div class="min-w-0">
                <h2
                    :id="idea.id"
                    tabindex="-1"
                    class="scroll-mt-8 text-xl font-semibold"
                    dir="auto"
                >
                    {{ idea.title }}
                </h2>
                <p class="mt-2 max-w-[70ch]" dir="auto">
                    {{ idea.description[store.lang] || idea.description.en }}
                </p>
                <a
                    :href="`https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/customization/${idea.file}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block mt-2 text-app-blue underline"
                    >{{ translations.seeHowItsMade[store.lang] }}</a
                >
            </div>
        </div>
        <component :is="idea.component" />
    </section>
</template>
