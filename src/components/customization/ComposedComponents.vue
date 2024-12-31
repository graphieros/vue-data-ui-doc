<script setup>
import { ref, computed, onMounted } from "vue";
import BasePopoverButton from "../BasePopoverButton.vue";
import { useMainStore } from "../../stores";
import { UserIcon, EyeIcon, UserPlusIcon } from "vue-tabler-icons";
import BaseButtonSparkline from "../BaseButtonSparkline.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
    return {
        ideas: {
            en: "This section is designed to provide ideas on how to use components out of the box, or compose them in an original fashion.",
            fr: "Cette section est conçue pour fournir des idées sur la façon d'utiliser les composants tels quels ou de les composer de manière originale.",
            pt: "Esta seção foi criada para fornecer ideias sobre como usar os componentes prontos ou compô-los de forma original.",
            de: "Dieser Abschnitt soll Ideen geben, wie Komponenten sofort einsatzbereit verwendet oder auf originelle Weise kombiniert werden können.",
            zh: "本节旨在提供如何直接使用组件或以原创方式组合它们的灵感。",
            jp: "このセクションは、コンポーネントをそのまま使用する方法や、独自の方法で組み合わせるアイデアを提供することを目的としています。",
            es: "Esta sección está diseñada para proporcionar ideas sobre cómo usar componentes listos para usar o componerlos de manera original.",
            ko: "이 섹션은 구성 요소를 바로 사용하거나 독창적인 방식으로 구성하는 방법에 대한 아이디어를 제공하도록 설계되었습니다.",
            ar: "تم تصميم هذا القسم لتقديم أفكار حول كيفية استخدام المكونات مباشرة أو تركيبها بطريقة أصلية."
        },
        buttonSparkline: {
            en: "This component consists of a button, displaying a KPI, that when clicked, shows a sparkline chart inside a popover.",
            fr: "Ce composant se compose d'un bouton affichant un KPI, qui lorsqu'il est cliqué, affiche un graphique sparkline dans une popover.",
            pt: "Este componente consiste em um botão, exibindo um KPI, que ao ser clicado, mostra um gráfico sparkline dentro de um popover.",
            de: "Diese Komponente besteht aus einer Schaltfläche, die eine KPI anzeigt und beim Klicken ein Sparkline-Diagramm in einem Popover anzeigt.",
            zh: "该组件由一个按钮组成，显示一个KPI，点击后会在弹出框中显示一个折线图。",
            jp: "このコンポーネントは、KPIを表示するボタンで構成され、クリックするとポップオーバー内にスパークラインチャートが表示されます。",
            es: "Este componente consiste en un botón que muestra un KPI y, al hacer clic, muestra un gráfico sparkline dentro de un popover.",
            ko: "이 구성 요소는 KPI를 표시하는 버튼으로 구성되며, 클릭하면 팝오버 안에 스파크라인 차트를 표시합니다.",
            ar: "يتكون هذا المكون من زر يعرض مؤشر KPI، وعند النقر عليه، يعرض مخطط شرارة داخل نافذة منبثقة."
        },
        seeHowItsMade: {
            en: "See how it is made",
            fr: "Découvrez comment c'est fait",
            pt: "Veja como é feito",
            de: "Sehen Sie, wie es gemacht wird",
            zh: "看看它是如何制作的",
            jp: "作り方を見てみましょう",
            es: "Mira cómo está hecho",
            ko: "어떻게 만들어졌는지 확인하세요",
            ar: "شاهد كيف تم صنعه"
        }
    }
})

const sparklineConfigUsers = computed(() => {
    return {
        theme: "",
        responsive: false,
        type: "line",
        downsample: { threshold: 500 },
        style: {
            chartWidth: 290,
            animation: { show: true, animationFrames: 360 },
            fontFamily: "inherit",
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            line: { color: "#5f8bee", strokeWidth: 3, smooth: true },
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
                show: false
            },
            title: {
                show: false,
            },
            area: { show: true, useGradient: true, opacity: 30, color: "#5f8bee" },
        },
    };
});

const sparklineDatasetUsers = computed(() => {
    const arr = [];

    for (let i = 0; i < 31; i += 1) {
        arr.push({
            period: `${i + 1 < 10 ? '0' : ''}${i + 1}-01-2026`,
            value: Math.round(Math.random() * 1000)
        })
    }

    return arr;
})
const sparklineConfigViewers = computed(() => {
    return {
        theme: "",
        responsive: false,
        type: "line",
        downsample: { threshold: 500 },
        style: {
            chartWidth: 290,
            animation: { show: true, animationFrames: 360 },
            fontFamily: "inherit",
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            line: { color: "#ff6600", strokeWidth: 3, smooth: true },
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
                show: false
            },
            title: {
                show: false,
            },
            area: { show: false, useGradient: true, opacity: 30, color: "#ff6600" },
        },
    };
});

const sparklineDatasetViewers = computed(() => {
    const arr = [];

    for (let i = 0; i < 31; i += 1) {
        arr.push({
            period: `${i + 1 < 10 ? '0' : ''}${i + 1}-01-2026`,
            value: Math.round(Math.random() * 1000)
        })
    }

    return arr;
})
const sparklineConfigSubscribers = computed(() => {
    return {
        theme: "",
        responsive: false,
        type: "bar",
        downsample: { threshold: 500 },
        style: {
            chartWidth: 290,
            animation: { show: true, animationFrames: 360 },
            fontFamily: "inherit",
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            line: { color: "#42d392", strokeWidth: 3, smooth: true },
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
                show: false
            },
            title: {
                show: false,
            },
            area: { show: true, useGradient: true, opacity: 30, color: "#42d392" },
        },
    };
});

const sparklineDatasetSubscribers = computed(() => {
    const arr = [];

    for (let i = 0; i < 31; i += 1) {
        arr.push({
            period: `${i + 1 < 10 ? '0' : ''}${i + 1}-01-2026`,
            value: Math.round(Math.random() * 100)
        })
    }

    return arr;
});

</script>

<template>
    <h1 class="mx-auto text-center max-w-[50ch] text-xl border-b border-gray-500 pb-6" dir="auto">
        {{ translations.ideas[store.lang] }}
    </h1>
    <div class="mx-auto max-w-[1000px] p-4 rounded pt-6 pb-12">
        <h2 class="mb-6 text-center max-w-[50ch] mx-auto" dir="auto">
            {{ translations.buttonSparkline[store.lang] }}
            <a href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/BaseButtonSparkline.vue" target="_blank" class="text-app-blue underline">
            {{ translations.seeHowItsMade[store.lang] }}
        </a>
        </h2>
        <div class="flex flex-row gap-4 flex-wrap justify-center">
            <BaseButtonSparkline
                title="Daily users"
                :buttonClass="`bg-gradient-to-bl from-app-blue-light to-app-blue hover:bg-gradient-to-l text-black transition-all`"
                popoverClass="rounded-b-md py-1 bg-white dark:bg-[#2A2A2A] shadow-md"
                :sparklineDataset="sparklineDatasetUsers"
                :sparklineConfig="sparklineConfigUsers"
                class="z-20"
            >
                <template #icon>
                    <UserIcon class="text-app-blue"/>
                </template>
            </BaseButtonSparkline>
            <BaseButtonSparkline
                title="Daily viewers"
                :buttonClass="`bg-gradient-to-bl from-app-orange-light to-app-orange hover:bg-gradient-to-l text-black transition-all`"
                popoverClass="rounded-b-md py-1 bg-white dark:bg-[#2A2A2A] shadow-md"
                :sparklineDataset="sparklineDatasetViewers"
                :sparklineConfig="sparklineConfigViewers"
                class="z-10"
            >
                <template #icon>
                    <EyeIcon class="text-app-orange"/>
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
                    <UserPlusIcon class="text-app-green-dark"/>
                </template>
            </BaseButtonSparkline>
        </div>
    </div>
</template>
