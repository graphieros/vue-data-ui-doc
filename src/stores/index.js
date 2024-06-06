import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            stars: 0,
            issues: 0,
            isMenuOpen: false,
            isDarkMode: true,
            isCopy: false,
            isFetching: false,
            hints: {
                pin: {
                    en: "Pin the chart to the left so you can visualize configuration changes when you scroll.",
                    fr: "Épinglez le graphique à gauche afin de pouvoir visualiser les modifications de configuration lorsque vous faites défiler.",
                    pt: "Fixe o gráfico à esquerda para poder visualizar as alterações de configuração ao rolar.",
                    de: "Fixieren Sie das Diagramm auf der linken Seite, damit Sie Konfigurationsänderungen beim Scrollen visualisieren können.",
                    zh: "将图表固定在左侧，以便您在滚动时可以直观地看到配置更改。",
                    jp: "グラフを左側に固定すると、スクロール時に構成の変更を視覚化できます。",
                    es: "Fije el gráfico a la izquierda para que pueda visualizar los cambios de configuración cuando se desplaza.",
                    ko: "스크롤할 때 구성 변경 사항을 시각화할 수 있도록 차트를 왼쪽에 고정합니다."
                }
            },
            lang: "en",
            translations: {
                sideMenu: {
                    miniCharts: {
                        en: "Mini charts",
                        fr: "Mini-graphiques",
                        pt: "Minigráficos",
                        de: "Mini-Charts",
                        zh: "迷你图表",
                        jp: "ミニチャート",
                        es: "Mini gráficos",
                        ko: "미니 차트",
                    },
                    charts: {
                        en: "Charts",
                        fr: "Graphiques",
                        pt: "Gráficos",
                        de: "Diagramme",
                        zh: "图表",
                        jp: "チャート",
                        es: "Gráficos",
                        ko: "차트",
                    },
                    charts3d: {
                        en: "3d charts",
                        fr: "Graphiques 3d",
                        pt: "Gráficos 3d",
                        de: "3d-Diagramme",
                        zh: "3D图表",
                        jp: "3Dチャート",
                        es: "3d Gráficos",
                        ko: "3D 차트",
                    },
                    tables: {
                        en: "Data tables",
                        fr: "Tableaux",
                        pt: "Tabelas de dados",
                        de: "Datentabellen",
                        zh: "数据表",
                        jp: "データテーブル",
                        es: "Tablas de datos",
                        ko: "데이터 테이블",
                    },
                    rating: {
                        en: "Rating",
                        fr: "Notation",
                        pt: "Avaliação",
                        de: "Bewertung",
                        zh: "评分",
                        jp: "評価",
                        es: "Clasificación",
                        ko: "평가",
                    },
                    utilities: {
                        en: "Utilities",
                        fr: "Utilitaires",
                        pt: "Utilidades",
                        de: "Nützlichkeit",
                        zh: "公用事业",
                        jp: "公共事業",
                        es: "Utilidades",
                        ko: "유용",
                    }
                },
                maker: {
                    labels: {
                        period: {
                            en: "Period",
                            fr: "Période",
                            pt: "Período",
                            de: "Zeitraum",
                            zh: "时期",
                            jp: "期間",
                            es: "Período",
                            ko: "기간"
                        }
                    },
                    tooltips: {
                        addCategory: {
                            en: 'Add category',
                            fr: "Ajouter une catégorie",
                            pt: "Adicionar uma categoria",
                            de: "Fügen Sie eine Kategorie hinzu",
                            zh: "添加类别",
                            jp: "カテゴリを追加する",
                            es: "Añadir una categoría",
                            ko: "카테고리 추가"
                        },
                        addDataset: {
                            en: "Add dataset",
                            fr: "Ajout jeu de données",
                            pt: "Adicionar conjunto de dados",
                            de: "Datensatz hinzufügen",
                            zh: "添加数据集",
                            jp: "データセットの追加",
                            es: "Agregar conjunto de datos",
                            ko: "데이터 세트 추가"
                        },
                        addData: {
                            en: "Add data",
                            fr: "Ajout données",
                            pt: "Adicionar dados",
                            de: "Daten hinzufügen",
                            zh: "添加数据",
                            jp: "データの追加",
                            ko: "データの追加"
                        },
                        delete: {
                            en: "Delete",
                            fr: "Supprimer",
                            pt: "Excluir",
                            de: "Löschen",
                            zh: "删除",
                            jp: "消去",
                            es: "Borrar",
                            ko: "삭제"
                        }
                    }
                },
                getTheme: {
                    en: `Since version 2.1.9, you can apply on of the 3 themes to all charts. Just set the 'theme' config attribute to either "", "zen", "hack" or "concrete". Theme objects can be retrieved by importing and calling the getThemeConfig function, passing as a parameter the key corresponding to the component.`,
                    fr: `Depuis la version 2.1.9, vous pouvez appliquer l'un des 3 thèmes à tous les graphiques. Définissez simplement l'attribut de configuration 'theme' sur "", "zen", "hack" ou "concrete". Les objets thème peuvent être récupérés en important et en appelant la fonction getThemeConfig, en passant en paramètre la clé correspondant au composant.`,
                    pt: `Desde a versão 2.1.9, você pode aplicar um dos 3 temas a todos os gráficos. Basta definir o atributo de configuração 'tema' como "", "zen", "hack" ou "concrete". Os objetos do tema podem ser recuperados importando e chamando a função getThemeConfig, passando como parâmetro a chave correspondente ao componente.`,
                    de: `Seit Version 2.1.9 können Sie eines der drei Themen auf alle Diagramme anwenden. Setzen Sie einfach das Konfigurationsattribut „Theme“ auf „“, „zen“, „hack“ oder „concrete“. Theme-Objekte können durch Importieren und Aufrufen der getThemeConfig-Funktion abgerufen werden, wobei als Parameter der der Komponente entsprechende Schlüssel übergeben wird.`,
                    zh: `从版本 2.1.9 开始，您可以将 3 个主题中的一个应用到所有图表。只需将“主题”配置属性设置为“”、“zen”、“hack”或“concrete”即可。可以通过导入并调用 getThemeConfig 函数来检索主题对象，并将与组件对应的键作为参数传递。`,
                    jp: `バージョン 2.1.9 以降、3 つのテーマのいずれかをすべてのチャートに適用できるようになりました。 「テーマ」構成属性を「」、「zen」、「hack」、「concrete」のいずれかに設定するだけです。テーマ オブジェクトは、getThemeConfig 関数をインポートして呼び出し、コンポーネントに対応するキーをパラメータとして渡すことで取得できます。`,
                    es: `Desde la versión 2.1.9, puede aplicar uno de los 3 temas a todos los gráficos. Simplemente configure el atributo de configuración 'tema' en "", "zen", "hack" o "concrete". Los objetos del tema se pueden recuperar importando y llamando a la función getThemeConfig, pasando como parámetro la clave correspondiente al componente.`,
                    ko: `버전 2.1.9부터 3가지 테마 중 하나를 모든 차트에 적용할 수 있습니다. 'theme' 구성 속성을 "", "zen", "hack" 또는 "concrete"로 설정하기만 하면 됩니다. 테마 개체는 getThemeConfig 함수를 가져오고 호출하여 구성 요소에 해당하는 키를 매개 변수로 전달하여 검색할 수 있습니다.`
                },
                getConfig: {
                    en: "Since version v.1.9.93 you can get any configuration object by importing and calling the getVueDataUiConfig function, passing as a parameter the key corresponding to the component.",
                    fr: "Depuis la version v.1.9.93 vous pouvez obtenir n'importe quel objet de configuration en important et en appelant la fonction getVueDataUiConfig, en passant en paramètre la clé correspondant au composant.",
                    pt: "Desde a versão v.1.9.93 você pode obter qualquer objeto de configuração importando e chamando a função getVueDataUiConfig, passando como parâmetro a chave correspondente ao componente.",
                    de: "Seit Version v.1.9.93 können Sie jedes Konfigurationsobjekt erhalten, indem Sie die Funktion getVueDataUiConfig importieren und aufrufen und dabei als Parameter den der Komponente entsprechenden Schlüssel übergeben.",
                    zh: "从 v.1.9.93 版本开始，您可以通过导入并调用 getVueDataUiConfig 函数来获取任何配置对象，并将与组件对应的键作为参数传递。",
                    jp: "バージョン v.1.9.93 以降、getVueDataUiConfig 関数をインポートして呼び出し、コンポーネントに対応するキーをパラメータとして渡すことで、任意の構成オブジェクトを取得できます。",
                    es: "Desde la versión v.1.9.93 se puede obtener cualquier objeto de configuración importando y llamando a la función getVueDataUiConfig, pasando como parámetro la clave correspondiente al componente.",
                    ko: "버전 v.1.9.93부터 getVueDataUiConfig 함수를 가져오고 호출하여 구성 요소에 해당하는 키를 매개 변수로 전달하여 구성 개체를 얻을 수 있습니다."
                },
                viewSelectedTheme: {
                    en: "View selected themes",
                    fr: "Afficher les thèmes sélectionnés",
                    pt: "Ver temas selecionados",
                    de: "Ausgewählte Themen anzeigen",
                    zh: "查看选定的主题",
                    jp: "選択したテーマを表示する",
                    es: "Ver temas seleccionados",
                    ko: "선택한 테마 보기"
                },
                viewSelectedConfig: {
                    en: "View selected config",
                    fr: "Voir la config sélectionnée",
                    pt: "Ver configuração selecionada",
                    de: "Ausgewählte Konfiguration anzeigen",
                    zh: "查看选定的配置",
                    jp: "選択した構成を表示する",
                    es: "Ver configuración seleccionada",
                    ko: "선택한 구성 보기"
                },
                clickToCopy: {
                    en: "Click to copy",
                    fr: "Cliquez pour copier",
                    pt: "Clique para copiar",
                    de: "Klicken Sie zum Kopieren",
                    zh: "点击复制",
                    jp: "クリックしてコピー",
                    es: "Haga clic para copiar",
                    ko: "복사하려면 클릭하세요."
                },
                githubCode: {
                    en: "View source code",
                    fr: "Afficher le code source",
                    pt: "Ver código-fonte",
                    de: "Quellcode anzeigen",
                    zh: "查看源代码",
                    jp: "ソースコードを表示する",
                    es: "Ver código fuente",
                    ko: "소스 코드 보기"
                },
                downloads: {
                    en: "Downloads:",
                    fr: "Téléchargements:",
                    pt: "Transferências:",
                    de: "Downloads:",
                    zh: "下载次数：",
                    jp: "ダウンロード:",
                    es: "Descargas:",
                    ko: "다운로드:"
                },
                tableCss: {
                    summary: {
                        en: "Components marked with this icon include a togglable data table (usable if user options are enabled, which they are by default), with exposed css classes to adjust to your design system.",
                        fr: "Les composants marqués de cette icône incluent un dataTable à bascule (utilisable si les options utilisateur sont activées, ce qui est le cas par défaut), avec des classes CSS exposées pour s'adapter à votre système de conception.",
                        pt: "Os componentes marcados com este ícone incluem uma dataTable de alternância (utilizável se as opções do usuário estiverem habilitadas, o que é o padrão), com classes CSS expostas para ajustar ao seu sistema de design.",
                        de: "Zu den mit diesem Symbol gekennzeichneten Komponenten gehört eine umschaltbare Datentabelle (verwendbar, wenn Benutzeroptionen aktiviert sind, was standardmäßig der Fall ist) mit verfügbar gemachten CSS-Klassen zur Anpassung an Ihr Designsystem.",
                        zh: "标有此图标的组件包括一个切换数据表（如果启用用户选项则可用，默认情况下），以及公开的 css 类以适应您的设计系统。",
                        jp: "このアイコンでマークされたコンポーネントには、デザイン システムに合わせて調整する公開 CSS クラスを備えた切り替え dataTable (ユーザー オプションがデフォルトで有効になっている場合に使用可能) が含まれています。",
                        es: "Los componentes marcados con este icono incluyen una tabla de datos de alternancia (que se puede utilizar si las opciones del usuario están habilitadas, lo cual es lo predeterminado), con clases CSS expuestas para ajustarse a su sistema de diseño.",
                        ko: "이 아이콘으로 표시된 구성 요소에는 토글 dataTable(기본적으로 사용자 옵션이 활성화된 경우 사용 가능)과 디자인 시스템에 맞게 조정하기 위한 노출된 CSS 클래스가 포함됩니다."
                    },
                    cta: {
                        en: "View css classes",
                        fr: "Afficher les classes css",
                        pt: "Ver CSS exposto",
                        de: "Offengelegtes CSS anzeigen",
                        zh: "查看暴露的CSS",
                        jp: "公開された CSS を表示する",
                        es: "Ver CSS expuesto",
                        ko: "CSS 수업 보기"
                    }
                },
                slots: {
                    sparklineBefore: {
                        en: "This component contains a #before 'slot' exposing data you can use to customize labels for your chart: details of the selected datapoint, sum, average, median, trend, latest value.",
                        fr: "Ce composant contient un 'slot' #before exposant les données que vous pouvez utiliser pour personnaliser les étiquettes de votre graphique : détails du point de données sélectionné, somme, moyenne, médiane, tendance, dernière valeur.",
                        pt: "Este componente contém um 'slot' #before de exposição de dados que você pode usar para personalizar rótulos para seu gráfico: detalhes do ponto de dados selecionado, soma, média, mediana, tendência, valor mais recente.",
                        de: "Diese Komponente enthält einen #before-Slot, in dem Daten angezeigt werden, mit denen Sie Beschriftungen für Ihr Diagramm anpassen können: Details zum ausgewählten Datenpunkt, Summe, Durchschnitt, Median, Trend, aktueller Wert.",
                        zh: "该组件包含一个#before“槽”，公开可用于自定义图表标签的数据：所选数据点的详细信息、总和、平均值、中值、趋势、最新值。",
                        jp: "このコンポーネントには、チャートのラベルをカスタマイズするために使用できるデータを公開する #before 'slot' が含まれています: 選択したデータポイントの詳細、合計、平均、中央値、トレンド、最新値。",
                        es: "Este componente contiene un 'espacio' #before que expone datos que puede usar para personalizar etiquetas para su gráfico: detalles del punto de datos seleccionado, suma, promedio, mediana, tendencia, valor más reciente.",
                        ko: "이 구성 요소에는 차트 레이블을 사용자 정의하는 데 사용할 수 있는 데이터(선택한 데이터 포인트, 합계, 평균, 중앙값, 추세, 최신 값)에 대한 세부 정보를 노출하는 #before '슬롯'이 포함되어 있습니다."
                    },
                    warning: {
                        en: "This component works with 'slots'. See the 'slots' tab for an example.",
                        fr: "Ce composant fonctionne avec des « slots ». Voir l'onglet « slots » pour un exemple.",
                        pt: "Este componente funciona com 'slots'. Veja um exemplo na aba 'slots'.",
                        de: "Diese Komponente arbeitet mit „Slots“. Ein Beispiel finden Sie auf der Registerkarte „Slots“.",
                        zh: "该组件与“槽”一起使用。有关示例，请参阅“插槽”选项卡。",
                        jp: "このコンポーネントは「スロット」で動作します。例については、「スロット」タブを参照してください。",
                        es: "Este componente funciona con 'slots'. Consulte la pestaña 'slots' para ver un ejemplo.",
                        ko: "이 구성요소는 '슬롯'과 함께 작동합니다. 예시는 '슬롯' 탭을 참조하세요."
                    },
                    resetButton: {
                        en: 'This component contains a zoom slider, which reset button can be customized through the #reset-action slot.',
                        fr: `Ce composant contient un curseur de zoom, dont le bouton de réinitialisation peut être personnalisé via l'emplacement #reset-action.`,
                        pt: `Este componente contém um controle deslizante de zoom, cujo botão de reset pode ser personalizado através do slot #reset-action.`,
                        de: `Diese Komponente enthält einen Zoom-Schieberegler, dessen Reset-Taste über den #reset-action-Slot angepasst werden kann.`,
                        zh: "该组件包含一个缩放滑块，可以通过 #reset-action 插槽自定义重置按钮。",
                        jp: "このコンポーネントにはズーム スライダーが含まれており、このリセット ボタンは #reset-action スロットを通じてカスタマイズできます。",
                        es: "Este componente contiene un control deslizante de zoom, cuyo botón de reinicio se puede personalizar a través de la ranura #reset-action.",
                        ko: "이 구성 요소에는 #reset-action 슬롯을 통해 재설정 버튼을 사용자 정의할 수 있는 확대/축소 슬라이더가 포함되어 있습니다."
                    },
                    donutDataLabels: {
                        en: "Custom datalabels can be obtained using the #dataLabel scoped slot. You can place anything you want inside this slot (icon, image, another chart...).",
                        fr: "Des étiquettes de données personnalisées peuvent être obtenues à l'aide du slot #dataLabel. Vous pouvez placer tout ce que vous voulez à l'intérieur de cet emplacement (icône, image, autre graphique...).",
                        pt: "Datalabels personalizados podem ser obtidos usando o slot com escopo #dataLabel. Você pode colocar o que quiser dentro deste slot (ícone, imagem, outro gráfico...).",
                        de: "Benutzerdefinierte Datenbeschriftungen können über den Bereichsslot #dataLabel abgerufen werden. Sie können in diesem Slot alles platzieren, was Sie möchten (Symbol, Bild, ein anderes Diagramm ...).",
                        zh: "可以使用 #dataLabel 范围槽获取自定义数据标签。您可以在此槽中放置任何您想要的内容（图标、图像、另一个图表...）。",
                        jp: "カスタム データラベルは、#dataLabel スコープ スロットを使用して取得できます。このスロット内には何でも配置できます (アイコン、画像、別のグラフなど)。",
                        es: "Se pueden obtener etiquetas de datos personalizadas utilizando la ranura con alcance #dataLabel. Puedes colocar lo que quieras dentro de esta ranura (icono, imagen, otro gráfico...).",
                        ko: "#dataLabel 범위 슬롯을 사용하여 사용자 정의 데이터 라벨을 얻을 수 있습니다. 이 슬롯에는 원하는 것은 무엇이든 넣을 수 있습니다(아이콘, 이미지, 다른 차트...)."
                    },
                    rect: {
                        en: "This component contains a #rect slot to customize the treemap's cells contents. Be sure to set the config option style.chart.layout.labels.showDefaultLabels to 'false'.",
                        fr: "Ce composant contient un emplacement #rect pour personnaliser le contenu des cellules du treemap. Assurez-vous de définir l'option de configuration style.chart.layout.labels.showDefaultLabels sur « false ».",
                        pt: "Este componente contém um slot #rect para personalizar o conteúdo das células do mapa de árvore. Certifique-se de definir a opção de configuração style.chart.layout.labels.showDefaultLabels como 'false'.",
                        de: "Diese Komponente enthält einen #rect-Slot zum Anpassen des Zellinhalts der Treemap. Stellen Sie sicher, dass die Konfigurationsoption style.chart.layout.labels.showDefaultLabels auf „false“ gesetzt ist.",
                        zh: "该组件包含一个#rect 槽来自定义树形图的单元格内容。请务必将配置选项 style.chart.layout.labels.showDefaultLabels 设置为“false”。",
                        jp: "このコンポーネントには、ツリーマップのセルの内容をカスタマイズするための #rect スロットが含まれています。構成オプション style.chart.layout.labels.showDefaultLabels を必ず「false」に設定してください。",
                        es: "Este componente contiene una ranura #rect para personalizar el contenido de las celdas del mapa de árbol. Asegúrese de configurar la opción de configuración style.chart.layout.labels.showDefaultLabels en 'falso'.",
                        ko: "이 구성 요소에는 트리맵의 셀 내용을 사용자 정의하기 위한 #ect 슬롯이 포함되어 있습니다. 구성 옵션 style.chart.layout.labels.showDefaultLabels를 'false'로 설정하세요."
                    },
                    tooltip: {
                        en: 'This component contains a #tooltip-before and #tooltip-after slots, to customize the tooltip contents. Through these slots, you can inject images, charts, text etc.',
                        fr: "Ce composant contient des emplacements #tooltip-before et #tooltip-after, pour personnaliser le contenu de l'info-bulle. Grâce à ces emplacements, vous pouvez injecter des images, des graphiques, du texte, etc.",
                        pt: "Este componente contém slots #tooltip-before e #tooltip-after, para personalizar o conteúdo da dica de ferramenta. Através desses slots, você pode injetar imagens, gráficos, texto etc.",
                        de: "Diese Komponente enthält die Slots #tooltip-before und #tooltip-after, um den Tooltip-Inhalt anzupassen. Über diese Slots können Sie Bilder, Diagramme, Text usw. einfügen.",
                        zh: "该组件包含 #tooltip-before 和 #tooltip-after 插槽，用于自定义工具提示内容。通过这些插槽，您可以注入图像、图表、文本等。",
                        jp: "このコンポーネントには、ツールチップの内容をカスタマイズするための #tooltip-before スロットと #tooltip-after スロットが含まれています。これらのスロットを通じて、画像、グラフ、テキストなどを挿入できます。",
                        es: "Este componente contiene espacios #tooltip-before y #tooltip-after, para personalizar el contenido de la información sobre herramientas. A través de estas ranuras, puede inyectar imágenes, gráficos, texto, etc.",
                        ko: "이 구성 요소에는 도구 설명 내용을 사용자 정의하기 위한 #tooltip-before 및 #tooltip-after 슬롯이 포함되어 있습니다. 이 슬롯을 통해 이미지, 차트, 텍스트 등을 삽입할 수 있습니다."
                    },
                    legendDetail: {
                        en: "This component contains a #legend slot you can use to customize your own legend. The slot provides formatted data you can use to ease the process.",
                        fr: "Ce composant contient un slot #legend que vous pouvez utiliser pour personnaliser votre propre légende. Le slot fournit des données formatées que vous pouvez utiliser pour faciliter le processus.",
                        pt: "Este componente contém um slot #legend que você pode usar para personalizar sua própria legenda. O slot fornece dados formatados que você pode usar para facilitar o processo.",
                        de: "Diese Komponente enthält einen #legend-Slot, den Sie zum Anpassen Ihrer eigenen Legende verwenden können. Der Steckplatz stellt formatierte Daten bereit, die Sie zur Vereinfachung des Vorgangs verwenden können.",
                        zh: "该组件包含一个 #legend 插槽，您可以使用它来自定义您自己的图例。该插槽提供了可用于简化该过程的格式化数据。",
                        jp: "このコンポーネントには、独自の凡例をカスタマイズするために使用できる #legend スロットが含まれています。スロットは、プロセスを容易にするために使用できるフォーマットされたデータを提供します。",
                        es: "Este componente contiene una ranura #legend que puede utilizar para personalizar su propia leyenda. La ranura proporciona datos formateados que puede utilizar para facilitar el proceso.",
                        ko: "이 구성 요소에는 자신만의 범례를 사용자 정의하는 데 사용할 수 있는 #legend 슬롯이 포함되어 있습니다. 슬롯은 프로세스를 쉽게 하는 데 사용할 수 있는 형식화된 데이터를 제공합니다."
                    },
                    legend: {
                        en: "Components marked with this icon provide a #legend slot to create your own custom legend.",
                        fr: "Les composants marqués de cette icône fournissent un slot #legend pour créer votre propre légende personnalisée.",
                        pt: "Os componentes marcados com este ícone fornecem um espaço #legend para criar sua própria legenda personalizada.",
                        de: "Mit diesem Symbol gekennzeichnete Komponenten bieten einen #legend-Slot zum Erstellen Ihrer eigenen benutzerdefinierten Legende.",
                        zh: "标有此图标的组件提供#legend 插槽来创建您自己的自定义图例。",
                        jp: "このアイコンの付いたコンポーネントは、独自のカスタム凡例を作成するための #legend スロットを提供します。",
                        es: "Los componentes marcados con este ícono proporcionan una ranura #legend para crear su propia leyenda personalizada.",
                        ko: "이 아이콘이 표시된 구성요소는 사용자 정의 범례를 생성할 수 있는 #legend 슬롯을 제공합니다."
                    },
                    summary: {
                        en: "Components marked with this icon provide a #svg slot to extend the svg with custom elements.",
                        fr: "Les composants marqués de cette icône fournissent un slot #svg pour étendre le svg avec des éléments personnalisés.",
                        pt: "Os componentes marcados com este ícone fornecem um slot #svg para estender o svg com elementos personalizados.",
                        de: "Mit diesem Symbol gekennzeichnete Komponenten bieten einen #svg-Slot, um die SVG-Datei mit benutzerdefinierten Elementen zu erweitern.",
                        zh: "标有此图标的组件提供 #svg 槽，以使用自定义元素扩展 svg。",
                        jp: "このアイコンの付いたコンポーネントは、カスタム要素で svg を拡張するための #svg スロットを提供します。",
                        es: "Los componentes marcados con este icono proporcionan una ranura (slot) #svg para ampliar el archivo svg con elementos personalizados.",
                        ko: "이 아이콘으로 표시된 구성 요소는 사용자 정의 요소로 svg를 확장할 수 있는 #svg 슬롯을 제공합니다."
                    },
                    summaryLink: {
                        en: "View an example",
                        fr: "Voir un exemple",
                        pt: "Veja um exemplo",
                        de: "Sehen Sie sich ein Beispiel an",
                        zh: "查看示例",
                        jp: "例を見る",
                        es: "Ver un ejemplo",
                        ko: "예시 보기"
                    },
                    presentation: {
                        en: "This component contains a #svg slot you can use to introduce your own customized svg elements into the chart, and through which the dimensions of the svg viewBox are exposed. Any svg element added in this slot will be displayed on the last layer of the svg, enabling any mouse or touch events you might want to use, however possibly hindering the component's own mouse events.",
                        fr: "Ce composant contient un emplacement #svg que vous pouvez utiliser pour introduire vos propres éléments svg personnalisés dans le graphique et à travers lequel les dimensions de la viewBox svg sont exposées. Tout élément svg ajouté dans cet emplacement sera affiché sur la dernière couche du svg, permettant tous les événements de souris ou tactiles que vous pourriez vouloir utiliser, mais pouvant éventuellement gêner les propres événements de souris du composant.",
                        pt: "Este componente contém um slot #svg que você pode usar para introduzir seus próprios elementos SVG personalizados no gráfico e por meio do qual as dimensões da viewBox SVG são expostas. Qualquer elemento svg adicionado neste slot será exibido na última camada do svg, habilitando quaisquer eventos de mouse ou toque que você queira usar, mas possivelmente prejudicando os eventos de mouse do próprio componente.",
                        de: "Diese Komponente enthält einen #svg-Slot, mit dem Sie Ihre eigenen benutzerdefinierten SVG-Elemente in das Diagramm einfügen können und über den die Abmessungen der SVG-ViewBox angezeigt werden. Jedes in diesem Slot hinzugefügte SVG-Element wird auf der letzten Ebene des SVG angezeigt und aktiviert alle Maus- oder Berührungsereignisse, die Sie möglicherweise verwenden möchten, behindert jedoch möglicherweise die eigenen Mausereignisse der Komponente.",
                        zh: "该组件包含一个 #svg 插槽，您可以使用它来将您自己的自定义 svg 元素引入到图表中，并通过它公开 svg viewBox 的尺寸。在此槽中添加的任何 svg 元素都将显示在 svg 的最后一层上，从而启用您可能想要使用的任何鼠标或触摸事件，但可能会阻碍组件自己的鼠标事件。",
                        jp: "このコンポーネントには、独自にカスタマイズした svg 要素をチャートに導入するために使用できる #svg スロットが含まれており、これを通じて svg viewBox の寸法が公開されます。このスロットに追加された svg 要素はすべて svg の最後のレイヤーに表示され、使用したいマウス イベントやタッチ イベントが有効になりますが、コンポーネント自体のマウス イベントが妨げられる可能性があります。",
                        es: "Este componente contiene una ranura #svg que puede utilizar para introducir sus propios elementos svg personalizados en el gráfico y a través de la cual se exponen las dimensiones del viewBox svg. Cualquier elemento svg agregado en esta ranura se mostrará en la última capa del svg, lo que permitirá cualquier evento táctil o de mouse que desee usar, aunque posiblemente obstaculice los eventos de mouse propios del componente.",
                        ko: "이 구성 요소에는 사용자 정의된 svg 요소를 차트에 도입하고 svg viewBox의 크기가 노출되는 데 사용할 수 있는 #svg 슬롯이 포함되어 있습니다. 이 슬롯에 추가된 모든 svg 요소는 svg의 마지막 레이어에 표시되어 사용하려는 마우스 또는 터치 이벤트를 활성화하지만 구성 요소 자체의 마우스 이벤트를 방해할 수도 있습니다."
                    }
                },
                search: {
                    componentSelect: {
                        en: "Select component...",
                        fr: "Sélectionnez le composant...",
                        pt: "Selecione o componente...",
                        de: "Komponente auswählen...",
                        zh: "选择组件...",
                        jp: "コンポーネントを選択...",
                        es: "Seleccionar componente...",
                        ko: "구성품을 선택하세요.."
                    },
                    noResults: {
                        en: "No results found",
                        fr: "Aucun résultat trouvé",
                        pt: "Nenhum resultado encontrado",
                        de: "keine Ergebnisse gefunden",
                        zh: "未找到结果",
                        jp: "結果が見つかりません",
                        es: "No se han encontrado resultados" ,
                        ko: "검색 결과가 없습니다"
                    },
                    viewComponentCode: {
                        en: "View component code",
                        fr: "Voir le code du composant",
                        pt: "Ver código do componente",
                        de: "Komponentencode anzeigen",
                        zh: "查看组件代码",
                        jp: "コンポーネントコードを表示する",
                        es: "Ver código de componente",
                        ko: "구성요소 코드 보기"
                    },
                    viewComponent: {
                        en: "View component",
                        fr: "Afficher le composant",
                        pt: "Ver componente",
                        de: "Komponente anzeigen",
                        zh: "查看组件",
                        jp: "ビューコンポーネント",
                        es: "Ver componente",
                        ko: "구성요소 보기"
                    },
                    defaultValue: {
                        en: "Default value",
                        fr: "Valeur par défaut",
                        pt: "Valor padrão",
                        de: "Standardwert",
                        zh: "默认值",
                        jp: "デフォルト値",
                        es: "Valor por defecto",
                        ko: "기본값"
                    },
                    close: {
                        en: "Close",
                        fr: "Terminé",
                        pt: "Fechar",
                        de: "Schließen",
                        zh: "关闭",
                        jp: "近い",
                        es: "Cerca",
                        ko: "닫다"
                    },
                    term: {
                        en: "Results for",
                        fr: "Résultats pour",
                        pt: "Resultados para",
                        de: "Ergebnisse für",
                        zh: "结果",
                        jp: "の結果",
                        es: "Resultados para",
                        ko: "다음에 대한 결과"
                    },
                    placeholder: {
                        en: "Search config...",
                        fr: "Rechercher une config...",
                        pt: "Configuração de pesquisa...",
                        de: "Konfiguration durchsuchen...",
                        zh: "搜索配置",
                        jp: "検索構成",
                        es: "Configuración de búsqueda...",
                        ko: "검색 구성.."
                    }
                },
                types: {
                    classic: {
                        en: "Classic",
                        fr: "Classique",
                        pt: "Clássico",
                        de: "Klassisch",
                        zh: "经典的",
                        jp: "クラシック",
                        es: "Clásico",
                        ko: "권위 있는"
                    },
                    measure: {
                        en: "Rating & Measure",
                        fr: "Notation et mesure",
                        pt: "Classificação e medição",
                        de: "Bewertung und Messung",
                        zh: "评级与测量",
                        jp: "評価と測定",
                        es: "Calificación y medida",
                        ko: "평가 및 측정"
                    },
                    mini: {
                        en: "Mini",
                        fr: "Miniature",
                        pt: "Miniatura",
                        de: "Miniatur",
                        zh: "微型",
                        jp: "ミニチュア",
                        es: "Miniatura",
                        ko: "세밀화"
                    },
                    combined: {
                        en: "Combined",
                        fr: "Combiné",
                        pt: "Combinado",
                        de: "Kombiniert",
                        zh: "组合",
                        jp: "組み合わせた",
                        es: "Conjunto",
                        ko: "결합"
                    },
                    table: {
                        en: "Table",
                        fr: "Tableau",
                        pt: "Tabela de dados",
                        de: "Datentabelle",
                        zh: "数据表",
                        jp: "データ表",
                        es: "Tabla de datos",
                        ko: "데이터 테이블"
                    },
                    semantic: {
                        en: "Semantic",
                        fr: "Sémantique",
                        pt: "Semântico",
                        de: "Semantisch",
                        zh: "语义学",
                        jp: "セマンティック",
                        es: "Semántico",
                        ko: "의미론적"
                    },
                    tool: {
                        en: "Tools",
                        fr: "Outils",
                        pt: "Ferramentas",
                        de: "Werkzeuge",
                        zh: "工具",
                        jp: "ツール",
                        es: "Herramientas",
                        ko: "도구"
                    }
                },
                nuxt: {
                    implementation: {
                        en: "If you are using Nuxt, an example of installation is provided in this Github repository",
                        fr: "Si vous utilisez Nuxt, un exemple d'installation est fourni dans ce dépôt Github",
                        pt: "Se você estiver usando Nuxt, um exemplo de instalação é fornecido neste repositório Github",
                        de: "Wenn Sie Nuxt verwenden, finden Sie in diesem Github-Repository ein Installationsbeispiel",
                        zh: "如果您使用 Nuxt，则此 Github 存储库中提供了安装示例",
                        jp: "Nuxt を使用している場合、インストールの例がこの Github リポジトリに提供されています。",
                        es: "Si está utilizando Nuxt, se proporciona un ejemplo de instalación en este repositorio de Github",
                        ko: "Nuxt를 사용하는 경우 Github 저장소에 설치 예가 제공됩니다."
                    }
                },
                tagline: {
                    en: "A user-empowering data visualization Vue3 components library for eloquent data storytelling.",
                    fr: "Bibliothèque de composants Vue3 pour la visualisation de données et data storytelling éloquente.",
                    pt: "Uma biblioteca de componentes Vue3 para visualização de dados, capacitando o usuário para contar histórias de dados eloquentes.",
                    de: "Eine benutzerfreundliche Datenvisualisierungs-Bibliothek mit Vue3-Komponenten für aussagekräftige Datenpräsentation.",
                    zh: "一个赋予用户权力的数据可视化 Vue3 组件库，用于巧妙地叙述数据故事。",
                    jp: "ユーザーに力を与えるデータ可視化のためのVue3コンポーネントライブラリ、なめらかなデータストーリーテリング向け。",
                    es: "Una biblioteca de componentes Vue3 para la visualización de datos, empoderando al usuario para contar historias de datos elocuentes.",
                    ko: "뛰어난 데이터 스토리텔링을 위한 사용자 친화적인 데이터 시각화 Vue3 컴포넌트 라이브러리입니다."
                },
                github: {
                    en: "Github repo",
                    fr: "Github repo",
                    pt: "Github repo",
                    de: "Github-Repository",
                    zh: "Github",
                    jp: "Github",
                    es: "Github",
                    ko: "Github 저장소"
                },
                lightMode: {
                    en: "Switch to light mode",
                    fr: "Passer en thème clair",
                    pt: "Mudar para o modo claro",
                    de: "Wechseln Sie in den Lichtmodus",
                    zh: "切换到灯光模式",
                    jp: "ライトモードに切り替える",
                    es: "Cambiar al modo de luz",
                    ko: "조명 모드로 전환"
                },
                darkMode: {
                    en: "Switch to dark mode",
                    fr: "Passer en thème sombre",
                    pt: "Mudar para o modo escuro",
                    de: "Wechseln Sie in den Dunkelmodus",
                    zh: "切换到深色模式",
                    jp: "ダークモードに切り替える",
                    es: "Cambiar al modo oscuro",
                    ko: "어두운 모드로 전환"
                },
                menu: {
                    examples: {
                        en: "Examples",
                        fr: "Exemples",
                        pt: "Exemplos",
                        de: "Beispiele",
                        zh: "例子",
                        jp: "例",
                        es: "Ejemplos",
                        ko: "예"
                    },
                    chartBuilder: {
                        en: "Chart builder",
                        fr: "Chart builder",
                        pt: "Chart builder",
                        de: "Chart builder",
                        zh: "图表生成器",
                        jp: "チャートビルダー",
                        es: "Chart builder",
                        ko: "차트 빌더"
                    },
                    customization: {
                        en: "Customization",
                        fr: "Customisation",
                        pt: "Costumização",
                        de: "Anpassung",
                        zh: "定制化",
                        jp: "カスタマイズ",
                        es: "Personalización",
                        ko: "맞춤화"
                    },
                    installation: {
                        en: "Installation",
                        fr: "Installation",
                        pt: "Instalação",
                        de: "Installation",
                        zh: "安装",
                        jp: "インストール",
                        es: "Instalación",
                        ko: "설치"
                    },
                    docs: {
                        en: "Docs",
                        fr: "Docs",
                        pt: "Documentação",
                        de: "Dokumentation",
                        zh: "文档",
                        jp: "ドキュメンテーション",
                        es: "Documentación",
                        ko: "선적 서류 비치"
                    },
                    dashboard: {
                        en: "Dashboard",
                        fr: "Dashboard",
                        pt: "Dashboard",
                        de: "Armaturenbrett",
                        zh: "仪表板",
                        jp: "ダッシュボード",
                        es: "Panel",
                        ko: "계기반"
                    },
                    versions: {
                        en: "Versions",
                        fr: "Versions",
                        pt: "Versões",
                        de: "Versionen",
                        zh: "版本",
                        jp: "バージョン",
                        es: "Versiones",
                        ko: "버전"
                    },
                    about: {
                        en: "About",
                        fr: "A propos",
                        pt: "Sobre",
                        de: "Über dieses Paket",
                        zh: "关于",
                        jp: "について",
                        es: "A proposito",
                        ko: "에 대한"
                    }
                },
                customization: {
                    palette: {
                        en: 'The default color palette contains the following 40 colors, which are accessible through the getPalette method you can import from vue-data-ui:',
                        fr: 'La palette de couleurs par défaut contient les 40 couleurs suivantes, accessibles via la méthode getPalette que vous pouvez importer depuis vue-data-ui :',
                        pt: 'A paleta de cores padrão contém as 40 cores a seguir, que podem ser acessadas por meio do método getPalette que você pode importar de vue-data-ui:',
                        de: "Die Standardfarbpalette enthält die folgenden 40 Farben, auf die über die getPalette-Methode zugegriffen werden kann, die Sie aus vue-data-ui importieren können:",
                        zh: '默认调色板包含以下 40 种颜色，可以通过从 vue-data-ui 导入的 getPalette 方法访问这些颜色：',
                        jp: "デフォルトのカラー パレットには次の 40 色が含まれており、vue-data-ui からインポートできる getPalette メソッドを通じてアクセスできます。",
                        es: "La paleta de colores predeterminada contiene los siguientes 40 colores, a los que se puede acceder mediante el método getPalette que puede importar desde vue-data-ui:",
                        ko: "기본 색상 팔레트에는 vue-data-ui에서 가져올 수 있는 getPalette 메소드를 통해 액세스할 수 있는 다음 40가지 색상이 포함되어 있습니다."
                    },
                    otherSlots: {
                        waffle: {
                            en: "Cell contents can be customized by setting the config.useCustomCells to 'true', and using the #cell slot.",
                            fr: "Le contenu des cellules peut être personnalisé en définissant config.useCustomCells sur « true » et en utilisant l'emplacement #cell.",
                            pt: "O conteúdo da célula pode ser personalizado definindo config.useCustomCells como 'true' e usando o slot #cell.",
                            de: "Zellinhalte können angepasst werden, indem config.useCustomCells auf „true“ gesetzt und der #cell-Slot verwendet wird.",
                            zh: "可以通过将 config.useCustomCells 设置为“true”并使用 #cell 槽来自定义单元格内容。",
                            jp: "セルの内容は、config.useCustomCells を「true」に設定し、#cell スロットを使用することでカスタマイズできます。",
                            es: `El contenido de la celda se puede personalizar configurando config.useCustomCells en "verdadero" y usando la ranura #cell.`,
                            ko: "config.useCustomCells를 'true'로 설정하고 #cell 슬롯을 사용하여 셀 내용을 사용자 정의할 수 있습니다."
                        }
                    },
                    tooltipSlot: {
                        en: 'To further customize tooltip contents, #tooltip-before & #tooltip-after slots are made available on the following components (which can also be used on the VueDataUi universal component):',
                        fr: "Pour personnaliser davantage le contenu des info-bulles, les emplacements #tooltip-before et #tooltip-after sont mis à disposition sur les composants suivants (qui peuvent également être utilisés sur le composant universel VueDataUi):",
                        pt: "Para personalizar ainda mais o conteúdo da dica de ferramenta, os slots #tooltip-before e #tooltip-after são disponibilizados nos seguintes componentes (que também podem ser usados ​​no componente universal VueDataUi):",
                        de: "Um den Tooltip-Inhalt weiter anzupassen, werden die Slots #tooltip-before und #tooltip-after auf den folgenden Komponenten verfügbar gemacht (die auch auf der VueDataUi-Universalkomponente verwendet werden können):",
                        zh: "为了进一步自定义工具提示内容，#tooltip-before 和 #tooltip-after 插槽可在以下组件上使用（也可以在 VueDataUi 通用组件上使用）：",
                        jp: "ツールチップの内容をさらにカスタマイズするには、次のコンポーネントで #tooltip-before および #tooltip-after スロットを使用できるようにします (VueDataUi ユニバーサル コンポーネントでも使用できます)。",
                        es: "Para personalizar aún más el contenido de la información sobre herramientas, las ranuras #tooltip-before y #tooltip-after están disponibles en los siguientes componentes (que también se pueden usar en el componente universal VueDataUi):",
                        ko: "도구 설명 내용을 추가로 사용자 정의하기 위해 다음 구성 요소에서 #tooltip-before 및 #tooltip-after 슬롯을 사용할 수 있습니다(VueDataUi 범용 구성 요소에서도 사용할 수 있음)."
                    },
                    legendAllowed: {
                        en: "The #legend slot is enabled for the following components:",
                        fr: "Le slot #legend est activé pour les composants suivants :",
                        pt: "O slot #legend está habilitado para os seguintes componentes:",
                        de: "Der #legend-Slot ist für die folgenden Komponenten aktiviert:",
                        zh: "#legend 插槽已为以下组件启用：",
                        jp: "#legend スロットは次のコンポーネントに対して有効です。",
                        es: "El slot #legend está habilitado para los siguientes componentes:",
                        ko: "#legend 슬롯은 다음 구성 요소에 대해 활성화됩니다."
                    },
                    legend: {
                        en: "Most charts have a '#legend' slot, from which a custom legend can be built. The slot provides necessary formatted data to ease the process.",
                        fr: "La plupart des graphiques disposent d'un slot « #legend », à partir duquel une légende personnalisée peut être créée. L'emplacement fournit les données formatées nécessaires pour faciliter le processus.",
                        pt: "A maioria dos gráficos possui um slot '#legend', a partir do qual uma legenda personalizada pode ser construída. O slot fornece os dados formatados necessários para facilitar o processo.",
                        de: "Die meisten Diagramme verfügen über einen „#legend“-Slot, aus dem eine benutzerdefinierte Legende erstellt werden kann. Der Steckplatz stellt die erforderlichen formatierten Daten bereit, um den Vorgang zu vereinfachen.",
                        zh: "大多数图表都有一个“#legend”槽，可以从中构建自定义图例。该插槽提供必要的格式化数据以简化该过程。",
                        jp: "ほとんどのグラフには「#legend」スロットがあり、そこからカスタム凡例を作成できます。スロットは、プロセスを容易にするために必要なフォーマットされたデータを提供します。",
                        es: "La mayoría de los gráficos tienen una ranura '#leyenda', a partir de la cual se puede crear una leyenda personalizada. La ranura proporciona los datos formateados necesarios para facilitar el proceso.",
                        ko: "대부분의 차트에는 사용자 정의 범례를 작성할 수 있는 '#legend' 슬롯이 있습니다. 슬롯은 프로세스를 쉽게 하기 위해 필요한 형식의 데이터를 제공합니다."
                    },
                    p1: {
                        en: "Most charts have a '#svg' slot you can use to inject any content you want, such as comments, descriptions, and even other charts. The slot provides the dimensions of the svg, so you can position your elements exactly where you need to. This page shows you how to do it.",
                        fr: "La plupart des graphiques disposent d'un emplacement « #svg » que vous pouvez utiliser pour injecter le contenu de votre choix, tel que des commentaires, des descriptions et même d'autres graphiques. La fente fournit les dimensions du svg, vous pouvez donc positionner vos éléments exactement là où vous en avez besoin. Cette page vous montre comment procéder.",
                        pt: "A maioria dos gráficos possui um slot '#svg' que você pode usar para inserir qualquer conteúdo desejado, como comentários, descrições e até outros gráficos. O slot fornece as dimensões do SVG, para que você possa posicionar seus elementos exatamente onde precisar. Esta página mostra como fazer isso.",
                        de: "Die meisten Diagramme verfügen über einen „#svg“-Slot, den Sie zum Einfügen beliebiger Inhalte wie Kommentare, Beschreibungen und sogar anderer Diagramme verwenden können. Der Schlitz gibt die Abmessungen des SVG an, sodass Sie Ihre Elemente genau dort positionieren können, wo Sie sie benötigen. Auf dieser Seite erfahren Sie, wie es geht.",
                        zh: "大多数图表都有一个“#svg”槽，您可以使用它来注入任何您想要的内容，例如评论、描述，甚至其他图表。该插槽提供了 svg 的尺寸，因此您可以将元素准确放置在您需要的位置。此页面向您展示了如何操作。",
                        jp: "ほとんどのチャートには、コメント、説明、さらには他のチャートなど、必要なコンテンツを挿入するために使用できる「#svg」スロットがあります。スロットは SVG の寸法を提供するため、必要な場所に要素を正確に配置できます。このページではその方法を説明します。",
                        es: "La mayoría de los gráficos tienen una ranura '#svg' que puede utilizar para insertar cualquier contenido que desee, como comentarios, descripciones e incluso otros gráficos. La ranura proporciona las dimensiones del svg, para que puedas colocar tus elementos exactamente donde los necesites. Esta página le muestra cómo hacerlo.",
                        ko: "대부분의 차트에는 설명, 설명, 기타 차트 등 원하는 콘텐츠를 삽입하는 데 사용할 수 있는 '#svg' 슬롯이 있습니다. 슬롯은 svg의 크기를 제공하므로 필요한 위치에 요소를 정확하게 배치할 수 있습니다. 이 페이지에서는 수행 방법을 보여줍니다."
                    },
                    comment: {
                        en: "Injecting a comment",
                        fr: "Injecter un commentaire",
                        pt: "Injetando um comentário",
                        de: "Einen Kommentar einfügen",
                        zh: "注入评论",
                        jp: "コメントの挿入",
                        es: "Inyectando un comentario",
                        ko: "댓글 삽입"
                    },
                    otherChart: {
                        en: "Injecting another chart",
                        fr: "Injecter un autre graphique",
                        pt: "Injetando outro gráfico",
                        de: "Ein weiteres Diagramm einfügen",
                        zh: "注入另一个图表",
                        jp: "別のチャートの挿入",
                        es: "Inyectando otro gráfico",
                        ko: "다른 차트 삽입"
                    },
                    arrow: {
                        en: "Injecting an arrow element",
                        fr: "Injection d'un élément flèche",
                        pt: "Injetando um elemento de seta",
                        de: "Ein Pfeilelement einfügen", 
                        zh: "注入箭头元素",
                        jp: "矢印要素の挿入",
                        es: "Inyectar un elemento de flecha",
                        ko: "화살표 요소 삽입"
                    },
                    arrowDetails: {
                        en: "View details about the Arrow component",
                        fr: "Afficher les détails sur le composant Arrow",
                        pt: "Ver detalhes sobre o componente Arrow",
                        de: "Details zur Arrow-Komponente anzeigen",
                        zh: "查看有关箭头组件的详细信息",
                        jp: "Arrow コンポーネントの詳細を表示する",
                        es: "Ver detalles sobre el componente Arrow",
                        ko: "Arrow 구성요소에 대한 세부정보 보기"
                    }
                },
                installation: {
                    tsUsers: {
                        en: "For TypeScript users: types are available in 'vue-data-ui.d.ts' file under the types folder of the package.",
                        fr: "Typescript: les types sont disponibles dans le fichier 'vue-data-ui.d.ts' dans le dossier 'types' du package.",
                        pt: "Para usuários TypeScript: os tipos estão disponíveis no arquivo 'vue-data-ui.d.ts' na pasta de tipos do package.",
                        de: "Für TypeScript-Benutzer: Typen sind in der Datei vue-data-ui.d.ts im Typenordner des Pakets verfügbar.",
                        zh: "对于 TypeScript 用户：类型可在包的 types 文件夹下的“vue-data-ui.d.ts”文件中找到。",
                        jp: "TypeScript ユーザーの場合: タイプは、パッケージの Types フォルダーにある「vue-data-ui.d.ts」ファイルで入手できます。",
                        es: "Para usuarios de TypeScript: los tipos están disponibles en el archivo 'vue-data-ui.d.ts' en la carpeta de tipos del paquete.",
                        ko: "TypeScript 사용자의 경우: 유형은 패키지의 유형 폴더 아래 'vue-data-ui.d.ts' 파일에서 사용할 수 있습니다."
                    },
                    comments: {
                        or: {
                            en: `Or, since v.2.0.38 you can use the universal wrapper, by adding the component name in the props:`,
                            fr: `Ou, depuis la version 2.0.38, vous pouvez utiliser le wrapper universel, en ajoutant le nom du composant dans les accessoires :`,
                            pt: `Ou, desde a v.2.0.38 você pode usar o wrapper universal, adicionando o nome do componente nas propriedades:`,
                            de: `Oder Sie können seit Version 2.0.38 den Universal-Wrapper verwenden, indem Sie den Komponentennamen in den Requisiten hinzufügen:`,
                            zh: `或者，从 v.2.0.38 开始，您可以通过在 props 中添加组件名称来使用通用包装器：`,
                            jp: `または、v.2.0.38 以降は、props にコンポーネント名を追加することで、ユニバーサル ラッパーを使用できます。`,
                            es: `O, desde la versión 2.0.38, puede usar el contenedor universal agregando el nombre del componente en los accesorios:`,
                            ko: `또는 v.2.0.38부터 props에 구성 요소 이름을 추가하여 범용 래퍼를 사용할 수 있습니다.`
                        },
                        universalComponent: {
                            en: 'Since v.2.0.38, the universal component "VueDataUi" can be used, instead of importing individual components. You just have to specify the component name in the props:',
                            fr: `Depuis la v.2.0.38, le composant universel "VueDataUi" peut être utilisé au lieu d'importer des composants individuels. Il vous suffit de préciser le nom du composant dans les props :`,
                            pt: `Desde a v.2.0.38, o componente universal "VueDataUi" pode ser utilizado, em vez de importar componentes individuais. Você só precisa especificar o nome do componente nos adereços:`,
                            de: `Seit v.2.0.38 kann anstelle des Imports einzelner Komponenten die universelle Komponente „VueDataUi“ verwendet werden. Sie müssen lediglich den Komponentennamen in den Requisiten angeben:`,
                            zh: `从 v.2.0.38 开始，可以使用通用组件“VueDataUi”，而不是导入单独的组件。您只需在 props 中指定组件名称：`,
                            jp: `v.2.0.38 以降、個別のコンポーネントをインポートする代わりに、ユニバーサル コンポーネント「VueDataUi」を使用できるようになりました。 props でコンポーネント名を指定するだけです。`,
                            es: `Desde la versión 2.0.38, se puede utilizar el componente universal "VueDataUi", en lugar de importar componentes individuales. Sólo tienes que especificar el nombre del componente en los accesorios:`,
                            ko: `v.2.0.38부터 개별 구성요소를 가져오는 대신 범용 구성요소인 "VueDataUi"를 사용할 수 있습니다. 소품에 구성요소 이름을 지정하기만 하면 됩니다.`
                        },
                        includeCss: {
                            en: "Include the css",
                            fr: "Inclure le css",
                            pt: "Incluir o css",
                            de: "Fügen Sie das CSS ein",
                            zh: "包括CSS",
                            jp: "CSSを含める",
                            es: "incluir el css",
                            ko: "CSS를 포함"
                        },
                        global: {
                            en: "You can declare Vue Data UI components globally",
                            fr: "Vous pouvez importer les composants Vue Data UI globalement",
                            pt: "Você pode declarar componentes Vue Data UI globalmente",
                            de: "Sie können Vue Data-UI-Komponenten global deklarieren",
                            zh: "您可以全局声明 Vue Data UI 组件",
                            jp: "Vue Data UI コンポーネントはグローバルに宣言できます",
                            es: "Puede declarar los componentes de la interfaz de usuario de Vue Data globalmente",
                            ko: "Vue Data UI 구성요소를 전역적으로 선언할 수 있습니다."
                        },
                        import: {
                            en: "Or you can import just what you need in your files",
                            fr: "Ou vous pouvez juste importer les composants dont vous avez besoin",
                            pt: "Ou você pode importar apenas o que precisa em seus arquivos",
                            de: "Oder Sie importieren genau das, was Sie in Ihren Dateien benötigen",
                            zh: "或者您可以从文件中导入您需要的内容",
                            jp: "または、ファイル内の必要なものだけをインポートすることもできます",
                            es: "O puedes importar sólo lo que necesitas en tus archivos",
                            ko: "또는 파일에서 필요한 것만 가져올 수 있습니다."
                        },
                        types: {
                            en: "If you are using Typescript, you can paste the vue-data-ui.d.ts file into your src folder, and import types this way:",
                            fr: "Si vous utilisez Typescript, vous pouvez coller le fichier vue-data-ui.d.ts dans votre dossier src et importer les types de cette façon :",
                            pt: "Se estiver usando Typescript, você pode colar o arquivo vue-data-ui.d.ts em sua pasta src e importar os tipos desta forma:",
                            de: "Wenn Sie Typescript verwenden, können Sie die Datei vue-data-ui.d.ts in Ihren src-Ordner einfügen und Typen auf diese Weise importieren:",
                            zh: "如果您使用的是 Typescript，您可以将 vue-data-ui.d.ts 文件粘贴到 src 文件夹中，并以这种方式导入类型：",
                            jp: "Typescript を使用している場合は、vue-data-ui.d.ts ファイルを src フォルダーに貼り付け、次の方法で型をインポートできます。",
                            es: "Si está utilizando Typecript, puede pegar el archivo vue-data-ui.d.ts en su carpeta src e importar tipos de esta manera:",
                            ko: "Typescript를 사용하는 경우 vue-data-ui.d.ts 파일을 src 폴더에 붙여넣고 다음 방법으로 유형을 가져올 수 있습니다."
                        }
                    }
                },
                about: {
                    p1: {
                        en: "Vue Data UI was born of a single question: if your dashboards are so good, why are your users asking for CSV export features ?",
                        fr: "Vue Data UI est née d'une simple question: si vos dashboards sont si bons, pourquoi les utilisateurs demandent-ils encore des exports CSV ?",
                        pt: "O Vue Data UI nasceu de uma única pergunta: se seus dashboards são tão bons, por que seus usuários estão solicitando recursos de exportação do CSV?",
                        de: "Vue Data UI entstand aus einer einzigen Frage: Wenn Ihre Dashboards so gut sind, warum fragen Ihre Benutzer dann nach CSV-Exportfunktionen?",
                        zh: "Vue Data UI 诞生于一个问题：如果你的仪表板这么好，为什么你的用户要求 CSV 导出功能？",
                        jp: "Vue Data UI は 1 つの疑問から生まれました。 「ダッシュボードがそれほど優れているのであれば、なぜユーザーは CSV エクスポート機能を必要とするのでしょうか?」",
                        es: "Vue Data UI nació de una sola pregunta: si sus paneles son tan buenos, ¿por qué sus usuarios solicitan funciones de exportación a CSV?",
                        ko: "Vue Data UI는 단 하나의 질문에서 탄생했습니다. 대시보드가 ​​그렇게 좋으면 사용자가 CSV 내보내기 기능을 요구하는 이유는 무엇입니까?"
                    },
                    p2: {
                        en: "The purpose of this open-source library is to offer end users a set of in-built tools around charts and tables to reduce the friction of having to recompute exported data. Of course, Vue Data UI keeps the option to export to CSV and PDF, just in case.",
                        fr: "Le but de cette bibliothèque open source est d'offrir aux utilisateurs finaux un ensemble d'outils intégrés autour des graphiques et des tableaux pour réduire la friction liée au recalcul des données exportées. Bien entendu, Vue Data UI conserve la possibilité d'exporter vers CSV et PDF, juste au cas où.",
                        pt: "O objetivo desta biblioteca de código aberto é oferecer aos usuários finais um conjunto de ferramentas integradas em gráficos e tabelas para reduzir o atrito de ter que recalcular os dados exportados. Claro, o Vue Data UI mantém a opção de exportar para CSV e PDF, apenas por precaução.",
                        de: "Der Zweck dieser Open-Source-Bibliothek besteht darin, Endbenutzern eine Reihe integrierter Tools rund um Diagramme und Tabellen zur Verfügung zu stellen, um die Reibung bei der Neuberechnung exportierter Daten zu verringern. Natürlich bietet die Vue Data-Schnittstelle für alle Fälle weiterhin die Möglichkeit, nach CSV und PDF zu exportieren.",
                        zh: "这个开源库的目的是为最终用户提供一组围绕图表和表格的内置工具，以减少重新计算导出数据的麻烦。当然，Vue Data UI 保留了导出为 CSV 和 PDF 的选项，以防万一。",
                        jp: "このオープン ソース ライブラリの目的は、エクスポートされたデータを再計算する労力を軽減するためのチャートとテーブル用の一連の組み込みツールをエンド ユーザーに提供することです。もちろん、Vue Data UI には、万が一に備えて CSV または PDF にエクスポートするオプションが用意されています。",
                        es: "El propósito de esta biblioteca de código abierto es ofrecer a los usuarios finales un conjunto de herramientas integradas en torno a gráficos y tablas para reducir la fricción de tener que volver a calcular los datos exportados. Por supuesto, Vue Data UI mantiene la opción de exportar a CSV y PDF, por si acaso.",
                        ko: "이 오픈 소스 라이브러리의 목적은 최종 사용자에게 내보낸 데이터를 다시 계산해야 하는 어려움을 줄이기 위해 차트와 테이블에 내장된 도구 세트를 제공하는 것입니다. 물론 Vue Data UI는 만일을 대비해 CSV 및 PDF로 내보내는 옵션을 유지합니다."
                    },
                    p3: {
                        en: "Vue Data UI offers a set of classic chart types, along with new or rare items, such as",
                        fr: "Vue Data UI propose un ensemble de types de graphiques classiques, ainsi que des composants nouveaux ou rares, tels que",
                        pt: "Vue Data UI oferece um conjunto de tipos de gráficos clássicos, junto com itens novos ou raros, como",
                        de: "Vue Data UI bietet eine Reihe klassischer Diagrammtypen sowie neue oder seltene Elemente wie:",
                        zh: "Vue Data UI 提供了一组经典的图表类型，以及新的或稀有的项目，例如",
                        jp: "Vue Data UI は、一連の古典的なチャート タイプに加えて、などの新しいアイテムや珍しいアイテムを提供します",
                        es: "Vue Data UI ofrece un conjunto de tipos de gráficos clásicos, junto con elementos nuevos o raros, como",
                        ko: "Vue Data UI는 다음과 같은 새롭거나 희귀한 항목과 함께 일련의 클래식 차트 유형을 제공합니다."
                    },
                    p4: {
                        en: "To make the experience of your dashboards as smooth as possible, Vue Data UI also ships with a set of utilities, such as",
                        fr: "Pour rendre l'expérience de vos tableaux de bord aussi fluide que possible, Vue Data UI est également livré avec un ensemble d'utilitaires, tels que",
                        pt: "Para tornar a experiência de seus painéis o mais tranquila possível, o Vue Data UI também vem com um conjunto de utilitários, como",
                        de: "Um Ihre Dashboard-Erfahrung so reibungslos wie möglich zu gestalten, wird Vue Data UI auch mit einer Reihe von Dienstprogrammen geliefert, wie zum Beispiel:",
                        zh: "为了使仪表板体验尽可能流畅，Vue Data UI 还附带了一组实用程序，例如",
                        jp: "ダッシュボードのエクスペリエンスをできるだけスムーズにするために、Vue Data UI には VueUiScreenshot や VueUiSkeleton などの一連のユーティリティも付属しています。",
                        es: "Para que la experiencia de sus paneles sea lo más fluida posible, Vue Data UI también incluye un conjunto de utilidades, como",
                        ko: "대시보드 경험을 최대한 원활하게 만들기 위해 Vue Data UI에는 다음과 같은 유틸리티 세트도 함께 제공됩니다."
                    },
                    maintainers: {
                        en: "Maintainer",
                        fr: "Mainteneur",
                        pt: "Mantenedor",
                        de: "Betreuer",
                        zh: "维护者",
                        jp: "メンテナー",
                        es: "Mantenedor",
                        ko: "유지관리자"
                    },
                    alp: {
                        en: "Alec Lloyd Probert is a front-end developer, formerly a data analyst, with a strong passion for data visualization and VueJs.",
                        fr: "Alec Lloyd Probert est un développeur front-end, ancien data analyste, passionné par la visualisation de données et VueJs.",
                        pt: "Alec Lloyd Probert é desenvolvedor front-end, ex-analista de dados, com grande paixão por visualização de dados e VueJs.",
                        de: "Alec Lloyd Probert ist ein Front-End-Entwickler, früher Datenanalyst, mit einer großen Leidenschaft für Datenvisualisierung und VueJs.",
                        zh: "Alec Lloyd Probert 是一名前端开发人员和前数据分析师，对数据可视化和 VueJs 充满热情。",
                        jp: "Alec Lloyd Probert は、データ視覚化と VueJs に情熱を注ぐフロントエンド開発者であり、元データ アナリストです。",
                        es: "Alec Lloyd Probert es un desarrollador front-end, anteriormente analista de datos, con una gran pasión por la visualización de datos y VueJs.",
                        ko: "Alec Lloyd Probert는 프런트 엔드 개발자이자 이전에 데이터 분석가였으며 데이터 시각화 및 VueJ에 대한 강한 열정을 갖고 있습니다."
                    }
                },
                docs: {
                    props: {
                        en: "2 props are required",
                        fr: "2 props sont requises",
                        pt: "2 props necessários",
                        de: "Es werden 2 Requisiten benötigt",
                        zh: "需要2个属性",
                        jp: "2 つの属性が必要です",
                        es: "Se requieren 2 props",
                        ko: "소품 2개가 필요합니다"
                    },
                    dataset: {
                        en: "dataset",
                        fr: "dataset",
                        pt: "dataset",
                        de: "dataset",
                        zh: "数据集",
                        jp: "データセット",
                        es: "dataset",
                        ko: "데이터 세트"
                    },
                    config: {
                        en: "config",
                        fr: "config",
                        pt: "config",
                        de: "config",
                        zh: "配置",
                        jp: "構成",
                        es: "config",
                        ko: "구성"
                    },
                    p1: {
                        en: "Documentation pages provide you with a config tab where you can tweak your config and save it as JSON. You can also switch from dark to light themes to save configs for both modes.",
                        fr: "Les pages de documentation vous fournissent un onglet de configuration dans lequel vous pouvez modifier votre configuration et l'enregistrer au format JSON. Vous pouvez également passer des thèmes sombres aux thèmes clairs pour enregistrer les configurations pour les deux modes.",
                        pt: "As páginas de documentação fornecem uma guia de configuração onde você pode ajustar sua configuração e salvá-la como JSON. Você também pode alternar entre temas escuros e claros para salvar as configurações de ambos os modos.",
                        de: "Die Dokumentationsseiten verfügen über eine Registerkarte „Konfiguration“, auf der Sie Ihre Konfiguration optimieren und als JSON speichern können. Sie können auch von dunklen zu hellen Themen wechseln, um Konfigurationen für beide Modi zu speichern.",
                        zh: "文档页面为您提供了一个配置选项卡，您可以在其中调整配置并将其保存为 JSON。您还可以从深色主题切换到浅色主题以保存两种模式的配置。",
                        jp: "ドキュメント ページには、構成を調整して JSON として保存できる構成タブが表示されます。ダークテーマからライトテーマに切り替えて、両方のモードの設定を保存することもできます。",
                        es: "Las páginas de documentación le proporcionan una pestaña de configuración donde puede modificar su configuración y guardarla como JSON. También puedes cambiar de temas oscuros a claros para guardar configuraciones para ambos modos.",
                        ko: "문서 페이지에서는 구성을 조정하고 이를 JSON으로 저장할 수 있는 구성 탭을 제공합니다. 어두운 테마에서 밝은 테마로 전환하여 두 모드 모두에 대한 구성을 저장할 수도 있습니다."
                    },
                    tooltips: {
                        dumbbell: {
                            en: "Visualize changes between two points in time for many datapoints.",
                            fr: "Visualisez les changements entre deux points dans le temps pour de nombreux points de données",
                            pt: "Visualize alterações entre dois pontos no tempo para muitos pontos de dados",
                            de: "Visualisieren Sie Änderungen zwischen zwei Zeitpunkten für viele Datenpunkte",
                            zh: "可视化许多数据点的两个时间点之间的变化",
                            jp: "多くのデータポイントの 2 つの時点間の変化を視覚化",
                            es: "Visualice cambios entre dos puntos en el tiempo para muchos puntos de datos",
                            ko: "많은 데이터 포인트에 대해 두 시점 간의 변경 사항을 시각화합니다."
                        },
                        stripPlot: {
                            en: "Visualize the distribution of many individual one-dimensional values on a single-axis scatter plot chart.",
                            fr: "Visualisez la distribution de nombreuses valeurs unidimensionnelles individuelles sur un nuage de points à un seul axe.",
                            pt: "Visualize a distribuição de muitos valores unidimensionais individuais em um gráfico de dispersão de eixo único.",
                            de: "Visualisieren Sie die Verteilung vieler einzelner eindimensionaler Werte in einem einachsigen Streudiagramm.",
                            zh: "在单轴散点图上可视化许多单独一维值的分布。",
                            jp: "多数の個々の 1 次元値の分布を単軸の散布図で視覚化します。",
                            es: "Visualice la distribución de muchos valores unidimensionales individuales en un gráfico de dispersión de un solo eje.",
                            ko: "단일 축 산점도 차트에서 많은 개별 1차원 값의 분포를 시각화합니다."
                        },
                        trend: {
                            en: "Quickly visualize a trend from a simple dataset.",
                            fr: "Visualisez rapidement une tendance à partir d’un simple ensemble de données.",
                            pt: "Visualize rapidamente uma tendência a partir de um conjunto de dados simples.",
                            de: "Visualisieren Sie schnell einen Trend anhand eines einfachen Datensatzes.",
                            zh: "从简单的数据集中快速可视化趋势。",
                            jp: "シンプルなデータセットから傾向を素早く視覚化します。",
                            es: "Visualice rápidamente una tendencia a partir de un conjunto de datos simple.",
                            ko: "간단한 데이터 세트에서 추세를 빠르게 시각화합니다."
                        },
                        cursor: {
                            en: "A fancy decorative mouse cursor that also works on mobile.",
                            fr: "Un curseur de souris décoratif sophistiqué qui fonctionne également sur mobile.",
                            pt: "Um cursor de mouse decorativo sofisticado que também funciona em dispositivos móveis.",
                            de: "Ein schicker, dekorativer Mauszeiger, der auch auf Mobilgeräten funktioniert.",
                            zh: "一款精美的装饰性鼠标光标，也适用于移动设备。",
                            jp: "モバイルでも動作する派手な装飾マウス カーソル。",
                            es: "Un elegante cursor de mouse decorativo que también funciona en dispositivos móviles.",
                            ko: "모바일에서도 작동하는 멋진 장식용 마우스 커서입니다."
                        },
                        quickChart: {
                            en: 'A flexible component that will provide the most adapted chart type to your dataset.',
                            fr: "Un composant flexible qui fournira le type de graphique le plus adapté à votre ensemble de données.",
                            pt: "Um componente flexível que fornecerá o tipo de gráfico mais adaptado ao seu conjunto de dados.",
                            de: "Eine flexible Komponente, die den am besten an Ihren Datensatz angepassten Diagrammtyp bereitstellt.",
                            zh: "一个灵活的组件，将为您的数据集提供最适合的图表类型。",
                            jp: "データセットに最も適合したグラフ タイプを提供する柔軟なコンポーネント。",
                            es: "Un componente flexible que proporcionará el tipo de gráfico más adaptado a su conjunto de datos.",
                            ko: "데이터 세트에 가장 적합한 차트 유형을 제공하는 유연한 구성 요소입니다."
                        },
                        accordion: {
                            en: "A highly customizable accordion component",
                            fr: "Un composant accordéon hautement personnalisable",
                            pt: "Um componente de acordeão altamente personalizável",
                            de: "Eine hochgradig anpassbare Akkordeonkomponente",
                            zh: "高度可定制的手风琴组件",
                            jp: "高度にカスタマイズ可能なアコーディオン コンポーネント",
                            es: "Un componente de acordeón altamente personalizable",
                            ko: "고도로 사용자 정의 가능한 아코디언 구성 요소"
                        },
                        tableHeatmap: {
                            en: "A responsive table with heatmap features",
                            fr: "Un tableau responsive avec des fonctionnalités de carte thermique",
                            pt: "Uma tabela responsiva com recursos de mapa de calor.",
                            de: "Eine reaktionsfähige Tabelle mit Heatmap-Funktionen.",
                            zh: "具有热图功能的响应式表格。",
                            jp: "ヒートマップ機能を備えたレスポンシブなテーブル。",
                            es: "Una tabla responsiva con funciones de mapa de calor.",
                            ko: "히트맵 기능을 갖춘 반응형 테이블입니다."
                        },
                        treemap: {
                            en: 'Visualize a large amount of data in a hierarchical, tree-structured diagram where the size of rectangles are organized from largest to smallest.',
                            fr: "Visualisez une grande quantité de données dans un diagramme hiérarchique et arborescent où la taille des rectangles est organisée du plus grand au plus petit.",
                            pt: "Visualize uma grande quantidade de dados em um diagrama hierárquico estruturado em árvore, onde o tamanho dos retângulos é organizado do maior para o menor.",
                            de: "Visualisieren Sie große Datenmengen in einem hierarchischen, baumstrukturierten Diagramm, in dem die Größe der Rechtecke vom größten zum kleinsten geordnet ist.",
                            zh: "在分层树形结构图中可视化大量数据，其中矩形的大小按从最大到最小的顺序组织。",
                            jp: "大量のデータを、四角形のサイズが最大から最小の順に編成された階層ツリー構造図で視覚化します。",
                            es: "Visualice una gran cantidad de datos en un diagrama jerárquico con estructura de árbol donde el tamaño de los rectángulos se organiza de mayor a menor.",
                            ko: "직사각형의 크기가 가장 큰 것에서 가장 작은 것 순으로 구성된 계층적, 트리 구조 다이어그램에서 대량의 데이터를 시각화합니다."
                        },
                        kpi: {
                            en: "An animated and flexible component to display important KPI",
                            fr: "Un composant animé et flexible pour afficher les KPI importants",
                            pt: "Um componente animado e flexível para exibir KPI importantes",
                            de: "Eine animierte und flexible Komponente zur Darstellung wichtiger KPI",
                            zh: "用于显示重要 KPI 的动画且灵活的组件",
                            jp: "重要な KPI を表示するアニメーション化された柔軟なコンポーネント",
                            es: "Un componente animado y flexible para mostrar KPI importantes",
                            ko: "중요한 KPI를 표시하는 애니메이션되고 유연한 구성 요소"
                        },
                        galaxy: {
                            en: "Visualize relative proportions, favoring the visibility of small values.",
                            fr: "Visualisez les proportions relatives, favorisant la visibilité des petites valeurs.",
                            pt: "Visualize proporções relativas, favorecendo a visibilidade de pequenos valores.",
                            de: "Visualisieren Sie relative Proportionen und begünstigen Sie die Sichtbarkeit kleiner Werte.",
                            zh: "可视化相对比例，有利于小值的可见性。",
                            jp: "相対的な比率を視覚化し、小さな値の視認性を優先します。",
                            es: "Visualizar proporciones relativas, favoreciendo la visibilidad de valores pequeños.",
                            ko: "작은 값의 가시성에 유리하도록 상대적 비율을 시각화합니다."
                        },  
                        nestedDonuts: {
                            en: "Visualize breakdowns of comparable series",
                            fr: "Visualisez les répartitions de séries comparables",
                            pt: "Visualize detalhamentos de séries comparáveis",
                            de: "Visualisieren Sie Aufschlüsselungen vergleichbarer Serien",
                            zh: "可视化可比系列的细分",
                            jp: "比較可能なシリーズの内訳を視覚化する",
                            es: "Visualice desgloses de series comparables",
                            ko: "비교 가능한 시리즈의 분석 시각화"
                        },
                        miniLoader: {
                            en: "A customizable loader component to stand out",
                            fr: "Un composant chargeur personnalisable pour se démarquer",
                            pt: "Um componente de carregamento personalizável para se destacar",
                            de: "Eine anpassbare Loader-Komponente, die hervorsticht",
                            zh: "可定制的加载器组件脱颖而出",
                            jp: "目立つようにカスタマイズ可能なローダー コンポーネント",
                            es: "Un componente de cargador personalizable para destacar",
                            ko: "눈에 띄는 맞춤형 로더 구성요소"
                        },
                        sparklineTable:{
                            en: "A responsive table with sparkline charts",
                            fr: "Un tableau responsive avec des graphiques sparkline",
                            pt: "Uma tabela responsiva com gráficos minigráficos",
                            de: "Eine responsive Tabelle mit Sparkline-Diagrammen",
                            zh: "带有迷你图的响应式表格",
                            jp: "スパークライン グラフを備えた応答性の高いテーブル",
                            es: "Una tabla responsiva con minigráficos",
                            ko: "스파크라인 차트가 포함된 반응형 테이블",
                        },
                        molecule: {
                            en: "Visualize a nested tree of nodes",
                            fr: "Visualisez une arborescence de nœuds imbriquée",
                            pt: "Visualize uma árvore aninhada de nós",
                            de: "Visualisieren Sie einen verschachtelten Knotenbaum",
                            zh: "可视化嵌套的节点树",
                            jp: "ネストされたノードのツリーを視覚化する",
                            es: "Visualice un árbol de nodos anidado",
                            ko: "중첩된 노드 트리 시각화"
                        },
                        digits: {
                            en: "Show numbers with a classic electronic display",
                            fr: "Afficher les chiffres avec un affichage électronique classique",
                            pt: "Mostre números com um display eletrônico clássico",
                            de: "Zeigen Sie Zahlen mit einer klassischen elektronischen Anzeige an",
                            zh: "用经典的电子显示屏显示数字",
                            jp: "クラシックな電子ディスプレイで数字を表示",
                            es: "Muestra números con una pantalla electrónica clásica.",
                            ko: "클래식 전자 디스플레이로 숫자 표시"
                        },
                        bar3d: {
                            en: "Visualize percentages with a 3d bar",
                            fr: "Visualisez les pourcentages avec une barre 3D",
                            pt: "Visualize porcentagens com uma barra 3D",
                            de: "Visualisieren Sie Prozentsätze mit einem 3D-Balken",
                            zh: "使用 3d 条形图可视化百分比",
                            jp: "パーセンテージを 3D バーで視覚化する",
                            es: "Visualiza porcentajes con una barra 3d.",
                            ko: "3D 막대로 백분율 시각화"
                        },
                        moodRadar: {
                            en: "Visualize rating statistics on a colorful and expressive radar chart",
                            fr: "Visualisez les statistiques de notation sur un graphique radar coloré et expressif",
                            pt: "Visualize estatísticas de classificação em um gráfico de radar colorido e expressivo",
                            de: "Visualisieren Sie Bewertungsstatistiken auf einem farbenfrohen und ausdrucksstarken Radardiagramm",
                            zh: "在丰富多彩且富有表现力的雷达图上可视化评级统计数据",
                            jp: "カラフルで表現力豊かなレーダー チャートで評価統計を視覚化します",
                            es: "Visualice estadísticas de calificación en un gráfico de radar colorido y expresivo",
                            ko: "다채롭고 표현력이 풍부한 방사형 차트로 등급 통계를 시각화합니다."
                        },
                        iconSpecial: {
                            en: "Other icons available :",
                            fr: "Autres icônes disponibles :",
                            pt: "Outros ícones disponíveis:",
                            de: "Weitere verfügbare Symbole:",
                            zh: "其他可用图标：",
                            jp: "他のアイコンも利用可能:",
                            es: "Otros iconos disponibles:",
                            ko: "사용 가능한 다른 아이콘:"
                        },
                        iconUserOptions: {
                            en: "Icons used in the user options menus:",
                            fr: "Icônes utilisées dans les menus d'options:",
                            pt: "Ícones usado nos menus de opções do usuário:",
                            de: "In den Benutzeroptionsmenüs verwendete Symbole:",
                            zh: "用户选项菜单中使用的图标：",
                            jp: "ユーザー オプション メニューで使用されるアイコン:",
                            es: "Iconos utilizados en los menús de opciones de usuario:",
                            ko: "사용자 옵션 메뉴에 사용되는 아이콘:"
                        },
                        icon: {
                            en: "A collection of handcrafted icons, ideal if you choose to hide the built-in user options menu and make your own.",
                            fr: "Une collection d'icônes fabriquées à la main, idéale si vous choisissez de masquer le menu d'options utilisateur intégré et de créer le vôtre.",
                            pt: "Uma coleção de ícones feitos à mão, ideal se você optar por ocultar o menu de opções do usuário integrado e criar o seu próprio.",
                            de: "Eine Sammlung handgefertigter Symbole, ideal, wenn Sie das integrierte Benutzeroptionsmenü ausblenden und Ihr eigenes erstellen möchten.",
                            zh: "手工制作的图标集合，如果您选择隐藏内置用户选项菜单并制作自己的图标，那么这是理想的选择。",
                            jp: "手作りのアイコンのコレクション。組み込みのユーザー オプション メニューを非表示にして独自のアイコンを作成する場合に最適です。",
                            es: "Una colección de íconos hechos a mano, ideal si eliges ocultar el menú de opciones de usuario integrado y crear el tuyo propio.",
                            ko: "손으로 만든 아이콘 모음으로, 내장된 사용자 옵션 메뉴를 숨기고 직접 만들려는 경우에 적합합니다."
                        },
                        donutEvolution: {
                            en: "A fusion of line and donut charts, to visualize growth and proportions in one go",
                            fr: "Une fusion de graphiques en courbes et en anneaux, pour visualiser la croissance et les proportions en une apartmentseule fois",
                            pt: "Uma fusão de gráficos de linha e de rosca, para visualizar o crescimento e as proporções de uma só vez",
                            de: "Eine Kombination aus Linien- und Ringdiagrammen, um Wachstum und Proportionen auf einmal zu visualisieren",
                            zh: "折线图和圆环图的融合，一次性可视化增长和比例",
                            jp: "折れ線グラフとドーナツ グラフを融合し、成長と比率を一度に視覚化",
                            es: "Una fusión de gráficos de líneas y de anillos para visualizar el crecimiento y las proporciones de una sola vez.",
                            ko: "성장과 비율을 한 번에 시각화하는 꺾은선형 차트와 도넛형 차트의 융합"
                        },
                        tiremarks: {
                            en: "Visualize a percentage through a dynamic tiremarks-like layout",
                            fr: "Visualisez un pourcentage grâce à une disposition dynamique semblable à des marques de pneu",
                            pt: "Visualize uma porcentagem por meio de um layout dinâmico semelhante a marcas de pneus",
                            de: "Visualisieren Sie einen Prozentsatz durch ein dynamisches Reifenspuren-ähnliches Layout",
                            zh: "通过类似轮胎痕迹的动态布局可视化百分比",
                            jp: "タイヤ跡のような動的なレイアウトでパーセンテージを視覚化",
                            es: "Visualice un porcentaje a través de un diseño dinámico similar a marcas de neumáticos",
                            ko: "동적 타이어 표시와 같은 레이아웃을 통해 백분율을 시각화합니다."
                        },
                        wheel: {
                            en: "Visualize a percentage through a dynamic wheel-type layout",
                            fr: "Visualisez un pourcentage grâce à une disposition dynamique de type roue",
                            pt: "Visualize uma porcentagem por meio de um layout dinâmico do tipo roda",
                            de: "Visualisieren Sie einen Prozentsatz durch ein dynamisches Rad-Layout",
                            zh: "通过动态轮式布局可视化百分比",
                            jp: "動的なホイールタイプのレイアウトでパーセンテージを視覚化",
                            es: "Visualice un porcentaje a través de un diseño dinámico tipo rueda",
                            ko: "역동적인 휠형 레이아웃을 통해 백분율 시각화"
                        },
                        rings: {
                            en: "Visualize relative proportions with a beautiful concentric layout",
                            fr: "Visualisez les proportions relatives avec une belle disposition concentrique",
                            pt: "Visualize proporções relativas com um belo layout concêntrico",
                            de: "Visualisieren Sie relative Proportionen mit einem schönen konzentrischen Layout",
                            zh: "通过美丽的同心布局可视化相对比例",
                            jp: "美しい同心円状のレイアウトで相対的な比率を視覚化",
                            es: "Visualice proporciones relativas con un hermoso diseño concéntrico",
                            ko: "아름다운 동심 레이아웃으로 상대적인 비율을 시각화하세요"
                        },
                        histogram: {
                            en: "A compact and flexible mini histogram component.",
                            fr: "Un mini composant d'histogramme compact et flexible.",
                            pt: "Um mini componente de histograma compacto e flexível.",
                            de: "Eine kompakte und flexible Mini-Histogrammkomponente.",
                            zh: "紧凑灵活的迷你直方图组件。",
                            jp: "コンパクトで柔軟なミニ ヒストグラム コンポーネント。",
                            es: "Un componente de mini histograma compacto y flexible.",
                            ko: "작고 유연한 미니 히스토그램 구성 요소입니다."
                        },
                        stackbar: {
                            en: "A compact way to represent proportions",
                            fr: "Une façon compacte de représenter les proportions",
                            pt: "Uma maneira compacta de representar proporções",
                            de: "Eine kompakte Möglichkeit, Proportionen darzustellen",
                            zh: "表示比例的紧凑方式",
                            jp: "プロポーションをコンパクトに表現する方法",
                            es: "Una forma compacta de representar proporciones.",
                            ko: "비율을 표현하는 간결한 방법"
                        },
                        thermometer: {
                            en: "A component to visualize a KPI as a temperature",
                            fr: "Un composant pour visualiser un KPI sous forme de température",
                            pt: "Um componente para visualizar um KPI como uma temperatura",
                            de: "Eine Komponente zur Visualisierung eines KPI als Temperatur",
                            zh: "将 KPI 可视化为温度的组件",
                            jp: "KPIを温度として可視化するコンポーネント",
                            es: "Un componente para visualizar un KPI como temperatura.",
                            ko: "KPI를 온도로 시각화하는 구성요소"
                        },
                        relationCircle: {
                            en: "A component to visualize relationships between people, words, companies...",
                            fr: "Un composant pour visualiser les relations entre les personnes, les mots, les entreprises...",
                            pt: "Um componente para visualizar relações entre pessoas, palavras, empresas...",
                            de: "Eine Komponente zur Visualisierung von Beziehungen zwischen Menschen, Wörtern, Unternehmen ...",
                            zh: "一个可视化人、文字、公司之间关系的组件......",
                            jp: "人、言葉、企業…の関係性を可視化するコンポーネント",
                            es: "Un componente para visualizar las relaciones entre personas, palabras, empresas...",
                            ko: "사람, 단어, 회사 간의 관계를 시각화하는 구성 요소..."
                        },
                        annotator: {
                            en: "A component to wrap any content and make it annotatable.",
                            fr: "Un composant pour envelopper n'importe quel contenu et le rendre annotable.",
                            pt: "Um componente para agrupar qualquer conteúdo e torná-lo anotável.",
                            de: "Eine Komponente zum Umschließen und Kommentieren von Inhalten.",
                            zh: "用于包装任何内容并使其可注释的组件。",
                            jp: "コンテンツをラップして注釈を付けられるようにするコンポーネント。",
                            es: "Un componente para envolver cualquier contenido y hacerlo anotable.",
                            ko: "콘텐츠를 래핑하고 주석을 달 수 있도록 만드는 구성 요소입니다."
                        },
                        dashboard: {
                            en: "A drag and resize component to place your charts, and allow the user to save their position.",
                            fr: "Un composant glisser et redimensionner pour placer vos graphiques et permettre à l'utilisateur de sauvegarder sa position.",
                            pt: "Um componente de arrastar e redimensionar para posicionar seus gráficos e permitir ao usuário salvar sua posição.",
                            de: "Eine Komponente zum Ziehen und Ändern der Größe, um Ihre Diagramme zu platzieren und es dem Benutzer zu ermöglichen, ihre Position zu speichern.",
                            zh: "拖动和调整大小的组件来放置图表，并允许用户保存其位置。",
                            jp: "コンポーネントをドラッグしてサイズ変更してチャートを配置し、ユーザーがその位置を保存できるようにします。",
                            es: "Un componente de arrastrar y cambiar el tamaño para colocar sus gráficos y permitir al usuario guardar su posición.",
                            ko: "차트를 배치하고 사용자가 위치를 저장할 수 있도록 하는 드래그 및 크기 조정 구성 요소입니다."
                        },
                        xy: {
                            en: "Lines, bars, plots using classic x and y axis representation",
                            fr: "Lignes, barres, tracés utilisant la représentation classique des axes X et Y",
                            pt: "Linhas, barras, gráficos usando representação clássica dos eixos x e y",
                            de: "Linien, Balken, Diagramme mit klassischer x- und y-Achsendarstellung",
                            zh: "使用经典 x 和 y 轴的线条、条形图、图表",
                            jp: "従来の X 軸と Y 軸を使用した折れ線、棒、グラフ",
                            es: "Líneas, barras y gráficos utilizando la representación clásica de los ejes x e y",
                            ko: "전통적인 x 및 y축 표현을 사용한 선, 막대, 플롯"
                        },
                        donut: {
                            en: "Visualize relative proportions with this classic representation",
                            fr: "Visualisez les proportions relatives avec cette représentation classique",
                            pt: "Visualize proporções relativas com esta representação clássica",
                            de: "Visualisieren Sie relative Proportionen mit dieser klassischen Darstellung",
                            zh: "用这种经典的表示方式可视化相对比例",
                            jp: "この古典的な表現で相対的な比率を視覚化します",
                            es: "Visualiza proporciones relativas con esta representación clásica.",
                            ko: "이 고전적인 표현으로 상대적인 비율을 시각화하세요"
                        },
                        radar: {
                            en: "Reveal outliers and commonality of different measures on the same scale",
                            fr: "Révélez les valeurs aberrantes et les points communs de différentes mesures sur la même échelle",
                            pt: "Revelar valores discrepantes e pontos em comum de diferentes medidas na mesma escala",
                            de: "Weisen Sie auf Ausreißer und Ähnlichkeiten zwischen verschiedenen Maßen auf derselben Skala hin",
                            zh: "揭示同一尺度上不同度量的异常值和共性",
                            jp: "同じスケール上のさまざまな指標にわたる外れ値と共通点を明らかにする",
                            es: "Revelar valores atípicos y puntos en común de diferentes medidas en la misma escala",
                            ko: "동일한 척도에서 다양한 측정값의 이상값과 공통성을 확인합니다."
                        },
                        waffle: {
                            en: "Visualize relative proportions with a representation known to be easier to grasp by the human brain",
                            fr: "Visualisez les proportions relatives avec une représentation connue pour être plus facile à saisir par le cerveau humain",
                            pt: "Visualize proporções relativas com uma representação conhecida por ser mais fácil de entender pelo cérebro humano",
                            de: "Visualisieren Sie relative Proportionen mit einer Darstellung, die bekanntermaßen für das menschliche Gehirn leichter zu erfassen ist",
                            zh: "使用已知更容易被人脑掌握的表示形式可视化相对比例",
                            jp: "人間の脳にとって理解しやすいことが知られている表現を使用して、相対的な比率を視覚化します。",
                            es: "Visualice proporciones relativas con una representación que se sabe que es más fácil de captar para el cerebro humano.",
                            ko: "인간의 두뇌가 이해하기 더 쉬운 것으로 알려진 표현으로 상대적인 비율을 시각화합니다."
                        },
                        quadrant: {
                            en: "Identify patterns and trends to prioritize actions based on the position of data points",
                            fr: "Identifier les modèles et les tendances pour prioriser les actions en fonction de la position des points de données",
                            pt: "Identifique padrões e tendências para priorizar ações com base na posição dos pontos de dados",
                            de: "Identifizieren Sie Muster und Trends, um Maßnahmen basierend auf der Position der Datenpunkte zu priorisieren",
                            zh: "识别模式和趋势，根据数据点的位置确定行动的优先级",
                            jp: "パターンと傾向を特定し、データ ポイントの位置に基づいてアクションに優先順位を付けます",
                            es: "Identificar patrones y tendencias para priorizar acciones en función de la posición de los puntos de datos.",
                            ko: "패턴과 추세를 식별하여 데이터 포인트의 위치에 따라 작업의 우선순위를 정합니다."
                        },
                        gauge: {
                            en: "Quickly show how well a given metric is performing against a target goal",
                            fr: "Montrez rapidement les performances d'une métrique donnée par rapport à un objectif cible",
                            pt: "Mostre rapidamente o desempenho de uma determinada métrica em relação a uma meta desejada",
                            de: "Zeigen Sie schnell, wie gut eine bestimmte Metrik im Vergleich zu einem Ziel abschneidet",
                            zh: "快速显示给定指标对目标的执行情况",
                            jp: "特定の指標が目標目標に対してどの程度優れたパフォーマンスを発揮しているかをすぐに示します",
                            es: "Muestre rápidamente qué tan bien se está desempeñando una métrica determinada frente a un objetivo objetivo.",
                            ko: "특정 측정항목이 목표 목표에 비해 얼마나 잘 수행되고 있는지 빠르게 표시"
                        },
                        chestnut: {
                            en: "Represent nested information from a general base to detailed breakdowns",
                            fr: "Représenter des informations imbriquées depuis une base générale jusqu'à des ventilations détaillées",
                            pt: "Representar informações aninhadas desde uma base geral até detalhamentos detalhados",
                            de: "Präsentieren Sie verschachtelte Informationen von einer allgemeinen Basis bis hin zu detaillierten Aufschlüsselungen",
                            zh: "表示从一般基础到详细细分的嵌套信息",
                            jp: "一般的な基礎から詳細なセグメンテーションまでのネストされた情報を表現します",
                            es: "Representar información anidada desde una base general hasta desgloses detallados.",
                            ko: "일반적인 기반부터 세부적인 분석까지 중첩된 정보를 표현합니다."
                        },
                        onion: {
                            en: "Compare the values of multiple categories or groups in a single visualization",
                            fr: "Comparez les valeurs de plusieurs catégories ou groupes dans une seule visualisation",
                            pt: "Compare os valores de diversas categorias ou grupos em uma única visualização",
                            de: "Vergleichen Sie Werte über mehrere Kategorien oder Gruppen hinweg in einer einzigen Visualisierung",
                            zh: "在单个可视化中比较多个类别或组的值",
                            jp: "単一のビジュアライゼーションで複数のカテゴリまたはグループの値を比較します",
                            es: "Compare los valores de múltiples categorías o grupos en una sola visualización",
                            ko: "단일 시각화에서 여러 범주 또는 그룹의 값을 비교합니다."
                        },
                        verticalBar: {
                            en: "Compare different categorical or discrete variables, with the option to show their breakdowns",
                            fr: "Comparez différentes variables catégorielles ou discrètes, avec la possibilité d'afficher leurs répartitions",
                            pt: "Compare diferentes variáveis ​​categóricas ou discretas, com a opção de mostrar seus detalhamentos",
                            de: "Vergleichen Sie verschiedene kategoriale oder diskrete Variablen mit der Option, deren Aufschlüsselung anzuzeigen",
                            zh: "比较不同的分类或离散变量，并可选择显示其细分",
                            jp: "さまざまなカテゴリ変数または離散変数を、その内訳を表示するオプションを使用して比較します。",
                            es: "Compara diferentes variables categóricas o discretas, con la opción de mostrar sus desgloses",
                            ko: "분석을 표시하는 옵션을 사용하여 다양한 범주형 또는 이산형 변수를 비교합니다."
                        },
                        heatmap: {
                            en: "Show relationships and patterns between two variables by observing how cell colors change across each axis",
                            fr: "Montrez les relations et les modèles entre deux variables en observant comment les couleurs des cellules changent sur chaque axe",
                            pt: "Mostre relações e padrões entre duas variáveis ​​observando como as cores das células mudam em cada eixo",
                            de: "Entdecken Sie Beziehungen und Muster zwischen zwei Variablen, indem Sie beobachten, wie sich die Zellfarben auf jeder Achse ändern",
                            zh: "通过观察细胞颜色在每个轴上的变化来显示两个变量之间的关系和模式",
                            jp: "各軸でセルの色がどのように変化するかを観察することで、2 つの変数間の関係とパターンを表示します",
                            es: "Muestre relaciones y patrones entre dos variables observando cómo cambian los colores de las celdas en cada eje.",
                            ko: "각 축에서 셀 색상이 어떻게 변하는지 관찰하여 두 변수 간의 관계와 패턴을 보여줍니다."
                        },
                        scatter: {
                            en: "From a large dataset, reveal the correlation between two variables",
                            fr: "À partir d'un grand ensemble de données, révélez la corrélation entre deux variables",
                            pt: "A partir de um grande conjunto de dados, revele a correlação entre duas variáveis",
                            de: "Bestimmen Sie anhand eines großen Datensatzes die Korrelation zwischen zwei Variablen",
                            zh: "从大型数据集中揭示两个变量之间的相关性",
                            jp: "大規模なデータセットから 2 つの変数間の相関関係を明らかにする",
                            es: "A partir de un gran conjunto de datos, revele la correlación entre dos variables.",
                            ko: "대규모 데이터 세트에서 두 변수 간의 상관 관계를 밝힙니다."
                        },
                        candlestick: {
                            en: "Determine possible price movements based on past patterns",
                            fr: "Déterminer les mouvements de prix possibles en fonction des modèles passés",
                            pt: "Determine possíveis movimentos de preços com base em padrões anteriores",
                            de: "Bestimmen Sie mögliche Preisbewegungen basierend auf vergangenen Mustern",
                            zh: "根据过去的模式确定可能的价格变动",
                            jp: "過去のパターンに基づいて起こり得る値動きを判断する",
                            es: "Determinar posibles movimientos de precios basados ​​en patrones pasados.",
                            ko: "과거 패턴을 기반으로 가능한 가격 변동 결정"
                        },
                        agePyramid: {
                            en: "Show how populations are composed and how they are changing",
                            fr: "Montrer comment les populations sont composées et comment elles évoluent",
                            pt: "Mostre como as populações são compostas e como estão mudando",
                            de: "Zeigen Sie, wie Populationen zusammengesetzt sind und wie sie sich verändern",
                            zh: "显示人口的组成方式及其变化情况",
                            jp: "人口がどのように構成され、どのように変化しているかを示す",
                            es: "Mostrar cómo se componen las poblaciones y cómo están cambiando.",
                            ko: "인구가 어떻게 구성되고 어떻게 변화하는지 보여줍니다."
                        },
                        sparkline: {
                            en: "Visualize evolution on a tiny line chart",
                            fr: "Visualisez l'évolution sur un petit graphique linéaire",
                            pt: "Visualize a evolução em um pequeno gráfico de linhas",
                            de: "Visualisieren Sie die Entwicklung in einem kleinen Liniendiagramm",
                            zh: "在微小的折线图上可视化进化",
                            jp: "小さな折れ線グラフで進化を視覚化する",
                            es: "Visualice la evolución en un pequeño gráfico de líneas",
                            ko: "작은 선 차트로 진화 시각화"
                        },
                        sparkbar: {
                            en: "Show kpi performance with a tiny vertical bar chart",
                            fr: "Afficher les performances des KPI avec un petit graphique à barres verticales",
                            pt: "Mostre o desempenho do KPI com um pequeno gráfico de barras verticais",
                            de: "Zeigen Sie die KPI-Leistung mit einem kleinen vertikalen Balkendiagramm an",
                            zh: "用微小的垂直条形图显示关键绩效指标",
                            jp: "主要業績評価指標を小さな縦棒グラフで表示します",
                            es: "Muestre el rendimiento de los KPI con un pequeño gráfico de barras verticales",
                            ko: "작은 수직 막대 차트로 KPI 성능 표시"
                        },
                        table: {
                            en: "Powerful dynamic table that allows the user to select data and calculate sums, averages, and visualize charts based on their selection",
                            fr: "Tableau dynamique puissant qui permet à l'utilisateur de sélectionner des données et de calculer des sommes, des moyennes et de visualiser des graphiques en fonction de leur sélection",
                            pt: "Tabela dinâmica poderosa que permite ao usuário selecionar dados e calcular somas, médias e visualizar gráficos com base em sua seleção",
                            de: "Leistungsstarke dynamische Tabelle, die es dem Benutzer ermöglicht, Daten auszuwählen und auf der Grundlage ihrer Auswahl Summen und Durchschnittswerte zu berechnen und Diagramme zu visualisieren",
                            zh: "强大的动态表，允许用户选择数据并计算总和、平均值，并根据他们的选择可视化图表",
                            jp: "ユーザーがデータを選択し、選択に基づいて合計、平均、視覚的なグラフを計算できる強力な動的テーブル",
                            es: "Potente tabla dinámica que permite al usuario seleccionar datos y calcular sumas, promedios y visualizar gráficos en función de su selección.",
                            ko: "사용자가 데이터를 선택하고 합계, 평균을 계산하고 선택 항목에 따라 차트를 시각화할 수 있는 강력한 동적 테이블"
                        },
                        rating: {
                            en: "A classic rating component to rate or visualize rating results. Control the number of stars to display, and their shape",
                            fr: "Un composant de notation classique pour noter ou visualiser les résultats de la notation. Contrôlez le nombre d'étoiles à afficher et leur forme",
                            pt: "Um componente de classificação clássico para avaliar ou visualizar resultados de classificação. Controle o número de estrelas a serem exibidas e sua forma",
                            de: "Eine klassische Auswertungskomponente zur Auswertung bzw. Visualisierung von Auswertungsergebnissen. Steuern Sie die Anzahl der anzuzeigenden Sterne und deren Form",
                            zh: "用于对评级结果进行评级或可视化的经典评级组件。控制要显示的星星数量及其形状",
                            jp: "評価または評価結果を視覚化するための古典的な評価コンポーネント。表示する星の数とその形を制御する",
                            es: "Un componente de calificación clásico para calificar o visualizar resultados de calificación. Controla el número de estrellas a mostrar y su forma.",
                            ko: "평가 결과를 평가하거나 시각화하는 전통적인 평가 구성 요소입니다. 표시할 별의 수와 모양을 제어합니다."
                        },
                        smiley: {
                            en: "A rating component using smiley icons",
                            fr: "Un composant de notation utilisant des icônes souriantes",
                            pt: "Um componente de classificação usando ícones sorridentes",
                            de: "Eine Bewertungskomponente mit Smiley-Symbolen",
                            zh: "使用笑脸图标的评级组件",
                            jp: "スマイリーアイコンを使用した評価コンポーネント",
                            es: "Un componente de calificación que utiliza íconos sonrientes",
                            ko: "스마일 아이콘을 사용한 평가 구성요소"
                        },
                        screenshot: {
                            en: "Select an area on the screen and either download or post the image as base64 with additional metadata",
                            fr: "Sélectionnez une zone sur l'écran et téléchargez ou publiez l'image en base64 avec des métadonnées supplémentaires",
                            pt: "Selecione uma área na tela e baixe ou publique a imagem como base64 com metadados adicionais",
                            de: "Wählen Sie einen Bereich auf dem Bildschirm aus und laden Sie entweder das Bild herunter oder veröffentlichen Sie es als Base64 mit zusätzlichen Metadaten",
                            zh: "选择屏幕上的一个区域，然后下载或发布带有附加元数据的 Base64 图像",
                            jp: "画面上の領域を選択し、追加のメタデータを含む画像をダウンロードするか、base64 として投稿します。",
                            es: "Seleccione un área en la pantalla y descargue o publique la imagen como base64 con metadatos adicionales",
                            ko: "화면에서 영역을 선택하고 추가 메타데이터와 함께 이미지를 base64로 다운로드하거나 게시합니다."
                        },
                        skeleton: {
                            en: "Display gorgeous skeleton charts while data is loading",
                            fr: "Affichez de superbes graphiques squelettes pendant le chargement des données",
                            pt: "Exiba lindos gráficos de esqueleto enquanto os dados estão sendo carregados",
                            de: "Sehen Sie sich wunderschöne Skelettdiagramme an, während die Daten geladen werden",
                            zh: "数据加载时显示华丽的骨架图",
                            jp: "データのロード中に豪華なスケルトン チャートを表示",
                            es: "Muestre magníficos gráficos de esqueleto mientras se cargan los datos",
                            ko: "데이터가 로드되는 동안 멋진 뼈대 차트 표시"
                        },
                    },
                    datastructure: {
                        en: "Datastructure",
                        fr: "Structure des données",
                        pt: "Estrutura de dados",
                        de: "Datenstruktur",
                        zh: "数据结构",
                        jp: "データ構造",
                        es: "Estructura de datos",
                        ko: "데이터 구조"
                    },
                    copyDefaultConfig: {
                        en: "Copy default config as JSON",
                        fr: "Copier la configuration par défaut au format JSON",
                        pt: "Copie a configuração padrão como JSON",
                        de: "Kopieren Sie die Standardkonfiguration als JSON",
                        zh: "将默认配置复制为 JSON",
                        jp: "デフォルト設定をJSONとしてコピー",
                        es: "Copie la configuración predeterminada como JSON",
                        ko: "기본 구성을 JSON으로 복사"
                    },
                    copyThisConfig: {
                        en: "Copy this config as JSON",
                        fr: "Copier cette config en JSON",
                        pt: "Copie esta configuração como JSON",
                        de: "Kopieren Sie diese Konfiguration als JSON",
                        zh: "将此配置复制为 JSON",
                        jp: "この構成を JSON としてコピーします",
                        es: "Copie esta configuración como JSON",
                        ko: "이 구성을 JSON으로 복사"
                    },
                    reset: {
                        en: "Reset",
                        fr: "Réinitialiser",
                        pt: "Reiniciar",
                        de: "Zurücksetzen",
                        zh: "重置",
                        jp: "リセット",
                        es: "Reiniciar",
                        ko: "초기화"
                    },
                    cssOverride: {
                        en: "You can override the css (check out the styles.css in the package)",
                        fr: "Vous pouvez remplacer le CSS (consultez le styles.css dans le package)",
                        pt: "Você pode substituir o CSS (consulte estilos.css no package)",
                        de: "Sie können das CSS überschreiben (siehe die Datei „styles.css“ im Paket).",
                        zh: "您可以重新使用 CSS（在包中查看 styles.css）",
                        jp: "CSS を再配置する (styles.css とパッケージを参照)",
                        es: "Puede anular el CSS (consulte estilos.css en el paquete)",
                        ko: "CSS를 재정의할 수 있습니다(패키지의 styles.css 확인)."
                    },
                    emits: {
                        selectDatapoint: {
                            en: "Use this event on the component to get the selected datapoint and index on click",
                            fr: "Utilisez cet événement sur le composant pour obtenir le point de données et l'index sélectionnés en un clic",
                            pt: "Use este evento no componente para obter o ponto de dados e o índice selecionados ao clicar",
                            de: "Verwenden Sie dieses Ereignis für die Komponente, um den ausgewählten Datenpunkt und Index beim Klicken abzurufen",
                            zh: "在组件上使用此事件来获取单击时选定的数据点和索引",
                            jp: "コンポーネント上でこのイベントを使用して、クリック時に選択されたデータポイントとインデックスを取得します。",
                            es: "Utilice este evento en el componente para obtener el punto de datos seleccionado y el índice al hacer clic",
                            ko: "클릭 시 선택한 데이터 포인트와 인덱스를 가져오려면 구성 요소에서 이 이벤트를 사용하세요."
                        },
                        generateImage: {
                            en: "Call this method from the parent component to download as png image. This is especially useful if user options are hidden.",
                            fr: "Appelez cette méthode à partir du composant parent pour la télécharger sous forme d'image png. Ceci est particulièrement utile si les options utilisateur sont masquées.",
                            pt: "Chame esse método do componente pai para fazer download como imagem png. Isto é especialmente útil se as opções do usuário estiverem ocultas.",
                            de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um sie als PNG-Bild herunterzuladen. Dies ist besonders nützlich, wenn Benutzeroptionen ausgeblendet sind.",
                            zh: "从父组件调用此方法以下载 png 图像。如果用户选项被隐藏，这尤其有用。",
                            jp: "親コンポーネントからこのメソッドを呼び出して、PNG イメージとしてダウンロードします。これは、ユーザー オプションが非表示の場合に特に便利です。",
                            es: "Llame a este método desde el componente principal para descargarlo como imagen png. Esto es especialmente útil si las opciones de usuario están ocultas.",
                            ko: "png 이미지로 다운로드하려면 상위 구성 요소에서 이 메서드를 호출하세요. 이는 사용자 옵션이 숨겨져 있는 경우 특히 유용합니다."
                        },
                        generatePdf: {
                            en: "Call this method from the parent component to print as PDF. This is especially useful if user options are hidden.",
                            fr: "Appelez cette méthode à partir du composant parent pour imprimer au format PDF. Ceci est particulièrement utile si les options utilisateur sont masquées.",
                            pt: "Chame esse método do componente pai para imprimir como PDF. Isto é especialmente útil se as opções do usuário estiverem ocultas.",
                            de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um als PDF zu drucken. Dies ist besonders nützlich, wenn Benutzeroptionen ausgeblendet sind.",
                            zh: "从父组件调用此方法以打印为 PDF。如果用户选项被隐藏，这尤其有用。",
                            jp: "PDF として印刷するには、親コンポーネントからこのメソッドを呼び出します。これは、ユーザー オプションが非表示の場合に特に便利です。",
                            es: "Llame a este método desde el componente principal para imprimir como PDF. Esto es especialmente útil si las opciones de usuario están ocultas.",
                            ko: "PDF로 인쇄하려면 상위 구성 요소에서 이 메서드를 호출하세요. 이는 사용자 옵션이 숨겨져 있는 경우 특히 유용합니다."
                        },
                        generateCsv: {
                            en: "Call this method from the parent component to generate an CSV extraction. This is especially useful if user options are hidden.",
                            fr: "Appelez cette méthode depuis le composant parent pour générer une extraction CSV. Ceci est particulièrement utile si les options utilisateur sont masquées.",
                            pt: "Chame esse método do componente pai para gerar uma extração do CSV. Isto é especialmente útil se as opções do usuário estiverem ocultas.",
                            de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um eine CSV-Extraktion zu generieren. Dies ist besonders nützlich, wenn Benutzeroptionen ausgeblendet sind.",
                            zh: "从父组件调用此方法以生成 CSV 提取。如果用户选项被隐藏，这尤其有用。",
                            jp: "CSV 抽出を生成するには、親コンポーネントからこのメソッドを呼び出します。これは、ユーザー オプションが非表示の場合に特に便利です。",
                            es: "Llame a este método desde el componente principal para generar una extracción de CSV. Esto es especialmente útil si las opciones de usuario están ocultas.",
                            ko: "CSV 추출을 생성하려면 상위 구성 요소에서 이 메서드를 호출하세요. 이는 사용자 옵션이 숨겨져 있는 경우 특히 유용합니다."
                        },
                        dashboard: {
                            change: {
                                en: "Emits the updated config to the parent component",
                                fr: "Émet la configuration mise à jour au composant parent",
                                pt: "Emite a configuração atualizada para o componente pai",
                                de: "Gibt die aktualisierte Konfiguration an die übergeordnete Komponente aus",
                                zh: "将更新后的配置发送到父组件",
                                jp: "更新された構成を親コンポーネントに送信します",
                                es: "Emite la configuración actualizada al componente principal.",
                                ko: "업데이트된 구성을 상위 구성요소로 내보냅니다."
                            }
                        },
                        screenshot: {
                            postImage: {
                                en: "in post mode, returns the current image data:",
                                fr: "en mode post, renvoie les données de l'image :",
                                pt: "no modo post, retorna os dados da imagem atual:",
                                de: "Gibt im Post-Modus die aktuellen Bilddaten zurück:",
                                zh: "在 post 模式下，返回当前图像数据：",
                                jp: "ポストモードでは、現在の画像データを返します。",
                                es: "en modo publicación, devuelve los datos de la imagen actual:",
                                ko: "포스트 모드에서는 현재 이미지 데이터를 반환합니다."
                            },
                            shoot: {
                                en: "call this method to open the component",
                                fr: "appelez cette méthode pour ouvrir le composant",
                                pt: "chame este método para abrir o componente",
                                de: "Rufen Sie diese Methode auf, um die Komponente zu öffnen",
                                zh: "调用该方法打开组件",
                                jp: "このメソッドを呼び出してコンポーネントを開きます",
                                es: "llame a este método para abrir el componente",
                                ko: "구성 요소를 열려면 이 메서드를 호출하세요."
                            },
                            close: {
                                en: "call this method to close the component",
                                fr: "appelez cette méthode pour fermer le composant",
                                pt: "chame este método para fechar o componente",
                                de: "Rufen Sie diese Methode auf, um die Komponente zu schließen",
                                zh: "调用该方法关闭组件",
                                jp: "このメソッドを呼び出してコンポーネントを閉じます",
                                es: "call this method to close the component",
                                ko: "구성 요소를 닫으려면 이 메서드를 호출하세요."
                            }
                        },
                        xy: {
                            selectLegend: {
                                en: "returns the current visible series when selecting / unselecting the legend:",
                                fr: "renvoie la série visible actuelle lors de la sélection/désélection de la légende :",
                                pt: "retorna a série visível atual ao selecionar/desmarcar a legenda:",
                                de: "gibt die aktuell sichtbare Zeile zurück, wenn die Legende ausgewählt/abgewählt wird:",
                                zh: "选择/取消选择图例时返回当前可见系列：",
                                jp: "凡例を選択または選択解除するときに、現在表示されているシリーズを返します。",
                                es: "devuelve la serie visible actual al seleccionar/deseleccionar la leyenda:",
                                ko: "범례를 선택/선택 취소할 때 현재 표시되는 시리즈를 반환합니다."
                            },
                            selectX: {
                                en: "returns the current visible series at the selected x index when clicking on the chart :",
                                fr: "renvoie la série visible actuelle à l'index x sélectionné en cliquant sur le graphique :",
                                pt: "retorna a série visível atual no índice x selecionado ao clicar no gráfico:",
                                de: "gibt die aktuell sichtbare Reihe am ausgewählten x-Index zurück, wenn auf das Diagramm geklickt wird:",
                                zh: "单击图表时返回所选 x 索引处的当前可见系列：",
                                jp: "チャートをクリックすると、選択された x インデックスで現在表示されているシリーズが返されます。",
                                es: "devuelve la serie visible actual en el índice x seleccionado al hacer clic en el gráfico:",
                                ko: "차트를 클릭할 때 선택한 x 인덱스에서 현재 표시되는 계열을 반환합니다."
                            },
                            getData: {
                                en: "call this method from the parent to get the full formatted dataset.",
                                fr: "appelez cette méthode depuis le parent pour obtenir l'ensemble de données entièrement formaté.",
                                pt: "chame esse método do pai para obter o conjunto de dados formatado completo.",
                                de: "",
                                zh: "从父级调用此方法以获取完整格式化的数据集。",
                                jp: "完全なフォーマット済みデータセットを取得するには、親からこのメソッドを呼び出します。",
                                es: "Llame a este método desde el padre para obtener el conjunto de datos formateado completo.",
                                ko: "전체 형식의 데이터세트를 얻으려면 상위 항목에서 이 메서드를 호출하세요."
                            }
                        },
                        quadrant: {
                            selectLegend: {
                                en: "returns the current visible categories with their items when selecting / unselecting the legend:",
                                fr: "renvoie les catégories actuellement visibles avec leurs éléments lors de la sélection/désélection de la légende :",
                                pt: "retorna as categorias visíveis atuais com seus itens ao selecionar/desmarcar a legenda:",
                                de: "Rufen Sie diese Methode vom übergeordneten Element aus auf, um den vollständig formatierten Datensatz abzurufen.",
                                zh: "选择/取消选择图例时返回当前可见类别及其项目：",
                                jp: "凡例を選択または選択解除すると、現在表示されているカテゴリとその項目が返されます。",
                                es: "devuelve las categorías visibles actuales con sus elementos al seleccionar/deseleccionar la leyenda:",
                                ko: "범례를 선택/선택 취소할 때 항목과 함께 현재 표시되는 범주를 반환합니다."
                            },
                            selectPlot: {
                                en: "returns the data of the selected plot on click:",
                                fr: "renvoie les données du tracé sélectionné au clic :",
                                pt: "retorna os dados do gráfico selecionado ao clicar:",
                                de: "gibt beim Anklicken die Daten des ausgewählten Diagramms zurück:",
                                zh: "单击时返回所选图的数据：",
                                jp: "クリックすると、選択したプロットのデータが返されます。",
                                es: "devuelve los datos del gráfico seleccionado al hacer clic:",
                                ko: "클릭 시 선택한 플롯의 데이터를 반환합니다."
                            },
                            selectSide: {
                                en: "returns the data of all the plots located on the area on click of a corner label:",
                                fr: "renvoie les données de toutes les parcelles situées sur la zone au clic d'une étiquette de coin :",
                                pt: "retorna os dados de todas as parcelas localizadas na área ao clicar em um rótulo de canto:",
                                de: "Gibt die Daten aller Parzellen zurück, die sich in dem Gebiet befinden, wenn Sie auf eine Eckbeschriftung klicken:",
                                zh: "单击角标签时返回位于该区域的所有图的数据：",
                                jp: "コーナーラベルをクリックすると、そのエリアにあるすべてのプロットのデータを返します。",
                                es: "devuelve los datos de todas las parcelas ubicadas en el área al hacer clic en una etiqueta de esquina:",
                                ko: "모서리 라벨을 클릭하면 해당 영역에 있는 모든 플롯의 데이터를 반환합니다."
                            }
                        },
                        chestnut: {
                            selectRoot: {
                                en: "returns the selected root data",
                                fr: "renvoie les données racine sélectionnées",
                                pt: "retorna os dados raiz selecionados",
                                de: "gibt die ausgewählten Stammdaten zurück",
                                zh: "返回选定的根数据",
                                jp: "選択したルート データを返します",
                                es: "devuelve los datos raíz seleccionados",
                                ko: "선택한 루트 데이터를 반환합니다."
                            },
                            selectBranch: {
                                en: "returns the selected branch data",
                                fr: "renvoie les données de la branche sélectionnée",
                                pt: "retorna os dados da filial selecionada",
                                de: "gibt die ausgewählten Zweigdaten zurück",
                                zh: "返回选定的分支数据",
                                jp: "選択されたブランチデータを返します",
                                es: "devuelve los datos de la rama seleccionada",
                                ko: "선택한 지점 데이터를 반환합니다."
                            },
                            selectNut: {
                                en: "returns the selected donut data",
                                fr: "renvoie les données du graphique en anneau sélectionnées",
                                pt: "retorna os dados do gráfico de rosca selecionado",
                                de: "gibt die ausgewählten Donut-Daten zurück",
                                zh: "返回选定的圆环图数据",
                                jp: "選択されたドーナツ チャート データを返します",
                                es: "devuelve los datos del donut seleccionado",
                                ko: "선택한 도넛 데이터를 반환합니다."
                            }
                        },
                        onion: {
                            selectLegend: {
                                en: "returns the current visible series when selecting / unselecting the legend",
                                fr: "renvoie la série visible actuelle lors de la sélection/désélection de la légende",
                                pt: "retorna a série visível atual ao selecionar/desmarcar a legenda",
                                de: "Gibt die aktuell sichtbare Zeile zurück, wenn die Legende ausgewählt/abgewählt wird",
                                zh: "选择/取消选择图例时返回当前可见系列",
                                jp: "凡例を選択または選択解除すると、現在表示されているシリーズを返します。",
                                es: "devuelve la serie visible actual al seleccionar/deseleccionar la leyenda",
                                ko: "범례를 선택/선택 취소할 때 현재 표시되는 시리즈를 반환합니다."
                            }
                        },
                        rating: {
                            rate: {
                                en: "returns the selected rating value as a number",
                                fr: "renvoie la valeur de note sélectionnée sous forme de nombre",
                                pt: "retorna o valor da classificação selecionada como um número",
                                de: "gibt den ausgewählten Bewertungswert als Zahl zurück",
                                zh: "以数字形式返回选定的评级值",
                                jp: "選択した評価値を数値として返します",
                                es: "devuelve el valor de calificación seleccionado como un número",
                                ko: "선택한 등급 값을 숫자로 반환합니다."
                            },
                            getData: {
                                en: "call this method from the parent component to get the current rating value",
                                fr: "appelez cette méthode à partir du composant parent pour obtenir la valeur de note actuelle",
                                pt: "chame este método do componente pai para obter o valor da classificação atual",
                                de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um den aktuellen Bewertungswert zu erhalten",
                                zh: "从父组件调用此方法获取当前评分值",
                                jp: "親コンポーネントからこのメソッドを呼び出して、現在の評価値を取得します。",
                                es: "Llame a este método desde el componente principal para obtener el valor de calificación actual.",
                                ko: "현재 등급 값을 얻으려면 상위 구성 요소에서 이 메서드를 호출하세요."
                            },
                            toggleReadonly: {
                                en: "call this method from the parent component to flip the readonly or active state",
                                fr: "appelez cette méthode à partir du composant parent pour inverser l'état actif ou lecture seule",
                                pt: "chame este método do componente pai para inverter o estado somente leitura ou ativo",
                                de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um den schreibgeschützten oder aktiven Status umzukehren",
                                zh: "从父组件调用此方法可以翻转只读或活动状态",
                                jp: "親コンポーネントからこのメソッドを呼び出して、読み取り専用状態とアクティブ状態を切り替えます。",
                                es: "llame a este método desde el componente principal para cambiar el estado de solo lectura o activo",
                                ko: "읽기 전용 또는 활성 상태를 전환하려면 상위 구성 요소에서 이 메서드를 호출하세요."
                            }
                        },
                    },
                    showMoreSeries: {
                        en: "Show more / less series :",
                        fr: "Afficher plus / moins de séries :",
                        pt: "Mostrar mais/menos séries:",
                        de: "Mehr/weniger Serien anzeigen:",
                        zh: "显示更多/更少系列：",
                        jp: "シリーズの表示を増やす/減らす:",
                        es: "Mostrar más/menos series:",
                        ko: "시리즈 더보기 / 간략히 표시 :"
                    },
                    example: {
                        en: "Example",
                        fr: "Exemple",
                        pt: "Exemplo",
                        de: "Beispiel",
                        zh: "例子",
                        jp: "例",
                        es: "Ejemplo",
                        ko: "예"
                    },                    
                    comments: {
                        quickChartKeys: {
                            en: "You can provide a simple array of numbers. Depending on its length, either a line chart or a bar chart will be generated. The threshold between bar and line is manageable in the configuration options. You can also provide an array of objects. Here are the sets of accepted keys for serie names and data:",
                            fr: "Vous pouvez fournir un tableau simple de nombres. En fonction de sa longueur, un graphique linéaire ou un graphique à barres sera généré. Le seuil entre barre et ligne est gérable dans les options de configuration. Vous pouvez également fournir un tableau d'objets. Voici les ensembles de clés acceptées pour les noms de séries et les données :",
                            pt: "Você pode fornecer uma matriz simples de números. Dependendo do seu comprimento, será gerado um gráfico de linhas ou de barras. O limite entre a barra e a linha é gerenciável nas opções de configuração. Você também pode fornecer uma variedade de objetos. Aqui estão os conjuntos de chaves aceitas para nomes de séries e dados:",
                            de: "Sie können ein einfaches Array von Zahlen bereitstellen. Je nach Länge wird entweder ein Liniendiagramm oder ein Balkendiagramm generiert. Der Schwellenwert zwischen Balken und Linie ist in den Konfigurationsoptionen einstellbar. Sie können auch ein Array von Objekten bereitstellen. Hier sind die Sätze akzeptierter Schlüssel für Seriennamen und -daten:",
                            zh: "您可以提供一个简单的数字数组。根据其长度，将生成折线图或条形图。条形图和线形图之间的阈值可在配置选项中进行管理。您还可以提供对象数组。以下是系列名称和数据的可接受键集：",
                            jp: "単純な数値の配列を指定できます。長さに応じて、折れ線グラフまたは棒グラフが生成されます。バーとラインの間のしきい値は、設定オプションで管理できます。オブジェクトの配列を指定することもできます。シリーズ名とデータに対して受け入れられるキーのセットは次のとおりです。",
                            es: "Puede proporcionar una serie simple de números. Dependiendo de su longitud, se generará un gráfico de líneas o de barras. El umbral entre barra y línea es gestionable en las opciones de configuración. También puede proporcionar una variedad de objetos. Estos son los conjuntos de claves aceptadas para nombres de series y datos:",
                            ko: "간단한 숫자 배열을 제공할 수 있습니다. 길이에 따라 선형 차트 또는 막대 차트가 생성됩니다. 막대와 선 사이의 임계값은 구성 옵션에서 관리할 수 있습니다. 객체 배열을 제공할 수도 있습니다. 시리즈 이름과 데이터에 허용되는 키 세트는 다음과 같습니다."
                        },
                        quickChart: {
                            en: "The shape of the dataset is very flexible. The most adapted chart will be computed from it (either a line, bar or donut chart).",
                            fr: "La forme de l'ensemble de données est très flexible. Le graphique le plus adapté sera calculé à partir de celui-ci (soit un graphique en courbes, en barres ou en anneau).",
                            pt: "A forma do conjunto de dados é muito flexível. O gráfico mais adaptado será calculado a partir dele (um gráfico de linhas, barras ou rosca).",
                            de: "Die Form des Datensatzes ist sehr flexibel. Daraus wird das am besten geeignete Diagramm berechnet (entweder ein Linien-, Balken- oder Donutdiagramm).",
                            zh: "数据集的形状非常灵活。将根据它计算出最适合的图表（折线图、条形图或圆环图）。",
                            jp: "データセットの形状は非常に柔軟です。そこから最も適合したグラフが計算されます (折れ線グラフ、棒グラフ、またはドーナツ グラフのいずれか)。",
                            es: "La forma del conjunto de datos es muy flexible. A partir de él se calculará el gráfico más adaptado (ya sea un gráfico de líneas, de barras o de anillos).",
                            ko: "데이터 세트의 모양은 매우 유연합니다. 가장 적합한 차트가 이 차트(선형, 막대형 또는 도넛형 차트)에서 계산됩니다."
                        },
                        scatterWeight: {
                            en: "To create a bubble chart. If not used, datapoints radius will use config.style.layout.plots.radius",
                            fr: "Pour créer un graphique à bulles. S'il n'est pas utilisé, le rayon des points de données utilisera config.style.layout.plots.radius",
                            pt: "Para criar um gráfico de bolhas. Se não for usado, o raio dos pontos de dados usará config.style.layout.plots.radius",
                            de: "So erstellen Sie ein Blasendiagramm. Wenn nicht verwendet, verwendet der Datenpunktradius config.style.layout.plots.radius",
                            zh: "创建气泡图。如果不使用，数据点半径将使用 config.style.layout.plots.radius",
                            jp: "バブル チャートを作成するには。使用しない場合、データポイント半径は config.style.layout.plots.radius を使用します。",
                            es: "Para crear un gráfico de burbujas. Si no se usa, el radio de los puntos de datos usará config.style.layout.plots.radius",
                            ko: "거품형 차트를 생성하려면 사용하지 않으면 데이터 포인트 반경은 config.style.layout.plots.radius를 사용합니다."
                        },
                        bar3d: {
                            mode: {
                                en: `"Stack mode" is obtained by poviding a "series" array in the dataset.`,
                                fr: `Le "mode pile" est obtenu en fournissant un tableau "série" dans l'ensemble de données.`,
                                pt: `O "modo pilha" é obtido fornecendo uma matriz "série" no conjunto de dados.`,
                                de: `Der „Stapelmodus“ wird durch die Bereitstellung eines „Serien“-Arrays im Datensatz erreicht.`,
                                zh: `“堆栈模式”是通过在数据集中提供“系列”数组来获得的。`,
                                jp: `「スタック モード」は、データセットに「系列」配列を提供することによって取得されます。`,
                                es: `El "modo de pila" se obtiene proporcionando una matriz de "serie" en el conjunto de datos.`,
                                ko: `"스택 모드"는 데이터 세트에 "시리즈" 배열을 제공하여 얻습니다.`
                            }
                        },
                        relationCircle: {
                            limit: {
                                en: "Number of items to display (basically slices the array from 0 to n)",
                                fr: "Nombre d'éléments à afficher (coupe essentiellement le tableau de 0 à n)",
                                pt: "Número de itens a serem exibidos (basicamente divide o array de 0 a n)",
                                de: "Anzahl der anzuzeigenden Elemente (unterteilt das Array grundsätzlich von 0 bis n)",
                                zh: "要显示的项目数（基本上将数组从 0 分割到 n）",
                                jp: "表示する項目の数 (基本的に配列を 0 から n までスライスします)",
                                es: "Número de elementos a mostrar (básicamente divide la matriz de 0 a n)",
                                ko: "표시할 항목 수(기본적으로 배열을 0에서 n까지 분할)"
                            },
                            weight: {
                                en: "List the weight of each link in the same order as the relations array",
                                fr: "Répertoriez le poids de chaque lien dans le même ordre que le tableau des relations",
                                pt: "Liste o peso de cada link na mesma ordem da matriz de relações",
                                de: "Listen Sie die Gewichtung jedes Links in derselben Reihenfolge auf wie im Beziehungsarray",
                                zh: "按照与关系数组相同的顺序列出每个链接的权重",
                                jp: "各リンクの重みを関係配列と同じ順序でリストします。",
                                es: "Enumere el peso de cada enlace en el mismo orden que la matriz de relaciones.",
                                ko: "관계 배열과 동일한 순서로 각 링크의 가중치를 나열합니다."
                            },
                            relations: {
                                en: "List all the ids of the items linked to this item.",
                                fr: "Répertoriez tous les identifiants des éléments liés à cet élément.",
                                pt: "Liste todos os IDs dos itens vinculados a este item.",
                                de: "Listen Sie alle IDs der mit diesem Artikel verknüpften Artikel auf.",
                                zh: "列出与该项目链接的所有项目的 ID。",
                                jp: "このアイテムにリンクされているアイテムのすべての ID をリストします。",
                                es: "Enumere todos los identificadores de los elementos vinculados a este elemento.",
                                ko: "이 항목에 연결된 항목의 모든 ID를 나열합니다."
                            }
                        },
                        smiley: {
                            p1: {
                                en: "A component to rate, or display rating results.",
                                fr: "Un composant pour évaluer ou afficher les résultats de l'évaluation.",
                                pt: "Um componente para avaliar ou exibir resultados de classificação.",
                                de: "Eine Komponente zum Bewerten oder Anzeigen von Bewertungsergebnissen.",
                                zh: "用于评分或显示评分结果的组件。",
                                jp: "評価するコンポーネント、または評価結果を表示するコンポーネント。",
                                es: "Un componente para calificar o mostrar resultados de calificación.",
                                ko: "평가하거나 평가 결과를 표시하는 구성 요소입니다."
                            }
                        },
                        noDataset: {
                            en: "No dataset required",
                            fr: "Aucun dataset requis",
                            pt: "Nenhum dataset é necessário",
                            de: "Kein Datensatz erforderlich",
                            zh: "无需数据集",
                            jp: "データセットは必要ありません",
                            es: "No se requiere conjunto de datos",
                            ko: "데이터 세트가 필요하지 않습니다"
                        },
                        optional: {
                            en: "Optional",
                            fr: "Optionnel",
                            pt: "Opcional",
                            de: "Optional",
                            zh: "选修的",
                            jp: "オプション",
                            es: "Opcional",
                            ko: "선택 과목"
                        },
                        yourConfigHere: {
                            en: "Your config here",
                            fr: "Votre config ici",
                            pt: "Sua configuração aqui",
                            de: "Ihre Konfiguration hier",
                            zh: "你的配置在这里",
                            jp: "設定はここにあります",
                            es: "Su configuración aquí",
                            ko: "귀하의 구성은 여기에 있습니다"
                        },
                        yourDatasetHere: {
                            en: "Your dataset here",
                            fr: "Votre dataset ici",
                            pt: "Sua dataset aqui",
                            de: "Ihr Datensatz hier",
                            zh: "您的数据集位于此处",
                            jp: "データセットはここにあります",
                            es: "Su conjunto de datos aquí",
                            ko: "여기에 데이터세트가 있습니다"
                        },
                        xy: {
                            showSerieName: {
                                en: "Display the name of the series at the end of start of a 'line' or 'plot' datapoint.",
                                fr: "Afficher le nom de la série à la fin ou au début d'un point de données « line » ou « plot ».",
                                pt: "Exibe o nome da série no final do início de um ponto de dados de 'line' ou 'plot'.",
                                de: "Zeigt den Namen der Serie am Ende oder Anfang eines „line“- oder „plot“-Datenpunkts an.",
                                zh: "line“线”plot“图”数据点的开头末尾显示系列名称。",
                                jp: "「line」または「plot」データポイントの開始点の末尾に系列の名前を表示します。",
                                es: "Muestra el nombre de la serie al final del inicio de un punto de datos de 'líne' o 'plot'.",
                                ko: "'line' 또는 'plot' 데이터 포인트의 시작 부분에 계열 이름을 표시합니다."
                            },
                            autoScaling: {
                                en: "In stacked mode, will attempt to harmonize the scale to the datapoint's min & max values",
                                fr: "En mode empilé, tentera d'harmoniser l'échelle avec les valeurs min et max du point de données",
                                pt: "No modo empilhado, tentará harmonizar a escala com os valores mínimo e máximo do ponto de dados",
                                de: "Im gestapelten Modus wird versucht, die Skala an die Min.- und Max.-Werte des Datenpunkts anzupassen",
                                zh: "在堆叠模式下，将尝试将比例与数据点的最小值和最大值协调一致",
                                jp: "スタックモードでは、スケールをデータポイントの最小値と最大値に調和させようとします。",
                                es: "En modo apilado, intentará armonizar la escala con los valores mínimo y máximo del punto de datos.",
                                ko: "스택 모드에서는 데이터 포인트의 최소 및 최대 값에 배율을 조화시키려고 시도합니다."
                            },
                            stackRatio: {
                                en: "In stacked mode, force the height ratio of a datapoint to take more height space on the chart",
                                fr: "En mode empilé, forcez le rapport de hauteur d'un point de données à occuper plus d'espace en hauteur sur le graphique.",
                                pt: "No modo empilhado, força a proporção de altura de um ponto de dados para ocupar mais espaço de altura no gráfico",
                                de: "Erzwingen Sie im gestapelten Modus das Höhenverhältnis eines Datenpunkts, um mehr Höhenraum im Diagramm einzunehmen",
                                zh: "在堆叠模式下，强制数据点的高度比例在图表上占据更多高度空间",
                                jp: "積み上げモードでは、データポイントの高さの比率を強制的にグラフ上でより多くの高さのスペースに配置します。",
                                es: "En modo apilado, fuerce la relación de altura de un punto de datos para que ocupe más espacio de altura en el gráfico.",
                                ko: "누적 모드에서는 데이터 포인트의 높이 비율이 차트에서 더 많은 높이 공간을 차지하도록 강제합니다."
                            },
                            scaleMin: {
                                en: "Set the minimum value for an individual scale",
                                fr: "Définir la valeur minimale pour une échelle individuelle",
                                pt: "Defina o valor mínimo para uma escala individual",
                                de: "Legen Sie den Mindestwert für eine einzelne Skala fest",
                                zh: "设置单个比例的最小值",
                                jp: "個々のスケールの最小値を設定する",
                                es: "Establecer el valor mínimo para una escala individual",
                                ko: "개별 눈금의 최소값 설정"
                            },
                            scaleMax: {
                                en: "Set the max value for an individual scale (can act like an offset Y of sorts)",
                                fr: "Définir la valeur maximale pour une échelle individuelle (peut agir comme une sorte de décalage Y)",
                                pt: "Defina o valor máximo para uma escala individual (pode funcionar como uma espécie de deslocamento Y)",
                                de: "Legen Sie den Maximalwert für eine einzelne Skala fest (kann wie eine Art Offset-Y wirken)",
                                zh: "设置单个比例的最大值（可以起到类似 Y 偏移量的作用）",
                                jp: "個々のスケールの最大値を設定します (ある種のオフセット Y のように機能します)",
                                es: "Establezca el valor máximo para una escala individual (puede actuar como una especie de compensación Y)",
                                ko: "개별 눈금의 최대값 설정(일종의 오프셋 Y처럼 작동할 수 있음)"
                            },
                            individualScales: {
                                en: "It is possible to display all series with their indivudual scale, to show correlations between series with different magnitudes. It is recommended to use this config option when the dataset presents a limited number of datapoints, to avoid hindering the chart's readability.",
                                fr: "Il est possible d'afficher toutes les séries avec leur échelle individuelle, pour montrer les corrélations entre des séries de différentes magnitudes. Il est recommandé d'utiliser cette option de configuration lorsque l'ensemble de données présente un nombre limité de points de données, pour éviter de gêner la lisibilité du graphique.",
                                pt: "É possível visualizar todas as séries com sua escala individual, para mostrar correlações entre séries com diferentes magnitudes. Recomenda-se utilizar esta opção de configuração quando o conjunto de dados apresentar um número limitado de pontos de dados, para não prejudicar a legibilidade do gráfico.",
                                de: "Es ist möglich, alle Serien mit ihrer individuellen Skala anzuzeigen, um Korrelationen zwischen Serien mit unterschiedlichen Größenordnungen anzuzeigen. Es wird empfohlen, diese Konfigurationsoption zu verwenden, wenn der Datensatz eine begrenzte Anzahl von Datenpunkten aufweist, um die Lesbarkeit des Diagramms nicht zu beeinträchtigen.",
                                zh: "可以显示所有系列及其各自的比例，以显示不同量级的系列之间的相关性。当数据集提供有限数量的数据点时，建议使用此配置选项，以避免影响图表的可读性。",
                                jp: "すべての系列を個別のスケールで表示し、異なる大きさの系列間の相関を示すことができます。データセットが提示するデータポイントの数が限られている場合は、グラフの読みやすさの妨げを避けるために、この構成オプションを使用することをお勧めします。",
                                es: "Es posible visualizar todas las series con su escala individual, para mostrar correlaciones entre series con diferentes magnitudes. Se recomienda utilizar esta opción de configuración cuando el conjunto de datos presenta una cantidad limitada de puntos de datos, para evitar obstaculizar la legibilidad del gráfico.",
                                ko: "모든 계열을 개별 규모로 표시하여 크기가 다른 계열 간의 상관 관계를 표시할 수 있습니다. 차트의 가독성을 방해하지 않도록 데이터 세트가 제한된 수의 데이터 포인트를 제공하는 경우 이 구성 옵션을 사용하는 것이 좋습니다."
                            },
                            scaleSteps: {
                                en: 'Available since v2.1.52, to define the number of indentations in an individual scale.',
                                fr: "Disponible depuis la v2.1.52, pour définir le nombre d'indentations dans une échelle individuelle.",
                                pt: "Disponível desde a v2.1.52, para definir o número de recuos em uma escala individual.",
                                de: "Verfügbar seit v2.1.52, um die Anzahl der Einrückungen in einer einzelnen Skala zu definieren.",
                                zh: "自 v2.1.52 起可用，用于定义单个比例中的缩进数量。",
                                jp: "v2.1.52 以降、個々のスケールのインデント数を定義するために使用できます。",
                                es: "Disponible desde la v2.1.52, para definir el número de sangrías en una escala individual.",
                                ko: "개별 눈금의 들여쓰기 수를 정의하기 위해 v2.1.52부터 사용할 수 있습니다."
                            },
                            scaleLabel: {
                                en: 'Available since v2.1.52, to specify a label for individual scales.',
                                fr: "Disponible depuis la v2.1.52, pour spécifier une étiquette pour les échelles individuelles.",
                                pt: "Disponível desde a v2.1.52, para especificar um rótulo para balanças individuais.",
                                de: "Verfügbar seit v2.1.52, um eine Beschriftung für einzelne Skalen festzulegen.",
                                zh: "自 v2.1.52 起可用，用于为各个比例指定标签。",
                                jp: "v2.1.52 以降、個々のスケールのラベルを指定するために使用できます。",
                                es: "Disponible desde v2.1.52, para especificar una etiqueta para básculas individuales.",
                                ko: "개별 눈금에 대한 레이블을 지정하기 위해 v2.1.52부터 사용할 수 있습니다."
                            },
                            shape: {
                                en: "Available since v.1.9.17 for line and plot types. Defaults to 'circle'",
                                fr: "Disponible depuis la v.1.9.17 pour les types de lignes et de tracés. La valeur par défaut est 'circle'",
                                pt: "Disponível desde v.1.9.17 para tipos de linha e plotagem. O padrão é 'circle'",
                                de: "Verfügbar seit Version 1.9.17 für Linien- und Plottypen. Standardmäßig ist „circle“",
                                jp: "v.1.9.17 以降、ライン タイプとプロット タイプで使用できます。デフォルトは「circle」",
                                zh: "自 v.1.9.17 起可用于线条和绘图类型。默认为“circle”",
                                es: "Disponible desde la v.1.9.17 para tipos de línea y gráfico. El valor predeterminado es 'círcle'",
                                ko: "선 및 플롯 유형에 대해 v.1.9.17부터 사용 가능합니다. 기본값은 '원'"
                            },
                            smooth2: {
                                en: "Available since v.1.9.0 for line types, in SVG mode.",
                                fr: "Disponible depuis la v.1.9.0 pour les types lignes, en mode SVG.",
                                pt: "Disponível desde a v.1.9.0 para tipos de linha, no modo SVG.",
                                de: "Verfügbar seit Version 1.9.0 für Linientypen im SVG-Modus.",
                                zh: "自 v.1.9.0 起适用于 SVG 模式下的线型。",
                                jp: "v.1.9.0 以降、SVG モードの線種で使用できます。",
                                es: "Disponible desde la v.1.9.0 para tipos de línea, en modo SVG.",
                                ko: "SVG 모드에서 선 유형에 대해 v.1.9.0부터 사용 가능합니다."
                            },
                            smooth: {
                                en: "Since version 1.9.0, you can set this property on line types to make them curved.",
                                fr: "Depuis la version 1.9.0, vous pouvez définir cette propriété sur les types de lignes pour les rendre courbes.",
                                pt: "Desde a versão 1.9.0, você pode definir esta propriedade em tipos de linha para torná-los curvos.",
                                de: "Seit Version 1.9.0 können Sie diese Eigenschaft für Linientypen festlegen, um sie gekrümmt zu machen.",
                                zh: "从版本 1.9.0 开始，您可以在线类型上设置此属性以使它们弯曲。",
                                jp: "バージョン 1.9.0 以降、線種にこのプロパティを設定して線種を曲線にすることができます。",
                                es: "Desde la versión 1.9.0, puede establecer esta propiedad en tipos de líneas para hacerlas curvas.",
                                ko: "버전 1.9.0부터 선 유형에 이 속성을 설정하여 곡선으로 만들 수 있습니다."
                            },
                            area: {
                                en: "Since version v.1.8.7, you can set this property to show an area chart on line types",
                                fr: "Depuis la version v.1.8.7, vous pouvez définir cette propriété pour afficher un graphique en aires sur les types ligne",
                                pt: "Desde a versão v.1.8.7, você pode definir esta propriedade para mostrar um gráfico de área em tipos de linha",
                                de: "Seit Version v.1.8.7 können Sie diese Eigenschaft so einstellen, dass ein Flächendiagramm für Linientypen angezeigt wird",
                                zh: "从版本 v.1.8.7 开始，您可以设置此属性以在线类型上显示面积图",
                                jp: "バージョン v.1.8.7 以降、このプロパティを設定して線種の面グラフを表示できます。",
                                es: "Desde la versión v.1.8.7, puede configurar esta propiedad para mostrar un gráfico de áreas en tipos de línea",
                                ko: "v.1.8.7 버전부터 이 속성을 설정하여 선 유형에 영역 차트를 표시할 수 있습니다."
                            },
                            canvas: {
                                description: {
                                    en: "This chart can be displayed as a SVG or a Canvas.",
                                    fr: "Ce graphique peut être affiché au format SVG ou Canvas.",
                                    pt: "Este gráfico pode ser exibido como SVG ou Canvas.",
                                    de: "Dieses Diagramm kann als SVG oder Canvas angezeigt werden.",
                                    zh: "该图表可以显示为 SVG 或 Canvas。",
                                    jp: "このグラフは SVG または Canvas として表示できます。",
                                    es: "Este gráfico se puede mostrar como SVG o Canvas.",
                                    ko: "이 차트는 SVG 또는 캔버스로 표시될 수 있습니다."
                                },
                                moreInfo: {
                                    en: "More info",
                                    fr: "Plus d'informations",
                                    pt: "Mais informações",
                                    de: "Mehr Info",
                                    zh: "更多信息",
                                    jp: "より詳しい情報",
                                    es: "Más información",
                                    ko: "더 많은 정보"
                                },
                                detailsDisclaimer: {
                                    en: "In canvas mode, shapes are not yet available for 'line' and 'plot' types",
                                    fr: "En mode canvas, les formes ne sont pas encore disponibles pour les types 'line' et 'plot'",
                                    pt: "No modo de tela, as formas ainda não estão disponíveis para os tipos 'line' e 'plot'",
                                    de: "Im Leinwandmodus sind Formen für die Typen „line“ und „plot“ noch nicht verfügbar",
                                    zh: "在画布模式下，形状尚不可用于“line”和“plot”类型",
                                    jp: "キャンバス モードでは、「line」タイプと「plot」タイプでは形状をまだ使用できません。",
                                    es: "En el modo lienzo, las formas aún no están disponibles para los tipos 'line' y 'plots'",
                                    ko: "캔버스 모드에서는 아직 '선' 및 '플롯' 유형에 도형을 사용할 수 없습니다."
                                },
                                details: {
                                    en: "By default, the configuration will generate a SVG. If you rather have less nodes in your HTML, you can display the chart as a Canvas. This is an experimental feature, you will need to adapt font sizes and chart padding in the options.",
                                    fr: "Par défaut, la configuration générera un SVG. Si vous préférez avoir moins de nœuds dans votre HTML, vous pouvez afficher le graphique sous forme de canevas. Il s'agit d'une fonctionnalité expérimentale, vous devrez adapter la taille des polices et le remplissage du graphique dans les options.",
                                    pt: "Por padrão, a configuração irá gerar um SVG. Se preferir ter menos nós em seu HTML, você pode exibir o gráfico como um Canvas. Este é um recurso experimental, você precisará adaptar os tamanhos das fontes e o preenchimento do gráfico nas opções.",
                                    de: "Standardmäßig generiert die Konfiguration ein SVG. Wenn Sie weniger Knoten in Ihrem HTML haben möchten, können Sie das Diagramm als Canvas anzeigen. Dies ist eine experimentelle Funktion. Sie müssen die Schriftgröße und den Diagrammabstand in den Optionen anpassen.",
                                    zh: "默认情况下，配置将生成 SVG。如果您希望 HTML 中的节点较少，则可以将图表显示为 Canvas。这是一项实验性功能，您需要在选项中调整字体大小和图表填充。",
                                    jp: "デフォルトでは、設定により SVG が生成されます。 HTML 内のノードを減らしたい場合は、チャートをキャンバスとして表示できます。これは実験的な機能であり、オプションでフォント サイズとグラフのパディングを調整する必要があります。",
                                    es: "De forma predeterminada, la configuración generará un SVG. Si prefiere tener menos nodos en su HTML, puede mostrar el gráfico como un lienzo. Esta es una característica experimental; deberá adaptar los tamaños de fuente y el relleno del gráfico en las opciones.",
                                    ko: "기본적으로 구성은 SVG를 생성합니다. HTML에 노드 수가 적은 경우 차트를 캔버스로 표시할 수 있습니다. 이는 실험적인 기능이므로 옵션에서 글꼴 크기와 차트 패딩을 조정해야 합니다."
                                },
                                advantage: {
                                    en: "Advantages",
                                    fr: "Avantages",
                                    pt: "Vantagens",
                                    de: "Vorteile",
                                    zh: "优点",
                                    jp: "利点",
                                    es: "Ventajas",
                                    ko: "기본적으로 구성은 SVG를 생성합니다. HTML에 노드 수가 적은 경우 차트를 캔버스로 표시할 수 있습니다. 이는 실험적인 기능이므로 옵션에서 글꼴 크기와 차트 패딩을 조정해야 합니다."
                                },
                                drawbacks: {
                                    en: "Drawbacks",
                                    fr: "Inconvénients",
                                    pt: "Desvantagens",
                                    de: "Nachteile",
                                    zh: "缺点",
                                    jp: "欠点",
                                    es: "Desventajas",
                                    ko: "단점"
                                },
                                svgAdvantage: {
                                    en: `<ul class="pl-4"><li class="list-disc">Vectorized: graphics quality remains the same at all scales.</li><li class="list-disc">Acessibility: text nodes can be detected by screen readers.</li><li class="list-disc">Easier debugging, as nodes are part of the DOM</li></ul>`,
                                    fr: `<ul class="pl-4"><li class="list-disc">Vectorisé : la qualité graphique reste la même à toutes les échelles.</li><li class="list-disc">Accessibilité : les nœuds de texte peuvent être détectés par les lecteurs d'écran.</li><li class="list-disc">Débogage plus facile, car les nœuds font partie du DOM</li></ul>`,
                                    pt: `<ul class="pl-4"><li class="list-disc">Vetorizado: a qualidade gráfica permanece a mesma em todas as escalas.</li><li class="list-disc">Acessibilidade: nós de texto podem ser detectados por leitores de tela.</li><li class="list-disc">Depuração mais fácil, pois os nós fazem parte do DOM</li></ul>`,
                                    de: `<ul class="pl-4"><li class="list-disc">Vektorisiert: Die Grafikqualität bleibt in allen Maßstäben gleich.</li><li class="list-disc">Zugänglichkeit: Textknoten können von Screenreadern erkannt werden.</li><li class="list-disc">Einfacheres Debuggen, da Knoten Teil des DOM sind</li></ul>`,
                                    zh: `<ul class="pl-4"><li class="list-disc">矢量化：图形质量在所有比例下保持不变。</li><li class="list-disc">可访问性：屏幕阅读器可以检测到文本节点。</li><li class="list-disc">更容易调试，因为节点是 DOM 的一部分</li></ul>`,
                                    jp: `<ul class="pl-4"><li class="list-disc">ベクトル化: グラフィックスの品質はどのスケールでも同じままです。</li><li class="list-disc">アクセシビリティ: テキスト ノードはスクリーン リーダーによって検出できます。</li><li class="list-disc">ノードは DOM の一部であるため、デバッグが容易になります。</li></ul>`,
                                    es: `<ul class="pl-4"><li class="list-disc">Vectorizado: la calidad de los gráficos sigue siendo la misma en todas las escalas.</li><li class="list-disc">Accesibilidad: los lectores de pantalla pueden detectar nodos de texto.</li><li class="list-disc">Depuración más sencilla, ya que los nodos son parte del DOM</li></ul>`,
                                    ko: `<ul class="pl-4"><li class="list-disc">벡터화: 그래픽 품질은 모든 규모에서 동일하게 유지됩니다.</li><li class="list-disc">접근성: 텍스트 노드는 화면 판독기에 의해 감지됩니다.</li><li class="list-disc">노드가 DOM의 일부이므로 디버깅이 더 쉽습니다.</li></ul>`
                                },
                                svgDrawbacks: {
                                    en: `<ul class="pl-4"><li class="list-disc">Performance decreases with the number of nodes to paint on the HTML</li><li class="list-disc">PDF render can be unpredictable for fonts and styling</li></ul>`,
                                    fr: `<ul class="pl-4"><li class="list-disc">Les performances diminuent avec le nombre de nœuds à peindre sur le HTML</li><li class="list-disc">Le rendu PDF peut être imprévisible pour les polices et le style</li></ul>`,
                                    pt: `<ul class="pl-4"><li class="list-disc">O desempenho diminui com o número de nós a serem pintados no HTML</li><li class="list-disc">A renderização de PDF pode ser imprevisível para fontes e estilos</li></ul>`,
                                    de: `<ul class="pl-4"><li class="list-disc">Die Leistung nimmt mit der Anzahl der Knoten ab, die auf der HTML-Seite gezeichnet werden sollen.</li><li class="list-disc">PDF-Rendering kann durchgeführt werden unvorhersehbar für Schriftarten und Stil</li></ul>`,
                                    zh: `<ul class="pl-4"><li class="list-disc">性能随着 HTML 上绘制的节点数量的增加而降低</li><li class="list-disc">PDF 渲染可能会字体和样式不可预测</li></ul>`,
                                    jp: `<ul class="pl-4"><li class="list-disc">HTML 上に描画するノードの数に応じてパフォーマンスが低下する</li><li class="list-disc">PDF レンダリングでは、フォントとスタイルは予測不可能</li></ul>`,
                                    es: `<ul class="pl-4"><li class="list-disc">El rendimiento disminuye con la cantidad de nodos para pintar en el HTML</li><li class="list-disc">El renderizado PDF se puede impredecible en cuanto a fuentes y estilos</li></ul>`,
                                    ko: `<ul class="pl-4"><li class="list-disc">HTML에 그릴 노드 수에 따라 성능이 감소합니다.</li><li class="list-disc">PDF 렌더링은 글꼴과 스타일을 예측할 수 없습니다</li></ul>`
                                },
                                canvasAdvantages: {
                                    en: `<ul class="pl-4"><li class="list-disc">Stable performance: only one node in the DOM.</li><li class="list-disc">PDF render is identical.</li><li class="list-disc">Can be copy pasted as an image</li></ul>`,
                                    fr: `<ul class="pl-4"><li class="list-disc">Performances stables : un seul nœud dans le DOM.</li><li class="list-disc">Le rendu PDF est identique.< /li><li class="list-disc">Peut être copié-collé sous forme d'image</li></ul>`,
                                    pt: `<ul class="pl-4"><li class="list-disc">Desempenho estável: apenas um nó no DOM.</li><li class="list-disc">A renderização do PDF é idêntica.< /li><li class="list-disc">Pode ser copiado e colado como uma imagem</li></ul>`,
                                    de: `<ul class="pl-4"><li class="list-disc">Stabile Leistung: nur ein Knoten im DOM.</li><li class="list-disc">PDF-Rendering ist identisch.< /li><li class="list-disc">Kann als Bild kopiert und eingefügt werden</li></ul>`,
                                    zh: `<ul class="pl-4"><li class="list-disc">性能稳定：DOM 中只有一个节点。</li><li class="list-disc">PDF 渲染完全相同。< /li><li class="list-disc">可以复制粘贴为图像</li></ul>`,
                                    jp: `<ul class="pl-4"><li class="list-disc">安定したパフォーマンス: DOM 内のノードは 1 つだけです。</li><li class="list-disc">PDF レンダリングは同一です。< /li><li class="list-disc">画像としてコピー＆ペーストできます</li></ul>`,
                                    es: `<ul class="pl-4"><li class="list-disc">Rendimiento estable: solo un nodo en el DOM.</li><li class="list-disc">La representación del PDF es idéntica.< /li><li class="list-disc">Se puede copiar y pegar como imagen</li></ul>`,
                                    ko: `<ul class="pl-4"><li class="list-disc">안정적인 성능: DOM에 노드가 하나만 있습니다.</li><li class="list-disc">PDF 렌더링은 동일합니다.< /li><li class="list-disc">이미지로 복사하여 붙여넣기 가능</li></ul>`
                                },
                                canvasDrawbacks: {
                                    en: `<ul class="pl-4"><li class="list-disc">Image quality does not scale</li><li class="list-disc">Text elements are not accessible to screen readers</li><li class="list-disc">Harder debugging as the node is empty in the DOM.</li></ul>`,
                                    fr: `<ul class="pl-4"><li class="list-disc">La qualité de l'image n'est pas adaptée</li><li class="list-disc">Les éléments de texte ne sont pas accessibles aux lecteurs d'écran</li ><li class="list-disc">Débogage plus difficile car le nœud est vide dans le DOM.</li></ul>`,
                                    pt: `<ul class="pl-4"><li class="list-disc">A qualidade da imagem não aumenta</li><li class="list-disc">Os elementos de texto não são acessíveis aos leitores de tela</li ><li class="list-disc">Depuração mais difícil porque o nó está vazio no DOM.</li></ul>`,
                                    de: `<ul class="pl-4"><li class="list-disc">Bildqualität lässt sich nicht skalieren</li><li class="list-disc">Textelemente sind für Screenreader nicht zugänglich</li ><li class="list-disc">Schwierigeres Debuggen, da der Knoten im DOM leer ist.</li></ul>`,
                                    zh: `<ul class="pl-4"><li class="list-disc">图像质量无法缩放</li><li class="list-disc">屏幕阅读器无法访问文本元素</li ><li class="list-disc">由于 DOM 中的节点为空，调试更加困难。</li></ul>`,
                                    jp: `<ul class="pl-4"><li class="list-disc">画質が調整されない</li><li class="list-disc">スクリーン リーダーがテキスト要素にアクセスできない</li ><li class="list-disc">DOM 内のノードが空であるため、デバッグが難しくなります。</li></ul>`,
                                    es: `<ul class="pl-4"><li class="list-disc">La calidad de la imagen no escala</li><li class="list-disc">Los lectores de pantalla no pueden acceder a los elementos de texto</li ><li class="list-disc">Depuración más difícil ya que el nodo está vacío en el DOM.</li></ul>`,
                                    ko: `<ul class="pl-4"><li class="list-disc">이미지 품질이 확장되지 않습니다</li><li class="list-disc">스크린 리더에서 텍스트 요소에 액세스할 수 없습니다</li ><li class="list-disc">DOM에서 노드가 비어 있으므로 디버깅이 더 어렵습니다.</li></ul>`
                                }
                            },
                            type: {
                                en: "The following attributes are optional:",
                                fr: "Les attributs suivants sont optionnels:",
                                pt: "Os seguintes atributos são opcionais:",
                                de: "Die folgenden Attribute sind optional:",
                                zh: "以下属性是可选的：",
                                jp: "次のプロパティはオプションです。",
                                es: "Los siguientes atributos son opcionales:",
                                ko: "다음 속성은 선택사항입니다."
                            },
                            color: {
                                en: "If not provided, the default palette will be used by default",
                                fr: "Si elle n'est pas fournie, la palette par défaut sera utilisée par défaut",
                                pt: "o padrão será a paleta padrão se não for fornecida",
                                de: "Wenn nicht angegeben, wird standardmäßig die Standardpalette verwendet",
                                zh: "如果未提供，将默认使用默认调色板",
                                jp: "指定しない場合は、デフォルトのパレットがデフォルトで使用されます。",
                                es: "Si no se proporciona, la paleta predeterminada se utilizará de forma predeterminada.",
                                ko: "제공되지 않으면 기본 팔레트가 기본적으로 사용됩니다."
                            },
                            dashed: {
                                en: "use 'true' on line types to display a dashed line",
                                fr: "utilisez 'true' sur les types de ligne pour afficher une ligne pointillée",
                                pt: "use 'true' em tipos de linha para exibir uma linha tracejada",
                                de: "Verwenden Sie „true“ für Linientypen, um eine gestrichelte Linie anzuzeigen",
                                zh: "在线类型上使用“true”来显示虚线",
                                jp: "破線を表示するには、線種に「true」を使用します。",
                                es: "use 'true' en los tipos de línea para mostrar una línea discontinua",
                                ko: "점선을 표시하려면 선 유형에 'true'를 사용하세요."
                            },
                            useTag: {
                                en: "use for line or plot types to show the serie name as a tag",
                                fr: "utiliser pour les types ligne ou points pour afficher le nom de la série sous forme de tag",
                                pt: "use para tipos de linha ou gráfico para mostrar o nome da série como uma tag",
                                de: "Verwenden Sie diese Option für Linien- oder Plottypen, um den Seriennamen als Tag anzuzeigen",
                                zh: "用于线条或绘图类型以将系列名称显示为标签",
                                jp: "シリーズ名をラベルとして表示するためのラインまたはプロット タイプに使用されます。",
                                es: "utilizar para tipos de líneas o gráficos para mostrar el nombre de la serie como una etiqueta",
                                ko: "라인 또는 플롯 유형에 사용하여 시리즈 이름을 태그로 표시"
                            },
                            dataLabels: {
                                en: "hide or show specific serie dataLabels",
                                fr: "masquer ou afficher les étiquettes de données d'une série spécifique",
                                pt: "ocultar ou mostrar dataLabels de séries específicas",
                                de: "Blenden Sie bestimmte Seriendatenbeschriftungen ein oder aus",
                                zh: "隐藏或显示特定系列数据标签",
                                jp: "特定のシリーズのデータ​​ラベルを表示または非表示にする",
                                es: "ocultar o mostrar etiquetas de datos de series específicas",
                                ko: "특정 계열 데이터 라벨 숨기기 또는 표시"
                            },
                            useProgression: {
                                en: "show a progression line, works for all types",
                                fr: "afficher une ligne de progression, fonctionne pour tous les types",
                                pt: "mostra uma linha de progressão, funciona para todos os tipos",
                                de: "zeigt eine Fortschrittslinie an, funktioniert für alle Typen",
                                zh: "显示进度线，适用于所有类型",
                                jp: "進行線を表示し、すべてのタイプに機能します",
                                es: "muestra una línea de progresión, funciona para todos los tipos",
                                ko: "진행 라인을 표시하며 모든 유형에 적용됩니다."
                            },
                        },
                        donut: {
                            layoutTitle: {
                                en: "display title and legend outside of the svg",
                                fr: "afficher le titre et la légende en dehors du svg",
                                pt: "exibir título e legenda fora do SVG",
                                de: "Titel und Legende außerhalb von SVG anzeigen",
                                zh: "在 svg 之外显示标题和图例”",
                                jp: "タイトルと凡例を SVG の外に表示します。」",
                                es: "mostrar título y leyenda fuera del svg",
                                ko: "svg 외부에 제목과 범례 표시"
                            },
                            hideUnderValue: {
                                en: "hide datalabels under this value",
                                fr: "masquer les étiquettes de données sous cette valeur",
                                pt: "ocultar rótulos de dados sob este valor",
                                de: "Datenbeschriftungen unterhalb dieses Werts ausblenden",
                                zh: "隐藏该值下的数据标签",
                                jp: "この値の下のデータラベルを非表示にします",
                                es: "ocultar etiquetas de datos bajo este valor",
                                ko: "이 값 아래에 데이터 라벨 숨기기"
                            }
                        },
                        waffle: {
                            gridSize: {
                                en: "results in a 20 x 20 grid",
                                fr: "grille 20 x 20",
                                pt: "resulta em uma grade de 20 x 20",
                                de: "ergibt ein 20 x 20 Raster",
                                zh: "结果是 20 x 20 网格",
                                jp: "結果は 20 x 20 グリッドになります",
                                es: "da como resultado una cuadrícula de 20 x 20",
                                ko: "결과는 20 x 20 그리드입니다."
                            }
                        },
                        radar: {
                            seriesValues: {
                                en: "must be of same length as categories",
                                fr: "doit être de même longueur que les catégories",
                                pt: "deve ter o mesmo comprimento das categorias",
                                de: "müssen die gleiche Länge wie Kategorien haben",
                                zh: "必须与类别的长度相同",
                                jp: "カテゴリと同じ長さでなければなりません",
                                es: "debe tener la misma longitud que las categorías",
                                ko: "카테고리와 길이가 같아야 합니다."
                            },
                            target: {
                                en: "if not used will default to max value",
                                fr: "s'il n'est pas utilisé, la valeur par défaut sera la valeur maximale",
                                pt: "se não for usado, o padrão será o valor máximo",
                                de: "Wenn es nicht verwendet wird, wird standardmäßig der Maximalwert verwendet",
                                zh: "如果不使用将默认为最大值",
                                jp: "使用しない場合はデフォルトの最大値になります",
                                es: "si no se usa, el valor predeterminado será el máximo",
                                ko: "사용하지 않으면 기본값은 최대값으로 설정됩니다."
                            },
                            polygon: {
                                en: "you must provide at least 3 series to create a polygon",
                                fr: "vous devez fournir au moins 3 séries pour créer un polygone",
                                pt: "você deve fornecer pelo menos 3 séries para criar um polígono",
                                de: "Sie müssen mindestens drei Serien bereitstellen, um ein Polygon zu erstellen",
                                zh: "您必须提供至少 3 个系列才能创建多边形",
                                jp: "ポリゴンを作成するには少なくとも 3 つのシリーズを指定する必要があります",
                                es: "debes proporcionar al menos 3 series para crear un polígono",
                                ko: "다각형을 만들려면 시리즈를 3개 이상 제공해야 합니다."
                            },
                            scale: {
                                en: "Each serie can have its own scale using the target attribute, so you can represent all types of data relations (revenue, satisfaction, percentages...)",
                                fr: "Chaque série peut avoir sa propre échelle grâce à l'attribut target, vous pouvez ainsi représenter tous types de relations de données (revenu, satisfaction, pourcentages...)",
                                pt: "Cada série pode ter sua própria escala usando o atributo target, para que você possa representar todos os tipos de relações de dados (receita, satisfação, percentuais...)",
                                de: "Jede Reihe kann mithilfe des Zielattributs über eine eigene Skala verfügen, sodass Sie alle Arten von Datenbeziehungen (Umsatz, Zufriedenheit, Prozentsätze usw.) darstellen können.",
                                zh: "每个系列都可以使用目标属性拥有自己的比例，因此您可以表示所有类型的数据关系（收入、满意度、百分比...）",
                                jp: "各シリーズはターゲット属性を使用して独自のスケールを持つことができるため、あらゆるタイプのデータ関係 (収益、満足度、パーセンテージなど) を表すことができます。",
                                es: "Cada serie puede tener su propia escala utilizando el atributo objetivo, por lo que se pueden representar todo tipo de relaciones de datos (ingresos, satisfacción, porcentajes...)",
                                ko: "각 계열은 대상 속성을 사용하여 자체 척도를 가질 수 있으므로 모든 유형의 데이터 관계(수익, 만족도, 백분율...)를 나타낼 수 있습니다."
                            }
                        },
                        quadrant: {
                            useWhenAutoFalse: {
                                en: "Used when auto is 'false'",
                                fr: "Utilisé lorsque auto est 'false'",
                                pt: "Usado quando auto é 'false'",
                                de: "Wird verwendet, wenn auto „false“ ist.",
                                zh: "当 auto 为“false”时使用",
                                jp: "auto が「false」の場合に使用されます",
                                es: "Se utiliza cuando auto es 'false'",
                                ko: "auto가 'false'일 때 사용됩니다."
                            }
                        },
                        gauge: {
                            steps: {
                                en: "Set up the gauge steps",
                                fr: "Configurer les crans de la jauge",
                                pt: "Configurar as etapas do medidor",
                                de: "Richten Sie die Messebenen ein",
                                zh: "设置仪器步骤",
                                jp: "ゲージステップを設定する",
                                es: "Configurar los pasos del medidor",
                                ko: "게이지 단계 설정"
                            }
                        },
                        onion: {
                            optionalDisplay: {
                                en: "Optional, display the value in the dataLabel",
                                fr: "Facultatif, affichez la valeur dans le dataLabel",
                                pt: "Opcional, exiba o valor no dataLabel",
                                de: "Optional können Sie den Wert im dataLabel anzeigen",
                                zh: "可选，在数据标签中显示值",
                                jp: "オプションで、データラベルに値を表示します。",
                                es: "Opcional, muestra el valor en la etiqueta de datos.",
                                ko: "선택사항, dataLabel에 값을 표시합니다."
                            },
                            prefix: {
                                en: "Optional, display a symbol as a prefix before the value in the data label",
                                fr: "Facultatif, afficher un symbole comme préfixe avant la valeur dans l'étiquette de données",
                                pt: "Opcional, exiba um símbolo como prefixo antes do valor no rótulo de dados",
                                de: "Optional können Sie ein Symbol als Präfix vor dem Wert in der Datenbeschriftung anzeigen",
                                zh: "可选，在数据标签中的值之前显示一个符号作为前缀",
                                jp: "オプションで、データラベルの値の前に接頭辞としてシンボルを表示します。",
                                es: "Opcional, muestre un símbolo como prefijo antes del valor en la etiqueta de datos",
                                ko: "선택 사항으로 데이터 레이블의 값 앞에 기호를 접두어로 표시합니다."
                            },
                            suffix: {
                                en: "Optional, display a symbol as a suffix before the value in the data label",
                                fr: "Facultatif, afficher un symbole comme suffixe avant la valeur dans l'étiquette de données",
                                pt: "Opcional, exiba um símbolo como sufixo antes do valor no rótulo de dados",
                                de: "Optional können Sie ein Symbol als Suffix vor dem Wert in der Datenbeschriftung anzeigen",
                                zh: "可选，在数据标签中的值之前显示一个符号作为后缀",
                                jp: "オプションで、データラベルの値の前に接尾辞としてシンボルを表示します。",
                                es: "Opcional, muestre un símbolo como sufijo antes del valor en la etiqueta de datos",
                                ko: "선택 사항, 데이터 레이블의 값 앞에 기호를 접미사로 표시합니다."
                            },
                            gradient: {
                                en: "works best on a white background for now",
                                fr: "fonctionne mieux sur un fond blanc pour le moment",
                                pt: "funciona melhor em um fundo branco por enquanto",
                                de: "funktioniert derzeit am besten auf einem weißen Hintergrund",
                                zh: "目前在白色背景上效果最好",
                                jp: "今のところ白い背景で最適に動作します",
                                es: "funciona mejor sobre un fondo blanco por ahora",
                                ko: "지금은 흰색 배경에서 가장 잘 작동합니다."
                            }
                        },
                        verticalBar: {
                            breakdown: {
                                en: "Use this attribute to breakdown a serie",
                                fr: "Utilisez cet attribut pour décomposer une série",
                                pt: "Use este atributo para detalhar uma série",
                                de: "Verwenden Sie dieses Attribut, um eine Serie aufzuschlüsseln",
                                zh: "使用此属性来细分系列",
                                jp: "この属性を使用してシリーズを分類します",
                                es: "Utilice este atributo para desglosar una serie.",
                                ko: "시리즈를 분류하려면 이 속성을 사용하세요."
                            }
                        },
                        candlestick: {
                            order: {
                                en: "This order must be strictly respected :",
                                fr: "Cet ordre doit être absolument respecté :",
                                pt: "Esta ordem deve ser rigorosamente respeitada :",
                                de: "Diese Reihenfolge muss unbedingt eingehalten werden:",
                                zh: "必须严格遵守此命令 :",
                                jp: "この順序は厳密に遵守する必要があります。",
                                es: "Este orden debe respetarse estrictamente:",
                                ko: "이 순서는 엄격히 준수되어야 합니다."
                            }
                        },
                        agePyramid: {
                            start: {
                                en: "start from the oldest year",
                                fr: "commencer à l'année la plus ancienne",
                                pt: "começar do ano mais antigo",
                                de: "Beginnen Sie mit dem ältesten Jahr",
                                zh: "从最早的年份开始",
                                jp: "最古の年からスタート",
                                es: "empezar desde el año más antiguo",
                                ko: "가장 오래된 연도부터 시작"
                            },
                            arrayOfEach: {
                                en: "Array of arrays each containing in order:",
                                fr: "Tableau de tableaux contenant chacun dans l'ordre :",
                                pt: "Matriz de matrizes, cada uma contendo em ordem:",
                                de: "Array von Arrays, die jeweils in der Reihenfolge Folgendes enthalten:",
                                zh: "每个数组按顺序包含：",
                                jp: "それぞれが順番に含む配列の配列:",
                                es: "Matriz de matrices, cada una de las cuales contiene en orden:",
                                ko: "각각 순서대로 포함된 배열의 배열:"
                            },
                            cols: {
                                en: "year | age | number women | number men",
                                fr: "année | âge | nombre de femmes | nombre d'hommes",
                                pt: "ano | idade | número de mulheres | número de homens",
                                de: "Jahr | Alter | Anzahl Frauen | Anzahl Männer",
                                zh: "年 |年龄 |女性人数 |人数",
                                jp: "年 |年齢 |数字の女性 |数字の男性",
                                es: "año | edad | número de mujeres | numero hombres",
                                ko: "년 | 나이 | 숫자 여성 | 번호 남자"
                            }
                        },
                        table: {
                            header: {
                                en: "Configure each column with a separate object",
                                fr: "Configurer chaque colonne avec un objet distinct",
                                pt: "Configure cada coluna com um objeto separado",
                                de: "Konfigurieren Sie jede Spalte mit einem separaten Objekt",
                                zh: "使用单独的对象配置每一列",
                                jp: "各列を個別のオブジェクトで構成する",
                                es: "Configurar cada columna con un objeto separado",
                                ko: "별도의 개체로 각 열을 구성합니다."
                            },
                            reference: {
                                en: "reference to the name of another numeric column",
                                fr: "référence au nom d'une autre colonne numérique",
                                pt: "referência ao nome de outra coluna numérica",
                                de: "Verweis auf den Namen einer anderen numerischen Spalte",
                                zh: "引用另一个数字列的名称",
                                jp: "別の数値列の名前への参照",
                                es: "referencia al nombre de otra columna numérica",
                                ko: "다른 숫자 열의 이름에 대한 참조"
                            },
                            body: {
                                en: "each row is represented in an object, leaving room for further config in the future",
                                fr: "chaque ligne est représentée dans un objet, laissant la place à d'autres configurations à l'avenir",
                                pt: "cada linha é representada em um objeto, deixando espaço para configurações adicionais no futuro",
                                de: "Jede Zeile wird in einem Objekt dargestellt, sodass Raum für weitere Konfigurationen in der Zukunft bleibt",
                                zh: "每行都用一个对象表示，为将来的进一步配置留出空间",
                                jp: "各行はオブジェクトで表され、将来さらに構成できる余地が残されています。",
                                es: "cada fila está representada en un objeto, lo que deja espacio para más configuraciones en el futuro",
                                ko: "각 행은 객체로 표시되므로 향후 추가 구성을 위한 공간이 남습니다."
                            },
                            td: {
                                en: "Each element of the array is placed in the same order as the columns",
                                fr: "Chaque élément du tableau est placé dans le même ordre que les colonnes",
                                pt: "Cada elemento da matriz é colocado na mesma ordem que as colunas",
                                de: "Jedes Element des Arrays wird in derselben Reihenfolge wie die Spalten platziert",
                                zh: "数组的每个元素的放置顺序与列的顺序相同",
                                jp: "配列の各要素は列と同じ順序で配置されます。",
                                es: "Cada elemento de la matriz se coloca en el mismo orden que las columnas.",
                                ko: "배열의 각 요소는 열과 동일한 순서로 배치됩니다."
                            },
                            warning1: {
                                en: "requires an empty array in the body 'td' arrays!",
                                fr: "nécessite un tableau vide dans les tableaux body 'td' !",
                                pt: "requer um array vazio nos arrays 'td' do corpo!",
                                de: "",
                                zh: "需要主体“td”数组中有一个空数组！",
                                jp: "本体の 'td' 配列に空の配列が必要です。",
                                es: "¡Requiere una matriz vacía en las matrices 'td' del body!",
                                ko: "본문 'td' 배열에 빈 배열이 필요합니다!"
                            },
                            warning2: {
                                en: "notice the empty string, due to a config of the column with isPercentage = true and percentageTo set to another column",
                                fr: "remarquez la chaîne vide, en raison d'une configuration de la colonne avec isPercentage = true et percentTo défini sur une autre colonne",
                                pt: "observe a string vazia, devido a uma configuração da coluna com isPercentage = true e percentageTo definida para outra coluna",
                                de: "erfordert ein leeres Array in den Körper-'td'-Arrays!",
                                zh: "请注意空字符串，因为该列的配置 isPercentage = true 且 PercentageTo 设置为另一列",
                                jp: "isPercentage = true およびpercentageToが別の列に設定されている列の構成により、空の文字列に注目してください。",
                                es: "observe la cadena vacía, debido a una configuración de la columna con isPercentage = true y percentTo establecido en otra columna",
                                ko: "isPercentage = true이고 PercentageTo가 다른 열로 설정된 열의 구성으로 인해 빈 문자열을 확인하세요."
                            },
                            fewRows: {
                                en: "A few rows as an example",
                                fr: "Quelques lignes à titre d'exemple",
                                pt: "Algumas linhas como exemplo",
                                de: "Ein paar Zeilen als Beispiel",
                                zh: "以几行为例",
                                jp: "例としていくつかの行",
                                es: "Algunas filas como ejemplo.",
                                ko: "예를 들어 몇 행"
                            }
                        },
                        rating: {
                            readonly: {
                                en: 'readonly',
                                fr: "lecture seule",
                                pt: "somenta leitura",
                                de: "schreibgeschützt",
                                zh: "只读",
                                jp: "読み取り専用",
                                es: "solo lectura",
                                ko: "읽기 전용"
                            },
                            active: {
                                en: "active",
                                fr: "actif",
                                pt: "ativo",
                                de: "aktiv",
                                zh: "行动",
                                jp: "アクティブ",
                                es: "activo",
                                ko: "활동적인"
                            },
                            p1: {
                                en: "A component to rate, or display rating results. Shows stars by default, and you can use an image if you prefer. You can display as many stars as you want.",
                                fr: "Un composant pour évaluer ou afficher les résultats de l'évaluation. Affiche les étoiles par défaut et vous pouvez utiliser une image si vous préférez. Vous pouvez afficher autant d'étoiles que vous le souhaitez.",
                                pt: "Um componente para avaliar ou exibir resultados de classificação. Mostra estrelas por padrão e você pode usar uma imagem se preferir. Você pode exibir quantas estrelas quiser.",
                                de: "Eine Komponente zur Auswertung bzw. Anzeige von Auswertungsergebnissen. Zeigt standardmäßig Sterne an. Wenn Sie möchten, können Sie auch ein Bild verwenden. Sie können so viele Sterne anzeigen, wie Sie möchten.",
                                zh: "用于评分或显示评分结果的组件。默认情况下显示星星，如果您愿意，可以使用图像。您可以根据需要显示任意数量的星星。",
                                jp: "スコアリングまたはスコアリング結果の表示に使用されるコンポーネント。デフォルトでは星が表示されますが、必要に応じて画像を使用できます。必要な数の星を表示できます。",
                                es: "Un componente para calificar o mostrar resultados de calificación. Muestra estrellas de forma predeterminada y puedes usar una imagen si lo prefieres. Puedes mostrar tantas estrellas como quieras.",
                                ko: "평가하거나 평가 결과를 표시하는 구성 요소입니다. 기본적으로 별표가 표시되며 원하는 경우 이미지를 사용할 수 있습니다. 원하는 만큼 별을 표시할 수 있습니다."
                            },
                            p2: {
                                en: "In the active mode, the rating can be modified by the user. In readonly mode, it just displays the rating.",
                                fr: "En mode actif, la note peut être modifiée par l'utilisateur. En mode lecture seule, il affiche simplement la note.",
                                pt: "No modo ativo, a classificação pode ser modificada pelo usuário. No modo somente leitura, apenas exibe a classificação.",
                                de: "Im aktiven Modus kann die Bewertung vom Benutzer geändert werden. Im schreibgeschützten Modus wird nur die Bewertung angezeigt.",
                                zh: "在主动模式下，用户可以修改评级。在只读模式下，它仅显示评级。",
                                jp: "アクティブ モードでは、ユーザーは評価を変更できます。読み取り専用モードでは、評価のみが表示されます。",
                                es: "En el modo activo, la calificación puede ser modificada por el usuario. En modo de solo lectura, solo muestra la calificación.",
                                ko: "활성 모드에서는 사용자가 등급을 수정할 수 있습니다. 읽기 전용 모드에서는 등급만 표시됩니다."
                            },
                            simpleRating: {
                                en: "If you have a simple rating to display",
                                fr: "Si vous avez une note simple à afficher",
                                pt: "Se você tiver uma classificação simples para exibir",
                                de: "Wenn Sie eine einfache Bewertung anzeigen möchten",
                                zh: "如果您有一个简单的评级要显示",
                                jp: "表示する簡単な評価がある場合",
                                es: "Si tiene una calificación simple para mostrar",
                                ko: "간단하게 표시할 평점이 있는 경우"
                            },
                            breakdown: {
                                en: "if you have a breakdown per value",
                                fr: "si vous avez une répartition par valeur",
                                pt: "se você tiver um detalhamento por valor",
                                de: "wenn Sie eine Aufschlüsselung nach Wert haben",
                                zh: "如果您有每个值的细目分类",
                                jp: "それぞれの値の内訳があれば",
                                es: "si tiene un desglose por valor",
                                ko: "값별로 분류가 있는 경우"
                            },
                            calculation: {
                                en: "Rating will be calculated based on the breakdown provided.",
                                fr: "La note sera calculée à partir de la répartition fournie",
                                pt: "A classificação será calculada a partir da discriminação fornecida.",
                                de: "Die Bewertung wird anhand der bereitgestellten Aufschlüsselung berechnet.",
                                zh: "评级将根据提供的细目进行计算。",
                                jp: "評価は提供された内訳に基づいて計算されます。",
                                es: "La calificación se calculará en función del desglose proporcionado.",
                                ko: "등급은 제공된 분석을 기준으로 계산됩니다."
                            },
                            tooltip: {
                                en: "The tooltip can be enabled, to display the values at the hovered item (use in readonly mode).",
                                fr: "L'info-bulle peut être activée pour afficher les valeurs de l'élément survolé (à utiliser en mode lecture seule).",
                                pt: "A dica de ferramenta pode ser habilitada para exibir os valores no item pairado (use no modo somente leitura).",
                                de: "Der Tooltip kann aktiviert werden, um die Werte am schwebenden Element anzuzeigen (Verwendung im schreibgeschützten Modus).",
                                zh: "可以启用工具提示，以显示悬停项目处的值（在只读模式下使用）。",
                                jp: "ツールチップを有効にすると、ホバーされた項目の値が表示されます (読み取り専用モードで使用)。",
                                es: "La información sobre herramientas se puede habilitar para mostrar los valores en el elemento sobre el que se encuentra (usar en modo de solo lectura).",
                                ko: "마우스로 가리킨 항목의 값을 표시하기 위해 도구 설명을 활성화할 수 있습니다(읽기 전용 모드에서 사용)."
                            },
                            useImage: {
                                en: 'or use "image" and provide url in image.src',
                                fr: `ou utilisez "image" et fournissez l'URL dans image.src`,
                                pt: `ou use "image" e forneça o URL em image.src`,
                                de: "oder verwenden Sie „image“ und geben Sie die URL in image.src an",
                                zh: `或使用“image”并在 image.src 中提供 url`,
                                jp: `または、「image」を使用し、image.src に URL を指定します。`,
                                es: `o utilice "image" y proporcione la URL en image.src`,
                                ko: `또는 "image"를 사용하고 image.src에 URL을 제공하세요.`
                            },
                            src: {
                                en: "works like the regular src attribute",
                                fr: "fonctionne comme l'attribut src normal",
                                pt: "funciona como o atributo src normal",
                                de: "Funktioniert wie das reguläre src-Attribut",
                                zh: "与常规 src 属性类似",
                                jp: "通常の src 属性と同じように機能します",
                                es: "funciona como el atributo src normal",
                                ko: "일반 src 속성처럼 작동합니다."
                            },
                            alt: {
                                en: "In image mode, the value of each star will be appended to the provided alt text",
                                fr: "En mode image, la valeur de chaque étoile sera ajoutée au texte alt fourni",
                                pt: "No modo de imagem, o valor de cada estrela será anexado ao texto alt fornecido",
                                de: "Im Bildmodus wird der Wert jedes Sterns an den bereitgestellten Alternativtext angehängt",
                                zh: "在图像模式下，每个星星的值将附加到提供的替代文本中",
                                jp: "画像モードでは、各星の値が指定された代替テキストに追加されます。",
                                es: "En el modo de imagen, el valor de cada estrella se agregará al texto alternativo proporcionado.",
                                ko: "이미지 모드에서는 각 별표의 값이 제공된 대체 텍스트에 추가됩니다."
                            }
                        },
                        skeleton: {
                            p1: {
                                en: "Placeholders to display while your data is getting fetched",
                                fr: "Placeholders à afficher pendant la récupération de vos données",
                                pt: "Placeholders para exibição durante a recuperação de seus dados",
                                de: "Platzhalter, die beim Abrufen Ihrer Daten angezeigt werden",
                                zh: "获取数据时显示的占位符",
                                jp: "データを取得するときに表示されるプレースホルダー",
                                es: "Marcadores de posición para mostrar mientras se recuperan sus datos",
                                ko: "데이터를 가져오는 동안 표시할 자리 표시자"
                            },
                            smiley: {
                                en: "Use smiley icons instead of stars",
                                fr: "Utilisez des icônes souriantes au lieu d'étoiles",
                                pt: "Use ícones sorridentes em vez de estrelas",
                                de: "Verwenden Sie Smiley-Symbole anstelle von Sternen",
                                zh: "使用笑脸图标代替星星",
                                jp: "星の代わりにスマイリーアイコンを使用する",
                                es: "Utilice íconos sonrientes en lugar de estrellas",
                                ko: "별 대신 스마일 아이콘을 사용하세요"
                            }
                        },
                        screenshot: {
                            tryIt: {
                                en: "Try it",
                                fr: "Essayer",
                                pt: "Tente",
                                de: "Versuch es",
                                zh: "尝试一下",
                                jp: "それを試してみてください",
                                es: "Intentalo",
                                ko: "시도 해봐"
                            },
                            yourScreeshot: {
                                en: "Your screenshot will appear here",
                                fr: "Votre capture d'écran apparaîtra ici",
                                pt: "Sua captura de tela aparecerá aqui",
                                de: "Ihr Screenshot wird hier angezeigt",
                                zh: "您的屏幕截图将出现在此处",
                                jp: "スクリーンショットがここに表示されます",
                                es: "Tu captura de pantalla aparecerá aquí.",
                                ko: "스크린샷이 여기에 표시됩니다."
                            },
                            p1: {
                                en: "A component to take screenshots in the current page, with 2 modes: download or post.",
                                fr: "Un composant pour prendre des captures d'écran dans la page en cours, avec 2 modes : télécharger ou poster",
                                pt: "Um composto para capturar capturas de tela na página atual, com 2 modos: baixar ou post",
                                de: "Eine Komponente zum Erstellen von Screenshots auf der aktuellen Seite mit zwei Modi: Herunterladen oder Posten.",
                                zh: "当前页面截图的组件有两种模式：下载或发布。",
                                jp: "現在のページのスクリーンショットを取得するコンポーネントには、ダウンロードと投稿の 2 つのモードがあります。",
                                es: "Un componente para tomar capturas de pantalla en la página actual, con 2 modos: descargar o publicar.",
                                ko: "다운로드 또는 게시의 2가지 모드로 현재 페이지에서 스크린샷을 찍는 구성요소입니다."
                            },
                            refresh: {
                                en: "Refresh to view your changes",
                                fr: "Rafraîchir pour visualiser les changements",
                                pt: "Atualize para ver suas alterações",
                                de: "Aktualisieren Sie, um Ihre Änderungen anzuzeigen",
                                zh: "刷新以查看您的更改",
                                jp: "更新して変更内容を確認する",
                                es: "Actualiza para ver tus cambios",
                                ko: "변경사항을 보려면 새로고침하세요."
                            },
                            metadata: {
                                en: "In post mode, the following metadata will also be provided:",
                                fr: "En mode post, les métadonnées suivantes seront également fournies :",
                                pt: "No modo post, os seguintes metadados também serão fornecidos:",
                                de: "Der Post-Modus stellt außerdem die folgenden Metadaten bereit:",
                                zh: "在发布模式下，还将提供以下元数据：",
                                jp: "ポストモードでは、次のメタデータも提供されます。",
                                es: "En el modo de publicación, también se proporcionarán los siguientes metadatos:",
                                ko: "게시 모드에서는 다음 메타데이터도 제공됩니다."
                            },
                            quality: {
                                en: "don't set it up too high if you care about image size",
                                fr: "ne le réglez pas trop haut si vous vous souciez de la taille de l'image",
                                pt: "não configure muito alto se você se preocupa com o tamanho da imagem",
                                de: "Stellen Sie den Wert nicht zu hoch ein, wenn Ihnen die Bildgröße wichtig ist",
                                zh: "如果您关心图像尺寸，请不要将其设置得太高",
                                jp: "画像サイズを気にする場合は、あまり高く設定しないでください",
                                es: "no lo configures demasiado alto si le importa el tamaño de la imagen",
                                ko: "이미지 크기가 중요하다면 너무 높게 설정하지 마세요."
                            },
                            x: {
                                en: "the image's top left x coordinate on the page",
                                fr: "la coordonnée x en haut à gauche de l'image sur la page",
                                pt: "a coordenada x superior esquerda da imagem na página",
                                de: "die X-Koordinate oben links im Bild auf der Seite",
                                zh: "图像在页面上的左上角 x 坐标",
                                jp: "ページ上の画像の左上の X 座標",
                                es: "la coordenada x superior izquierda de la imagen en la página",
                                ko: "페이지의 이미지 왼쪽 상단 x 좌표"
                            },
                            y: {
                                en: "the image's top left y coordinate on the page",
                                fr: "la coordonnée y en haut à gauche de l'image sur la page",
                                pt: "a coordenada y superior esquerda da imagem na página",
                                de: "die obere linke Y-Koordinate des Bildes auf der Seite",
                                zh: "图像在页面上的左上角 y 坐标",
                                jp: "ページ上の画像の左上の Y 座標",
                                es: "Coordenada y superior izquierda de la imagen en la página.",
                                ko: "페이지의 이미지 왼쪽 상단 y 좌표"
                            },
                            timestamp: {
                                en: "timestamp",
                                fr: "horodatage",
                                pt: "carimbo de data/hora",
                                de: "Zeitstempel",
                                zh: "时间戳",
                                jp: "タイムスタンプ",
                                es: "marca de tiempo",
                                ko: "타임스탬프"
                            }
                        },
                        dashboard: {
                            p1: {
                                en: "Display your charts in a drag and resize component. Changes can be saved via the @change emit.",
                                fr: "Affichez vos graphiques dans un composant glisser-redimensionner. Les modifications peuvent être enregistrées via l'emit @change.",
                                pt: "Exiba seus gráficos em um componente de arrastar e redimensionar. As alterações podem ser salvas através do @change emit.",
                                de: "Zeigen Sie Ihre Diagramme in einer Drag-and-Resize-Komponente an. Änderungen können mit Emit @change gespeichert werden.",
                                zh: "在拖动和调整大小组件中显示图表。可以通过 @change 发出保存更改。",
                                jp: "ドラッグしてコンポーネントのサイズを変更してグラフを表示します。変更は @change 発行を通じて保存できます。",
                                es: "Muestre sus gráficos en un componente de arrastrar y cambiar el tamaño. Los cambios se pueden guardar mediante @change emit.",
                                ko: "드래그 및 크기 조정 구성 요소에 차트를 표시합니다. 변경 사항은 @change 내보내기를 통해 저장할 수 있습니다."
                            },
                            warning: {
                                en: "On embedded VueUiXy and VueUiCandlestick components, it is recommended to disable the zoom functionality in the config, as it conflicts with the dashboard drag events for now.",
                                fr: "Sur les composants VueUiXy et VueUiCandlestick intégrés, il est recommandé de désactiver la fonctionnalité de zoom dans la configuration, car elle entre en conflit avec les événements de drag du tableau de bord pour le moment.",
                                pt: "Nos componentes incorporados VueUiXy e VueUiCandlestick, é recomendado desabilitar a funcionalidade de zoom na configuração, pois por enquanto ela entra em conflito com os eventos de arrastar do painel.",
                                de: "Für eingebettete VueUiXy- und VueUiCandlestick-Komponenten wird empfohlen, die Zoomfunktion in der Konfiguration zu deaktivieren, da sie vorerst mit den Drag-Ereignissen des Dashboards in Konflikt steht.",
                                zh: "在嵌入式 VueUiXy 和 VueUiCandlestick 组件上，建议在配置中禁用缩放功能，因为它目前与仪表板拖动事件冲突。",
                                jp: "埋め込まれた VueUiXy および VueUiCandlestick コンポーネントでは、現時点ではダッシュボードのドラッグ イベントと競合するため、設定でズーム機能を無効にすることをお勧めします。",
                                es: "En los componentes integrados VueUiXy y VueUiCandlestick, se recomienda desactivar la funcionalidad de zoom en la configuración, ya que por ahora entra en conflicto con los eventos de arrastre del panel.",
                                ko: "내장된 VueUiXy 및 VueUiCandlestick 구성 요소에서는 현재 대시보드 드래그 이벤트와 충돌하므로 구성에서 확대/축소 기능을 비활성화하는 것이 좋습니다."
                            }
                        },
                        annotator: {
                            emits: {
                                toggleOpenState: {
                                    en: "when opening or closing the accordeon, emits the following object to the parent component:",
                                    fr: "lors de l'ouverture ou de la fermeture de l'accordéon, émet l'objet suivant vers le composant parent :",
                                    pt: "ao abrir ou fechar o acordeão, emite o seguinte objeto para o componente pai:",
                                    de: "Gibt das folgende Objekt an die übergeordnete Komponente aus, wenn das Akkordeon geöffnet oder geschlossen wird:",
                                    zh: "打开或关闭折叠面板时，向父组件发出以下对象：",
                                    jp: "アコーディオンを開閉するときに、次のオブジェクトを親コンポーネントに送信します。",
                                    es: "al abrir o cerrar el acordeón, emite el siguiente objeto al componente padre:",
                                    ko: "아코디언을 열거나 닫을 때 상위 구성 요소에 다음 개체를 내보냅니다."
                                },
                                saveAnnotations: {
                                    en: "emits to the parent component the collection of items currently drawn on the annotator, so they can be saved, and injected back into the component 'dataset' prop later. The emit returns the following attributes:",
                                    fr: "émet au composant parent la collection d'éléments actuellement dessinés sur l'annotateur, afin qu'ils puissent être enregistrés et réinjectés ultérieurement dans la prop 'dataset' du composant. L'emit renvoit les attributs suivants :",
                                    pt: "emite para o componente pai a coleção de itens atualmente desenhados no anotador, para que possam ser salvos e injetados de volta no componente 'dataset' posteriormente. A emit retorna os seguintes atributos:",
                                    de: "Gibt die Sammlung der aktuell auf dem Annotator gezeichneten Elemente an die übergeordnete Komponente aus, sodass sie gespeichert und später wieder in die Dataset-Komponentenstütze eingefügt werden können. Emit gibt die folgenden Attribute zurück:",
                                    zh: "向父组件发送当前在注释器上绘制的项目集合，以便可以保存它们，并稍后将其注入回组件“dataset”道具中。发出返回以下属性：",
                                    jp: "アノテーターに現在描画されている項目のコレクションを親コンポーネントに出力します。これにより、それらを保存して、後でコンポーネントの「データセット」プロパティに注入し直すことができます。エミットは次の属性を返します。",
                                    es: "emite al componente principal la colección de elementos actualmente dibujados en el anotador, para que puedan guardarse y volver a inyectarse en el componente 'conjunto de datos' más adelante. El emit devuelve los siguientes atributos:",
                                    ko: "현재 주석자에 그려진 항목 컬렉션을 상위 구성 요소에 내보내서 저장하고 나중에 구성 요소 '데이터 세트' 소품에 다시 주입할 수 있습니다. 내보내기는 다음 속성을 반환합니다."
                                },
                                calledWhen: {
                                    en: "This emit is called when the user clicks the save button, provided the button is displayed by setting the config.style.showSave to 'true'",
                                    fr: "Cet émetteur est appelé lorsque l'utilisateur clique sur le bouton Enregistrer, à condition que le bouton soit affiché en définissant config.style.showSave sur 'true'.",
                                    pt: "Este emit é chamado quando o usuário clica no botão salvar, desde que o botão seja exibido definindo config.style.showSave como 'true'",
                                    de: "Dieses Emit wird aufgerufen, wenn der Benutzer auf die Schaltfläche „Speichern“ klickt, sofern die Schaltfläche angezeigt wird, indem config.style.showSave auf „true“ gesetzt wird.",
                                    zh: "当用户单击保存按钮时调用此发出，前提是通过将 config.style.showSave 设置为“true”来显示该按钮",
                                    jp: "このエミットは、config.style.showSave を「true」に設定してボタンが表示されている場合に、ユーザーが保存ボタンをクリックしたときに呼び出されます。",
                                    es: "Esta emisión se llama cuando el usuario hace clic en el botón Guardar, siempre que el botón se muestre configurando config.style.showSave en 'true'.",
                                    ko: "이 내보내기는 config.style.showSave를 'true'로 설정하여 버튼이 표시되는 경우 사용자가 저장 버튼을 클릭할 때 호출됩니다."
                                }
                            },
                            description: {
                                en: "Add and save annotations on any slotted content. It works with all 'Vue Data UI' charts, but also with any div, svg, canvas element you place inside.",
                                fr: "Ajoutez et enregistrez des annotations sur n'importe quel contenu inséré. Il fonctionne avec tous les graphiques de Vue Data UI, mais également avec n'importe quel élément div, svg, canvas que vous placez à l'intérieur.",
                                pt: "Adicione e salve anotações em qualquer conteúdo com slot. Ele funciona com todos os gráficos de Vue Data UI, mas também com qualquer elemento div, svg ou canvas que você colocar dentro dele.",
                                de: "Fügen Sie allen gesloteten Inhalten Anmerkungen hinzu und speichern Sie diese. Es funktioniert mit allen Vue Data-UI-Diagrammen, aber auch mit jedem Div-, SVG- und Canvas-Element, das Sie darin platzieren.",
                                zh: "在任何开槽内容上添加并保存注释。它适用于所有“Vue Data UI”图表，也适用于您放置在其中的任何 div、svg、canvas 元素。",
                                jp: "スロット付きコンテンツに注釈を追加して保存します。すべての「Vue Data UI」チャートだけでなく、内部に配置したあらゆる div、svg、canvas 要素でも機能します。",
                                es: "Agregue y guarde anotaciones sobre cualquier contenido ranurado. Funciona con todos los gráficos 'Vue Data UI', pero también con cualquier elemento div, svg o lienzo que coloque dentro.",
                                ko: "슬롯 콘텐츠에 주석을 추가하고 저장합니다. 모든 'Vue 데이터 UI' 차트에서 작동하지만 내부에 배치한 모든 div, svg, 캔버스 요소에서도 작동합니다."
                            },
                            warning: {
                                en: "Touch events are supported since v.1.7.3, but may be glitchy",
                                fr: "Les événements tactiles sont pris en charge depuis la version 1.7.3, mais peuvent présenter des problèmes",
                                pt: "Eventos de toque são suportados desde a v.1.7.3, mas podem apresentar falhas",
                                de: "Touch-Ereignisse werden seit Version 1.7.3 unterstützt, können jedoch fehlerhaft sein",
                                zh: "从 v.1.7.3 开始支持触摸事件，但可能会出现问题",
                                jp: "タッチ イベントは v.1.7.3 以降サポートされていますが、不具合が発生する可能性があります。",
                                es: "Los eventos táctiles son compatibles desde la versión 1.7.3, pero pueden presentar fallos",
                                ko: "터치 이벤트는 v.1.7.3부터 지원되지만 결함이 있을 수 있습니다."
                            },
                            closedState: {
                                en: "VueUiAnnotator is in closed state. In the closed state, annotations are invisible, and user interactions with the content is unchanged.",
                                fr: "VueUiAnnotator est dans un état fermé. À l'état fermé, les annotations sont invisibles et les interactions de l'utilisateur avec le contenu restent inchangées.",
                                pt: "VueUiAnnotator está em estado fechado. No estado fechado, as anotações ficam invisíveis e as interações do usuário com o conteúdo permanecem inalteradas.",
                                de: "VueUiAnnotator befindet sich im geschlossenen Zustand. Im geschlossenen Zustand sind Anmerkungen unsichtbar und Benutzerinteraktionen mit dem Inhalt bleiben unverändert.",
                                zh: "VueUiAnnotator 处于关闭状态。在关闭状态下，注释不可见，并且用户与内容的交互保持不变。",
                                jp: "VueUiAnnotator は閉じた状態です。閉じた状態では、注釈は表示されず、コンテンツに対するユーザーの操作は変わりません。",
                                es: "VueUiAnnotator está en estado cerrado. En el estado cerrado, las anotaciones son invisibles y las interacciones del usuario con el contenido no cambian.",
                                ko: "VueUiAnnotator가 닫힌 상태입니다. 닫힌 상태에서는 주석이 보이지 않으며 콘텐츠와의 사용자 상호 작용은 변경되지 않습니다."
                            },
                            openState: {
                                en: "VueUiAnnotator is in open state. In the open state, all interactions with the slotted content are muted, to allow the user to add, move and resize shapes.",
                                fr: "VueUiAnnotator est à l'état ouvert. À l'état ouvert, toutes les interactions avec le contenu inséré sont désactivées, pour permettre à l'utilisateur d'ajouter, de déplacer et de redimensionner des formes.",
                                pt: "VueUiAnnotator está em estado aberto. No estado aberto, todas as interações com o conteúdo com slot são silenciadas, para permitir ao usuário adicionar, mover e redimensionar formas.",
                                de: "VueUiAnnotator befindet sich im geöffneten Zustand. Im geöffneten Zustand sind alle Interaktionen mit dem Slot-Inhalt stummgeschaltet, damit der Benutzer Formen hinzufügen, verschieben und in der Größe ändern kann.",
                                zh: "VueUiAnnotator 处于打开状态。在打开状态下，与开槽内容的所有交互都被静音，以允许用户添加、移动形状和调整形状大小。",
                                jp: "VueUiAnnotator はオープン状態です。開いた状態では、スロット付きコンテンツとのすべてのインタラクションがミュートされ、ユーザーが図形を追加、移動、サイズ変更できるようになります。",
                                es: "VueUiAnnotator está en estado abierto. En el estado abierto, todas las interacciones con el contenido ranurado están silenciadas para permitir al usuario agregar, mover y cambiar el tamaño de las formas.",
                                ko: "VueUiAnnotator가 열린 상태입니다. 열린 상태에서는 슬롯이 있는 콘텐츠와의 모든 상호 작용이 음소거되어 사용자가 모양을 추가, 이동 및 크기 조정할 수 있습니다."
                            },
                            datastructure: {
                                en: "Saved annotations can be passed to the dataset attribute to be displayed onload. Check the 'EMITS' section to learn how to save annotations.",
                                fr: "Les annotations enregistrées peuvent être transmises à l'attribut de l'ensemble de données pour être affichées lors du chargement. Consultez la section 'emit' pour savoir comment enregistrer des annotations.",
                                pt: "As anotações salvas podem ser passadas para o atributo do conjunto de dados para serem exibidas no carregamento. Verifique a seção 'emit' para saber como salvar anotações.",
                                de: "Gespeicherte Anmerkungen können an das Datensatzattribut übergeben werden, um beim Laden angezeigt zu werden. Im Abschnitt EMITS erfahren Sie, wie Sie Anmerkungen speichern.",
                                zh: "保存的注释可以传递到数据集属性以在加载时显示。查看“EMIT”部分以了解如何保存注释。",
                                jp: "保存されたアノテーションをデータセットのプロパティに渡して、読み込み時に表示することができます。コメントを保存する方法については、「EMIT」セクションを確認してください。",
                                es: "Las anotaciones guardadas se pueden pasar a las propiedades del conjunto de datos para que se muestren al cargar. Consulte la sección 'emit' para saber cómo guardar comentarios.",
                                ko: "저장된 주석은 데이터 세트 속성에 전달되어 로드 시 표시될 수 있습니다. 주석을 저장하는 방법을 알아보려면 'EMITS' 섹션을 확인하세요."
                            },
                            notByYourself: {
                                en: "Important: you should never have to hardcode this dataset, as you can retrieve it from the component's '@saveAnnotations' emit, to save on your database or localStorage.",
                                fr: "Important : vous ne devriez jamais avoir à coder en dur cet ensemble de données, car vous pouvez le récupérer à partir de l'émission '@saveAnnotations' du composant, pour l'enregistrer sur votre base de données ou localStorage.",
                                pt: "Importante: você nunca deve ter que codificar este conjunto de dados, pois você pode recuperá-lo da emissão '@saveAnnotations' do componente, para salvá-lo em seu banco de dados ou localStorage.",
                                de: "Wichtig: Sie sollten diesen Datensatz nie fest codieren müssen, da Sie ihn aus der @saveAnnotations-Ausgabe der Komponente abrufen können, um ihn in Ihrer Datenbank oder im lokalen Speicher zu speichern.",
                                zh: "重要提示：您永远不必对此数据集进行硬编码，因为您可以从组件的“@saveAnnotations”发出中检索它，以保存在数据库或本地存储中。",
                                jp: "重要: このデータセットはコンポーネントの「@saveAnnotations」出力から取得してデータベースまたは localStorage に保存できるため、ハードコードする必要はありません。",
                                es: "Importante: nunca debería tener que codificar este conjunto de datos, ya que puede recuperarlo de la emisión '@saveAnnotations' del componente para guardarlo en su base de datos o en el localStorage.",
                                ko: "중요: 이 데이터 세트는 구성 요소의 '@saveAnnotations' 내보내기에서 검색하여 데이터베이스나 localStorage에 저장할 수 있으므로 하드코딩할 필요가 없습니다."
                            }
                        }
                    }
                }
            }
        }
    },
    actions: {
        copy(){
            this.isCopy = true;
            setTimeout(() => {
                this.isCopy = false;
            }, 500);
        }
    }
})