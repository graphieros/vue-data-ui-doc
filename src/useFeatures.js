export function useFeatures() {
    const mapping = {
        VueUiBullet: { link: 'vue-ui-bullet', icon: 'chartBullet', tooltip: false, legend: true, customPalette: false, },
        VueUi3dBar: { link: 'vue-ui-3d-bar', icon: 'chart3dBar', tooltip: true, legend: false, customPalette: true, },
        VueUiAccordion: { link: 'vue-ui-accordion', icon: 'accordion', tooltip:false, legend: false, customPalette: false, },
        VueUiAgePyramid: { link: 'vue-ui-age-pyramid', icon: 'chartAgePyramid', tooltip: true, legend: false, customPalette: false, },
        VueUiAnnotator: { link: 'vue-ui-annotator', icon: 'annotator', tooltip: false, legend: false, customPalette: false, },
        VueUiCandlestick: { link: 'vue-ui-candlestick', icon: 'chartCandlestick', tooltip: true, legend: true, customPalette: false, },
        VueUiCarouselTable: { link: 'vue-ui-carousel-table', icon: 'carouselTable', tooltip: false, legend: false, customPalette: false, },
        VueUiChestnut: { link: 'vue-ui-chestnut', icon: 'chartChestnut', tooltip: false, legend: true, customPalette: true, },
        VueUiCursor: { link: 'vue-ui-cursor', icon: 'cursor', tooltip: false, legend: false, customPalette: false, },
        VueUiDashboard: { link: 'vue-ui-dashboard', icon: 'dashboard', tooltip: false, legend: false, customPalette: false, },
        VueUiDigits: { link: 'vue-ui-digits', icon: 'digit8', tooltip: false, legend: false, customPalette: false, },
        VueUiDonut: { link: 'vue-ui-donut', icon: 'chartDonut', tooltip: true, legend: true, customPalette: true, },
        VueUiDonutEvolution: { link: 'vue-ui-donut-evolution', icon: 'chartDonutEvolution', tooltip: false, legend: true, customPalette: true, },
        VueUiDumbbell: { link: 'vue-ui-dumbbell', icon: 'chartDumbbell', tooltip: false, legend: true, customPalette: false, },
        VueUiFlow: { link: 'vue-ui-flow', icon: 'chartFlow', tooltip: true, legend: true, customPalette: true, },
        VueUiGalaxy: { link: 'vue-ui-galaxy', icon: 'chartGalaxy', tooltip: true, legend: true, customPalette: true, },
        VueUiGauge: { link: 'vue-ui-gauge', icon: 'chartGauge', tooltip: false, legend: false, customPalette: true, },
        VueUiHeatmap: { link: 'vue-ui-heatmap', icon: 'chartHeatmap', tooltip: true, legend: false, customPalette: false, },
        VueUiIcon: { link: 'vue-ui-icon', icon: 'icons', tooltip: false, legend: false, customPalette: false, },
        VueUiKpi: { link: 'vue-ui-kpi', icon: 'kpiBox', tooltip: false, legend: false, customPalette: false, },
        VueUiMiniLoader: { link: 'vue-ui-mini-loader', icon: 'chartWheel', tooltip: false, legend: false, customPalette: false, },
        VueUiMolecule: { link: 'vue-ui-molecule', icon: 'chartCluster', tooltip: true, legend: false, customPalette: true, },
        VueUiMoodRadar: { link: 'vue-ui-mood-radar', icon: 'chartMoodRadar', tooltip: false, legend: true, customPalette: false, },
        VueUiNestedDonuts: { link: 'vue-ui-nested-donuts', icon: 'chartNestedDonuts', tooltip: true, legend: true, customPalette: true, },
        VueUiOnion: { link: 'vue-ui-onion', icon: 'chartOnion', tooltip: true, legend: true, customPalette: true, },
        VueUiParallelCoordinatePlot: { link: 'vue-ui-parallel-coordinate-plot', icon: 'chartParallelCoordinatePlot', tooltip: true, legend: true, customPalette: true, },
        VueUiQuadrant: { link: 'vue-ui-quadrant', icon: 'chartQuadrant', tooltip: true, legend: true, customPalette: true, },
        VueUiQuickChart: { link: 'vue-ui-quick-chart', icon: 'vueDataUi', tooltip: true, legend: true, customPalette: true, },
        VueUiRadar: { link: 'vue-ui-radar', icon: 'chartRadar', tooltip: true, legend: true, customPalette: true, },
        VueUiRating: { link: 'vue-ui-rating', icon: 'star', tooltip: false, legend: false, customPalette: false, },
        VueUiRelationCircle: { link: 'vue-ui-relation-circle', icon: 'chartRelationCircle', tooltip: true, legend: false, customPalette: true, },
        VueUiRings: { link: 'vue-ui-rings', icon: 'chartRings', tooltip: true, legend: true, customPalette: true, },
        VueUiScatter: { link: 'vue-ui-scatter', icon: 'chartScatter', tooltip: true, legend: true, customPalette: true, },
        VueUiScreenshot: { link: 'vue-ui-screenshot', icon: 'screenshot', tooltip: false, legend: false, customPalette: false, },
        VueUiSkeleton: { link: 'vue-ui-skeleton', icon: 'skeleton', tooltip: false, legend: false, customPalette: false, },
        VueUiSmiley: { link: 'vue-ui-smiley', icon: 'smiley', tooltip: false, legend: false, customPalette: false, },
        VueUiSparkHistogram: { link: 'vue-ui-sparkhistogram', icon: 'chartSparkHistogram', tooltip: false, legend: false, customPalette: false, },
        VueUiSparkStackbar: { link: 'vue-ui-sparkstackbar', icon: 'chartSparkStackbar', tooltip: true, legend: false, customPalette: true, },
        VueUiSparkTrend: { link: 'vue-ui-spark-trend', icon: 'trend', tooltip: false, legend: false, customPalette: false, },
        VueUiSparkbar: { link: 'vue-ui-sparkbar', icon: 'chartSparkbar', tooltip: false, legend: false, customPalette: true, },
        VueUiSparkgauge: { link: 'vue-ui-sparkgauge', icon: 'chartGauge', tooltip: true, legend: false, customPalette: false, },
        VueUiSparkline: { link: 'vue-ui-sparkline', icon: 'chartSparkline', tooltip: false, legend: false, customPalette: false, },
        VueUiStripPlot: { link: 'vue-ui-strip-plot', icon: 'chartStripPlot', tooltip: true, legend: false, customPalette: true, },
        VueUiTable: { link: 'vue-ui-table', icon: 'chartTable', tooltip: false, legend: false, customPalette: false, },
        VueUiTableHeatmap: { link: 'vue-ui-table-heatmap', icon: 'chartTable', tooltip: false, legend: false, customPalette: false, },
        VueUiTableSparkline: { link: 'vue-ui-table-sparkline', icon: 'chartTableSparkline', tooltip: false, legend: false, customPalette: true, },
        VueUiThermometer: { link: 'vue-ui-thermometer', icon: 'chartThermometer', tooltip: false, legend: false, customPalette: true, },
        VueUiTimer: { link: 'vue-ui-timer', icon: 'lap', tooltip: false, legend: false, customPalette: false, },
        VueUiTiremarks: { link: 'vue-ui-tiremarks', icon: 'chartTiremarks', tooltip: false, legend: false, customPalette: false, },
        VueUiTreemap: { link: 'vue-ui-treemap', icon: 'chartTreemap', tooltip: true, legend: true, customPalette: true, },
        VueUiVerticalBar: { link: 'vue-ui-vertical-bar', icon: 'chartVerticalBar', tooltip: true, legend: true, customPalette: true, },
        VueUiWaffle: { link: 'vue-ui-waffle', icon: 'chartWaffle', tooltip: true, legend: true, customPalette: true, },
        VueUiWheel: { link: 'vue-ui-wheel', icon: 'chartWheel', tooltip: false, legend: false, customPalette: false, },
        VueUiWordCloud: { link: 'vue-ui-word-cloud', icon: 'chartWordCloud', tooltip: true, legend: false, customPalette: true, },
        VueUiXy: { link: 'vue-ui-xy', icon: 'chartLine', tooltip: true, legend: true, customPalette: true, },
        VueUiXyCanvas: { link: 'vue-ui-xy-canvas', icon: 'chartLine', tooltip: true, legend: true, customPalette: true, },
        VueUiGizmo: { link: 'vue-ui-gizmo', icon: 'battery', tooltip: false, legend: false, customPalette: false, },
        VueUiStackbar: { link: 'vue-ui-stackbar', icon: 'chartStackbar', tooltip: true, legend: true, customPalette: true, },
        VueUiFunnel: { link: 'vue-ui-funnel', icon: 'chartFunnel', tooltip: false, legend: false, customPalette: false, },
        VueUiHistoryPlot: { link: 'vue-ui-history-plot', icon: 'chartHistoryPlot', tooltip: true, legend: true, customPalette: true, },
        VueUiCirclePack: { link: 'vue-ui-circle-pack', icon: 'chartCirclePack', tooltip: true, legend: false, customPalette: true, },
        VueUiWorld: { link: 'vue-ui-world', icon: 'world', tooltip: true, legend: false, customPalette: true, },
        VueUiRidgeline: { link: 'vue-ui-ridgeline', icon: 'chartRidgeline', tooltip: false, legend: true, customPalette: true, },
        VueUiChord: { link: 'vue-ui-chord', icon: 'chartChord', tooltip: false, legend: true, customPalette: true, }
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
        });

    const keys = Object.keys(components[0]);

    return {
        mapping,
        components,
        keys
    }
}