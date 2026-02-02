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
                ja: "コードを表示する",
                es: "Ver código",
                ko: "코드 보기",
                ar: 'عرض الرمز'
            },
            SCATTER_LARGE: {
                title: {
                    en: 'Performance mode',
                    fr: 'Mode performance',
                    pt: 'Modo de desempenho',
                    de: 'Leistungsmodus',
                    zh: '性能模式',
                    ja: 'パフォーマンスモード',
                    es: 'Modo de rendimiento',
                    ko: '성능 모드',
                    ar: 'وضع الأداء',
                },
                description: {
                    en: 'Keep your chart performant when displaying a huge amount of datapoints, with performance mode.',
                    fr: 'Gardez votre graphique performant lors de l’affichage d’un grand nombre de points de données grâce au mode performance.',
                    pt: 'Mantenha seu gráfico eficiente ao exibir uma grande quantidade de pontos de dados com o modo de desempenho.',
                    de: 'Halten Sie Ihr Diagramm mit dem Leistungsmodus auch bei einer großen Menge an Datenpunkten leistungsfähig.',
                    zh: '在显示大量数据点时，使用性能模式保持图表的高效。',
                    ja: '大量のデータポイントを表示する際も、パフォーマンスモードでグラフの性能を維持します。',
                    es: 'Mantén tu gráfico eficiente al mostrar una gran cantidad de puntos de datos con el modo de rendimiento.',
                    ko: '많은 데이터 포인트를 표시할 때 성능 모드로 차트의 성능을 유지하세요.',
                    ar: 'حافظ على أداء الرسم البياني عند عرض عدد كبير من نقاط البيانات باستخدام وضع الأداء.',
                }
            },
            XY_FIXED_SCALE: {
                title: {
                    en: 'Force min and max yAxis scales',
                    fr: 'Forcer les échelles min et max de l\'axe des ordonnées',
                    pt: 'Forçar escalas mínimas e máximas do eixo Y',
                    de: 'Minimale und maximale y-Achsen-Skalen erzwingen',
                    zh: '强制最小和最大 y 轴刻度',
                    ja: 'Y軸の最小値と最大値のスケールを強制する',
                    es: 'Forzar escalas mínimas y máximas del eje Y',
                    ko: 'y축 최소 및 최대 스케일 강제 설정',
                    ar: 'فرض الحد الأدنى والأقصى لمقاييس المحور Y'
                },
            },
            SPARKLINE_SLOT: {
                title: {
                    en: "Usage of the #before 'slot'",
                    fr: `Utilisation du #before 'slot'`,
                    pt: "Uso do #before 'slot'",
                    de: "Verwendung des #before 'Slot'",
                    zh: "#before 'slot' 的用法",
                    ja: "#before 'slot' の使用法",
                    es: "Uso del #before 'slot'",
                    ko: "#before '슬롯' 사용법",
                    ar: 'استخدام #قبل "الفتحة"'
                },
                description: {
                    en: "Customize your presentation with additional data provided by the 'slot'",
                    fr: "Personnalisez votre présentation avec des données supplémentaires fournies par le « slot »",
                    pt: "Personalize sua apresentação com dados adicionais fornecidos pelo ‘slot’",
                    de: "Passen Sie Ihre Präsentation mit zusätzlichen Daten an, die vom „Slot“ bereitgestellt werden.",
                    zh: "使用“插槽”提供的附加数据自定义您的演示文稿",
                    ja: "「スロット」によって提供される追加データを使用してプレゼンテーションをカスタマイズします",
                    es: "Personaliza tu presentación con datos adicionales proporcionados por el 'slot'",
                    ko: "'슬롯'에서 제공하는 추가 데이터로 프레젠테이션을 맞춤설정하세요.",
                    ar: 'قم بتخصيص العرض التقديمي الخاص بك باستخدام البيانات الإضافية التي توفرها "الفتحة"'
                }
            },
            DONUT_PIE: {
                title: {
                    en: "I'd rather have a pie",
                    fr: "Je préfère un camembert",
                    pt: "Eu prefiro uma torta",
                    de: "Ich hätte lieber einen Kuchen",
                    zh: "我宁愿吃个馅饼",
                    ja: "むしろパイを食べたいです",
                    es: "Prefiero un pastel",
                    ko: "차라리 파이를 먹고 싶어",
                    ar: 'أفضل أن أحصل على فطيرة'
                },
                description: {
                    en: "If for some reason a pie chart is what you need, the configuration can be tweaked to achieve this result.",
                    fr: "Si, pour une raison quelconque, vous avez besoin d'un diagramme circulaire, la configuration peut être modifiée pour obtenir ce résultat.",
                    pt: "Se por algum motivo você precisa de um gráfico de pizza, a configuração pode ser ajustada para alcançar esse resultado.",
                    de: "Wenn Sie aus irgendeinem Grund ein Kreisdiagramm benötigen, können Sie die Konfiguration anpassen, um dieses Ergebnis zu erzielen.",
                    zh: "如果由于某种原因您需要饼图，则可以调整配置以获得此结果。",
                    ja: "何らかの理由で円グラフが必要な場合は、構成を調整してこの結果を達成できます。",
                    es: "Si por alguna razón lo que necesita es un gráfico circular, la configuración se puede modificar para lograr este resultado.",
                    ko: "어떤 이유로 원형 차트가 필요한 경우 구성을 조정하여 이 결과를 얻을 수 있습니다.",
                    ar: 'إذا كنت تحتاج إلى مخطط دائري لسبب ما، فيمكن تعديل التكوين لتحقيق هذه النتيجة'
                }
            },
            XY_MULTIPLE_Y_AXES: {
                title: {
                    en: "Multiple Y axes scales",
                    fr: "Échelles de plusieurs axes Y",
                    pt: "Escalas de múltiplos eixos Y",
                    de: "Mehrere Y-Achsen-Skalen",
                    zh: "多个 Y 轴刻度",
                    ja: "複数の Y 軸スケール",
                    es: "Escalas de múltiples ejes Y",
                    ko: "다중 Y축 스케일",
                    ar: 'مقاييس متعددة المحاور Y'
                },
                description: {
                    en: "Sometimes it is necessary to show datapoints with different orders of magnitude on the same chart, to analyze possible correlations.",
                    fr: "Parfois, il est nécessaire d'afficher des points de données avec différents ordres de grandeur sur le même graphique, pour analyser les corrélations possibles.",
                    pt: "Às vezes é necessário mostrar pontos de dados com diferentes ordens de grandeza no mesmo gráfico, para analisar possíveis correlações.",
                    de: "Manchmal ist es notwendig, Datenpunkte mit unterschiedlichen Größenordnungen im selben Diagramm anzuzeigen, um mögliche Korrelationen zu analysieren.",
                    zh: "有时需要在同一张图表上显示不同数量级的数据点，以分析可能的相关性。",
                    ja: "場合によっては、考えられる相関関係を分析するために、同じチャート上に桁の異なるデータポイントを表示する必要があります。",
                    es: "A veces es necesario mostrar puntos de datos con diferentes órdenes de magnitud en el mismo gráfico para analizar posibles correlaciones.",
                    ko: "때로는 가능한 상관 관계를 분석하기 위해 동일한 차트에 크기가 다른 데이터 포인트를 표시해야 하는 경우가 있습니다.",
                    ar: 'في بعض الأحيان يكون من الضروري إظهار نقاط بيانات بأحجام مختلفة على نفس الرسم البياني لتحليل الارتباطات المحتملة'
                }
            },
            XY_STACKED: {
                title: {
                    en: "Stacked, with multiple Y axes scales",
                    fr: "Empilé, avec plusieurs échelles d'axes Y",
                    pt: "Empilhados, com múltiplas escalas de eixos Y",
                    de: "Gestapelt, mit mehreren Y-Achsenskalen",
                    zh: "堆叠式，具有多个 Y 轴刻度",
                    ja: "複数の Y 軸スケールを備えたスタック型",
                    es: "Apiladas, con múltiples escalas de ejes Y",
                    ko: "여러 개의 Y축 스케일을 사용하여 누적됨",
                    ar: 'مكدسة بمقاييس محاور Y متعددة'
                },
                description: {
                    en: "Sometimes it is better to show every datapoint on a dedicated area of the chart, to highlight correlations and variations.",
                    fr: "Parfois, il est préférable d'afficher chaque point de données sur une zone dédiée du graphique, pour mettre en évidence les corrélations et les variations.",
                    pt: "Às vezes é melhor mostrar cada ponto de dados em uma área dedicada do gráfico, para destacar correlações e variações.",
                    de: "Manchmal ist es besser, jeden Datenpunkt in einem speziellen Bereich des Diagramms anzuzeigen, um Korrelationen und Variationen hervorzuheben.",
                    zh: "有时，最好在图表的专用区域上显示每个数据点，以突出显示相关性和变化。",
                    ja: "場合によっては、相関関係や変動を強調するために、チャートの専用領域にすべてのデータポイントを表示する方がよい場合があります。",
                    es: "A veces es mejor mostrar cada punto de datos en un área dedicada del gráfico para resaltar correlaciones y variaciones.",
                    ko: "때로는 상관 관계와 변형을 강조하기 위해 차트의 전용 영역에 모든 데이터 포인트를 표시하는 것이 더 나을 때도 있습니다.",
                    ar: 'في بعض الأحيان يكون من الأفضل إظهار كل نقطة بيانات في منطقة مخصصة من المخطط، لتسليط الضوء على الارتباطات والاختلافات'
                }
            },
            XY_STACKED_AUTOSCALE: {
                title: {
                    en: "Stacked, with multiple Y axes and custom height",
                    fr: "Empilé, avec plusieurs axes Y et hauteur personnalisée",
                    pt: "Empilhado, com vários eixos Y e altura personalizada",
                    de: "Gestapelt, mit mehreren Y-Achsen und individueller Höhe",
                    zh: "堆叠式，具有多个 Y 轴和自定义高度",
                    ja: "複数の Y 軸とカスタム高さを備えたスタック型",
                    es: "Apilados, con múltiples ejes Y y altura personalizada",
                    ko: "여러 개의 Y축과 사용자 정의 높이가 있는 스택형",
                    ar: 'مكدسة، مع محاور Y متعددة وارتفاع مخصص'
                },
                description: {
                    en: "Some series might need more real estate.",
                    fr: "Certaines séries pourraient nécessiter davantage d’espace.",
                    pt: "Algumas séries podem precisar de mais espaço.",
                    de: "Einige Serien benötigen möglicherweise mehr Platz.",
                    zh: "某些系列可能需要更多空间。",
                    ja: "シリーズによっては、より多くの領域が必要になる場合があります。",
                    es: "Es posible que algunas series necesiten más espacio.",
                    ko: "일부 시리즈에는 더 많은 공간이 필요할 수 있습니다.",
                    ar: 'قد تحتاج بعض المسلسلات إلى المزيد من العقارات.'
                }
            }
        }
    }
})
