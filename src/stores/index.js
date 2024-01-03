import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            isMenuOpen: false,
            isDarkMode: true,
            isCopy: false,
            hints: {
                pin: {
                    en: "Pin the chart to the left so you can visualize configuration changes when you scroll.",
                    fr: "Épinglez le graphique à gauche afin de pouvoir visualiser les modifications de configuration lorsque vous faites défiler.",
                    pt: "Fixe o gráfico à esquerda para poder visualizar as alterações de configuração ao rolar.",
                    de: "Fixieren Sie das Diagramm auf der linken Seite, damit Sie Konfigurationsänderungen beim Scrollen visualisieren können.",
                    zh: "将图表固定在左侧，以便您在滚动时可以直观地看到配置更改。",
                    jp: "グラフを左側に固定すると、スクロール時に構成の変更を視覚化できます。",
                    es: "Fije el gráfico a la izquierda para que pueda visualizar los cambios de configuración cuando se desplaza."
                }
            },
            lang: "en",
            translations: {
                slots: {
                    summary: {
                        en: "Components marked with this icon provide a #svg slot to extend the svg with custom elements.",
                        fr: "Les composants marqués de cette icône fournissent un slot #svg pour étendre le svg avec des éléments personnalisés.",
                        pt: "Os componentes marcados com este ícone fornecem um slot #svg para estender o svg com elementos personalizados.",
                        de: "Mit diesem Symbol gekennzeichnete Komponenten bieten einen #svg-Slot, um die SVG-Datei mit benutzerdefinierten Elementen zu erweitern.",
                        zh: "标有此图标的组件提供 #svg 槽，以使用自定义元素扩展 svg。",
                        jp: "このアイコンの付いたコンポーネントは、カスタム要素で svg を拡張するための #svg スロットを提供します。",
                        es: "Los componentes marcados con este icono proporcionan una ranura (slot) #svg para ampliar el archivo svg con elementos personalizados."
                    },
                    summaryLink: {
                        en: "View an example",
                        fr: "Voir un exemple",
                        pt: "Veja um exemplo",
                        de: "Sehen Sie sich ein Beispiel an",
                        zh: "查看示例",
                        jp: "例を見る",
                        es: "Ver un ejemplo"
                    },
                    presentation: {
                        en: "This component contains a #svg slot you can use to introduce your own customized svg elements into the chart, and through which the dimensions of the svg viewBox are exposed. Any svg element added in this slot will be displayed on the last layer of the svg, enabling any mouse or touch events you might want to use, however possibly hindering the component's own mouse events.",
                        fr: "Ce composant contient un emplacement #svg que vous pouvez utiliser pour introduire vos propres éléments svg personnalisés dans le graphique et à travers lequel les dimensions de la viewBox svg sont exposées. Tout élément svg ajouté dans cet emplacement sera affiché sur la dernière couche du svg, permettant tous les événements de souris ou tactiles que vous pourriez vouloir utiliser, mais pouvant éventuellement gêner les propres événements de souris du composant.",
                        pt: "Este componente contém um slot #svg que você pode usar para introduzir seus próprios elementos SVG personalizados no gráfico e por meio do qual as dimensões da viewBox SVG são expostas. Qualquer elemento svg adicionado neste slot será exibido na última camada do svg, habilitando quaisquer eventos de mouse ou toque que você queira usar, mas possivelmente prejudicando os eventos de mouse do próprio componente.",
                        de: "Diese Komponente enthält einen #svg-Slot, mit dem Sie Ihre eigenen benutzerdefinierten SVG-Elemente in das Diagramm einfügen können und über den die Abmessungen der SVG-ViewBox angezeigt werden. Jedes in diesem Slot hinzugefügte SVG-Element wird auf der letzten Ebene des SVG angezeigt und aktiviert alle Maus- oder Berührungsereignisse, die Sie möglicherweise verwenden möchten, behindert jedoch möglicherweise die eigenen Mausereignisse der Komponente.",
                        zh: "该组件包含一个 #svg 插槽，您可以使用它来将您自己的自定义 svg 元素引入到图表中，并通过它公开 svg viewBox 的尺寸。在此槽中添加的任何 svg 元素都将显示在 svg 的最后一层上，从而启用您可能想要使用的任何鼠标或触摸事件，但可能会阻碍组件自己的鼠标事件。",
                        jp: "このコンポーネントには、独自にカスタマイズした svg 要素をチャートに導入するために使用できる #svg スロットが含まれており、これを通じて svg viewBox の寸法が公開されます。このスロットに追加された svg 要素はすべて svg の最後のレイヤーに表示され、使用したいマウス イベントやタッチ イベントが有効になりますが、コンポーネント自体のマウス イベントが妨げられる可能性があります。",
                        es: "Este componente contiene una ranura #svg que puede utilizar para introducir sus propios elementos svg personalizados en el gráfico y a través de la cual se exponen las dimensiones del viewBox svg. Cualquier elemento svg agregado en esta ranura se mostrará en la última capa del svg, lo que permitirá cualquier evento táctil o de mouse que desee usar, aunque posiblemente obstaculice los eventos de mouse propios del componente."
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
                        es: "Seleccionar componente..."
                    },
                    noResults: {
                        en: "No results found",
                        fr: "Aucun résultat trouvé",
                        pt: "Nenhum resultado encontrado",
                        de: "keine Ergebnisse gefunden",
                        zh: "未找到结果",
                        jp: "結果が見つかりません",
                        es: "No se han encontrado resultados" 
                    },
                    viewComponent: {
                        en: "View component",
                        fr: "Afficher le composant",
                        pt: "Ver componente",
                        de: "Komponente anzeigen",
                        zh: "查看组件",
                        jp: "ビューコンポーネント",
                        es: "Ver componente"
                    },
                    defaultValue: {
                        en: "Default value",
                        fr: "Valeur par défaut",
                        pt: "Valor padrão",
                        de: "Standardwert",
                        zh: "默认值",
                        jp: "デフォルト値",
                        es: "Valor por defecto"
                    },
                    close: {
                        en: "Close",
                        fr: "Terminé",
                        pt: "Fechar",
                        de: "Schließen",
                        zh: "关闭",
                        jp: "近い",
                        es: "Cerca"
                    },
                    term: {
                        en: "Results for",
                        fr: "Résultats pour",
                        pt: "Resultados para",
                        de: "Ergebnisse für",
                        zh: "结果",
                        jp: "の結果",
                        es: "Resultados para"
                    },
                    placeholder: {
                        en: "Search config...",
                        fr: "Rechercher une config...",
                        pt: "Configuração de pesquisa...",
                        de: "Konfiguration durchsuchen...",
                        zh: "搜索配置",
                        jp: "検索構成",
                        es: "Configuración de búsqueda..."
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
                        es: "Clásico"
                    },
                    measure: {
                        en: "Rating & Measure",
                        fr: "Notation et mesure",
                        pt: "Classificação e medição",
                        de: "Bewertung und Messung",
                        zh: "评级与测量",
                        jp: "評価と測定",
                        es: "Calificación y medida"
                    },
                    mini: {
                        en: "Mini",
                        fr: "Miniature",
                        pt: "Miniatura",
                        de: "Miniatur",
                        zh: "微型",
                        jp: "ミニチュア",
                        es: "Miniatura"
                    },
                    combined: {
                        en: "Combined",
                        fr: "Combiné",
                        pt: "",
                        de: "",
                        zh: "",
                        jp: "",
                        es: ""
                    },
                    table: {
                        en: "Table",
                        fr: "Tableau",
                        pt: "Combinado",
                        de: "Kombiniert",
                        zh: "组合",
                        jp: "組み合わせた",
                        es: "Conjunto"
                    },
                    semantic: {
                        en: "Semantic",
                        fr: "Sémantique",
                        pt: "Semântico",
                        de: "Semantisch",
                        zh: "语义学",
                        jp: "セマンティック",
                        es: "Semántico"
                    },
                    tool: {
                        en: "Tools",
                        fr: "Outils",
                        pt: "Ferramentas",
                        de: "Werkzeuge",
                        zh: "工具",
                        jp: "ツール",
                        es: "Herramientas"
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
                        es: "Si está utilizando Nuxt, se proporciona un ejemplo de instalación en este repositorio de Github"
                    }
                },
                tagline: {
                    en: "A user-empowering data visualization Vue3 components library",
                    fr: "Une bibliothèque de composants Vue3 de visualisation de données qui autonomise les utilisateurs",
                    pt: "Uma biblioteca de componentes Vue3 para visualização de dados que capacita o usuário",
                    de: "Eine benutzerorientierte Vue3-Komponentenbibliothek zur Datenvisualisierung",
                    zh: "一个赋予用户权力的数据可视化Vue3组件库",
                    jp: "ユーザーをエンパワーするデータ可視化Vue3コンポーネントライブラリ",
                    es: "Una biblioteca de componentes Vue3 de visualización de datos que potencia al usuario"
                },
                github: {
                    en: "Github repo",
                    fr: "Github repo",
                    pt: "Github repo",
                    de: "Github-Repository",
                    zh: "Github",
                    jp: "Github",
                    es: "Github"
                },
                lightMode: {
                    en: "Switch to light mode",
                    fr: "Passer en thème clair",
                    pt: "Mudar para o modo claro",
                    de: "Wechseln Sie in den Lichtmodus",
                    zh: "切换到灯光模式",
                    jp: "ライトモードに切り替える",
                    es: "Cambiar al modo de luz"
                },
                darkMode: {
                    en: "Switch to dark mode",
                    fr: "Passer en thème sombre",
                    pt: "Mudar para o modo escuro",
                    de: "Wechseln Sie in den Dunkelmodus",
                    zh: "切换到深色模式",
                    jp: "ダークモードに切り替える",
                    es: "Cambiar al modo oscuro"
                },
                menu: {
                    installation: {
                        en: "Installation",
                        fr: "Installation",
                        pt: "Instalação",
                        de: "Installation",
                        zh: "安装",
                        jp: "インストール",
                        es: "Instalación"
                    },
                    docs: {
                        en: "Docs",
                        fr: "Docs",
                        pt: "Documentação",
                        de: "Dokumentation",
                        zh: "文档",
                        jp: "ドキュメンテーション",
                        es: "Documentación"
                    },
                    dashboard: {
                        en: "Dashboard",
                        fr: "Dashboard",
                        pt: "Dashboard",
                        de: "Armaturenbrett",
                        zh: "仪表板",
                        jp: "ダッシュボード",
                        es: "Panel"
                    },
                    versions: {
                        en: "Versions",
                        fr: "Versions",
                        pt: "Versões",
                        de: "Versionen",
                        zh: "版本",
                        jp: "バージョン",
                        es: "Versiones"
                    },
                    about: {
                        en: "About",
                        fr: "A propos",
                        pt: "Sobre",
                        de: "Über dieses Paket",
                        zh: "关于",
                        jp: "について",
                        es: "A proposito"
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
                        es: "Para usuarios de TypeScript: los tipos están disponibles en el archivo 'vue-data-ui.d.ts' en la carpeta de tipos del paquete."
                    },
                    comments: {
                        includeCss: {
                            en: "Include the css",
                            fr: "Inclure le css",
                            pt: "Incluir o css",
                            de: "Fügen Sie das CSS ein",
                            zh: "包括CSS",
                            jp: "CSSを含める",
                            es: "incluir el css"
                        },
                        global: {
                            en: "You can declare Vue Data UI components globally",
                            fr: "Vous pouvez importer les composants Vue Data UI globalement",
                            pt: "Você pode declarar componentes Vue Data UI globalmente",
                            de: "Sie können Vue Data-UI-Komponenten global deklarieren",
                            zh: "您可以全局声明 Vue Data UI 组件",
                            jp: "Vue Data UI コンポーネントはグローバルに宣言できます",
                            es: "Puede declarar los componentes de la interfaz de usuario de Vue Data globalmente"
                        },
                        import: {
                            en: "Or you can import just what you need in your files",
                            fr: "Ou vous pouvez juste importer les composants dont vous avez besoin",
                            pt: "Ou você pode importar apenas o que precisa em seus arquivos",
                            de: "Oder Sie importieren genau das, was Sie in Ihren Dateien benötigen",
                            zh: "或者您可以从文件中导入您需要的内容",
                            jp: "または、ファイル内の必要なものだけをインポートすることもできます",
                            es: "O puedes importar sólo lo que necesitas en tus archivos"
                        },
                        types: {
                            en: "If you are using Typescript, you can paste the vue-data-ui.d.ts file into your src folder, and import types this way:",
                            fr: "Si vous utilisez Typescript, vous pouvez coller le fichier vue-data-ui.d.ts dans votre dossier src et importer les types de cette façon :",
                            pt: "Se estiver usando Typescript, você pode colar o arquivo vue-data-ui.d.ts em sua pasta src e importar os tipos desta forma:",
                            de: "Wenn Sie Typescript verwenden, können Sie die Datei vue-data-ui.d.ts in Ihren src-Ordner einfügen und Typen auf diese Weise importieren:",
                            zh: "如果您使用的是 Typescript，您可以将 vue-data-ui.d.ts 文件粘贴到 src 文件夹中，并以这种方式导入类型：",
                            jp: "Typescript を使用している場合は、vue-data-ui.d.ts ファイルを src フォルダーに貼り付け、次の方法で型をインポートできます。",
                            es: "Si está utilizando Typecript, puede pegar el archivo vue-data-ui.d.ts en su carpeta src e importar tipos de esta manera:"
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
                        es: "Vue Data UI nació de una sola pregunta: si sus paneles son tan buenos, ¿por qué sus usuarios solicitan funciones de exportación a CSV?"
                    },
                    p2: {
                        en: "The purpose of this open-source library is to offer end users a set of in-built tools around charts and tables to reduce the friction of having to recompute exported data. Of course, Vue Data UI keeps the option to export to CSV and PDF, just in case.",
                        fr: "Le but de cette bibliothèque open source est d'offrir aux utilisateurs finaux un ensemble d'outils intégrés autour des graphiques et des tableaux pour réduire la friction liée au recalcul des données exportées. Bien entendu, Vue Data UI conserve la possibilité d'exporter vers CSV et PDF, juste au cas où.",
                        pt: "O objetivo desta biblioteca de código aberto é oferecer aos usuários finais um conjunto de ferramentas integradas em gráficos e tabelas para reduzir o atrito de ter que recalcular os dados exportados. Claro, o Vue Data UI mantém a opção de exportar para CSV e PDF, apenas por precaução.",
                        de: "Der Zweck dieser Open-Source-Bibliothek besteht darin, Endbenutzern eine Reihe integrierter Tools rund um Diagramme und Tabellen zur Verfügung zu stellen, um die Reibung bei der Neuberechnung exportierter Daten zu verringern. Natürlich bietet die Vue Data-Schnittstelle für alle Fälle weiterhin die Möglichkeit, nach CSV und PDF zu exportieren.",
                        zh: "这个开源库的目的是为最终用户提供一组围绕图表和表格的内置工具，以减少重新计算导出数据的麻烦。当然，Vue Data UI 保留了导出为 CSV 和 PDF 的选项，以防万一。",
                        jp: "このオープン ソース ライブラリの目的は、エクスポートされたデータを再計算する労力を軽減するためのチャートとテーブル用の一連の組み込みツールをエンド ユーザーに提供することです。もちろん、Vue Data UI には、万が一に備えて CSV または PDF にエクスポートするオプションが用意されています。",
                        es: "El propósito de esta biblioteca de código abierto es ofrecer a los usuarios finales un conjunto de herramientas integradas en torno a gráficos y tablas para reducir la fricción de tener que volver a calcular los datos exportados. Por supuesto, Vue Data UI mantiene la opción de exportar a CSV y PDF, por si acaso."
                    },
                    p3: {
                        en: "Vue Data UI offers a set of classic chart types, along with new or rare items, such as",
                        fr: "Vue Data UI propose un ensemble de types de graphiques classiques, ainsi que des composants nouveaux ou rares, tels que",
                        pt: "Vue Data UI oferece um conjunto de tipos de gráficos clássicos, junto com itens novos ou raros, como",
                        de: "Vue Data UI bietet eine Reihe klassischer Diagrammtypen sowie neue oder seltene Elemente wie:",
                        zh: "Vue Data UI 提供了一组经典的图表类型，以及新的或稀有的项目，例如",
                        jp: "Vue Data UI は、一連の古典的なチャート タイプに加えて、などの新しいアイテムや珍しいアイテムを提供します",
                        es: "Vue Data UI ofrece un conjunto de tipos de gráficos clásicos, junto con elementos nuevos o raros, como"
                    },
                    p4: {
                        en: "To make the experience of your dashboards as smooth as possible, Vue Data UI also ships with a set of utilities, such as",
                        fr: "Pour rendre l'expérience de vos tableaux de bord aussi fluide que possible, Vue Data UI est également livré avec un ensemble d'utilitaires, tels que",
                        pt: "Para tornar a experiência de seus painéis o mais tranquila possível, o Vue Data UI também vem com um conjunto de utilitários, como",
                        de: "Um Ihre Dashboard-Erfahrung so reibungslos wie möglich zu gestalten, wird Vue Data UI auch mit einer Reihe von Dienstprogrammen geliefert, wie zum Beispiel:",
                        zh: "为了使仪表板体验尽可能流畅，Vue Data UI 还附带了一组实用程序，例如",
                        jp: "ダッシュボードのエクスペリエンスをできるだけスムーズにするために、Vue Data UI には VueUiScreenshot や VueUiSkeleton などの一連のユーティリティも付属しています。",
                        es: "Para que la experiencia de sus paneles sea lo más fluida posible, Vue Data UI también incluye un conjunto de utilidades, como"
                    },
                    maintainers: {
                        en: "Maintainer",
                        fr: "Mainteneur",
                        pt: "Mantenedor",
                        de: "Betreuer",
                        zh: "维护者",
                        jp: "メンテナー",
                        es: "Mantenedor"
                    },
                    alp: {
                        en: "Alec Lloyd Probert is a front-end developer, formerly a data analyst, with a strong passion for data visualization and VueJs.",
                        fr: "Alec Lloyd Probert est un développeur front-end, ancien data analyste, passionné par la visualisation de données et VueJs.",
                        pt: "Alec Lloyd Probert é desenvolvedor front-end, ex-analista de dados, com grande paixão por visualização de dados e VueJs.",
                        de: "Alec Lloyd Probert ist ein Front-End-Entwickler, früher Datenanalyst, mit einer großen Leidenschaft für Datenvisualisierung und VueJs.",
                        zh: "Alec Lloyd Probert 是一名前端开发人员和前数据分析师，对数据可视化和 VueJs 充满热情。",
                        jp: "Alec Lloyd Probert は、データ視覚化と VueJs に情熱を注ぐフロントエンド開発者であり、元データ アナリストです。",
                        es: "Alec Lloyd Probert es un desarrollador front-end, anteriormente analista de datos, con una gran pasión por la visualización de datos y VueJ."
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
                        es: "Se requieren 2 props"
                    },
                    dataset: {
                        en: "dataset",
                        fr: "dataset",
                        pt: "dataset",
                        de: "dataset",
                        zh: "数据集",
                        jp: "データセット",
                        es: "dataset"
                    },
                    config: {
                        en: "config",
                        fr: "config",
                        pt: "config",
                        de: "config",
                        zh: "配置",
                        jp: "構成",
                        es: "config"
                    },
                    p1: {
                        en: "Documentation pages provide you with a config tab where you can tweak your config and save it as JSON. You can also switch from dark to light themes to save configs for both modes.",
                        fr: "Les pages de documentation vous fournissent un onglet de configuration dans lequel vous pouvez modifier votre configuration et l'enregistrer au format JSON. Vous pouvez également passer des thèmes sombres aux thèmes clairs pour enregistrer les configurations pour les deux modes.",
                        pt: "As páginas de documentação fornecem uma guia de configuração onde você pode ajustar sua configuração e salvá-la como JSON. Você também pode alternar entre temas escuros e claros para salvar as configurações de ambos os modos.",
                        de: "Die Dokumentationsseiten verfügen über eine Registerkarte „Konfiguration“, auf der Sie Ihre Konfiguration optimieren und als JSON speichern können. Sie können auch von dunklen zu hellen Themen wechseln, um Konfigurationen für beide Modi zu speichern.",
                        zh: "文档页面为您提供了一个配置选项卡，您可以在其中调整配置并将其保存为 JSON。您还可以从深色主题切换到浅色主题以保存两种模式的配置。",
                        jp: "ドキュメント ページには、構成を調整して JSON として保存できる構成タブが表示されます。ダークテーマからライトテーマに切り替えて、両方のモードの設定を保存することもできます。",
                        es: "Las páginas de documentación le proporcionan una pestaña de configuración donde puede modificar su configuración y guardarla como JSON. También puedes cambiar de temas oscuros a claros para guardar configuraciones para ambos modos."
                    },
                    tooltips: {
                        digits: {
                            en: "Show numbers with a classic electronic display",
                            fr: "Afficher les chiffres avec un affichage électronique classique",
                            pt: "Mostre números com um display eletrônico clássico",
                            de: "Zeigen Sie Zahlen mit einer klassischen elektronischen Anzeige an",
                            zh: "用经典的电子显示屏显示数字",
                            jp: "クラシックな電子ディスプレイで数字を表示",
                            es: "Muestra números con una pantalla electrónica clásica."
                        },
                        bar3d: {
                            en: "Visualize a percentage with a 3d bar",
                            fr: "Visualisez un pourcentage avec une barre 3D",
                            pt: "Visualize uma porcentagem com uma barra 3D",
                            de: "Visualisieren Sie einen Prozentsatz mit einem 3D-Balken",
                            zh: "使用 3d 条形图可视化百分比",
                            jp: "パーセンテージを 3D バーで視覚化する",
                            es: "Visualiza un porcentaje con una barra 3d."
                        },
                        moodRadar: {
                            en: "Visualize rating statistics on a colorful and expressive radar chart",
                            fr: "Visualisez les statistiques de notation sur un graphique radar coloré et expressif",
                            pt: "Visualize estatísticas de classificação em um gráfico de radar colorido e expressivo",
                            de: "Visualisieren Sie Bewertungsstatistiken auf einem farbenfrohen und ausdrucksstarken Radardiagramm",
                            zh: "在丰富多彩且富有表现力的雷达图上可视化评级统计数据",
                            jp: "カラフルで表現力豊かなレーダー チャートで評価統計を視覚化します",
                            es: "Visualice estadísticas de calificación en un gráfico de radar colorido y expresivo"
                        },
                        iconSpecial: {
                            en: "Other icons available :",
                            fr: "Autres icônes disponibles :",
                            pt: "Outros ícones disponíveis:",
                            de: "Weitere verfügbare Symbole:",
                            zh: "其他可用图标：",
                            jp: "他のアイコンも利用可能:",
                            es: "Otros iconos disponibles:"
                        },
                        icon: {
                            en: "A collection of handcrafted icons, ideal if you choose to hide the built-in user options menu and make your own.",
                            fr: "Une collection d'icônes fabriquées à la main, idéale si vous choisissez de masquer le menu d'options utilisateur intégré et de créer le vôtre.",
                            pt: "Uma coleção de ícones feitos à mão, ideal se você optar por ocultar o menu de opções do usuário integrado e criar o seu próprio.",
                            de: "Eine Sammlung handgefertigter Symbole, ideal, wenn Sie das integrierte Benutzeroptionsmenü ausblenden und Ihr eigenes erstellen möchten.",
                            zh: "手工制作的图标集合，如果您选择隐藏内置用户选项菜单并制作自己的图标，那么这是理想的选择。",
                            jp: "手作りのアイコンのコレクション。組み込みのユーザー オプション メニューを非表示にして独自のアイコンを作成する場合に最適です。",
                            es: "Una colección de íconos hechos a mano, ideal si eliges ocultar el menú de opciones de usuario integrado y crear el tuyo propio."
                        },
                        donutEvolution: {
                            en: "A fusion of line and donut charts, to visualize growth and proportions in one go",
                            fr: "Une fusion de graphiques en courbes et en anneaux, pour visualiser la croissance et les proportions en une apartmentseule fois",
                            pt: "Uma fusão de gráficos de linha e de rosca, para visualizar o crescimento e as proporções de uma só vez",
                            de: "Eine Kombination aus Linien- und Ringdiagrammen, um Wachstum und Proportionen auf einmal zu visualisieren",
                            zh: "折线图和圆环图的融合，一次性可视化增长和比例",
                            jp: "折れ線グラフとドーナツ グラフを融合し、成長と比率を一度に視覚化",
                            es: "Una fusión de gráficos de líneas y de anillos para visualizar el crecimiento y las proporciones de una sola vez."
                        },
                        tiremarks: {
                            en: "Visualize a percentage through a dynamic tiremarks-like layout",
                            fr: "Visualisez un pourcentage grâce à une disposition dynamique semblable à des marques de pneu",
                            pt: "Visualize uma porcentagem por meio de um layout dinâmico semelhante a marcas de pneus",
                            de: "Visualisieren Sie einen Prozentsatz durch ein dynamisches Reifenspuren-ähnliches Layout",
                            zh: "通过类似轮胎痕迹的动态布局可视化百分比",
                            jp: "タイヤ跡のような動的なレイアウトでパーセンテージを視覚化",
                            es: "Visualice un porcentaje a través de un diseño dinámico similar a marcas de neumáticos"
                        },
                        wheel: {
                            en: "Visualize a percentage through a dynamic wheel-type layout",
                            fr: "Visualisez un pourcentage grâce à une disposition dynamique de type roue",
                            pt: "Visualize uma porcentagem por meio de um layout dinâmico do tipo roda",
                            de: "Visualisieren Sie einen Prozentsatz durch ein dynamisches Rad-Layout",
                            zh: "通过动态轮式布局可视化百分比",
                            jp: "動的なホイールタイプのレイアウトでパーセンテージを視覚化",
                            es: "Visualice un porcentaje a través de un diseño dinámico tipo rueda"
                        },
                        rings: {
                            en: "Visualize relative proportions with a beautiful concentric layout",
                            fr: "Visualisez les proportions relatives avec une belle disposition concentrique",
                            pt: "Visualize proporções relativas com um belo layout concêntrico",
                            de: "Visualisieren Sie relative Proportionen mit einem schönen konzentrischen Layout",
                            zh: "通过美丽的同心布局可视化相对比例",
                            jp: "美しい同心円状のレイアウトで相対的な比率を視覚化",
                            es: "Visualice proporciones relativas con un hermoso diseño concéntrico"
                        },
                        histogram: {
                            en: "A compact and flexible mini histogram component.",
                            fr: "Un mini composant d'histogramme compact et flexible.",
                            pt: "Um mini componente de histograma compacto e flexível.",
                            de: "Eine kompakte und flexible Mini-Histogrammkomponente.",
                            zh: "紧凑灵活的迷你直方图组件。",
                            jp: "コンパクトで柔軟なミニ ヒストグラム コンポーネント。",
                            es: "Un componente de mini histograma compacto y flexible."
                        },
                        stackbar: {
                            en: "A compact way to represent proportions",
                            fr: "Une façon compacte de représenter les proportions",
                            pt: "Uma maneira compacta de representar proporções",
                            de: "Eine kompakte Möglichkeit, Proportionen darzustellen",
                            zh: "表示比例的紧凑方式",
                            jp: "プロポーションをコンパクトに表現する方法",
                            es: "Una forma compacta de representar proporciones."
                        },
                        thermometer: {
                            en: "A component to visualize a KPI as a temperature",
                            fr: "Un composant pour visualiser un KPI sous forme de température",
                            pt: "Um componente para visualizar um KPI como uma temperatura",
                            de: "Eine Komponente zur Visualisierung eines KPI als Temperatur",
                            zh: "将 KPI 可视化为温度的组件",
                            jp: "KPIを温度として可視化するコンポーネント",
                            es: "Un componente para visualizar un KPI como temperatura."
                        },
                        relationCircle: {
                            en: "A component to visualize relationships between people, words, companies...",
                            fr: "Un composant pour visualiser les relations entre les personnes, les mots, les entreprises...",
                            pt: "Um componente para visualizar relações entre pessoas, palavras, empresas...",
                            de: "Eine Komponente zur Visualisierung von Beziehungen zwischen Menschen, Wörtern, Unternehmen ...",
                            zh: "一个可视化人、文字、公司之间关系的组件......",
                            jp: "人、言葉、企業…の関係性を可視化するコンポーネント",
                            es: "Un componente para visualizar las relaciones entre personas, palabras, empresas..."
                        },
                        annotator: {
                            en: "A component to wrap any content and make it annotatable.",
                            fr: "Un composant pour envelopper n'importe quel contenu et le rendre annotable.",
                            pt: "Um componente para agrupar qualquer conteúdo e torná-lo anotável.",
                            de: "Eine Komponente zum Umschließen und Kommentieren von Inhalten.",
                            zh: "用于包装任何内容并使其可注释的组件。",
                            jp: "コンテンツをラップして注釈を付けられるようにするコンポーネント。",
                            es: "Un componente para envolver cualquier contenido y hacerlo anotable."
                        },
                        dashboard: {
                            en: "A drag and resize component to place your charts, and allow the user to save their position.",
                            fr: "Un composant glisser et redimensionner pour placer vos graphiques et permettre à l'utilisateur de sauvegarder sa position.",
                            pt: "Um componente de arrastar e redimensionar para posicionar seus gráficos e permitir ao usuário salvar sua posição.",
                            de: "Eine Komponente zum Ziehen und Ändern der Größe, um Ihre Diagramme zu platzieren und es dem Benutzer zu ermöglichen, ihre Position zu speichern.",
                            zh: "拖动和调整大小的组件来放置图表，并允许用户保存其位置。",
                            jp: "コンポーネントをドラッグしてサイズ変更してチャートを配置し、ユーザーがその位置を保存できるようにします。",
                            es: "Un componente de arrastrar y cambiar el tamaño para colocar sus gráficos y permitir al usuario guardar su posición.",
                        },
                        xy: {
                            en: "Lines, bars, plots using classic x and y axis representation",
                            fr: "Lignes, barres, tracés utilisant la représentation classique des axes X et Y",
                            pt: "Linhas, barras, gráficos usando representação clássica dos eixos x e y",
                            de: "Linien, Balken, Diagramme mit klassischer x- und y-Achsendarstellung",
                            zh: "使用经典 x 和 y 轴的线条、条形图、图表",
                            jp: "従来の X 軸と Y 軸を使用した折れ線、棒、グラフ",
                            es: "Líneas, barras y gráficos utilizando la representación clásica de los ejes x e y"
                        },
                        donut: {
                            en: "Visualize relative proportions with this classic representation",
                            fr: "Visualisez les proportions relatives avec cette représentation classique",
                            pt: "Visualize proporções relativas com esta representação clássica",
                            de: "Visualisieren Sie relative Proportionen mit dieser klassischen Darstellung",
                            zh: "用这种经典的表示方式可视化相对比例",
                            jp: "この古典的な表現で相対的な比率を視覚化します",
                            es: "Visualiza proporciones relativas con esta representación clásica."
                        },
                        radar: {
                            en: "Reveal outliers and commonality of different measures on the same scale",
                            fr: "Révélez les valeurs aberrantes et les points communs de différentes mesures sur la même échelle",
                            pt: "Revelar valores discrepantes e pontos em comum de diferentes medidas na mesma escala",
                            de: "Weisen Sie auf Ausreißer und Ähnlichkeiten zwischen verschiedenen Maßen auf derselben Skala hin",
                            zh: "揭示同一尺度上不同度量的异常值和共性",
                            jp: "同じスケール上のさまざまな指標にわたる外れ値と共通点を明らかにする",
                            es: "Revelar valores atípicos y puntos en común de diferentes medidas en la misma escala"
                        },
                        waffle: {
                            en: "Visualize relative proportions with a representation known to be easier to grasp by the human brain",
                            fr: "Visualisez les proportions relatives avec une représentation connue pour être plus facile à saisir par le cerveau humain",
                            pt: "Visualize proporções relativas com uma representação conhecida por ser mais fácil de entender pelo cérebro humano",
                            de: "Visualisieren Sie relative Proportionen mit einer Darstellung, die bekanntermaßen für das menschliche Gehirn leichter zu erfassen ist",
                            zh: "使用已知更容易被人脑掌握的表示形式可视化相对比例",
                            jp: "人間の脳にとって理解しやすいことが知られている表現を使用して、相対的な比率を視覚化します。",
                            es: "Visualice proporciones relativas con una representación que se sabe que es más fácil de captar para el cerebro humano."
                        },
                        quadrant: {
                            en: "Identify patterns and trends to prioritize actions based on the position of data points",
                            fr: "Identifier les modèles et les tendances pour prioriser les actions en fonction de la position des points de données",
                            pt: "Identifique padrões e tendências para priorizar ações com base na posição dos pontos de dados",
                            de: "Identifizieren Sie Muster und Trends, um Maßnahmen basierend auf der Position der Datenpunkte zu priorisieren",
                            zh: "识别模式和趋势，根据数据点的位置确定行动的优先级",
                            jp: "パターンと傾向を特定し、データ ポイントの位置に基づいてアクションに優先順位を付けます",
                            es: "Identificar patrones y tendencias para priorizar acciones en función de la posición de los puntos de datos."
                        },
                        gauge: {
                            en: "Quickly show how well a given metric is performing against a target goal",
                            fr: "Montrez rapidement les performances d'une métrique donnée par rapport à un objectif cible",
                            pt: "Mostre rapidamente o desempenho de uma determinada métrica em relação a uma meta desejada",
                            de: "Zeigen Sie schnell, wie gut eine bestimmte Metrik im Vergleich zu einem Ziel abschneidet",
                            zh: "快速显示给定指标对目标的执行情况",
                            jp: "特定の指標が目標目標に対してどの程度優れたパフォーマンスを発揮しているかをすぐに示します",
                            es: "Muestre rápidamente qué tan bien se está desempeñando una métrica determinada frente a un objetivo objetivo."
                        },
                        chestnut: {
                            en: "Represent nested information from a general base to detailed breakdowns",
                            fr: "Représenter des informations imbriquées depuis une base générale jusqu'à des ventilations détaillées",
                            pt: "Representar informações aninhadas desde uma base geral até detalhamentos detalhados",
                            de: "Präsentieren Sie verschachtelte Informationen von einer allgemeinen Basis bis hin zu detaillierten Aufschlüsselungen",
                            zh: "表示从一般基础到详细细分的嵌套信息",
                            jp: "一般的な基礎から詳細なセグメンテーションまでのネストされた情報を表現します",
                            es: "Representar información anidada desde una base general hasta desgloses detallados."
                        },
                        onion: {
                            en: "Compare the values of multiple categories or groups in a single visualization",
                            fr: "Comparez les valeurs de plusieurs catégories ou groupes dans une seule visualisation",
                            pt: "Compare os valores de diversas categorias ou grupos em uma única visualização",
                            de: "Vergleichen Sie Werte über mehrere Kategorien oder Gruppen hinweg in einer einzigen Visualisierung",
                            zh: "在单个可视化中比较多个类别或组的值",
                            jp: "単一のビジュアライゼーションで複数のカテゴリまたはグループの値を比較します",
                            es: "Compare los valores de múltiples categorías o grupos en una sola visualización"
                        },
                        verticalBar: {
                            en: "Compare different categorical or discrete variables, with the option to show their breakdowns",
                            fr: "Comparez différentes variables catégorielles ou discrètes, avec la possibilité d'afficher leurs répartitions",
                            pt: "Compare diferentes variáveis ​​categóricas ou discretas, com a opção de mostrar seus detalhamentos",
                            de: "Vergleichen Sie verschiedene kategoriale oder diskrete Variablen mit der Option, deren Aufschlüsselung anzuzeigen",
                            zh: "比较不同的分类或离散变量，并可选择显示其细分",
                            jp: "さまざまなカテゴリ変数または離散変数を、その内訳を表示するオプションを使用して比較します。",
                            es: "Compara diferentes variables categóricas o discretas, con la opción de mostrar sus desgloses"
                        },
                        heatmap: {
                            en: "Show relationships and patterns between two variables by observing how cell colors change across each axis",
                            fr: "Montrez les relations et les modèles entre deux variables en observant comment les couleurs des cellules changent sur chaque axe",
                            pt: "Mostre relações e padrões entre duas variáveis ​​observando como as cores das células mudam em cada eixo",
                            de: "Entdecken Sie Beziehungen und Muster zwischen zwei Variablen, indem Sie beobachten, wie sich die Zellfarben auf jeder Achse ändern",
                            zh: "通过观察细胞颜色在每个轴上的变化来显示两个变量之间的关系和模式",
                            jp: "各軸でセルの色がどのように変化するかを観察することで、2 つの変数間の関係とパターンを表示します",
                            es: "Muestre relaciones y patrones entre dos variables observando cómo cambian los colores de las celdas en cada eje."
                        },
                        scatter: {
                            en: "From a large dataset, reveal the correlation between two variables",
                            fr: "À partir d'un grand ensemble de données, révélez la corrélation entre deux variables",
                            pt: "A partir de um grande conjunto de dados, revele a correlação entre duas variáveis",
                            de: "Bestimmen Sie anhand eines großen Datensatzes die Korrelation zwischen zwei Variablen",
                            zh: "从大型数据集中揭示两个变量之间的相关性",
                            jp: "大規模なデータセットから 2 つの変数間の相関関係を明らかにする",
                            es: "A partir de un gran conjunto de datos, revele la correlación entre dos variables."
                        },
                        candlestick: {
                            en: "Determine possible price movements based on past patterns",
                            fr: "Déterminer les mouvements de prix possibles en fonction des modèles passés",
                            pt: "Determine possíveis movimentos de preços com base em padrões anteriores",
                            de: "Bestimmen Sie mögliche Preisbewegungen basierend auf vergangenen Mustern",
                            zh: "根据过去的模式确定可能的价格变动",
                            jp: "過去のパターンに基づいて起こり得る値動きを判断する",
                            es: "Determinar posibles movimientos de precios basados ​​en patrones pasados."
                        },
                        agePyramid: {
                            en: "Show how populations are composed and how they are changing",
                            fr: "Montrer comment les populations sont composées et comment elles évoluent",
                            pt: "Mostre como as populações são compostas e como estão mudando",
                            de: "Zeigen Sie, wie Populationen zusammengesetzt sind und wie sie sich verändern",
                            zh: "显示人口的组成方式及其变化情况",
                            jp: "人口がどのように構成され、どのように変化しているかを示す",
                            es: "Mostrar cómo se componen las poblaciones y cómo están cambiando."
                        },
                        sparkline: {
                            en: "Visualize evolution on a tiny line chart",
                            fr: "Visualisez l'évolution sur un petit graphique linéaire",
                            pt: "Visualize a evolução em um pequeno gráfico de linhas",
                            de: "Visualisieren Sie die Entwicklung in einem kleinen Liniendiagramm",
                            zh: "在微小的折线图上可视化进化",
                            jp: "小さな折れ線グラフで進化を視覚化する",
                            es: "Visualice la evolución en un pequeño gráfico de líneas"
                        },
                        sparkbar: {
                            en: "Show kpi performance with a tiny vertical bar chart",
                            fr: "Afficher les performances des KPI avec un petit graphique à barres verticales",
                            pt: "Mostre o desempenho do KPI com um pequeno gráfico de barras verticais",
                            de: "Zeigen Sie die KPI-Leistung mit einem kleinen vertikalen Balkendiagramm an",
                            zh: "用微小的垂直条形图显示关键绩效指标",
                            jp: "主要業績評価指標を小さな縦棒グラフで表示します",
                            es: "Muestre el rendimiento de los KPI con un pequeño gráfico de barras verticales"
                        },
                        table: {
                            en: "Powerful dynamic table that allows the user to select data and calculate sums, averages, and visualize charts based on their selection",
                            fr: "Tableau dynamique puissant qui permet à l'utilisateur de sélectionner des données et de calculer des sommes, des moyennes et de visualiser des graphiques en fonction de leur sélection",
                            pt: "Tabela dinâmica poderosa que permite ao usuário selecionar dados e calcular somas, médias e visualizar gráficos com base em sua seleção",
                            de: "Leistungsstarke dynamische Tabelle, die es dem Benutzer ermöglicht, Daten auszuwählen und auf der Grundlage ihrer Auswahl Summen und Durchschnittswerte zu berechnen und Diagramme zu visualisieren",
                            zh: "强大的动态表，允许用户选择数据并计算总和、平均值，并根据他们的选择可视化图表",
                            jp: "ユーザーがデータを選択し、選択に基づいて合計、平均、視覚的なグラフを計算できる強力な動的テーブル",
                            es: "Potente tabla dinámica que permite al usuario seleccionar datos y calcular sumas, promedios y visualizar gráficos en función de su selección."
                        },
                        rating: {
                            en: "A classic rating component to rate or visualize rating results. Control the number of stars to display, and their shape",
                            fr: "Un composant de notation classique pour noter ou visualiser les résultats de la notation. Contrôlez le nombre d'étoiles à afficher et leur forme",
                            pt: "Um componente de classificação clássico para avaliar ou visualizar resultados de classificação. Controle o número de estrelas a serem exibidas e sua forma",
                            de: "Eine klassische Auswertungskomponente zur Auswertung bzw. Visualisierung von Auswertungsergebnissen. Steuern Sie die Anzahl der anzuzeigenden Sterne und deren Form",
                            zh: "用于对评级结果进行评级或可视化的经典评级组件。控制要显示的星星数量及其形状",
                            jp: "評価または評価結果を視覚化するための古典的な評価コンポーネント。表示する星の数とその形を制御する",
                            es: "Un componente de calificación clásico para calificar o visualizar resultados de calificación. Controla el número de estrellas a mostrar y su forma."
                        },
                        smiley: {
                            en: "A rating component using smiley icons",
                            fr: "Un composant de notation utilisant des icônes souriantes",
                            pt: "Um componente de classificação usando ícones sorridentes",
                            de: "Eine Bewertungskomponente mit Smiley-Symbolen",
                            zh: "使用笑脸图标的评级组件",
                            jp: "スマイリーアイコンを使用した評価コンポーネント",
                            es: "Un componente de calificación que utiliza íconos sonrientes",
                        },
                        screenshot: {
                            en: "Select an area on the screen and either download or post the image as base64 with additional metadata",
                            fr: "Sélectionnez une zone sur l'écran et téléchargez ou publiez l'image en base64 avec des métadonnées supplémentaires",
                            pt: "Selecione uma área na tela e baixe ou publique a imagem como base64 com metadados adicionais",
                            de: "Wählen Sie einen Bereich auf dem Bildschirm aus und laden Sie entweder das Bild herunter oder veröffentlichen Sie es als Base64 mit zusätzlichen Metadaten",
                            zh: "选择屏幕上的一个区域，然后下载或发布带有附加元数据的 Base64 图像",
                            jp: "画面上の領域を選択し、追加のメタデータを含む画像をダウンロードするか、base64 として投稿します。",
                            es: "Seleccione un área en la pantalla y descargue o publique la imagen como base64 con metadatos adicionales"
                        },
                        skeleton: {
                            en: "Display gorgeous skeleton charts while data is loading",
                            fr: "Affichez de superbes graphiques squelettes pendant le chargement des données",
                            pt: "Exiba lindos gráficos de esqueleto enquanto os dados estão sendo carregados",
                            de: "Sehen Sie sich wunderschöne Skelettdiagramme an, während die Daten geladen werden",
                            zh: "数据加载时显示华丽的骨架图",
                            jp: "データのロード中に豪華なスケルトン チャートを表示",
                            es: "Muestre magníficos gráficos de esqueleto mientras se cargan los datos"
                        },
                    },
                    datastructure: {
                        en: "Datastructure",
                        fr: "Structure des données",
                        pt: "Estrutura de dados",
                        de: "Datenstruktur",
                        zh: "数据结构",
                        jp: "データ構造",
                        es: "Estructura de datos"
                    },
                    copyDefaultConfig: {
                        en: "Copy default config as JSON",
                        fr: "Copier la configuration par défaut au format JSON",
                        pt: "Copie a configuração padrão como JSON",
                        de: "Kopieren Sie die Standardkonfiguration als JSON",
                        zh: "将默认配置复制为 JSON",
                        jp: "デフォルト設定をJSONとしてコピー",
                        es: "Copie la configuración predeterminada como JSON"
                    },
                    copyThisConfig: {
                        en: "Copy this config as JSON",
                        fr: "Copier cette config en JSON",
                        pt: "Copie esta configuração como JSON",
                        de: "Kopieren Sie diese Konfiguration als JSON",
                        zh: "将此配置复制为 JSON",
                        jp: "この構成を JSON としてコピーします",
                        es: "Copie esta configuración como JSON"
                    },
                    reset: {
                        en: "Reset",
                        fr: "Réinitialiser",
                        pt: "Reiniciar",
                        de: "Zurücksetzen",
                        zh: "重置",
                        jp: "リセット",
                        es: "Reiniciar"
                    },
                    cssOverride: {
                        en: "You can override the css (check out the styles.css in the package)",
                        fr: "Vous pouvez remplacer le CSS (consultez le styles.css dans le package)",
                        pt: "Você pode substituir o CSS (consulte estilos.css no package)",
                        de: "Sie können das CSS überschreiben (siehe die Datei „styles.css“ im Paket).",
                        zh: "您可以重新使用 CSS（在包中查看 styles.css）",
                        jp: "CSS を再配置する (styles.css とパッケージを参照)",
                        es: "Puede anular el CSS (consulte estilos.css en el paquete)"
                    },
                    emits: {
                        generateImage: {
                            en: "Call this method from the parent component to download as png image. This is especially useful if user options are hidden.",
                            fr: "Appelez cette méthode à partir du composant parent pour la télécharger sous forme d'image png. Ceci est particulièrement utile si les options utilisateur sont masquées.",
                            pt: "Chame esse método do componente pai para fazer download como imagem png. Isto é especialmente útil se as opções do usuário estiverem ocultas.",
                            de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um sie als PNG-Bild herunterzuladen. Dies ist besonders nützlich, wenn Benutzeroptionen ausgeblendet sind.",
                            zh: "从父组件调用此方法以下载 png 图像。如果用户选项被隐藏，这尤其有用。",
                            jp: "親コンポーネントからこのメソッドを呼び出して、PNG イメージとしてダウンロードします。これは、ユーザー オプションが非表示の場合に特に便利です。",
                            es: "Llame a este método desde el componente principal para descargarlo como imagen png. Esto es especialmente útil si las opciones de usuario están ocultas."
                        },
                        generatePdf: {
                            en: "Call this method from the parent component to print as PDF. This is especially useful if user options are hidden.",
                            fr: "Appelez cette méthode à partir du composant parent pour imprimer au format PDF. Ceci est particulièrement utile si les options utilisateur sont masquées.",
                            pt: "Chame esse método do componente pai para imprimir como PDF. Isto é especialmente útil se as opções do usuário estiverem ocultas.",
                            de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um als PDF zu drucken. Dies ist besonders nützlich, wenn Benutzeroptionen ausgeblendet sind.",
                            zh: "从父组件调用此方法以打印为 PDF。如果用户选项被隐藏，这尤其有用。",
                            jp: "PDF として印刷するには、親コンポーネントからこのメソッドを呼び出します。これは、ユーザー オプションが非表示の場合に特に便利です。",
                            es: "Llame a este método desde el componente principal para imprimir como PDF. Esto es especialmente útil si las opciones de usuario están ocultas."
                        },
                        generateCsv: {
                            en: "Call this method from the parent component to generate an CSV extraction. This is especially useful if user options are hidden.",
                            fr: "Appelez cette méthode depuis le composant parent pour générer une extraction CSV. Ceci est particulièrement utile si les options utilisateur sont masquées.",
                            pt: "Chame esse método do componente pai para gerar uma extração do CSV. Isto é especialmente útil se as opções do usuário estiverem ocultas.",
                            de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um eine CSV-Extraktion zu generieren. Dies ist besonders nützlich, wenn Benutzeroptionen ausgeblendet sind.",
                            zh: "从父组件调用此方法以生成 CSV 提取。如果用户选项被隐藏，这尤其有用。",
                            jp: "CSV 抽出を生成するには、親コンポーネントからこのメソッドを呼び出します。これは、ユーザー オプションが非表示の場合に特に便利です。",
                            es: "Llame a este método desde el componente principal para generar una extracción de CSV. Esto es especialmente útil si las opciones de usuario están ocultas."
                        },
                        dashboard: {
                            change: {
                                en: "Emits the updated config to the parent component",
                                fr: "Émet la configuration mise à jour au composant parent",
                                pt: "Emite a configuração atualizada para o componente pai",
                                de: "Gibt die aktualisierte Konfiguration an die übergeordnete Komponente aus",
                                zh: "将更新后的配置发送到父组件",
                                jp: "更新された構成を親コンポーネントに送信します",
                                es: "Emite la configuración actualizada al componente principal."
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
                                es: "en modo publicación, devuelve los datos de la imagen actual:"
                            },
                            shoot: {
                                en: "call this method to open the component",
                                fr: "appelez cette méthode pour ouvrir le composant",
                                pt: "chame este método para abrir o componente",
                                de: "Rufen Sie diese Methode auf, um die Komponente zu öffnen",
                                zh: "调用该方法打开组件",
                                jp: "このメソッドを呼び出してコンポーネントを開きます",
                                es: "llame a este método para abrir el componente"
                            },
                            close: {
                                en: "call this method to close the component",
                                fr: "appelez cette méthode pour fermer le composant",
                                pt: "chame este método para fechar o componente",
                                de: "Rufen Sie diese Methode auf, um die Komponente zu schließen",
                                zh: "调用该方法关闭组件",
                                jp: "このメソッドを呼び出してコンポーネントを閉じます",
                                es: "call this method to close the component"
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
                                es: "devuelve la serie visible actual al seleccionar/deseleccionar la leyenda:"
                            },
                            selectX: {
                                en: "returns the current visible series at the selected x index when clicking on the chart :",
                                fr: "renvoie la série visible actuelle à l'index x sélectionné en cliquant sur le graphique :",
                                pt: "retorna a série visível atual no índice x selecionado ao clicar no gráfico:",
                                de: "gibt die aktuell sichtbare Reihe am ausgewählten x-Index zurück, wenn auf das Diagramm geklickt wird:",
                                zh: "单击图表时返回所选 x 索引处的当前可见系列：",
                                jp: "チャートをクリックすると、選択された x インデックスで現在表示されているシリーズが返されます。",
                                es: "devuelve la serie visible actual en el índice x seleccionado al hacer clic en el gráfico:"
                            },
                            getData: {
                                en: "call this method from the parent to get the full formatted dataset.",
                                fr: "appelez cette méthode depuis le parent pour obtenir l'ensemble de données entièrement formaté.",
                                pt: "chame esse método do pai para obter o conjunto de dados formatado completo.",
                                de: "",
                                zh: "从父级调用此方法以获取完整格式化的数据集。",
                                jp: "完全なフォーマット済みデータセットを取得するには、親からこのメソッドを呼び出します。",
                                es: "Llame a este método desde el padre para obtener el conjunto de datos formateado completo."
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
                                es: "devuelve las categorías visibles actuales con sus elementos al seleccionar/deseleccionar la leyenda:"
                            },
                            selectPlot: {
                                en: "returns the data of the selected plot on click:",
                                fr: "renvoie les données du tracé sélectionné au clic :",
                                pt: "retorna os dados do gráfico selecionado ao clicar:",
                                de: "gibt beim Anklicken die Daten des ausgewählten Diagramms zurück:",
                                zh: "单击时返回所选图的数据：",
                                jp: "クリックすると、選択したプロットのデータが返されます。",
                                es: "devuelve los datos del gráfico seleccionado al hacer clic:"
                            },
                            selectSide: {
                                en: "returns the data of all the plots located on the area on click of a corner label:",
                                fr: "renvoie les données de toutes les parcelles situées sur la zone au clic d'une étiquette de coin :",
                                pt: "retorna os dados de todas as parcelas localizadas na área ao clicar em um rótulo de canto:",
                                de: "Gibt die Daten aller Parzellen zurück, die sich in dem Gebiet befinden, wenn Sie auf eine Eckbeschriftung klicken:",
                                zh: "单击角标签时返回位于该区域的所有图的数据：",
                                jp: "コーナーラベルをクリックすると、そのエリアにあるすべてのプロットのデータを返します。",
                                es: "devuelve los datos de todas las parcelas ubicadas en el área al hacer clic en una etiqueta de esquina:"
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
                                es: "devuelve los datos raíz seleccionados"
                            },
                            selectBranch: {
                                en: "returns the selected branch data",
                                fr: "renvoie les données de la branche sélectionnée",
                                pt: "retorna os dados da filial selecionada",
                                de: "gibt die ausgewählten Zweigdaten zurück",
                                zh: "返回选定的分支数据",
                                jp: "選択されたブランチデータを返します",
                                es: "devuelve los datos de la rama seleccionada"
                            },
                            selectNut: {
                                en: "returns the selected donut data",
                                fr: "renvoie les données du graphique en anneau sélectionnées",
                                pt: "retorna os dados do gráfico de rosca selecionado",
                                de: "gibt die ausgewählten Donut-Daten zurück",
                                zh: "返回选定的圆环图数据",
                                jp: "選択されたドーナツ チャート データを返します",
                                es: "devuelve los datos del donut seleccionado"
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
                                es: "devuelve la serie visible actual al seleccionar/deseleccionar la leyenda"
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
                                es: "devuelve el valor de calificación seleccionado como un número"
                            },
                            getData: {
                                en: "call this method from the parent component to get the current rating value",
                                fr: "appelez cette méthode à partir du composant parent pour obtenir la valeur de note actuelle",
                                pt: "chame este método do componente pai para obter o valor da classificação atual",
                                de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um den aktuellen Bewertungswert zu erhalten",
                                zh: "从父组件调用此方法获取当前评分值",
                                jp: "親コンポーネントからこのメソッドを呼び出して、現在の評価値を取得します。",
                                es: "Llame a este método desde el componente principal para obtener el valor de calificación actual."
                            },
                            toggleReadonly: {
                                en: "call this method from the parent component to flip the readonly or active state",
                                fr: "appelez cette méthode à partir du composant parent pour inverser l'état actif ou lecture seule",
                                pt: "chame este método do componente pai para inverter o estado somente leitura ou ativo",
                                de: "Rufen Sie diese Methode von der übergeordneten Komponente aus auf, um den schreibgeschützten oder aktiven Status umzukehren",
                                zh: "从父组件调用此方法可以翻转只读或活动状态",
                                jp: "親コンポーネントからこのメソッドを呼び出して、読み取り専用状態とアクティブ状態を切り替えます。",
                                es: "llame a este método desde el componente principal para cambiar el estado de solo lectura o activo"
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
                        es: "Mostrar más/menos series:"
                    },
                    example: {
                        en: "Example",
                        fr: "Exemple",
                        pt: "Exemplo",
                        de: "Beispiel",
                        zh: "例子",
                        jp: "例",
                        es: "Ejemplo"
                    },                    
                    comments: {
                        relationCircle: {
                            limit: {
                                en: "Number of items to display (basically slices the array from 0 to n)",
                                fr: "Nombre d'éléments à afficher (coupe essentiellement le tableau de 0 à n)",
                                pt: "Número de itens a serem exibidos (basicamente divide o array de 0 a n)",
                                de: "Anzahl der anzuzeigenden Elemente (unterteilt das Array grundsätzlich von 0 bis n)",
                                zh: "要显示的项目数（基本上将数组从 0 分割到 n）",
                                jp: "表示する項目の数 (基本的に配列を 0 から n までスライスします)",
                                es: "Número de elementos a mostrar (básicamente divide la matriz de 0 a n)"
                            },
                            weight: {
                                en: "List the weight of each link in the same order as the relations array",
                                fr: "Répertoriez le poids de chaque lien dans le même ordre que le tableau des relations",
                                pt: "Liste o peso de cada link na mesma ordem da matriz de relações",
                                de: "Listen Sie die Gewichtung jedes Links in derselben Reihenfolge auf wie im Beziehungsarray",
                                zh: "按照与关系数组相同的顺序列出每个链接的权重",
                                jp: "各リンクの重みを関係配列と同じ順序でリストします。",
                                es: "Enumere el peso de cada enlace en el mismo orden que la matriz de relaciones."
                            },
                            relations: {
                                en: "List all the ids of the items linked to this item.",
                                fr: "Répertoriez tous les identifiants des éléments liés à cet élément.",
                                pt: "Liste todos os IDs dos itens vinculados a este item.",
                                de: "Listen Sie alle IDs der mit diesem Artikel verknüpften Artikel auf.",
                                zh: "列出与该项目链接的所有项目的 ID。",
                                jp: "このアイテムにリンクされているアイテムのすべての ID をリストします。",
                                es: "Enumere todos los identificadores de los elementos vinculados a este elemento."
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
                                es: "Un componente para calificar o mostrar resultados de calificación."
                            }
                        },
                        noDataset: {
                            en: "No dataset required",
                            fr: "Aucun dataset requis",
                            pt: "Nenhum dataset é necessário",
                            de: "Kein Datensatz erforderlich",
                            zh: "无需数据集",
                            jp: "データセットは必要ありません",
                            es: "No se requiere conjunto de datos"
                        },
                        optional: {
                            en: "Optional",
                            fr: "Optionnel",
                            pt: "Opcional",
                            de: "Optional",
                            zh: "选修的",
                            jp: "オプション",
                            es: "Opcional"
                        },
                        yourConfigHere: {
                            en: "Your config here",
                            fr: "Votre config ici",
                            pt: "Sua configuração aqui",
                            de: "Ihre Konfiguration hier",
                            zh: "你的配置在这里",
                            jp: "設定はここにあります",
                            es: "Su configuración aquí"
                        },
                        yourDatasetHere: {
                            en: "Your dataset here",
                            fr: "Votre dataset ici",
                            pt: "Sua dataset aqui",
                            de: "Ihr Datensatz hier",
                            zh: "您的数据集位于此处",
                            jp: "データセットはここにあります",
                            es: "Su conjunto de datos aquí"
                        },
                        xy: {
                            shape: {
                                en: "Available since v.1.9.17 for line and plot types. Defaults to 'circle'",
                                fr: "Disponible depuis la v.1.9.17 pour les types de lignes et de tracés. La valeur par défaut est 'circle'",
                                pt: "Disponível desde v.1.9.17 para tipos de linha e plotagem. O padrão é 'circle'",
                                de: "Verfügbar seit Version 1.9.17 für Linien- und Plottypen. Standardmäßig ist „circle“",
                                jp: "v.1.9.17 以降、ライン タイプとプロット タイプで使用できます。デフォルトは「circle」",
                                zh: "自 v.1.9.17 起可用于线条和绘图类型。默认为“circle”",
                                es: "Disponible desde la v.1.9.17 para tipos de línea y gráfico. El valor predeterminado es 'círcle'"
                            },
                            smooth2: {
                                en: "Available since v.1.9.0 for line types, in SVG mode.",
                                fr: "Disponible depuis la v.1.9.0 pour les types lignes, en mode SVG.",
                                pt: "Disponível desde a v.1.9.0 para tipos de linha, no modo SVG.",
                                de: "Verfügbar seit Version 1.9.0 für Linientypen im SVG-Modus.",
                                zh: "自 v.1.9.0 起适用于 SVG 模式下的线型。",
                                jp: "v.1.9.0 以降、SVG モードの線種で使用できます。",
                                es: "Disponible desde la v.1.9.0 para tipos de línea, en modo SVG."
                            },
                            smooth: {
                                en: "Since version 1.9.0, you can set this property on line types to make them curved.",
                                fr: "Depuis la version 1.9.0, vous pouvez définir cette propriété sur les types de lignes pour les rendre courbes.",
                                pt: "Desde a versão 1.9.0, você pode definir esta propriedade em tipos de linha para torná-los curvos.",
                                de: "Seit Version 1.9.0 können Sie diese Eigenschaft für Linientypen festlegen, um sie gekrümmt zu machen.",
                                zh: "从版本 1.9.0 开始，您可以在线类型上设置此属性以使它们弯曲。",
                                jp: "バージョン 1.9.0 以降、線種にこのプロパティを設定して線種を曲線にすることができます。",
                                es: "Desde la versión 1.9.0, puede establecer esta propiedad en tipos de líneas para hacerlas curvas."
                            },
                            area: {
                                en: "Since version v.1.8.7, you can set this property to show an area chart on line types",
                                fr: "Depuis la version v.1.8.7, vous pouvez définir cette propriété pour afficher un graphique en aires sur les types ligne",
                                pt: "Desde a versão v.1.8.7, você pode definir esta propriedade para mostrar um gráfico de área em tipos de linha",
                                de: "Seit Version v.1.8.7 können Sie diese Eigenschaft so einstellen, dass ein Flächendiagramm für Linientypen angezeigt wird",
                                zh: "从版本 v.1.8.7 开始，您可以设置此属性以在线类型上显示面积图",
                                jp: "バージョン v.1.8.7 以降、このプロパティを設定して線種の面グラフを表示できます。",
                                es: "Desde la versión v.1.8.7, puede configurar esta propiedad para mostrar un gráfico de áreas en tipos de línea"
                            },
                            canvas: {
                                description: {
                                    en: "This chart can be displayed as a SVG or a Canvas.",
                                    fr: "Ce graphique peut être affiché au format SVG ou Canvas.",
                                    pt: "Este gráfico pode ser exibido como SVG ou Canvas.",
                                    de: "Dieses Diagramm kann als SVG oder Canvas angezeigt werden.",
                                    zh: "该图表可以显示为 SVG 或 Canvas。",
                                    jp: "このグラフは SVG または Canvas として表示できます。",
                                    es: "Este gráfico se puede mostrar como SVG o Canvas."
                                },
                                moreInfo: {
                                    en: "More info",
                                    fr: "Plus d'informations",
                                    pt: "Mais informações",
                                    de: "Mehr Info",
                                    zh: "更多信息",
                                    jp: "より詳しい情報",
                                    es: "Más información"
                                },
                                detailsDisclaimer: {
                                    en: "In canvas mode, shapes are not yet available for 'line' and 'plot' types",
                                    fr: "En mode canvas, les formes ne sont pas encore disponibles pour les types 'line' et 'plot'",
                                    pt: "No modo de tela, as formas ainda não estão disponíveis para os tipos 'line' e 'plot'",
                                    de: "Im Leinwandmodus sind Formen für die Typen „line“ und „plot“ noch nicht verfügbar",
                                    zh: "在画布模式下，形状尚不可用于“line”和“plot”类型",
                                    jp: "キャンバス モードでは、「line」タイプと「plot」タイプでは形状をまだ使用できません。",
                                    es: "En el modo lienzo, las formas aún no están disponibles para los tipos 'line' y 'plots'"
                                },
                                details: {
                                    en: "By default, the configuration will generate a SVG. If you rather have less nodes in your HTML, you can display the chart as a Canvas. This is an experimental feature, you will need to adapt font sizes and chart padding in the options.",
                                    fr: "Par défaut, la configuration générera un SVG. Si vous préférez avoir moins de nœuds dans votre HTML, vous pouvez afficher le graphique sous forme de canevas. Il s'agit d'une fonctionnalité expérimentale, vous devrez adapter la taille des polices et le remplissage du graphique dans les options.",
                                    pt: "Por padrão, a configuração irá gerar um SVG. Se preferir ter menos nós em seu HTML, você pode exibir o gráfico como um Canvas. Este é um recurso experimental, você precisará adaptar os tamanhos das fontes e o preenchimento do gráfico nas opções.",
                                    de: "Standardmäßig generiert die Konfiguration ein SVG. Wenn Sie weniger Knoten in Ihrem HTML haben möchten, können Sie das Diagramm als Canvas anzeigen. Dies ist eine experimentelle Funktion. Sie müssen die Schriftgröße und den Diagrammabstand in den Optionen anpassen.",
                                    zh: "默认情况下，配置将生成 SVG。如果您希望 HTML 中的节点较少，则可以将图表显示为 Canvas。这是一项实验性功能，您需要在选项中调整字体大小和图表填充。",
                                    jp: "デフォルトでは、設定により SVG が生成されます。 HTML 内のノードを減らしたい場合は、チャートをキャンバスとして表示できます。これは実験的な機能であり、オプションでフォント サイズとグラフのパディングを調整する必要があります。",
                                    es: "De forma predeterminada, la configuración generará un SVG. Si prefiere tener menos nodos en su HTML, puede mostrar el gráfico como un lienzo. Esta es una característica experimental; deberá adaptar los tamaños de fuente y el relleno del gráfico en las opciones."
                                },
                                advantage: {
                                    en: "Advantages",
                                    fr: "Avantages",
                                    pt: "Vantagens",
                                    de: "Vorteile",
                                    zh: "优点",
                                    jp: "利点",
                                    es: "Ventajas"
                                },
                                drawbacks: {
                                    en: "Drawbacks",
                                    fr: "Inconvénients",
                                    pt: "Desvantagens",
                                    de: "Nachteile",
                                    zh: "缺点",
                                    jp: "欠点",
                                    es: "Desventajas"
                                },
                                svgAdvantage: {
                                    en: `<ul class="pl-4"><li class="list-disc">Vectorized: graphics quality remains the same at all scales.</li><li class="list-disc">Acessibility: text nodes can be detected by screen readers.</li><li class="list-disc">Easier debugging, as nodes are part of the DOM</li></ul>`,
                                    fr: `<ul class="pl-4"><li class="list-disc">Vectorisé : la qualité graphique reste la même à toutes les échelles.</li><li class="list-disc">Accessibilité : les nœuds de texte peuvent être détectés par les lecteurs d'écran.</li><li class="list-disc">Débogage plus facile, car les nœuds font partie du DOM</li></ul>`,
                                    pt: `<ul class="pl-4"><li class="list-disc">Vetorizado: a qualidade gráfica permanece a mesma em todas as escalas.</li><li class="list-disc">Acessibilidade: nós de texto podem ser detectados por leitores de tela.</li><li class="list-disc">Depuração mais fácil, pois os nós fazem parte do DOM</li></ul>`,
                                    de: `<ul class="pl-4"><li class="list-disc">Vektorisiert: Die Grafikqualität bleibt in allen Maßstäben gleich.</li><li class="list-disc">Zugänglichkeit: Textknoten können von Screenreadern erkannt werden.</li><li class="list-disc">Einfacheres Debuggen, da Knoten Teil des DOM sind</li></ul>`,
                                    zh: `<ul class="pl-4"><li class="list-disc">矢量化：图形质量在所有比例下保持不变。</li><li class="list-disc">可访问性：屏幕阅读器可以检测到文本节点。</li><li class="list-disc">更容易调试，因为节点是 DOM 的一部分</li></ul>`,
                                    jp: `<ul class="pl-4"><li class="list-disc">ベクトル化: グラフィックスの品質はどのスケールでも同じままです。</li><li class="list-disc">アクセシビリティ: テキスト ノードはスクリーン リーダーによって検出できます。</li><li class="list-disc">ノードは DOM の一部であるため、デバッグが容易になります。</li></ul>`,
                                    es: `<ul class="pl-4"><li class="list-disc">Vectorizado: la calidad de los gráficos sigue siendo la misma en todas las escalas.</li><li class="list-disc">Accesibilidad: los lectores de pantalla pueden detectar nodos de texto.</li><li class="list-disc">Depuración más sencilla, ya que los nodos son parte del DOM</li></ul>`,
                                },
                                svgDrawbacks: {
                                    en: `<ul class="pl-4"><li class="list-disc">Performance decreases with the number of nodes to paint on the HTML</li><li class="list-disc">PDF render can be unpredictable for fonts and styling</li></ul>`,
                                    fr: `<ul class="pl-4"><li class="list-disc">Les performances diminuent avec le nombre de nœuds à peindre sur le HTML</li><li class="list-disc">Le rendu PDF peut être imprévisible pour les polices et le style</li></ul>`,
                                    pt: `<ul class="pl-4"><li class="list-disc">O desempenho diminui com o número de nós a serem pintados no HTML</li><li class="list-disc">A renderização de PDF pode ser imprevisível para fontes e estilos</li></ul>`,
                                    de: `<ul class="pl-4"><li class="list-disc">Die Leistung nimmt mit der Anzahl der Knoten ab, die auf der HTML-Seite gezeichnet werden sollen.</li><li class="list-disc">PDF-Rendering kann durchgeführt werden unvorhersehbar für Schriftarten und Stil</li></ul>`,
                                    zh: `<ul class="pl-4"><li class="list-disc">性能随着 HTML 上绘制的节点数量的增加而降低</li><li class="list-disc">PDF 渲染可能会字体和样式不可预测</li></ul>`,
                                    jp: `<ul class="pl-4"><li class="list-disc">HTML 上に描画するノードの数に応じてパフォーマンスが低下する</li><li class="list-disc">PDF レンダリングでは、フォントとスタイルは予測不可能</li></ul>`,
                                    es: `<ul class="pl-4"><li class="list-disc">El rendimiento disminuye con la cantidad de nodos para pintar en el HTML</li><li class="list-disc">El renderizado PDF se puede impredecible en cuanto a fuentes y estilos</li></ul>`
                                },
                                canvasAdvantages: {
                                    en: `<ul class="pl-4"><li class="list-disc">Stable performance: only one node in the DOM.</li><li class="list-disc">PDF render is identical.</li><li class="list-disc">Can be copy pasted as an image</li></ul>`,
                                    fr: `<ul class="pl-4"><li class="list-disc">Performances stables : un seul nœud dans le DOM.</li><li class="list-disc">Le rendu PDF est identique.< /li><li class="list-disc">Peut être copié-collé sous forme d'image</li></ul>`,
                                    pt: `<ul class="pl-4"><li class="list-disc">Desempenho estável: apenas um nó no DOM.</li><li class="list-disc">A renderização do PDF é idêntica.< /li><li class="list-disc">Pode ser copiado e colado como uma imagem</li></ul>`,
                                    de: `<ul class="pl-4"><li class="list-disc">Stabile Leistung: nur ein Knoten im DOM.</li><li class="list-disc">PDF-Rendering ist identisch.< /li><li class="list-disc">Kann als Bild kopiert und eingefügt werden</li></ul>`,
                                    zh: `<ul class="pl-4"><li class="list-disc">性能稳定：DOM 中只有一个节点。</li><li class="list-disc">PDF 渲染完全相同。< /li><li class="list-disc">可以复制粘贴为图像</li></ul>`,
                                    jp: `<ul class="pl-4"><li class="list-disc">安定したパフォーマンス: DOM 内のノードは 1 つだけです。</li><li class="list-disc">PDF レンダリングは同一です。< /li><li class="list-disc">画像としてコピー＆ペーストできます</li></ul>`,
                                    es: `<ul class="pl-4"><li class="list-disc">Rendimiento estable: solo un nodo en el DOM.</li><li class="list-disc">La representación del PDF es idéntica.< /li><li class="list-disc">Se puede copiar y pegar como imagen</li></ul>`
                                },
                                canvasDrawbacks: {
                                    en: `<ul class="pl-4"><li class="list-disc">Image quality does not scale</li><li class="list-disc">Text elements are not accessible to screen readers</li><li class="list-disc">Harder debugging as the node is empty in the DOM.</li></ul>`,
                                    fr: `<ul class="pl-4"><li class="list-disc">La qualité de l'image n'est pas adaptée</li><li class="list-disc">Les éléments de texte ne sont pas accessibles aux lecteurs d'écran</li ><li class="list-disc">Débogage plus difficile car le nœud est vide dans le DOM.</li></ul>`,
                                    pt: `<ul class="pl-4"><li class="list-disc">A qualidade da imagem não aumenta</li><li class="list-disc">Os elementos de texto não são acessíveis aos leitores de tela</li ><li class="list-disc">Depuração mais difícil porque o nó está vazio no DOM.</li></ul>`,
                                    de: `<ul class="pl-4"><li class="list-disc">Bildqualität lässt sich nicht skalieren</li><li class="list-disc">Textelemente sind für Screenreader nicht zugänglich</li ><li class="list-disc">Schwierigeres Debuggen, da der Knoten im DOM leer ist.</li></ul>`,
                                    zh: `<ul class="pl-4"><li class="list-disc">图像质量无法缩放</li><li class="list-disc">屏幕阅读器无法访问文本元素</li ><li class="list-disc">由于 DOM 中的节点为空，调试更加困难。</li></ul>`,
                                    jp: `<ul class="pl-4"><li class="list-disc">画質が調整されない</li><li class="list-disc">スクリーン リーダーがテキスト要素にアクセスできない</li ><li class="list-disc">DOM 内のノードが空であるため、デバッグが難しくなります。</li></ul>`,
                                    es: `<ul class="pl-4"><li class="list-disc">La calidad de la imagen no escala</li><li class="list-disc">Los lectores de pantalla no pueden acceder a los elementos de texto</li ><li class="list-disc">Depuración más difícil ya que el nodo está vacío en el DOM.</li></ul>`
                                }
                            },
                            type: {
                                en: "The following attributes are optional:",
                                fr: "Les attributs suivants sont optionnels:",
                                pt: "Os seguintes atributos são opcionais:",
                                de: "Die folgenden Attribute sind optional:",
                                zh: "以下属性是可选的：",
                                jp: "次のプロパティはオプションです。",
                                es: "Los siguientes atributos son opcionales:"
                            },
                            color: {
                                en: "If not provided, the default palette will be used by default",
                                fr: "Si elle n'est pas fournie, la palette par défaut sera utilisée par défaut",
                                pt: "o padrão será a paleta padrão se não for fornecida",
                                de: "Wenn nicht angegeben, wird standardmäßig die Standardpalette verwendet",
                                zh: "如果未提供，将默认使用默认调色板",
                                jp: "指定しない場合は、デフォルトのパレットがデフォルトで使用されます。",
                                es: "Si no se proporciona, la paleta predeterminada se utilizará de forma predeterminada."
                            },
                            dashed: {
                                en: "use 'true' on line types to display a dashed line",
                                fr: "utilisez 'true' sur les types de ligne pour afficher une ligne pointillée",
                                pt: "use 'true' em tipos de linha para exibir uma linha tracejada",
                                de: "Verwenden Sie „true“ für Linientypen, um eine gestrichelte Linie anzuzeigen",
                                zh: "在线类型上使用“true”来显示虚线",
                                jp: "破線を表示するには、線種に「true」を使用します。",
                                es: "use 'true' en los tipos de línea para mostrar una línea discontinua"
                            },
                            useTag: {
                                en: "use for line or plot types to show the serie name as a tag",
                                fr: "utiliser pour les types ligne ou points pour afficher le nom de la série sous forme de tag",
                                pt: "use para tipos de linha ou gráfico para mostrar o nome da série como uma tag",
                                de: "Verwenden Sie diese Option für Linien- oder Plottypen, um den Seriennamen als Tag anzuzeigen",
                                zh: "用于线条或绘图类型以将系列名称显示为标签",
                                jp: "シリーズ名をラベルとして表示するためのラインまたはプロット タイプに使用されます。",
                                es: "utilizar para tipos de líneas o gráficos para mostrar el nombre de la serie como una etiqueta"
                            },
                            dataLabels: {
                                en: "hide or show specific serie dataLabels",
                                fr: "masquer ou afficher les étiquettes de données d'une série spécifique",
                                pt: "ocultar ou mostrar dataLabels de séries específicas",
                                de: "Blenden Sie bestimmte Seriendatenbeschriftungen ein oder aus",
                                zh: "隐藏或显示特定系列数据标签",
                                jp: "特定のシリーズのデータ​​ラベルを表示または非表示にする",
                                es: "ocultar o mostrar etiquetas de datos de series específicas"
                            },
                            useProgression: {
                                en: "show a progression line, works for all types",
                                fr: "afficher une ligne de progression, fonctionne pour tous les types",
                                pt: "mostra uma linha de progressão, funciona para todos os tipos",
                                de: "zeigt eine Fortschrittslinie an, funktioniert für alle Typen",
                                zh: "显示进度线，适用于所有类型",
                                jp: "進行線を表示し、すべてのタイプに機能します",
                                es: "muestra una línea de progresión, funciona para todos los tipos"
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
                                es: "mostrar título y leyenda fuera del svg"
                            },
                            hideUnderValue: {
                                en: "hide datalabels under this value",
                                fr: "masquer les étiquettes de données sous cette valeur",
                                pt: "ocultar rótulos de dados sob este valor",
                                de: "Datenbeschriftungen unterhalb dieses Werts ausblenden",
                                zh: "隐藏该值下的数据标签",
                                jp: "この値の下のデータラベルを非表示にします",
                                es: "ocultar etiquetas de datos bajo este valor"
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
                                es: "da como resultado una cuadrícula de 20 x 20"
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
                                es: "debe tener la misma longitud que las categorías"
                            },
                            target: {
                                en: "if not used will default to max value",
                                fr: "s'il n'est pas utilisé, la valeur par défaut sera la valeur maximale",
                                pt: "se não for usado, o padrão será o valor máximo",
                                de: "Wenn es nicht verwendet wird, wird standardmäßig der Maximalwert verwendet",
                                zh: "如果不使用将默认为最大值",
                                jp: "使用しない場合はデフォルトの最大値になります",
                                es: "si no se usa, el valor predeterminado será el máximo"
                            },
                            polygon: {
                                en: "you must provide at least 3 series to create a polygon",
                                fr: "vous devez fournir au moins 3 séries pour créer un polygone",
                                pt: "você deve fornecer pelo menos 3 séries para criar um polígono",
                                de: "Sie müssen mindestens drei Serien bereitstellen, um ein Polygon zu erstellen",
                                zh: "您必须提供至少 3 个系列才能创建多边形",
                                jp: "ポリゴンを作成するには少なくとも 3 つのシリーズを指定する必要があります",
                                es: "debes proporcionar al menos 3 series para crear un polígono"
                            },
                            scale: {
                                en: "Each serie can have its own scale using the target attribute, so you can represent all types of data relations (revenue, satisfaction, percentages...)",
                                fr: "Chaque série peut avoir sa propre échelle grâce à l'attribut target, vous pouvez ainsi représenter tous types de relations de données (revenu, satisfaction, pourcentages...)",
                                pt: "Cada série pode ter sua própria escala usando o atributo target, para que você possa representar todos os tipos de relações de dados (receita, satisfação, percentuais...)",
                                de: "Jede Reihe kann mithilfe des Zielattributs über eine eigene Skala verfügen, sodass Sie alle Arten von Datenbeziehungen (Umsatz, Zufriedenheit, Prozentsätze usw.) darstellen können.",
                                zh: "每个系列都可以使用目标属性拥有自己的比例，因此您可以表示所有类型的数据关系（收入、满意度、百分比...）",
                                jp: "各シリーズはターゲット属性を使用して独自のスケールを持つことができるため、あらゆるタイプのデータ関係 (収益、満足度、パーセンテージなど) を表すことができます。",
                                es: "Cada serie puede tener su propia escala utilizando el atributo objetivo, por lo que se pueden representar todo tipo de relaciones de datos (ingresos, satisfacción, porcentajes...)"
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
                                es: "Se utiliza cuando auto es 'false'"
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
                                es: "Configurar los pasos del medidor"
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
                                es: "Opcional, muestra el valor en la etiqueta de datos."
                            },
                            prefix: {
                                en: "Optional, display a symbol as a prefix before the value in the data label",
                                fr: "Facultatif, afficher un symbole comme préfixe avant la valeur dans l'étiquette de données",
                                pt: "Opcional, exiba um símbolo como prefixo antes do valor no rótulo de dados",
                                de: "Optional können Sie ein Symbol als Präfix vor dem Wert in der Datenbeschriftung anzeigen",
                                zh: "可选，在数据标签中的值之前显示一个符号作为前缀",
                                jp: "オプションで、データラベルの値の前に接頭辞としてシンボルを表示します。",
                                es: "Opcional, muestre un símbolo como prefijo antes del valor en la etiqueta de datos"
                            },
                            suffix: {
                                en: "Optional, display a symbol as a suffix before the value in the data label",
                                fr: "Facultatif, afficher un symbole comme suffixe avant la valeur dans l'étiquette de données",
                                pt: "Opcional, exiba um símbolo como sufixo antes do valor no rótulo de dados",
                                de: "Optional können Sie ein Symbol als Suffix vor dem Wert in der Datenbeschriftung anzeigen",
                                zh: "可选，在数据标签中的值之前显示一个符号作为后缀",
                                jp: "オプションで、データラベルの値の前に接尾辞としてシンボルを表示します。",
                                es: "Opcional, muestre un símbolo como sufijo antes del valor en la etiqueta de datos"
                            },
                            gradient: {
                                en: "works best on a white background for now",
                                fr: "fonctionne mieux sur un fond blanc pour le moment",
                                pt: "funciona melhor em um fundo branco por enquanto",
                                de: "funktioniert derzeit am besten auf einem weißen Hintergrund",
                                zh: "目前在白色背景上效果最好",
                                jp: "今のところ白い背景で最適に動作します",
                                es: "funciona mejor sobre un fondo blanco por ahora"
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
                                es: "Utilice este atributo para desglosar una serie."
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
                                es: "Este orden debe respetarse estrictamente:"
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
                                es: "empezar desde el año más antiguo"
                            },
                            arrayOfEach: {
                                en: "Array of arrays each containing in order:",
                                fr: "Tableau de tableaux contenant chacun dans l'ordre :",
                                pt: "Matriz de matrizes, cada uma contendo em ordem:",
                                de: "Array von Arrays, die jeweils in der Reihenfolge Folgendes enthalten:",
                                zh: "每个数组按顺序包含：",
                                jp: "それぞれが順番に含む配列の配列:",
                                es: "Matriz de matrices, cada una de las cuales contiene en orden:"
                            },
                            cols: {
                                en: "year | age | number women | number men",
                                fr: "année | âge | nombre de femmes | nombre d'hommes",
                                pt: "ano | idade | número de mulheres | número de homens",
                                de: "Jahr | Alter | Anzahl Frauen | Anzahl Männer",
                                zh: "年 |年龄 |女性人数 |人数",
                                jp: "年 |年齢 |数字の女性 |数字の男性",
                                es: "año | edad | número de mujeres | numero hombres"
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
                                es: "Configurar cada columna con un objeto separado"
                            },
                            reference: {
                                en: "reference to the name of another numeric column",
                                fr: "référence au nom d'une autre colonne numérique",
                                pt: "referência ao nome de outra coluna numérica",
                                de: "Verweis auf den Namen einer anderen numerischen Spalte",
                                zh: "引用另一个数字列的名称",
                                jp: "別の数値列の名前への参照",
                                es: "referencia al nombre de otra columna numérica"
                            },
                            body: {
                                en: "each row is represented in an object, leaving room for further config in the future",
                                fr: "chaque ligne est représentée dans un objet, laissant la place à d'autres configurations à l'avenir",
                                pt: "cada linha é representada em um objeto, deixando espaço para configurações adicionais no futuro",
                                de: "Jede Zeile wird in einem Objekt dargestellt, sodass Raum für weitere Konfigurationen in der Zukunft bleibt",
                                zh: "每行都用一个对象表示，为将来的进一步配置留出空间",
                                jp: "各行はオブジェクトで表され、将来さらに構成できる余地が残されています。",
                                es: "cada fila está representada en un objeto, lo que deja espacio para más configuraciones en el futuro"
                            },
                            td: {
                                en: "Each element of the array is placed in the same order as the columns",
                                fr: "Chaque élément du tableau est placé dans le même ordre que les colonnes",
                                pt: "Cada elemento da matriz é colocado na mesma ordem que as colunas",
                                de: "Jedes Element des Arrays wird in derselben Reihenfolge wie die Spalten platziert",
                                zh: "数组的每个元素的放置顺序与列的顺序相同",
                                jp: "配列の各要素は列と同じ順序で配置されます。",
                                es: "Cada elemento de la matriz se coloca en el mismo orden que las columnas."
                            },
                            warning1: {
                                en: "requires an empty array in the body 'td' arrays!",
                                fr: "nécessite un tableau vide dans les tableaux body 'td' !",
                                pt: "requer um array vazio nos arrays 'td' do corpo!",
                                de: "",
                                zh: "需要主体“td”数组中有一个空数组！",
                                jp: "本体の 'td' 配列に空の配列が必要です。",
                                es: "¡Requiere una matriz vacía en las matrices 'td' del body!"
                            },
                            warning2: {
                                en: "notice the empty string, due to a config of the column with isPercentage = true and percentageTo set to another column",
                                fr: "remarquez la chaîne vide, en raison d'une configuration de la colonne avec isPercentage = true et percentTo défini sur une autre colonne",
                                pt: "observe a string vazia, devido a uma configuração da coluna com isPercentage = true e percentageTo definida para outra coluna",
                                de: "erfordert ein leeres Array in den Körper-'td'-Arrays!",
                                zh: "请注意空字符串，因为该列的配置 isPercentage = true 且 PercentageTo 设置为另一列",
                                jp: "isPercentage = true およびpercentageToが別の列に設定されている列の構成により、空の文字列に注目してください。",
                                es: "observe la cadena vacía, debido a una configuración de la columna con isPercentage = true y percentTo establecido en otra columna"
                            },
                            fewRows: {
                                en: "A few rows as an example",
                                fr: "Quelques lignes à titre d'exemple",
                                pt: "Algumas linhas como exemplo",
                                de: "Ein paar Zeilen als Beispiel",
                                zh: "以几行为例",
                                jp: "例としていくつかの行",
                                es: "Algunas filas como ejemplo."
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
                                es: "solo lectura"
                            },
                            active: {
                                en: "active",
                                fr: "actif",
                                pt: "ativo",
                                de: "aktiv",
                                zh: "行动",
                                jp: "アクティブ",
                                es: "activo"
                            },
                            p1: {
                                en: "A component to rate, or display rating results. Shows stars by default, and you can use an image if you prefer. You can display as many stars as you want.",
                                fr: "Un composant pour évaluer ou afficher les résultats de l'évaluation. Affiche les étoiles par défaut et vous pouvez utiliser une image si vous préférez. Vous pouvez afficher autant d'étoiles que vous le souhaitez.",
                                pt: "Um componente para avaliar ou exibir resultados de classificação. Mostra estrelas por padrão e você pode usar uma imagem se preferir. Você pode exibir quantas estrelas quiser.",
                                de: "Eine Komponente zur Auswertung bzw. Anzeige von Auswertungsergebnissen. Zeigt standardmäßig Sterne an. Wenn Sie möchten, können Sie auch ein Bild verwenden. Sie können so viele Sterne anzeigen, wie Sie möchten.",
                                zh: "用于评分或显示评分结果的组件。默认情况下显示星星，如果您愿意，可以使用图像。您可以根据需要显示任意数量的星星。",
                                jp: "スコアリングまたはスコアリング結果の表示に使用されるコンポーネント。デフォルトでは星が表示されますが、必要に応じて画像を使用できます。必要な数の星を表示できます。",
                                es: "Un componente para calificar o mostrar resultados de calificación. Muestra estrellas de forma predeterminada y puedes usar una imagen si lo prefieres. Puedes mostrar tantas estrellas como quieras."
                            },
                            p2: {
                                en: "In the active mode, the rating can be modified by the user. In readonly mode, it just displays the rating.",
                                fr: "En mode actif, la note peut être modifiée par l'utilisateur. En mode lecture seule, il affiche simplement la note.",
                                pt: "No modo ativo, a classificação pode ser modificada pelo usuário. No modo somente leitura, apenas exibe a classificação.",
                                de: "Im aktiven Modus kann die Bewertung vom Benutzer geändert werden. Im schreibgeschützten Modus wird nur die Bewertung angezeigt.",
                                zh: "在主动模式下，用户可以修改评级。在只读模式下，它仅显示评级。",
                                jp: "アクティブ モードでは、ユーザーは評価を変更できます。読み取り専用モードでは、評価のみが表示されます。",
                                es: "En el modo activo, la calificación puede ser modificada por el usuario. En modo de solo lectura, solo muestra la calificación."
                            },
                            simpleRating: {
                                en: "If you have a simple rating to display",
                                fr: "Si vous avez une note simple à afficher",
                                pt: "Se você tiver uma classificação simples para exibir",
                                de: "Wenn Sie eine einfache Bewertung anzeigen möchten",
                                zh: "如果您有一个简单的评级要显示",
                                jp: "表示する簡単な評価がある場合",
                                es: "Si tiene una calificación simple para mostrar"
                            },
                            breakdown: {
                                en: "if you have a breakdown per value",
                                fr: "si vous avez une répartition par valeur",
                                pt: "se você tiver um detalhamento por valor",
                                de: "wenn Sie eine Aufschlüsselung nach Wert haben",
                                zh: "如果您有每个值的细目分类",
                                jp: "それぞれの値の内訳があれば",
                                es: "si tiene un desglose por valor"
                            },
                            calculation: {
                                en: "Rating will be calculated based on the breakdown provided.",
                                fr: "La note sera calculée à partir de la répartition fournie",
                                pt: "A classificação será calculada a partir da discriminação fornecida.",
                                de: "Die Bewertung wird anhand der bereitgestellten Aufschlüsselung berechnet.",
                                zh: "评级将根据提供的细目进行计算。",
                                jp: "評価は提供された内訳に基づいて計算されます。",
                                es: "La calificación se calculará en función del desglose proporcionado."
                            },
                            tooltip: {
                                en: "The tooltip can be enabled, to display the values at the hovered item (use in readonly mode).",
                                fr: "L'info-bulle peut être activée pour afficher les valeurs de l'élément survolé (à utiliser en mode lecture seule).",
                                pt: "A dica de ferramenta pode ser habilitada para exibir os valores no item pairado (use no modo somente leitura).",
                                de: "Der Tooltip kann aktiviert werden, um die Werte am schwebenden Element anzuzeigen (Verwendung im schreibgeschützten Modus).",
                                zh: "可以启用工具提示，以显示悬停项目处的值（在只读模式下使用）。",
                                jp: "ツールチップを有効にすると、ホバーされた項目の値が表示されます (読み取り専用モードで使用)。",
                                es: "La información sobre herramientas se puede habilitar para mostrar los valores en el elemento sobre el que se encuentra (usar en modo de solo lectura)."
                            },
                            useImage: {
                                en: 'or use "image" and provide url in image.src',
                                fr: `ou utilisez "image" et fournissez l'URL dans image.src`,
                                pt: `ou use "image" e forneça o URL em image.src`,
                                de: "oder verwenden Sie „image“ und geben Sie die URL in image.src an",
                                zh: `或使用“image”并在 image.src 中提供 url`,
                                jp: `または、「image」を使用し、image.src に URL を指定します。`,
                                es: `o utilice "image" y proporcione la URL en image.src`
                            },
                            src: {
                                en: "works like the regular src attribute",
                                fr: "fonctionne comme l'attribut src normal",
                                pt: "funciona como o atributo src normal",
                                de: "Funktioniert wie das reguläre src-Attribut",
                                zh: "与常规 src 属性类似",
                                jp: "通常の src 属性と同じように機能します",
                                es: "funciona como el atributo src normal"
                            },
                            alt: {
                                en: "In image mode, the value of each star will be appended to the provided alt text",
                                fr: "En mode image, la valeur de chaque étoile sera ajoutée au texte alt fourni",
                                pt: "No modo de imagem, o valor de cada estrela será anexado ao texto alt fornecido",
                                de: "Im Bildmodus wird der Wert jedes Sterns an den bereitgestellten Alternativtext angehängt",
                                zh: "在图像模式下，每个星星的值将附加到提供的替代文本中",
                                jp: "画像モードでは、各星の値が指定された代替テキストに追加されます。",
                                es: "En el modo de imagen, el valor de cada estrella se agregará al texto alternativo proporcionado."
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
                                es: "Marcadores de posición para mostrar mientras se recuperan sus datos"
                            },
                            smiley: {
                                en: "Use smiley icons instead of stars",
                                fr: "Utilisez des icônes souriantes au lieu d'étoiles",
                                pt: "Use ícones sorridentes em vez de estrelas",
                                de: "Verwenden Sie Smiley-Symbole anstelle von Sternen",
                                zh: "使用笑脸图标代替星星",
                                jp: "星の代わりにスマイリーアイコンを使用する",
                                es: "Utilice íconos sonrientes en lugar de estrellas"
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
                                es: "Intentalo"
                            },
                            yourScreeshot: {
                                en: "Your screenshot will appear here",
                                fr: "Votre capture d'écran apparaîtra ici",
                                pt: "Sua captura de tela aparecerá aqui",
                                de: "Ihr Screenshot wird hier angezeigt",
                                zh: "您的屏幕截图将出现在此处",
                                jp: "スクリーンショットがここに表示されます",
                                es: "Tu captura de pantalla aparecerá aquí."
                            },
                            p1: {
                                en: "A component to take screenshots in the current page, with 2 modes: download or post.",
                                fr: "Un composant pour prendre des captures d'écran dans la page en cours, avec 2 modes : télécharger ou poster",
                                pt: "Um composto para capturar capturas de tela na página atual, com 2 modos: baixar ou post",
                                de: "Eine Komponente zum Erstellen von Screenshots auf der aktuellen Seite mit zwei Modi: Herunterladen oder Posten.",
                                zh: "当前页面截图的组件有两种模式：下载或发布。",
                                jp: "現在のページのスクリーンショットを取得するコンポーネントには、ダウンロードと投稿の 2 つのモードがあります。",
                                es: "Un componente para tomar capturas de pantalla en la página actual, con 2 modos: descargar o publicar."
                            },
                            refresh: {
                                en: "Refresh to view your changes",
                                fr: "Rafraîchir pour visualiser les changements",
                                pt: "Atualize para ver suas alterações",
                                de: "Aktualisieren Sie, um Ihre Änderungen anzuzeigen",
                                zh: "刷新以查看您的更改",
                                jp: "更新して変更内容を確認する",
                                es: "Actualiza para ver tus cambios"
                            },
                            metadata: {
                                en: "In post mode, the following metadata will also be provided:",
                                fr: "En mode post, les métadonnées suivantes seront également fournies :",
                                pt: "No modo post, os seguintes metadados também serão fornecidos:",
                                de: "Der Post-Modus stellt außerdem die folgenden Metadaten bereit:",
                                zh: "在发布模式下，还将提供以下元数据：",
                                jp: "ポストモードでは、次のメタデータも提供されます。",
                                es: "En el modo de publicación, también se proporcionarán los siguientes metadatos:"
                            },
                            quality: {
                                en: "don't set it up too high if you care about image size",
                                fr: "ne le réglez pas trop haut si vous vous souciez de la taille de l'image",
                                pt: "não configure muito alto se você se preocupa com o tamanho da imagem",
                                de: "Stellen Sie den Wert nicht zu hoch ein, wenn Ihnen die Bildgröße wichtig ist",
                                zh: "如果您关心图像尺寸，请不要将其设置得太高",
                                jp: "画像サイズを気にする場合は、あまり高く設定しないでください",
                                es: "no lo configures demasiado alto si le importa el tamaño de la imagen"
                            },
                            x: {
                                en: "the image's top left x coordinate on the page",
                                fr: "la coordonnée x en haut à gauche de l'image sur la page",
                                pt: "a coordenada x superior esquerda da imagem na página",
                                de: "die X-Koordinate oben links im Bild auf der Seite",
                                zh: "图像在页面上的左上角 x 坐标",
                                jp: "ページ上の画像の左上の X 座標",
                                es: "la coordenada x superior izquierda de la imagen en la página"
                            },
                            y: {
                                en: "the image's top left y coordinate on the page",
                                fr: "la coordonnée y en haut à gauche de l'image sur la page",
                                pt: "a coordenada y superior esquerda da imagem na página",
                                de: "die obere linke Y-Koordinate des Bildes auf der Seite",
                                zh: "图像在页面上的左上角 y 坐标",
                                jp: "ページ上の画像の左上の Y 座標",
                                es: "Coordenada y superior izquierda de la imagen en la página."
                            },
                            timestamp: {
                                en: "timestamp",
                                fr: "horodatage",
                                pt: "carimbo de data/hora",
                                de: "Zeitstempel",
                                zh: "时间戳",
                                jp: "タイムスタンプ",
                                es: "marca de tiempo"
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
                                es: "Muestre sus gráficos en un componente de arrastrar y cambiar el tamaño. Los cambios se pueden guardar mediante @change emit."
                            },
                            warning: {
                                en: "On embedded VueUiXy and VueUiCandlestick components, it is recommended to disable the zoom functionality in the config, as it conflicts with the dashboard drag events for now.",
                                fr: "Sur les composants VueUiXy et VueUiCandlestick intégrés, il est recommandé de désactiver la fonctionnalité de zoom dans la configuration, car elle entre en conflit avec les événements de drag du tableau de bord pour le moment.",
                                pt: "Nos componentes incorporados VueUiXy e VueUiCandlestick, é recomendado desabilitar a funcionalidade de zoom na configuração, pois por enquanto ela entra em conflito com os eventos de arrastar do painel.",
                                de: "Für eingebettete VueUiXy- und VueUiCandlestick-Komponenten wird empfohlen, die Zoomfunktion in der Konfiguration zu deaktivieren, da sie vorerst mit den Drag-Ereignissen des Dashboards in Konflikt steht.",
                                zh: "在嵌入式 VueUiXy 和 VueUiCandlestick 组件上，建议在配置中禁用缩放功能，因为它目前与仪表板拖动事件冲突。",
                                jp: "埋め込まれた VueUiXy および VueUiCandlestick コンポーネントでは、現時点ではダッシュボードのドラッグ イベントと競合するため、設定でズーム機能を無効にすることをお勧めします。",
                                es: "En los componentes integrados VueUiXy y VueUiCandlestick, se recomienda desactivar la funcionalidad de zoom en la configuración, ya que por ahora entra en conflicto con los eventos de arrastre del panel."
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
                                    es: "al abrir o cerrar el acordeón, emite el siguiente objeto al componente padre:"
                                },
                                saveAnnotations: {
                                    en: "emits to the parent component the collection of items currently drawn on the annotator, so they can be saved, and injected back into the component 'dataset' prop later. The emit returns the following attributes:",
                                    fr: "émet au composant parent la collection d'éléments actuellement dessinés sur l'annotateur, afin qu'ils puissent être enregistrés et réinjectés ultérieurement dans la prop 'dataset' du composant. L'emit renvoit les attributs suivants :",
                                    pt: "emite para o componente pai a coleção de itens atualmente desenhados no anotador, para que possam ser salvos e injetados de volta no componente 'dataset' posteriormente. A emit retorna os seguintes atributos:",
                                    de: "Gibt die Sammlung der aktuell auf dem Annotator gezeichneten Elemente an die übergeordnete Komponente aus, sodass sie gespeichert und später wieder in die Dataset-Komponentenstütze eingefügt werden können. Emit gibt die folgenden Attribute zurück:",
                                    zh: "向父组件发送当前在注释器上绘制的项目集合，以便可以保存它们，并稍后将其注入回组件“dataset”道具中。发出返回以下属性：",
                                    jp: "アノテーターに現在描画されている項目のコレクションを親コンポーネントに出力します。これにより、それらを保存して、後でコンポーネントの「データセット」プロパティに注入し直すことができます。エミットは次の属性を返します。",
                                    es: "emite al componente principal la colección de elementos actualmente dibujados en el anotador, para que puedan guardarse y volver a inyectarse en el componente 'conjunto de datos' más adelante. El emit devuelve los siguientes atributos:"
                                },
                                calledWhen: {
                                    en: "This emit is called when the user clicks the save button, provided the button is displayed by setting the config.style.showSave to 'true'",
                                    fr: "Cet émetteur est appelé lorsque l'utilisateur clique sur le bouton Enregistrer, à condition que le bouton soit affiché en définissant config.style.showSave sur 'true'.",
                                    pt: "Este emit é chamado quando o usuário clica no botão salvar, desde que o botão seja exibido definindo config.style.showSave como 'true'",
                                    de: "Dieses Emit wird aufgerufen, wenn der Benutzer auf die Schaltfläche „Speichern“ klickt, sofern die Schaltfläche angezeigt wird, indem config.style.showSave auf „true“ gesetzt wird.",
                                    zh: "当用户单击保存按钮时调用此发出，前提是通过将 config.style.showSave 设置为“true”来显示该按钮",
                                    jp: "このエミットは、config.style.showSave を「true」に設定してボタンが表示されている場合に、ユーザーが保存ボタンをクリックしたときに呼び出されます。",
                                    es: "Esta emisión se llama cuando el usuario hace clic en el botón Guardar, siempre que el botón se muestre configurando config.style.showSave en 'true'."
                                }
                            },
                            description: {
                                en: "Add and save annotations on any slotted content. It works with all 'Vue Data UI' charts, but also with any div, svg, canvas element you place inside.",
                                fr: "Ajoutez et enregistrez des annotations sur n'importe quel contenu inséré. Il fonctionne avec tous les graphiques de Vue Data UI, mais également avec n'importe quel élément div, svg, canvas que vous placez à l'intérieur.",
                                pt: "Adicione e salve anotações em qualquer conteúdo com slot. Ele funciona com todos os gráficos de Vue Data UI, mas também com qualquer elemento div, svg ou canvas que você colocar dentro dele.",
                                de: "Fügen Sie allen gesloteten Inhalten Anmerkungen hinzu und speichern Sie diese. Es funktioniert mit allen Vue Data-UI-Diagrammen, aber auch mit jedem Div-, SVG- und Canvas-Element, das Sie darin platzieren.",
                                zh: "在任何开槽内容上添加并保存注释。它适用于所有“Vue Data UI”图表，也适用于您放置在其中的任何 div、svg、canvas 元素。",
                                jp: "スロット付きコンテンツに注釈を追加して保存します。すべての「Vue Data UI」チャートだけでなく、内部に配置したあらゆる div、svg、canvas 要素でも機能します。",
                                es: "Agregue y guarde anotaciones sobre cualquier contenido ranurado. Funciona con todos los gráficos 'Vue Data UI', pero también con cualquier elemento div, svg o lienzo que coloque dentro."
                            },
                            warning: {
                                en: "Touch events are supported since v.1.7.3, but may be glitchy",
                                fr: "Les événements tactiles sont pris en charge depuis la version 1.7.3, mais peuvent présenter des problèmes",
                                pt: "Eventos de toque são suportados desde a v.1.7.3, mas podem apresentar falhas",
                                de: "Touch-Ereignisse werden seit Version 1.7.3 unterstützt, können jedoch fehlerhaft sein",
                                zh: "从 v.1.7.3 开始支持触摸事件，但可能会出现问题",
                                jp: "タッチ イベントは v.1.7.3 以降サポートされていますが、不具合が発生する可能性があります。",
                                es: "Los eventos táctiles son compatibles desde la versión 1.7.3, pero pueden presentar fallos"
                            },
                            closedState: {
                                en: "VueUiAnnotator is in closed state. In the closed state, annotations are invisible, and user interactions with the content is unchanged.",
                                fr: "VueUiAnnotator est dans un état fermé. À l'état fermé, les annotations sont invisibles et les interactions de l'utilisateur avec le contenu restent inchangées.",
                                pt: "VueUiAnnotator está em estado fechado. No estado fechado, as anotações ficam invisíveis e as interações do usuário com o conteúdo permanecem inalteradas.",
                                de: "VueUiAnnotator befindet sich im geschlossenen Zustand. Im geschlossenen Zustand sind Anmerkungen unsichtbar und Benutzerinteraktionen mit dem Inhalt bleiben unverändert.",
                                zh: "VueUiAnnotator 处于关闭状态。在关闭状态下，注释不可见，并且用户与内容的交互保持不变。",
                                jp: "VueUiAnnotator は閉じた状態です。閉じた状態では、注釈は表示されず、コンテンツに対するユーザーの操作は変わりません。",
                                es: "VueUiAnnotator está en estado cerrado. En el estado cerrado, las anotaciones son invisibles y las interacciones del usuario con el contenido no cambian."
                            },
                            openState: {
                                en: "VueUiAnnotator is in open state. In the open state, all interactions with the slotted content are muted, to allow the user to add, move and resize shapes.",
                                fr: "VueUiAnnotator est à l'état ouvert. À l'état ouvert, toutes les interactions avec le contenu inséré sont désactivées, pour permettre à l'utilisateur d'ajouter, de déplacer et de redimensionner des formes.",
                                pt: "VueUiAnnotator está em estado aberto. No estado aberto, todas as interações com o conteúdo com slot são silenciadas, para permitir ao usuário adicionar, mover e redimensionar formas.",
                                de: "VueUiAnnotator befindet sich im geöffneten Zustand. Im geöffneten Zustand sind alle Interaktionen mit dem Slot-Inhalt stummgeschaltet, damit der Benutzer Formen hinzufügen, verschieben und in der Größe ändern kann.",
                                zh: "VueUiAnnotator 处于打开状态。在打开状态下，与开槽内容的所有交互都被静音，以允许用户添加、移动形状和调整形状大小。",
                                jp: "VueUiAnnotator はオープン状態です。開いた状態では、スロット付きコンテンツとのすべてのインタラクションがミュートされ、ユーザーが図形を追加、移動、サイズ変更できるようになります。",
                                es: "VueUiAnnotator está en estado abierto. En el estado abierto, todas las interacciones con el contenido ranurado están silenciadas para permitir al usuario agregar, mover y cambiar el tamaño de las formas."
                            },
                            datastructure: {
                                en: "Saved annotations can be passed to the dataset attribute to be displayed onload. Check the 'EMITS' section to learn how to save annotations.",
                                fr: "Les annotations enregistrées peuvent être transmises à l'attribut de l'ensemble de données pour être affichées lors du chargement. Consultez la section 'emit' pour savoir comment enregistrer des annotations.",
                                pt: "As anotações salvas podem ser passadas para o atributo do conjunto de dados para serem exibidas no carregamento. Verifique a seção 'emit' para saber como salvar anotações.",
                                de: "Gespeicherte Anmerkungen können an das Datensatzattribut übergeben werden, um beim Laden angezeigt zu werden. Im Abschnitt EMITS erfahren Sie, wie Sie Anmerkungen speichern.",
                                zh: "保存的注释可以传递到数据集属性以在加载时显示。查看“EMIT”部分以了解如何保存注释。",
                                jp: "保存されたアノテーションをデータセットのプロパティに渡して、読み込み時に表示することができます。コメントを保存する方法については、「EMIT」セクションを確認してください。",
                                es: "Las anotaciones guardadas se pueden pasar a las propiedades del conjunto de datos para que se muestren al cargar. Consulte la sección 'emit' para saber cómo guardar comentarios."
                            },
                            notByYourself: {
                                en: "Important: you should never have to hardcode this dataset, as you can retrieve it from the component's '@saveAnnotations' emit, to save on your database or localStorage.",
                                fr: "Important : vous ne devriez jamais avoir à coder en dur cet ensemble de données, car vous pouvez le récupérer à partir de l'émission '@saveAnnotations' du composant, pour l'enregistrer sur votre base de données ou localStorage.",
                                pt: "Importante: você nunca deve ter que codificar este conjunto de dados, pois você pode recuperá-lo da emissão '@saveAnnotations' do componente, para salvá-lo em seu banco de dados ou localStorage.",
                                de: "Wichtig: Sie sollten diesen Datensatz nie fest codieren müssen, da Sie ihn aus der @saveAnnotations-Ausgabe der Komponente abrufen können, um ihn in Ihrer Datenbank oder im lokalen Speicher zu speichern.",
                                zh: "重要提示：您永远不必对此数据集进行硬编码，因为您可以从组件的“@saveAnnotations”发出中检索它，以保存在数据库或本地存储中。",
                                jp: "重要: このデータセットはコンポーネントの「@saveAnnotations」出力から取得してデータベースまたは localStorage に保存できるため、ハードコードする必要はありません。",
                                es: "Importante: nunca debería tener que codificar este conjunto de datos, ya que puede recuperarlo de la emisión '@saveAnnotations' del componente para guardarlo en su base de datos o en el localStorage."
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