<script setup>
import { ref, onMounted, computed } from "vue";
import { useCase } from "./useCase";
import UseCaseTitle from "./UseCaseTitle.vue";
import { useMainStore } from "../../stores";
import { useCaseStore } from "../../stores/cases";
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"
import XyShareSelect from "./XyShareSelect.vue";
import CodeParser from "../customization/CodeParser.vue";
import Tchernob from "./Tchernob.vue";

onMounted(() => {
    window.Prism = window.Prism || {}
    window.Prism.manual = true
    Prism.highlightAll()
})

const store = useMainStore();
const cases = useCaseStore();

const isDarkMode = computed(() => store.isDarkMode);
const accordionTitle = computed(() => {
    return cases.code[store.lang]
})

const {
    XY_STACKED_DATASET_WITH_AUTOSCALE,
    XY_MULTIPLE_Y_AXES_CONFIG,
    XY_MULTIPLE_Y_AXES_DATASET,
    XY_STACKED_CONFIG,
    XY_STACKED_DATASET,
    XY_FIXED_SCALE_CONFIG,
    XY_FIXED_SCALE_DATASET
} = useCase()


/**
 * Idea: xy next to timeline. selectX highlights timeline item
 * 
 */

const shareX = ref({
    en: 'Share selected time index on multiple chart instances',
    fr: 'Partager l’index temporel sélectionné sur plusieurs instances de graphique',
    pt: 'Compartilhar o índice de tempo selecionado em várias instâncias de gráfico',
    de: 'Ausgewählten Zeitindex auf mehreren Diagramminstanzen teilen',
    zh: '在多个图表实例上共享所选时间索引',
    jp: '選択した時間インデックスを複数のチャートインスタンスで共有する',
    es: 'Compartir el índice de tiempo seleccionado en varias instancias de gráfico',
    ko: '선택한 시간 인덱스를 여러 차트 인스턴스에서 공유하기',
    ar: 'مشاركة فهرس الوقت المحدد عبر عدة مثيلات من المخططات'
});

const shareXDescription = ref({
    en: `VueUiXy has a special "selectedXIndex" prop, which can be used alongside config events to highlight the selected time index on multiple charts.`,
    fr: `VueUiXy dispose d'une prop spéciale "selectedXIndex", qui peut être utilisée avec les événements de configuration pour mettre en évidence l'index temporel sélectionné sur plusieurs graphiques.`,
    pt: `O VueUiXy possui uma prop especial "selectedXIndex", que pode ser usada junto com eventos de configuração para destacar o índice de tempo selecionado em vários gráficos.`,
    de: `VueUiXy verfügt über eine spezielle "selectedXIndex"-Prop, die zusammen mit Konfigurationsereignissen verwendet werden kann, um den ausgewählten Zeitindex in mehreren Diagrammen hervorzuheben.`,
    zh: `VueUiXy 有一个特殊的 "selectedXIndex" 属性，可以与配置事件一起使用，在多个图表上高亮显示所选的时间索引。`,
    jp: `VueUiXy には特別な "selectedXIndex" プロパティがあり、設定イベントと併用して複数のチャートで選択した時間インデックスを強調表示できます。`,
    es: `VueUiXy tiene una prop especial "selectedXIndex", que puede usarse junto con eventos de configuración para resaltar el índice de tiempo seleccionado en varios gráficos.`,
    ko: `VueUiXy에는 특별한 "selectedXIndex" prop이 있으며, 설정 이벤트와 함께 사용하여 여러 차트에서 선택된 시간 인덱스를 강조 표시할 수 있습니다.`,
    ar: `يمتلك VueUiXy خاصية خاصة تسمى "selectedXIndex"، ويمكن استخدامها مع أحداث الإعداد لتمييز فهرس الوقت المحدد عبر عدة مخططات.`
    }
)

const shareXCodeTemplate = ref(`
<div class="flex gap-2 flex-wrap align-center justify-around">
    <div class="w-full max-w-[400px]">
        <VueUiXy
            :dataset="datasetA"
            :config="configA"
            :selectedXIndex="selectedXIndex"
        />
    </div>
    <div class="w-full max-w-[400px]">
        <VueUiXy
            :dataset="datasetB"
            :config="configB"
            :selectedXIndex="selectedXIndex"
        />
    </div>
</div>  
`);

const shareXCodeJs = ref(`
    import { VueUiXy, mergeConfigs } from "vue-data-ui";

    const datasetA = ref([]); // your dataset for this chart
    const datasetB = ref([]); // your dataset for this chart

    const selectedIndex = ref(undefined);

    const commonConfig = computed(() => {
        return {
            events: {
                datapointEnter: ({ seriesIndex }) => {
                    selectedIndex.value = seriesIndex;
                },
                datapointLeave: () => {
                    selectedIndex.value = undefined;
                }
            },
            chart: {
                highlighter: {
                    useLine: true
                }
            }
        }
    });

    const configA = computed(() => {
        return mergeConfigs({
            defaultConfig: commonConfig.value,
            userConfig: {} // specific config for this chart
        })
    });

    const configB = computed(() => {
        return mergeConfigs({
            defaultConfig: commonConfig.value,
            userConfig: {} // specific config for this chart
        })
    });`)

</script>

<template>
    <UseCaseTitle>
        <template #title>
            <div>
                <div class="w-full mb-2">
                    {{ shareX[store.lang] }}
                </div>
                <div class="w-full text-black dark:text-[#CCCCCC]">
                    {{ shareXDescription[store.lang] }}
                </div>
            </div>
        </template>
    </UseCaseTitle>
    <XyShareSelect/>
    <div class="w-full">
        <VueDataUi component="VueUiAccordion" :config="{
            maxHeight: 5000,
            head: {
                useArrowSlot: true,
                backgroundColor: 'transparent',
                iconColor: isDarkMode ? '#fdd663' : '#1A1A1A'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
            }
        }">
            <template #arrow="{ iconColor }">
                <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
            </template>
            <template #title>
                {{ accordionTitle }}
            </template>
            <template #content>
                <CodeParser
                    title="script"
                    language="javascript"
                    :content="shareXCodeJs"
                    @copy="store.copy()"
                />
                <CodeParser
                    title="template"
                    language="html"
                    :content="shareXCodeTemplate"
                    @copy="store.copy()"
                />
            </template>
        </VueDataUi>
    </div>

    <hr class="mt-4 mb-8"/>

    <UseCaseTitle>
        <template #title>
            <div>
                <div class="w-full mb-2">
                    Timeline example
                </div>
                <div class="w-full text-black dark:text-[#CCCCCC]">
                    Sync a chart to a timeline
                </div>
            </div>
        </template>
    </UseCaseTitle>
    <Tchernob/>

    <hr class="mt-4 mb-8"/>
    
    <UseCaseTitle>
        <template #title>
            {{ cases.XY_FIXED_SCALE.title[store.lang] }}
        </template>
    </UseCaseTitle>
    <div class="w-full rounded p-2 bg-white dark:bg-[#2A2A2A]">
        <VueDataUi
            component="VueUiXy" 
            :dataset="XY_FIXED_SCALE_DATASET"
            :config="XY_FIXED_SCALE_CONFIG"
        />
    </div>
    <div class="w-full">
        <VueDataUi component="VueUiAccordion" :config="{
            maxHeight: 5000,
            head: {
                useArrowSlot: true,
                backgroundColor: 'transparent',
                iconColor: isDarkMode ? '#fdd663' : '#1A1A1A'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
            }
        }">
            <template #arrow="{ iconColor }">
                <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
            </template>
            <template #title>
                {{ accordionTitle }}
            </template>
            <template #content>
                <div class="bg-[#272822] p-2 rounded">
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const dataset = ref({{ XY_FIXED_SCALE_DATASET }});
                    </code>
                    <br><br>
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const config = ref({{ XY_FIXED_SCALE_CONFIG }});
                    </code>
                </div>
            </template>
        </VueDataUi>
    </div>
    
    <hr class="mt-4 mb-8"/>

    <UseCaseTitle>
        <template #title>
            {{ cases.XY_MULTIPLE_Y_AXES.title[store.lang] }}
        </template>
        <template #description>
            {{ cases.XY_MULTIPLE_Y_AXES.description[store.lang] }}
        </template>
    </UseCaseTitle>
    <div class="w-full rounded p-2 bg-white dark:bg-[#2A2A2A]">
        <VueDataUi
            component="VueUiXy" 
            :dataset="XY_MULTIPLE_Y_AXES_DATASET"
            :config="XY_MULTIPLE_Y_AXES_CONFIG"
        />
    </div>
    <div class="w-full">
        <VueDataUi component="VueUiAccordion" :config="{
            maxHeight: 5000,
            head: {
                useArrowSlot: true,
                backgroundColor: 'transparent',
                iconColor: isDarkMode ? '#fdd663' : '#1A1A1A'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
            }
        }">
            <template #arrow="{ iconColor }">
                <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
            </template>
            <template #title>
                {{ accordionTitle }}
            </template>
            <template #content>
                <div class="bg-[#272822] p-2 rounded">
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const dataset = ref({{ XY_MULTIPLE_Y_AXES_DATASET }});
                    </code>
                    <br><br>
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const config = ref({{ XY_MULTIPLE_Y_AXES_CONFIG }});
                    </code>
                </div>
            </template>
        </VueDataUi>
    </div>

    <hr class="mt-4 mb-8"/>

    <UseCaseTitle>
        <template #title>
            {{ cases.XY_STACKED.title[store.lang] }}
        </template>
        <template #description>
            {{ cases.XY_STACKED.description[store.lang] }}
        </template>
    </UseCaseTitle>
    <div class="w-full rounded p-2 bg-white dark:bg-[#2A2A2A]">
        <VueDataUi
            component="VueUiXy" 
            :dataset="XY_STACKED_DATASET"
            :config="XY_STACKED_CONFIG"
        />
    </div>
    <div class="w-full">
        <VueDataUi component="VueUiAccordion" :config="{
            maxHeight: 5000,
            head: {
                useArrowSlot: true,
                backgroundColor: 'transparent',
                iconColor: isDarkMode ? '#fdd663' : '#1A1A1A'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
            }
        }">
            <template #arrow="{ iconColor }">
                <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
            </template>
            <template #title>
                {{ accordionTitle }}
            </template>
            <template #content>
                <div class="bg-[#272822] p-2 rounded">
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const dataset = ref({{ XY_STACKED_DATASET }});
                    </code>
                    <br><br>
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const config = ref({{ XY_STACKED_CONFIG }});
                    </code>
                </div>
            </template>
        </VueDataUi>
    </div>

    <hr class="mt-4 mb-8"/>

    <UseCaseTitle>
        <template #title>
            {{ cases.XY_STACKED_AUTOSCALE.title[store.lang] }}
        </template>
        <template #description>
            {{ cases.XY_STACKED_AUTOSCALE.description[store.lang] }}
        </template>
    </UseCaseTitle>
    <div class="w-full rounded p-2 bg-white dark:bg-[#2A2A2A]">
        <VueDataUi
            component="VueUiXy" 
            :dataset="XY_STACKED_DATASET_WITH_AUTOSCALE"
            :config="XY_STACKED_CONFIG"
        />
    </div>
    <div class="w-full">
        <VueDataUi component="VueUiAccordion" :config="{
            maxHeight: 5000,
            head: {
                useArrowSlot: true,
                backgroundColor: 'transparent',
                iconColor: isDarkMode ? '#fdd663' : '#1A1A1A'
            },
            body: {
                backgroundColor: 'transparent',
                color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
            }
        }">
            <template #arrow="{ iconColor }">
                <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
            </template>
            <template #title>
                {{ accordionTitle }}
            </template>
            <template #content>
                <div class="bg-[#272822] p-2 rounded">
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const dataset = ref({{ XY_STACKED_DATASET_WITH_AUTOSCALE }});
                    </code>
                    <br><br>
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        const config = ref({{ XY_STACKED_CONFIG }});
                    </code>
                </div>
            </template>
        </VueDataUi>
    </div>
</template>