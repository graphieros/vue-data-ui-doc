<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";

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
});

const dataset = ref([
    {
        name: "quality",
        value: 61.95,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "popularity",
        value: 2.04,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "maintenance",
        value: 33.33,
        rounding: 2,
        suffix: "%"
    },
]);

const darkModeConfig = ref(
    {
        style: {
                fontFamily: "inherit",
                layout: {
                independant: true,
                percentage: true,
                target: 0
            },
            gutter: {
                backgroundColor: "#3A3A3A",
                opacity: 100
            },
            bar: {
                gradient: {
                    show: true,
                    intensity: 40,
                    underlayerColor: "#FFFFFF"
                }
            },
            labels: {
                fontSize: 16,
                name: {
                    position: "top",
                    width: "100%",
                    color: "#BABABA",
                    bold: false
                },
                value: {
                    show: true,
                    bold: true
                }
            },
            gap: 4
        }
    }
);
const config = ref(
    {
        style: {
                fontFamily: "inherit",
                layout: {
                independant: true,
                percentage: true,
                target: 0
            },
            gutter: {
                backgroundColor: "#e1e5e8",
                opacity: 100
            },
            bar: {
                gradient: {
                    show: true,
                    intensity: 40,
                    underlayerColor: "#FFFFFF"
                }
            },
            labels: {
                fontSize: 16,
                name: {
                    position: "top",
                    width: "100%",
                    color: "#2D353C",
                    bold: false
                },
                value: {
                    show: true,
                    bold: true
                }
            },
            gap: 4
        }
    }
);

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
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

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartVerticalBar" stroke="#42d392" :strokeWidth="1.5" />
            VueUiSparkbar
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.sparkbar[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'sm:w-1/2'}`">
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
            <div class="w-full px-4">
                <VueUiSparkbar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            </div>
            <div class="w-full flex place-items-center place-content-center mb-6 mt-12">
                <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_sparkbar)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            </div>
        </div>
        <Box>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            value: number;
            prefix?: string; <span class="text-gray-500">// {{ translations.docs.comments.onion.prefix[store.lang] }}</span>
            suffix?: string; <span class="text-gray-500">// {{ translations.docs.comments.onion.suffix[store.lang] }}</span>
            rounding?: number;
        }
    ]
</code>
</pre>          {{ translations.docs.example[store.lang] }}:
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = [
    {
        name: "quality",
        value: 61.953,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "popularity",
        value: 2.0412,
        rounding: 2,
        suffix: "%"
    },
    {
        name: "maintenance",
        value: 33.3291,
        rounding: 2,
        suffix: "%"
    },
]
</code>
</pre>                
                </div>
                </div>
            </template>
            <template #tab1>
                <div class="w-full overflow-x-auto">
                    <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config</span> = {
    {
        style: {
            fontFamily: "inherit",
            layout: {
                independant: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.independant" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.independant" @change="forceChartUpdate()">, (default: true)
                percentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.percentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.percentage" @change="forceChartUpdate()">, (default: true)
                target: 0
            },
            gutter: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.gutter.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.gutter.backgroundColor">, (default: "#e1e5e8")
                opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.gutter.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.gutter.opacity">, (default: 100) <span class="text-app-blue">// since v.1.9.17</span>
            },
            bar: {
                gradient: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.bar.gradient.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.bar.gradient.show" @change="forceChartUpdate()">, (default: true)
                    intensity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.bar.gradient.intensity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.bar.gradient.intensity">, (default: 40)
                    underlayerColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.bar.gradient.underlayerColor"><input v-else type="color" v-model="mutableConfig.style.bar.gradient.underlayerColor">, (default: "#FFFFFF")
                }
            },
            labels: {
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.labels.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.labels.fontSize">, (default: 16)
                name: {
                    position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.labels.name.position">
            <option>top</option>
            <option>left</option>
          </select><select v-else v-model="mutableConfig.style.labels.name.position">
            <option>top</option>
            <option>left</option>
          </select>, (default: "top")
                    width: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.labels.name.width"><input v-else type="text" v-model="mutableConfig.style.labels.name.width">, (default: "100%")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.labels.name.color"><input v-else type="color" v-model="mutableConfig.style.labels.name.color">, (default: "#2D353C")
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.name.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.name.bold" @change="forceChartUpdate()">, (default: false)
                },
                value: {
                    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.value.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.value.show" @change="forceChartUpdate()">, (default: true)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.labels.value.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.labels.value.bold" @change="forceChartUpdate()">, (default: true)
                }
            },
            gap: <input v-if="isDarkMode" type="number" min="0" max="64" v-model="mutableConfigDarkMode.style.gap"><input v-else type="number" min="8" max="64" v-model="mutableConfig.style.gap">, (default: 4)
        }
    }
}
</code>
</pre>                    
                </div>
            </template>
        </Box>
    </div>
</template>