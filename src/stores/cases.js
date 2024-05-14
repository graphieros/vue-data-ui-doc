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
            }
        }
    }
})