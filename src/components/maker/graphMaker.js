const FIELD_LABELS = {
    enable: ["enable"],
    enabled: ["enable"],
    text: ["textContent"],
    paddingLeft: ["padding", "left"],
    paddingRight: ["padding", "right"],
    minRadius: ["min", "radius"],
    maxRadius: ["max", "radius"],
    sizeByValue: ["size", "value"],
    sizeByDegree: ["size", "graphConnections"],
    colorByGroup: ["color", "graphGroup"],
    stroke: ["border", "color"],
    strokeWidth: ["border", "width"],
    gradientColor: ["gradient", "color"],
    hoverOnly: ["graphHoverOnly"],
    selectedOnly: ["selected", "graphOnly"],
    maxCount: ["max", "quantity"],
    maxLength: ["max", "graphLength"],
    minZoom: ["min", "zoom"],
    widthByValue: ["width", "value"],
    maxWidth: ["max", "width"],
    showOnHover: ["show", "hoverEffect"],
    colorBySource: ["color", "graphSource"],
    chargeStrength: ["graphRepulsion"],
    linkDistance: ["links", "spacing"],
    linkStrength: ["links", "graphStrength"],
    centerStrength: ["graphCentering"],
    collisionPadding: ["graphCollisionSpacing"],
    clusterStrength: ["graphClustering"],
    theta: ["graphApproximation"],
    fitOnDoubleClick: ["graphFitOnDoubleClick"],
    pinOnRelease: ["graphPinOnRelease"],
    keepSelection: ["graphKeepSelection"],
    dimOpacity: ["inactive", "opacity"],
    borderColor: ["border", "color"],
    borderWidth: ["border", "width"],
    backgroundOpacity: ["backgroundColor", "opacity"],
    backdropFilter: ["graphBackdropFilter"],
    smoothForce: ["smooth", "graphStrength"],
    smoothSnapThreshold: ["smooth", "graphThreshold"],
    teleportTo: ["graphTooltipContainer"],
    showMetadata: ["show", "graphMetadata"],
    showOnChartHover: ["show", "hoverEffect"],
    keepStateOnChartLeave: ["graphKeepMenuState"],
    useCursorPointer: ["pointer"],
    initialFit: ["graphInitialFit"],
    fitOnResize: ["graphFitOnResize"],
    fitOnUpdate: ["graphFitOnUpdate"],
    effectThreshold: ["graphEffectThreshold"],
    stepsPerFrame: ["graphStepsPerFrame"],
    nodeBatchThreshold: ["graphBatchThreshold"],
    useDialog: ["graphUseDialog"],
    th: ["graphHeader"],
    td: ["graphCells"],
    buttonColor: ["graphButtons", "color"],
    overflowTolerance: ["graphOverflowTolerance"],
};

export function getGraphMakerPresentation(path) {
    if (path === "devHints.enable")
        return { category: "general", label: ["graphDevHints", "enable"] };
    const parts = path.replace(/^style\.chart\./, "").split(".");
    const leaf = parts.at(-1);
    let category = parts[0];
    if (category === "title" && parts.includes("subtitle"))
        category = "subtitle";
    if (
        [
            "width",
            "height",
            "padding",
            "backgroundColor",
            "color",
            "fontFamily",
            "devHints",
        ].includes(category)
    )
        category = "general";
    const parents = parts.slice(1, -1).flatMap(
        (part) =>
            ({
                labels: ["labels"],
                glow: ["graphGlow"],
                hover: ["hoverEffect"],
                selected: ["selected"],
                arrows: ["arrow"],
                pulses: ["graphPulses"],
                zoom: ["zoom"],
                pan: ["graphPan"],
                drag: ["graphDrag"],
                highlight: ["graphHighlight"],
                buttons: ["graphButtons"],
                buttonTitles: ["graphButtonTitles"],
                print: ["graphPrint"],
                columnNames: ["graphColumnNames"],
                th: ["graphHeader"],
                td: ["graphCells"],
                subtitle: [],
            })[part] || [],
    );
    const labels = FIELD_LABELS[leaf] || [
        {
            group: "graphGroup",
            source: "graphSource",
            target: "target",
            nodes: "graphNodes",
            id: "graphId",
            connections: "graphConnections",
            directed: "graphDirected",
            metadata: "graphMetadata",
            glow: "graphGlow",
            blur: "graphBlur",
            reverse: "graphReverse",
            duration: "graphDuration",
            friction: "graphFriction",
            iterations: "graphIterations",
            strength: "graphStrength",
            orientation: "graphOrientation",
            outline: "graphOutline",
            open: "graphOpen",
            close: "graphClose",
            fullscreen: "graphFullscreen",
            annotator: "graphAnnotator",
            altCopy: "graphAltCopy",
            zoom: "zoom",
        }[leaf] || leaf,
    ];
    return { category, label: [...parents, ...labels] };
}

export function getGraphMakerControlType(path, type) {
    return /(?:color|stroke)$/i.test(path.split(".").at(-1)) && type === "text"
        ? "color"
        : type;
}
