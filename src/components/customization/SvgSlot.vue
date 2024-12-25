<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCustomizationBox from "./BaseCustomizationBox.vue";
import CodeParser from "./CodeParser.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
  return store.translations;
});

const xyDataset = ref([
  {
    name: "Series 1",
    series: [
      -55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21,
      34, 55,
    ],
    type: "line",
    color: "rgb(66,211,146)",
    shape: "circle",
    smooth: true,
  },
]);

const donutDataset = ref([
  {
    name: "Serie 1",
    color: "#5f8bee",
    values: [100],
  },
  {
    name: "Serie 2",
    color: "#42d392",
    values: [200],
  },
  {
    name: "Serie 1",
    color: "#ff6400",
    values: [300, 1],
  },
]);

const xyConfig = ref({
  chart: {
    zoom: {
      show: false,
    },
    userOptions: {
      show: false,
    },
  },
});

const donutConfig = ref({
  style: {
    chart: {
      legend: {
        show: false,
      },
      title: {
        text: "Donut title",
      },
    },
  },
  userOptions: {
    show: false,
  },
});

const donutDatasetCats = ref([
  {
    name: "Burmese",
    color: "#5f8bee",
    values: [100],
  },
  {
    name: "Abyssinian",
    color: "#42d392",
    values: [200],
  },
  {
    name: "Persian",
    color: "#ff6400",
    values: [300, 1],
  },
]);

const donutImageConfig = ref({
  style: {
    chart: {
      title: {
        text: 'Programming cats',
        subtitle: {
          text: 'Best programming cats'
        }
      },
      tooltip: {
        backgroundOpacity: 50,
      },
      layout: {
        labels: {
          hollow: {
            average: { show: false },
            total: { show: false }
          }
        }
      }
    }
  }
})

const contentComment = ref(`<VueUiXy :dataset="dataset" :config="config">
    <template #svg="{ svg }">
        <foreignObject 
            :x="svg.width / 2 - 90" 
            :y="svg.height / 2 - 250" 
            height="100" 
            width="180"
        >
            <div class="bg-gray-100 p-3 shadow">
                This comment was added in the slot
            </div>
        </foreignObject>
    </template>
</VueUiXy>`);

const contentChart = ref(`<VueUiXy :dataset="dataset" :config="config">
    <template #svg>
        <foreignObject 
            :x="50" 
            :y="0" 
            height="250" 
            width="250"
        >
            <div class="w-full">
                <VueUiDonut 
                    :dataset="donutDataset" 
                    :config="donutConfig"
                />
            </div>
        </foreignObject>
    </template>
</VueUiXy>`);

const contentArrow = ref(`<template>
    <VueUiXy :dataset="dataset" :config="config">
        <template #svg>
            <g>
                <Arrow 
                    :x1="150"
                    :y1="100"
                    :x2="270"
                    :y2="300"
                    :markerSize="20"
                />
                <foreignObject 
                    :x="100" 
                    :y="100" 
                    height="100" 
                    width="180"
                >
                    <div class="bg-gray-100 p-3 shadow">
                        Wow this random datapoint is pretty
                    </div>
                </foreignObject>
            </g>
        </template>
    </VueUiXy>
</template>`);

const contentImage = ref(`<template>
    <VueUiDonut :dataset="dataset" :config="config">
        <template #svg="{ svg }">
          <foreignObject
            width="130"
            height="130"
            :x="svg.width / 2 - 65"
            :y="svg.height / 2 - 65"
            :style="{
              pointerEvents: 'none'
            }"
          >
            <img 
              src="programming_cat.png" 
              alt="10x cat programmers"
            >
          </foreignObject>
        </template>
    </VueUiXy>
</template>`)

</script>

<template>
  <div class="px-4 max-w-[1200px] mx-auto mt-4 mb-8" dir="auto">
    {{ translations.customization.p1[store.lang] }}
  </div>

  <BaseCustomizationBox :title="translations.customization.comment[store.lang]">
    <template #code>
      <CodeParser :content="contentComment" language="html" />
    </template>

    <template #chart>
      <VueUiXy :dataset="xyDataset" :config="xyConfig">
        <template #svg="{ svg }">
          <foreignObject
            :x="svg.width / 2 - 90"
            :y="svg.height / 2 - 250"
            height="100"
            width="180"
          >
            <div class="bg-gray-100 p-3 shadow">
              This comment was added in the slot
            </div>
          </foreignObject>
        </template>
      </VueUiXy>
    </template>
  </BaseCustomizationBox>

  <BaseCustomizationBox
    :title="translations.customization.otherChart[store.lang]"
  >
    <template #code>
      <CodeParser :content="contentChart" language="html" />
    </template>

    <template #chart>
      <VueUiXy :dataset="xyDataset" :config="xyConfig">
        <template #svg>
          <foreignObject :x="50" :y="0" height="250" width="250">
            <div class="w-full">
              <VueUiDonut :dataset="donutDataset" :config="donutConfig" />
            </div>
          </foreignObject>
        </template>
      </VueUiXy>
    </template>
  </BaseCustomizationBox>

  <BaseCustomizationBox :title="translations.customization.arrow[store.lang]">
    <template #code>
      <pre>
<code>
&lt;script setup&gt;
import { Arrow } from "vue-data-ui"
&lt;/script&gt;
</code>
<CodeParser :content="contentArrow" language="html" />
</pre>
    </template>

    <template #chart>
      <VueUiXy :dataset="xyDataset" :config="xyConfig">
        <template #svg>
          <g>
            <Arrow :x1="150" :x2="270" :y1="100" :y2="300" :markerSize="20" />
            <foreignObject :x="100" :y="100" height="100" width="180">
              <div class="bg-gray-100 p-3 shadow">
                Wow this random datapoint is pretty
              </div>
            </foreignObject>
          </g>
        </template>
      </VueUiXy>
    </template>
    <template #after>
      <details>
        <summary class="cursor-pointer">
          {{ translations.customization.arrowDetails[store.lang] }}
        </summary>
        <div class="px-4 py-2 bg-gray-100 dark:bg-[#2A2A2A]">
          <h5>Props :</h5>
          <ul class="pl-3">
            <li><code>markerEnd?: boolean;</code> (default: true)</li>
            <li><code>markerSize?: number;</code> (default: 10)</li>
            <li><code>markerStart?: boolean;</code> (default: false)</li>
            <li><code>stroke?: string;</code> (default: "#2D353C")</li>
            <li><code>strokeDahsarray?: number;</code> (default: 0)</li>
            <li>
              <code>strokeLinecap?: "round" | "butt" | "square";</code>
              (default: "round")
            </li>
            <li><code>strokeWidth?: number;</code> (default: 1)</li>
            <li><code>x1: number;</code> (default: 0)</li>
            <li><code>x2: number;</code> (default: 0)</li>
            <li><code>y1: number;</code> (default: 0)</li>
            <li><code>y2: number;</code> (default: 0)</li>
          </ul>
        </div>
      </details>
    </template>
  </BaseCustomizationBox>

  <BaseCustomizationBox :title="translations.customization.injectImage[store.lang]">
    <template #code>
      <CodeParser :content="contentImage" language="html" />
    </template>

    <template #chart>
      <VueUiDonut :dataset="donutDatasetCats" :config="donutImageConfig">
        <template #svg="{ svg }">
          <foreignObject :x="svg.width / 2  - 65" :y="svg.height / 2 - 65" width="130" height="130" style="overflow: visible; pointer-events: none;">
            <img src="../../assets/programming_cat.png">
          </foreignObject>
        </template>
      </VueUiDonut>
    </template>
  </BaseCustomizationBox>
</template>
