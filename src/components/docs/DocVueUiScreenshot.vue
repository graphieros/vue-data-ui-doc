<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";

const store = useMainStore();
const step = ref(0)
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        step.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const postConfig = ref({
    mode: "post",
    quality: 1,
    style: {
      info: {
        background: "#F3F4F6",
        color: "#1A1A1A",
        fontSize: 14,
        bold: true,
        minWidth: 300,
        padding: 12,
        borderRadius: 4,
        boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
        fontFamily: "inherit",
        border: "1px solid rgb(80,80,80)",
        top: -100,
      },
      captureButton: {
        background: "#F3F4F6",
        color: "#1A1A1A",
        fontSize: 14,
        borderRadius: 4,
        border: "1px solid #1A1A1A",
        minHeight: 40,
        padding: "8px 12px",
        boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
        bold: true
      },
      cancelButton: {
        background: "#F3F4F6",
        color: "#1A1A1A",
        size: 28,
        borderRadius: 14,
        top: -14,
        right: -14,
        border: "none"
      },
      captureArea: {
        initialHeight: 200,
        initialWidth: 200,
        border: "dashed 2px #CCCCCC",
        background: "radial-gradient(transparent, rgba(66,211,146,0.2))"
      },
      handles: {
        size: 40,
        background: "#F3F4F6",
        border: "4px solid #1A1A1A",
        borderRadius: 4
      }
    },
    translations: {
      info: "Resize or move and click to capture",
      captureButton: "Capture"
    }
  });
const darkModePostConfig = ref({
    mode: "post",
    quality: 1,
    style: {
      info: {
        background: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        bold: true,
        minWidth: 300,
        padding: 12,
        borderRadius: 4,
        boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
        fontFamily: "inherit",
        border: "1px solid rgb(80,80,80)",
        top: -100,
      },
      captureButton: {
        background: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        borderRadius: 4,
        border: "1px solid rgb(66,211,146)",
        minHeight: 40,
        padding: "8px 12px",
        boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
        bold: true
      },
      cancelButton: {
        background: "rgb(66,211,146)",
        color: "#1A1A1A",
        size: 28,
        borderRadius: 14,
        top: -14,
        right: -14,
        border: "none"
      },
      captureArea: {
        initialHeight: 200,
        initialWidth: 300,
        border: "dashed 2px #CCCCCC",
        background: "radial-gradient(transparent, rgba(66,211,146,0.2))"
      },
      handles: {
        size: 40,
        background: "#1A1A1A",
        border: "4px solid #CCCCCC",
        borderRadius: 4
      }
    },
    translations: {
      info: "Resize or move and click to capture",
      captureButton: "Capture"
    }
  });

const downloadConfig = ref({
    mode: "download",
    quality: 1,
    style: {
      info: {
        background: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        bold: true,
        minWidth: 300,
        padding: 12,
        borderRadius: 4,
        boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
        fontFamily: "inherit",
        border: "1px solid rgb(80,80,80)",
        top: -100,
      },
      captureButton: {
        background: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        borderRadius: 4,
        border: "1px solid rgb(66,211,146)",
        minHeight: 40,
        padding: "8px 12px",
        boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
        bold: true
      },
      cancelButton: {
        background: "rgb(66,211,146)",
        color: "#1A1A1A",
        size: 28,
        borderRadius: 14,
        top: -14,
        right: -14,
        border: "none"
      },
      captureArea: {
        initialHeight: 200,
        initialWidth: 200,
        border: "dashed 2px #CCCCCC",
        background: "radial-gradient(transparent, rgba(66,211,146,0.2))"
      },
      handles: {
        size: 40,
        background: "#1A1A1A",
        border: "4px solid #CCCCCC",
        borderRadius: 4
      }
    },
    translations: {
      info: "Resize or move and click to capture",
      captureButton: "Capture"
    }
  });
const darkModeDownloadConfig = ref({
    mode: "download",
    quality: 1,
    style: {
      info: {
        background: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        bold: true,
        minWidth: 300,
        padding: 12,
        borderRadius: 4,
        boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
        fontFamily: "inherit",
        border: "1px solid rgb(80,80,80)",
        top: -100,
      },
      captureButton: {
        background: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        borderRadius: 4,
        border: "1px solid rgb(66,211,146)",
        minHeight: 40,
        padding: "8px 12px",
        boxShadow: "0 6px 12px -6px rgba(0,0,0,0.2)",
        bold: true
      },
      cancelButton: {
        background: "rgb(66,211,146)",
        color: "#1A1A1A",
        size: 28,
        borderRadius: 14,
        top: -14,
        right: -14,
        border: "none"
      },
      captureArea: {
        initialHeight: 200,
        initialWidth: 200,
        border: "dashed 2px #CCCCCC",
        background: "radial-gradient(transparent, rgba(66,211,146,0.2))"
      },
      handles: {
        size: 40,
        background: "#1A1A1A",
        border: "4px solid #CCCCCC",
        borderRadius: 4
      }
    },
    translations: {
      info: "Resize or move and click to capture",
      captureButton: "Capture"
    }
  });

  const mutablePostConfig = ref(JSON.parse(JSON.stringify(postConfig.value)));
  const mutableDownloadConfig = ref(JSON.parse(JSON.stringify(downloadConfig.value)));
  const mutablePostConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModePostConfig.value)));
  const mutableDownloadConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeDownloadConfig.value)));

  const mode = ref("post");

  const pic = ref("");



  function clearPic() {
    pic.value = "";
  }

  const imageData = ref(null);

  function postImage({ deviceType, image, screenWidth, x, y, createdAt, fileSize }) {
    imageData.value = { deviceType, screenWidth, x, y, createdAt, fileSize};
    pic.value = image;
  }

  const screenshot = ref(null);

  function openScreenshot() {
    screenshot.value.shoot();
  }

  function reopen() {
    screenshot.value.close();
    screenshot.value.shoot();
  }

  function resetDefault() {
    mutablePostConfig.value = JSON.parse(JSON.stringify(postConfig.value));
    mutableDownloadConfig.value = JSON.parse(JSON.stringify(downloadConfig.value));
    mutablePostConfigDarkMode.value = JSON.parse(JSON.stringify(darkModePostConfig.value));
    mutableDownloadConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeDownloadConfig.value));
    step.value += 1;
    screenshot.value.close();
}

  function copyToClipboard() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    if (mode.value === "post") {
        if(isDarkMode.value) {
            selBox.value = JSON.stringify(mutablePostConfigDarkMode.value);
        } else {
            selBox.value = JSON.stringify(mutablePostConfig.value);
        }
    } else if (mode.value === 'download') {
        if(isDarkMode.value) {
            selBox.value = JSON.stringify(mutableDownloadConfigDarkMode.value);
        } else {
            selBox.value = JSON.stringify(mutableDownloadConfig.value);
        }
    }
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

function copyDefaultConf(conf) {
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

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiScreenshot</h1>
        <div class="w-full flex flex-col gap-6 place-items-center place-content-center">
            <h2 class="text-center text-gray-500">
                {{ translations.docs.comments.screenshot.p1[store.lang] }}
            </h2>
            <div class="flex flex-row gap-6">
                <div class="flex flex-row gap-1">
                    <input type="radio" id="ss-post" name="ss-option" value="post" v-model="mode" class="accent-app-green">
                    <label for="ss-post">post</label>
                </div>
                <div class="flex flex-row gap-1">
                    <input type="radio" id="ss-download" name="ss-option" value="download" v-model="mode" class="accent-app-green">
                    <label for="ss-download">download</label>
                </div>
            </div>
            <button class="rounded-md border border-app-green py-2 px-6 hover:bg-gray-200 dark:hover:bg-gray-800" @click="openScreenshot">{{ translations.docs.comments.screenshot.tryIt[store.lang] }}</button>
            <div v-if="mode === 'post'" class="border border-dashed border-gray-500 rounded-md p-6">
                <div v-if="!pic" class="text-gray-500">{{ translations.docs.comments.screenshot.yourScreeshot[store.lang] }}</div>
                <img v-if="pic" :src="pic" class="w-full border border-gray-700">
                <div v-if="pic" class="mt-6">
                    <div class="text-gray-500">{{ translations.docs.comments.screenshot.metadata[store.lang] }}</div>
                    <div class="mt-3 text-app-green">{{ imageData }}</div>
                </div>
                <div v-if="pic" class="w-full flex place-items-center place-content-center mt-6">
                    <button class="rounded-md py-1 px-6 border border-app-orange hover:bg-gray-800" @click="clearPic">clear</button>
                </div>
            </div>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green hover:shadow-xl transition-all" @click="copyDefaultConf(mainConfig.vue_ui_screenshot)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
        </div>
        <Box showEmits :activeTab="1">
            <template v-slot:tab0>
              {{ translations.docs.comments.noDataset[store.lang] }}
            </template>
            <template v-slot:tab1>
                <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
                <div class="text-black dark:text-app-green hover:underline mt-4 cursor-pointer" role="button" @click="reopen">{{ translations.docs.comments.screenshot.refresh[store.lang] }}</div>
                <div class="overflow-x-auto">
<pre>
<code v-if="mode === 'post'">
const <span class="text-black dark:text-app-blue">config</span> = {
    mode: "post", (default:"download")
    quality: <input v-if="isDarkMode" type="number" min="0.1" max="3" step="0.1" v-model="mutablePostConfigDarkMode.quality"><input v-else type="number" min="0.1" max="3" step="0.1" v-model="mutablePostConfig.quality">, (default: 1) <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.screenshot.quality[store.lang] }}</span>
    style: {
        info: {
            background: <input v-if="isDarkMode" type="color" v-model="mutablePostConfigDarkMode.style.info.background"><input v-else type="color" v-model="mutablePostConfig.style.info.background">, (default: "#FFFFFF")
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutablePostConfigDarkMode.style.info.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutablePostConfig.style.info.bold">, (default: true)
            border: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.info.border"><input v-else type="text" v-model="mutablePostConfig.style.info.border">, (default: "none")
            borderRadius: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutablePostConfigDarkMode.style.info.borderRadius"><input v-else type="number" min="0" max="100" v-model="mutablePostConfig.style.info.borderRadius">, (default: 4)
            boxShadow: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.info.boxShadow"><input v-else type="text" v-model="mutablePostConfig.style.info.boxShadow">, (default: "0 6px 12px -6px rgba(0,0,0,0.2)")
            color: <input v-if="isDarkMode" type="color" v-model="mutablePostConfigDarkMode.style.info.color"><input v-else type="color" v-model="mutablePostConfig.style.info.color">, (default: "#2D353C")
            fontFamily: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.info.fontFamily"><input v-else type="text" v-model="mutablePostConfig.style.info.fontFamily">, (default: "inherit")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutablePostConfigDarkMode.style.info.fontSize"><input v-else type="number" min="6" max="30" v-model="mutablePostConfig.style.info.fontSize">, (default: 14)
            minWidth: <input v-if="isDarkMode" type="number" min="100" v-model="mutablePostConfigDarkMode.style.info.minWidth"><input v-else type="number" min="100" v-model="mutablePostConfig.style.info.minWidth">, (default: 300)
            padding: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutablePostConfigDarkMode.style.info.padding"><input v-else type="number" min="0" max="48" v-model="mutablePostConfig.style.info.padding">, (default: 12)
            top: <input v-if="isDarkMode" type="number" v-model="mutablePostConfigDarkMode.style.info.top"><input v-else type="number" v-model="mutablePostConfig.style.info.top">, (default: -100)
        },
        captureButton: {
            background: <input v-if="isDarkMode" type="color" v-model="mutablePostConfigDarkMode.style.captureButton.background"><input v-else type="color" v-model="mutablePostConfig.style.captureButton.background">, (default: "#E1E5E8")
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutablePostConfigDarkMode.style.captureButton.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutablePostConfig.style.captureButton.bold">, (default: true)
            border: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.captureButton.border"><input v-else type="text" v-model="mutablePostConfig.style.captureButton.border">, (default: "none")
            borderRadius: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutablePostConfigDarkMode.style.captureButton.borderRadius"><input v-else type="number" min="0" max="100" v-model="mutablePostConfig.style.captureButton.borderRadius">, (default: 4)
            boxShadow: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.captureButton.boxShadow"><input v-else type="text" v-model="mutablePostConfig.style.captureButton.boxShadow">, (default: "0 6px 12px -6px rgba(0,0,0,0.2)")
            color: <input v-if="isDarkMode" type="color" v-model="mutablePostConfigDarkMode.style.captureButton.color"><input v-else type="color" v-model="mutablePostConfig.style.captureButton.color">, (default: "#2D353C")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutablePostConfigDarkMode.style.captureButton.fontSize"><input v-else type="number" min="6" max="30" v-model="mutablePostConfig.style.captureButton.fontSize">, (default: 14)
            minHeight: <input v-if="isDarkMode" type="number" min="32" max="100" v-model="mutablePostConfigDarkMode.style.captureButton.minHeight"><input v-else type="number" min="32" max="100" v-model="mutablePostConfig.style.captureButton.minHeight">, (default: 40)
            padding: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.captureButton.padding"><input v-else type="text" v-model="mutablePostConfig.style.captureButton.padding">, (default: "8px 12px")
        },
        cancelButton: {
            background: <input v-if="isDarkMode" type="color" v-model="mutablePostConfigDarkMode.style.cancelButton.background"><input v-else type="color" v-model="mutablePostConfig.style.cancelButton.background">, (default: "#F17171")
            border: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.cancelButton.border"><input v-else type="text" v-model="mutablePostConfig.style.cancelButton.border">, (default: "none")
            color: <input v-if="isDarkMode" type="color" v-model="mutablePostConfigDarkMode.style.cancelButton.color"><input v-else type="color" v-model="mutablePostConfig.style.cancelButton.color">, (default: "#FFFFFF")
            right: <input v-if="isDarkMode" type="number" v-model="mutablePostConfigDarkMode.style.cancelButton.right"><input v-else type="number" v-model="mutablePostConfig.style.cancelButton.right">, (default: -14)
            size: <input v-if="isDarkMode" type="number" min="12" max="48" v-model="mutablePostConfigDarkMode.style.cancelButton.size"><input v-else type="number" min="12" max="48" v-model="mutablePostConfig.style.cancelButton.size">, (default: 28)
            top: <input v-if="isDarkMode" type="number" v-model="mutablePostConfigDarkMode.style.cancelButton.top"><input v-else type="number" v-model="mutablePostConfig.style.cancelButton.top">, (default: -14)
        },
        captureArea: {
            background: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.captureArea.background"><input v-else type="text" v-model="mutablePostConfig.style.captureArea.background">, (default: "radial-gradient(transparent, rgba(0,0,0,0.15))")
            border: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.captureArea.border"><input v-else type="text" v-model="mutablePostConfig.style.captureArea.border">, (default: "dashed 4px #2D353C")
            initialHeight: <input v-if="isDarkMode" type="number" min="64" v-model="mutablePostConfigDarkMode.style.captureArea.initialHeight"><input v-else type="number" min="64" v-model="mutablePostConfig.style.captureArea.initialHeight">, (default: 200)
            initialWidth: <input v-if="isDarkMode" type="number" min="64" v-model="mutablePostConfigDarkMode.style.captureArea.initialWidth"><input v-else type="number" min="64" v-model="mutablePostConfig.style.captureArea.initialWidth">, (default: 200)
        },
        handles: {
            background: <input v-if="isDarkMode" type="color" v-model="mutablePostConfigDarkMode.style.handles.background"><input v-else type="color" v-model="mutablePostConfig.style.handles.background">, (default: "#FFFFFF")
            border: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.style.handles.border"><input v-else type="text" v-model="mutablePostConfig.style.handles.border">, (default: "4px solid #2D353C")
            borderRadius: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutablePostConfigDarkMode.style.handles.borderRadius"><input v-else type="number" min="0" max="48" v-model="mutablePostConfig.style.handles.borderRadius">, (default: 4)
            size: <input v-if="isDarkMode" type="number" min="20" max="100" v-model="mutablePostConfigDarkMode.style.handles.size"><input v-else type="number" min="20" max="100" v-model="mutablePostConfig.style.handles.size">, (default: 40)
        }
    },
    translations: {
        captureButton: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.translations.captureButton"><input v-else type="text" v-model="mutablePostConfig.translations.captureButton">, (default: "Capture")
        info: <input v-if="isDarkMode" type="text" v-model="mutablePostConfigDarkMode.translations.info"><input v-else type="text" v-model="mutablePostConfig.translations.info">, (default: "Resize or move and click to capture")
    }
}
</code>
<code v-if="mode === 'download'">
const <span class="text-black dark:text-app-blue">config</span> = {
    mode: "post", (default:"download")
    quality: <input type="number" min="0.1" max="3" step="0.1" v-model="mutableDownloadConfig.quality">, (default: 1) <span class="text-gray-600 dark:text-app-green">// don't set it up too high if you care about image size</span>
    style: {
        info: {
            background: <input v-if="isDarkMode" type="color" v-model="mutableDownloadConfigDarkMode.style.info.background"><input v-else type="color" v-model="mutableDownloadConfig.style.info.background">, (default: "#FFFFFF")
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableDownloadConfigDarkMode.style.info.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableDownloadConfig.style.info.bold">, (default: true)
            border: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.info.border"><input v-else type="text" v-model="mutableDownloadConfig.style.info.border">, (default: "none")
            borderRadius: <input type="number" min="0" max="100" v-model="mutableDownloadConfig.style.info.borderRadius">, (default: 4)
            boxShadow: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.info.boxShadow"><input v-else type="text" v-model="mutableDownloadConfig.style.info.boxShadow">, (default: "0 6px 12px -6px rgba(0,0,0,0.2)")
            color: <input v-if="isDarkMode" type="color" v-model="mutableDownloadConfigDarkMode.style.info.color"><input v-else type="color" v-model="mutableDownloadConfig.style.info.color">, (default: "#2D353C")
            fontFamily: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.info.fontFamily"><input v-else type="text" v-model="mutableDownloadConfig.style.info.fontFamily">, (default: "inherit")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableDownloadConfigDarkMode.style.info.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableDownloadConfig.style.info.fontSize">, (default: 14)
            minWidth: <input v-if="isDarkMode" type="number" min="100" v-model="mutableDownloadConfigDarkMode.style.info.minWidth"><input v-else type="number" min="100" v-model="mutableDownloadConfig.style.info.minWidth">, (default: 300)
            padding: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutableDownloadConfigDarkMode.style.info.padding"><input v-else type="number" min="0" max="48" v-model="mutableDownloadConfig.style.info.padding">, (default: 12)
            top: <input v-if="isDarkMode" type="number" v-model="mutableDownloadConfigDarkMode.style.info.top"><input v-else type="number" v-model="mutableDownloadConfig.style.info.top">, (default: -100)
        },
        captureButton: {
            background: <input v-if="isDarkMode" type="color" v-model="mutableDownloadConfigDarkMode.style.captureButton.background"><input v-else type="color" v-model="mutableDownloadConfig.style.captureButton.background">, (default: "#E1E5E8")
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableDownloadConfigDarkMode.style.captureButton.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableDownloadConfig.style.captureButton.bold">, (default: true)
            border: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.captureButton.border"><input v-else type="text" v-model="mutableDownloadConfig.style.captureButton.border">, (default: "none")
            borderRadius: <input v-if="isDarkMode" type="number" min="0" max="100" v-model="mutableDownloadConfigDarkMode.style.captureButton.borderRadius"><input v-else type="number" min="0" max="100" v-model="mutableDownloadConfig.style.captureButton.borderRadius">, (default: 4)
            boxShadow: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.captureButton.boxShadow"><input v-else type="text" v-model="mutableDownloadConfig.style.captureButton.boxShadow">, (default: "0 6px 12px -6px rgba(0,0,0,0.2)")
            color: <input v-if="isDarkMode" type="color" v-model="mutableDownloadConfigDarkMode.style.captureButton.color"><input v-else type="color" v-model="mutableDownloadConfig.style.captureButton.color">, (default: "#2D353C")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" v-model="mutableDownloadConfigDarkMode.style.captureButton.fontSize"><input v-else type="number" min="6" max="30" v-model="mutableDownloadConfig.style.captureButton.fontSize">, (default: 14)
            minHeight: <input v-if="isDarkMode" type="number" min="32" max="100" v-model="mutableDownloadConfigDarkMode.style.captureButton.minHeight"><input v-else type="number" min="32" max="100" v-model="mutableDownloadConfig.style.captureButton.minHeight">, (default: 40)
            padding: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.captureButton.padding"><input v-else type="text" v-model="mutableDownloadConfig.style.captureButton.padding">, (default: "8px 12px")
        },
        cancelButton: {
            background: <input v-if="isDarkMode" type="color" v-model="mutableDownloadConfigDarkMode.style.cancelButton.background"><input v-else type="color" v-model="mutableDownloadConfig.style.cancelButton.background">, (default: "#F17171")
            border: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.cancelButton.border"><input v-else type="text" v-model="mutableDownloadConfig.style.cancelButton.border">, (default: "none")
            color: <input v-if="isDarkMode" type="color" v-model="mutableDownloadConfigDarkMode.style.cancelButton.color"><input v-else type="color" v-model="mutableDownloadConfig.style.cancelButton.color">, (default: "#FFFFFF")
            right: <input v-if="isDarkMode" type="number" v-model="mutableDownloadConfigDarkMode.style.cancelButton.right"><input v-else type="number" v-model="mutableDownloadConfig.style.cancelButton.right">, (default: -14)
            size: <input v-if="isDarkMode" type="number" min="12" max="48" v-model="mutableDownloadConfigDarkMode.style.cancelButton.size"><input v-else type="number" min="12" max="48" v-model="mutableDownloadConfig.style.cancelButton.size">, (default: 28)
            top: <input v-if="isDarkMode" type="number" v-model="mutableDownloadConfigDarkMode.style.cancelButton.top"><input v-else type="number" v-model="mutableDownloadConfig.style.cancelButton.top">, (default: -14)
        },
        captureArea: {
            background: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.captureArea.background"><input v-else type="text" v-model="mutableDownloadConfig.style.captureArea.background">, (default: "radial-gradient(transparent, rgba(0,0,0,0.15))")
            border: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.captureArea.border"><input v-else type="text" v-model="mutableDownloadConfig.style.captureArea.border">, (default: "dashed 4px #2D353C")
            initialHeight: <input v-if="isDarkMode" type="number" min="64" v-model="mutableDownloadConfigDarkMode.style.captureArea.initialHeight"><input v-else type="number" min="64" v-model="mutableDownloadConfig.style.captureArea.initialHeight">, (default: 200)
            initialWidth: <input v-if="isDarkMode" type="number" min="64" v-model="mutableDownloadConfigDarkMode.style.captureArea.initialWidth"><input v-else type="number" min="64" v-model="mutableDownloadConfig.style.captureArea.initialWidth">, (default: 200)
        },
        handles: {
            background: <input v-if="isDarkMode" type="color" v-model="mutableDownloadConfigDarkMode.style.handles.background"><input v-else type="color" v-model="mutableDownloadConfig.style.handles.background">, (default: "#FFFFFF")
            border: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.style.handles.border"><input v-else type="text" v-model="mutableDownloadConfig.style.handles.border">, (default: "4px solid #2D353C")
            borderRadius: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutableDownloadConfigDarkMode.style.handles.borderRadius"><input v-else type="number" min="0" max="48" v-model="mutableDownloadConfig.style.handles.borderRadius">, (default: 4)
            size: <input v-if="isDarkMode" type="number" min="20" max="100" v-model="mutableDownloadConfigDarkMode.style.handles.size"><input v-else type="number" min="20" max="100" v-model="mutableDownloadConfig.style.handles.size">, (default: 40)
        }
    },
    translations: {
        captureButton: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.translations.captureButton"><input v-else type="text" v-model="mutableDownloadConfig.translations.captureButton">, (default: "Capture")
        info: <input v-if="isDarkMode" type="text" v-model="mutableDownloadConfigDarkMode.translations.info"><input v-else type="text" v-model="mutableDownloadConfig.translations.info">, (default: "Resize or move and click to capture")
    }
}
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab2>
                <div><code><b>@postImage</b></code></div>
                <div class="text-gray-400 pl-5">{{translations.docs.emits.screenshot.postImage[store.lang]}}</div>
<pre>
<code>
    {
        createdAt: number; <span class="text-gray-500">// {{ translations.docs.comments.screenshot.timestamp[store.lang] }}</span>
        deviceType: "desktop" | "tablet" | "mobile",
        fileSize: string; <span class="text-gray-500">// in KB</span>
        image: string; <span class="text-gray-500">// base64 format</span>
        screenWidth: number;
        x: number; <span class="text-gray-500">// {{ translations.docs.comments.screenshot.x[store.lang] }}</span>
        y: number; <span class="text-gray-500">// {{ translations.docs.comments.screenshot.y[store.lang] }}</span>
    }
</code>
</pre>
{{ translations.docs.example[store.lang] }}:
<pre>
<code>
    &lt;script setup&gt;
        import { ref } from "vue";

        const screenshotComponent = ref(null);

        const config = ref({
            mode: "post"
        });

        function useScreenshot() {
            screenshotComponent.value.shoot();
        }

        const preview = ref("");
        const metadata = ref({});

        function postImage({ createdAt, deviceType, fileSize, image, screenWidth, x, y }) {
            preview.value = imageData.image;
            metadata.value = { createdAt, deviceType, fileSize image, screenWidth, x, y };
        }

    &lt;/script&gt;

    &lt;template&gt;

        &lt;button @click="useScreenshot"&gt;
            Take a screenshot
        &lt;/button&gt;

        &lt;img v-if="preview" :src="preview" /&gt;

        &lt;VueUiScreenshot ref="screenshotComponent" :config="config" @postImage="postImage"  /&gt;
    &lt;/template&gt;
</code>
</pre>
            <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                <div><code><b>shoot</b></code></div>
                <div class="text-gray-400 pl-5">{{  translations.docs.emits.screenshot.shoot[store.lang] }}</div>
<pre>
<code>
    &lt;script setup&gt;
        import { ref } from "vue";

        const screenshotComponent = ref(null);

        function useScreenshot() {
            screenshotComponent.value.shoot();
        }

    &lt;/script&gt;

    &lt;template&gt;

        &lt;button @click="useScreenshot"&gt;
            Take a screenshot
        &lt;/button&gt;

        &lt;VueUiScreenshot ref="screenshotComponent" /&gt;
    &lt;/template&gt;
</code>
</pre>
                <div class="pt-6 border-t mt-6 border-gray-700"><code><b>close</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.screenshot.close[store.lang] }}</div>
<pre>
<code>
    &lt;script setup&gt;
        import { ref } from "vue";

        const screenshotComponent = ref(null);

        function closeScreenshot() {
            screenshotComponent.value.close();
        }

    &lt;/script&gt;

    &lt;template&gt;

        &lt;button @click="closeScreenshot"&gt;
            Close screenshot tool
        &lt;/button&gt;

        &lt;VueUiScreenshot ref="screenshotComponent" /&gt;
    &lt;/template&gt;
</code>
</pre>   
            </div> 
            </template>
        </Box>

        <VueUiScreenshot :key="step" v-if="mode === 'post'" ref="screenshot" :config="isDarkMode ? mutablePostConfigDarkMode : mutablePostConfig" @postImage="postImage"/>
        <VueUiScreenshot :key="step" v-if="mode === 'download'" ref="screenshot" :config="isDarkMode ? mutableDownloadConfigDarkMode : mutableDownloadConfig"/>
    </div>
</template>