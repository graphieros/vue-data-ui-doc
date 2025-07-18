<script setup lang="ts">
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import Schema from "../schema/Schema.vue";
import BaseTabsMenu from "./BaseTabsMenu.vue";
import BaseSignInfo from "./BaseSignInfo.vue";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);

const emit = defineEmits(["onResponsiveTab", "onNonResponsiveTab"]);

type BoxProps = {
    showEmits?: boolean;
    showSlots?: boolean;
    showTooltip?: boolean;
    showUseCases?: boolean;
    showThemes?: boolean;
    showResponsive?: boolean;
    showPatterns?: boolean;
    showCssOverride?: boolean;
    activeTab?: number;
    schema?: string;
    hideSchemaDisclaimer?: boolean;
    signInfo?: string;
    showDatetimeFormatter?: string;
};

const props = withDefaults(defineProps<BoxProps>(), {
    showEmits: false,
    showSlots: false,
    showtooltip: false,
    showUseCases: false,
    showThemes: false,
    showResponsive: false,
    showPatterns: false,
    showCssOverride: false,
    activeTab: 0,
    schema: "",
    hideSchemaDisclaimer: false,
    signInfo: '',
    showDatetimeFormatter: false,
});

const activeTab = ref(props.activeTab);

const config = ref({
    open: false,
    maxHeight: 10000,
    head: {
        useArrowSlot: false,
        backgroundColor: "transparent",
        color: "#2D353C",
        iconColor: "#5f8bee",
        padding: "12px 6px",
    },
    body: {
        backgroundColor: "transparent",
        color: "#2D353C",
    },
});

const darkModeConfig = ref({
    open: false,
    maxHeight: 10000,
    head: {
        useArrowSlot: false,
        backgroundColor: "transparent",
        color: "#CCCCCC",
        iconColor: "#5f8bee",
        padding: "12px 6px",
    },
    body: {
        backgroundColor: "transparent",
        color: "#CCCCCC",
    },
});

function setResponsiveTab() {
    activeTab.value = 7;
    emit("onResponsiveTab");
}

function closeResponsiveTab() {
    emit("onNonResponsiveTab");
}

const menuTranslations = computed(() => {
    return {
        dataset: {
            fr: 'Jeu de données',
            en: 'Dataset',
            pt: 'Conjunto de dados',
            de: 'Datensatz',
            zh: '数据集',
            jp: 'データセット',
            es: 'Conjunto de datos',
            ko: '데이터셋',
            ar: 'مجموعة البيانات'
        },
        config: {
            fr: 'Config',
            en: 'Config',
            pt: 'Configuração',
            de: 'Konfiguration',
            zh: '配置',
            jp: '設定',
            es: 'Configuración',
            ko: '구성',
            ar: 'إعدادات'
        },
        emits: {
            fr: 'Emits',
            en: 'Emits',
            pt: 'Emissões',
            de: 'Ereignisse',
            zh: '触发',
            jp: 'エミット',
            es: 'Emisiones',
            ko: '이밋',
            ar: 'إطلاقات'
        },
        slots: {
            fr: 'Slots',
            en: 'Slots',
            pt: 'Slots',
            de: 'Slots',
            zh: '插槽',
            jp: 'スロット',
            es: 'Slots',
            ko: '슬롯',
            ar: 'فتحات'
        },
        customTooltip: {
            fr: 'Custom tooltip',
            en: 'Custom tooltip',
            pt: 'Tooltip personalizada',
            de: 'Benutzerdefinierter Tooltip',
            zh: '自定义提示',
            jp: 'カスタムツールチップ',
            es: 'Tooltip personalizado',
            ko: '사용자 정의 툴팁',
            ar: 'تولتيب مخصص'
        },
        useCases: {
            fr: 'Cas d\'utilisation',
            en: 'Use cases',
            pt: 'Casos de uso',
            de: 'Anwendungsfälle',
            zh: '用例',
            jp: 'ユースケース',
            es: 'Casos de uso',
            ko: '사용 사례',
            ar: 'حالات الاستخدام'
        },
        themes: {
            fr: 'Themes',
            en: 'Themes',
            pt: 'Temas',
            de: 'Themen',
            zh: '主题',
            jp: 'テーマ',
            es: 'Temas',
            ko: '테마',
            ar: 'السمات'
        },
        responsive: {
            fr: 'Responsive',
            en: 'Responsive',
            pt: 'Responsivo',
            de: 'Responsive',
            zh: '响应式',
            jp: 'レスポンシブ',
            es: 'Responsivo',
            ko: '반응형',
            ar: 'متجاوب'
        },
        patterns: {
            en: "Patterns",
            fr: "Motifs",
            pt: "Padrões",
            de: "Muster",
            zh: "图案",
            jp: "模様",
            es: "Patrones",
            ko: "패턴",
            ar: "أنماط"
        },
        cssOverride: {
            en: "Css override",
            fr: "Surcharge CSS",
            pt: "Sobrescrever CSS",
            de: "CSS-Überschreibung",
            zh: "CSS 覆盖",
            jp: "CSS オーバーライド",
            es: "Anulación de CSS",
            ko: "CSS 재정의",
            ar: "تجاوز CSS"
        },
        datetimeFormatter: {
            en: "Datetime formatter",
            fr: "Formatteur de date et heure",
            pt: "Formatador de data e hora",
            de: "Datums- und Zeitformatierer",
            zh: "日期时间格式器",
            jp: "日時フォーマッター",
            es: "Formateador de fecha y hora",
            ko: "날짜 및 시간 형식기",
            ar: "منسق التاريخ والوقت"
        }
    }
})


const menuItems = computed(() => {
    return [
        {
            name: menuTranslations.value.dataset[store.lang],
            icon: 'ratio',
            color: isDarkMode.value ? '#42d392' : '#1A1A1A',
            active: true,
            order: 0
        },
        {
            name: menuTranslations.value.config[store.lang],
            icon: 'settings',
            color: isDarkMode.value ? '#5F8BEE' : '#1A1A1A',
            active: true,
            order: 1
        },
        {
            name: menuTranslations.value.emits[store.lang],
            icon: 'func',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            active: props.showEmits,
            order: 2
        },
        {
            name: menuTranslations.value.slots[store.lang],
            icon: 'skeleton',
            color: isDarkMode.value ? '#ff6600' : '#1A1A1A',
            active: props.showSlots,
            order: 3
        },
        {
            name: menuTranslations.value.customTooltip[store.lang],
            icon: 'tooltip',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            active: props.showTooltip,
            order: 4
        },
        {
            name: menuTranslations.value.useCases[store.lang],
            icon: 'clipboardLine',
            color: isDarkMode.value ? '#fdd663' : '#1A1A1A',
            active: props.showUseCases,
            order: 5
        },
        {
            name: menuTranslations.value.themes[store.lang],
            icon: 'clipboardBar',
            color: isDarkMode.value ? '#ddaaFF' : '#1A1A1A',
            active: props.showThemes,
            order: 6
        },
        {
            name: menuTranslations.value.responsive[store.lang],
            icon: 'fullscreen',
            color: isDarkMode.value ? '#40b3c7' : '#1A1A1A',
            active: props.showResponsive,
            order: 7
        },
        {
            name: menuTranslations.value.patterns[store.lang],
            icon: 'hexagon',
            color: isDarkMode.value ? '#FF7F7F' : '#1A1A1A',
            active: props.showPatterns,
            order: 8,
        },
        {
            name: menuTranslations.value.cssOverride[store.lang],
            icon: 'annotator',
            color: isDarkMode.value ? '#77a3fc' : '#1A1A1A',
            active: props.showCssOverride,
            order: 9,
        },
        {
            name: menuTranslations.value.datetimeFormatter[store.lang],
            icon: 'lap',
            color: isDarkMode.value ? '#1d915d' : '#1A1A1A',
            active: props.showDatetimeFormatter,
            order: 10
        },
    ].filter(menu => menu.active)
})

const patternTranslations = computed(() => {
    return {
        description: {
                en: "This component supports the #pattern slot. Here is how the chart looks like with patterns:",
                fr: "Ce composant prend en charge le slot #pattern. Voici à quoi ressemble le graphique avec des motifs :",
                pt: "Este componente suporta o slot #pattern. Veja como o gráfico fica com padrões:",
                de: "Diese Komponente unterstützt den Slot #pattern. So sieht das Diagramm mit Mustern aus:",
                zh: "此组件支持 #pattern 插槽。以下是带有图案的图表外观：",
                jp: "このコンポーネントは #pattern スロットをサポートしています。パターンを適用した場合のチャートの見た目は以下の通りです:",
                es: "Este componente admite el slot #pattern. Así es como se ve el gráfico con patrones:",
                ko: "이 구성 요소는 #pattern 슬롯을 지원합니다. 패턴이 적용된 차트의 모습은 다음과 같습니다:",
                ar: "يدعم هذا المكون الفتحة #pattern. هكذا يبدو الرسم البياني مع الأنماط:"
            },
            moreInfo: {
                en: "More info on patterns",
                fr: "Plus d'informations sur les motifs",
                pt: "Mais informações sobre padrões",
                de: "Mehr Informationen zu Mustern",
                zh: "关于图案的更多信息",
                jp: "パターンに関する詳細情報",
                es: "Más información sobre patrones",
                ko: "패턴에 대한 추가 정보",
                ar: "مزيد من المعلومات حول الأنماط"
            }
    }
})


</script>

<template>
    <div v-if="schema"
        class="border border-gray-700 rounded-md my-6 relative overflow-x-auto dark:bg-[#FFFFFF05] bg-gradient-to-br from-transparent to-[#5F8BEE20]">
        <VueDataUi component="VueUiAccordion" :config="isDarkMode ? darkModeConfig : config">
            <template #title="{ color }">
                <div :style="`color:${color}`">
                    {{ translations.quickOverview[store.lang] }}
                </div>
            </template>
            <template #content>
                <div class="mx-auto w-fit">
                    <Schema :component="schema" :showLink="false" :hideDisclaimer="hideSchemaDisclaimer" />
                </div>
            </template>
        </VueDataUi>
    </div>
    <div class="p-6 rounded-md border border-gray-700 my-6 relative overflow-x-auto bg-gradient-to-br from-transparent to-[#5F8BEE20]">

        <h2 class="mb-6 flex flex-row place-items-center gap-3" dir="auto">
            <VueUiIcon name="clipBoard" :size="24" stroke="#5F8BEE" />

            {{ translations.detailedDocumentation[store.lang] }}
        </h2>

        <BaseTabsMenu :items="menuItems" @tabSelected="({order}) => activeTab = order" :activeTab="activeTab"/>

        <div class="text-satoshi-bold text-app-green text-2xl mb-3">
            <slot name="title" />
        </div>

        <div class="text-app-orange text-lg my-3 gap-2 flex flex-row align-center">
            <slot name="warning"></slot>
        </div>

        <div v-show="activeTab === 0">
            <BaseSignInfo :type="signInfo"/>
            <slot name="tab0" />
        </div>
        <div v-show="activeTab === 1">
            <slot name="tab1" />
        </div>
        <div v-show="activeTab === 2">
            <slot name="tab2" />
        </div>
        <div v-show="activeTab === 3">
            <slot name="tab3" />
        </div>
        <div v-show="activeTab === 4">
            <slot name="tab4" />
        </div>
        <div v-show="activeTab === 5">
            <slot name="tab5" />
        </div>
        <div v-show="activeTab === 6">
            <slot name="tab6" />
        </div>
        <div v-if="activeTab === 7">
            <slot name="tab7" />
        </div>
        <div v-if="activeTab === 8">
            <div v-if="patternTranslations" class="mb-8">
                {{ patternTranslations.description[store.lang] }}
            </div>
            <slot name="tab8" />

            <div v-if="patternTranslations && patternTranslations.moreInfo" class="flex place-items-center justify-center my-6">
                <RouterLink :to="{ path: '/customization', hash: '#patterns'}">
                    <button class="relative py-2 px-6 rounded-full bg-[#FF7F7F] text-black opacity-90 hover:opacity-100 hover:shadow-md transition-all">
                        {{ patternTranslations.moreInfo[store.lang] }}
                    </button>
                </RouterLink>
            </div>
        </div>
        <div v-if="activeTab === 9">
            <slot name="tab9"/>
        </div>
        <div v-if="activeTab === 10">
            <slot name="tab10"/>
        </div>
    </div>
</template>
