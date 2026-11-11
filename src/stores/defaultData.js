import { createVueUiBumpDefaults } from "./chunks/defaultDataBump.js";
import { createVueUiDagDefaults } from "./chunks/defaultDataDag.js";
import { createVueUiChordDefaults } from "./chunks/defaultDataChord.js";
import { createVueUiRidgelineDefaults } from "./chunks/defaultDataRidgeline.js";
import { createVueUiWorldDefaults } from "./chunks/defaultDataWorld.js";
import { createVueUiCirclePackDefaults } from "./chunks/defaultDataCirclePack.js";
import { createVueUiHistoryPlotDefaults } from "./chunks/defaultDataHistoryPlot.js";
import { createVueUiFunnelDefaults } from "./chunks/defaultDataFunnel.js";
import { createVueUiBulletDefaults } from "./chunks/defaultDataBullet.js";
import { createVueUiStacklineDefaults } from "./chunks/defaultDataStackline.js";
import { createVueUiGizmoDefaults } from "./chunks/defaultDataGizmo.js";
import { createVueUiCarouselTableDefaults } from "./chunks/defaultDataCarouselTable.js";
import { createVueUiParallelCoordinatePlotDefaults } from "./chunks/defaultDataParallelCoordinatePlot.js";
import { createVueUiFlowDefaults } from "./chunks/defaultDataFlow.js";
import { createVueUiXyDefaults } from "./chunks/defaultDataXy.js";
import { createVueUiDonutDefaults } from "./chunks/defaultDataDonut.js";
import { createVueUiWaffleDefaults } from "./chunks/defaultDataWaffle.js";
import { createVueUiRadarDefaults } from "./chunks/defaultDataRadar.js";
import { createVueUiGaugeDefaults } from "./chunks/defaultDataGauge.js";
import { createVueUiOnionDefaults } from "./chunks/defaultDataOnion.js";
import { createVueUiQuadrantDefaults } from "./chunks/defaultDataQuadrant.js";
import { createVueUiWheelDefaults } from "./chunks/defaultDataWheel.js";
import { createVueUiTiremarksDefaults } from "./chunks/defaultDataTiremarks.js";
import { createVueUiChestnutDefaults } from "./chunks/defaultDataChestnut.js";
import { createVueUiHorizontalBarDefaults } from "./chunks/defaultDataHorizontalBar.js";
import { createVueUiHeatmapDefaults } from "./chunks/defaultDataHeatmap.js";
import { createVueUiSparklineDefaults } from "./chunks/defaultDataSparkline.js";
import { createVueUiSparkstackbarDefaults } from "./chunks/defaultDataSparkstackbar.js";
import { createVueUiSparkbarDefaults } from "./chunks/defaultDataSparkbar.js";
import { createVueUiSparkhistogramDefaults } from "./chunks/defaultDataSparkhistogram.js";
import { createVueUiDonutEvolutionDefaults } from "./chunks/defaultDataDonutEvolution.js";
import { createVueUiRingsDefaults } from "./chunks/defaultDataRings.js";
import { createVueUiScatterDefaults } from "./chunks/defaultDataScatter.js";
import { createVueUiAgePyramidDefaults } from "./chunks/defaultDataAgePyramid.js";
import { createVueUiMoodRadarDefaults } from "./chunks/defaultDataMoodRadar.js";
import { createVueUiRelationCircleDefaults } from "./chunks/defaultDataRelationCircle.js";
import { createVueUiThermometerDefaults } from "./chunks/defaultDataThermometer.js";
import { createVueUi3dBarDefaults } from "./chunks/defaultData3dBar.js";
import { createVueUiNestedDonutsDefaults } from "./chunks/defaultDataNestedDonuts.js";
import { createVueUiSparkgaugeDefaults } from "./chunks/defaultDataSparkgauge.js";
import { createVueUiGalaxyDefaults } from "./chunks/defaultDataGalaxy.js";
import { createVueUiKpiDefaults } from "./chunks/defaultDataKpi.js";
import { createVueUiStripPlotDefaults } from "./chunks/defaultDataStripPlot.js";
import { createVueUiSparkTrendDefaults } from "./chunks/defaultDataSparkTrend.js";
import { createVueUiWordCloudDefaults } from "./chunks/defaultDataWordCloud.js";
import { defineStore } from "pinia";
import { defaultDataHill } from "./chunks/defaultDataHill.js";
import { defaultDataStackbar } from "./chunks/defaultDataStackbar.js";

export const useDefaultDataStore = defineStore("defaultData", {
    state: () => {
        return {
            vue_ui_hill: defaultDataHill,
            vue_ui_bump: createVueUiBumpDefaults(),
            vue_ui_dag: createVueUiDagDefaults(),
            vue_ui_chord: createVueUiChordDefaults(),
            vue_ui_ridgeline: createVueUiRidgelineDefaults(),
            vue_ui_world: createVueUiWorldDefaults(),
            vue_ui_circle_pack: createVueUiCirclePackDefaults(),
            vue_ui_history_plot: createVueUiHistoryPlotDefaults(),
            vue_ui_funnel: createVueUiFunnelDefaults(),
            vue_ui_bullet: createVueUiBulletDefaults(),
            vue_ui_stackbar: defaultDataStackbar,
            vue_ui_stackline: createVueUiStacklineDefaults(),
            vue_ui_gizmo: createVueUiGizmoDefaults(),
            vue_ui_carousel_table: createVueUiCarouselTableDefaults(),
            vue_ui_parallel_coordinate_plot:
                createVueUiParallelCoordinatePlotDefaults(),
            vue_ui_flow: createVueUiFlowDefaults(),
            vue_ui_xy: createVueUiXyDefaults(),
            vue_ui_donut: createVueUiDonutDefaults(),
            vue_ui_waffle: createVueUiWaffleDefaults(),
            vue_ui_radar: createVueUiRadarDefaults(),
            vue_ui_gauge: createVueUiGaugeDefaults(),
            vue_ui_onion: createVueUiOnionDefaults(),
            vue_ui_quadrant: createVueUiQuadrantDefaults(),
            vue_ui_wheel: createVueUiWheelDefaults(),
            vue_ui_tiremarks: createVueUiTiremarksDefaults(),
            vue_ui_chestnut: createVueUiChestnutDefaults(),
            vue_ui_horizontal_bar: createVueUiHorizontalBarDefaults(),
            vue_ui_heatmap: createVueUiHeatmapDefaults(),
            vue_ui_sparkline: createVueUiSparklineDefaults(),
            vue_ui_sparkstackbar: createVueUiSparkstackbarDefaults(),
            vue_ui_sparkbar: createVueUiSparkbarDefaults(),
            vue_ui_sparkhistogram: createVueUiSparkhistogramDefaults(),
            vue_ui_donut_evolution: createVueUiDonutEvolutionDefaults(),
            vue_ui_rings: createVueUiRingsDefaults(),
            vue_ui_scatter: createVueUiScatterDefaults(),
            vue_ui_age_pyramid: createVueUiAgePyramidDefaults(),
            vue_ui_mood_radar: createVueUiMoodRadarDefaults(),
            vue_ui_relation_circle: createVueUiRelationCircleDefaults(),
            vue_ui_thermometer: createVueUiThermometerDefaults(),
            vue_ui_3d_bar: createVueUi3dBarDefaults(),
            vue_ui_nested_donuts: createVueUiNestedDonutsDefaults(),
            vue_ui_sparkgauge: createVueUiSparkgaugeDefaults(),
            vue_ui_galaxy: createVueUiGalaxyDefaults(),
            vue_ui_kpi: createVueUiKpiDefaults(),
            vue_ui_strip_plot: createVueUiStripPlotDefaults(),
            vue_ui_spark_trend: createVueUiSparkTrendDefaults(),
            vue_ui_word_cloud: createVueUiWordCloudDefaults(),
        };
    },
});
