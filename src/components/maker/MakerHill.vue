<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import {
    PlusIcon,
    PinIcon,
    PinnedOffIcon,
    CopyIcon,
    XIcon,
} from "vue-tabler-icons";
import Tooltip from "../../components/FlexibleTooltip.vue";
import { useMakerStore } from "../../stores/maker";
import { copyComponent, convertArrayToObject, createUid } from "./lib.js";
import { useDefaultDataStore } from "../../stores/defaultData";
import ClearStorageAndRefresh from "../ClearStorageAndRefresh.vue";
import DocLink from "../DocLink.vue";
import CopyComponent from "./CopyComponent.vue";
import ComponentContent from "./ComponentContent.vue";
import MakerKnobs from "./MakerKnobs.vue";
import BaseMakerChart from "../BaseMakerChart.vue";
import BaseDocExampleLink from "../BaseDocExampleLink.vue";
import useMaker from "./useMaker.js";
import BaseButton from "../Base/BaseButton.vue";
import BaseCard from "../BaseCard.vue";

const store = useMainStore();
const makerStore = useMakerStore();
const defaultData = useDefaultDataStore();
const clearStep = ref(0);

const { isFixed, step, chart, fixChart } = useMaker();

const translations = computed(() => {
    return store.translations;
});

const makerTranslations = computed(() => {
    return makerStore.translations;
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const CONFIG_CATEGORIES = computed(() => {
    return [
        {
            key: "general",
            title: makerTranslations.value.categories.general[store.lang],
        },
        {
            key: "layout",
            title: makerTranslations.value.categories.layout[store.lang],
        },
        {
            key: "datapoints",
            title: makerTranslations.value.categories.datapoints[store.lang],
        },
        {
            key: "labels",
            title: makerTranslations.value.categories.labels[store.lang],
        },
        {
            key: "stacking",
            title: makerTranslations.value.categories.stacking[store.lang],
        },
        {
            key: "selector",
            title: makerTranslations.value.categories.selector[store.lang],
        },
        {
            key: "stackbar",
            title: makerTranslations.value.categories.stackbar[store.lang],
        },
        {
          key: "editMenu",
          title: makerTranslations.value.categories.editMenu[store.lang]
        },
        {
            key: "userOptions",
            title: makerTranslations.value.categories.userOptions[store.lang],
        },
        {
            key: "title",
            title: makerTranslations.value.categories.title[store.lang],
        },
        {
            key: "subtitle",
            title: makerTranslations.value.categories.subtitle[store.lang],
        },
    ];
});

const CONFIG_MODEL = ref(
    JSON.parse(JSON.stringify(defaultData.vue_ui_hill.model)),
);

const options = ref({
    datasetItems: {
        label: "label",
        position: 0,
        color: "#CCCCCC",
        muted: false,
        disabled: false,
    },
});

const datasetItems = ref(defaultData.vue_ui_hill.dataset);

onMounted(() => {
    if (localStorage.hillConfig) {
        CONFIG_MODEL.value = JSON.parse(localStorage.hillConfig);
    }
    if (localStorage.hillDataset) {
        datasetItems.value = JSON.parse(localStorage.hillDataset);
    } else {
        localStorage.setItem(
            "hillDataset",
            JSON.stringify(defaultData.vue_ui_hill.dataset),
        );
    }
    step.value += 1;
});

function saveDatasetToLocalStorage() {
    localStorage.hillDataset = JSON.stringify(datasetItems.value);
    clearStep.value += 1;
}

function saveConfigToLocalStorage() {
    localStorage.hillConfig = JSON.stringify(CONFIG_MODEL.value);
    clearStep.value += 1;
}

function resetModel() {
    CONFIG_MODEL.value = JSON.parse(
        JSON.stringify(defaultData.vue_ui_hill.model),
    );
    step.value += 1;
    saveConfigToLocalStorage();
}

function forceChartUpdate() {
    if (!localStorage.hillConfig) {
        localStorage.setItem("hillConfig", {});
    }
    saveConfigToLocalStorage();
    step.value += 1;
}

const finalConfig = computed(() => {
    return convertArrayToObject(CONFIG_MODEL.value);
});

const chartDataset = computed(() => {
    return datasetItems.value.map((item) => ({
        ...item,
        values: Array.isArray(item.values) ? [...item.values] : [],
    }));
});

function addDatasetItem() {
    datasetItems.value.push({
        ...JSON.parse(JSON.stringify(options.value.datasetItems)),
        id: createUid(),
    });
    step.value += 1;
    saveDatasetToLocalStorage();
}

function deleteDatasetItem(id) {
    datasetItems.value = datasetItems.value.filter((_) => _.id !== id);
    saveDatasetToLocalStorage();
}

function saveDs(ds) {
  datasetItems.value = ds;
  saveDatasetToLocalStorage();
}
</script>

<template>
    <div>
      <ClearStorageAndRefresh
            keyConfig="hillConfig"
            keyDataset="hillDataset"
            :key="`clear_${clearStep}`"
        />
        <BaseDocExampleLink link="vue-ui-hill" componentName="VueUiHill" :example="false"/>

        <div class="w-full mt-[64px]" style="height: calc(100% - 64px)">
            <Transition name="fade">
                <BaseMakerChart
                    v-if="!isFixed"
                    :isFixed="isFixed"
                    @fixChart="fixChart"
                    @resetModel="resetModel"
                >
                    <VueUiHill
                        ref="chart"
                        :dataset="chartDataset"
                        :config="finalConfig"
                        :key="`chart_${step}`"
                        @save="saveDs"
                    />
                </BaseMakerChart>
            </Transition>
        </div>

        <details open>
          <summary class="cursor-pointer mb-4">
                {{ makerTranslations.dataset[store.lang] }}
            </summary>
            <div class="flex flex-col gap-2">
              <BaseCard>
                <div
                    v-for="(ds, i) in datasetItems"
                    :key="ds.id"
                    class="w-full overflow-x-auto overflow-y-visible relative shadow dark:shadow-md p-3 rounded flex flex-row gap-3"
                    :style="`background:${ds.color}30`"
                  >
                  <BaseButton
                      color="error"
                      :size="6"
                      fab
                      @click="deleteDatasetItem(ds.id)"
                      tw="absolute -top-2 -left-2"
                  >
                      <XIcon size="14" />
                  </BaseButton>

                  <table>
                    <thead>
                        <tr>
                            <th class="text-left text-xs h-[40px] px-2">
                                {{
                                    makerTranslations.labels.color[
                                        store.lang
                                    ]
                                }}
                            </th>
                            <th class="text-left text-xs px-2">
                                {{
                                    makerTranslations.labels.serieName[
                                        store.lang
                                    ]
                                }}
                            </th>
                            <th class="text-left text-xs px-2">
                                {{
                                    makerTranslations.labels.muted[
                                        store.lang
                                    ]
                                }}
                            </th>
                            <th class="text-left text-xs px-2">
                                {{
                                    makerTranslations.labels.disabled[
                                        store.lang
                                    ]
                                }}
                            </th>
                            <th class="text-left text-xs px-2">
                                {{
                                    makerTranslations.labels.position[
                                        store.lang
                                    ]
                                }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td class="px-2">
                              <input
                                  type="color"
                                  v-model="datasetItems[i].color"
                                  @change="saveDatasetToLocalStorage"
                              />
                          </td>
                          <td class="px-2">
                              <input
                                  class="h-[36px]"
                                  type="text"
                                  v-model="ds.label"
                                  @change="saveDatasetToLocalStorage"
                              />
                          </td>
                          <td class="px-2">
                            <input type="checkbox" v-model="ds.muted" @change="saveDatasetToLocalStorage"/>
                          </td>
                          <td class="px-2">
                            <input type="checkbox" v-model="ds.disabled" @change="saveDatasetToLocalStorage"/>
                          </td>
                          <td class="px-2 flex flex-row align-center gap-4 justify-center place-items-center">
                              <input
                                  class="h-[36px] accent-app-blue"
                                  type="range"
                                  :min="0"
                                  :max="1"
                                  :step="0.01"
                                  v-model="ds.position"
                                  @change="saveDatasetToLocalStorage"
                              />
                              <span style="font-variant: numeric">
                                {{ Math.round(ds.position * 100) / 100 }}
                              </span>
                          </td>
                      </tr>
                  </tbody>
                  </table>
                </div>
              </BaseCard>
            </div>
            <div class="flex flex-row gap-4 mt-4 mb-6">
                <BaseButton
                    color="success"
                    fab
                    :size="10"
                    @click="addDatasetItem"
                    :tooltip="
                        translations.maker.tooltips.addDataset[store.lang]
                    "
                    tooltip-position="right"
                >
                    <PlusIcon />
                </BaseButton>
            </div>
        </details>

        <details open class="mt-6" v-if="makerTranslations.labels">
            <summary class="cursor-pointer">
                {{ makerTranslations.config[store.lang] }}
            </summary>

            <MakerKnobs
                :categories="CONFIG_CATEGORIES"
                :model="CONFIG_MODEL"
                @change="forceChartUpdate"
            />
        </details>

        <div class="overflow-x-auto text-xs max-w-[800px] mx-auto">
            <ComponentContent
                :dataset="
                    datasetItems.map(({ label, position, color, muted, disabled}) => {
                        return { label, position, color, muted, disabled };
                    })
                "
                :config="finalConfig"
                componentName="VueUiHill"
                configName="vue_ui_hill"
                @click="() => copyComponent('componentContent', store)"
                :copyComponentFunc="
                    () => copyComponent('componentContent', store)
                "
                keyConfig="hillConfig"
                keyDataset="hillDataset"
            >
                <template #component-copy>
                    <CopyComponent
                        @click="() => copyComponent('componentContent', store)"
                    />
                </template>
            </ComponentContent>
            <slot name="rater" />
        </div>
    </div>
    <Transition name="fade">
        <BaseMakerChart
            v-if="isFixed"
            :isFixed="isFixed"
            @fixChart="fixChart"
            @resetModel="resetModel"
        >
            <VueUiHill
                :dataset="chartDataset"
                :config="finalConfig"
                :key="`chart_${step}`"
                @save="saveDs"
            />
        </BaseMakerChart>
    </Transition>
</template>