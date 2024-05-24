import { defineStore } from "pinia";

export const useCaseStore = defineStore("cases", {
    state: () => {
        return {
            code: {
                en: "View code",
                fr: "Voir le code",
                pt: "Ver código",
                de: "Code ansehen",
                zh: "查看代码",
                jp: "コードを表示する",
                es: "Ver código",
                ko: "코드 보기"
            },
            SPARKLINE_SLOT: {
                title: {
                    en: "Usage of the #before 'slot'",
                    fr: `Utilisation du #before 'slot'`,
                    pt: "Uso do #before 'slot'",
                    de: "Verwendung des #before 'Slot'",
                    zh: "#before 'slot' 的用法",
                    jp: "#before 'slot' の使用法",
                    es: "Uso del #before 'slot'",
                    ko: "#before '슬롯' 사용법"
                },
                description: {
                    en: "Customize your presentation with additional data provided by the 'slot'",
                    fr: "Personnalisez votre présentation avec des données supplémentaires fournies par le « slot »",
                    pt: "Personalize sua apresentação com dados adicionais fornecidos pelo ‘slot’",
                    de: "Passen Sie Ihre Präsentation mit zusätzlichen Daten an, die vom „Slot“ bereitgestellt werden.",
                    zh: "使用“插槽”提供的附加数据自定义您的演示文稿",
                    jp: "「スロット」によって提供される追加データを使用してプレゼンテーションをカスタマイズします",
                    es: "Personaliza tu presentación con datos adicionales proporcionados por el 'slot'",
                    ko: "'슬롯'에서 제공하는 추가 데이터로 프레젠테이션을 맞춤설정하세요."
                }
            },
            DONUT_PIE: {
                title: {
                    en: "I'd rather have a pie",
                    fr: "Je préfère un camembert",
                    pt: "Eu prefiro uma torta",
                    de: "Ich hätte lieber einen Kuchen",
                    zh: "我宁愿吃个馅饼",
                    jp: "むしろパイを食べたいです",
                    es: "Prefiero un pastel",
                    ko: "차라리 파이를 먹고 싶어"
                },
                description: {
                    en: "If for some reason a pie chart is what you need, the configuration can be tweaked to achieve this result.",
                    fr: "Si, pour une raison quelconque, vous avez besoin d'un diagramme circulaire, la configuration peut être modifiée pour obtenir ce résultat.",
                    pt: "Se por algum motivo você precisa de um gráfico de pizza, a configuração pode ser ajustada para alcançar esse resultado.",
                    de: "Wenn Sie aus irgendeinem Grund ein Kreisdiagramm benötigen, können Sie die Konfiguration anpassen, um dieses Ergebnis zu erzielen.",
                    zh: "如果由于某种原因您需要饼图，则可以调整配置以获得此结果。",
                    jp: "何らかの理由で円グラフが必要な場合は、構成を調整してこの結果を達成できます。",
                    es: "Si por alguna razón lo que necesita es un gráfico circular, la configuración se puede modificar para lograr este resultado.",
                    ko: "어떤 이유로 원형 차트가 필요한 경우 구성을 조정하여 이 결과를 얻을 수 있습니다."
                }
            },
            XY_MULTIPLE_Y_AXES: {
                title: {
                    en: "Multiple Y axes scales",
                    fr: "Échelles de plusieurs axes Y",
                    pt: "Escalas de múltiplos eixos Y",
                    de: "Mehrere Y-Achsen-Skalen",
                    zh: "多个 Y 轴刻度",
                    jp: "複数の Y 軸スケール",
                    es: "Escalas de múltiples ejes Y",
                    ko: "다중 Y축 스케일"
                },
                description: {
                    en: "Sometimes it is necessary to show datapoints with different orders of magnitude on the same chart, to analyze possible correlations.",
                    fr: "Parfois, il est nécessaire d'afficher des points de données avec différents ordres de grandeur sur le même graphique, pour analyser les corrélations possibles.",
                    pt: "Às vezes é necessário mostrar pontos de dados com diferentes ordens de grandeza no mesmo gráfico, para analisar possíveis correlações.",
                    de: "Manchmal ist es notwendig, Datenpunkte mit unterschiedlichen Größenordnungen im selben Diagramm anzuzeigen, um mögliche Korrelationen zu analysieren.",
                    zh: "有时需要在同一张图表上显示不同数量级的数据点，以分析可能的相关性。",
                    jp: "場合によっては、考えられる相関関係を分析するために、同じチャート上に桁の異なるデータポイントを表示する必要があります。",
                    es: "A veces es necesario mostrar puntos de datos con diferentes órdenes de magnitud en el mismo gráfico para analizar posibles correlaciones.",
                    ko: "때로는 가능한 상관 관계를 분석하기 위해 동일한 차트에 크기가 다른 데이터 포인트를 표시해야 하는 경우가 있습니다."
                }
            },
            XY_STACKED: {
                title: {
                    en: "Stacked, with multiple Y axes scales",
                    fr: "Empilé, avec plusieurs échelles d'axes Y",
                    pt: "Empilhados, com múltiplas escalas de eixos Y",
                    de: "Gestapelt, mit mehreren Y-Achsenskalen",
                    zh: "堆叠式，具有多个 Y 轴刻度",
                    jp: "複数の Y 軸スケールを備えたスタック型",
                    es: "Apiladas, con múltiples escalas de ejes Y",
                    ko: "여러 개의 Y축 스케일을 사용하여 누적됨"
                },
                description: {
                    en: "Sometimes it is better to show every datapoint on a dedicated area of the chart, to highlight correlations and variations.",
                    fr: "Parfois, il est préférable d'afficher chaque point de données sur une zone dédiée du graphique, pour mettre en évidence les corrélations et les variations.",
                    pt: "Às vezes é melhor mostrar cada ponto de dados em uma área dedicada do gráfico, para destacar correlações e variações.",
                    de: "Manchmal ist es besser, jeden Datenpunkt in einem speziellen Bereich des Diagramms anzuzeigen, um Korrelationen und Variationen hervorzuheben.",
                    zh: "有时，最好在图表的专用区域上显示每个数据点，以突出显示相关性和变化。",
                    jp: "場合によっては、相関関係や変動を強調するために、チャートの専用領域にすべてのデータポイントを表示する方がよい場合があります。",
                    es: "A veces es mejor mostrar cada punto de datos en un área dedicada del gráfico para resaltar correlaciones y variaciones.",
                    ko: "때로는 상관 관계와 변형을 강조하기 위해 차트의 전용 영역에 모든 데이터 포인트를 표시하는 것이 더 나을 때도 있습니다."
                }
            },
            XY_STACKED_AUTOSCALE: {
                title: {
                    en: "Stacked, with multiple Y axes and custom height",
                    fr: "Empilé, avec plusieurs axes Y et hauteur personnalisée",
                    pt: "Empilhado, com vários eixos Y e altura personalizada",
                    de: "Gestapelt, mit mehreren Y-Achsen und individueller Höhe",
                    zh: "堆叠式，具有多个 Y 轴和自定义高度",
                    jp: "複数の Y 軸とカスタム高さを備えたスタック型",
                    es: "Apilados, con múltiples ejes Y y altura personalizada",
                    ko: "여러 개의 Y축과 사용자 정의 높이가 있는 스택형"
                },
                description: {
                    en: "Some series might need more real estate.",
                    fr: "Certaines séries pourraient nécessiter davantage d’espace.",
                    pt: "Algumas séries podem precisar de mais espaço.",
                    de: "Einige Serien benötigen möglicherweise mehr Platz.",
                    zh: "某些系列可能需要更多空间。",
                    jp: "シリーズによっては、より多くの領域が必要になる場合があります。",
                    es: "Es posible que algunas series necesiten más espacio.",
                    ko: "일부 시리즈에는 더 많은 공간이 필요할 수 있습니다."
                }
            }
        }
    }
})