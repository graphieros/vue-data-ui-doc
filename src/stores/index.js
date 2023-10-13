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