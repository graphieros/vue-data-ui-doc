<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import FlexibleTooltip from './FlexibleTooltip.vue';
import BaseCard from "./BaseCard.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);

const t = ref({
    title: {
        en: "Chart menu",
        fr: "Menu du graphique",
        pt: "Menu do gráfico",
        de: "Diagrammmenü",
        zh: "图表菜单",
        jp: "チャートメニュー",
        es: "Menú del gráfico",
        ko: "차트 메뉴",
        ar: "قائمة الرسم البياني"
    },
    description: {
        en: "All charts propose a menu with a variable set of actions, depending on the type of chart. This menu can be hidden through the configuration, or each action can be shown or hidden. It is also possible to customize the looks of the menu, if you prefer to use your own icons or labels.",
        fr: "Tous les graphiques proposent un menu avec un ensemble variable d'actions, en fonction du type de graphique. Ce menu peut être masqué via la configuration, ou chaque action peut être affichée ou masquée. Il est également possible de personnaliser l'apparence du menu si vous préférez utiliser vos propres icônes ou étiquettes.",
        pt: "Todos os gráficos oferecem um menu com um conjunto variável de ações, dependendo do tipo de gráfico. Este menu pode ser ocultado por meio da configuração, ou cada ação pode ser exibida ou ocultada. Também é possível personalizar a aparência do menu, caso prefira usar seus próprios ícones ou rótulos.",
        de: "Alle Diagramme bieten ein Menü mit einer variablen Reihe von Aktionen, abhängig vom Diagrammtyp. Dieses Menü kann über die Konfiguration ausgeblendet werden, oder jede Aktion kann ein- oder ausgeblendet werden. Es ist auch möglich, das Aussehen des Menüs anzupassen, wenn Sie lieber eigene Symbole oder Beschriftungen verwenden möchten.",
        zh: "所有图表都提供一个菜单，其中包含根据图表类型而变化的一组操作。此菜单可以通过配置隐藏，也可以显示或隐藏每个操作。如果您更喜欢使用自己的图标或标签，还可以自定义菜单的外观。",
        jp: "すべてのチャートは、チャートの種類に応じて可変のアクションセットを含むメニューを提供します。このメニューは設定で非表示にすることができ、各アクションを個別に表示または非表示にすることも可能です。また、独自のアイコンやラベルを使用したい場合、メニューの外観をカスタマイズすることもできます。",
        es: "Todos los gráficos ofrecen un menú con un conjunto variable de acciones, dependiendo del tipo de gráfico. Este menú puede ocultarse a través de la configuración, o cada acción puede mostrarse u ocultarse. También es posible personalizar la apariencia del menú si prefieres usar tus propios iconos o etiquetas.",
        ko: "모든 차트는 차트 유형에 따라 다양한 동작 세트를 포함하는 메뉴를 제공합니다. 이 메뉴는 설정을 통해 숨길 수 있으며 각 동작은 개별적으로 표시하거나 숨길 수 있습니다. 또한, 메뉴의 외형을 사용자 정의하여 자신만의 아이콘이나 레이블을 사용할 수도 있습니다.",
        ar: "تقدم جميع الرسوم البيانية قائمة تحتوي على مجموعة متنوعة من الإجراءات، حسب نوع الرسم البياني. يمكن إخفاء هذه القائمة من خلال الإعدادات، أو يمكن إظهار أو إخفاء كل إجراء بشكل منفصل. كما يمكن تخصيص مظهر القائمة إذا كنت تفضل استخدام الأيقونات أو التسميات الخاصة بك."
    },
    tooltip: {
        en: "Toggles tooltip visibility",
        fr: "Bascule la visibilité de l'infobulle",
        pt: "Alterna a visibilidade da dica de ferramenta",
        de: "Schaltet die Sichtbarkeit des Tooltips um",
        zh: "切换工具提示的可见性",
        jp: "ツールチップの表示を切り替えます",
        es: "Alterna la visibilidad del tooltip",
        ko: "툴팁 가시성을 전환합니다",
        ar: "تبديل رؤية التلميحات"
    },
    pdf: {
        en: "Downloads the chart as PDF",
        fr: "Télécharge le graphique au format PDF",
        pt: "Faz o download do gráfico em PDF",
        de: "Lädt das Diagramm als PDF herunter",
        zh: "将图表下载为 PDF",
        jp: "チャートをPDFとしてダウンロードします",
        es: "Descarga el gráfico como PDF",
        ko: "차트를 PDF로 다운로드합니다",
        ar: "تنزيل الرسم البياني كملف PDF"
    },
    csv: {
        en: "Downloads the dataset as CSV",
        fr: "Télécharge l'ensemble de données au format CSV",
        pt: "Faz o download do conjunto de dados em CSV",
        de: "Lädt den Datensatz als CSV herunter",
        zh: "将数据集下载为 CSV",
        jp: "データセットをCSVとしてダウンロードします",
        es: "Descarga el conjunto de datos como CSV",
        ko: "데이터 세트를 CSV로 다운로드합니다",
        ar: "تنزيل مجموعة البيانات كملف CSV"
    },
    img: {
        en: "Downloads the chart as PNG",
        fr: "Télécharge le graphique au format PNG",
        pt: "Faz o download do gráfico em PNG",
        de: "Lädt das Diagramm als PNG herunter",
        zh: "将图表下载为 PNG",
        jp: "チャートをPNGとしてダウンロードします",
        es: "Descarga el gráfico como PNG",
        ko: "차트를 PNG로 다운로드합니다",
        ar: "تنزيل الرسم البياني كملف PNG"
    },
    svg: {
        en: "Downloads the chart as SVG",
        fr: "Télécharge le graphique au format SVG",
        pt: "Faz o download do gráfico em SVG",
        de: "Lädt das Diagramm als SVG herunter",
        zh: "将图表下载为 SVG",
        jp: "チャートをSVGとしてダウンロードします",
        es: "Descarga el gráfico como SVG",
        ko: "차트를 SVG로 다운로드합니다",
        ar: "تنزيل الرسم البياني كملف SVG"
    },
    table: {
        en: "Toggles the data table visibility",
        fr: "Bascule la visibilité du tableau de données",
        pt: "Alterna a visibilidade da tabela de dados",
        de: "Schaltet die Sichtbarkeit der Datentabelle um",
        zh: "切换数据表的可见性",
        jp: "データテーブルの表示を切り替えます",
        es: "Alterna la visibilidad de la tabla de datos",
        ko: "데이터 테이블 가시성을 전환합니다",
        ar: "تبديل رؤية جدول البيانات"
    },
    labels: {
        en: "Toggles data labels visibility",
        fr: "Bascule la visibilité des étiquettes de données",
        pt: "Alterna a visibilidade dos rótulos de dados",
        de: "Schaltet die Sichtbarkeit der Datenbeschriftungen um",
        zh: "切换数据标签的可见性",
        jp: "データラベルの表示を切り替えます",
        es: "Alterna la visibilidad de las etiquetas de datos",
        ko: "데이터 레이블 가시성을 전환합니다",
        ar: "تبديل رؤية تسميات البيانات"
    },
    stack: {
        en: "Toggles the stack mode",
        fr: "Bascule le mode empilement",
        pt: "Alterna o modo de empilhamento",
        de: "Schaltet den Stapelmodus um",
        zh: "切换堆叠模式",
        jp: "スタックモードを切り替えます",
        es: "Alterna el modo de apilamiento",
        ko: "스택 모드를 전환합니다",
        ar: "تبديل وضع التكديس"
    },
    fullscreen: {
        en: "Toggles fullscreen mode",
        fr: "Bascule en mode plein écran",
        pt: "Alterna o modo de tela cheia",
        de: "Schaltet den Vollbildmodus um",
        zh: "切换全屏模式",
        jp: "全画面モードを切り替えます",
        es: "Alterna el modo de pantalla completa",
        ko: "전체 화면 모드를 전환합니다",
        ar: "تبديل وضع ملء الشاشة"
    },
    sort: {
        en: "Inverses the sort order",
        fr: "Inverse l'ordre de tri",
        pt: "Inverte a ordem de classificação",
        de: "Kehrt die Sortierreihenfolge um",
        zh: "反转排序顺序",
        jp: "並べ替え順序を反転します",
        es: "Invierte el orden de clasificación",
        ko: "정렬 순서를 반전시킵니다",
        ar: "عكس ترتيب الفرز"
    },
    annotator: {
        en: "Opens the built-in annotator",
        fr: "Ouvre l'annotateur intégré",
        pt: "Abre o anotador integrado",
        de: "Öffnet den integrierten Anmerkungsbereich",
        zh: "打开内置注释工具",
        jp: "組み込みの注釈ツールを開きます",
        es: "Abre el anotador integrado",
        ko: "내장된 주석 도구를 엽니다",
        ar: "يفتح أداة التعليق المدمجة"
    }
})

const charts = ref({
    VueUiQuickChart: { name: 'VueUiQuickChart', icon: 'vueDataUi', link: '/docs#vue-ui-quick-chart'},
    VueUiBullet: { name: 'VueUiBullet', icon: 'chartBullet', link: '/docs#vue-ui-bullet' },
    VueUiXy: { name: 'VueUiXy', icon: 'chartLine', link: '/docs#vue-ui-xy' },
    VueUiXyCanvas: { name: 'VueUiXyCanvas', icon: 'chartLine', link: '/docs#vue-ui-xy-canvas' },
    VueUiVerticalBar: { name: 'VueUiVerticalBar', icon: 'chartVerticalBar', link: '/docs#vue-ui-vertical-bar' },
    VueUiParallelCoordinatePlot: { name: 'VueUiParallelCoordinatePlot', icon: 'chartParallelCoordinatePlot', link: '/docs#vue-ui-parallel-coordinate-plot' },
    VueUiFlow: { name: 'VueUiFlow', icon: 'chartFlow', link: '/docs#vue-ui-flow' },
    VueUiCandlestick: { name: 'VueUiCandlestick', icon: 'chartCandlestick', link: '/docs#vue-ui-candlestick' },
    VueUiAgePyramid: { name: 'VueUiAgePyramid', icon: 'chartAgePyramid', link: '/docs#vue-ui-age-pyramid'},
    VueUiStackbar: { name: 'VueUiStackbar', icon: 'chartStackbar', link: '/docs#vue-ui-stackbar'},
    VueUiDonutEvolution: { name: 'VueUiDonutEvolution', icon: 'chartDonutEvolution', link: '/docs#vue-ui-donut-evolution'},
    VueUiDonut: { name: 'VueUiDonut', icon: 'chartDonut', link: '/docs#vue-ui-donut'},
    VueUiNestedDonuts: { name: 'VueUiNestedDonuts', icon: 'chartNestedDonuts', link: '/docs#vue-ui-nested-donuts'},
    VueUiWaffle: { name: 'VueUiWaffle', icon: 'chartWaffle', link: '/docs#vue-ui-waffle'},
    VueUiHeatmap: { name: 'VueUiHeatmap', icon: 'chartHeatmap', link: '/docs#vue-ui-heatmap'},
    VueUiTreemap: { name: 'VueUiTreemap', icon: 'chartTreemap', link: '/docs#vue-ui-treemap'},
    VueUiRings: { name: 'VueUiRings', icon: 'chartRings', link: '/docs#vue-ui-rings'},
    VueUiGalaxy: { name: 'VueUiGalaxy', icon: 'chartGalaxy', link: '/docs#vue-ui-galaxy'},
    VueUiChestnut: { name: 'VueUiChestnut', icon: 'chartChestnut', link: '/docs#vue-ui-chestnut'},
    VueUiGauge: { name: 'VueUiGauge', icon: 'chartGauge', link: '/docs#vue-ui-gauge'},
    VueUiOnion: { name: 'VueUiOnion', icon: 'chartOnion', link: '/docs#vue-ui-onion' },
    VueUiWheel: { name: 'VueUiWheel', icon: 'chartWheel', link: '/docs#vue-ui-wheel'},
    VueUiTiremarks: { name: 'VueUiTiremarks', icon: 'chartTiremarks', link: '/docs#vue-ui-tiremarks'},
    VueUiThermometer: { name: 'VueUiThermometer', icon: 'chartThermometer', link: '/docs#vue-ui-thermometer'},
    VueUiWordCloud: { name: 'VueUiWordCloud', icon: 'chartWordCloud', link: '/docs#vue-ui-word-cloud'},
    VueUiRelationCircle: { name: 'VueUiRelationCircle', icon: 'chartRelationCircle', link: '/docs#vue-ui-relation-circle'},
    VueUiRadar: { name: 'VueUiRadar', icon: 'chartRadar', link: '/docs#vue-ui-radar'},
    VueUiMoodRadar: { name: 'VueUiMoodRadar', icon: 'chartMoodRadar', link: '/docs#vue-ui-mood-radar'},
    VueUiQuadrant: { name: 'VueUiQuadrant', icon: 'chartQuadrant', link: '/docs#vue-ui-quadrant'},
    VueUiScatter: { name: 'VueUiScatter', icon: 'chartScatter', link: '/docs#vue-ui-scatter'},
    VueUiMolecule: { name: 'VueUiMolecule', icon: 'chartCluster', link: '/docs#vue-ui-molecule'},
    VueUiStripPlot: { name: 'VueUiStripPlot', icon: 'chartStripPlot', link: '/docs#vue-ui-strip-plot'},
    VueUiDumbbell: { name: 'VueUiDumbbell', icon: 'chartDumbbell', link: '/docs#vue-ui-dumbbell'},
    VueUi3dBar: { name: 'VueUi3dBar', icon: 'chart3dBar', link: '/docs#vue-ui-3d-bar'},
    VueUiCirclePack: { name: 'VueUiCirclePack', icon: 'chartCirclePack', link: '/docs#vue-ui-circle-pack'}
})

const items = ref([
    {
        name: 'tooltip',
        icon: 'tooltip',
        charts: ['VueUiQuickChart', 'VueUiXy', 'VueUiXyCanvas', 'VueUiVerticalBar', 'VueUiParallelCoordinatePlot', 'VueUiCandlestick', 'VueUiAgePyramid', 'VueUiStackbar', 'VueUiDonut', 'VueUiNestedDonuts', 'VueUiWaffle', 'VueUiHeatmap', 'VueUiTreemap', 'VueUiRings', 'VueUiGalaxy', 'VueUiOnion', 'VueUiWordCloud', 'VueUiRadar', 'VueUiQuadrant', 'VueUiScatter', 'VueUiMolecule', 'VueUiStripPlot']
    },
    {
        name: 'pdf',
        icon: 'pdf',
        charts: Object.keys(charts.value)
    },
    {
        name: 'csv',
        icon: 'excel',
        charts: ['VueUiXy', 'VueUiXyCanvas', 'VueUiVerticalBar', 'VueUiParallelCoordinatePlot', 'VueUiFlow', 'VueUiCandlestick', 'VueUiAgePyramid', 'VueUiStackbar', 'VueUiDonutEvolution', 'VueUiDonut', 'VueUiNestedDonuts', 'VueUiWaffle', 'VueUiHeatmap', 'VueUiTreemap', 'VueUiRings', 'VueUiGalaxy', 'VueUiChestnut', 'VueUiOnion', 'VueUiWordCloud', 'VueUiRadar', 'VueUiMoodRadar', 'VueUiQuadrant', 'VueUiScatter', 'VueUiMolecule', 'VueUiStripPlot', 'VueUiDumbbell', 'VueUi3dBar', 'VueUiCirclePack']
    },
    {
        name: 'img',
        icon: 'image',
        charts: Object.keys(charts.value)
    },
    {
        name: 'svg',
        icon: 'svg',
        charts: Object.keys(charts.value).filter(k => k !== 'VueUiXyCanvas')
    },
    {
        name: 'table',
        icon:  'tableOpen',
        charts: ['VueUiXy', 'VueUiXyCanvas', 'VueUiVerticalBar', 'VueUiParallelCoordinatePlot', 'VueUiFlow', 'VueUiCandlestick', 'VueUiAgePyramid', 'VueUiStackbar', 'VueUiDonutEvolution', 'VueUiDonut', 'VueUiNestedDonuts', 'VueUiWaffle', 'VueUiHeatmap', 'VueUiTreemap', 'VueUiRings', 'VueUiGalaxy', 'VueUiChestnut', 'VueUiOnion', 'VueUiWordCloud', 'VueUiRadar', 'VueUiMoodRadar', 'VueUiQuadrant', 'VueUiScatter', 'VueUiMolecule', 'VueUiStripPlot', 'VueUiDumbbell', 'VueUi3dBar', 'VueUiCirclePack']
    },
    {
        name: 'labels',
        icon: 'labelOpen',
        charts: ['VueUiXy', 'VueUiXyCanvas', 'VueUiParallelCoordinatePlot', 'VueUiStackbar', 'VueUiDonut', 'VueUiNestedDonuts', 'VueUiQuadrant', 'VueUiMolecule', 'VueUiStripPlot']
    },
    {
        name: 'stack',
        icon: 'stack',
        charts: ['VueUiXy', 'VueUiXyCanvas']
    },
    {
        name: 'fullscreen',
        icon: 'fullscreen',
        charts: Object.keys(charts.value)
    },
    {
        name: 'sort',
        icon: 'sort',
        charts: ['VueUiVerticalBar']
    },
    {
        name: 'annotator',
        icon: 'annotator',
        charts: Object.keys(charts.value)
    }
])

</script>

<template>
    <BaseCard class="mx-auto max-w-[1000px] mt-6">
        <div class="rounded-lg overflow-hidden">
            <div class="mx-6 my-6">
                <h3 class="text-2xl font-black mb-2">
                    {{ t.title[store.lang] }}
                </h3>
                <p>
                    {{ t.description[store.lang] }}
                </p>
            </div>
            <div class="w-full flex justify-center">
                <video v-if="isDarkMode" controls width="500" loop="true" autoplay="true">
                    <source src="../assets/user_options.mp4" type="video/mp4" />
                </video>
                <video v-else controls width="500" loop="true" autoplay="true">
                    <source src="../assets/user_options_light.mp4" type="video/mp4" />
                </video>
            </div>
            <div class="mx-6">
                <table class="schema table-auto border-collapse border border-gray-400 dark:border-gray-500 my-4 w-full">
                    <thead>
                        <tr class="bg-[#FFFFFF15]">
                            <th class="border border-slate-600 p-2">{{ translations.overview.icon[store.lang] }}</th>
                            <th class="border border-slate-600 p-2">{{ translations.overview.description[store.lang] }}</th>
                            <th class="border border-slate-600 p-2">{{ translations.overview.component[store.lang] }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-[#FFFFFF05]" v-for="option in items">
                            <td class="p-2 border border-gray-400 dark:border-gray-500 bg-[#FFFFFF10]">
                                <div class="w-full flex justify-center">
                                    <VueUiIcon :name="option.icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                                </div>
                            </td>
                            <td class="p-2 border border-gray-400 dark:border-gray-500 text-xs">
                                {{ t[option.name][store.lang] }}
                            </td>
                            <td class="p-2 border border-gray-400 dark:border-gray-500 text-xs">
                                <div class="flex flex-row flex-wrap gap-2 max-w-[500px]">
                                    <FlexibleTooltip
                                        v-for="c in option.charts"
                                        position="bottom" 
                                        :content="charts[c].name" 
                                        width="w-fit min-w-[120px]" 
                                        delay="delay-150"
                                    >
                                        <RouterLink :to="charts[c].link">
                                            <div class="relative flex place-items-center justify-center p-2 border border-gray-200 dark:border-[#FFFFFF10] hover:bg-[#5f8aee30] hover:shadow-md hover:border-app-blue dark:hover:border-app-blue transition-all pb-3">
                                                <VueUiIcon :name="charts[c].icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'" class="-mt-1" />
                                                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[6px] pb-[2px]">
                                                    {{ charts[c].name === 'VueUiParallelCoordinatePlot' ? 'PCP' : charts[c].name.replace('VueUi', '') }}
                                                </div>
                                            </div>
                                        </RouterLink>
                                    </FlexibleTooltip>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </BaseCard>
</template>