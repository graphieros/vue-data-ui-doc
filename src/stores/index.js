import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            isDarkMode: false,
            isCopy: false,
            hints: {
                pin: 'Pin the chart to the left so you can visualize configuration changes when you scroll.'
            },
            lang: "en",
            translations: {
                tagline: {
                    en: "A user-empowering data visualization Vue components library",
                    fr: "Une bibliothèque de composants Vue de visualisation de données qui autonomise les utilisateurs",
                    pt: "Uma biblioteca de componentes Vue para visualização de dados que capacita o usuário",
                    zh: "一个赋予用户权力的数据可视化Vue组件库",
                    jp: "ユーザーをエンパワーするデータ可視化Vueコンポーネントライブラリ"
                },
                github: {
                    en: "Github repo",
                    fr: "Github repo",
                    pt: "Github repo",
                    zh: "Github",
                    jp: "Github"
                },
                lightMode: {
                    en: "Switch to light mode",
                    fr: "Passer en thème clair",
                    pt: "Mudar para o modo claro",
                    zh: "切换到灯光模式",
                    jp: "ライトモードに切り替える"
                },
                darkMode: {
                    en: "Switch to dark mode",
                    fr: "Passer en thème sombre",
                    pt: "Mudar para o modo escuro",
                    zh: "切换到深色模式",
                    jp: "ダークモードに切り替える"
                },
                menu: {
                    installation: {
                        en: "Installation",
                        fr: "Installation",
                        pt: "Instalação",
                        zh: "安装",
                        jp: "インストール"
                    },
                    docs: {
                        en: "Docs",
                        fr: "Docs",
                        pt: "Documentação",
                        zh: "文档",
                        jp: "ドキュメンテーション"
                    },
                    dashboard: {
                        en: "Dashboard",
                        fr: "Dashboard",
                        pt: "Dashboard",
                        zh: "仪表板",
                        jp: "ダッシュボード"
                    },
                    versions: {
                        en: "Versions",
                        fr: "Versions",
                        pt: "Versões",
                        zh: "版本",
                        jp: "バージョン"
                    },
                    about: {
                        en: "About",
                        fr: "A propos",
                        pt: "Sobre",
                        zh: "关于",
                        jp: "について"
                    }
                },
                installation: {
                    tsUsers: {
                        en: "For TypeScript users: types are available in 'vue-data-ui.d.ts' file under the types folder of the package.",
                        fr: "Typescript: les types sont disponibles dans le fichier 'vue-data-ui.d.ts' dans le dossier 'types' du package.",
                        pt: "Para usuários TypeScript: os tipos estão disponíveis no arquivo 'vue-data-ui.d.ts' na pasta de tipos do package.",
                        zh: "对于 TypeScript 用户：类型可在包的 types 文件夹下的“vue-data-ui.d.ts”文件中找到。",
                        jp: "TypeScript ユーザーの場合: タイプは、パッケージの Types フォルダーにある「vue-data-ui.d.ts」ファイルで入手できます。"
                    },
                    comments: {
                        includeCss: {
                            en: "Include the css",
                            fr: "Inclure le css",
                            pt: "Incluir o css",
                            zh: "包括CSS",
                            jp: "CSSを含める"
                        },
                        global: {
                            en: "You can declare Vue Data UI components globally",
                            fr: "Vous pouvez importer les composants Vue Data UI globalement",
                            pt: "Você pode declarar componentes Vue Data UI globalmente",
                            zh: "您可以全局声明 Vue Data UI 组件",
                            jp: "Vue Data UI コンポーネントはグローバルに宣言できます"
                        },
                        import: {
                            en: "Or you can import just what you need in your files",
                            fr: "Ou vous pouvez juste importer les composants dont vous avez besoin",
                            pt: "Ou você pode importar apenas o que precisa em seus arquivos",
                            zh: "或者您可以从文件中导入您需要的内容",
                            jp: "または、ファイル内の必要なものだけをインポートすることもできます"
                        }
                    }
                },
                about: {
                    p1: {
                        en: "Vue Data UI was born of a single question: if your dashboards are so good, why are your users asking for Excel export features ?",
                        fr: "Vue Data UI est née d'une simple question: si vos dashboards sont si bons, pourquoi les utilisateurs demandent-ils encore des exports Excel ?",
                        pt: "O Vue Data UI nasceu de uma única pergunta: se seus dashboards são tão bons, por que seus usuários estão solicitando recursos de exportação do Excel?",
                        zh: "Vue Data UI 诞生于一个问题：如果你的仪表板这么好，为什么你的用户要求 Excel 导出功能？",
                        jp: "Vue Data UI は 1 つの疑問から生まれました。 「ダッシュボードがそれほど優れているのであれば、なぜユーザーは Excel エクスポート機能を必要とするのでしょうか?」"
                    },
                    p2: {
                        en: "The purpose of this open-source library is to offer end users a set of in-built tools around charts and tables to reduce the friction of having to recompute exported data. Of course, Vue Data UI keeps the option to export to Excel and PDF, just in case.",
                        fr: "Le but de cette bibliothèque open source est d'offrir aux utilisateurs finaux un ensemble d'outils intégrés autour des graphiques et des tableaux pour réduire la friction liée au recalcul des données exportées. Bien entendu, Vue Data UI conserve la possibilité d'exporter vers Excel et PDF, juste au cas où.",
                        pt: "O objetivo desta biblioteca de código aberto é oferecer aos usuários finais um conjunto de ferramentas integradas em gráficos e tabelas para reduzir o atrito de ter que recalcular os dados exportados. Claro, o Vue Data UI mantém a opção de exportar para Excel e PDF, apenas por precaução.",
                        zh: "这个开源库的目的是为最终用户提供一组围绕图表和表格的内置工具，以减少重新计算导出数据的麻烦。当然，Vue Data UI 保留了导出为 Excel 和 PDF 的选项，以防万一。",
                        jp: "このオープン ソース ライブラリの目的は、エクスポートされたデータを再計算する労力を軽減するためのチャートとテーブル用の一連の組み込みツールをエンド ユーザーに提供することです。もちろん、Vue Data UI には、万が一に備えて Excel または PDF にエクスポートするオプションが用意されています。"
                    },
                    p3: {
                        en: "Vue Data UI offers a set of classic chart types, along with new or rare items, such as",
                        fr: "Vue Data UI propose un ensemble de types de graphiques classiques, ainsi que des composants nouveaux ou rares, tels que",
                        pt: "Vue Data UI oferece um conjunto de tipos de gráficos clássicos, junto com itens novos ou raros, como",
                        zh: "Vue Data UI 提供了一组经典的图表类型，以及新的或稀有的项目，例如",
                        jp: "Vue Data UI は、一連の古典的なチャート タイプに加えて、などの新しいアイテムや珍しいアイテムを提供します"
                    },
                    p4: {
                        en: "To make the experience of your dashboards as smooth as possible, Vue Data UI also ships with a set of utilities, such as",
                        fr: "Pour rendre l'expérience de vos tableaux de bord aussi fluide que possible, Vue Data UI est également livré avec un ensemble d'utilitaires, tels que",
                        pt: "Para tornar a experiência de seus painéis o mais tranquila possível, o Vue Data UI também vem com um conjunto de utilitários, como",
                        zh: "为了使仪表板体验尽可能流畅，Vue Data UI 还附带了一组实用程序，例如",
                        jp: "ダッシュボードのエクスペリエンスをできるだけスムーズにするために、Vue Data UI には VueUiScreenshot や VueUiSkeleton などの一連のユーティリティも付属しています。"
                    },
                    maintainers: {
                        en: "Maintainer",
                        fr: "Mainteneur",
                        pt: "Mantenedor",
                        zh: "维护者",
                        jp: "メンテナー"
                    },
                    alp: {
                        en: "Alec Lloyd Probert is a front-end developer, formerly a data analyst, with a strong passion for data visualization and VueJs.",
                        fr: "Alec Lloyd Probert est un développeur front-end, ancien data analyste, passionné par la visualisation de données et VueJs.",
                        pt: "Alec Lloyd Probert é desenvolvedor front-end, ex-analista de dados, com grande paixão por visualização de dados e VueJs.",
                        zh: "Alec Lloyd Probert 是一名前端开发人员和前数据分析师，对数据可视化和 VueJs 充满热情。",
                        jp: "Alec Lloyd Probert は、データ視覚化と VueJs に情熱を注ぐフロントエンド開発者であり、元データ アナリストです。"
                    }
                },
                docs: {
                    props: {
                        en: "2 props are required",
                        fr: "2 props sont requises",
                        pt: "2 props necessários",
                        zh: "需要2个属性",
                        jp: "2 つの属性が必要です"
                    },
                    dataset: {
                        en: "dataset",
                        fr: "dataset",
                        pt: "dataset",
                        zh: "数据集",
                        jp: "データセット"
                    },
                    config: {
                        en: "config",
                        fr: "config",
                        pt: "config",
                        zh: "配置",
                        jp: "構成"
                    },
                    p1: {
                        en: "Documentation pages provide you with a config tab where you can tweak your config and save it as JSON. You can also switch from dark to light themes to save configs for both modes.",
                        fr: "Les pages de documentation vous fournissent un onglet de configuration dans lequel vous pouvez modifier votre configuration et l'enregistrer au format JSON. Vous pouvez également passer des thèmes sombres aux thèmes clairs pour enregistrer les configurations pour les deux modes.",
                        pt: "As páginas de documentação fornecem uma guia de configuração onde você pode ajustar sua configuração e salvá-la como JSON. Você também pode alternar entre temas escuros e claros para salvar as configurações de ambos os modos.",
                        zh: "文档页面为您提供了一个配置选项卡，您可以在其中调整配置并将其保存为 JSON。您还可以从深色主题切换到浅色主题以保存两种模式的配置。",
                        jp: "ドキュメント ページには、構成を調整して JSON として保存できる構成タブが表示されます。ダークテーマからライトテーマに切り替えて、両方のモードの設定を保存することもできます。"
                    },
                    tooltips: {
                        xy: {
                            en: "Lines, bars, plots using classic x and y axis representation",
                            fr: "Lignes, barres, tracés utilisant la représentation classique des axes X et Y",
                            pt: "Linhas, barras, gráficos usando representação clássica dos eixos x e y",
                            zh: "使用经典 x 和 y 轴的线条、条形图、图表",
                            jp: "従来の X 軸と Y 軸を使用した折れ線、棒、グラフ"
                        },
                        donut: {
                            en: "Visualize relative proportions with this classic representation",
                            fr: "Visualisez les proportions relatives avec cette représentation classique",
                            pt: "Visualize proporções relativas com esta representação clássica",
                            zh: "用这种经典的表示方式可视化相对比例",
                            jp: "この古典的な表現で相対的な比率を視覚化します"
                        },
                        waffle: {
                            en: "Reveal outliers and commonality of different measures on the same scale",
                            fr: "Révélez les valeurs aberrantes et les points communs de différentes mesures sur la même échelle",
                            pt: "Revelar valores discrepantes e pontos em comum de diferentes medidas na mesma escala",
                            zh: "揭示同一尺度上不同度量的异常值和共性",
                            jp: "同じスケール上のさまざまな指標にわたる外れ値と共通点を明らかにする"
                        },
                        radar: {
                            en: "Visualize relative proportions with a representation known to be easier to grasp by the human brain",
                            fr: "Visualisez les proportions relatives avec une représentation connue pour être plus facile à saisir par le cerveau humain",
                            pt: "Visualize proporções relativas com uma representação conhecida por ser mais fácil de entender pelo cérebro humano",
                            zh: "使用已知更容易被人脑掌握的表示形式可视化相对比例",
                            jp: "人間の脳にとって理解しやすいことが知られている表現を使用して、相対的な比率を視覚化します。"
                        },
                        quadrant: {
                            en: "Identify patterns and trends to prioritize actions based on the position of data points",
                            fr: "Identifier les modèles et les tendances pour prioriser les actions en fonction de la position des points de données",
                            pt: "Identifique padrões e tendências para priorizar ações com base na posição dos pontos de dados",
                            zh: "识别模式和趋势，根据数据点的位置确定行动的优先级",
                            jp: "パターンと傾向を特定し、データ ポイントの位置に基づいてアクションに優先順位を付けます"
                        },
                        gauge: {
                            en: "Quickly show how well a given metric is performing against a target goal",
                            fr: "Montrez rapidement les performances d'une métrique donnée par rapport à un objectif cible",
                            pt: "Mostre rapidamente o desempenho de uma determinada métrica em relação a uma meta desejada",
                            zh: "快速显示给定指标对目标的执行情况",
                            jp: "特定の指標が目標目標に対してどの程度優れたパフォーマンスを発揮しているかをすぐに示します"
                        },
                        chestnut: {
                            en: "Represent nested information from a general base to detailed breakdowns",
                            fr: "Représenter des informations imbriquées depuis une base générale jusqu'à des ventilations détaillées",
                            pt: "Representar informações aninhadas desde uma base geral até detalhamentos detalhados",
                            zh: "表示从一般基础到详细细分的嵌套信息",
                            jp: "一般的な基礎から詳細なセグメンテーションまでのネストされた情報を表現します"
                        },
                        onion: {
                            en: "Compare the values of multiple categories or groups in a single visualization",
                            fr: "Comparez les valeurs de plusieurs catégories ou groupes dans une seule visualisation",
                            pt: "Compare os valores de diversas categorias ou grupos em uma única visualização",
                            zh: "在单个可视化中比较多个类别或组的值",
                            jp: "単一のビジュアライゼーションで複数のカテゴリまたはグループの値を比較します"
                        },
                        verticalBar: {
                            en: "Compare different categorical or discrete variables, with the option to show their breakdowns",
                            fr: "Comparez différentes variables catégorielles ou discrètes, avec la possibilité d'afficher leurs répartitions",
                            pt: "Compare diferentes variáveis ​​categóricas ou discretas, com a opção de mostrar seus detalhamentos",
                            zh: "比较不同的分类或离散变量，并可选择显示其细分",
                            jp: "さまざまなカテゴリ変数または離散変数を、その内訳を表示するオプションを使用して比較します。"
                        },
                        heatmap: {
                            en: "Show relationships and patterns between two variables by observing how cell colors change across each axis",
                            fr: "Montrez les relations et les modèles entre deux variables en observant comment les couleurs des cellules changent sur chaque axe",
                            pt: "Mostre relações e padrões entre duas variáveis ​​observando como as cores das células mudam em cada eixo",
                            zh: "通过观察细胞颜色在每个轴上的变化来显示两个变量之间的关系和模式",
                            jp: "各軸でセルの色がどのように変化するかを観察することで、2 つの変数間の関係とパターンを表示します"
                        },
                        scatter: {
                            en: "From a large dataset, reveal the correlation between two variables",
                            fr: "À partir d'un grand ensemble de données, révélez la corrélation entre deux variables",
                            pt: "A partir de um grande conjunto de dados, revele a correlação entre duas variáveis",
                            zh: "从大型数据集中揭示两个变量之间的相关性",
                            jp: "大規模なデータセットから 2 つの変数間の相関関係を明らかにする"
                        },
                        candlestick: {
                            en: "Determine possible price movements based on past patterns",
                            fr: "Déterminer les mouvements de prix possibles en fonction des modèles passés",
                            pt: "Determine possíveis movimentos de preços com base em padrões anteriores",
                            zh: "根据过去的模式确定可能的价格变动",
                            jp: "過去のパターンに基づいて起こり得る値動きを判断する"
                        },
                        agePyramid: {
                            en: "Show how populations are composed and how they are changing",
                            fr: "Montrer comment les populations sont composées et comment elles évoluent",
                            pt: "Mostre como as populações são compostas e como estão mudando",
                            zh: "显示人口的组成方式及其变化情况",
                            jp: "人口がどのように構成され、どのように変化しているかを示す"
                        },
                        sparkline: {
                            en: "Visualize evolution on a tiny line chart",
                            fr: "Visualisez l'évolution sur un petit graphique linéaire",
                            pt: "Visualize a evolução em um pequeno gráfico de linhas",
                            zh: "在微小的折线图上可视化进化",
                            jp: "小さな折れ線グラフで進化を視覚化する"
                        },
                        sparkbar: {
                            en: "Show kpi performance with a tiny vertical bar chart",
                            fr: "Afficher les performances des KPI avec un petit graphique à barres verticales",
                            pt: "Mostre o desempenho do KPI com um pequeno gráfico de barras verticais",
                            zh: "用微小的垂直条形图显示关键绩效指标",
                            jp: "主要業績評価指標を小さな縦棒グラフで表示します"
                        },
                        table: {
                            en: "Powerful dynamic table that allows the user to select data and calculate sums, averages, and visualize charts based on their selection",
                            fr: "Tableau dynamique puissant qui permet à l'utilisateur de sélectionner des données et de calculer des sommes, des moyennes et de visualiser des graphiques en fonction de leur sélection",
                            pt: "Tabela dinâmica poderosa que permite ao usuário selecionar dados e calcular somas, médias e visualizar gráficos com base em sua seleção",
                            zh: "强大的动态表，允许用户选择数据并计算总和、平均值，并根据他们的选择可视化图表",
                            jp: "ユーザーがデータを選択し、選択に基づいて合計、平均、視覚的なグラフを計算できる強力な動的テーブル"
                        },
                        rating: {
                            en: "A classic rating component to rate or visualize rating results. Control the number of stars to display, and their shape",
                            fr: "Un composant de notation classique pour noter ou visualiser les résultats de la notation. Contrôlez le nombre d'étoiles à afficher et leur forme",
                            pt: "Um componente de classificação clássico para avaliar ou visualizar resultados de classificação. Controle o número de estrelas a serem exibidas e sua forma",
                            zh: "用于对评级结果进行评级或可视化的经典评级组件。控制要显示的星星数量及其形状",
                            jp: "評価または評価結果を視覚化するための古典的な評価コンポーネント。表示する星の数とその形を制御する"
                        },
                        screenshot: {
                            en: "Select an area on the screen and either download or post the image as base64 with additional metadata",
                            fr: "Sélectionnez une zone sur l'écran et téléchargez ou publiez l'image en base64 avec des métadonnées supplémentaires",
                            pt: "Selecione uma área na tela e baixe ou publique a imagem como base64 com metadados adicionais",
                            zh: "选择屏幕上的一个区域，然后下载或发布带有附加元数据的 Base64 图像",
                            jp: "画面上の領域を選択し、追加のメタデータを含む画像をダウンロードするか、base64 として投稿します。"
                        },
                        skeleton: {
                            en: "Display gorgeous skeleton charts while data is loading",
                            fr: "Affichez de superbes graphiques squelettes pendant le chargement des données",
                            pt: "Exiba lindos gráficos de esqueleto enquanto os dados estão sendo carregados",
                            zh: "数据加载时显示华丽的骨架图",
                            jp: "データのロード中に豪華なスケルトン チャートを表示"
                        },
                    },
                    datastructure: {
                        en: "Datastructure",
                        fr: "Structure des données",
                        pt: "Estrutura de dados",
                        zh: "数据结构",
                        jp: "データ構造"
                    },
                    copyDefaultConfig: {
                        en: "Copy default config as JSON",
                        fr: "Copier la configuration par défaut au format JSON",
                        pt: "Copie a configuração padrão como JSON",
                        zh: "将默认配置复制为 JSON",
                        jp: "デフォルト設定をJSONとしてコピー"
                    },
                    copyThisConfig: {
                        en: "Copy this config as JSON",
                        fr: "Copier cette config en JSON",
                        pt: "Copie esta configuração como JSON",
                        zh: "将此配置复制为 JSON",
                        jp: "この構成を JSON としてコピーします"
                    },
                    reset: {
                        en: "Reset",
                        fr: "Réinitialiser",
                        pt: "Reiniciar",
                        zh: "重置",
                        jp: "リセット"
                    },
                    cssOverride: {
                        en: "You can override the css (check out the styles.css in the package)",
                        fr: "Vous pouvez remplacer le CSS (consultez le styles.css dans le package)",
                        pt: "Você pode substituir o CSS (consulte estilos.css no package)",
                        zh: "您可以重新使用 CSS（在包中查看 styles.css）",
                        jp: "CSS を再配置する (styles.css とパッケージを参照)"
                    },
                    emits: {
                        xy: {
                            selectLegend: {
                                en: "returns the current visible series when selecting / unselecting the legend:",
                                fr: "renvoie la série visible actuelle lors de la sélection/désélection de la légende :",
                                pt: "retorna a série visível atual ao selecionar/desmarcar a legenda:",
                                zh: "选择/取消选择图例时返回当前可见系列：",
                                jp: "凡例を選択または選択解除するときに、現在表示されているシリーズを返します。"
                            },
                            selectX: {
                                en: "returns the current visible series at the selected x index when clicking on the chart :",
                                fr: "renvoie la série visible actuelle à l'index x sélectionné en cliquant sur le graphique :",
                                pt: "retorna a série visível atual no índice x selecionado ao clicar no gráfico:",
                                zh: "单击图表时返回所选 x 索引处的当前可见系列：",
                                jp: "チャートをクリックすると、選択された x インデックスで現在表示されているシリーズが返されます。"
                            },
                            getData: {
                                en: "call this method from the parent to get the full formatted dataset.",
                                fr: "appelez cette méthode depuis le parent pour obtenir l'ensemble de données entièrement formaté.",
                                pt: "chame esse método do pai para obter o conjunto de dados formatado completo.",
                                zh: "从父级调用此方法以获取完整格式化的数据集。",
                                jp: "完全なフォーマット済みデータセットを取得するには、親からこのメソッドを呼び出します。"
                            }
                        }
                    },
                    comments: {
                        yourConfigHere: {
                            en: "Your config here",
                            fr: "Votre config ici",
                            pt: "Sua configuração aqui",
                            zh: "你的配置在这里",
                            jp: "設定はここにあります",
                        },
                        yourDatasetHere: {
                            en: "Your dataset here",
                            fr: "Votre dataset ici",
                            pt: "Sua dataset aqui",
                            zh: "您的数据集位于此处",
                            jp: "データセットはここにあります",
                        },
                        xy: {
                            type: {
                                en: "The following attributes are optional:",
                                fr: "Les attributs suivants sont optionnels:",
                                pt: "Os seguintes atributos são opcionais:",
                                zh: "以下属性是可选的：",
                                jp: "次のプロパティはオプションです。"
                            },
                            color: {
                                en: "If not provided, the default palette will be used by default",
                                fr: "Si elle n'est pas fournie, la palette par défaut sera utilisée par défaut",
                                pt: "o padrão será a paleta padrão se não for fornecida",
                                zh: "如果未提供，将默认使用默认调色板",
                                jp: "指定しない場合は、デフォルトのパレットがデフォルトで使用されます。"
                            },
                            dashed: {
                                en: "use 'true' on line types to display a dashed line",
                                fr: "utilisez 'true' sur les types de ligne pour afficher une ligne pointillée",
                                pt: "use 'true' em tipos de linha para exibir uma linha tracejada",
                                zh: "在线类型上使用“true”来显示虚线",
                                jp: "破線を表示するには、線種に「true」を使用します。"
                            },
                            useTag: {
                                en: "use for line or plot types to show the serie name as a tag",
                                fr: "utiliser pour les types ligne ou points pour afficher le nom de la série sous forme de tag",
                                pt: "use para tipos de linha ou gráfico para mostrar o nome da série como uma tag",
                                zh: "用于线条或绘图类型以将系列名称显示为标签",
                                jp: "シリーズ名をラベルとして表示するためのラインまたはプロット タイプに使用されます。"
                            },
                            dataLabels: {
                                en: "hide or show specific serie dataLabels",
                                fr: "masquer ou afficher les étiquettes de données d'une série spécifique",
                                pt: "ocultar ou mostrar dataLabels de séries específicas",
                                zh: "隐藏或显示特定系列数据标签",
                                jp: "特定のシリーズのデータ​​ラベルを表示または非表示にする"
                            },
                            useProgression: {
                                en: "show a progression line, works for all types",
                                fr: "afficher une ligne de progression, fonctionne pour tous les types",
                                pt: "mostra uma linha de progressão, funciona para todos os tipos",
                                zh: "显示进度线，适用于所有类型",
                                jp: "進行線を表示し、すべてのタイプに機能します"
                            },
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