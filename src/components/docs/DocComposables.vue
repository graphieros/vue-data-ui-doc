<script setup>
import { ref, computed, onMounted, useTemplateRef } from "vue";
import { useMainStore } from "../../stores";
import BaseCard from "../BaseCard.vue";
import CodeParser from "../customization/CodeParser.vue";
import { useTooltipPosition } from "vue-data-ui/composables";

const store = useMainStore();
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);
const isMenuOpen = computed(() => store.isMenuOpen);

onMounted(() => (store.docSnap = false));

const composableTranslations = ref({
  useTooltipPosition: {
    en: "Use this composable to have tooltips automatically position either on the left or the right of the client position depending on the cursor position's to the chart's horizontal center.",
    fr: "Utilisez ce composable pour que les infobulles se positionnent automatiquement à gauche ou à droite de la position client selon la position du curseur par rapport au centre horizontal du graphique.",
    pt: "Use este composable para que as dicas de ferramenta se posicionem automaticamente à esquerda ou à direita da posição do cliente, dependendo da posição do cursor em relação ao centro horizontal do gráfico.",
    de: "Verwenden Sie dieses Composable, damit Tooltips automatisch links oder rechts von der Client-Position positioniert werden, abhängig von der Position des Cursors relativ zur horizontalen Mitte des Diagramms.",
    zh: "使用此组合式函数，可根据光标相对于图表水平中心的位置，自动将工具提示定位在客户端位置的左侧或右侧。",
    ja: "このコンポーザブルを使用すると、カーソル位置がチャートの水平中央に対してどこにあるかに応じて、ツールチップをクライアント位置の左側または右側に自動配置できます。",
    es: "Use este composable para que la información sobre herramientas se posicione automáticamente a la izquierda o a la derecha de la posición del cliente, según la posición del cursor respecto al centro horizontal del gráfico.",
    ko: "이 컴포저블을 사용하면 커서 위치가 차트의 가로 중심을 기준으로 어디에 있는지에 따라 툴팁이 클라이언트 위치의 왼쪽 또는 오른쪽에 자동으로 배치됩니다.",
    ar: "استخدم هذا الـ composable لجعل التلميحات تظهر تلقائيًا إما على يسار أو يمين موضع العميل، بحسب موضع المؤشر بالنسبة إلى المركز الأفقي للرسم البياني."
  },
  chartRef: {
    en: 'Add this ref to the chart component in the template.',
    fr: 'Ajoutez cette ref au composant de graphique dans le template.',
    pt: 'Adicione esta ref ao componente de gráfico no template.',
    de: 'Fügen Sie diese Ref der Diagrammkomponente im Template hinzu.',
    zh: '将此 ref 添加到模板中的图表组件。',
    ja: 'この ref をテンプレート内のチャートコンポーネントに追加します。',
    es: 'Agregue esta ref al componente de gráfico en la plantilla.',
    ko: '이 ref를 템플릿의 차트 컴포넌트에 추가하세요.',
    ar: 'أضف هذا الـ ref إلى مكوّن الرسم البياني في القالب.'
  },
  tooltipPosition: {
    en: 'Use this variable in the tooltip.position configuration',
    fr: 'Utilisez cette variable dans la configuration tooltip.position',
    pt: 'Use esta variável na configuração tooltip.position',
    de: 'Verwenden Sie diese Variable in der tooltip.position-Konfiguration',
    zh: '在 tooltip.position 配置中使用此变量',
    ja: 'この変数を tooltip.position 設定で使用します',
    es: 'Use esta variable en la configuración tooltip.position',
    ko: 'tooltip.position 구성에서 이 변수를 사용하세요',
    ar: 'استخدم هذا المتغير في إعداد tooltip.position'
  },
  example: {
    en: 'Example for the VueUiXy component',
    fr: 'Exemple pour le composant VueUiXy',
    pt: 'Exemplo para o componente VueUiXy',
    de: 'Beispiel für die VueUiXy-Komponente',
    zh: 'VueUiXy 组件示例',
    ja: 'VueUiXy コンポーネントの例',
    es: 'Ejemplo para el componente VueUiXy',
    ko: 'VueUiXy 컴포넌트 예제',
    ar: 'مثال لمكوّن VueUiXy'
  }
});

const codeScript = computed(() => {
  return `import { useTooltipPosition } from "vue-data-ui/composables";
  
// ${composableTranslations.value.chartRef[store.lang]}
const chartRef = useTemplateRef('chartRef');

// ${composableTranslations.value.tooltipPosition[store.lang]} 
const tooltipPosition = useTooltipPosition(chartRef);

// ${composableTranslations.value.example[store.lang]} 
const config = computed<VueUiXyConfig>(() => ({
  chart: {
    tooltip: {
      position: tooltipPosition.value,
      offsetX: 24,
      offsetY: -54
    },
    zoom: {
      keepState: true,
    }
  }
}))
  `
});

const dataset = [
  {
    name: 'Series A',
    type: 'line',
    series: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
    smooth: true
  },
  {
    name: 'Series A',
    type: 'bar',
    series: [89, 55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0],
  },
]

const chartRef = useTemplateRef('chartRef');

const tooltipPosition = useTooltipPosition(chartRef);

const config = computed(() => ({
  theme: isDarkMode.value ? 'dark' : '',
  chart: {
    userOptions: { show: false },
    tooltip: {
      position: tooltipPosition.value,
      offsetX: 24,
      offsetY: -54
    },
    zoom: {
      keepState: true,
      minimap: {
        show: true
      }
    }
  }
}))

</script>

<template>
    <div>
        <h1
            class="mt-[124px] flex flex-row place-items-center w-full justify-center gap-5 font-inter-medium text-app-blue mb-2 text-2xl"
        >
            <VueUiIcon name="vueDataUi" stroke="#42d392" :strokeWidth="1.5" />
            <span
                ><span class="text-black dark:text-app-blue-light">Composables</span></span
            >
        </h1>

        <BaseCard class="mt-12">
          <div class="p-4" dir="auto">
            <code class="text-xl">useTooltipPosition</code>
            <p class="mt-2 text-gray-500 dark:text-app-blue-light">
              {{ composableTranslations.useTooltipPosition[store.lang] }}
            </p>
          </div>
          <CodeParser language="typescript" :content="codeScript"/>
          <div class="max-w-[700px] mx-auto mt-4 p-4 rounded-md bg-white dark:bg-[#1A1A1A] shadow-md">
            <VueUiXy ref="chartRef" :dataset :config/>
          </div>
        </BaseCard>

    </div>
</template>