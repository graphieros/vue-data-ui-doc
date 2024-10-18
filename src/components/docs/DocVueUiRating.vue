<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocActions from "./BaseDocActions.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const config = ref({
  type: "star",
  readonly: true,
  from: 1,
  to: 5,
  style: {
    fontFamily: "inherit",
    animated: true,
    itemSize: 32,
    backgroundColor: "#F3F4F6",
    star: {
      activeColor: "#FFD055",
      borderColor: "#FFD055",
      borderWidth: 3,
      apexes: 5,
      inactiveColor: "#F3F4F6",
      useGradient: true
    },
    image: {
      src: "",
      inactiveOpacity: 0.3,
      alt: "rating image"
    },
    title: {
      textAlign: "center",
      fontSize: 20,
      color: "#1A1A1A",
      bold: true,
      text: "Title",
      offsetY: 6,
      subtitle: {
        fontSize: 14,
        color: "#565656",
        bold: false,
        text: "Subtitle",
        offsetY: 12
      }
    },
    rating: {
      show: true,
      fontSize: 28,
      bold: true,
      roundingValue: 1,
      position: "bottom",
      offsetY: 12,
      offsetX: 0
    },
    tooltip: {
      show: true,
      fontSize: 14,
      offsetY: 0,
      color: "#1A1A1A",
      bold: true,
      backgroundColor: "#F3F4F6",
      borderColor: "#404040",
      borderRadius: 4,
      boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)"
    }
  }
});
const darkModeConfig = ref({
  type: "star",
  readonly: true,
  from: 1,
  to: 5,
  style: {
    fontFamily: "inherit",
    animated: true,
    itemSize: 32,
    backgroundColor: "#1A1A1A",
    star: {
      activeColor: "#FFD055",
      borderColor: "#FFD055",
      borderWidth: 3,
      apexes: 5,
      inactiveColor: "#1A1A1A",
      useGradient: true
    },
    image: {
      src: "",
      inactiveOpacity: 0.3,
      alt: "rating image"
    },
    title: {
      textAlign: "center",
      fontSize: 20,
      color: "#FAFAFA",
      bold: true,
      text: "Title",
      offsetY: 6,
      subtitle: {
        fontSize: 14,
        color: "#CCCCCC",
        bold: false,
        text: "Subtitle",
        offsetY: 12
      }
    },
    rating: {
      show: true,
      fontSize: 28,
      bold: true,
      roundingValue: 1,
      position: "bottom",
      offsetY: 12,
      offsetX: 0
    },
    tooltip: {
      show: true,
      fontSize: 14,
      offsetY: 0,
      color: "#CCCCCC",
      bold: true,
      backgroundColor: "#1A1A1A",
      borderColor: "#404040",
      borderRadius: 4,
      boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)"
    }
  }
});

const dataset = ref({
  // rating: 4
  rating: {
    "1": 146,
    "2": 225,
    "3": 3920,
    "4": 1050,
    "5": 2125
  }
});

const mode = ref("readonly");

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    mutableConfig.value.readonly = mode.value === "readonly";
    mutableConfigDarkMode.value.readonly = mode.value === "readonly";
    forceChartUpdate();
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

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
}

function setReadonly(isTrue) {
    mutableConfig.value.readonly = isTrue;
    mutableConfigDarkMode.value.readonly = isTrue;
    key.value += 1;
}

function showRating(r) {
    console.log("Rating : ", r)
}

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="star" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Rating</span></span>
        </h1>
        <h2 class="text-center text-gray-500">
            {{ translations.docs.comments.rating.p1[store.lang] }}<br><br>
            {{ translations.docs.comments.rating.p2[store.lang] }}
        </h2>

        <div class="flex flex-row gap-6 justify-center mt-6">
                <div class="flex flex-row gap-1">
                    <input type="radio" id="r-read" name="r-readonly" value="readonly" v-model="mode" class="accent-app-green" @change="setReadonly(true)">
                    <label for="r-read">{{ translations.docs.comments.rating.readonly[store.lang] }}</label>
                </div>
                <div class="flex flex-row gap-1">
                    <input type="radio" id="r-act" name="r-readonly" value="active" v-model="mode" class="accent-app-green" @change="setReadonly(false)">
                    <label for="r-act">{{ translations.docs.comments.rating.active[store.lang] }}</label>
                </div>
            </div>
            <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-fit'}`">
                <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <Suspense>
                <template #default>
                    <VueUiRating ref="rating" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" @rate="showRating"/>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
            targetLink="vue-ui-rating"
            :configSource="mainConfig.vue_ui_rating"
        />

        <Box showEmits>
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiRatingDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
<span class="text-gray-500">
// {{ translations.docs.comments.rating.simpleRating[store.lang] }} :
</span>
const <span class="text-black dark:text-app-green">dataset: VueUiRatingDataset</span> = { rating: 3.6 };

<span class="text-gray-500">
// {{ translations.docs.comments.rating.breakdown[store.lang] }} :
</span>
const <span class="text-black dark:text-app-green">dataset: VueUiRatingDataset</span> = {
    rating: {
        "1": 146,
        "2": 225,
        "3": 3920,
        "4": 1050,
        "5": 2125
    }
};
<span class="text-gray-500">// {{ translations.docs.comments.rating.calculation[store.lang] }} 
// {{ translations.docs.comments.rating.tooltip[store.lang] }}</span>
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiRatingConfig</code>
                </div>
                <div class="overflow-w-auto">
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiRatingConfig</span> = {
    type: "star", <span class="text-gray-500">// {{ translations.docs.comments.rating.useImage[store.lang] }}</span>
    readonly: {{ mode === "readonly" ? "true" : "false" }}, (default: false)
    from: <input v-if="isDarkMode" type="number" min="0" max="9" v-model="mutableConfigDarkMode.from" @change="forceChartUpdate()"><input v-else type="number" min="0" max="9" v-model="mutableConfig.from" @change="forceChartUpdate()">, (default: 1)
    to: <input v-if="isDarkMode" type="number" min="1" max="10" v-model="mutableConfigDarkMode.to" @change="forceChartUpdate()"><input v-else type="number" min="1" max="10" v-model="mutableConfig.to" @change="forceChartUpdate()">, (default: 5)
    style: {
        fontFamily: "inherit",
        itemSize: <input v-if="isDarkMode" type="number" min="10" max="100" v-model="mutableConfigDarkMode.style.itemSize"><input v-else type="number" min="10" max="100" v-model="mutableConfig.style.itemSize">, (default: 32)
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
        star: {
            activeColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.star.activeColor"><input v-else type="color" v-model="mutableConfig.style.star.activeColor">, (default: "#FFD055")
            borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.star.borderColor"><input v-else type="color" v-model="mutableConfig.style.star.borderColor">, (default: "#FFD055")
            borderWidth: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutableConfigDarkMode.style.star.borderWidth"><input v-else type="number" min="0" max="48" v-model="mutableConfig.style.star.borderWidth">, (default: 3)
            apexes: <input v-if="isDarkMode" type="number" min="4" max="12" v-model="mutableConfigDarkMode.style.star.apexes"><input v-else type="number" min="4" max="12" v-model="mutableConfig.style.star.apexes">, (default: 5)
            inactiveColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.star.inactiveColor"><input v-else type="color" v-model="mutableConfig.style.star.inactiveColor">, (default: "#e1e5e8")
            useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.star.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.star.useGradient" @change="forceChartUpdate()">, (default: true)
        },
        image: {
            src: "", <span class="text-gray-500">// {{ translations.docs.comments.rating.src[store.lang] }}</span>
            inactiveOpacity: 0.3,
            alt: "rating image" <span class="text-gray-500">// {{ translations.docs.comments.rating.alt[store.lang] }}</span>
        },
        title: {
            textAlign: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.textAlign"><input v-else type="text" v-model="mutableConfig.style.title.textAlign">, (default: "center". Other options: "left", "right")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.title.fontSize">, (default: 20)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold">, (default: true)
            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")
            offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.title.offsetY"><input v-else type="number" v-model="mutableConfig.style.title.offsetY">, (default: 6)
            subtitle: {
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 14)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#CCCCCC")
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold">, (default: false)
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
                offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.title.subtitle.offsetY"><input v-else type="number" v-model="mutableConfig.style.title.subtitle.offsetY">, (default: 12)
            }
        },
        rating: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.rating.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.rating.show">, (default: true)
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.rating.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.rating.fontSize">, (default: 28)
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.rating.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.rating.bold">, (default: true)
            roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.rating.roundingValue">, (default: 1)
            position: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.rating.position"><input v-else type="text" v-model="mutableConfig.style.rating.position">, (default: "bottom", other options: "top", "right", "left")
            offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.rating.offsetY"><input v-else type="number" v-model="mutableConfig.style.rating.offsetY">, (default: 0)
            offsetX: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.rating.offsetX"><input v-else type="number" v-model="mutableConfig.style.rating.offsetX">, (default: 0)
        },
        tooltip: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show">, (default: true)
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.tooltip.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)
            offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.tooltip.offsetY"><input v-else type="number" v-model="mutableConfig.style.tooltip.offsetY">, (default: 0)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.bold">, (default: true)
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")
            borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.borderColor">, (default: "#e1e5e8")
            borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.tooltip.borderRadius"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.tooltip.borderRadius">, (default: 4)
            boxShadow: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.boxShadow"><input v-else type="text" v-model="mutableConfig.style.tooltip.boxShadow">, (default: "0 6px 12px -6px rgba(0,0,0,0.2)")
        }
    }
}
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab2>
                <div><code>@rate</code></div>       
                <div class="text-gray-400 pl-5 mb-6">{{ translations.docs.emits.rating.rate[store.lang] }}</div>

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.rating.getData[store.lang] }}</div>
                    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const ratingComponent = ref(null);
            const currentRating = ref(null);

            onMounted(() => {
                currentRating.value = ratingComponent.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            });

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiRating
                ref="ratingComponent"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiRating
                ref="ratingComponent"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        currentRating: null,
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        }
                    }
                },
                mounted () {
                    this.currentRating = this.$refs.ratingComponent.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleReadonly</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.rating.toggleReadonly[store.lang] }}</div>
                </div>
            </template>
        </Box>
    </div>
</template>