<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"
import { createWordCloudDatasetFromPlainText } from "vue-data-ui";
import ThemesVueUiWordCloud from "../themes/ThemesVueUiWordCloud.vue";

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

// This could be a textarea
const dataset = ref(createWordCloudDatasetFromPlainText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar pretium venenatis. Donec imperdiet elit id porttitor tristique. Aenean ac commodo justo. Vestibulum placerat molestie nisl, sit amet lacinia nulla posuere quis. Aenean ullamcorper eu ex vitae facilisis. Aliquam erat volutpat. Proin nunc felis, porttitor quis commodo lacinia, gravida sed orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus mattis vitae tellus ac luctus. Vestibulum faucibus sem nec varius eleifend. In gravida venenatis ipsum sit amet ultricies. Nam efficitur, dui ac imperdiet vestibulum, justo metus consectetur libero, posuere tempor neque magna vitae augue. Etiam gravida massa quis turpis vulputate, ac tempus nisi imperdiet. Donec at laoreet ligula. Nulla id ex sagittis, tincidunt lectus ut, gravida mauris. Nulla consectetur semper sem. Maecenas lacinia facilisis ex, lobortis lacinia orci ornare tristique. Nam quis erat a nunc vehicula finibus. Quisque vitae nibh condimentum, condimentum erat eu, finibus risus. Duis sodales orci vel ullamcorper ullamcorper. In hac habitasse platea dictumst. Vivamus tempus ut nulla id commodo. Cras lectus sem, porttitor id sem eu, posuere fringilla turpis. Integer pretium erat sed ipsum gravida ullamcorper. Nam facilisis metus non lorem congue imperdiet. Sed quis cursus eros. Pellentesque venenatis pellentesque turpis suscipit accumsan. Nam arcu quam, faucibus et arcu pretium, eleifend consequat lacus. Aliquam nec risus nec justo maximus ultricies at et velit. Nam at lacinia massa. Sed elit dolor, consequat in massa at, egestas accumsan ex. Aenean quis suscipit ipsum, ac condimentum eros. Sed eleifend nisi arcu, et iaculis mi semper quis. Mauris vel dui nisi. Fusce finibus lacus a tempus tristique. Sed molestie orci a velit facilisis ornare. Pellentesque ullamcorper sed velit ut iaculis. Fusce urna dolor, rutrum sit amet consequat et, vulputate a risus. Sed faucibus sem nec urna lobortis dapibus. Nam in nisl a dui euismod gravida non in erat. Cras lobortis vitae diam sed elementum. Sed cursus tempor enim, nec ornare sem facilisis non. Pellentesque euismod sit amet magna eget tempor. Proin tincidunt dignissim nulla vitae molestie. Proin gravida ac urna ut facilisis. Vestibulum sit amet ex non quam ornare scelerisque. Etiam pharetra magna neque. Cras maximus, ipsum at imperdiet interdum, nibh orci vulputate erat, vitae varius elit lectus sed nibh. Maecenas eget nulla ultricies, pharetra ante non, cursus risus. Mauris nec felis tincidunt, viverra lectus quis, feugiat tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae pharetra leo. Vestibulum at accumsan ipsum, id pharetra dui. Pellentesque nibh purus, tincidunt a egestas in, dapibus quis nunc. Integer posuere tellus id mi tincidunt aliquet. Donec vel justo et eros eleifend tempor in in purus. Aenean id pellentesque nisl, eget vestibulum neque.Nulla ante mauris, posuere vel consequat vitae, suscipit id magna. In ipsum nisi, luctus quis interdum sagittis, condimentum at felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean interdum massa quis ullamcorper luctus. Duis efficitur mauris a eros porta ornare vitae nec urna. Fusce tincidunt purus sit amet urna convallis, ac molestie felis suscipit. Sed scelerisque orci vel velit suscipit, non posuere dui fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum velit libero, commodo at fringilla at, congue ut felis. Nulla vestibulum a ligula vel luctus. Nam at nunc erat. Nam tincidunt porta lectus eget molestie. Cras quis placerat est. Donec tellus magna, sollicitudin ac efficitur sed, auctor eget dui. Fusce eget sem magna. Donec fermentum velit lorem, quis suscipit odio posuere eu. Proin nunc arcu, pretium id gravida ut, mattis non erat. Aenean eu nisl et ligula pulvinar hendrerit. Pellentesque pharetra hendrerit sodales. Nam in justo dictum, egestas mauris nec, venenatis nisl. Mauris vehicula dolor metus, sed aliquam enim consequat vel. Suspendisse semper orci in leo rutrum volutpat. Aenean varius mauris diam. Sed ornare lacus turpis, eu tempor quam porta nec. Etiam suscipit quam enim, a consequat libero lacinia sed. Quisque eu justo eu orci sagittis pulvinar.Aenean augue tortor, porta nec augue ut, mollis ultricies nisi. Vestibulum iaculis pellentesque risus non efficitur. Proin eu sapien vel lectus blandit eleifend vel ac est. Maecenas quis massa sodales, pretium leo sed, fringilla elit. Sed a pellentesque felis. Phasellus quam sapien, vulputate ut sapien id, maximus tincidunt tellus. Nullam rhoncus mauris id pretium tincidunt. Nulla orci orci, molestie sollicitudin mollis in, ultricies sit amet ligula. Phasellus est nisi, condimentum eu lobortis a, posuere non lacus. Suspendisse vitae aliquam libero. Nunc sollicitudin neque at odio vulputate pulvinar quis nec nunc. Nullam vehicula nulla massa, vitae sodales nibh porttitor ac. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc rhoncus non erat quis blandit.
Maecenas convallis libero at nisl lacinia facilisis. Nulla facilisi. Sed bibendum imperdiet massa. In nunc ipsum, maximus ac viverra non, pellentesque eget diam. Donec lobortis erat in nibh rhoncus, sit amet tincidunt urna vehicula. Cras iaculis, sapien quis convallis tristique, libero eros fermentum lorem, tristique luctus ante nulla at libero. Nulla fringilla eget ligula aliquet vulputate. Donec enim ex, hendrerit at lacinia quis, ultrices eget quam. Curabitur condimentum leo neque, ac rhoncus sapien euismod eu. Suspendisse tristique ullamcorper sapien, sed tincidunt enim commodo a. Aliquam risus sapien, interdum et temporvel, placerat ut quam. Ut turpis orci, pellentesque non eros at, suscipit placerat augue. Donec eget nisi lacus. Morbi id enim metus. Mauris ut sem malesuada, convallis lectus sit amet, dapibus arcu. Nulla tempor justo eu orci egestas vehicula. Donec bibendum erat libero, placerat lacinia elit luctus at. Pellentesque semper erat metus, sed volutpat nunc imperdiet a. Fusce vitae orci libero. Curabitur laoreet felis eget odio pulvinar pulvinar. Morbi elementum purus ut nibh tristique, id efficitur neque condimentum. Vestibulum porttitor bibendum pharetra. Nulla dapibus quam vel elit tincidunt, vestibulum pretium elit efficitur. Vestibulum nec ligula nec purus suscipit dictum laoreet quis risus. Maecenas non nibh ac eros ultrices maximus. Nullam pulvinar neque nec ipsum porta malesuada. Phasellus vestibulum faucibus vehicula. Vestibulum risus lectus, efficitur eu luctus ac, pellentesque in nisi. Fusce vitae ullamcorper purus, at molestie leo. Proin sed diam sollicitudin, ullamcorper eros sit amet, egestas sapien. Phasellus rutrum.`, word => word.toLowerCase()));

const themes = ref([
    '',
    'zen',
    'hack',
    'concrete'
])

const selectedTheme = ref(themes.value[0]);

const config = ref({
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    animationDelayMs: 20,
    userOptions: {
        show: true
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            height: 300,
            width: 512,
            words: {
                maxFontSize: 100,
                minFontSize: 10,
                bold: false,
                proximity: 10,
                packingWeight: 20,
                color: "#2D353C",
                usePalette: true
            },
            title: {
                text: "Title",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Word",
            value: "Value"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0,
            prefix: "",
            suffix: ""
        }
    }
})

const darkModeConfig = ref({
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    animationDelayMs: 20,
    userOptions: {
        show: true
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            height: 300,
            width: 512,
            words: {
                maxFontSize: 100,
                minFontSize: 10,
                bold: false,
                proximity: 20,
                packingWeight: 10,
                color: "#CCCCCC",
                usePalette: true
            },
            title: {
                text: "Title",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Word",
            value: "Value"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none",
            roundingValue: 0,
            prefix: "",
            suffix: ""
        }
    }
})

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
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartWordCloud" stroke="#42d392" :strokeWidth="1.5" />
            VueUiWordCloud
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.wordCloud[store.lang] }}
        </p>
        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
            <button @click="fixChart"
                class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed" />
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible" />
                    <div
                        class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault"
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>
            <VueDataUi component="VueUiWordCloud" :dataset="dataset"
                :config="isDarkMode ? {...mutableConfigDarkMode, theme: selectedTheme } : {...mutableConfig, theme: selectedTheme}" :key="key" />
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button
                class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all"
                @click="copyToClipboard(mainConfig.vue_ui_word_cloud)">
                <CopyIcon /> {{ translations.docs.copyDefaultConfig[store.lang] }}
            </button>
            <GitHubLink link="vue-ui-word-cloud" />
            <MakerLink to="VueUiWordCloud"/>
        </div>

        <Box showSlots showEmits showThemes>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiWordCloudDatasetItem[] | string</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <pre>
<code>
    [
        {
            name: string;
            value: number;
        },
        {...}
    ]
</code>
</pre>
                    <div>
                        {{ translations.wordCloud.dataset[store.lang] }}
                    </div>
                    <pre>
<code>
    import { createWordCloudDatasetFromPlainText } from "vue-data-ui";

    const plainText = "Lorem ipsum dolor sit amet";

    const dataset = ref(createWordCloudDatasetFromPlainText(plainText));

    // An optional callback can also be passed to the function to format text output:
    const uppercaseDataset = ref(createWordCloudDatasetFromPlainText(plainText, word => word.toUpperCase()))

</code>
</pre>
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon />{{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiWordCloudConfig</code>
                </div>
                <pre>
<code>
const <span class="text-app-blue">config: VueUiWordCloudConfig</span> = {
    theme: <select v-model="selectedTheme" @change="forceChartUpdate()"><option v-for="opt in themes">{{ opt }}</option></select>; (default: "")
    customPalette: []; // string[]
    useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true) 
    animationDelayMs: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.animationDelayMs"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.animationDelayMs">, (default: 20)
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true) 
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            height: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.chart.height" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.chart.height" @change="forceChartUpdate()">, (default: 300)
            width: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="300" max="1000" v-model="mutableConfigDarkMode.style.chart.width" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="300" max="1000" v-model="mutableConfig.style.chart.width" @change="forceChartUpdate()">, (default: 512)
            words: {
                maxFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="20" max="200" v-model="mutableConfigDarkMode.style.chart.words.maxFontSize" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="20" max="200" v-model="mutableConfig.style.chart.words.maxFontSize" @change="forceChartUpdate()">, (default: 100)
                minFontSize:  <input v-if="isDarkMode" type="number" class="accent-app-blue" min="10" max="100" v-model="mutableConfigDarkMode.style.chart.words.minFontSize" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="10" max="100" v-model="mutableConfig.style.chart.words.minFontSize" @change="forceChartUpdate()">, (default: 10)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.words.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.words.bold" @change="forceChartUpdate()">, (default: false) 
                proximity: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.words.proximity" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.words.proximity" @change="forceChartUpdate()">, (default: 10)
                packingWeight: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="20" v-model="mutableConfigDarkMode.style.chart.words.packingWeight" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="20" v-model="mutableConfig.style.chart.words.packingWeight" @change="forceChartUpdate()">, (default: 1)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.words.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
                usePalette: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.words.usePalette" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.words.usePalette" @change="forceChartUpdate()">, (default: true) 
            },
            title: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color" @change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.style.chart.title.color" @change="forceChartUpdate()">, (default: "#2D353C")
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text" @change="forceChartUpdate()"><input v-else type="text" v-model="mutableConfig.style.chart.title.text" @change="forceChartUpdate()">, (default: "")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize" @change="forceChartUpdate()"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize" @change="forceChartUpdate()">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"@change="forceChartUpdate()"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color"@change="forceChartUpdate()">, (default: "#A1A1A1")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text" @change="forceChartUpdate()"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text" @change="forceChartUpdate()">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize" @change="forceChartUpdate()"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize" @change="forceChartUpdate()">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
        }
    },
    table: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 300)
        columnNames: {
            series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.series"><input v-else type="text" v-model="mutableConfig.table.columnNames.series">, (default: "Word")
            value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")
        },
        th: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")
        },
        td: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #E1E5E8")
            roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
            prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.prefix"><input v-else type="text" v-model="mutableConfig.table.td.prefix">, (default: "")
            suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.suffix"><input v-else type="text" v-model="mutableConfig.table.td.suffix">, (default: "")
        }
    }
}
</code>
</pre>
            </template>

            <template #tab2>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const wordCloudData = ref(null);
            const wordCloudDataset = ref([]);

            onMounted(() => {
                wordCloudDataset.value = wordCloudData.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWordCloud
                ref="wordCloudData"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWordCloud
                ref="wordCloudData"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        wordCloudDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.wordCloudDataset = this.$refs.wordCloudData.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateCsv</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateCsv[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
                </div>
            </template>

            <template #tab3>
                <div class="text-gray-500">
    {{ translations.slots.presentation[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiWordCloud
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiWordCloud&gt;
</code>
</pre>
            </template>

            <template #tab6>
                <ThemesVueUiWordCloud />
            </template>
        </Box>
    </div>
</template>