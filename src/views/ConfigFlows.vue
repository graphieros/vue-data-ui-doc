<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import useFlows from "../flows";
import BaseDropdown from "../components/BaseDropdown.vue";
import { useMakerStore } from "../stores/maker";
import BaseCrumbs from "../components/BaseCrumbs.vue";

const store = useMainStore();
const makerStore = useMakerStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

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
        description: translations.value.docs.configFlow[store.lang],
    }
]);


const flows = useFlows();
const selectedComponent = ref('VueUiFlow');

const options = ref([
    { name: 'VueUiFlow', icon: 'chartFlow'},
    { name: 'VueUiXy', icon: 'chartLine'},
    { name: 'VueUiDonut', icon: 'chartDonut'}
    ])

const config = computed(() => {
    return {
        nodeCategories: flows[selectedComponent.value].nodeCategories,
        nodeCategoryColors: flows[selectedComponent.value].nodeCategoryColors,
        userOptions: {
            buttons: {
                table: false,
            }
        },
        style: {
            chart: {
                backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                links: {
                    stroke: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
                },
                nodes: {
                    stroke: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
                    minHeight: 25,
                    labels: {
                        fontSize: 12
                    }
                },
                tooltip: {
                    show: true,
                    color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
                    backgroundColor: isDarkMode.value ? '#1A1A1A' :  "#F3F4F6",
                    fontSize: 14,
                    showPercentage: true,
                    roundingPercentage: 0,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: isDarkMode.value ? '#4A4A4A' : "#e1e5e8",
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: "center",
                    offsetY: 24
                },
                legend: {
                    color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
                    backgroundColor: isDarkMode.value ? '#1A1A1A' :  "#F3F4F6",
                },
                title: {
                    text: selectedComponent.value,
                    color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
                    textAlign: 'left',
                    paddingLeft: 24,
                }
            }
        }
    }
})


const dataset = computed(() => {
    return flows[selectedComponent.value].flow
})

const description = computed(() => {
    return {
        en: 'Showcasing examples of the VueUiFlow chart describing some Vue Data UI components config objects.',
        fr: 'Présentation d’exemples du diagramme VueUiFlow décrivant quelques objets de configuration des composants UI de données Vue.',
        pt: 'Apresentando exemplos do diagrama VueUiFlow que descreve alguns objetos de configuração de componentes de IU de dados do Vue.',
        de: 'Beispiele für das VueUiFlow-Diagramm, das einige Konfigurationsobjekte von Vue Data UI-Komponenten beschreibt.',
        zh: '展示 VueUiFlow 图表示例，描述一些 Vue 数据 UI 组件的配置对象。',
        jp: 'VueデータUIコンポーネントの設定オブジェクトを説明するVueUiFlowチャートの例を紹介します。',
        es: 'Mostrando ejemplos del diagrama VueUiFlow que describen algunos objetos de configuración de componentes de UI de datos de Vue.',
        ko: 'Vue 데이터 UI 컴포넌트 구성 객체를 설명하는 VueUiFlow 차트 예시를 보여줍니다.',
        ar: 'عرض أمثلة لمخطط VueUiFlow يصف بعض كائنات تكوين مكونات واجهة المستخدم الخاصة ببيانات Vue.'
    }
})

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>
    <div class="mt-12">
        <div class="w-full flex flex-col gap-4 place-items-center justify-center my-3">
            <VueUiIcon name="chartFlow" :size="64" :strokeWidth="0.8" class="hidden md:block" :stroke="isDarkMode ? '#de6937' : '#de6937'"/>
            <h1 class="text-[48px] sm:text-[64px] text-center">{{ translations.docs.configFlow[store.lang] }}</h1>
            <article>
                <p class="text-md">
                    {{ description[store.lang] }}
                </p>
            </article>
        </div>
        <div class="w-fit mx-auto mb-12">
            <div class="flex flex-col gap-2">
                <label for="chartType">{{ makerTranslations.labels.selectChartType[store.lang] }}</label>
    
                <BaseDropdown
                    :options="options"
                    v-model:value="selectedComponent"
                    optionTarget="name"
                    additionalOptionTarget="name"
                    id="exampleSelect"
                >
                    <template #selected="{ selectedOption }">
                        <div v-if="selectedOption" class="text-left flex flex-row gap-2 place-items-center">
                            <div class="h-[24px] w-[24px] flex place-items-center">
                                <VueUiIcon :name="selectedOption.icon" :size="24" stroke="#5f8aee" />
                            </div>
                            <div class="text-xl">
                                <span :class="'text-gray-500 dark:text-app-blue'">VueUi</span>
                                <span :class=" 'dark:text-app-blue-light'">{{ selectedOption.name.replace('VueUi', '') }}</span>
                            </div>
                        </div>
                    </template>
                    <template #option="{ option, selected, current }">
                        <div class="text-left flex flex-row gap-2 place-items-center">
                            <div class="h-[20px] w-[20px] flex place-items-center">
                                <VueUiIcon :name="option.icon" :size="20" :stroke="isDarkMode ? (selected || current) ? '#FFFFFF' : '#8A8A8A' : (selected || current) ? '#FFFFFF' :  '#1A1A1A'" />
                            </div>
                            <div>
                                <span :class="selected || current ? `text-white` : 'text-gray-500 dark:text-app-blue'">VueUi</span>
                                <span :class="selected || current ? `text-white`: 'dark:text-app-blue-light'">{{ option.name.replace('VueUi', '') }}</span>
                            </div>
                        </div>
                    </template>
                </BaseDropdown>
            </div>
        </div>

        <div style="min-width: 300px; max-width: 90%; resize: horizontal; overflow: auto; background: white" class="mx-auto">
            <VueDataUi component="VueUiFlow" :dataset="dataset" :config="config"/>
        </div>
    </div>
</template>