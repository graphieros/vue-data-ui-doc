<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import { xyConfig, xyDataset, donutConfig, donutDataset, waffleConfig, waffleDataset, radarConfig, radarDataset, chestnutConfig, chestnutDataset } from "./dash";

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const config = ref({
  style: {
    backgroundColor: "#FFFFFF",
    color: "#2D353C",
    fixedTools: false,
    fontFamily: "inherit",
    hideWhenFolded: false,
    showPrint: true,
    showSave: true,
    showTooltips: true,
    buttons: {
      borderRadius: 6,
      controls: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
        border: "1px solid #262626",
        selected: {
          backgroundColor: "#2D353C",
          color: "#fafafa",
          border: "1px solid #CCCCCC"
        }
      },
      shapes: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
        border: "1px solid #262626",
        selected: {
          backgroundColor: "#2D353C",
          color: "#fafafa",
          border: "1px solid #CCCCCC"
        }
      }
    },
    tooltips: {
      backgroundColor: "#fafafa",
      color: "#2D353C",
      border: "1px solid #CCCCCC",
      borderRadius: 6,
      boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)"
    }
  },
  translations: {
    colorAlpha: "Color alpha",
    dashedLines: "Dashed lines",
    filled: "Filled",
    fontSize: "Font size",
    thickness: "Thickness",
    title: "Annotations",
    tooltipGroup: "Select & group",
    tooltipDelete: "Delete",
    tooltipMove: "Move",
    tooltipResize: "Resize",
    tooltipBringToFront: "Bring to front",
    tooltipBringToBack: "Bring to back",
    tooltipDuplicate: "Duplicate",
    tooltipUndo: "Undo last shape",
    tooltipPdf: "Save pdf",
    tooltipSave: "Save annotations",
    tooltipShapeCircle: "Draw circle",
    tooltipShapeRect: "Draw rect",
    tooltipShapeArrow: "Draw arrow",
    tooltipShapeFreehand: "Freehand line",
    tooltipShapeText: "Text mode",
    tooltipShapeTextLeft: "Align left",
    tooltipShapeTextCenter: "Align center",
    tooltipShapeTextRight: "Align right",
    tooltipShapeTextBullet: "Bullet points",
    tooltipShapeTextBold: "Bold",
    tooltipShapeTextItalic: "Italic",
    tooltipShapeTextUnderline: "Underlined",
    tooltipShapeColor: "Color"
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
}
function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const isAnnotatorOpen = ref(false);

function toggleOpenState(state) {
  isAnnotatorOpen.value = state.isOpen;
}

const shapes = ref([
    {
        "alpha": "FA",
        "id": "rect_5984.908326049341_1697899539759",
        "color": "#ffffff",
        "isFilled": true,
        "rectStrokeWidth": 2,
        "rectHeight": 112.14181105579797,
        "rectWidth": 305.56046572706396,
        "type": "rect",
        "x": 83.33469387819179,
        "y": 137.0906650348501,
        "strokeWidth": 1,
        "isDash": false
    },
    {
        "id": "text_262.5479805029807_56906.53122089711",
        "type": "text",
        "lines": 2,
        "x": 104.93996308004542,
        "y": 181.3300697001898,
        "textContent": "Serie 1 represents half of ‎the total, with an increase ‎by 10 points from last quarter.",
        "fontSize": 20,
        "textAlign": "start",
        "isBold": false,
        "isItalic": false,
        "isUnderline": false,
        "color": "#000000",
        "isBulletTextMode": false
    },
    {
        "id": "arrow_3029.9709482549497_1697899520213",
        "x": 389.9239669971587,
        "y": 200.87770449499425,
        "endX": 478.40273708135186,
        "endY": 288.32766718728436,
        "type": "arrow",
        "color": "#000000",
        "strokeWidth": 1,
        "isDash": false
    },
    {
        "alpha": "FA",
        "id": "circle_4641.74639444795_1697899591317",
        "color": "#ff6400",
        "isFilled": true,
        "circleRadius": 23.086461422195327,
        "circleStrokeWidth": 2,
        "type": "circle",
        "x": 83.33469387819179,
        "y": 141.20597309543473,
        "strokeWidth": 1,
        "isDash": false
    }
]);

const lastSelectedShape = ref({
    "alpha": "FA",
    "id": "circle_4641.74639444795_1697899591317",
    "color": "#ff6400",
    "isFilled": true,
    "circleRadius": 23.086461422195327,
    "circleStrokeWidth": 2,
    "type": "circle",
    "x": 83.33469387819179,
    "y": 141.20597309543473,
    "strokeWidth": 1,
    "isDash": false
});


function saveAnnotations({ shapes, lastSelectedShape }) {
  console.log({ shapes, lastSelectedShape });
}

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiAnnotator</h1>
        <div class="mx-auto w-full max-w-[400px] text-center mb-4">
            {{ translations.docs.comments.annotator.description[store.lang] }}
        </div>
        <div :class="`transition-all mx-auto`">
        <div v-if="isAnnotatorOpen" class="py-2">
          {{ translations.docs.comments.annotator.openState[store.lang] }}
        </div>
        <div v-else class="py-2">
          {{ translations.docs.comments.annotator.closedState[store.lang] }}
        </div>
        <VueUiAnnotator 
          :dataset="{ shapes, lastSelectedShape }"
          :config="mutableConfig"
          @toggleOpenState="toggleOpenState" 
          @saveAnnotations="saveAnnotations"
        >
            <div>
                <VueUiDonut :config="donutConfig" :dataset="donutDataset"></VueUiDonut>
            </div>
        </VueUiAnnotator>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_annotator)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
        </div>
        <Box showEmits>
          <template #tab0>
            {{ translations.docs.datastructure[store.lang] }}<br>
            {{ translations.docs.comments.annotator.datastructure[store.lang] }}
            <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
      shapes: [],
      lastSelectedShape: {}
    }
</code>
</pre>            
            </div>
            {{ translations.docs.example[store.lang] }} :
            <div class="w-full overflow-x-auto">
<span class="text-app-orange">{{ translations.docs.comments.annotator.notByYourself[store.lang] }}</span>
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = {
    shapes: [
        {
            "alpha": "FA",
            "id": "rect_5984.908326049341_1697899539759",
            "color": "#ffffff",
            "isFilled": true,
            "rectStrokeWidth": 2,
            "rectHeight": 112.14181105579797,
            "rectWidth": 305.56046572706396,
            "type": "rect",
            "x": 83.33469387819179,
            "y": 137.0906650348501,
            "strokeWidth": 1,
            "isDash": false
        },
        {
            "id": "text_262.5479805029807_56906.53122089711",
            "type": "text",
            "lines": 2,
            "x": 104.93996308004542,
            "y": 181.3300697001898,
            "textContent": "Serie 1 represents half of ‎the total, with an increase ‎by 10 points from last quarter.",
            "fontSize": 20,
            "textAlign": "start",
            "isBold": false,
            "isItalic": false,
            "isUnderline": false,
            "color": "#000000",
            "isBulletTextMode": false
        },
        {
            "id": "arrow_3029.9709482549497_1697899520213",
            "x": 389.9239669971587,
            "y": 200.87770449499425,
            "endX": 478.40273708135186,
            "endY": 288.32766718728436,
            "type": "arrow",
            "color": "#000000",
            "strokeWidth": 1,
            "isDash": false
        },
        {
            "alpha": "FA",
            "id": "circle_4641.74639444795_1697899591317",
            "color": "#ff6400",
            "isFilled": true,
            "circleRadius": 23.086461422195327,
            "circleStrokeWidth": 2,
            "type": "circle",
            "x": 83.33469387819179,
            "y": 141.20597309543473,
            "strokeWidth": 1,
            "isDash": false
        }
    ],
    lastSelectedShape: {
        "alpha": "FA",
        "id": "circle_4641.74639444795_1697899591317",
        "color": "#ff6400",
        "isFilled": true,
        "circleRadius": 23.086461422195327,
        "circleStrokeWidth": 2,
        "type": "circle",
        "x": 83.33469387819179,
        "y": 141.20597309543473,
        "strokeWidth": 1,
        "isDash": false
    }
}
</code>
</pre>            
            </div>
          </template>
          <template #tab1>
            <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                Full config will be available very soon :)
          </template>
          <template #tab2>
            Available very soon :)
          </template>
        </Box>
    </div>
</template>

<style>
.vue-ui-annotator input[type="color"] {
  width: 28px !important;
  height: 32px !important;
  background: white;
}

.vue-ui-annotator input[type="color"]::-webkit-color-swatch {
  border: 1px solid #2D353C !important;
  border-radius: 6px !important;
  box-shadow: none !important;
}

.vue-ui-annotator input[type="number"] {
  background: white;
  border: 1px solid #2D353C !important;
  border-radius: 6px !important;
  color: #2D353C !important;
}

</style>