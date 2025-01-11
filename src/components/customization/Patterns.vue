<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCustomizationBox from "./BaseCustomizationBox.vue";
import CodeParser from "./CodeParser.vue";
import FlexibleTooltip from "../FlexibleTooltip.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
    return {
        description: {
            en: "Some components support the #pattern scoped slot, to further customize datapoints. The VueUiPattern component provides 12 readymade patterns you can use out of the box.",
            fr: "Certains composants prennent en charge le slot scopé #pattern pour personnaliser davantage les points de données. Le composant VueUiPattern propose 12 motifs prêts à l'emploi que vous pouvez utiliser immédiatement.",
            pt: "Alguns componentes suportam o slot escopo #pattern, para personalizar ainda mais os pontos de dados. O componente VueUiPattern fornece 12 padrões prontos para uso.",
            de: "Einige Komponenten unterstützen den Scoped Slot #pattern, um Datenpunkte weiter anzupassen. Die VueUiPattern-Komponente bietet 12 fertige Muster, die Sie sofort verwenden können.",
            zh: "某些组件支持 #pattern 范围插槽，以进一步自定义数据点。VueUiPattern 组件提供了 12 种即用型模式，可供使用。",
            jp: "一部のコンポーネントは #pattern スコープ付きスロットをサポートしており、データポイントをさらにカスタマイズできます。VueUiPattern コンポーネントには、すぐに使える 12 の既製パターンが用意されています。",
            es: "Algunos componentes admiten el slot con alcance #pattern, para personalizar aún más los puntos de datos. El componente VueUiPattern proporciona 12 patrones prediseñados listos para usar.",
            ko: "일부 컴포넌트는 #pattern 범위 슬롯을 지원하여 데이터 포인트를 더욱 사용자 정의할 수 있습니다. VueUiPattern 컴포넌트는 즉시 사용할 수 있는 12개의 기본 패턴을 제공합니다.",
            ar: "بعض المكونات تدعم الفتحة المخصصة #pattern لتخصيص نقاط البيانات بشكل أكبر. يوفر مكون VueUiPattern 12 نمطًا جاهزًا للاستخدام مباشرة."
        },
        supportedComponents: {
            en: "The following components support the #pattern slot:",
            fr: "Les composants suivants prennent en charge le slot #pattern :",
            pt: "Os seguintes componentes suportam o slot #pattern:",
            de: "Die folgenden Komponenten unterstützen den #pattern-Slot:",
            zh: "以下组件支持 #pattern 插槽：",
            jp: "以下のコンポーネントは #pattern スロットをサポートしています：",
            es: "Los siguientes componentes admiten el slot #pattern:",
            ko: "다음 구성 요소는 #pattern 슬롯을 지원합니다:",
            ar: "المكونات التالية تدعم الفتحة #pattern:"
        },
        uniquePattern: {
            en: "Example of a single pattern used on all datapoints",
            fr: "Exemple d'un motif unique utilisé sur tous les points de données",
            pt: "Exemplo de um único padrão usado em todos os pontos de dados",
            de: "Beispiel für ein einzelnes Muster, das auf alle Datenpunkte angewendet wird",
            zh: "单一模式应用于所有数据点的示例",
            jp: "すべてのデータポイントに使用される単一パターンの例",
            es: "Ejemplo de un patrón único usado en todos los puntos de datos",
            ko: "모든 데이터 포인트에 사용된 단일 패턴의 예",
            ar: "مثال على نمط واحد مستخدم على جميع نقاط البيانات"
        },
        multiPattern: {
            en: "Example of individual patterns used for each datapoint",
            fr: "Exemple de motifs individuels utilisés pour chaque point de données",
            pt: "Exemplo de padrões individuais usados para cada ponto de dados",
            de: "Beispiel für individuelle Muster, die für jeden Datenpunkt verwendet werden",
            zh: "每个数据点使用独立模式的示例",
            jp: "各データポイントに使用される個別パターンの例",
            es: "Ejemplo de patrones individuales usados para cada punto de datos",
            ko: "각 데이터 포인트에 사용된 개별 패턴의 예",
            ar: "مثال على أنماط فردية مستخدمة لكل نقطة بيانات"
        },
    }
})

const patterns = ref([
    { name: 'bubbles'},
    { name: 'flooring'},
    { name: 'grid'},
    { name: 'hexagon-diamond'},
    { name: 'hexagon-flooring'},
    { name: 'hexagon-grid'},
    { name: 'maze'},
    { name: 'redrum'},
    { name: 'scales'},
    { name: 'squares'},
    { name: 'wave'},
    { name: 'zig-zag'},
]);

const dataset = ref([
{
    name: "Serie 1",
    values: [100]
},
{
    name: "Serie 2",
    values: [200]
},
{
    name: "Serie 3",
    values: [300, 1]
},
]);

const darkModeConfig = ref({
useBlurOnHover: true,
useCssAnimation: true,
style: {
    fontFamily: "inherit",
    chart: {
    useGradient: false,
    gradientIntensity: 40,
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    layout: {
        labels: {
        dataLabels: {
            show: true,
            hideUnderValue: 3,
            prefix: "",
            suffix: ""
        },
        value: {
            rounding: 0,
            show: true,
        },
        percentage: {
            color: "#CCCCCC",
            bold: true,
            fontSize: 18
        },
        name: {
            color: "#CCCCCC",
            bold: false,
            fontSize: 14,
        },
        hollow: {
            total: {
            show: true,
            bold: false,
            fontSize: 18,
            color: "#CCCCCC",
            text: "Total",
            offsetY: -16,
            value: {
                color: "#CCCCCC",
                fontSize: 18,
                bold: true,
                suffix: "",
                prefix: "",
                offsetY: -12,
                rounding: 0,
            }
            },
            average: {
            show: true,
            bold: false,
            fontSize: 18,
            color: "#CCCCCC",
            text: "Average",
            offsetY: 0,
            value: {
                color: "#CCCCCC",
                fontSize: 18,
                bold: true,
                suffix: "",
                prefix: "",
                offsetY: 6,
                rounding: 0,
            }
            }
        }
        },
        donut: {
        strokeWidth: 54,
        borderWidth: 2,
        },
    },
    legend: {
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        show: true,
        fontSize: 16,
        bold: false,
        roundingValue: 0,
        roundingPercentage: 0,
    },
    title: {
        text: "",
        color: "#FAFAFA",
        fontSize: 20,
        bold: true,
        subtitle: {
        color: "#CCCCCC",
        text: "",
        fontSize: 16,
        bold: false
        }
    },
    tooltip: {
        show: true,
        color: "#CCCCCC",
        backgroundColor: "#1A1A1A",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
    }
    }
},
userOptions: {
    show: false
},
translations: {
    total: "Total",
    average: "Average",
},
table: {
    show: false,
    responsiveBreakpoint: 300,
    columnNames: {
    series: "Series",
    value: "Value",
    percentage: "Percentage"
    },
    th: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    outline: "none"
    },
    td: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    outline: "none",
    roundingValue: 0,
    roundingPercentage: 0
    }
}
});

const config = ref({
useBlurOnHover: true,
useCssAnimation: true,
style: {
    fontFamily: "inherit",
    chart: {
    useGradient: true,
    gradientIntensity: 40,
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    layout: {
        labels: {
        dataLabels: {
            show: true,
            hideUnderValue: 3,
            prefix: "",
            suffix: ""
        },
        value: {
            rounding: 0,
            show: true
        },
        percentage: {
            color: "#1A1A1A",
            bold: true,
            fontSize: 18
        },
        name: {
            color: "#1A1A1A",
            bold: false,
            fontSize: 14,
        },
        hollow: {
            total: {
            show: true,
            bold: false,
            fontSize: 18,
            color: "#1A1A1A",
            text: "Total",
            offsetY: -16,
            value: {
                color: "#1A1A1A",
                fontSize: 18,
                bold: true,
                suffix: "",
                prefix: "",
                offsetY: -12,
                rounding: 0,
            }
            },
            average: {
            show: true,
            bold: false,
            fontSize: 18,
            color: "#1A1A1A",
            text: "Average",
            offsetY: 0,
            value: {
                color: "#1A1A1A",
                fontSize: 18,
                bold: true,
                suffix: "",
                prefix: "",
                offsetY: 6,
                rounding: 0,
            }
            }
        }
        },
        donut: {
        strokeWidth: 54,
        borderWidth: 2
        },
    },
    legend: {
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        show: true,
        fontSize: 16,
        bold: false,
        roundingValue: 0,
        roundingPercentage: 0,
    },
    title: {
        text: "",
        color: "#1A1A1A",
        fontSize: 20,
        bold: true,
        subtitle: {
        color: "#565656",
        text: '',
        fontSize: 16,
        bold: false
        }
    },
    tooltip: {
        show: true,
        color: "#1A1A1A",
        backgroundColor: "#F3F4F6",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        customFormat: null
    }
    }
},
userOptions: {
    show: false
},
translations: {
    total: "Total",
    average: "Average",
},
table: {
    show: false,
    responsiveBreakpoint: 300,
    columnNames: {
        series: "Series",
        value: "Value",
        percentage: "Percentage"
    },
    th: {
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        outline: "none"
    },
    td: {
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        outline: "none",
        roundingValue: 0,
        roundingPercentage: 0
        }
}
});

const codeSinglePattern = ref(`<VueUiDonut
    :dataset="dataset"
    :config="config"
>
    <template #pattern="{ patternId }">
        <VueUiPattern
            :id="patternId"
            name="maze"
        />
    </template>
</VueUiDonut>`
)

const codeMultiPattern = ref(`<VueUiDonut
    :dataset="dataset"
    :config="config"
>
    <template #pattern="{ seriesIndex, patternId }">
        <VueUiPattern
            :id="patternId"
            v-if="seriesIndex === 0"
            name="maze"
        />
        <VueUiPattern
            :id="patternId"
            v-if="seriesIndex === 1"
            :scale="0.5"
            :strokeWidth="3"
            name="redrum"
        />
        <VueUiPattern
            :id="patternId"
            v-if="seriesIndex === 2"
            name="scales"
        />
    </template>
</VueUiDonut>`
)

const supportedComponents = computed(() => {
    return [
        { name: 'VueUiXy', link: 'docs#vue-ui-xy', icon: 'chartLine' },
        { name: 'VueUiDonut', link: 'docs#vue-ui-donut', icon: 'chartDonut' },
        { name: 'VueUiGauge', link: 'docs#vue-ui-gauge', icon: 'chartGauge' },
        { name: 'VueUiRings', link: 'docs#vue-ui-rings', icon: 'chartRings' },
        { name: 'VueUiStackbar', link: 'docs#vue-ui-stackbar', icon: 'chartStackbar' },
        { name: 'VueUiVerticalBar', link: 'docs#vue-ui-vertical-bar', icon: 'chartVerticalBar' },
        { name: 'VueUiWaffle', link: 'docs#vue-ui-waffle', icon: 'chartWaffle' },
    ]
})

</script>

<template>
    <div class="px-4 max-w-[1000px] mx-auto mt-4 mb-8" dir="auto">
        <div class="flex flex-row place-items-center justify-center gap-6 flex-wrap p-4" dir="auto">
            <div class="flex-2">
                {{ translations.description[store.lang] }}
            </div>
            <div v-for="pattern in patterns" class="flex flex-col">
                <div class="p-2 bg-gray-200 dark:bg-[#FFFFFF20] rounded-t">
                    {{ pattern.name }}
                </div>
                <div>
                    <svg viewBox="0 0 200 200" height="200" width="200">
                        <defs>
                            <VueUiPattern :id="pattern.name" :name="pattern.name" :stroke="isDarkMode ? '#6A6A6A' : '#1A1A1A'"/>
                        </defs>
                        <rect :x="0" :y="0" :height="200" :width="200" :fill="`url(#${pattern.name})`"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="flex-1 mb-6 text-center">
            {{ translations.supportedComponents[store.lang] }}

            <div class="flex flex-row gap-2 flex-wrap place-items-center justify-center mt-8 mb-12">
                <FlexibleTooltip 
                    v-for="c in supportedComponents"
                    position="bottom"
                    :content="c.name"
                    width="w-fit"
                    delay="delay-150"
                    :always-blue="true"
                >
                    <RouterLink :to="c.link">
                        <button
                            class="relative flex place-items-center justify-center p-4 bg-[#FFFFFF10] shadow hover:outline hover:outline-app-blue hover:bg-[#5f8aee20] transition-colors"
                        >
                            <div class="text-[8px] absolute -top-4">{{ c.name }}</div>
                            <VueUiIcon :name="c.icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                        </button>
                    </RouterLink>
                </FlexibleTooltip>
            </div>
        </div>

        <BaseCustomizationBox :title="translations.uniquePattern[store.lang]">
            <template #code>
                <CodeParser :content="codeSinglePattern" language="html"/>
            </template>
            <template #chart>
            <VueDataUi component="VueUiDonut" :dataset="dataset" :config="isDarkMode ? darkModeConfig : config">
                <template #pattern="{ patternId}">
                    <VueUiPattern :id="patternId" name="maze"/>
                </template>
            </VueDataUi>
            </template>
        </BaseCustomizationBox>
        <BaseCustomizationBox :title="translations.multiPattern[store.lang]">
            <template #code>
                <CodeParser :content="codeMultiPattern" language="html"/>
            </template>
            <template #chart>
            <VueDataUi component="VueUiDonut" :dataset="dataset" :config="isDarkMode ? darkModeConfig : config">
                <template #pattern="{ seriesIndex, patternId }">
                    <VueUiPattern
                        :id="patternId"
                        v-if="seriesIndex === 0"
                        name="maze"
                    />
                    <VueUiPattern
                        :id="patternId"
                        v-if="seriesIndex === 1"
                        :scale="0.5"
                        :strokeWidth="3"
                        name="redrum"
                    />
                    <VueUiPattern
                        :id="patternId"
                        v-if="seriesIndex === 2"
                        name="scales"
                    />
                </template>
            </VueDataUi>
            </template>
        </BaseCustomizationBox>

        <div class="mt-6">
            VueUiPattern props:
            <ul class="list-disc pl-4 mt-2">
                <li class="flex gap-2 my-1"><div class="rounded-full bg-app-orange text-black px-3 text-xs flex place-items-center">REQUIRED</div><code>id</code><code>: string;</code> Use the <code>patternId</code> exposed by the #pattern slot</li>
                <li class="flex gap-2 my-1"><div class="rounded-full bg-app-orange text-black px-3 text-xs flex place-items-center">REQUIRED</div><code>name</code><code>: string;</code> The name of the patern to apply</li>
                <li class="flex gap-2 my-1"><div class="rounded-full bg-app-blue text-black px-3 text-xs flex place-items-center">OPTIONAL</div><code>fill</code><code>: string;</code> Background color, default transparent</li>
                <li class="flex gap-2 my-1"><div class="rounded-full bg-app-blue text-black px-3 text-xs flex place-items-center">OPTIONAL</div><code>stroke</code><code>: string;</code> Stroke color, default: '#2D353C'</li>
                <li class="flex gap-2 my-1"><div class="rounded-full bg-app-blue text-black px-3 text-xs flex place-items-center">OPTIONAL</div><code>strokeWidth</code><code>: number;</code>Stroke width, default: 1</li>
                <li class="flex gap-2 my-1"><div class="rounded-full bg-app-blue text-black px-3 text-xs flex place-items-center">OPTIONAL</div><code>scale</code><code>: number;</code>Zoom scale, default: 1</li>
            </ul>
        </div>
    </div>
</template>