<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import { SearchIcon, XIcon } from "vue-tabler-icons";
import config from "../assets/default_configs.json";

const store = useMainStore();

const props = defineProps({
    fixed: {
        type: Boolean,
        default: true
    }
})

const searchTerm = ref("");
const currentResults = ref([]);
const hasResults = ref(false);
const showSuggestions = ref(false);
const canShowOutside = ref(true);

function flattenAttributes(obj) {
  const attributes = [];

  function flatten(obj, path = '') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newPath = path ? `${path}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          flatten(obj[key], newPath);
        } else {
          const attribute = newPath.split('.').pop(); // Get only the attribute name
          if (!attributes.includes(attribute)) {
            attributes.push(attribute);
          }
        }
      }
    }
  }

  flatten(obj);
  return attributes;
}

const allAttributes = flattenAttributes(config);

const filteredSuggestions = computed(() => {
  return allAttributes.filter(attr =>
    attr.toLowerCase().includes(searchTerm.value.toLowerCase()) && !['0', '1', '2', '3', '4'].includes(attr)
  ).sort()
});

function handleInput() {
    if(searchTerm.value.length > 2) {
        showSuggestions.value = true;
    }
}

function selectSuggestion(suggestion) {
  searchTerm.value = suggestion;
  showSuggestions.value = false;
  search();
}

function search() {
    const results = [];

    function searchObject(obj, objName = "", path = "") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newPath = path ? `${path} > ${key}` : key;
                const fullPath = objName ? `${formatString(objName)} : ${newPath}` : newPath;

                if (key === searchTerm.value) {
                    results.push({ path: fullPath, value: obj[key], type: typeof obj[key], route: objName.replaceAll("_", "-") });
                }

                if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                    searchObject(obj[key], objName || key, newPath);
                }
            }
        }
    }
    Object.keys(config).forEach((key) => {
        searchObject(config[key], key);
    });
    hasResults.value = results.length > 0;
    currentResults.value = results;
    useModal("open");
    return results;
}

function formatString(str) {
  return str.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function useModal(state) {
    const dialog = document.getElementById("searchDialog");
    if (!dialog) return;

    if (state === 'open') {
        dialog.showModal();
        canShowOutside.value = false;

    } else {
        dialog.close();
        canShowOutside.value = true;
    }
}

function clearSearch() {
    searchTerm.value = "";
    hasResults.value = false;
    showSuggestions.value = false;
}

onMounted(() => {
    document.addEventListener("keyup", (e) => {
        if(e.key === 'Escape') {
            canShowOutside.value = true;
        }
    })
})

</script>

<template>
    <div v-if="canShowOutside" :class="`z-50 text-white ${props.fixed ? 'fixed' : ''} top-16 right-4 w-fit text-left`">
        <form autocomplete="off" onsubmit="return false">
            <div class="flex flex-row gap-2">
                <input @input="handleInput" type="text" class="p-2 h-[36px] rounded-lg border border-gray-600 text-black focus:outline-app-green" style="text-align:left !important" v-model="searchTerm" :placeholder="store.translations.search.placeholder[store.lang]">
                <button :disabled="!searchTerm" class="h-[36px] w-[36px] flex place-items-center justify-center border border-gray-600 rounded-lg hover:bg-gradient-to-br hover:from-app-green hover:to-green-700 hover:border-app-green text-black dark:text-app-green dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" @click="search">
                    <SearchIcon/>
                </button>
                <button v-if="searchTerm || showSuggestions" class="h-[36px] w-[36px] flex place-items-center justify-center border border-gray-600 rounded-lg hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:border-app-orange text-black dark:text-app-orange dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" @click="clearSearch">
                    <XIcon/>
                </button>

            </div>
            <ul v-if="showSuggestions" class="absolute bg-white dark:bg-black-100 border border-gray-300 mt-1 rounded-md shadow-lg z-10 max-h-[500px] overflow-auto">
                <li
                    v-for="suggestion in filteredSuggestions"
                    class="px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-app-green text-black dark:text-gray-300 dark:hover:text-black"
                    @click="selectSuggestion(suggestion)"
                >
                {{ suggestion }}
                </li>
            </ul>
        </form>
    </div>
    <dialog id="searchDialog" class=" fixed h-screen max-h-[600px] w-full max-w-[800px] p-6 rounded-lg bg-white dark:bg-black-100 text-black dark:text-gray-300">
        <div class="z-10 w-full text-2xl sticky top-0 bg-white dark:bg-black-100 font-black">
            {{ store.translations.search.term[store.lang] }} <span class="text-app-blue">{{ searchTerm }}</span>
            <button class="absolute top-2 right-2" @click="useModal('close')">
            <XIcon class="text-black dark:text-app-green"/>
        </button>
        </div>

        <div class="w-full overflow-y-auto mt-12 max-h-[400px] pr-4">
            <form autocomplete="off" onsubmit="return false">
            <div class="flex flex-row gap-2">
                <input @input="handleInput" type="text" class="p-2 h-[36px] rounded-lg border border-gray-600 text-black focus:outline-app-green" style="text-align:left !important" v-model="searchTerm" :placeholder="store.translations.search.placeholder[store.lang]">
                <button :disabled="!searchTerm" class="h-[36px] w-[36px] flex place-items-center justify-center border border-gray-600 rounded-lg hover:bg-gradient-to-br hover:from-app-green hover:to-green-700 hover:border-app-green text-black dark:text-app-green dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" @click="search">
                    <SearchIcon/>
                </button>
                <button v-if="searchTerm || showSuggestions" class="h-[36px] w-[36px] flex place-items-center justify-center border border-gray-600 rounded-lg hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:border-app-orange text-black dark:text-app-orange dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" @click="clearSearch">
                    <XIcon/>
                </button>

            </div>
            <ul v-if="showSuggestions" class="absolute bg-white dark:bg-black-100 border border-gray-300 mt-1 rounded-md shadow-lg z-10 max-h-[300px] overflow-auto">
                <li
                    v-for="suggestion in filteredSuggestions"
                    tabindex="0"
                    class="px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-app-green text-black dark:text-gray-300 dark:hover:text-black"
                    @click="selectSuggestion(suggestion)"
                >
                {{ suggestion }}
                </li>
            </ul>
        </form>
            <div v-for="res in currentResults" class="p-2 border border-gray-300 dark:border-gray-600 my-2 rounded-md">
                <details>
                    <summary class="select-none cursor-pointer">
                        <span v-html="res.path.replace(searchTerm, `<span class='text-app-blue font-black'>${searchTerm}</span>`)"></span>
                    </summary>
                    <div class="flex flex-col w-full">
                        <div>Type: {{ res.type }}</div>
                        <div>{{ store.translations.search.defaultValue[store.lang] }} : <span class="text-app-blue font-black">{{ res.type === 'string' ? `"${res.value}"` : res.value }}</span></div>
                    </div>

                    <router-link :to="`/docs#${res.route}`" @click="useModal('close')">
                        <div class="hover:underline dark:text-app-green font-black mt-2">
                        {{ store.translations.search.viewComponent[store.lang] }}
                        </div>
                    </router-link>

                </details>
            </div>
        </div>
        
        <div class="w-full flex place-items-center justify-end absolute bottom-6 right-6" v-if="hasResults">
            <button class="h-[40px] px-6 rounded-lg border border-app-green text-black dark:text-app-green hover:bg-gradient-to-br hover:from-app-green hover:to-green-700 hover:text-white hover:dark:text-white transition-colors" @click="useModal('close')">
                {{ store.translations.search.close[store.lang] }}
            </button>
        </div>
    </dialog>
</template>