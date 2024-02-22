import { defineStore } from "pinia";

export const useMakerStore = defineStore('maker', {
    state: () => {
        return {
            translations: {
                categories: {
                    general: {
                        en: "General settings",
                        fr: "Réglages généraux",
                        pt: "Configurações Gerais",
                        de: "Allgemeine Einstellungen",
                        zh: "常规设置",
                        jp: "一般設定",
                        es: "Configuración general",
                        ko: "일반 설정"
                    },
                    padding: {
                        en: "Chart padding",
                        fr: "Padding",
                        pt: "Padding",
                        de: "Padding",
                        zh: "图表填充",
                        jp: "チャートのパディング",
                        es: "Padding",
                        ko: "차트 패딩"
                    },
                    highlight: {
                        en: "Highlight period area",
                        fr: "Zone de surbrillance",
                        pt: "Zona de vigilância",
                        de: "Markieren Sie das Feld",
                        zh: "高亮框",
                        jp: "ハイライトボックス",
                        es: "cuadro resaltado",
                        ko: "하이라이트 상자"
                    },
                    grid: {
                        en: "Grid settings",
                        fr: "Paramètres de grille",
                        pt: "Configurações de grade",
                        de: "Rastereinstellungen",
                        zh: "网格设置",
                        jp: "グリッド設定",
                        es: "Configuración de cuadrícula",
                        ko: "그리드 설정"
                    },
                    labels: {
                        en: "Data labels",
                        fr: "Étiquettes de données",
                        pt: "Rótulos de dados",
                        de: "Datenaufkleber",
                        zh: "数据标签",
                        jp: "データラベル",
                        es: "Etiquetas de datos",
                        ko: "데이터 라벨"
                    },
                    legend: {
                        en: "Chart legend",
                        fr: "Légende du graphique",
                        pt: "Legenda do gráfico",
                        de: "Diagrammlegende",
                        zh: "图表图例",
                        jp: "チャートの凡例",
                        es: "Leyenda del gráfico",
                        ko: "차트 범례"
                    },
                    title: {
                        en: "Chart title",
                        fr: "Titre du graphique",
                        pt: "Título do gráfico",
                        de: "Diagrammtitel",
                        zh: "图表标题",
                        jp: "チャートのタイトル",
                        es: "Titulo del gráfico",
                        ko: "차트 제목"
                    },
                    subtitle: {
                        en: "Chart subtitle",
                        fr: "Sous-titre du graphique",
                        pt: "Legenda do gráfico",
                        de: "Untertitel des Diagramms",
                        zh: "图表副标题",
                        jp: "チャートのサブタイトル",
                        es: "Subtítulo del gráfico",
                        ko: "차트 부제"
                    },
                    tooltip: {
                        en: "Tooltip settings",
                        fr: "Paramètres des info-bulles",
                        pt: "Configurações de dicas de ferramentas",
                        de: "Tooltip-Einstellungen",
                        zh: "工具提示设置",
                        jp: "ツールチップの設定",
                        es: "Configuración de información sobre herramientas",
                        ko: "툴팁 설정"
                    },
                    bar: {
                        en: "Bar types specific settings",
                        fr: "Paramètres spécifiques pour les ensembles de données de type barre",
                        pt: "Configurações específicas para conjuntos de dados digitados em barra",
                        de: "Spezifische Einstellungen für balkentypisierte Datensätze",
                        zh: "条形数据集的特定设置",
                        jp: "バータイプのデータセットの特定の設定",
                        es: "Configuraciones específicas para conjuntos de datos escritos con barras",
                        ko: "막대 유형 데이터세트에 대한 특정 설정"
                    },
                    line: {
                        en: "Line types specific settings",
                        fr: "Paramètres spécifiques pour les ensembles de données de type ligne",
                        pt: "Configurações específicas para conjuntos de dados digitados em linha",
                        de: "Spezifische Einstellungen für linientypisierte Datensätze",
                        zh: "线型数据集的特定设置",
                        jp: "線タイプのデータセットの特定の設定",
                        es: "Configuraciones específicas para conjuntos de datos escritos en línea",
                        ko: "선 유형 데이터세트에 대한 특정 설정"
                    },
                    plot: {
                        en: "Plot types specific settings",
                        fr: "Paramètres spécifiques pour les ensembles de données typés par points",
                        pt: "Configurações específicas para conjuntos de dados digitados em pontos",
                        de: "Spezifische Einstellungen für punkttypisierte Datensätze",
                        zh: "点类型数据集的特定设置",
                        jp: "ポイント型データセットの特定の設定",
                        es: "Configuraciones específicas para conjuntos de datos escritos por puntos",
                        ko: "포인트 유형 데이터세트에 대한 특정 설정"
                    },
                    table: {
                        en: "Data table settings",
                        fr: "Paramètres du tableau de données",
                        pt: "Configurações da tabela de dados",
                        de: "Datentabelleneinstellungen",
                        zh: "数据表设置",
                        jp: "データテーブルの設定",
                        es: "Configuración de la tabla de datos",
                        ko: "데이터 테이블 설정"
                    },
                },
                labels: {
                    backgroundColor: {
                        en: "Background color",
                        fr: "Couleur de fond",
                        pt: "Cor de fundo",
                        de: "Hintergrundfarbe",
                        zh: "背景颜色",
                        jp: "背景色",
                        es: "Color de fondo",
                        ko: "배경색"
                    },
                    backgroundColorHeader: {
                        en: "Header background color",
                        fr: "Couleur d'arrière-plan de l'en-tête",
                        pt: "Cor de fundo do cabeçalho",
                        de: "Hintergrundfarbe der Kopfzeile",
                        zh: "标题背景颜色",
                        jp: "ヘッダーの背景色",
                        es: "Color de fondo del encabezado",
                        ko: "헤더 배경색"
                    },
                    backgroundColorRow: {
                        en: "Rows background color",
                        fr: "Couleur d'arrière-plan des lignes",
                        pt: "Cor de fundo das linhas",
                        de: "Hintergrundfarbe der Zeilen",
                        zh: "行背景颜色",
                        jp: "行の背景色",
                        es: "Color de fondo de las filas",
                        ko: "행 배경색"
                    },
                    bold: {
                        en: "Bold",
                        fr: "Caractère gras",
                        pt: "Negrito",
                        de: "Fettgedruckte Schriftart",
                        zh: "粗体",
                        jp: "太字フォント",
                        es: "Negrita",
                        ko: "볼드체"
                    },
                    borderRadius: {
                        en: "Border radius",
                        fr: "Arrondi des coins",
                        pt: "Arredondamento de canto",
                        de: "Eckenrundung",
                        zh: "圆角",
                        jp: "角の丸み",
                        es: "redondeo de esquinas",
                        ko: "코너 라운딩"
                    },
                    bottom: {
                        en: "Bottom",
                        fr: "Bas",
                        pt: "Fundo",
                        de: "Unten",
                        zh: "底部",
                        jp: "底",
                        es: "Abajo",
                        ko: "맨 아래"
                    },
                    caption: {
                        en: "Caption",
                        fr: "Légende",
                        pt: "Rubrica",
                        de: "Untertitel",
                        zh: "标题",
                        jp: "キャプション",
                        es: "Subtítulo",
                        ko: "표제"
                    },
                    captionPadding: {
                        en: "Caption padding",
                        fr: "Espacement",
                        pt: "Espaçamento de legenda",
                        de: "Beschriftungsabstand",
                        zh: "标题间距",
                        jp: "キャプションの間隔",
                        es: "Espaciado de subtítulos",
                        ko: "캡션 간격"
                    },
                    captionWidth: {
                        en: "Caption width",
                        fr: "Largeur de légende",
                        pt: "Largura da legenda",
                        de: "Beschriftungsbreite",
                        zh: "标题宽度",
                        jp: "キャプションの幅",
                        es: "Ancho de título",
                        ko: "캡션 너비"
                    },
                    columnNamePeriod: {
                        en: "Column name: Period",
                        fr: "Nom de la colonne : Période",
                        pt: "Nome da coluna: Período",
                        de: "Spaltenname: Punkt",
                        zh: "列名称：期间",
                        jp: "列名: 期間",
                        es: "Nombre de columna: Período",
                        ko: "열 이름: 기간"
                    },
                    columnNameTotal: {
                        en: "Column name: Total",
                        fr: "Nom de la colonne : Total",
                        pt: "Nome da coluna: Total",
                        de: "Spaltenname: Gesamt",
                        zh: "列名称：总计",
                        jp: "列名: 合計",
                        es: "Nombre de columna: Total",
                        ko: "열 이름: 합계"
                    },
                    fontFamily: {
                        en: "Font family",
                        fr: "Police",
                        pt: "Família de fontes",
                        de: "Schriftfamilie",
                        zh: "字体系列",
                        jp: "フォントファミリー",
                        es: "Familia tipográfica",
                        ko: "글꼴 계열"
                    },
                    fontSize: {
                        en: "Font size",
                        fr: "Taille de police",
                        pt: "Tamanho da fonte",
                        de: "Schriftgröße",
                        zh: "字体大小",
                        jp: "フォントサイズ",
                        es: "Tamaño de fuente",
                        ko: "글꼴 크기"
                    },
                    fontSizePeriodLabels: {
                        en: "Period labels font size",
                        fr: "Taille de la police des étiquettes de période",
                        pt: "Tamanho da fonte dos rótulos de período",
                        de: "Schriftgröße für Periodenbeschriftungen",
                        zh: "句号标签字体大小",
                        jp: "期間ラベルのフォントサイズ",
                        es: "Tamaño de fuente de las etiquetas de período",
                        ko: "기간 레이블 글꼴 크기"
                    },
                    from: {
                        en: "From",
                        fr: "Depuis",
                        pt: "De",
                        de: "ab",
                        zh: "自",
                        jp: "より",
                        es: "Desde",
                        ko: "부터"
                    },
                    height: {
                        en: "Height",
                        fr: "Hauteur",
                        pt: "Altura",
                        de: "Höhe",
                        zh: "高度",
                        jp: "縦",
                        es: "Altura",
                        ko: "키"
                    },
                    highlighterColor: {
                        en: "Highlighter color",
                        fr: "Couleur du surligneur",
                        pt: "Cor do iluminador",
                        de: "Textmarkerfarbe",
                        zh: "荧光笔颜色",
                        jp: "ハイライターの色",
                        es: "color resaltador",
                        ko: "형광펜 색상"
                    },
                    highlighterOpacity: {
                        en: "Highlighter opacity",
                        fr: "Opacité du surligneur",
                        pt: "Opacidade do marca-texto",
                        de: "Deckkraft des Textmarkers",
                        zh: "荧光笔不透明度",
                        jp: "ハイライターの不透明度",
                        es: "Opacidad del resaltador",
                        ko: "형광펜 불투명도"
                    },
                    left: {
                        en: "Left",
                        fr: "Gauche",
                        pt: "Esquerda",
                        de: "Links",
                        zh: "左边",
                        jp: "左",
                        es: "Izquierda",
                        ko: "왼쪽"
                    },
                    lineColor: {
                        en: "Line color",
                        fr: "Couleur de ligne",
                        pt: "Cor da linha",
                        de: "Linienfarbe",
                        zh: "线条颜色",
                        jp: "線の色",
                        es: "Color de linea",
                        ko: "선 색상"
                    },
                    offsetX: {
                        en: "Offset X",
                        fr: "Décalage X",
                        pt: "Deslocamento X",
                        de: "Versatz X",
                        zh: "偏移 X",
                        jp: "オフセット X",
                        es: "Desplazamiento X",
                        ko: "오프셋 X"
                    },
                    offsetY: {
                        en: "Offset Y",
                        fr: "Décalage Y",
                        pt: "Deslocamento Y",
                        de: "Versatz Y",
                        zh: "偏移 Y",
                        jp: "オフセット Y",
                        es: "Desplazamiento Y",
                        ko: "오프셋 Y"
                    },
                    offsetYDataLabels: {
                        en: "Offset Y: data labels",
                        fr: "Décalage Y : étiquettes de données",
                        pt: "Deslocamento Y: rótulos de dados",
                        de: "Offset Y: Datenbeschriftungen",
                        zh: "偏移 Y：数据标签",
                        jp: "オフセット Y: データ ラベル",
                        es: "Desplazamiento Y: etiquetas de datos",
                        ko: "오프셋 Y: 데이터 레이블"
                    },
                    offsetYPeriodLabels: {
                        en: "Offset Y: period labels",
                        fr: "Décalage Y : étiquettes de période",
                        pt: "Deslocamento Y: rótulos de período",
                        de: "Offset Y: Periodenbeschriftungen",
                        zh: "偏移量 Y：周期标签",
                        jp: "オフセット Y: 期間ラベル",
                        es: "Compensación Y: etiquetas de período",
                        ko: "오프셋 Y: 기간 레이블"
                    },
                    opacity: {
                        en: "Opacity",
                        fr: "Opacité",
                        pt: "Opacidade",
                        de: "Opazität",
                        zh: "不透明度",
                        jp: "不透明度",
                        es: "Opacidad",
                        ko: "불투명"
                    },
                    outlineHeader: {
                        en: "Header border",
                        fr: "Bordure de l'en-tête",
                        pt: "Borda do cabeçalho",
                        de: "Kopfzeilenrand",
                        zh: "标题边框",
                        jp: "ヘッダーの境界線",
                        es: "Borde del encabezado",
                        ko: "헤더 테두리"
                    },
                    outlineRow: {
                        en: "Row border",
                        fr: "Bordude des lignes",
                        pt: "Borda de linha",
                        de: "Linienrand",
                        zh: "线条边框",
                        jp: "線の境界線",
                        es: "borde de línea",
                        ko: "선 테두리"
                    },
                    percentageRounding: {
                        en: "Rounding: percentage",
                        fr: "Arrondi : pourcentage",
                        pt: "Arredondamento: porcentagem",
                        de: "Rundung: Prozentsatz",
                        zh: "四舍五入：百分比",
                        jp: "四捨五入: パーセント",
                        es: "Redondeo: porcentaje",
                        ko: "반올림: 백분율"
                    },
                    prefix: {
                        en: "Prefix",
                        fr: "Préfixe",
                        pt: "Prefixo",
                        de: "Präfix",
                        zh: "字首",
                        jp: "プレフィックス",
                        es: "Prefijo",
                        ko: "접두사"
                    },
                    radius: {
                        en: "Radius",
                        fr: "Rayon",
                        pt: "Raio",
                        de: "Radius",
                        zh: "半径",
                        jp: "半径",
                        es: "Radio",
                        ko: "반지름"
                    },
                    responsiveBreakpoint: {
                        en: "Responsive breakpoint",
                        fr: "Point d'arrêt responsive",
                        pt: "Ponto de interrupção responsivo",
                        de: "Reaktionsfreudiger Haltepunkt",
                        zh: "响应断点",
                        jp: "レスポンシブブレークポイント",
                        es: "Punto de interrupción responsivo",
                        ko: "반응형 중단점"
                    },
                    right: {
                        en: "Right",
                        fr: "Droite",
                        pt: "à direita",
                        de: "Rechts",
                        zh: "正确的",
                        jp: "右",
                        es: "Derecha",
                        ko: "오른쪽"
                    },
                    rounding: {
                        en: "Rounding",
                        fr: "Arrondi",
                        pt: "Arredondamento",
                        de: "Rundung",
                        zh: "四舍五入",
                        jp: "丸める",
                        es: "redondeo",
                        ko: "반올림"
                    },
                    show: {
                        en: "Show",
                        fr: "Montrer",
                        pt: "Mostrar",
                        de: "Zeigen",
                        zh: "以显示",
                        jp: "見せるために",
                        es: "Mostrar",
                        ko: "보여주기 위해"
                    },
                    showDataLabels: {
                        en: "Show data labels",
                        fr: "Afficher les étiquettes de données",
                        pt: "Mostrar rótulos de dados",
                        de: "Datenbeschriftungen anzeigen",
                        zh: "显示数据标签",
                        jp: "データラベルを表示する",
                        es: "Mostrar etiquetas de datos",
                        ko: "데이터 라벨 표시"
                    },
                    showLabels: {
                        en: "Show labels",
                        fr: "Afficher les étiquettes",
                        pt: "Mostrar rótulos",
                        de: "Beschriftungen anzeigen",
                        zh: "显示标签",
                        jp: "ラベルを表示する",
                        es: "Mostrar etiquetas",
                        ko: "라벨 표시"
                    },
                    showOnlyFirstAndLast: {
                        en: "Show only first and last",
                        fr: "Afficher uniquement le premier et le dernier",
                        pt: "Mostrar apenas o primeiro e o último",
                        de: "Nur Vor- und Nachname anzeigen",
                        zh: "只显示第一个和最后一个",
                        jp: "最初と最後だけを表示",
                        es: "Mostrar solo primera y ultima",
                        ko: "처음과 마지막만 표시"
                    },
                    showPercentage: {
                        en: "Show percentage",
                        fr: "Afficher le pourcentage",
                        pt: "Mostrar porcentagem",
                        de: "Prozentsatz anzeigen",
                        zh: "显示百分比",
                        jp: "パーセンテージを表示",
                        es: "Mostrar porcentaje",
                        ko: "백분율 표시"
                    },
                    showPeriodLabels: {
                        en: "Show period labels",
                        fr: "Afficher les étiquettes de période",
                        pt: "Mostrar rótulos de período",
                        de: "Periodenbeschriftungen anzeigen",
                        zh: "显示期间标签",
                        jp: "期間ラベルを表示する",
                        es: "Mostrar etiquetas de período",
                        ko: "생리 라벨 표시"
                    },
                    showUserOptions: {
                        en: "Show user options",
                        fr: "Afficher les options utilisateur",
                        pt: "Mostrar opções do usuário",
                        de: "Benutzeroptionen anzeigen",
                        zh: "显示用户选项",
                        jp: "ユーザーオプションを表示",
                        es: "Mostrar opciones de usuario",
                        ko: "사용자 옵션 표시"
                    },
                    showValue: {
                        en: "Show value",
                        fr: "Afficher la valeur",
                        pt: "Mostrar valor",
                        de: "Wert zeigen",
                        zh: "显示价值",
                        jp: "値を表示",
                        es: "Mostrar valor",
                        ko: "값 표시"
                    },
                    sparkline: {
                        en: "Sparkline chart",
                        fr: "Graphique sparkline",
                        pt: "Gráfico minigráfico",
                        de: "Sparkline-Diagramm",
                        zh: "迷你图",
                        jp: "スパークラインチャート",
                        es: "Minigráfico",
                        ko: "스파크라인 차트"
                    },
                    suffix: {
                        en: "Suffix",
                        fr: "Suffixe",
                        pt: "Sufixo",
                        de: "Suffix",
                        zh: "后缀",
                        jp: "サフィックス",
                        es: "Sufijo",
                        ko: "접미사"
                    },
                    textAlign: {
                        en: "Text alignment",
                        fr: "Alignement du texte",
                        pt: "Alinhamento de texto",
                        de: "Textausrichtung",
                        zh: "文本对齐",
                        jp: "テキストの配置",
                        es: "Alineación del texto",
                        ko: "텍스트 정렬"
                    },
                    textColor: {
                        en: "Text color",
                        fr: "Couleur du texte",
                        pt: "Cor do texto",
                        de: "Textfarbe",
                        zh: "文字颜色",
                        jp: "テキストの色",
                        es: "Color de texto",
                        ko: "텍스트 색상"
                    },
                    textColorHeader: {
                        en: "Header: text color",
                        fr: "En-tête : couleur du texte",
                        pt: "Cabeçalho: cor do texto",
                        de: "Kopfzeile: Textfarbe",
                        zh: "标题：文字颜色",
                        jp: "ヘッダー: 文字色",
                        es: "Encabezado: color del texto",
                        ko: "헤더: 텍스트 색상"
                    },
                    textColorRow: {
                        en: "Rows: text color",
                        fr: "Lignes : couleur du texte",
                        pt: "Linhas: cor do texto",
                        de: "Zeilen: Textfarbe",
                        zh: "行：文字颜色",
                        jp: "行: テキストの色",
                        es: "Filas: color del texto",
                        ko: "행: 텍스트 색상"
                    },
                    textContent: {
                        en: "Text content",
                        fr: "Contenu du texte",
                        pt: "Conteúdo de texto",
                        de: "Textinhalt",
                        zh: "文字内容",
                        jp: "テキストの内容",
                        es: "Contenido del texto",
                        ko: "텍스트 내용"
                    },
                    textColorPeriodLabels: {
                        en: "Period labels: text color",
                        fr: "Étiquettes de période : couleur du texte",
                        pt: "Rótulos de período: cor do texto",
                        de: "Periodenbeschriftungen: Textfarbe",
                        zh: "期间标签：文字颜色",
                        jp: "期間ラベル: 文字色",
                        es: "Etiquetas de período: color del texto",
                        ko: "기간 라벨: 텍스트 색상"
                    },
                    thickness: {
                        en: "Thickness",
                        fr: "Epaisseur",
                        pt: "Grossura",
                        de: "Dicke",
                        zh: "厚度",
                        jp: "厚さ",
                        es: "Espesor",
                        ko: "두께"
                    },
                    to: {
                        en: "To",
                        fr: "Jusqu'à",
                        pt: "Até",
                        de: "Bis",
                        zh: "直到",
                        jp: "それまで",
                        es: "Hasta",
                        ko: "까지"
                    },
                    top: {
                        en: "Top",
                        fr: "Haut",
                        pt: "Os cima",
                        de: "obere",
                        zh: "顶部",
                        jp: "上",
                        es: "Arriba",
                        ko: "맨 위"
                    },
                    useCssAnimation: {
                        en: "Use css animation",
                        fr: "Utiliser les animations CSS",
                        pt: "Usar animação CSS",
                        de: "Verwenden Sie CSS-Animationen",
                        zh: "使用CSS动画",
                        jp: "CSSアニメーションを使用する",
                        es: "Usar animación CSS",
                        ko: "CSS 애니메이션 사용"
                    },
                    useGradient: {
                        en: "Use gradient",
                        fr: "Utiliser le dégradé",
                        pt: "Usar gradiente",
                        de: "Verwenden Sie einen Farbverlauf",
                        zh: "使用渐变",
                        jp: "グラデーションを使用する",
                        es: "Usar gradiente",
                        ko: "그라데이션 사용"
                    },
                    valueRounding: {
                        en: "Value rounding",
                        fr: "Arrondi des valeurs",
                        pt: "Arredondamento de valor",
                        de: "Wertrundung",
                        zh: "值四舍五入",
                        jp: "値の四捨五入",
                        es: "Redondeo de valor",
                        ko: "값 반올림"
                    },
                    verticalLines: {
                        en: "Vertical lines",
                        fr: "Lignes verticales",
                        pt: "Linhas verticais",
                        de: "Vertikale Linien",
                        zh: "垂直线",
                        jp: "縦線",
                        es: "Líneas verticales",
                        ko: "수직선"
                    },
                    width: {
                        en: "Width",
                        fr: "Largeur",
                        pt: "Largura",
                        de: "Breite",
                        zh: "宽度",
                        jp: "幅",
                        es: "Ancho",
                        ko: "너비"
                    },
                    xAxisLabel: {
                        en: "X axis labels",
                        fr: "Étiquettes de l'axe X",
                        pt: "Rótulos do eixo X",
                        de: "X-Achsenbeschriftungen",
                        zh: "X 轴标签",
                        jp: "X 軸のラベル",
                        es: "Etiquetas del eje X",
                        ko: "X축 라벨"
                    },
                    yAxisLabel: {
                        en: "Y axis labels",
                        fr: "Étiquettes de l'axe Y",
                        pt: "Rótulos do eixo Y",
                        de: "Y-Achsenbeschriftungen",
                        zh: "Y 轴标签",
                        jp: "Y 軸のラベル",
                        es: "Etiquetas del eje Y",
                        ko: "Y축 라벨"
                    },
                    zoom: {
                        en: "Show zoom inputs",
                        fr: "Afficher le zoom",
                        pt: "Mostrar entradas de zoom",
                        de: "Zoom-Eingaben anzeigen",
                        zh: "显示缩放输入",
                        jp: "ズーム入力を表示",
                        es: "Mostrar entradas de zoom",
                        ko: "확대/축소 입력 표시"
                    }
                }
            }
        }
    }
})