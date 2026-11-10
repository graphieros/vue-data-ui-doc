export const xyScales = {
    en: {
        title: "Compare y-axis scales",
        description:
            "Switch scales on the same dataset, from −10,000 to 10,000 with small values around zero. Log mode omits zero and negative values; labels and tooltips keep the original values.",
        linear: "Linear: use for values of similar magnitude when absolute differences matter. Equal distances represent equal differences.",
        log: "Log: use for strictly positive values spanning several orders of magnitude, such as exponential growth. Equal distances represent equal ratios.",
        symlog: "Symlog: use for wide-ranging values that include negatives or zero, such as profit and loss. It behaves approximately linearly near zero and logarithmically farther away.",
        constant:
            "Positive transition constant for symlog (default: 1). Larger values widen the approximately linear region around zero.",
    },
    fr: {
        title: "Comparer les échelles de l’axe y",
        description:
            "Changez d’échelle sur les mêmes données, de −10 000 à 10 000 avec de petites valeurs autour de zéro. Le mode log omet zéro et les valeurs négatives ; les étiquettes et infobulles conservent les valeurs d’origine.",
        linear: "Linéaire : pour des valeurs d’ordres de grandeur similaires lorsque les écarts absolus comptent. Des distances égales représentent des différences égales.",
        log: "Log : pour des valeurs strictement positives sur plusieurs ordres de grandeur, comme une croissance exponentielle. Des distances égales représentent des rapports égaux.",
        symlog: "Symlog : pour des valeurs très dispersées incluant des nombres négatifs ou zéro, comme les bénéfices et pertes. L’échelle est approximativement linéaire près de zéro et logarithmique au-delà.",
        constant:
            "Constante de transition positive pour symlog (défaut : 1). Une valeur plus grande élargit la zone approximativement linéaire autour de zéro.",
    },
    pt: {
        title: "Comparar escalas do eixo y",
        description:
            "Alterne as escalas nos mesmos dados, de −10.000 a 10.000 com valores pequenos perto de zero. O modo log omite zero e valores negativos; rótulos e dicas mantêm os valores originais.",
        linear: "Linear: para valores de magnitude semelhante quando as diferenças absolutas importam. Distâncias iguais representam diferenças iguais.",
        log: "Log: para valores estritamente positivos em várias ordens de grandeza, como crescimento exponencial. Distâncias iguais representam razões iguais.",
        symlog: "Symlog: para valores de ampla magnitude que incluem negativos ou zero, como lucros e perdas. É aproximadamente linear perto de zero e logarítmica mais longe.",
        constant:
            "Constante de transição positiva para symlog (padrão: 1). Valores maiores ampliam a região aproximadamente linear perto de zero.",
    },
    de: {
        title: "Skalen der y-Achse vergleichen",
        description:
            "Wechseln Sie die Skala derselben Daten von −10.000 bis 10.000 mit kleinen Werten um null. Log lässt null und negative Werte aus; Beschriftungen und Tooltips behalten die Originalwerte.",
        linear: "Linear: für Werte ähnlicher Größenordnung, wenn absolute Unterschiede wichtig sind. Gleiche Abstände entsprechen gleichen Differenzen.",
        log: "Log: für strikt positive Werte über mehrere Größenordnungen, etwa exponentielles Wachstum. Gleiche Abstände entsprechen gleichen Verhältnissen.",
        symlog: "Symlog: für weit gestreute Werte einschließlich negativer Werte oder null, etwa Gewinne und Verluste. Nahe null annähernd linear, weiter entfernt logarithmisch.",
        constant:
            "Positive Übergangskonstante für symlog (Standard: 1). Größere Werte erweitern den annähernd linearen Bereich um null.",
    },
    zh: {
        title: "比较 y 轴刻度",
        description:
            "在同一组数据上切换刻度，数值从 −10,000 到 10,000，包含零附近的小值。对数模式不绘制零和负值；标签和提示保留原始值。",
        linear: "线性：适用于数量级相近且关注绝对差异的数据。相同距离表示相同差值。",
        log: "对数：适用于跨越多个数量级的严格正值，例如指数增长。相同距离表示相同比率。",
        symlog: "对称对数：适用于范围很大且包含负值或零的数据，例如盈亏。在零附近近似线性，远离零时呈对数变化。",
        constant:
            "symlog 的正过渡常数（默认：1）。值越大，零附近的近似线性区域越宽。",
    },
    ja: {
        title: "y軸のスケールを比較",
        description:
            "−10,000から10,000まで、ゼロ付近の小さな値を含む同じデータでスケールを切り替えます。対数モードはゼロと負の値を省略し、ラベルとツールチップは元の値を保持します。",
        linear: "線形：絶対的な差が重要で、値の桁が近いデータに適します。同じ距離が同じ差を表します。",
        log: "対数：指数関数的な成長など、複数の桁にわたる正の値に適します。同じ距離が同じ比率を表します。",
        symlog: "Symlog：損益など、負の値やゼロを含む広範囲の値に適します。ゼロ付近ではほぼ線形で、離れると対数的になります。",
        constant:
            "symlogの正の遷移定数（既定値：1）。値を大きくすると、ゼロ付近のほぼ線形な領域が広がります。",
    },
    es: {
        title: "Comparar escalas del eje y",
        description:
            "Cambie de escala con los mismos datos, de −10.000 a 10.000 con valores pequeños cerca de cero. El modo log omite cero y valores negativos; etiquetas y descripciones mantienen los valores originales.",
        linear: "Lineal: para valores de magnitud similar cuando importan las diferencias absolutas. Distancias iguales representan diferencias iguales.",
        log: "Log: para valores estrictamente positivos de varios órdenes de magnitud, como el crecimiento exponencial. Distancias iguales representan proporciones iguales.",
        symlog: "Symlog: para valores de amplio rango que incluyen negativos o cero, como ganancias y pérdidas. Es aproximadamente lineal cerca de cero y logarítmica más lejos.",
        constant:
            "Constante de transición positiva para symlog (predeterminada: 1). Valores mayores amplían la región aproximadamente lineal alrededor de cero.",
    },
    ko: {
        title: "y축 스케일 비교",
        description:
            "0 근처의 작은 값을 포함하여 −10,000부터 10,000까지 동일한 데이터의 스케일을 전환합니다. 로그 모드는 0과 음수를 생략하며 레이블과 툴팁은 원래 값을 유지합니다.",
        linear: "선형: 절대 차이가 중요하고 값의 크기가 비슷할 때 사용합니다. 같은 거리는 같은 차이를 나타냅니다.",
        log: "로그: 지수 성장처럼 여러 자릿수에 걸친 양수에 사용합니다. 같은 거리는 같은 비율을 나타냅니다.",
        symlog: "Symlog: 손익처럼 음수나 0을 포함하는 넓은 범위의 값에 사용합니다. 0 근처에서는 거의 선형이고 멀어지면 로그 방식으로 변합니다.",
        constant:
            "symlog의 양수 전환 상수(기본값: 1). 값이 클수록 0 주변의 거의 선형인 영역이 넓어집니다.",
    },
    ar: {
        title: "مقارنة مقاييس المحور y",
        description:
            "بدّل المقاييس لنفس البيانات من −10,000 إلى 10,000 مع قيم صغيرة حول الصفر. يتجاهل الوضع اللوغاريتمي الصفر والقيم السالبة؛ وتحتفظ التسميات والتلميحات بالقيم الأصلية.",
        linear: "خطي: للقيم المتقاربة في الحجم عندما تكون الفروق المطلقة مهمة. المسافات المتساوية تمثل فروقًا متساوية.",
        log: "لوغاريتمي: للقيم الموجبة تمامًا التي تمتد عبر مراتب حجمية متعددة، مثل النمو الأُسّي. المسافات المتساوية تمثل نسبًا متساوية.",
        symlog: "Symlog: للقيم واسعة النطاق التي تشمل السالب أو الصفر، مثل الأرباح والخسائر. يكون شبه خطي قرب الصفر ولوغاريتمي بعيدًا عنه.",
        constant:
            "ثابت انتقال موجب لمقياس symlog (الافتراضي: 1). القيم الأكبر توسّع المنطقة شبه الخطية حول الصفر.",
    },
};
