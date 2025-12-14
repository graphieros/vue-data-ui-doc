import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import { 
    VueUiTable, 
    VueUiDonut, 
    VueUiWaffle, 
    VueUiRadar, 
    VueUiQuadrant, 
    VueUiGauge,
    VueUiChestnut,
    VueUiOnion,
    VueUiVerticalBar,
    VueUiRating,
    VueUiSkeleton,
    VueUiSparkline,
    VueUiHeatmap,
    VueUiScatter,
    VueUiCandlestick,
    VueUiAgePyramid,
    VueUiSparkbar,
    VueUiDashboard,
    VueUiSmiley,
    VueUiRelationCircle,
    VueUiThermometer,
    VueUiSparkStackbar,
    VueUiSparkHistogram,
    VueUiRings,
    VueUiWheel,
    VueUiTiremarks,
    VueUiDonutEvolution,
    VueUiIcon,
    VueUiMoodRadar,
    VueUi3dBar,
    VueUiDigits,
    VueUiMolecule,
    VueUiTableSparkline,
    Arrow,
    VueUiMiniLoader,
    VueUiNestedDonuts,
    VueUiSparkgauge,
    VueDataUi,
    VueUiQuickChart,
    VueUiStripPlot,
    VueUiTreemap,
    VueUiWordCloud,
    VueUiXyCanvas,
    VueUiCarouselTable,
    VueUiGizmo,
    VueUiStackbar,
    VueUiPattern,
    VueUiWorld,
    VueUiRidgeline,
    VueUiChord,
    VueUiHorizontalBar,
    VueUiStackline,
    VueUiDag,
    VueUiGeo
} from "vue-data-ui";
import "vue-data-ui/style.css";

import VueUiXy from "vue-data-ui/vue-ui-xy";
import VueUiAnnotator from "vue-data-ui/vue-ui-annotator";

const pinia = createPinia();

const app = createApp(App).use(router);
app.use(pinia);
app.component("VueUiXy", VueUiXy);
app.component("VueUiTable", VueUiTable);
app.component("VueUiDonut", VueUiDonut);
app.component("VueUiWaffle", VueUiWaffle);
app.component("VueUiRadar", VueUiRadar);
app.component("VueUiQuadrant", VueUiQuadrant);
app.component("VueUiGauge", VueUiGauge);
app.component("VueUiChestnut", VueUiChestnut);
app.component("VueUiOnion", VueUiOnion);
app.component("VueUiVerticalBar", VueUiVerticalBar);
app.component("VueUiHorizontalBar", VueUiHorizontalBar);
app.component("VueUiRating", VueUiRating);
app.component("VueUiSkeleton", VueUiSkeleton);
app.component("VueUiSparkline", VueUiSparkline);
app.component("VueUiHeatmap", VueUiHeatmap);
app.component("VueUiScatter", VueUiScatter);
app.component("VueUiCandlestick", VueUiCandlestick);
app.component("VueUiAgePyramid", VueUiAgePyramid);
app.component("VueUiSparkbar", VueUiSparkbar);
app.component("VueUiDashboard", VueUiDashboard);
app.component("VueUiAnnotator", VueUiAnnotator);
app.component("VueUiSmiley", VueUiSmiley);
app.component("VueUiRelationCircle", VueUiRelationCircle);
app.component("VueUiThermometer", VueUiThermometer);
app.component("VueUiSparkStackbar", VueUiSparkStackbar);
app.component("VueUiSparkHistogram", VueUiSparkHistogram);
app.component("VueUiRings", VueUiRings);
app.component("VueUiWheel", VueUiWheel);
app.component("VueUiTiremarks", VueUiTiremarks);
app.component("VueUiDonutEvolution", VueUiDonutEvolution);
app.component("VueUiIcon", VueUiIcon);
app.component("VueUiMoodRadar", VueUiMoodRadar);
app.component("VueUi3dBar", VueUi3dBar);
app.component("VueUiDigits", VueUiDigits);
app.component("VueUiMolecule", VueUiMolecule);
app.component("VueUiTableSparkline", VueUiTableSparkline);
app.component("Arrow", Arrow)
app.component("VueUiMiniLoader", VueUiMiniLoader)
app.component("VueUiNestedDonuts", VueUiNestedDonuts)
app.component("VueUiSparkgauge", VueUiSparkgauge)
app.component("VueDataUi", VueDataUi)
app.component("VueUiQuickChart", VueUiQuickChart)
app.component("VueUiStripPlot", VueUiStripPlot)
app.component("VueUiTreemap", VueUiTreemap)
app.component("VueUiWordCloud", VueUiWordCloud)
app.component("VueUiXyCanvas", VueUiXyCanvas)
app.component("VueUiCarouselTable", VueUiCarouselTable)
app.component("VueUiGizmo", VueUiGizmo)
app.component("VueUiStackbar", VueUiStackbar)
app.component('VueUiPattern', VueUiPattern)
app.component('VueUiWorld', VueUiWorld)
app.component('VueUiRidgeline', VueUiRidgeline)
app.component('VueUiChord', VueUiChord)
app.component('VueUiStackline', VueUiStackline)
app.component('VueUiDag', VueUiDag)
app.component('VueUiGeo', VueUiGeo)

app.mount('#app')
