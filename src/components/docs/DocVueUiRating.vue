<script setup>
import { ref, onMounted } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon } from "vue-tabler-icons";

const config = ref({
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
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfig.value.readonly = mode.value === "readonly"
    forceChartUpdate();
}
const key = ref(0);
function forceChartUpdate() {
    key.value += 1;
}
function copyToClipboard() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(mutableConfig.value);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
}

function setReadonly(isTrue) {
    mutableConfig.value.readonly = isTrue;
    key.value += 1;
}

function showRating(r) {
    console.log(r)
}

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-green mb-12 text-2xl">VueUiRating</h1>
        <h2 class="text-center text-gray-500">
            A component to rate, or display rating results. Shows stars by default, and you can use an image if you prefer. You can display as many stars as you want.<br><br>
            In the active mode, the rating can be modified by the user. In readonly mode, it just displays the rating.
        </h2>

        <div class="flex flex-row gap-6 justify-center mt-6">
                <div class="flex flex-row gap-1">
                    <input type="radio" id="r-read" name="r-readonly" value="readonly" v-model="mode" class="accent-app-green" @change="setReadonly(true)">
                    <label for="r-read">readonly</label>
                </div>
                <div class="flex flex-row gap-1">
                    <input type="radio" id="r-act" name="r-readonly" value="active" v-model="mode" class="accent-app-green" @change="setReadonly(false)">
                    <label for="r-act">active</label>
                </div>
            </div>
        <div :class="`transition-all w-3/4 mx-auto overflow-visible pb-16 ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
          <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <VueUiRating ref="rating" :dataset="dataset" :config="mutableConfig" :key="key" @rate="showRating"/>
        </div>

        <Box showEmits>
            <template v-slot:tab0>
                Datastructure:
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
<span class="text-gray-500">
// if you only have a simple rating to pass in:
</span>
const <span class="text-app-green">dataset</span> = { rating: 3.6 };

<span class="text-gray-500">
// if you have a breakdown per value:
</span>
const <span class="text-app-green">dataset</span> = {
    rating: {
        "1": 146,
        "2": 225,
        "3": 3920,
        "4": 1050,
        "5": 2125
    }
};
<span class="text-gray-500">// The rating will be calculated from the breakdown. 
// The tooltip can be enabled, to display the values at the hovered star.</span>
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab1>
                <div class="w-ull overflow-x-auto">
                  <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4">RESET</button>
                    <button @click="copyToClipboard" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">Copy this config as JSON</button>
                </div>
                <div class="overflow-w-auto">
<pre>
<code>
const <span class="text-app-blue">config</span> = {
    type: "star", <span class="text-gray-500">// or use "image" and provide src in image.src</span>
    readonly: {{ mode === "readonly" ? "true" : "false" }}, (default: false)
    from: <input type="number" min="0" max="9" v-model="mutableConfig.from" @change="forceChartUpdate()">, (default: 1)
    to: <input type="number" min="1" max="10" v-model="mutableConfig.to" @change="forceChartUpdate()">, (default: 5)
    style: {
        fontFamily: "inherit",
        itemSize: <input type="number" min="10" max="100" v-model="mutableConfig.style.itemSize">, (default: 32)
        backgroundColor: <input type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
        star: {
            activeColor: <input type="color" v-model="mutableConfig.style.star.activeColor">, (default: "#FFD055")
            borderColor: <input type="color" v-model="mutableConfig.style.star.borderColor">, (default: "#FFD055")
            borderWidth: <input type="number" min="0" max="48" v-model="mutableConfig.style.star.borderWidth">, (default: 3)
            apexes: <input type="number" min="4" max="12" v-model="mutableConfig.style.star.apexes">, (default: 5)
            inactiveColor: <input type="color" v-model="mutableConfig.style.star.inactiveColor">, (default: "#e1e5e8")
            useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.star.useGradient" @change="forceChartUpdate()">, (default: true)
        },
        image: {
            src: "", <span class="text-gray-500">// works like your usual src attribute</span>
            inactiveOpacity: 0.3,
            alt: "rating image" <span class="text-gray-500">// the value of each star will be appended for each item</span>
        },
        title: {
            textAlign: <input type="text" v-model="mutableConfig.style.title.textAlign">, (default: "center". Other options: "left", "right")
            fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.title.fontSize">, (default: 20)
            color: <input type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
            bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold">, (default: true)
            text: <input type="text" v-model="mutableConfig.style.title.text">, (default: "")
            offsetY: <input type="number" v-model="mutableConfig.style.title.offsetY">, (default: 6)
            subtitle: {
                fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 14)
                color: <input type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#CCCCCC")
                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold">, (default: false)
                text: <input type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
                offsetY: <input type="number" v-model="mutableConfig.style.title.subtitle.offsetY">, (default: 12)
            }
        },
        rating: {
            show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.rating.show">, (default: true)
            fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.rating.fontSize">, (default: 28)
            bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.rating.bold">, (default: true)
            roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.rating.roundingValue">, (default: 1)
            position: <input type="text" v-model="mutableConfig.style.rating.position">, (default: "bottom", other options: "top", "right", "left")
            offsetY: <input type="number" v-model="mutableConfig.style.rating.offsetY">, (default: 0)
            offsetX: <input type="number" v-model="mutableConfig.style.rating.offsetX">, (default: 0)
        },
        tooltip: {
            show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show">, (default: true)
            fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)
            offsetY: <input type="number" v-model="mutableConfig.style.tooltip.offsetY">, (default: 0)
            color: <input type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")
            bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.bold">, (default: true)
            backgroundColor: <input type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")
            borderColor: <input type="color" v-model="mutableConfig.style.tooltip.borderColor">, (default: "#e1e5e8")
            borderRadius: <input type="number" min="0" max="24" v-model="mutableConfig.style.tooltip.borderRadius">, (default: 4)
            boxShadow: <input type="text" v-model="mutableConfig.style.tooltip.boxShadow">, (default: "0 6px 12px -6px rgba(0,0,0,0.2)")
        }
    }
}
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab2>
                <div><code>@rate</code></div>       
                <div class="text-gray-400 pl-5 mb-6">returns the selected rating value as a number</div>

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">call this method from the parent to get the current rating value</div>
                    <pre>
    <span class="text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const ratingComponent = ref(null);
            const currentRating = ref(null);

            onMounted(() => {
                currentRating.value = ratingComponent.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref({
                <span class="text-gray-500">// your dataset here</span>
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
    <span class="text-app-green">Using options API:</span>
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
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: {
                            <span class="text-gray-500">// your dataset here</span>
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
                    <div class="text-gray-400 pl-5 mb-4">call this method from the parent to flip the readonly | active state</div>
                </div>
            </template>
        </Box>
    </div>
</template>