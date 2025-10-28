<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onUnmounted } from "vue";
import { useMainStore } from "../stores";
import Schema from "../schema/Schema.vue";
import BaseTabsMenu from "./BaseTabsMenu.vue";
import BaseSignInfo from "./BaseSignInfo.vue";
import useMobile from "../useMobile";
import IconSettings from "./IconSettings.vue";
import FlexibleTooltip from "./FlexibleTooltip.vue";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);
const isMenuOpen = computed(() => store.isMenuOpen);

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
    showCallbacks?: boolean;
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
    showCallbacks: false,
});

const { isMobile } = useMobile();

const activeTab = ref(props.activeTab);

function setActiveTab(tab) {
    activeTab.value = tab;
    if (boxWrapper.value) {
        boxWrapper.value.scrollIntoView({ behavior: 'smooth'})
    }
}

defineExpose({
    setActiveTab
})

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
            en: 'Emits and exposed methods',
            fr: 'Emits et méthodes exposées',
            pt: 'Emissões e métodos expostos',
            de: 'Emits und exponierte Methoden',
            zh: '触发事件和暴露的方法',
            jp: 'emitと公開メソッド',
            es: 'Emisiones y métodos expuestos',
            ko: '이벤트와 공개된 메서드',
            ar: 'الأحداث المنبعثة والوظائف المكشوفة'
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
        },
        callbacks: {
            en: 'User menu callbacks',
            fr: 'Callbacks du menu utilisateur',
            pt: 'Callbacks do menu do usuário',
            de: 'Callbacks des Benutzermenüs',
            zh: '用户菜单回调 (callbacks)',
            jp: 'ユーザーメニューのコールバック',
            es: 'Callbacks del menú de usuario',
            ko: '사용자 메뉴 콜백',
            ar: 'Callbacks لقائمة المستخدم'
        },
    }
})


const menuItems = computed(() => {
    return [
        {
            name: menuTranslations.value.dataset[store.lang],
            icon: 'numbers',
            color: isDarkMode.value ? '#42d392' : '#FFFFFF',
            active: true,
            order: 0
        },
        {
            name: menuTranslations.value.config[store.lang],
            icon: 'settings',
            color: isDarkMode.value ? '#5F8BEE' : '#FFFFFF',
            active: true,
            order: 1
        },
        {
            name: menuTranslations.value.emits[store.lang],
            icon: 'func',
            color: isDarkMode.value ? '#CCCCCC' : '#FFFFFF',
            active: props.showEmits,
            order: 2
        },
        {
            name: menuTranslations.value.slots[store.lang],
            icon: 'skeleton',
            color: isDarkMode.value ? '#ff6600' : '#FFFFFF',
            active: props.showSlots,
            order: 3
        },
        {
            name: menuTranslations.value.customTooltip[store.lang],
            icon: 'tooltip',
            color: isDarkMode.value ? '#CCCCCC' : '#FFFFFF',
            active: props.showTooltip,
            order: 4
        },
        {
            name: menuTranslations.value.useCases[store.lang],
            icon: 'clipboardLine',
            color: isDarkMode.value ? '#fdd663' : '#FFFFFF',
            active: props.showUseCases,
            order: 5
        },
        {
            name: menuTranslations.value.themes[store.lang],
            icon: 'clipboardBar',
            color: isDarkMode.value ? '#ddaaFF' : '#FFFFFF',
            active: props.showThemes,
            order: 6
        },
        {
            name: menuTranslations.value.responsive[store.lang],
            icon: 'fullscreen',
            color: isDarkMode.value ? '#40b3c7' : '#FFFFFF',
            active: props.showResponsive,
            order: 7
        },
        {
            name: menuTranslations.value.patterns[store.lang],
            icon: 'hexagon',
            color: isDarkMode.value ? '#FF7F7F' : '#FFFFFF',
            active: props.showPatterns,
            order: 8,
        },
        {
            name: menuTranslations.value.cssOverride[store.lang],
            icon: 'annotator',
            color: isDarkMode.value ? '#77a3fc' : '#FFFFFF',
            active: props.showCssOverride,
            order: 9,
        },
        {
            name: menuTranslations.value.datetimeFormatter[store.lang],
            icon: 'lap',
            color: isDarkMode.value ? '#1d915d' : '#FFFFFF',
            active: props.showDatetimeFormatter,
            order: 10
        },
        {
            name: menuTranslations.value.callbacks[store.lang],
            icon: 'lambda',
            color: isDarkMode.value ? '#ff6ba1' : '#FFFFFF',
            active: props.showCallbacks,
            order: 11
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

const tabsMenu = ref(null)
const isMini = ref(false);
const boxWrapper = ref(null);
let io = null;

onMounted(() => {
    
    const root = document.querySelector("#root") || null;

    io = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                isMini.value = !entry.isIntersecting;
            }
        },
        {
            root,
            rootMargin: "0px",
            threshold: 0,
        }
    );

    if (tabsMenu.value) {
        io.observe(tabsMenu.value);
    }
});

onUnmounted(() => {
    if (io) {
        io.disconnect();
        io = null;
    }
});

function selectTabFromMini(order) {
    activeTab.value = order;
    if (boxWrapper.value) {
        boxWrapper.value.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        })
    }
}

</script>

<template>
    <Transition name="fade">
        <div 
            v-if="!isMobile" 
            :class="`fixed top-[100px] ${isMenuOpen ? 'left-[300px]' : 'left-[60px]'} z-20 flex flex-col gap-2.5 p-2 transition-all`"
        >
            <FlexibleTooltip
                v-for="tab in menuItems"
                position="right"
                :content="tab.name"
            >
                <button @click="() => selectTabFromMini(tab.order)" :class="`p-2 hover:bg-[#FAFAFA] dark:hover:bg-[#3A3A3A] bg-gray-100 dark:bg-[#2A2A2A] rounded-full hover:bg-gradient-to-tl transition-colors relative shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]`" :style="{
                    outline: activeTab === tab.order ? `1px solid ${tab.color}90` : undefined,
                    background: activeTab === tab.order && !isDarkMode ? 'radial-gradient(at top, white, #abc2f6)' : undefined
                }">
                    <IconSettings v-if="tab.icon === 'settings'" :stroke="isDarkMode ? '#5F8BEE' : '#1A1A1A'" :size="20" />
                    <VueUiIcon v-else :name="tab.icon" :stroke="isDarkMode ? tab.color : '#2A2A2A'" :size="20" />
                    <div v-if="activeTab === tab.order" class="absolute -right-2 top-1/2 -translate-y-1/2">
                        <VueUiIcon name="arrowLeft" :stroke="isDarkMode ? tab.color : '#2A2A2A'" :size="10"/>
                    </div>
                </button>
            </FlexibleTooltip>
        </div>
    </Transition>

    <div v-if="schema"
        class="rounded-xl pl-4 my-6 relative overflow-x-auto dark:bg-[#242424] bg-gradient-to-br from-transparent to-[#5F8BEE20] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
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

    <div ref="boxWrapper" class="p-6 rounded-xl my-6 relative overflow-x-auto bg-gray-100 dark:bg-[#242424] scroll-mt-8 shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">

        <h2 class="mb-6 flex flex-row place-items-center gap-3" dir="auto">
            <VueUiIcon name="clipBoard" :size="24" stroke="#5F8BEE" />

            {{ translations.detailedDocumentation[store.lang] }}
        </h2>

        <div ref="tabsMenu">
            <BaseTabsMenu :items="menuItems" @tabSelected="({order}) => activeTab = order" :activeTab="activeTab"/>
        </div>

        <div class="text-inter-medium text-app-green text-2xl mb-3">
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
        <div v-if="activeTab === 11">
            <slot name="tab11"/>
        </div>
    </div>
</template>
