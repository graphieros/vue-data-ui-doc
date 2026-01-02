import { computed } from "vue"
import { useMainStore } from "./stores"

export default function useCharts() {
    const store = useMainStore()
    const translations = computed(() => store.translations)

    const classification = computed(() => {
        return {
            dataOverTime: {
                en: "data over time",
                fr: "données dans le temps",
                pt: "dados ao longo do tempo",
                de: "Daten im Laufe der Zeit",
                zh: "随时间变化的数据",
                jp: "時系列データ",
                es: "datos a lo largo del tiempo",
                ko: "시간에 따른 데이터",
                ar: "البيانات مع مرور الوقت"
            },
            proportions: {
                en: "proportions",
                fr: "proportions",
                pt: "proporções",
                de: "Proportionen",
                zh: "比例",
                jp: "割合",
                es: "proporciones",
                ko: "비율",
                ar: "النسب"
            },
            comparisons: {
                en: "comparisons",
                fr: "comparaisons",
                pt: "comparações",
                de: "Vergleiche",
                zh: "比较",
                jp: "比較",
                es: "comparaciones",
                ko: "비교",
                ar: "المقارنات"
            },
            rating: {
                en: "rating",
                fr: "évaluation",
                pt: "classificação",
                de: "Bewertung",
                zh: "评分",
                jp: "評価",
                es: "clasificación",
                ko: "평점",
                ar: "التقييم"
            },
            dataTables: {
                en: "data tables",
                fr: "tableaux de données",
                pt: "tabelas de dados",
                de: "Datentabellen",
                zh: "数据表",
                jp: "データテーブル",
                es: "tablas de datos",
                ko: "데이터 테이블",
                ar: "جداول البيانات"
            },
            relationships: {
                en: "relationships",
                fr: "relations",
                pt: "relacionamentos",
                de: "Beziehungen",
                zh: "关系",
                jp: "関係",
                es: "relaciones",
                ko: "관계",
                ar: "العلاقات"
            },
            hierarchy: {
                en: "hierarchy",
                fr: "hiérarchie",
                pt: "hierarquia",
                de: "Hierarchie",
                zh: "层级",
                jp: "階層",
                es: "jerarquía",
                ko: "계층",
                ar: "التسلسل الهرمي"
            },
            partToAWhole: {
                en: "part to a whole",
                fr: "partie à un tout",
                pt: "parte para um todo",
                de: "Teil eines Ganzen",
                zh: "整体的一部分",
                jp: "全体の一部",
                es: "parte de un todo",
                ko: "전체의 일부",
                ar: "جزء من الكل"
            },
            distribution: {
                en: "distribution",
                fr: "distribution",
                pt: "distribuição",
                de: "Verteilung",
                zh: "分布",
                jp: "分布",
                es: "distribución",
                ko: "분포",
                ar: "التوزيع"
            },
            range: {
                en: "range",
                fr: "plage",
                pt: "alcance",
                de: "Bereich",
                zh: "范围",
                jp: "範囲",
                es: "rango",
                ko: "범위",
                ar: "النطاق"
            },
            semantic: {
                en: "semantic",
                fr: "sémantique",
                pt: "semântico",
                de: "semantisch",
                zh: "语义",
                jp: "セマンティック",
                es: "semántico",
                ko: "의미론적",
                ar: "الدلالي"
            },
            uiTools: {
                en: "UI tools",
                fr: "outils UI",
                pt: "ferramentas UI",
                de: "UI-Tools",
                zh: "UI 工具",
                jp: "UIツール",
                es: "herramientas de UI",
                ko: "UI 도구",
                ar: "أدوات واجهة المستخدم"
            },
            maps: {
                en: 'Maps',
                fr: 'Cartes',
                pt: 'Mapas',
                de: 'Karten',
                zh: '地图',
                jp: '地図',
                es: 'Mapas',
                ko: '지도',
                ar: 'خرائط'
            }
        }
    });

    const classificationDescription = computed(() => {
        return {
            dataOverTime: {
                en: "Visualization methods that show data over a time period to display as a way to find trends or changes over time.",
                fr: "Méthodes de visualisation qui montrent des données sur une période pour détecter des tendances ou des changements.",
                pt: "Métodos de visualização que mostram dados ao longo de um período para identificar tendências ou mudanças.",
                de: "Visualisierungsmethoden, die Daten über einen Zeitraum hinweg anzeigen, um Trends oder Veränderungen zu erkennen.",
                zh: "显示一段时间内数据的方法，用于发现趋势或变化。",
                jp: "データを一定期間にわたって表示し、傾向や変化を見つけるための視覚化方法。",
                es: "Métodos de visualización que muestran datos a lo largo de un período para identificar tendencias o cambios.",
                ko: "기간 동안 데이터를 보여주어 트렌드나 변화를 찾는 시각화 방법.",
                ar: "طرق العرض التي تُظهر البيانات خلال فترة زمنية لتحديد الاتجاهات أو التغيرات."
            },
            proportions: {
                en: "Visualization methods that use size or area to show differences or similarities between values or for parts to a whole.",
                fr: "Méthodes de visualisation utilisant la taille ou la surface pour montrer les différences ou les similitudes entre les valeurs ou les parties d'un tout.",
                pt: "Métodos de visualização que usam tamanho ou área para mostrar diferenças ou semelhanças entre valores ou partes de um todo.",
                de: "Visualisierungsmethoden, die Größe oder Fläche verwenden, um Unterschiede oder Ähnlichkeiten zwischen Werten oder Teile eines Ganzen darzustellen.",
                zh: "使用大小或面积来展示值之间的差异或相似性，或者部分与整体关系的方法。",
                jp: "サイズや面積を使用して値の違いや類似性、または部分と全体を示す視覚化方法。",
                es: "Métodos de visualización que utilizan tamaño o área para mostrar diferencias o similitudes entre valores o partes de un todo.",
                ko: "크기나 면적을 사용하여 값 간의 차이나 유사성을 나타내거나 전체의 일부를 보여주는 시각화 방법.",
                ar: "طرق العرض التي تستخدم الحجم أو المساحة لإظهار الاختلافات أو التشابهات بين القيم أو بين أجزاء الكل."
            },
            comparisons: {
                en: "Visualisation methods that help show the differences or similarities between values.",
                fr: "Méthodes de visualisation qui aident à montrer les différences ou les similitudes entre les valeurs.",
                pt: "Métodos de visualização que ajudam a mostrar as diferenças ou semelhanças entre valores.",
                de: "Visualisierungsmethoden, die helfen, Unterschiede oder Ähnlichkeiten zwischen Werten aufzuzeigen.",
                zh: "帮助展示值之间差异或相似性的方法。",
                jp: "値の違いや類似性を示すための視覚化方法。",
                es: "Métodos de visualización que ayudan a mostrar las diferencias o similitudes entre valores.",
                ko: "값 간의 차이점이나 유사성을 보여주는 시각화 방법.",
                ar: "طرق العرض التي تساعد في إظهار الاختلافات أو التشابهات بين القيم."
            },
            rating: {
                en: "Rating components to show rating results or ask users to rate a topic.",
                fr: "Composants d'évaluation pour afficher les résultats ou demander aux utilisateurs d'évaluer un sujet.",
                pt: "Componentes de classificação para mostrar resultados ou pedir aos usuários que avaliem um tópico.",
                de: "Bewertungskomponenten, um Ergebnisse anzuzeigen oder Benutzer aufzufordern, ein Thema zu bewerten.",
                zh: "用于显示评分结果或要求用户对主题进行评分的组件。",
                jp: "評価結果を表示したり、ユーザーにトピックを評価してもらうためのコンポーネント。",
                es: "Componentes de calificación para mostrar resultados o pedir a los usuarios que califiquen un tema.",
                ko: "평가 결과를 표시하거나 사용자가 주제를 평가하도록 요청하는 구성 요소.",
                ar: "مكونات التقييم لإظهار النتائج أو طلب تقييم المستخدمين لموضوع معين."
            },
            dataTables: {
                en: "Table components to organize and highlight trends in a dataset.",
                fr: "Composants de tableau pour organiser et mettre en évidence les tendances dans un ensemble de données.",
                pt: "Componentes de tabela para organizar e destacar tendências em um conjunto de dados.",
                de: "Tabellenkomponenten zur Organisation und Hervorhebung von Trends in einem Datensatz.",
                zh: "用于组织和突出数据集中趋势的表格组件。",
                jp: "データセットの傾向を整理し、強調するためのテーブルコンポーネント。",
                es: "Componentes de tabla para organizar y resaltar tendencias en un conjunto de datos.",
                ko: "데이터셋의 트렌드를 정리하고 강조하기 위한 테이블 구성 요소.",
                ar: "مكونات الجداول لتنظيم وإبراز الاتجاهات في مجموعة البيانات."
            },
            relationships: {
                en: "Visualization methods that show relationships and connections between the data or show correlations between two or more variables.",
                fr: "Méthodes de visualisation qui montrent les relations et connexions entre les données ou les corrélations entre deux ou plusieurs variables.",
                pt: "Métodos de visualização que mostram relações e conexões entre os dados ou correlações entre duas ou mais variáveis.",
                de: "Visualisierungsmethoden, die Beziehungen und Verbindungen zwischen Daten oder Korrelationen zwischen zwei oder mehr Variablen darstellen.",
                zh: "展示数据之间关系或两个或多个变量之间相关性的方法。",
                jp: "データ間の関係や接続、または2つ以上の変数間の相関を示す視覚化方法。",
                es: "Métodos de visualización que muestran relaciones y conexiones entre los datos o correlaciones entre dos o más variables.",
                ko: "데이터 간의 관계와 연결 또는 두 개 이상의 변수 간의 상관관계를 보여주는 시각화 방법.",
                ar: "طرق العرض التي تظهر العلاقات والروابط بين البيانات أو العلاقات بين متغيرين أو أكثر."
            },
            hierarchy: {
                en: "Visualization methods that show how data or objects are ranked and ordered together in an organisation or system.",
                fr: "Méthodes de visualisation montrant comment les données ou objets sont classés et ordonnés dans une organisation ou un système.",
                pt: "Métodos de visualização que mostram como os dados ou objetos são classificados e ordenados em uma organização ou sistema.",
                de: "Visualisierungsmethoden, die zeigen, wie Daten oder Objekte in einer Organisation oder einem System geordnet und eingestuft sind.",
                zh: "展示数据或对象如何在组织或系统中排序和排名的可视化方法。",
                jp: "データやオブジェクトが組織やシステム内でどのようにランク付けおよび整理されているかを示す可視化方法。",
                es: "Métodos de visualización que muestran cómo los datos u objetos están clasificados y ordenados en una organización o sistema.",
                ko: "데이터나 객체가 조직이나 시스템 내에서 어떻게 계층화되고 정렬되는지를 보여주는 시각화 방법.",
                ar: "طرق عرض البيانات التي توضح كيف يتم تصنيف وترتيب البيانات أو الكائنات في منظمة أو نظام."
            },
            partToAWhole: {
                en: "Visualisation methods that show part (or parts) of a variable to its total. Often used to show how something is divided up.",
                fr: "Méthodes de visualisation montrant une partie (ou des parties) d'une variable par rapport à son total. Souvent utilisées pour montrer comment quelque chose est divisé.",
                pt: "Métodos de visualização que mostram parte (ou partes) de uma variável em relação ao total. Frequentemente usados para mostrar como algo é dividido.",
                de: "Visualisierungsmethoden, die einen Teil (oder Teile) einer Variablen im Verhältnis zu ihrem Gesamtwert zeigen. Oft verwendet, um zu zeigen, wie etwas aufgeteilt ist.",
                zh: "展示变量的一部分（或部分）与其总量的可视化方法。常用于展示某事物的划分方式。",
                jp: "変数の一部（または複数部分）が全体に対してどのように構成されているかを示す可視化方法。何かの分割を示す際によく使用されます。",
                es: "Métodos de visualización que muestran parte (o partes) de una variable respecto a su total. A menudo se usan para mostrar cómo se divide algo.",
                ko: "변수의 일부(또는 여러 부분)가 전체와 어떻게 연관되는지를 보여주는 시각화 방법. 무언가가 어떻게 나뉘어지는지를 보여줄 때 자주 사용됩니다.",
                ar: "طرق عرض البيانات التي توضح جزء (أو أجزاء) من متغير بالنسبة إلى إجماليه. غالبًا ما تُستخدم لعرض كيفية تقسيم شيء ما."
            },
            distribution: {
                en: "Visualization methods that display frequency, how data spread out over an interval or is grouped.",
                fr: "Méthodes de visualisation affichant la fréquence, la répartition des données sur un intervalle ou leur regroupement.",
                pt: "Métodos de visualização que exibem frequência, como os dados se distribuem em um intervalo ou são agrupados.",
                de: "Visualisierungsmethoden, die die Häufigkeit und Verteilung von Daten über ein Intervall oder deren Gruppierung anzeigen.",
                zh: "展示频率、数据在区间内的分布或分组的可视化方法。",
                jp: "頻度、データが区間内でどのように分布またはグループ化されているかを示す可視化方法。",
                es: "Métodos de visualización que muestran la frecuencia, cómo los datos se distribuyen en un intervalo o se agrupan.",
                ko: "빈도 및 데이터가 간격에 따라 어떻게 분산되거나 그룹화되는지를 표시하는 시각화 방법.",
                ar: "طرق عرض البيانات التي تعرض التردد وكيفية انتشار البيانات على فترة زمنية أو تجميعها."
            },
            range: {
                en: "Visualization methods that display the variations between upper and lower limits on a scale.",
                fr: "Méthodes de visualisation affichant les variations entre les limites supérieure et inférieure sur une échelle.",
                pt: "Métodos de visualização que exibem as variações entre os limites superior e inferior em uma escala.",
                de: "Visualisierungsmethoden, die die Variationen zwischen oberen und unteren Grenzwerten auf einer Skala anzeigen.",
                zh: "展示标尺上上下限之间变化的可视化方法。",
                jp: "スケールの上下限間の変動を表示する可視化方法。",
                es: "Métodos de visualización que muestran las variaciones entre los límites superior e inferior en una escala.",
                ko: "스케일의 상한선과 하한선 간의 변화를 표시하는 시각화 방법.",
                ar: "طرق عرض البيانات التي تعرض التغيرات بين الحدود العليا والسفلى على مقياس."
            },
            semantic: {
                en: "Visualisation methods that reveal patterns and insights from textual sources.",
                fr: "Méthodes de visualisation révélant des motifs et des idées à partir de sources textuelles.",
                pt: "Métodos de visualização que revelam padrões e percepções de fontes textuais.",
                de: "Visualisierungsmethoden, die Muster und Erkenntnisse aus Textquellen aufdecken.",
                zh: "从文本来源中揭示模式和见解的可视化方法。",
                jp: "テキスト情報からパターンや洞察を明らかにする可視化方法。",
                es: "Métodos de visualización que revelan patrones e ideas a partir de fuentes textuales.",
                ko: "텍스트 소스에서 패턴과 통찰력을 드러내는 시각화 방법.",
                ar: "طرق عرض البيانات التي تكشف الأنماط والرؤى من المصادر النصية."
            },
            uiTools: {
                en: "Cool tools to level-up your UI.",
                fr: "Outils sympas pour améliorer votre interface utilisateur.",
                pt: "Ferramentas incríveis para melhorar sua interface de usuário.",
                de: "Coole Tools, um Ihre Benutzeroberfläche aufzuwerten.",
                zh: "提升用户界面的酷炫工具。",
                jp: "UIをレベルアップさせるクールなツール。",
                es: "Herramientas geniales para mejorar tu interfaz de usuario.",
                ko: "UI를 업그레이드할 멋진 도구들.",
                ar: "أدوات رائعة لتحسين واجهة المستخدم الخاصة بك."
            },
            maps: {
                en: "Maps",
                fr: "Cartes",
                pt: "Mapas",
                de: "Karten",
                zh: "地图",
                jp: "地図",
                es: "Mapas",
                ko: "지도",
                ar: "خرائط"
            }
        }
    })


    const taxinomy = computed(() => {
        return {
            VueUiGeo: {
                icon: 'chartGeo',
                link: '/docs#vue-ui-geo',
                description: translations.value.docs.tooltips.geo[store.lang],
                taxinomy: ['maps'],
                singleTaxinomy: 'maps',
            },
            VueUiWorld: {
                icon: 'world',
                link: '/docs#vue-ui-world',
                description: translations.value.docs.tooltips.world[store.lang],
                taxinomy: ['maps'],
                singleTaxinomy: 'maps',
            },
            VueUiXy: {
                icon: 'chartLine',
                link: '/docs#vue-ui-xy',
                description: translations.value.docs.tooltips.xy[store.lang],
                taxinomy: ['comparisons', 'distribution', 'dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
            VueUiXyCanvas: {
                icon: 'chartLine',
                link: '/docs#vue-ui-xy-canvas',
                description: translations.value.docs.tooltips.xyCanvas[store.lang],
                taxinomy: ['comparisons', 'distribution', 'dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
            VueUiBullet: {
                icon: 'chartBullet',
                link: '/docs#vue-ui-bullet',
                description: translations.value.docs.tooltips.bullet[store.lang],
                taxinomy: ['comparisons', 'range'],
                singleTaxinomy: 'range'
            },
            VueUi3dBar: {
                icon: 'chart3dBar',
                link: '/docs#vue-ui-3d-bar',
                description: translations.value.docs.tooltips.bar3d[store.lang],
                taxinomy: ['comparisons', 'proportions'],
                singleTaxinomy: 'proportions'
            },
            VueUiKpi: {
                icon: 'kpiBox',
                link: '/docs#vue-ui-kpi',
                description: translations.value.docs.tooltips.kpi[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiAccordion: {
                icon: 'accordion',
                link: '/docs#vue-ui-accordion',
                description: translations.value.docs.tooltips.accordion[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiAgePyramid: {
                icon: 'chartAgePyramid',
                link: '/docs#vue-ui-age-pyramid',
                description: translations.value.docs.tooltips.agePyramid[store.lang],
                taxinomy: ['comparisons', 'distribution'],
                singleTaxinomy: 'distribution'
            },
            VueUiAnnotator: {
                icon: 'annotator',
                link: '/docs#vue-ui-annotator',
                description: translations.value.docs.tooltips.annotator[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiCandlestick: {
                icon: 'chartCandlestick',
                link: '/docs#vue-ui-candlestick',
                description: translations.value.docs.tooltips.candlestick[store.lang],
                taxinomy: ['distribution', 'range', 'dataOverTime'],
                singleTaxinomy: 'dataOverTIme'
            },
            VueUiCarouselTable: {
                icon: 'carouselTable',
                link: '/docs#vue-ui-carousel-table',
                description: translations.value.docs.tooltips.carouselTable[store.lang],
                taxinomy: ['dataTables'],
                singleTaxinomy: 'dataTables'
            },
            VueUiChestnut: {
                icon: 'chartChestnut',
                link: '/docs#vue-ui-chestnut',
                description: translations.value.docs.tooltips.chestnut[store.lang],
                taxinomy: ['comparisons', 'proportions', 'hierarchy', 'partToAWhole'],
                singleTaxinomy: 'partToAWhole'
            },
            VueUiCursor: {
                icon: 'cursor',
                link: '/docs#vue-ui-cursor',
                description: translations.value.docs.tooltips.cursor[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiDashboard: {
                icon: 'dashboard',
                link: '/docs#vue-ui-dashboard',
                description: translations.value.docs.tooltips.dashboard[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiDigits: {
                icon: 'digit8',
                link: '/docs#vue-ui-digits',
                description: translations.value.docs.tooltips.digits[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiDonut: {
                icon: 'chartDonut',
                link: '/docs#vue-ui-donut',
                description: translations.value.docs.tooltips.donut[store.lang],
                taxinomy: ['comparisons', 'proportions', 'partToAWhole'],
                singleTaxinomy: 'proportions'
            },
            VueUiDonutEvolution: {
                icon: 'chartDonutEvolution',
                link: '/docs#vue-ui-donut-evolution',
                description: translations.value.docs.tooltips.donutEvolution[store.lang],
                taxinomy: ['comparisons', 'proportions', 'dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
            VueUiDumbbell: {
                icon: 'chartDumbbell',
                link: '/docs#vue-ui-dumbbell',
                description: translations.value.docs.tooltips.dumbbell[store.lang],
                taxinomy: ['comparisons', 'range'],
                singleTaxinomy: 'range'
            },
            VueUiFlow: {
                icon: 'chartFlow',
                link: '/docs#vue-ui-flow',
                description: translations.value.docs.tooltips.flow[store.lang],
                taxinomy: ['proportions', 'distribution'],
                singleTaxinomy: 'distribution'
            },
            VueUiGalaxy: {
                icon: 'chartGalaxy',
                link: '/docs#vue-ui-galaxy',
                description: translations.value.docs.tooltips.galaxy[store.lang],
                taxinomy: ['comparisons', 'proportions'],
                singleTaxinomy: 'proportions'
            },
            VueUiGauge: {
                icon: 'chartGauge',
                link: '/docs#vue-ui-gauge',
                description: translations.value.docs.tooltips.gauge[store.lang],
                taxinomy: ['range'],
                singleTaxinomy: 'range'
            },
            VueUiHeatmap: {
                icon: 'chartHeatmap',
                link: '/docs#vue-ui-heatmap',
                description: translations.value.docs.tooltips.heatmap[store.lang],
                taxinomy: ['comparisons', 'proportions', 'relationships'],
                singleTaxinomy: 'proportions'
            },
            VueUiIcon: {
                icon: 'icons',
                link: '/docs#vue-ui-icon',
                description: translations.value.docs.tooltips.icon[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiMiniLoader: {
                icon: 'chartWheel',
                link: '/docs#vue-ui-mini-loader',
                description: translations.value.docs.tooltips.miniLoader[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiDag: {
                icon: 'chartDag',
                link: '/docs#vue-ui-dag',
                description: translations.value.docs.tooltips.dag[store.lang],
                taxinomy: ['hierarchy'],
                singleTaxinomy: 'hierarchy'
            },
            VueUiTreemap: {
                icon: 'chartTreemap',
                link: '/docs#vue-ui-treemap',
                description: translations.value.docs.tooltips.treemap[store.lang],
                taxinomy: ['comparisons', 'proportions', 'hierarchy', 'partToAWhole'],
                singleTaxinomy: 'hierarchy'
            },
            VueUiCirclePack: {
                icon: 'chartCirclePack',
                link: '/docs#vue-ui-circle-pack',
                description: translations.value.docs.tooltips.circlePack[store.lang],
                taxinomy: ['proportions', 'hierarchy'],
                singleTaxinomy: 'hierarchy'
            },
            VueUiMolecule: {
                icon: 'chartCluster',
                link: '/docs#vue-ui-molecule',
                description: translations.value.docs.tooltips.molecule[store.lang],
                taxinomy: ['relationships', 'hierarchy'],
                singleTaxinomy: 'hierarchy'
            },
            VueUiMoodRadar: {
                icon: 'chartMoodRadar',
                link: '/docs#vue-ui-mood-radar',
                description: translations.value.docs.tooltips.moodRadar[store.lang],
                taxinomy: ['comparisons', 'relationships'],
                singleTaxinomy: 'comparisons'
            },
            VueUiNestedDonuts: {
                icon: 'chartNestedDonuts',
                link: '/docs#vue-ui-nested-donuts',
                description: translations.value.docs.tooltips.nestedDonuts[store.lang],
                taxinomy: ['comparisons', 'proportions'],
                singleTaxinomy: 'proportions'
            },
            VueUiOnion: {
                icon: 'chartOnion',
                link: '/docs#vue-ui-onion',
                description: translations.value.docs.tooltips.onion[store.lang],
                taxinomy: ['comparisons', 'proportions'],
                singleTaxinomy: 'proportions'
            },
            VueUiParallelCoordinatePlot: {
                icon: 'chartParallelCoordinatePlot',
                link: '/docs#vue-ui-parallel-coordinate-plot',
                description: translations.value.docs.tooltips.pcp[store.lang],
                taxinomy: ['comparisons', 'relationships'],
                singleTaxinomy: 'comparisons'
            },
            VueUiQuadrant: {
                icon: 'chartQuadrant',
                link: '/docs#vue-ui-quadrant',
                description: translations.value.docs.tooltips.quadrant[store.lang],
                taxinomy: ['comparisons', 'distribution'],
                singleTaxinomy: 'distribution'
            },
            VueUiQuickChart: {
                icon: 'vueDataUi',
                link: '/docs#vue-ui-quick-chart',
                description: translations.value.docs.tooltips.quickChart[store.lang],
                taxinomy: ['comparisons', 'dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
            VueUiRadar: {
                icon: 'chartRadar',
                link: '/docs#vue-ui-radar',
                description: translations.value.docs.tooltips.radar[store.lang],
                taxinomy: ['comparisons', 'relationships'],
                singleTaxinomy: 'comparisons'
            },
            VueUiRating: {
                icon: 'star',
                link: '/docs#vue-ui-rating',
                description: translations.value.docs.tooltips.rating[store.lang],
                taxinomy: ['rating'],
                singleTaxinomy: 'rating'
            },
            VueUiRelationCircle: {
                icon: 'chartRelationCircle',
                link: '/docs#vue-ui-relation-circle',
                description: translations.value.docs.tooltips.relationCircle[store.lang],
                taxinomy: ['comparisons', 'relationships', 'semantic'],
                singleTaxinomy: 'semantic'
            },
            VueUiChord: {
                icon: 'chartChord',
                link: '/docs#vue-ui-chord',
                description: translations.value.docs.tooltips.chord[store.lang],
                taxinomy: ['comparisons', 'relationships', 'semantic'],
                singleTaxinomy: 'semantic'
            },
            VueUiRings: {
                icon: 'chartRings',
                link: '/docs#vue-ui-rings',
                description: translations.value.docs.tooltips.rings[store.lang],
                taxinomy: ['comparisons', 'proportions'],
                singleTaxinomy: 'proportions'
            },
            VueUiScatter: {
                icon: 'chartScatter',
                link: '/docs#vue-ui-scatter',
                description: translations.value.docs.tooltips.scatter[store.lang],
                taxinomy: ['comparisons', 'relationships', 'distribution'],
                singleTaxinomy: 'distribution'
            },
            VueUiSkeleton: {
                icon: 'skeleton',
                link: '/docs#vue-ui-skeleton',
                description: translations.value.docs.tooltips.skeleton[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiSmiley: {
                icon: 'smiley',
                link: '/docs#vue-ui-smiley',
                description: translations.value.docs.tooltips.smiley[store.lang],
                taxinomy: ['rating'],
                singleTaxinomy: 'rating'
            },
            VueUiSparkHistogram: {
                icon: 'chartSparkHistogram',
                link: '/docs#vue-ui-sparkhistogram',
                description: translations.value.docs.tooltips.histogram[store.lang],
                taxinomy: ['comparisons', 'proportions'],
                singleTaxinomy: 'proportions'
            },
            VueUiSparkStackbar: {
                icon: 'chartSparkStackbar',
                link: '/docs#vue-ui-sparkstackbar',
                description: translations.value.docs.tooltips.stackbar[store.lang],
                taxinomy: ['comparisons', 'proportions', 'partToAWhole'],
                singleTaxinomy: 'comparisons'
            },
            VueUiSparkTrend: {
                icon: 'trend',
                link: '/docs#vue-ui-spark-trend',
                description: translations.value.docs.tooltips.trend[store.lang],
                taxinomy: ['dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
            VueUiSparkbar: {
                icon: 'chartSparkbar',
                link: '/docs#vue-ui-sparkbar',
                description: translations.value.docs.tooltips.sparkbar[store.lang],
                taxinomy: ['comparisons', 'proportions'],
                singleTaxinomy: 'proportions'
            },
            VueUiSparkgauge: {
                icon: 'chartGauge',
                link: '/docs#vue-ui-sparkgauge',
                description: translations.value.docs.tooltips.gauge[store.lang],
                taxinomy: ['range'],
                singleTaxinomy: 'range'
            },
            VueUiSparkline: {
                icon: 'chartSparkline',
                link: '/docs#vue-ui-sparkline',
                description: translations.value.docs.tooltips.sparkline[store.lang],
                taxinomy: ['dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
            VueUiStripPlot: {
                icon: 'chartStripPlot',
                link: '/docs#vue-ui-strip-plot',
                description: translations.value.docs.tooltips.stripPlot[store.lang],
                taxinomy: ['comparisons'],
                singleTaxinomy: 'comparisons'
            },
            VueUiTableSparkline: {
                icon: 'chartTableSparkline',
                link: '/docs#vue-ui-table-sparkline',
                description: translations.value.docs.tooltips.sparklineTable[store.lang],
                taxinomy: ['dataTables', 'dataOverTime'],
                singleTaxinomy: 'dataTables'
            },
            VueUiTable: {
                icon: 'chartTable',
                link: '/docs#vue-ui-table',
                description: translations.value.docs.tooltips.table[store.lang],
                taxinomy: ['dataTables'],
                singleTaxinomy: 'dataTables'
            },
            VueUiTableHeatmap: {
                icon: 'chartTable',
                link: '/docs#vue-ui-table-heatmap',
                description: translations.value.docs.tooltips.tableHeatmap[store.lang],
                taxinomy: ['dataTables', 'relationships'],
                singleTaxinomy: 'dataTables'
            },
            VueUiThermometer: {
                icon: 'chartThermometer',
                link: '/docs#vue-ui-thermometer',
                description: translations.value.docs.tooltips.thermometer[store.lang],
                taxinomy: ['range'],
                singleTaxinomy: 'range'
            },
            VueUiTimer: {
                icon: 'lap',
                link: '/docs#vue-ui-timer',
                description: translations.value.docs.tooltips.timer[store.lang],
                taxinomy: ['uiTools'],
                singleTaxinomy: 'uiTools'
            },
            VueUiTiremarks: {
                icon: 'chartTiremarks',
                link: '/docs#vue-ui-tiremarks',
                description: translations.value.docs.tooltips.tiremarks[store.lang],
                taxinomy: ['range'],
                singleTaxinomy: 'range'
            },
            VueUiHorizontalBar: {
                icon: 'chartVerticalBar',
                link: '/docs#vue-ui-horizontal-bar',
                description: translations.value.docs.tooltips.verticalBar[store.lang],
                taxinomy: ['comparisons', 'proportions'],
                singleTaxinomy: 'comparisons'
            },
            VueUiWaffle: {
                icon: 'chartWaffle',
                link: '/docs#vue-ui-waffle',
                description: translations.value.docs.tooltips.waffle[store.lang],
                taxinomy: ['comparisons', 'proportions', 'distribution'],
                singleTaxinomy: 'proportions'
            },
            VueUiWheel: {
                icon: 'chartWheel',
                link: '/docs#vue-ui-wheel',
                description: translations.value.docs.tooltips.wheel[store.lang],
                taxinomy: ['range'],
                singleTaxinomy: 'range'
            },
            VueUiWordCloud: {
                icon: 'chartWordCloud',
                link: '/docs#vue-ui-word-cloud',
                description: translations.value.docs.tooltips.wordCloud[store.lang],
                taxinomy: ['comparisons', 'proportions', 'semantic'],
                singleTaxinomy: 'semantic'
            },
            VueUiGizmo: {
                icon: 'battery',
                link: '/docs#vue-ui-gizmo',
                description: translations.value.docs.tooltips.gizmo[store.lang],
                taxinomy: ['range'],
                singleTaxinomy: 'range'
            },
            VueUiStackbar: {
                icon: 'chartStackbar',
                link: '/docs#vue-ui-stackbar',
                description: translations.value.docs.tooltips.stackbarBig[store.lang],
                taxinomy: ['comparisons', 'proportions', 'partToAWhole', 'distribution', 'dataOverTime'],
                singleTaxinomy: 'partToAWhole'
            },
            VueUiStackline: {
                icon: 'chartStackline',
                link: '/docs#vue-ui-stackline',
                description: translations.value.docs.tooltips.stackline[store.lang],
                taxinomy: ['comparisons', 'proportions', 'partToAWhole', 'distribution', 'dataOverTime'],
                singleTaxinomy: 'partToAWhole'
            },
            VueUiFunnel: {
                icon: 'chartFunnel',
                link: '/docs#vue-ui-funnel',
                description: translations.value.docs.tooltips.funnel[store.lang],
                taxinomy: ['comparisons', 'distribution'],
                singleTaxinomy: 'distribution'
            },
            VueUiHistoryPlot: {
                icon: 'chartHistoryPlot',
                link: '/docs#vue-ui-history-plot',
                description: translations.value.docs.tooltips.historyPlot[store.lang],
                taxinomy: ['comparisons', 'dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
            VueUiRidgeline: {
                icon: 'chartRidgeline',
                link: '/docs#vue-ui-ridgeline',
                description: translations.value.docs.tooltips.ridgeline[store.lang],
                taxinomy: ['comparisons', 'dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
            VueUiBump: {
                icon: 'chartBump',
                link: '/docs#vue-ui-bump',
                description: translations.value.docs.tooltips.bump[store.lang],
                taxinomy: ['dataOverTime'],
                singleTaxinomy: 'dataOverTime'
            },
        }
    })

    const simpleMenu = computed(() => {
        const keys = Object.keys(classification.value);

        return keys.map(key => {
            const components = Object.keys(taxinomy.value).filter(t => taxinomy.value[t].singleTaxinomy === key).map(k => {
                return {
                    ...taxinomy.value[k],
                    name: k
                }
            })
            return {
                category: classification.value[key][store.lang],
                components
            }
        }).toSorted((a, b) => b.components.length - a.components.length).filter(el => el.components.length)
    })

    return {
        classification,
        classificationDescription,
        taxinomy,
        simpleMenu
    }
}