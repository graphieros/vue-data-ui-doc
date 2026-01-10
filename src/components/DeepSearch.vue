<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMainStore } from "../stores";
import { XIcon, InfoCircleIcon } from "vue-tabler-icons";
import {useConfig} from "../assets/useConfig";
import Prism from "prismjs"
import { useRouter } from "vue-router";
import vClickOutside from "../directives/vClickOutside"
import CodeParser from "./customization/CodeParser.vue";

const config = useConfig()

const store = useMainStore();
const router = useRouter()

const props = defineProps({
  fixed: {
    type: Boolean,
    default: true,
  },
});

const isDarkMode = computed(() => store.isDarkMode);

const searchTerm = ref("");
const currentResults = ref([]);
const hasResults = ref(false);
const showSuggestions = ref(false);
const canShowOutside = ref(true);
const isClosing = ref(false);

function flattenAttributes(obj) {
  const attributes = [];

  function flatten(obj, path = "") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newPath = path ? `${path}.${key}` : key;
        
        const attribute = newPath.split(".").pop(); // Get only the attribute name
        attributes.push(attribute);
        if (typeof obj[key] === "object" && obj[key] !== null) {
          flatten(obj[key], newPath);
        }
      }
    }
  }

  flatten(obj);
  return attributes;
}

const allAttributes = flattenAttributes(config);

const filteredSuggestions = computed(() => {
  return [...new Set(allAttributes
    .filter(
      (attr) =>
        attr.toUpperCase().includes(searchTerm.value.toUpperCase()) &&
        !["0", "1", "2", "3", "4", "5"].includes(attr)
    )
    .sort())].filter(s => !s.includes('_'))
});

function handleInput() {
  if (searchTerm.value.length > 2) {
    showSuggestions.value = true;
  }
}

function selectSuggestion(suggestion) {
  searchTerm.value = suggestion;
  showSuggestions.value = false;
  search();
}

const objNames = ref([]);
const selectedObjName = ref("");

function search() {
  if (searchTerm.value) {
    router.push({ name: 'Search', query: { q: searchTerm.value } });
  }
}

function useModal(state) {
  const dialog = document.getElementById("searchDialog");
  isClosing.value = false;
  if (!dialog) return;

  if (state === "open") {
    dialog.showModal();
    canShowOutside.value = false;
    showSuggestions.value = false;
  } else {
    isClosing.value = true;

    setTimeout(() => {
        dialog.close();
        canShowOutside.value = true;
    }, 150)
  }
  selectedIndex.value = -1;
}

function clearSearch() {
  searchTerm.value = "";
  objNames.value = [];
  selectedObjName.value = "";
  hasResults.value = false;
  showSuggestions.value = false;
}

onMounted(() => {
  window.Prism = window.Prism || {}
    window.Prism.manual = true
    Prism.highlightAll()

  document.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key === "Escape") {
      canShowOutside.value = true;
    }
  });
  document.addEventListener("keyup", handleArrowKeys);
});

const selectedIndex = ref(-1);

function handleArrowKeys(event) {
  if (showSuggestions.value && ["ArrowUp", "ArrowDown"].includes(event.key)) {
    if (event.key === "ArrowUp") {
      selectedIndex.value -= 1;
    } else if (event.key === "ArrowDown") {
      selectedIndex.value += 1;
    }

    const selection = document.getElementById(`suggestion-${selectedIndex.value}`);
    if (selection) {
      selection.focus();
    }
  }
}

onUnmounted(() => {
  document.removeEventListener("keyup", handleArrowKeys);
});

const accordionConfig = computed(() => {
  return {
    open: false,
    maxHeight: 10000,
    head: {
      backgroundColor: 'transparent'
    },
    body: {
      backgroundColor: 'transparent'
    }
  }
})
const accordionConfigDarkMode = computed(() => {
  return {
    open: false,
    maxHeight: 10000,
    head: {
      backgroundColor: 'transparent'
    },
    body: {
      backgroundColor: 'transparent',
      color: '#CCCCCC'
    }
  }
})

function formatSuggestion(word) {
    const escapedSearchTerm = searchTerm.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'i');
    return word.replace(regex, '<span class="font-inter-medium bg-app-blue-light dark:bg-app-blue text-black">$1</span>');
}

function closeList() {
  showSuggestions.value = false;
}

</script>

<template>
  <div
    :class="`z-50 text-white ${
      props.fixed ? 'fixed hidden sm:block' : ''
    } top-16 right-4 w-fit text-left`"
  >
    <form autocomplete="off" onsubmit="return false">
      <div class="flex flex-row gap-2">
        <div class="anim-wrapper w-[280px] rounded-full -mt-[1px]">
          <input
            @input="handleInput"
            @click.stop="handleInput"
            type="text"
            class="font-inter-medium inner p-2 !pl-4 h-[36px] !rounded-full text-black dark:text-[#CCCCCC] focus:outline-app-blue w-[280px] bg-white dark:bg-[#2A2A2A] shadow-[inset_0_2px_6px_#8A8A8A,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_#000000,0_4px_6px_rgba(0,0,0,0.5)]"
            style="text-align: left !important"
            v-model="searchTerm"
            :placeholder="store.translations.search.placeholder[store.lang]"
            list="attrSearch"
          />
        </div>
        <button
          :disabled="!searchTerm"
          class="h-[36px] w-[36px] flex place-items-center justify-center rounded-full dark:bg-[#2A2A2A] hover:bg-gradient-to-br hover:from-app-green hover:to-green-700 hover:border-app-green text-black dark:text-app-green dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
          @click="search"
        >
          <VueUiIcon name="magnify" :stroke="isDarkMode ? '#87e6bb' : '#1A1A1A'" :size="20"/>
        </button>
        <button
          v-if="searchTerm || showSuggestions"
          class="h-[36px] w-[36px] flex place-items-center justify-center rounded-full dark:bg-[#2A2A2A] hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:border-app-orange text-black dark:text-app-orange dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
          @click="clearSearch"
        >
          <XIcon />
        </button>
      </div>
      <div v-if="showSuggestions && filteredSuggestions.length" class="font-inter-medium text-[14px] absolute top-0 -mt-[330px] left-7 rounded-t-lg tabular-nums bg-white dark:bg-[#3A3A3A] text-black dark:text-[#CCCCCC] w-fit px-2 py-1">
        {{ filteredSuggestions.length }} results
      </div>
      <ul
        v-if="showSuggestions && filteredSuggestions.length"
        v-click-outside="closeList"
        class="absolute bg-white dark:bg-black-100 border border-gray-300 top-0 -mt-[300px] rounded-md shadow-lg z-10 h-[300px] overflow-auto min-w-[280px]"
      >
        <li
          tabindex="0"
          v-for="(suggestion, i) in filteredSuggestions"
          :id="`suggestion-${i}`"
          class="px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#5f8aee30] text-black dark:text-gray-300 focus:bg-gray-200 dark:focus:bg-app-green dark:focus:text-black"
          @click="selectSuggestion(suggestion)"
          @keyup.enter="selectSuggestion(suggestion)"
        >
          <span v-html="formatSuggestion(suggestion)" />
        </li>
      </ul>
    </form>
  </div>
  <dialog
    id="searchDialog"
    :class="`${isClosing ? 'is-closing' : ''} glass fixed h-screen max-h-[600px] w-full max-w-[800px] p-6 rounded-lg bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(36,36,36,0.8)] text-black dark:text-gray-300 border dark:border-[#2A2A2A]`"
  >
    <div class="z-10 w-full text-2xl sticky top-0 font-black">
      <div class="flex flex-row gap-2 place-items-center">
        <img data-cy="header-logo" src="../assets/logo3.png" class="h-5" />
        <span>
          {{ store.translations.search.term[store.lang] }}
          <span class="text-app-blue">{{ searchTerm }}</span>
        </span>
      </div>
      <button class="absolute top-2 right-2" @click="useModal('close')">
        <XIcon class="text-black dark:text-app-green" />
      </button>
    </div>

    <div class="w-full overflow-y-auto mt-12 max-h-[400px] pr-4">
      <form autocomplete="off" onsubmit="return false">
        <div class="flex flex-row gap-2">
            <input
              @input="handleInput"
              type="text"
              class="p-2 h-[36px] rounded-lg border border-gray-600 text-black focus:outline-app-green"
              style="text-align: left !important"
              v-model="searchTerm"
              :placeholder="store.translations.search.placeholder[store.lang]"
            />
          <button
            :disabled="!searchTerm"
            class="h-[36px] w-[36px] flex place-items-center justify-center border border-gray-600 rounded-lg hover:bg-gradient-to-br hover:from-app-green hover:to-green-700 hover:border-app-green text-black dark:text-app-green dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            @click="search"
          >
            <VueUiIcon name="magnify" :stroke="isDarkMode ? '#87e6bb' : '#1A1A1A'" :size="20"/>
          </button>
          <button
            v-if="searchTerm || showSuggestions"
            class="h-[36px] w-[36px] flex place-items-center justify-center border border-gray-600 rounded-lg hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:border-app-orange text-black dark:text-app-orange dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            @click="clearSearch"
          >
            <XIcon />
          </button>
          <select
            v-if="searchTerm || showSuggestions"
            v-model="selectedObjName"
            @change="search"
            class="p-2 h-[36px] rounded-lg border border-gray-600 text-black focus:outline-app-green"
          >
            <option value="" disabled selected>
              {{ store.translations.search.componentSelect[store.lang] }}
            </option>
            <option v-for="el in objNames" class="text-left">{{ el }}</option>
          </select>
          <button
            v-if="(searchTerm || showSuggestions) && selectedObjName"
            class="h-[36px] w-[36px] flex place-items-center justify-center border border-gray-600 rounded-lg hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:border-app-orange text-black dark:text-app-orange dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            @click="
              selectedObjName = '';
              search();
            "
          >
            <XIcon />
          </button>
        </div>

        <ul
          v-if="showSuggestions"
          class="absolute bg-white dark:bg-black-100 border border-gray-300 mt-1 rounded-md shadow-lg z-10 max-h-[300px] overflow-auto"
        >
          <li
            v-for="(suggestion, i) in filteredSuggestions"
            :id="`suggestion-${i}`"
            tabindex="0"
            class="px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-app-green text-black dark:text-gray-300 dark:hover:text-black focus:bg-gray-200 dark:focus:bg-app-green dark:focus:text-black"
            @click="selectSuggestion(suggestion)"
            @keyup.enter="selectSuggestion(suggestion)"
          >
            <span v-html="formatSuggestion(suggestion)"/>
          </li>
        </ul>
      </form>
      <div v-if="hasResults">
        <div
          v-for="res in currentResults"
          class="p-2 border border-gray-300 dark:border-[#2A2A2A] my-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#FFFFFF11]"
        >
          <VueDataUi
            component="VueUiAccordion"
            :config="isDarkMode ? accordionConfigDarkMode : accordionConfig"
          >
            <template #title="{ color }">
              <span
                v-html="
                  res.path.replace(
                    searchTerm,
                    `<span class='text-app-blue font-black'>${searchTerm}</span>`
                  )
                "
              ></span>
            </template>

            <template #content>
              <div class="flex flex-col w-full">
                <div>Type: <code class="text-app-blue">{{ res.type }}</code></div>
                {{ store.translations.search.defaultValue[store.lang] }} :
                <div class="bg-[#272822] p-4 rounded">
                  <CodeParser :content="res.value"/>
                  <!-- <code class="language-javascript" style="white-space: pre-wrap;">
                      <span >{{
                      res.type === "string" ? `"${res.value}"` : res.value
                      }}</span>
                      <div v-if="res.type === 'string' && res.value.includes('#')" :style="`background:${res.value}`" class="h-6 w-6 rounded border border-gray-400"/>
                  </code> -->
                </div>
                <router-link :to="`/docs#${res.route}`" @click="useModal('close')">
                  <div class="hover:underline dark:text-app-green font-black mt-2">
                    {{ store.translations.search.viewComponent[store.lang] }}
                  </div>
                </router-link>
              </div>

            </template>
          </VueDataUi>
        </div>
      </div>
    </div>

    <div v-if="!hasResults" class="mt-6 flex flex-row place-items-center gap-2">
      <InfoCircleIcon />
      <span>
        {{ store.translations.search.noResults[store.lang] }}
      </span>
    </div>

    <div class="w-full flex place-items-center justify-end absolute bottom-6 right-6">
      <button
        class="h-[40px] px-6 rounded-lg border border-app-green text-black dark:text-app-green hover:bg-gradient-to-br hover:from-app-green hover:to-green-700 hover:text-white hover:dark:text-white transition-colors"
        @click="useModal('close')"
      >
        {{ store.translations.search.close[store.lang] }}
      </button>
    </div>
  </dialog>
</template>

<style>
dialog::backdrop {
  background: radial-gradient(at top left, #313131, #1A1A1A);
  animation: backdrop-appear 0.15s ease-in forwards;
}
dialog {
  animation: dialog-appear 0.15s ease-in forwards;
}

.glass {
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

@keyframes dialog-appear {
  from {
    transform: translateY(5px) scale(0.95, 0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1, 1);
    opacity: 1;
  }
}
@keyframes backdrop-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.is-closing {
    animation: close-dialog 150ms ease-out;
}

@keyframes close-dialog {
    from {
        transform: translateY(0) scale(1, 1);
        opacity: 1
    }
    to {
        transform: translateY(5px) scale(0.95, 0.95);
        opacity: 0;
    }
}

.anim-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.anim-wrapper .inner {
  position: relative;
  z-index: 1;
  width: 100%;
}

.anim-wrapper .inner {
  margin: 2px;
}

.anim-wrapper::before {
  content: "";
  display: block;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    #42d392 50%,
    rgba(255, 255, 255, 0) 100%
  );
  height: 500px;
  width: 40px;
  transform: translate(0);
  position: absolute;
  animation: rotate 5s linear forwards infinite;
  z-index: 0;
  top: 50%;
  transform-origin: top center;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
