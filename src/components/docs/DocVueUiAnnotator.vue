<script setup>
import { ref, computed, watch, nextTick, onBeforeMount } from "vue";
import Box from "../Box.vue";
import { CopyIcon, InfoTriangleIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { donutConfig, donutDataset } from "./dash";
import GitHubLink from "../GitHubLink.vue";
import { useConfig } from "../../assets/useConfig";
import SuspenseWrapper from "../SuspenseWrapper.vue";
import BaseDocActions from "./BaseDocActions.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);



watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const config = ref({
  style: {
    backgroundColor: "#FFFFFF",
    color: "#2D353C",
    fontFamily: "inherit",
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

const initShapes = ref([
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

const initLastSelectedShape = ref({
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

const shapes = ref([]);


const lastSelectedShape = ref(undefined);

onBeforeMount(() => {
  if(localStorage.getItem("vue-data-ui-annotator") === null) {
    localStorage.setItem("vue-data-ui-annotator", JSON.stringify({
      shapes: initShapes.value,
      lastSelectedShape: initLastSelectedShape.value
    }));
    shapes.value = initShapes.value;
    lastSelectedShape.value = initLastSelectedShape.value;
  } else {
    shapes.value = JSON.parse(localStorage.getItem("vue-data-ui-annotator")).shapes;
    lastSelectedShape.value = JSON.parse(localStorage.getItem("vue-data-ui-annotator")).lastSelectedShape;
  }
});



function saveAnnotations({ shapes, lastSelectedShape }) {
  console.log({ shapes, lastSelectedShape });
  localStorage['vue-data-ui-annotator'] = JSON.stringify({
      shapes,
      lastSelectedShape
    })
}

</script>

<template>
    <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="annotator" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Annotator</span></span>
        </h1>
        <div class="mx-auto w-full max-w-[400px] text-center mb-4">
            {{ translations.docs.comments.annotator.description[store.lang] }}<br>
        </div>
            <div class="text-app-orange flex flex-row gap-2 mx-auto text-center w-full place-items-center justify-center">
              <InfoTriangleIcon/> {{ translations.docs.comments.annotator.warning[store.lang] }}
            </div>
        <div :class="`transition-all mx-auto`">
        <div v-if="isAnnotatorOpen" class="py-2">
          {{ translations.docs.comments.annotator.openState[store.lang] }}
        </div>
        <div v-else class="py-2">
          {{ translations.docs.comments.annotator.closedState[store.lang] }}
        </div>

        <SuspenseWrapper :width="200" :height="200">
          <VueUiAnnotator 
            :dataset="{ shapes, lastSelectedShape }"
            :config="mutableConfig"
            @toggleOpenState="toggleOpenState" 
            @saveAnnotations="saveAnnotations"
          >
              <div>
                  <VueUiDonut :config="{...donutConfig, useCssAnimation: !isAnnotatorOpen }" :dataset="donutDataset"></VueUiDonut>
              </div>
          </VueUiAnnotator>
        </SuspenseWrapper>
        </div>

        <BaseDocActions
          targetLink="vue-ui-annotator"
          :configSource="mainConfig.vue_ui_annotator"
        />

        <Box showEmits>
          <template #tab0>
            {{ translations.docs.datastructure[store.lang] }}<br>
            {{ translations.docs.comments.annotator.datastructure[store.lang] }}
            <div class="mt-4">
              TS type: <code class="text-app-green">VueUiAnnotatorDataset</code>
            </div>
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
const <span class="text-black dark:text-app-green">dataset: VueUiAnnotatorDataset</span> = {
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
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiAnnotatorConfig</code>
                </div>
  <pre>
  <code>
  const <span class="text-black dark:text-app-blue">config: VueUiAnnotatorConfig</span> = {
    style: {
        backgroundColor: <input  type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
        color: <input  type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")
        fontFamily: "inherit",
        showPrint: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.showPrint" @change="forceChartUpdate()">, (default: true)
        showSave: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.showSave" @change="forceChartUpdate()">, (default: true)
        showTooltips: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.showTooltips" @change="forceChartUpdate()">, (default: true)
        buttons: {
            borderRadius: <input type="number" min="0" max="32" v-model="mutableConfig.style.buttons.borderRadius">, (default: 6)
            controls: {
                backgroundColor: <input  type="color" v-model="mutableConfig.style.buttons.controls.backgroundColor">, (default: "#FFFFFF")
                color: <input  type="color" v-model="mutableConfig.style.buttons.controls.color">, (default: "#2D353C")
                border: <input type="text" v-model="mutableConfig.style.buttons.controls.border">, (default: "1px solid #262626")
                selected: {
                    backgroundColor: <input  type="color" v-model="mutableConfig.style.buttons.controls.selected.backgroundColor">, (default: "#2D353C")
                    color: <input  type="color" v-model="mutableConfig.style.buttons.controls.selected.color">, (default: "#fafafa")
                    border: <input type="text" v-model="mutableConfig.style.buttons.controls.selected.border">, (default: "1px solid #CCCCCC")
                }
            },
            shapes: {
              backgroundColor: <input  type="color" v-model="mutableConfig.style.buttons.shapes.backgroundColor">, (default: "#FFFFFF")
                color: <input  type="color" v-model="mutableConfig.style.buttons.shapes.color">, (default: "#2D353C")
                border: <input type="text" v-model="mutableConfig.style.buttons.shapes.border">, (default: "1px solid #262626")
                selected: {
                    backgroundColor: <input  type="color" v-model="mutableConfig.style.buttons.shapes.selected.backgroundColor">, (default: "#2D353C")
                    color: <input  type="color" v-model="mutableConfig.style.buttons.shapes.selected.color">, (default: "#fafafa")
                    border: <input type="text" v-model="mutableConfig.style.buttons.shapes.selected.border">, (default: "1px solid #CCCCCC")
                }
            }
        },
        tooltips: {
            backgroundColor: <input  type="color" v-model="mutableConfig.style.tooltips.backgroundColor">, (default: "#fafafa")
            color: <input  type="color" v-model="mutableConfig.style.tooltips.color">, (default: "#2D353C")
            border: <input type="text" v-model="mutableConfig.style.tooltips.border">, (default: "1px solid #CCCCCC")
            borderRadius: <input type="number" min="0" max="32" v-model="mutableConfig.style.tooltips.borderRadius">, (default: 6)
            boxShadow: <input type="text" v-model="mutableConfig.style.tooltips.boxShadow">, (default: "0 6px 12px -6px rgba(0,0,0,0.2)")
        }
    },
    translations: {
        colorAlpha: <input type="text" v-model="mutableConfig.translations.colorAlpha">, (default: "Color alpha")
        dashedLines: <input type="text" v-model="mutableConfig.translations.dashedLines">, (default: "Dashed lines")
        filled: <input type="text" v-model="mutableConfig.translations.filled">, (default: "Filled")
        fontSize: <input type="text" v-model="mutableConfig.translations.fontSize">, (default: "Font size")
        thickness: <input type="text" v-model="mutableConfig.translations.thickness">, (default: "Thickness")
        title: <input type="text" v-model="mutableConfig.translations.title">, (default: "Annotations")
        tooltipGroup: <input type="text" v-model="mutableConfig.translations.tooltipGroup">, (default: "Select & group")
        tooltipDelete: <input type="text" v-model="mutableConfig.translations.tooltipDelete">, (default: "Delete")
        tooltipMove: <input type="text" v-model="mutableConfig.translations.tooltipMove">, (default: "Move")
        tooltipResize: <input type="text" v-model="mutableConfig.translations.tooltipResize">, (default: "Resize")
        tooltipBringToFront: <input type="text" v-model="mutableConfig.translations.tooltipBringToFront">, (default: "Bring to front")
        tooltipBringToBack: <input type="text" v-model="mutableConfig.translations.tooltipBringToBack">, (default: "Bring to back")
        tooltipDuplicate: <input type="text" v-model="mutableConfig.translations.tooltipDuplicate">, (default: "Duplicate")
        tooltipUndo: <input type="text" v-model="mutableConfig.translations.tooltipUndo">, (default: "Undo last shape")
        tooltipPdf: <input type="text" v-model="mutableConfig.translations.tooltipPdf">, (default: "Save pdf")
        tooltipSave: <input type="text" v-model="mutableConfig.translations.tooltipSave">, (default: "Save annotations")
        tooltipShapeCircle: <input type="text" v-model="mutableConfig.translations.tooltipShapeCircle">, (default: "Draw circle")
        tooltipShapeRect: <input type="text" v-model="mutableConfig.translations.tooltipShapeRect">, (default: "Draw rect")
        tooltipShapeArrow: <input type="text" v-model="mutableConfig.translations.tooltipShapeArrow">, (default: "Draw arrow")
        tooltipShapeFreehand: <input type="text" v-model="mutableConfig.translations.tooltipShapeFreehand">, (default: "Freehand line")
        tooltipShapeText: <input type="text" v-model="mutableConfig.translations.tooltipShapeText">, (default: "Text mode")
        tooltipShapeTextLeft: <input type="text" v-model="mutableConfig.translations.tooltipShapeTextLeft">, (default: "Align left")
        tooltipShapeTextCenter: <input type="text" v-model="mutableConfig.translations.tooltipShapeTextCenter">, (default: "Align center")
        tooltipShapeTextRight: <input type="text" v-model="mutableConfig.translations.tooltipShapeTextRight">, (default: "Align right")
        tooltipShapeTextBullet: <input type="text" v-model="mutableConfig.translations.tooltipShapeTextBullet">, (default: "Bullet points")
        tooltipShapeTextBold: <input type="text" v-model="mutableConfig.translations.tooltipShapeTextBold">, (default: "Bold")
        tooltipShapeTextItalic: <input type="text" v-model="mutableConfig.translations.tooltipShapeTextItalic">, (default: "Italic")
        tooltipShapeTextUnderline: <input type="text" v-model="mutableConfig.translations.tooltipShapeTextUnderline">, (default: "Underlined")
        tooltipShapeColor: <input type="text" v-model="mutableConfig.translations.tooltipShapeColor">, (default: "Color")
    }
}
  </code>
  </pre>
          </template>
          <template #tab2>
            <div><code><b>@toggleOpenState</b></code></div>
            <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.comments.annotator.emits.toggleOpenState[store.lang] }}</div>
<pre>
<code>
    {
        isOpen: boolean,
    }
</code>
</pre>    
          <div class="border-t border-gray-500 pt-4"><code><b>@saveAnnotations</b></code></div>
            <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.comments.annotator.emits.saveAnnotations[store.lang] }}</div>
<pre>
<code>
    {
        shapes: [],
        lastSelectedShape: {}
    }
</code>
</pre>    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.comments.annotator.emits.calledWhen[store.lang] }}</div>        
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