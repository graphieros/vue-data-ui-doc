export const graphLayoutHints = {
    en: {
        chargeStrength:
            "Controls node repulsion. More negative values push nodes farther apart; zero disables repulsion.",
        linkDistance:
            "Target distance between connected nodes. Lower values make links shorter.",
        linkStrength:
            "How strongly links pull nodes toward their target distance. Higher values make connections tighter.",
        centerStrength:
            "Pulls nodes toward the center. Higher values produce a more compact layout.",
        collisionPadding:
            "Extra spacing around nodes to reduce overlap. Higher values keep nodes farther apart.",
        friction:
            "Velocity retained between simulation steps. Lower values damp motion faster; higher values let nodes move longer.",
        clusterStrength:
            "Attraction between nodes in the same group. Increase it to bring each group closer together.",
        iterations:
            "Number of simulation steps. More steps allow the layout to settle, but require more computation.",
        strength:
            "Overall force multiplier. Higher values produce stronger layout adjustments.",
        theta: "Force approximation threshold. Lower values favor accuracy; higher values favor simulation speed.",
    },
    fr: {
        chargeStrength:
            "Contrôle la répulsion des nœuds. Des valeurs plus négatives les éloignent ; zéro désactive la répulsion.",
        linkDistance:
            "Distance cible entre les nœuds reliés. Une valeur plus faible raccourcit les liens.",
        linkStrength:
            "Force qui ramène les nœuds vers la distance cible des liens. Une valeur élevée resserre les connexions.",
        centerStrength:
            "Attire les nœuds vers le centre. Une valeur élevée rend la disposition plus compacte.",
        collisionPadding:
            "Espace supplémentaire autour des nœuds pour limiter les chevauchements. Une valeur élevée les écarte davantage.",
        friction:
            "Vitesse conservée entre les étapes de simulation. Une valeur faible amortit plus vite le mouvement ; une valeur élevée le prolonge.",
        clusterStrength:
            "Attraction entre les nœuds d’un même groupe. Augmentez-la pour resserrer les groupes.",
        iterations:
            "Nombre d’étapes de simulation. Plus d’étapes stabilisent la disposition, mais demandent davantage de calculs.",
        strength:
            "Multiplicateur global des forces. Une valeur élevée accentue les ajustements de disposition.",
        theta: "Seuil d’approximation des forces. Une valeur faible privilégie la précision ; une valeur élevée privilégie la vitesse.",
    },
    pt: {
        chargeStrength:
            "Controla a repulsão dos nós. Valores mais negativos afastam os nós; zero desativa a repulsão.",
        linkDistance:
            "Distância desejada entre nós conectados. Valores menores encurtam as ligações.",
        linkStrength:
            "Força que aproxima os nós da distância desejada. Valores maiores tornam as conexões mais firmes.",
        centerStrength:
            "Atrai os nós para o centro. Valores maiores tornam o layout mais compacto.",
        collisionPadding:
            "Espaço extra ao redor dos nós para reduzir sobreposições. Valores maiores aumentam a separação.",
        friction:
            "Velocidade mantida entre etapas da simulação. Valores menores amortecem mais rápido; valores maiores prolongam o movimento.",
        clusterStrength:
            "Atração entre nós do mesmo grupo. Aumente para aproximar os nós de cada grupo.",
        iterations:
            "Número de etapas da simulação. Mais etapas estabilizam o layout, mas exigem mais processamento.",
        strength:
            "Multiplicador global das forças. Valores maiores intensificam os ajustes do layout.",
        theta: "Limiar de aproximação das forças. Valores menores priorizam precisão; valores maiores priorizam velocidade.",
    },
    de: {
        chargeStrength:
            "Steuert die Abstoßung. Stärker negative Werte drücken Knoten auseinander; null deaktiviert die Abstoßung.",
        linkDistance:
            "Zielabstand verbundener Knoten. Kleinere Werte verkürzen die Verbindungen.",
        linkStrength:
            "Wie stark Verbindungen ihren Zielabstand durchsetzen. Höhere Werte binden Knoten stärker zusammen.",
        centerStrength:
            "Zieht Knoten zur Mitte. Höhere Werte ergeben ein kompakteres Layout.",
        collisionPadding:
            "Zusätzlicher Abstand um Knoten gegen Überlappungen. Höhere Werte halten Knoten weiter auseinander.",
        friction:
            "Beibehaltene Geschwindigkeit zwischen Simulationsschritten. Kleine Werte bremsen schneller, große lassen Knoten länger bewegen.",
        clusterStrength:
            "Anziehung von Knoten derselben Gruppe. Erhöhen Sie den Wert, um Gruppen enger zusammenzuziehen.",
        iterations:
            "Anzahl der Simulationsschritte. Mehr Schritte stabilisieren das Layout, benötigen aber mehr Rechenzeit.",
        strength:
            "Gesamtmultiplikator der Kräfte. Höhere Werte verstärken die Layoutanpassungen.",
        theta: "Schwellenwert der Kraftannäherung. Kleine Werte bevorzugen Genauigkeit, große die Simulationsgeschwindigkeit.",
    },
    zh: {
        chargeStrength:
            "控制节点排斥力。负值越小，节点间距越大；零可禁用排斥力。",
        linkDistance: "已连接节点之间的目标距离。值越小，连接越短。",
        linkStrength: "连接将节点拉向目标距离的力度。值越大，连接越紧密。",
        centerStrength: "将节点拉向中心。值越大，布局越紧凑。",
        collisionPadding:
            "节点周围用于减少重叠的额外间距。值越大，节点分得越开。",
        friction:
            "模拟步骤之间保留的速度比例。值越小，运动衰减越快；值越大，运动持续越久。",
        clusterStrength: "同组节点之间的吸引力。增大此值可使各组更加聚拢。",
        iterations: "模拟步骤数量。更多步骤有助于布局稳定，但需要更多计算。",
        strength: "整体力的倍数。值越大，布局调整力度越强。",
        theta: "力近似阈值。较小值偏重精度，较大值偏重模拟速度。",
    },
    ja: {
        chargeStrength:
            "ノードの反発力を調整します。負の値が大きいほど離れ、ゼロで反発力を無効にします。",
        linkDistance:
            "接続されたノード間の目標距離です。小さくするとリンクが短くなります。",
        linkStrength:
            "リンクが目標距離を保つ力です。大きくすると接続が強くなります。",
        centerStrength:
            "ノードを中心に引き寄せます。大きくするとレイアウトが密になります。",
        collisionPadding:
            "重なりを減らすためのノード周囲の余白です。大きくすると間隔が広がります。",
        friction:
            "計算ステップ間で保持する速度の割合です。小さいほど早く減速し、大きいほど長く動きます。",
        clusterStrength:
            "同じグループのノード間の引力です。大きくすると各グループがまとまります。",
        iterations:
            "シミュレーションの計算回数です。増やすと配置が安定しますが、計算量も増えます。",
        strength: "全体の力の倍率です。大きくすると配置の調整が強くなります。",
        theta: "力の近似のしきい値です。小さいほど精度、大きいほど計算速度を優先します。",
    },
    es: {
        chargeStrength:
            "Controla la repulsión. Los valores más negativos separan los nodos; cero desactiva la repulsión.",
        linkDistance:
            "Distancia deseada entre nodos conectados. Los valores menores acortan los enlaces.",
        linkStrength:
            "Fuerza que acerca los nodos a la distancia deseada. Los valores altos refuerzan las conexiones.",
        centerStrength:
            "Atrae los nodos hacia el centro. Los valores altos producen un diseño más compacto.",
        collisionPadding:
            "Espacio adicional alrededor de los nodos para reducir solapamientos. Los valores altos aumentan la separación.",
        friction:
            "Velocidad conservada entre pasos de simulación. Los valores bajos frenan antes; los altos prolongan el movimiento.",
        clusterStrength:
            "Atracción entre nodos del mismo grupo. Auméntela para acercar los nodos de cada grupo.",
        iterations:
            "Número de pasos de simulación. Más pasos estabilizan el diseño, pero requieren más cálculo.",
        strength:
            "Multiplicador global de fuerzas. Los valores altos intensifican los ajustes del diseño.",
        theta: "Umbral de aproximación de fuerzas. Los valores bajos favorecen la precisión; los altos, la velocidad.",
    },
    ko: {
        chargeStrength:
            "노드 반발력을 조절합니다. 음수의 절댓값이 클수록 멀어지고 0이면 반발력이 꺼집니다.",
        linkDistance:
            "연결된 노드 사이의 목표 거리입니다. 값이 작을수록 링크가 짧아집니다.",
        linkStrength:
            "링크가 목표 거리를 유지하도록 당기는 힘입니다. 값이 클수록 연결이 강해집니다.",
        centerStrength:
            "노드를 중앙으로 끌어당깁니다. 값이 클수록 레이아웃이 조밀해집니다.",
        collisionPadding:
            "겹침을 줄이는 노드 주변 여백입니다. 값이 클수록 노드 간격이 넓어집니다.",
        friction:
            "시뮬레이션 단계 간 유지되는 속도 비율입니다. 값이 작으면 빨리 감속하고 크면 더 오래 움직입니다.",
        clusterStrength:
            "같은 그룹의 노드 사이 인력입니다. 높이면 각 그룹의 노드가 더 모입니다.",
        iterations:
            "시뮬레이션 단계 수입니다. 늘리면 레이아웃이 안정되지만 계산량이 증가합니다.",
        strength:
            "전체 힘의 배율입니다. 값이 클수록 레이아웃 조정이 강해집니다.",
        theta: "힘 근사 임계값입니다. 작은 값은 정확도를, 큰 값은 시뮬레이션 속도를 우선합니다.",
    },
    ar: {
        chargeStrength:
            "يتحكم في تنافر العقد. القيم الأكثر سلبية تبعدها، والصفر يعطل التنافر.",
        linkDistance:
            "المسافة المستهدفة بين العقد المتصلة. القيم الأصغر تقصر الروابط.",
        linkStrength:
            "قوة سحب الروابط للعقد نحو المسافة المستهدفة. القيم الأعلى تجعل الاتصالات أشد.",
        centerStrength:
            "يسحب العقد نحو المركز. القيم الأعلى تجعل التخطيط أكثر تقاربًا.",
        collisionPadding:
            "مسافة إضافية حول العقد لتقليل التداخل. القيم الأعلى تزيد تباعد العقد.",
        friction:
            "السرعة المحتفظ بها بين خطوات المحاكاة. القيم الأصغر تخمد الحركة أسرع، والأعلى تطيلها.",
        clusterStrength:
            "التجاذب بين عقد المجموعة نفسها. زد القيمة لتقريب عقد كل مجموعة.",
        iterations:
            "عدد خطوات المحاكاة. الخطوات الإضافية تساعد على استقرار التخطيط لكنها تتطلب حسابات أكثر.",
        strength:
            "معامل مضاعفة القوى الكلي. القيم الأعلى تزيد قوة تعديلات التخطيط.",
        theta: "عتبة تقريب القوى. القيم الأصغر تفضل الدقة، والأعلى تفضل سرعة المحاكاة.",
    },
};
