import { defineStore } from "pinia";

export const useMakerStore = defineStore('maker', {
    state: () => {
        return {
            template: {
                en: "",
                fr: "",
                pt: "",
                de: "",
                zh: "",
                jp: "",
                es: "",
                ko: ""
            },
            translations: {
                activeRelations: {
                    en: 'Active relations',
                    fr: "Relations actives",
                    pt: "Relações ativas",
                    de: "Aktive Beziehungen",
                    zh: "积极的关系",
                    jp: "活発な関係",
                    es: "Relaciones activas",
                    ko: "적극적인 관계"
                },
                addRelations: {
                    en: 'Add relations',
                    fr: "Ajouter relations",
                    pt: "Adicionar relações",
                    de: "Beziehungen hinzufügen",
                    zh: "添加关系",
                    jp: "リレーションの追加",
                    es: "Agregar relaciones",
                    ko: "관계 추가"
                },
                clearStorage: {
                    en: 'Clear local storage for this chart',
                    fr: "Effacer le stockage local pour ce graphique",
                    pt: "Limpe o armazenamento local deste gráfico",
                    de: "Löschen Sie den lokalen Speicher für dieses Diagramm",
                    zh: "清除该图表的本地存储",
                    jp: "このチャートのローカル ストレージをクリアします",
                    es: "Borrar almacenamiento local para este gráfico",
                    ko: "이 차트의 로컬 저장소 지우기",
                },
                reset: {
                    en: "Reset config",
                    fr: "Réinitialiser la config",
                    pt: "Redefinir config",
                    de: "Konfig zurücksetzen",
                    zh: "重置配置",
                    jp: "設定をリセットする",
                    es: "Restablecer config",
                    ko: "구성 재설정"
                },
                atWork: {
                    en: "We are currently working on adding all the components here. If you don't find the one you need, you can still check out the docs page.",
                    fr: "Nous travaillons actuellement sur l'ajout de tous les composants ici. Si vous ne trouvez pas celui dont vous avez besoin, vous pouvez toujours consulter la page de documentation.",
                    pt: "No momento, estamos trabalhando para adicionar todos os componentes aqui. Se você não encontrar o que precisa, ainda poderá verificar a página de documentos.",
                    de: "Wir arbeiten derzeit daran, alle Komponenten hier hinzuzufügen. Wenn Sie das benötigte Dokument nicht finden, können Sie sich trotzdem die Dokumentationsseite ansehen.",
                    zh: "我们目前正在努力在此处添加所有组件。如果您找不到所需的内容，您仍然可以查看文档页面。",
                    jp: "現在、すべてのコンポーネントをここに追加する作業を行っています。必要なものが見つからない場合でも、ドキュメント ページをチェックしてください。",
                    es: "Actualmente estamos trabajando para agregar todos los componentes aquí. Si no encuentra el que necesita, aún puede consultar la página de documentos.",
                    ko: "현재 여기에 모든 구성요소를 추가하는 작업이 진행 중입니다. 필요한 것을 찾지 못한 경우에도 문서 페이지를 확인하실 수 있습니다."
                },
                steps: {
                    one: {
                        en: "Compose your dataset",
                        fr: "Composez votre ensemble de données",
                        pt: "Componha seu conjunto de dados",
                        de: "Stellen Sie Ihren Datensatz zusammen",
                        zh: "编写数据集",
                        jp: "データセットを構成する",
                        es: "Redacte su conjunto de datos",
                        ko: "데이터세트를 구성하세요"
                    },
                    two: {
                        en: "Tweak configuration settings",
                        fr: "Ajustez les paramètres de configuration",
                        pt: "Ajustar as configurações",
                        de: "Konfigurationseinstellungen anpassen",
                        zh: "调整配置设置",
                        jp: "構成設定を微調整する",
                        es: "Modificar los ajustes de configuración",
                        ko: "구성 설정 조정"
                    },
                    three: {
                        en: "Copy the component code",
                        fr: "Copiez le code du composant",
                        pt: "Copie o código do componente",
                        de: "Kopieren Sie den Komponentencode",
                        zh: "复制组件代码",
                        jp: "コンポーネントコードをコピーします",
                        es: "Copia el código del componente",
                        ko: "구성요소 코드 복사"
                    },
                },
                config: {
                    en: "Configuration",
                    fr: "Configuration",
                    pt: "Configuração",
                    de: "Aufbau",
                    zh: "配置",
                    jp: "構成",
                    es: "Configuración",
                    ko: "구성"
                },
                categoriesLabel: {
                    en: 'Categories',
                    fr: 'Catégories',
                    pt: "Categorias",
                    de: "Kategorien",
                    zh: "类别",
                    jp: "カテゴリー",
                    es: "Categorías",
                    ko: "카테고리"
                },
                dataset: {
                    en: "Dataset",
                    fr: "Données",
                    pt: "Conjunto de dados",
                    de: "Datensatz",
                    zh: "数据集",
                    jp: "データセット",
                    es: "Conjunto de datos",
                    ko: "데이터세트"
                },
                componentCode: {
                    en: "Component code:",
                    fr: "Code composant :",
                    pt: "Código do componente:",
                    de: "Komponentencode:",
                    zh: "组件代码：",
                    jp: "コンポーネントコード:",
                    es: "Código de componente:",
                    ko: "구성 요소 코드:"
                },
                categories: {
                    container: {
                        en: "Container",
                        fr: "Conteneur",
                        pt: "Recipiente",
                        de: "Container",
                        zh: "容器",
                        jp: "容器",
                        es: "Envase",
                        ko: "컨테이너"
                    },
                    correlation: {
                        en: 'Correlation',
                        fr: "Corrélation",
                        pt: "Correlação",
                        de: "Korrelation",
                        zh: "相关性",
                        jp: "相関",
                        es: "Correlación",
                        ko: "상관관계"
                    },
                    datapoints: {
                        en: "Datapoints",
                        fr: "Points de données",
                        pt: "Pontos de dados",
                        de: "Datenpunkte",
                        zh: "数据点",
                        jp: "データポイント",
                        es: "Puntos de datos",
                        ko: "데이터 점수"
                    },
                    donut: {
                        en: 'Arcs',
                        fr: "Arcs",
                        pt: "Arcos",
                        de: "Bögen",
                        zh: "弧线",
                        jp: "円弧",
                        es: "Arcos",
                        ko: "호"
                    },
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
                        en: "Padding",
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
                    bars: {
                        en: 'Bars',
                        fr: "Barres",
                        pt: "Barras",
                        de: "Barren",
                        zh: "酒吧",
                        jp: "バー",
                        es: "Barras",
                        ko: "바"
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
                    roots: {
                        en: 'Roots',
                        fr: 'Racines',
                        pt: "Raízes",
                        de: "Wurzeln",
                        zh: "根源",
                        jp: "ルーツ",
                        es: "Raíces",
                        ko: "뿌리"
                    },
                    branches: {
                        en: 'Branches',
                        fr: "Branches",
                        pt: "Ramo",
                        de: "Zweige",
                        zh: "树枝",
                        jp: "小枝",
                        es: "Ramas",
                        ko: "나뭇가지"
                    },
                    donutCharts: {
                        en: 'Donut charts',
                        fr: 'Graphiques en beignet',
                        pt: 'Gráficos de rosca',
                        de: 'Donut-Diagramme',
                        zh: '圆环图',
                        jp: 'ドーナツチャート',
                        es: 'Gráficos de anillos',
                        ko: '도넛 차트'
                    },
                    translations: {
                        en: 'Translations',
                        fr: 'Traductions',
                        pt: 'Traduções',
                        de: "Übersetzungen",
                        zh: '翻译',
                        jp: '翻訳',
                        es: 'Traducciones',
                        ko: '번역'
                    },
                    serieLabels: {
                        en: 'Serie labels',
                        fr: 'Etiquettes des séries',
                        pt: "Etiquetas de série",
                        de: "Serienetiketten",
                        zh: "Serienetiketten",
                        jp: "シリーズラベル",
                        es: "Etiquetas de serie",
                        ko: "시리즈 라벨"
                    },
                    selector: {
                        en: 'Selector',
                        fr: "Sélecteur",
                        pt: "Seletor",
                        de: "Wählschalter",
                        zh: "选择器",
                        jp: "セレクタ",
                        es: "Selector",
                        ko: "선택자"
                    }
                },
                labels: {
                    abbreviation: {
                        en: "Abbreviation",
                        fr: "Abréviation",
                        pt: "Abreviação",
                        de: "Abkürzung",
                        zh: "缩写",
                        jp: "略語",
                        es: "Abreviatura",
                        ko: "약어"
                    },
                    acceleration: {
                        en: 'Acceleration',
                        fr: "Acceleration",
                        pt: "Aceleração",
                        de: "Beschleunigung",
                        zh: "加速",
                        jp: "加速度",
                        es: "Aceleración",
                        ko: "가속"
                    },
                    active: {
                        en: 'Active',
                        fr: "Actif",
                        pt: 'Ativo',
                        de: "Aktiv",
                        zh: "积极的",
                        jp: "アクティブ",
                        es: "Activo",
                        ko: "활동적인"
                    },
                    add: {
                        en: 'Add',
                        fr: "Ajouter",
                        pt: "Acrescentar",
                        de: "Hinzufügen",
                        zh: "添加",
                        jp: "追加",
                        es: "Agregar",
                        ko: "추가하다"
                    },
                    age: {
                        en: 'Age',
                        fr: "Âge",
                        pt: "Idade",
                        de: "Alter",
                        zh: "年龄",
                        jp: "年",
                        es: "Edad",
                        ko: "나이"
                    },
                    angle: {
                        en: "Angle",
                        fr: "Angle",
                        pt: "Canto",
                        de: "Ecke",
                        zh: "角落",
                        jp: "コーナー",
                        es: "Esquina",
                        ko: "모서리"
                    },
                    animation: {
                        en: "Animation",
                        fr: "Animation",
                        pt: "Animação",
                        de: "Animation",
                        zh: "动画片",
                        jp: "アニメーション",
                        es: "Animación",
                        ko: "생기"
                    },
                    area: {
                        en: "Area",
                        fr: "Surface",
                        pt: "Área",
                        de: "Bereich",
                        zh: "区",
                        jp: "エリア",
                        es: "Área",
                        ko: "영역"
                    },
                    auto: {
                        en: 'Auto',
                        fr: 'Auto',
                        pt: 'Auto',
                        de: "Automatisch",
                        zh: "自动的",
                        jp: "自動",
                        es: "Auto",
                        ko: "자동적 인"
                    },
                    arrow: {
                        en: 'Arrow',
                        fr: "Flèche",
                        pt: "Seta",
                        de: "Pfeil",
                        zh: "箭",
                        jp: "矢印",
                        es: "Flecha",
                        ko: "화살"
                    },
                    average: {
                        en: 'Average',
                        fr: "Moyenne",
                        pt: "Média",
                        de: "Durchschnitt",
                        zh: "平均的",
                        jp: "平均",
                        es: "Promedio",
                        ko: "평균"
                    },
                    axis: {
                        en: 'Axis',
                        fr: "Axes",
                        pt: "Eixos",
                        de: "Äxte",
                        zh: "轴",
                        jp: "軸",
                        es: "Ejes",
                        ko: "축"
                    },
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
                    between: {
                        en: "Intermediate",
                        fr: "Intermédiaire",
                        pt: "Intermediário",
                        de: "Dazwischenliegend",
                        zh: "中间的",
                        jp: "中級",
                        es: "Intermedio",
                        ko: "중급"
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
                    border: {
                        en: "Border",
                        fr: "Bordure",
                        pt: "Borda",
                        de: "Rand",
                        zh: "边缘",
                        jp: "角",
                        es: "Borde",
                        ko: "가장자리"
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
                    branch: {
                        en: 'Branch',
                        fr: "Branche",
                        pt: "Ramo",
                        de: "Zweig",
                        zh: "枝条",
                        jp: "小枝",
                        es: "Ramita",
                        ko: "작은 가지"
                    },
                    breakdown: {
                        en: 'Breakdown',
                        fr: "Répartition",
                        pt: "Distribuição",
                        de: "Verteilung",
                        zh: "分配",
                        jp: "分布",
                        es: "Distribución",
                        ko: "분포"
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
                    category: {
                        en: 'Category',
                        fr: 'Catégorie',
                        pt: 'Categoria',
                        de: "Kategorie",
                        zh: "类别",
                        jp: "カテゴリー",
                        es: "Categoría",
                        ko: "범주"
                    },
                    categoryName: {
                        en: "Category name",
                        fr: "Nom de la catégorie",
                        pt: "Nome da Categoria",
                        de: "Kategoriename",
                        zh: "分类名称",
                        jp: "種別名",
                        es: "Nombre de la categoría",
                        ko: "카테고리 이름"
                    },
                    cell: {
                        en: 'Cell',
                        fr: "Cellule",
                        pt: "Célula",
                        de: "Zelle",
                        zh: "细胞",
                        jp: "細胞",
                        es: "Celúla",
                        ko: "셀"
                    },
                    circle: {
                        en: "Circle",
                        fr: "Cercle",
                        pt: "Círculo",
                        de: "Kreis",
                        zh: "圆圈",
                        jp: "丸",
                        es: "Círculo",
                        ko: "원"
                    },
                    cold: {
                        en: 'Cold',
                        fr: "Froid",
                        pt: 'Frio',
                        de: "Kalt",
                        zh: "寒冷的",
                        jp: "寒い",
                        es: "Frío",
                        ko: "추운"
                    },
                    color: {
                        en: "Color",
                        fr: "Couleur",
                        pt: "Cor",
                        de: "Farbe",
                        zh: "颜色",
                        jp: "色",
                        es: "Color",
                        ko: "색상"
                    },
                    colorName: {
                        en: "Serie name color",
                        fr: "Couleur du nom de série",
                        pt: "Cor do nome da série",
                        de: "Farbe des Seriennamens",
                        zh: "系列名称 颜色",
                        jp: "シリーズ名カラー",
                        ko: "시리즈명 색상"
                    },
                    colorPercentage: {
                        en: "% label color",
                        fr: "Couleur du label %",
                        pt: "% cor do rótulo",
                        de: "% Etikettenfarbe",
                        zh: "% 标签颜色",
                        jp: "% ラベルの色",
                        es: "% color de etiqueta",
                        ko: "% 라벨 색상"
                    },
                    columnName: {
                        en: "Column name",
                        fr: "Nom de la colonne",
                        pt: "Nome da coluna",
                        de: "Spaltenname",
                        zh: "列名称",
                        jp: "列名",
                        es: "Nombre de columna",
                        ko: "열 이름"
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
                    correlation: {
                        en: 'Correlation',
                        fr: "Corrélation",
                        pt: "Correlação",
                        de: "Korrelation",
                        zh: "相关性",
                        jp: "相関",
                        es: "Correlación",
                        ko: "상관관계"
                    },
                    crescendo: {
                        en: 'Crescendo',
                        fr: 'Crescendo',
                        pt: 'Crescendo',
                        de: "Crescendo",
                        zh: '渐强',
                        jp: 'クレッシェンド',
                        es: 'Crescendo',
                        ko: '진전'
                    },
                    curve: {
                        en: 'Curve',
                        fr: "Courbe",
                        pt: "Curva",
                        de: "Kurve",
                        zh: "曲线",
                        jp: "曲線",
                        es: "Curva",
                        ko: "곡선"
                    },
                    dashed: {
                        en: "Dashed",
                        fr: "pointillés",
                        pt: "Pontilhado",
                        de: "Gepunktet",
                        zh: "点状",
                        jp: "点在",
                        es: "Punteado",
                        ko: "점이 찍힌"
                    },
                    dataLabels: {
                        en: 'Data labels',
                        fr: "Etiquettes de données", 
                        pt: "Rótulos de dados",
                        de: "Datenaufkleber",
                        zh: "数据标签",
                        jp: "データラベル",
                        es: "Etiquetas de datos",
                        ko: "데이터 라벨"
                    },
                    datapoint: {
                        en: "Datapoint",
                        fr: "Point de données",
                        pt: 'Ponto de dados',
                        de: "Datenpunkt",
                        zh: "数据点",
                        jp: "データポイント",
                        es: "Punto de datos",
                        ko: "데이터 포인트"
                    },
                    dataPolygon: {
                        en: 'Data polygon',
                        fr: "Polygones de données",
                        pt: "Polígono de dados",
                        de: "Datenpolygon",
                        zh: "数据多边形",
                        jp: "データポリゴン",
                        es: "polígono de datos",
                        ko: "데이터 폴리곤"
                    },
                    deviation: {
                        en: "Deviation",
                        fr: "Ecart",
                        pt: "Desvio",
                        de: "Abweichung",
                        zh: "偏差",
                        jp: "偏差",
                        es: "Desviación",
                        ko: "편차"
                    },
                    deviationThreshold: {
                        en: 'Deviation threshold',
                        fr: "Seuil d'écart",
                        pt: "Limite de desvio",
                        de: "Abweichungsschwelle",
                        zh: "偏差阈值",
                        jp: "偏差閾値",
                        es: "Umbral de desviación",
                        ko: "편차 임계값"
                    },
                    display: {
                        en: 'Display',
                        fr: 'Affichage',
                        pt: 'Mostrar',
                        de: 'Anzeige',
                        zh: "展示",
                        jp: "画面",
                        es: "Mostrar",
                        ko: "표시하다"
                    },
                    fill: {
                        en: 'Fill',
                        fr: "Remplissage",
                        pt: "Enchimentor",
                        de: "Füllung",
                        zh: "填充",
                        jp: "充填",
                        es: "Relleno",
                        ko: "충전재"
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
                    gradient: {
                        en: 'Gradient',
                        fr: "Dégradé",
                        pt: "Gradiente",
                        de: "Gradient",
                        zh: "坡度",
                        jp: "勾配",
                        es: "Degradado",
                        ko: "구배"
                    },
                    gradientIntensity: {
                        en: 'Gradient intensity',
                        fr: "Intensité du dégradé",
                        pt: "Intensidade gradiente",
                        de: "Gradientenintensität",
                        zh: "梯度强度",
                        jp: "勾配強度",
                        ko: "그라데이션 강도"
                    },
                    grid: {
                        en: 'Grid',
                        fr: "Grille",
                        pt: "Grade",
                        de: "Netz",
                        zh: "网格",
                        jp: "グリッド",
                        es: "cuadricula",
                        ko: "그리드"
                    },
                    gutter: {
                        en: 'Gutter',
                        fr: "Gouttière",
                        pt: "Calha",
                        de: "Rinne",
                        zh: "排水沟",
                        jp: "側溝",
                        es: "Canal",
                        ko: "홈통"
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
                    hideUnder: {
                        en: "Hide under",
                        fr: "Masquer en dessous de",
                        pt: "Ocultar em",
                        de: "Unter verstecken",
                        zh: "隐藏在下",
                        jp: "の下に隠す",
                        es: "Ocultar abajo de",
                        ko: "아래에 숨기기"
                    },
                    hideUnderValue: {
                        en: "Hide under %",
                        fr: "Masquer en dessous du %",
                        pt: "Ocultar em %",
                        de: "Unter % verstecken",
                        zh: "隐藏在%下",
                        jp: "% の下に隠す",
                        es: "Ocultar en %",
                        ko: "% 아래에 숨기기"
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
                    hollow: {
                        en: "Hollow",
                        fr: "Creux",
                        pt: "Oco",
                        de: "Hohl",
                        zh: "空洞的",
                        jp: "中空",
                        es: "Hueco",
                        ko: "구멍"
                    },
                    horizontal: {
                        en: 'Horizontal',
                        fr: "Horizontal",
                        pt: 'Horizontal',
                        de: "Horizontal",
                        zh: "水平的",
                        jp: "水平",
                        es: "Horizontal",
                        ko: "수평의"
                    },
                    hot: {
                        en: 'Hot',
                        fr: "Chaud",
                        pt: 'Quente',
                        de: "Heiß",
                        zh: "热的",
                        jp: "熱い",
                        es: "Caliente",
                        ko: "더운"
                    },
                    icons: {
                        en: 'Icons',
                        fr: 'Icones',
                        pt: 'Ícones',
                        de: 'Symbole',
                        zh: "图标",
                        jp: "アイコン",
                        es: "Iconos",
                        ko: "아이콘"
                    },
                    inactive: {
                        en: 'Inactive',
                        fr: 'Inactif',
                        pt: 'Inativo',
                        de: "Inaktiv",
                        zh: "不活跃",
                        jp: "非活性",
                        es: "Inactivo",
                        ko: "비활성"
                    },
                    independant: {
                        en: 'Independant',
                        fr: "Indépendant",
                        pt: 'Independente',
                        de: "Unabhängig",
                        zh: "独立",
                        jp: "独立した",
                        es: "independiente",
                        ko: "독립"
                    },
                    is: {
                        en: ':',
                        fr: ":",
                        pt: ":",
                        de: ":",
                        zh: ':',
                        jp: ":",
                        es: ":",
                        ko: ":"
                    },
                    labels: {
                        en: 'Labels',
                        fr: "Labels",
                        pt: 'Etiquetas',
                        de: "Etiketten",
                        zh: "标签",
                        jp: "ラベル",
                        es: "Etiquetas",
                        ko: "라벨"
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
                    limit: {
                        en: 'Max number of datapoints',
                        fr: 'Nb max de points de données',
                        pt: 'Número máximo de pontos de dados',
                        de: "Maximale Anzahl von Datenpunkten",
                        zh: "最大数据点数量",
                        jp: "データポイントの最大数",
                        es: "Número máximo de puntos de datos",
                        ko: "최대 데이터 포인트 수"
                    },
                    line: {
                        en: 'Line',
                        fr: "Ligne",
                        pt: "Linha",
                        de: "Linie",
                        zh: "线",
                        jp: "ライン",
                        es: "Linea",
                        ko: "선"
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
                    links: {
                        en: 'Links',
                        fr: "Liens",
                        pt: 'Ligações',
                        de: "Links",
                        zh: '链接',
                        jp: 'リンク',
                        es: 'Enlaces',
                        ko: '연결'
                    },
                    markers: {
                        en: "Markers",
                        fr: "Marqueurs",
                        pt: "Marcadores",
                        de: "Zeichen",
                        zh: "标志",
                        jp: "記号",
                        es: "Señal",
                        ko: "징후"
                    },
                    margin: {
                        en: 'Margin',
                        fr: "Marges",
                        pt: "Margens",
                        de: "Marge",
                        zh: "边",
                        jp: "余白",
                        es: "Márgenes",
                        ko: "가장자리"
                    },
                    max: {
                        en: "Maximum",
                        fr: "Maximum",
                        pt: "Máximo",
                        de: "Maximal",
                        zh: "最大限度",
                        jp: "最大",
                        es: "Máximo",
                        ko: "최저한의"
                    },
                    min: {
                        en: 'Minimum',
                        fr: "Minimum",
                        pt: "Mínimo",
                        de: "Minimum",
                        zh: "最低限度",
                        jp: "最小",
                        es: "Mínimo",
                        ko: "최저한의"
                    },
                    name: {
                        en: 'Name',
                        fr: "Nom",
                        pt: 'Nome',
                        de: "Name",
                        zh: "姓名",
                        jp: "名前",
                        es: "Nombre",
                        ko: "이름"
                    },
                    negative: {
                        en: 'Negative',
                        fr: "Négatif",
                        pt: "Negativo",
                        de: "Negativ",
                        zh: "消极的",
                        jp: "ネガティブ",
                        es: "Negativo",
                        ko: "부정적인"
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
                    outerPolygon: {
                        en: 'Outer polygon',
                        fr: "Polygone extérieur",
                        pt: 'Polígono externo',
                        de: "Äußeres Polygon",
                        zh: "外多边形",
                        jp: "外側の多角形",
                        es: "Polígono exterior",
                        ko: "외부 다각형"
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
                    padding: {
                        en: "Padding",
                        fr: "Padding",
                        pt: "Padding",
                        de: "Padding",
                        zh: "图表填充",
                        jp: "チャートのパディング",
                        es: "Padding",
                        ko: "차트 패딩"
                    },
                    parent: {
                        en: 'Parent',
                        fr: "Parent",
                        pt: "Parente",
                        de: "Elternteil",
                        zh: "父母亲",
                        jp: "親",
                        es: "Padre",
                        ko: "원인이 되는 것"
                    },
                    percentage: {
                        en: 'Percentage',
                        fr: "Pourcentage",
                        pt: 'Porcentagem',
                        de: 'Prozentsatz',
                        zh: '百分比',
                        jp: 'パーセント',
                        es: 'Porcentaje',
                        ko: '백분율'
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
                    period: {
                        en: "Period",
                        fr: "Période",
                        pt: "Período",
                        de: "Zeitraum",
                        zh: "时期",
                        jp: "期間",
                        es: "Período",
                        ko: "기간"
                    },
                    perspective: {
                        en: 'Perspective',
                        fr: "Perspective",
                        pt: "Perspectiva",
                        de: "Perspektive",
                        zh: "看法",
                        jp: "遠近",
                        es: "Perspectiva",
                        ko: "배경"
                    },
                    plots: {
                        en: 'Plots',
                        fr: 'Points',
                        pt: 'Pontos',
                        de: 'Punkte',
                        zh: '点',
                        jp: 'ドット',
                        es: "Puntos",
                        ko: '도트'
                    },
                    pointer: {
                        en: "Pointer",
                        fr: "Pointeur",
                        pt: "Ponteiro",
                        de: "Zeiger",
                        zh: "指针",
                        jp: "ポインタ",
                        es: "Puntero",
                        ko: "바늘"
                    },
                    position: {
                        en: 'Position',
                        fr: "Position",
                        pt: "Posição",
                        de: "Position",
                        zh: '位置',
                        jp: "位置",
                        es: "Posición",
                        ko: "위치"
                    },
                    positive: {
                        en: 'Positive',
                        fr: "Positif",
                        pt: 'Positivo',
                        de: "Positiv",
                        zh: "积极的",
                        jp: "ポジティブ",
                        es: "Positivo",
                        ko: "긍정적인"
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
                    progression: {
                        en: "Progression",
                        fr: "Progression",
                        pt: "Progresso",
                        de: "Fortschritt",
                        zh: "进步",
                        jp: "進捗",
                        es: "Progreso",
                        ko: "진전"
                    },
                    quadrant: {
                        en: 'Quadrant',
                        fr: 'Quadrant',
                        pt: 'Quadrante',
                        de: "Quadrant",
                        zh: "象限",
                        jp: "四分円",
                        es: "Cuadrante",
                        ko: "사분면"
                    },
                    quadrantSide: {
                        en: 'Quadrant side',
                        fr: 'Côté du quadrant',
                        pt: "Lado do quadrante",
                        de: "Quadrantenseite",
                        zh: "象限边",
                        jp: "象限側",
                        es: "Lado del cuadrante",
                        ko: "사분면"
                    },
                    quantity: {
                        en: "Quantity",
                        fr: "Quantité",
                        pt: "Quantidade",
                        de: "Menge",
                        zh: "数量",
                        jp: "量",
                        es: "Cantidad",
                        ko: "수량"
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
                    ratio: {
                        en: 'Ratio',
                        fr: "Ratio",
                        pt: "Razão",
                        de: "Verhältnis",
                        zh: "比率",
                        jp: "比率",
                        es: "Relación",
                        ko: "비율"
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
                    root: {
                        en: 'Root',
                        fr: "Racine",
                        pt: "Raiz",
                        de: "Wurzel",
                        zh: "根",
                        jp: "根",
                        es: "Raíz",
                        ko: "뿌리"
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
                    scale: {
                        en: 'Scale',
                        fr: "Echelle",
                        pt: "Escala",
                        de: "Skala",
                        zh: "规模",
                        jp: "規模",
                        es: "Escala",
                        ko: "규모"
                    },
                    selected: {
                        en: 'Selected',
                        fr: 'Sélectionné',
                        pt: 'Selecionado',
                        de: 'Ausgewählt',
                        zh: '已选择',
                        jp: '選択済み',
                        es: 'Seleccionado',
                        ko: '선택된'
                    },
                    selectChartType: {
                        en: "Select chart type:",
                        fr: "Sélectionnez le type de graphique :",
                        pt: "Selecione o tipo de gráfico:",
                        de: "Diagrammtyp auswählen:",
                        zh: "选择图表类型：",
                        jp: "チャートの種類を選択してください:",
                        es: "Seleccione el tipo de gráfico:",
                        ko: "차트 유형 선택:"
                    },
                    separator: {
                        en: 'Separator',
                        fr: 'Séparateur',
                        pt: 'Separador',
                        de: "Separator",
                        zh: '分隔器',
                        jp: "セパレータ",
                        es: "Separador",
                        ko: "분리 기호"
                    },
                    series: {
                        en: 'Series',
                        fr: 'Série',
                        pt: 'Series',
                        de: 'Serie',
                        zh: '系列',
                        jp: 'シリーズ',
                        es: 'Serie',
                        ko: '시리즈'
                    },
                    serieName: {
                        en: "Serie name",
                        fr: "Nom de la série",
                        pt: "Nome da série",
                        de: "Serienname",
                        zh: "系列名称",
                        jp: "シリーズ名",
                        es: "Nombre de la serie",
                        ko: "시리즈 이름"
                    },
                    shadow: {
                        en: "Shadow",
                        fr: "Ombre",
                        pt: "Sombra",
                        de: "Schatten",
                        zh: "阴影",
                        jp: "影",
                        es: "Sombra",
                        ko: "그림자"
                    },
                    shape: {
                        en: "Shape",
                        fr: "Forme",
                        pt: "Forma",
                        de: "Form",
                        zh: "形状",
                        jp: "形",
                        es: "Forma",
                        ko: "모양"
                    },
                    shiftHue: {
                        en: 'Shift hue',
                        fr: "Changement de teinte",
                        pt: "Mudança de cor",
                        de: "Farbwechsel",
                        zh: "颜色变化",
                        jp: "色変更",
                        es: "tono de cambio",
                        ko: "색상 변경"
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
                    showAllItemsAtIndex: {
                        en: 'Show all items at index',
                        fr: "Afficher tous les éléments à l'index",
                        pt: "Mostrar todos os itens no índice",
                        de: "Alle Elemente im Index anzeigen",
                        zh: "显示索引处的所有项目",
                        jp: "インデックスにあるすべてのアイテムを表示",
                        es: "Mostrar todos los elementos en el índice",
                        ko: "색인의 모든 항목 표시"
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
                    showPlusSymbol: {
                        en: 'Show plus symbol',
                        fr: "Montrer le signe +",
                        pt: "Mostrar símbolo de mais",
                        de: "Plus-Symbol anzeigen",
                        zh: "显示加号",
                        jp: "プラス記号を表示",
                        es: "Mostrar símbolo más",
                        ko: "더하기 기호 표시"
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
                    significance: {
                        en: 'Significance',
                        fr: "Précision",
                        pt: "Significado",
                        de: "Bedeutung",
                        zh: "意义",
                        jp: "意義",
                        es: "Significado",
                        ko: "중요성"
                    },
                    size: {
                        en: "Size",
                        fr: "Taille",
                        pt: "Tamanho",
                        de: "Größe",
                        zh: "尺寸",
                        jp: "サイズ",
                        es: "Tamaño",
                        ko: "크기"
                    },
                    smooth: {
                        en: "Curved line",
                        fr: "Ligne courbe",
                        pt: "Linha curvada",
                        de: "Gekrümmte Linie",
                        zh: "曲线",
                        jp: "曲線",
                        es: "Línea curva",
                        ko: "곡선"
                    },
                    sortingOrder: {
                        en: 'Sorting order',
                        fr: "Ordre de tri",
                        pt: "Ordem de classificação",
                        de: "Sortierreihenfolge",
                        zh: "排序顺序",
                        jp: "並べ替え順序",
                        es: "Orden de clasificación",
                        ko: "정렬 순서"
                    },
                    spacing: {
                        en: "Spacing",
                        fr: "Espacement",
                        pt: "Espaçamento",
                        de: "Abstand",
                        zh: "间距",
                        jp: "間隔",
                        es: "Espaciado",
                        ko: "간격"
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
                    speed: {
                        en: 'Speed',
                        fr: "Vitesse",
                        pt: "Velocidade",
                        de: "Geschwindigkeit",
                        zh: "速度",
                        jp: "スピード",
                        es: "Velocidad",
                        ko: "속도"
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
                    tag: {
                        en: "Tag",
                        fr: "Etiquette",
                        pt: "Marcação",
                        de: "Etikett",
                        zh: "标签",
                        jp: "鬼ごっこ",
                        es: "Etiqueta",
                        ko: "꼬리표"
                    },
                    target: {
                        en: "Target",
                        fr: "Objectif",
                        pt: "Alvo",
                        de: "Ziel",
                        zh: "目标",
                        jp: "目標",
                        es: "Objetivo",
                        ko: "표적"
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
                    ticks: {
                        en: 'Ticks',
                        fr: "Marques",
                        pt: "Marcas",
                        de: "Zecken",
                        zh: "品牌",
                        jp: "ブランド",
                        es: "Marcas",
                        ko: "순간"
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
                    total: {
                        en: 'Total',
                        fr: 'Total',
                        pt: "Total",
                        de: "Gesamt",
                        zh: "全部的",
                        jp: "合計",
                        es: "Total",
                        ko: "총"
                    },
                    track: {
                        en: 'Track',
                        fr: "Piste",
                        pt: "Pista",
                        de: "Spur",
                        zh: "追踪",
                        jp: "追跡",
                        es: "Pista",
                        ko: "길"
                    },
                    translation: {
                        en: 'Translation',
                        fr: "Traduction",
                        pt: "Tradução",
                        de: "Übersetzung",
                        zh: "翻译",
                        jp: "翻訳",
                        es: "Traducción",
                        ko: "번역"
                    },
                    transparent: {
                        en: 'Transparent',
                        fr: "Transparent",
                        pt: "Transparente",
                        de: "Transparent",
                        zh: '透明的',
                        jp: "透明",
                        es: "Transparente",
                        ko: "투명한"
                    },
                    type: {
                        en: "Type",
                        fr: "Type",
                        pt: "Tipo",
                        de: "Typ",
                        zh: "类型",
                        jp: "タイプ",
                        es: "タイプ",
                        ko: "유형"
                    },
                    useBlurOnHover: {
                        en: "Blur on hover",
                        fr: "Flou au survol",
                        pt: "Desfocar ao passar o mouse",
                        de: "Unschärfe beim Schweben",
                        zh: "Unschärfe beim Schweben",
                        jp: "ホバー時にぼかし",
                        es: "Desenfoque al pasar el cursor",
                        ko: "마우스를 올리면 흐림"
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
                    value: {
                        en: "Value",
                        fr: "Valeur",
                        pt: "Valor",
                        de: "Wert",
                        zh: "价格",
                        jp: "値",
                        es: "Valor",
                        ko: "값"
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
                    vertical: {
                        en: "Vertical",
                        fr: "Vertical",
                        pt: 'Vertical',
                        de: "Vertikal",
                        zh: "垂直的",
                        jp: "垂直",
                        es: "Vertical",
                        ko: "수직의"
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
                    weight: {
                        en: 'Weight',
                        fr: "Poids",
                        pt: "Peso",
                        de: "Gewicht",
                        zh: "重量",
                        jp: "重さ",
                        es: "Peso",
                        ko: "무게"
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
                    x: {
                        en: 'X',
                        fr: 'X',
                        pt: 'X',
                        de: "X",
                        zh: "X",
                        jp: "X", 
                        es: "X",
                        ko: "X"
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
                    y: {
                        en: 'Y',
                        fr: 'Y',
                        pt: 'Y',
                        de: "Y",
                        zh: "Y",
                        jp: "Y", 
                        es: "Y",
                        ko: "Y"
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
                    zeroAxis: {
                        en: 'Zero axis',
                        fr: "Axe zéro",
                        pt: "Eixo zero",
                        de: "Nullachse",
                        zh: "零轴",
                        jp: "ゼロ軸",
                        es: "Eje cero",
                        ko: "영축"
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