const mapping = {
    VueUiSparkline: {
        hoverIndex: "VueUiSparklineEmitHoverIndex",
        selectDatapoint: "VueUiSparklineEmitSelectDatapoint",
    },
    VueUiSparkbar: {
        selectDatapoint: "VueUiSparkbarEmitSelectDatapoint",
    },
    VueUiSparkStackbar: {
        selectDatapoint: "VueUiSparkStackbarEmitSelectDatapoint",
        selectLegend: "VueUiSparkStackbarEmitSelectLegend",
    },
    VueUiSparkHistogram: {
        selectDatapoint: "VueUiSparkHistogramEmitSelectDatapoint",
    },
    VueUiQuickChart: {
        selectLegend: "VueUiQuickChartEmitSelectLegend",
        selectDatapoint: "VueUiQuickChartEmitSelectDatapoint",
        copyAlt: "VueUiQuickChartEmitCopyAlt",
    },
    VueUiXy: {
        selectLegend: "VueUiXyEmitSelectLegend",
        selectX: "VueUiXyEmitSelectX",
        selectTimeLabel: "VueUiXyEmitSelectTimeLabel",
        zoomStart: "VueUiXyEmitZoom",
        zoomEnd: "VueUiXyEmitZoom",
        zoomReset: "",
        copyAlt: "VueUiXyEmitCopyAlt",
    },
    VueUiXyCanvas: {
        selectLegend: "VueUiXyCanvasEmitSelectLegend",
        selectX: "VueUiXyCanvasEmitSelectX",
        copyAlt: "VueUiXyCanvasEmitCopyAlt",
    },
    VueUiHorizontalBar: {
        selectLegend: "VueUiHorizontalBarEmitSelectLegend",
        selectDatapoint: "VueUiHorizontalBarEmitSelectDatapoint",
        copyAlt: "VueUiHorizontalBarEmitCopyAlt",
    },
    VueUiParallelCoordinatePlot: {
        selectLegend: "VueUiParallelCoordinatePlotEmitSelectLegend",
        selectDatapoint: "VueUiParallelCoordinatePlotEmitSelectDatapoint",
        copyAlt: "VueUiParallelCoordinatePlotEmitCopyAlt",
    },
    VueUiCandlestick: {
        selectX: "VueUiCandlestickEmitSelectX",
        copyAlt: "VueUiCandlestickEmitCopyAlt",
    },
    VueUiAgePyramid: {
        copyAlt: "VueUiAgePyramidEmitCopyAlt",
    },
    VueUiStackbar: {
        selectLegend: "VueUiStackbarEmitSelectLegend",
        selectDatapoint: "VueUiStackbarEmitSelectDatapoint",
        selectTimeLabel: "VueUiStackbarEmitSelectTimeLabel",
        selectX: "VueUiStackbarEmitSelectX",
        copyAlt: "VueUiStackbarEmitCopyAlt",
    },
    VueUiStackline: {
        selectLegend: "VueUiStacklineEmitSelectLegend",
        selectDatapoint: "VueUiStacklineEmitSelectDatapoint",
        selectTimeLabel: "VueUiStacklineEmitSelectTimeLabel",
        selectX: "VueUiStacklineEmitSelectX",
        copyAlt: "VueUiStacklineEmitCopyAlt",
    },
    VueUiFunnel: {
        copyAlt: "VueUiFunnelEmitCopyAlt",
    },
    VueUiHistoryPlot: {
        selectLegend: "VueUiHistoryPlotEmitSelectLegend",
        selectDatapoint: "VueUiHistoryPlotEmitSelectDatapoint",
        copyAlt: "VueUiHistoryPlotEmitCopyAlt",
    },
    VueUiRidgeline: {
        selectLegend: "VueUiRidgelineEmitSelectLegend",
        selectDatapoint: "VueUiRidgelineEmitSelectDatapoint",
        selectX: "VueUiRidgelineEmitSelectX",
        copyAlt: "VueUiRidgelineEmitCopyAlt",
    },
    VueUiBump: {
        copyAlt: "VueUiBumpEmitCopyAlt",
    },
    VueUiDonut: {
        selectLegend: "VueUiDonutEmitSelectLegend",
        selectDatapoint: "VueUiDonutEmitSelectDatapoint",
        copyAlt: "VueUiDonutEmitCopyAlt",
    },
    VueUiNestedDonuts: {
        selectLegend: "VueUiNestedDonutsEmitSelectLegend",
        selectDatapoint: "VueUiNestedDonutsEmitSelectDatapoint",
        copyAlt: "VueUiNestedDonutsEmitCopyAlt",
    },
    VueUiWaffle: {
        selectLegend: "VueUiWaffleEmitSelectLegend",
        copyAlt: "VueUiWaffleEmitCopyAlt",
    },
    VueUiHeatmap: {
        selectDatapoint: "VueUiHeatmapEmitSelectDatapoint",
        copyAlt: "VueUiHeatmapEmitCopyAlt",
    },
    VueUiTreemap: {
        selectLegend: "VueUiTreemapEmitSelectLegend",
        selectDatapoint: "VueUiTreemapEmitSelectDatapoint",
        copyAlt: "VueUiTreemapEmitCopyAlt",
    },
    VueUiRings: {
        selectLegend: "VueUiRingsEmitSelectLegend",
        copyAlt: "VueUiRingsEmitCopyAlt",
    },
    VueUiGalaxy: {
        selectLegend: "VueUiGalaxyEmitSelectLegend",
        selectDatapoint: "VueUiGalaxyEmitSelectDatapoint",
        copyAlt: "VueUiGalaxyEmitCopyAlt",
    },
    VueUiDonutEvolution: {
        selectLegend: "VueUiDonutEvolutionEmitSelectLegend",
        copyAlt: "VueUiDonutEvolutionEmitCopyAlt",
    },
    VueUiCirclePack: {
        selectDatapoint: "VueUiCirclePackEmitSelectDatapoint",
        copyAlt: "VueUiCirclePackEmitCopyAlt",
    },
    VueUiGauge: {
        copyAlt: "VueUiGaugeEmitCopyAlt",
    },
    VueUiBullet: {
        copyAlt: "VueUiBulletEmitCopyAlt",
    },
    VueUiOnion: {
        selectLegend: "VueUiOnionEmitSelectLegend",
        copyAlt: "VueUiOnionEmitCopyAlt",
    },
    VueUiWheel: {
        copyAlt: "VueUiWheelEmitCopyAlt",
    },
    VueUiTiremarks: {
        copyAlt: "VueUiTiremarksEmitCopyAlt",
    },
    VueUiThermometer: {
        copyAlt: "VueUiThermometerEmitCopyAlt",
    },
    VueUiTimer: {
        start: "",
        reset: "",
        pause: "",
        restart: "",
        lap: "VueUiTimerLap[]",
    },
    VueUiWordCloud: {
        copyAlt: "VueUiWordCloudEmitCopyAlt",
    },
    VueUiRelationCircle: {
        copyAlt: "VueUiRelationCircleEmitCopyAlt",
    },
    VueUiChord: {
        selectLegend: "VueUiChordEmitSelectLegend",
        selectGroup: "VueUiChordEmitSelectGroup",
        selectRibbon: "VueUiChordEmitSelectRibbon",
        copyAlt: "VueUiChordEmitCopyAlt",
    },
    VueUiDag: {
        onMidpointEnter: "VueUiDagEmitOnMidpointEnter",
        onMidpointLeave: "",
        copyAlt: "VueUiDagEmitCopyAlt",
        rotate: "VueUiDagEmitRotate",
    },
    VueUiFlow: {
        copyAlt: "VueUiFlowEmitCopyAlt",
    },
    VueUiMolecule: {
        selectNode: "VueUiMoleculeEmitSelectNode",
        copyAlt: "VueUiMoleculeEmitCopyAlt",
    },
    VueUiRadar: {
        selectLegend: "VueUiRadarEmitSelectLegend",
        copyAlt: "VueUiRadarEmitCopyAlt",
    },
    VueUiMoodRadar: {
        copyAlt: "VueUiMoodRadarEmitCopyAlt",
    },
    VueUiQuadrant: {
        selectPlot: "VueUiQuadrantEmitSelectPlot",
        selectSide: "VueUiQuadrantEmitSelectSide",
        selectLegend: "VueUiQuadrantEmitSelectLegend",
        copyAlt: "VueUiQuadrantEmitCopyAlt",
    },
    VueUiChestnut: {
        selectRoot: "VueUiChestnutEmitSelectRoot",
        selectBranch: "VueUiChestnutEmitSelectBranch",
        selectNut: "VueUiChestnutEmitSelectNut",
        copyAlt: "VueUiChestnutEmitCopyAlt",
    },
    VueUiScatter: {
        selectLegend: "VueUiScatterEmitSelectLegend",
        copyAlt: "VueUiScatterEmitCopyAlt",
    },
    VueUiStripPlot: {
        selectDatapoint: "VueUiStripPlotEmitSelectDatapoint",
        copyAlt: "VueUiStripPlotEmitCopyAlt",
    },
    VueUiDumbbell: {
        selectDatapoint: "VueUiDumbbellEmitSelectDatapoint",
        copyAlt: "VueUiDumbbellEmitCopyAlt",
    },
    VueUiWorld: {
        selectLegend: "VueUiWorldEmitSelectLegend",
        selectDatapoint: "VueUiWorldEmitSelectDatapoint",
        copyAlt: "VueUiWorldEmitCopyAlt",
    },
    VueUiGeo: {
        copyAlt: "VueUiGeoEmitCopyAlt",
    },
    VueUiTableSparkline: {
        copyAlt: "VueUiTableSparklineEmitCopyAlt",
    },
    VueUiCarouselTable: {
        copyAlt: "VueUiCarouselTableEmitCopyAlt",
    },
};

export function getEmitType({ componentName, emitName }) {
    return mapping?.[componentName]?.[emitName] ?? "";
}

export function getAllTypes() {
    return Object.values(mapping)
        .flatMap((componentMapping) => Object.values(componentMapping))
        .filter(Boolean);
}
