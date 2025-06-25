export function useFeatures() {
    const mapping = {
        VueUiBullet: { icon: 'chartBullet', tooltip: false, legend: true, customPalette: false, },
        VueUi3dBar: { icon: 'chart3dBar', tooltip: true, legend: false, customPalette: true, },
        VueUiAccordion: { icon: 'accordion', tooltip:false, legend: false, customPalette: false, },
        VueUiAgePyramid: { icon: 'chartAgePyramid', tooltip: true, legend: false, customPalette: false, },
        VueUiAnnotator: { icon: 'annotator', tooltip: false, legend: false, customPalette: false, },
        VueUiCandlestick: { icon: 'chartCandlestick', tooltip: true, legend: true, customPalette: false, },
        VueUiCarouselTable: { icon: 'carouselTable', tooltip: false, legend: false, customPalette: false, },
        VueUiChestnut: { icon: 'chartChestnut', tooltip: false, legend: true, customPalette: true, },
        VueUiCursor: { icon: 'cursor', tooltip: false, legend: false, customPalette: false, },
        VueUiDashboard: { icon: 'dashboard', tooltip: false, legend: false, customPalette: false, },
        VueUiDigits: { icon: 'digit8', tooltip: false, legend: false, customPalette: false, },
        VueUiDonut: { icon: 'chartDonut', tooltip: true, legend: true, customPalette: true, },
        VueUiDonutEvolution: { icon: 'chartDonutEvolution', tooltip: false, legend: true, customPalette: true, },
        VueUiDumbbell: { icon: 'chartDumbbell', tooltip: false, legend: true, customPalette: false, },
        VueUiFlow: { icon: 'chartFlow', tooltip: true, legend: true, customPalette: true, },
        VueUiGalaxy: { icon: 'chartGalaxy', tooltip: true, legend: true, customPalette: true, },
        VueUiGauge: { icon: 'chartGauge', tooltip: false, legend: false, customPalette: true, },
        VueUiHeatmap: { icon: 'chartHeatmap', tooltip: true, legend: false, customPalette: false, },
        VueUiIcon: { icon: 'icons', tooltip: false, legend: false, customPalette: false, },
        VueUiKpi: { icon: 'kpiBox', tooltip: false, legend: false, customPalette: false, },
        VueUiMiniLoader: { icon: 'chartWheel', tooltip: false, legend: false, customPalette: false, },
        VueUiMolecule: { icon: 'chartCluster', tooltip: true, legend: false, customPalette: true, },
        VueUiMoodRadar: { icon: 'chartMoodRadar', tooltip: false, legend: true, customPalette: false, },
        VueUiNestedDonuts: { icon: 'chartNestedDonuts', tooltip: true, legend: true, customPalette: true, },
        VueUiOnion: { icon: 'chartOnion', tooltip: true, legend: true, customPalette: true, },
        VueUiParallelCoordinatePlot: { icon: 'chartParallelCoordinatePlot', tooltip: true, legend: true, customPalette: true, },
        VueUiQuadrant: { icon: 'chartQuadrant', tooltip: true, legend: true, customPalette: true, },
        VueUiQuickChart: { icon: 'vueDataUi', tooltip: true, legend: true, customPalette: true, },
        VueUiRadar: { icon: 'chartRadar', tooltip: true, legend: true, customPalette: true, },
        VueUiRating: { icon: 'star', tooltip: false, legend: false, customPalette: false, },
        VueUiRelationCircle: { icon: 'chartRelationCircle', tooltip: true, legend: false, customPalette: true, },
        VueUiRings: { icon: 'chartRings', tooltip: true, legend: true, customPalette: true, },
        VueUiScatter: { icon: 'chartScatter', tooltip: true, legend: true, customPalette: true, },
        VueUiScreenshot: { icon: 'screenshot', tooltip: false, legend: false, customPalette: false, },
        VueUiSkeleton: { icon: 'skeleton', tooltip: false, legend: false, customPalette: false, },
        VueUiSmiley: { icon: 'smiley', tooltip: false, legend: false, customPalette: false, },
        VueUiSparkHistogram: { icon: 'chartSparkHistogram', tooltip: false, legend: false, customPalette: false, },
        VueUiSparkStackbar: { icon: 'chartSparkStackbar', tooltip: true, legend: false, customPalette: true, },
        VueUiSparkTrend: { icon: 'trend', tooltip: false, legend: false, customPalette: false, },
        VueUiSparkbar: { icon: 'chartSparkbar', tooltip: false, legend: false, customPalette: true, },
        VueUiSparkgauge: { icon: 'chartGauge', tooltip: true, legend: false, customPalette: false, },
        VueUiSparkline: { icon: 'chartSparkline', tooltip: false, legend: false, customPalette: false, },
        VueUiStripPlot: { icon: 'chartStripPlot', tooltip: true, legend: false, customPalette: true, },
        VueUiTable: { icon: 'chartTable', tooltip: false, legend: false, customPalette: false, },
        VueUiTableHeatmap: { icon: 'chartTable', tooltip: false, legend: false, customPalette: false, },
        VueUiTableSparkline: { icon: 'chartTableSparkline', tooltip: false, legend: false, customPalette: true, },
        VueUiThermometer: { icon: 'chartThermometer', tooltip: false, legend: false, customPalette: true, },
        VueUiTimer: { icon: 'lap', tooltip: false, legend: false, customPalette: false, },
        VueUiTiremarks: { icon: 'chartTiremarks', tooltip: false, legend: false, customPalette: false, },
        VueUiTreemap: { icon: 'chartTreemap', tooltip: true, legend: true, customPalette: true, },
        VueUiVerticalBar: { icon: 'chartVerticalBar', tooltip: true, legend: true, customPalette: true, },
        VueUiWaffle: { icon: 'chartWaffle', tooltip: true, legend: true, customPalette: true, },
        VueUiWheel: { icon: 'chartWheel', tooltip: false, legend: false, customPalette: false, },
        VueUiWordCloud: { icon: 'chartWordCloud', tooltip: true, legend: false, customPalette: true, },
        VueUiXy: { icon: 'chartLine', tooltip: true, legend: true, customPalette: true, },
        VueUiXyCanvas: { icon: 'chartLine', tooltip: true, legend: true, customPalette: true, },
        VueUiGizmo: { icon: 'battery', tooltip: false, legend: false, customPalette: false, },
        VueUiStackbar: { icon: 'chartStackbar', tooltip: true, legend: true, customPalette: true, },
        VueUiFunnel: { icon: 'chartFunnel', tooltip: false, legend: false, customPalette: false, },
        VueUiHistoryPlot: { icon: 'chartHistoryPlot', tooltip: true, legend: true, customPalette: true, },
        VueUiCirclePack: { icon: 'chartCirclePack', tooltip: true, legend: false, customPalette: true, },
        VueUiWorld: { icon: 'world', tooltip: true, legend: false, customPalette: true, },
        VueUiRidgeline: { icon: 'chartRidgeline', tooltip: false, legend: true, customPalette: true, },
        VueUiChord: { icon: 'chartChord', tooltip: false, legend: true, customPalette: true, }
    }

    const components = Object.keys(mapping)
        .map(k => {
            return {
                name: k,
                ...mapping[k]
            }
        })
        .sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
        })

    return {
        mapping,
        components,
    }
}