<script setup>
import { ref, onMounted, computed, onBeforeUnmount, nextTick, watch } from "vue";
import { Menu2Icon, XIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router";
import { SunFilledIcon, MoonStarsIcon, LanguageIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import ChartMaker from "./ChartMaker.vue";
import releases from "../../public/releases.json";
import HeaderDropdownItem from "./HeaderDropdownItem.vue";
import BaseDropdown from "./BaseDropdown.vue";
import vClickOutside from "../directives/vClickOutside";
import useCharts from "../useCharts";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import { createUid } from "../components/maker/lib";
import IconSettings from "./IconSettings.vue";
import BaseCard from "./BaseCard.vue";

const router = useRouter();
const store = useMainStore();
const { simpleMenu } = useCharts();

onMounted(() => {
    const ua = navigator.userAgent;
    store.isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/Edg/.test(ua);

    if (!localStorage.visitor) {
        localStorage.setItem('visitor', createUid());
    }
    if (!localStorage.votes) {
        localStorage.setItem('votes', JSON.stringify([]));
    }
});

const isOpen = ref(false);
const translations = computed(() => {
    return store.translations;
});

function useMenu() {
    isOpen.value = !isOpen.value;
}

const lastVersion = computed(() => {
    console.log(`
    
\\ \\      /\\
 \\ \\    /  \\
  \\ \\  / /\\ \\
   \\ \\/ /
    \\  /
     \\/ ${releases[0].version}
     

Vue Data UI is an open source library.
Feel free to make it better with us ^^
     `);
    return releases[0].version.replace("v", "").split("").slice(1);
});

const digitsConfigVersion = computed(() => {
    return {
        backgroundColor: "transparent",
        digits: {
            color: isDarkMode.value ? "#42d392" : "#1A1A1A",
            skeletonColor: isDarkMode.value ? "#FFFFFF10" : "#1A1A1A16",
        },
    };
});

const chartMkr = ref(null);

function openChartMaker() {
    chartMkr.value.openDialog();
}

function updateTheme() {
    if (localStorage.theme === "dark") {
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
            store.isDarkMode = false;
        } else {
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
            store.isDarkMode = true;
        }
}

function changeTheme() {

    if (!document.startViewTransition) {
        updateTheme();
        return;
    }

    document.startViewTransition(() => {
        updateTheme();
    })
}

const currentRoute = computed(() => {
    return router.currentRoute.value.path;
});

watch(() => currentRoute.value, (nr, or) => {
    if (nr !== or) {
        window.scrollTo(0,0);
    }
});

function isSelected(route) {
    return currentRoute.value === route;
}

onMounted(() => {
    if (localStorage.vueDataUiLang) {
        store.lang = localStorage.vueDataUiLang;
    } else {
        store.lang = "en";
    }
    document.addEventListener("click", (e) => {
        const target = e.target;
        const isMenu = target.closest("#mainDropdown");
        const isButton = target.closest("#mainDropdownButton");
        if (isButton) return;
        if (isOpen.value === true && isMenu === null) {
            isOpen.value = false;
        }
    });
    if (localStorage.theme) {
        store.isDarkMode = localStorage.theme === "dark";
    } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark");
            store.isDarkMode = true;
            localStorage.setItem("theme", "dark");
        } else {
            store.isDarkMode = false;
            localStorage.setItem("theme", "light");
        }
    }
});

async function fetchRatings() {
    try {
        const response = await fetch('https://vue-data-ui.graphieros.com/api/get_ratings.php');
        if (!response.ok) {
            console.warn('Network response was not ok');
            return;
        }
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
            return;
        }
        store.ratings.average = data.average || 0;
        store.ratings.breakdown = data.ratings || [];
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


onMounted(() => {
    fetchRatings();
})

const isDarkMode = computed(() => store.isDarkMode);

const languageOptions = ref([
    { value: "en", text: "English" },
    { value: "fr", text: "Français" },
    { value: "de", text: "Deutsch" },
    { value: "es", text: "Español" },
    { value: "pt", text: "Portugues" },
    { value: "zh", text: "中文" },
    { value: "jp", text: "日本語" },
    { value: "ko", text: "한국인" },
    { value: "ar", text: "عربي"}
]);

const selectedLanguage = computed({
    get() {
        return store.lang;
    },
    set(val) {
        localStorage.setItem("vueDataUiLang", val);
        store.lang = val;
        return val;
    },
});

const dropdownItems = computed(() => {
    return [
        { link: '/installation', title: translations.value.menu.installation[store.lang], clickableWhenActive: false},
        { link: '/docs', title: translations.value.menu.docs[store.lang], clickableWhenActive: true },
        { link: '/chart-builder', title: translations.value.menu.chartBuilder[store.lang], clickableWhenActive: false },
        { link: '/customization', title: translations.value.menu.customization[store.lang], clickableWhenActive: false },
        { link: '/examples', title: translations.value.menu.examples[store.lang], clickableWhenActive: false },
        { link: '/versions', title: translations.value.menu.versions[store.lang], clickableWhenActive: false },
        { link: '/about', title: translations.value.menu.about[store.lang], clickableWhenActive: false },
    ]
});

const detailedDoc = ref({
        en: "Detailed components documentation",
        fr: "Documentation détaillée des composants",
        pt: "Documentação detalhada dos componentes",
        de: "Detaillierte Komponenten-Dokumentation",
        zh: "详细的组件文档",
        jp: "詳細なコンポーネントドキュメント",
        es: "Documentación detallada de los componentes",
        ko: "상세한 구성 요소 문서",
        ar: "توثيق مفصل للمكونات"
    })

const isHome = computed(() => {
    return currentRoute.value === '/'
})

const isDocOpen = ref(false);

function openDocMenu() {
    isDocOpen.value = true;
}

function closeDocsMenu() {
    isDocOpen.value = false;
}

function toggleDocMenu() {
    isDocOpen.value = !isDocOpen.value;
}

function closeOnEsc(e) {
    if(e.key === 'Escape') {
            closeDocsMenu();
        }
}

onMounted(() => {
    window.addEventListener('keydown', closeOnEsc);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', closeOnEsc);
});

const message = ref({
    en: 'Even if your company makes more than 2M$ a year, Vue Data UI remains FREE',
    fr: 'Même si votre entreprise génère plus de 2M$ par an, Vue Data UI reste GRATUIT',
    pt: 'Mesmo que sua empresa fature mais de 2 milhões de dólares por ano, o Vue Data UI continua GRATUITO',
    de: 'Auch wenn Ihr Unternehmen mehr als 2 Mio. $ pro Jahr verdient, bleibt Vue Data UI KOSTENLOS',
    zh: '即使您的公司每年收入超过200万美元，Vue Data UI仍然是免费的',
    jp: '御社の年間売上が200万ドルを超えても、Vue Data UIは無料のままです',
    es: 'Incluso si su empresa gana más de 2 millones de dólares al año, Vue Data UI sigue siendo GRATUITO',
    ko: '귀사의 연 매출이 200만 달러를 넘더라도 Vue Data UI는 여전히 무료입니다',
    ar: 'حتى إذا حققت شركتك أكثر من 2 مليون دولار سنويًا، يظل Vue Data UI مجانًا',
})


</script>

<template>
    <ChartMaker ref="chartMkr" />
    <div v-if="currentRoute === '/'" class="fixed bottom-0 left-0 w-full h-[40px] bg-app-green-light dark:bg-app-blue hidden sm:flex z-[2147483647] place-items-center justify-center">
        {{ message[store.lang] }} <span class="animate-bounce ml-2">✊</span>
    </div>
    <header data-cy="app-header"
        tabindex="1"
        class="z-[2147483647] sticky top-0 w-full font-inter bg-gray-300 dark:bg-black text-gray-800 dark:text-slate-300 border-b dark:border-[#2A2A2A] outline-none">
        <div class="mx-auto w-5/6 py-3 flex justify-between place-items-center">
            <router-link data-cy="link-home" to="/" v-if="!isHome">
                <div class="flex flex-row gap-3">
                    <div data-cy="header-app-name" class="flex flex-row gap-3 w-full whitespace-nowrap">
                        <img data-cy="header-logo" src="../assets/logo3.png" class="h-5" />
                        <span>Vue Data UI</span>
                    </div>
                    <div class="h-[20px] flex flex-row align-center sm:ml-4">
                        <svg style="height:100%" viewBox="-6 -6 22 22">
                            <path d="M 0,4.5 5,12.5 10,4.5" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <VueUiDigits v-for="d in lastVersion" :config="digitsConfigVersion"
                            :dataset="d === '.' ? '.' : +d" :class="d === '.' ? '-mr-[0.5rem]' : ''" />
                    </div>
                </div>
            </router-link>
            <div v-else/>

            <nav class="hidden xl:flex flex-row gap-1 justify-end w-full place-items-center">
                <router-link data-cy="link-installation" to="/installation" @mouseenter="closeDocsMenu">
                    <span :class="`flex flex-row place-items-center gap-1 py-1 px-2 rounded-xl ${isSelected('/installation')
                                ? 'text-black dark:text-app-blue hover:cursor-default bg-gray-200 dark:bg-[#242424] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]'
                                : 'text-gray-800 dark:text-app-blue dark:hover:bg-[#FFFFFF10] hover:bg-gray-200'
                            }`">
                            <VueUiIcon name="starFill" :stroke="isDarkMode ? '#5f8bee' : '#1A1A1A'" :size="18" :strokeWidth="1" />
                        {{ translations.menu.installation[store.lang] }}
                    </span>
                </router-link>
                <div class="relative" @keydown.esc="closeDocsMenu">
                    <router-link data-cy="link-docs" to="/docs" @mouseover="openDocMenu" @click.stop="toggleDocMenu" @focus="openDocMenu">
                        <div 
                            :class="`flex flex-row place-items-center gap-1 py-1 px-2 rounded-xl ${isSelected('/docs')
                                    ? 'text-black dark:text-app-green hover:cursor-default bg-gray-200 dark:bg-[#242424] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]'
                                    : 'text-gray-800 dark:text-app-green dark:hover:bg-[#FFFFFF10] hover:bg-gray-200'
                                }`"
                            >
                            <IconSettings :size="18" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'"/>
                            {{ translations.menu.docs[store.lang] }}
                        </div>
                    </router-link>
                    <Transition name="fade">
                        <div 
                            v-if="isDocOpen"
                            v-click-outside="closeDocsMenu"
                            class="fixed top-[60px] left-1/2 -translate-x-1/2 mt-2 p-4 pt-10 rounded-2xl bg-gray-200 dark:bg-[#242424] grid grid-cols-6 w-max gap-6 shadow-[inset_0_2px_2px_#FFFFFF,0_8px_12px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_8px_12px_rgba(0,0,0,0.5)]"
                            tabindex="0"
                        >
                            <kbd>Esc</kbd>
                            <div class="fixed -top-1 left-0 py-3 w-full text-center font-inter-bold">
                                {{ detailedDoc[store.lang] }}
                            </div>
                            <div v-for="menu in simpleMenu" class="flex flex-col bg-gray-100 dark:bg-[#2A2A2A] pl-2 pt-2 rounded-md shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] pb-2">
                                <div class="text-s mb-4 font-inter-medium">{{ menu.category }}</div>
                                <FlexibleTooltip
                                        v-for="(item, i) in menu.components"
                                        position="bottom" 
                                        :content="`${item.description}`" 
                                        width="w-fit min-w-[200px]" 
                                        delay="delay-150"
                                        :alwaysBlue="true"
                                    >
                                    <template #before-inside>
                                        <div class="h-[32px] w-[32px]">
                                            <VueUiIcon :name="item.icon" :size="32" :stroke="isDarkMode ? '#1A1A1A' : '#5f8aee'"/>
                                        </div>
                                    </template>
                                    <RouterLink :to="item.link" @click="closeDocsMenu">
                                        <div class="flex flex-row place-items-center py-1 gap-2 relative">
                                            <svg v-if="item.link === router.currentRoute.value.fullPath" viewBox="0 0 10 10" height="10" width="10" class="shadow rounded-full absolute -left-3 top-1/2 -translate-y-1/2 animate-pulse">
                                                <circle cx="5" cy="5" r="5" :fill="isDarkMode ? '#42d392' : '#5f8aee'"/>
                                            </svg>
                                            <div class="h-[16px] w-[16px]">
                                                <VueUiIcon :name="item.icon" :size="18" :stroke="isDarkMode ? '#5f8aee' : '#1A1A1A'"/>
                                            </div>
                                            <div 
                                                :class="`text-xs hover:underline dark:hover:text-app-blue ${item.link === router.currentRoute.value.fullPath ? 'dark:text-app-blue font-inter-medium cursor-default hover:no-underline' : ''}`"
                                            >
                                                <span class="text-gray-500">VueUi</span>
                                                <span>{{ item.name.replaceAll('VueUi', '') }}</span>
                                            </div>
                                        </div>
                                    </RouterLink>
                                </FlexibleTooltip>
                            </div>
                        </div>
                    </Transition>
                </div>
                <router-link data-cy="link-docs" to="/chart-builder"  @mouseenter="closeDocsMenu">
                    <span :class="`flex flex-row place-items-center gap-1 py-1 px-2 rounded-xl ${isSelected('/chart-builder')
                                ? 'text-black dark:text-[#ffe596] hover:cursor-default bg-gray-200 dark:bg-[#242424] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]'
                                : 'text-gray-800 dark:text-[#ffe596] dark:hover:bg-[#FFFFFF10] hover:bg-gray-200'
                            }`">
                            <VueUiIcon name="boxes" :stroke="isDarkMode ? '#ffe596' : '#1A1A1A'" :size="18" :strokeWidth="1" />
                        {{ translations.menu.chartBuilder[store.lang] }}
                    </span>
                </router-link>
                <router-link data-cy="link-customization" to="/customization"  @mouseenter="closeDocsMenu">
                    <span :class="`flex flex-row place-items-center gap-1 py-1 px-2 rounded-xl ${isSelected('/customization')
                                ? 'text-black dark:text-[#de8b37] hover:cursor-default bg-gray-200 dark:bg-[#242424] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]'
                                : 'text-gray-800 dark:text-[#de8b37] dark:hover:bg-[#FFFFFF10] hover:bg-gray-200'
                            }`">
                            <VueUiIcon name="palette" :stroke="isDarkMode ? '#de8b37' : '#1A1A1A'" :size="18" :strokeWidth="1" />
                        {{ translations.menu.customization[store.lang] }}
                    </span>
                </router-link>
                <router-link to="/examples"  @mouseenter="closeDocsMenu">
                    <span :class="`flex flex-row place-items-center gap-1 py-1 px-2 rounded-xl ${isSelected('/examples')
                                ? 'text-black dark:text-[#de6937] hover:cursor-default bg-gray-200 dark:bg-[#242424] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]'
                                : 'text-gray-800 dark:text-[#de6937] dark:hover:bg-[#FFFFFF10] hover:bg-gray-200'
                            }`">
                            <VueUiIcon name="dashboard" :stroke="isDarkMode ? '#de6937' : '#1A1A1A'" :size="18" :strokeWidth="1" />
                        {{ translations.menu.examples[store.lang] }}
                    </span>
                </router-link>
                <router-link data-cy="link-versions" to="/versions"  @mouseenter="closeDocsMenu">
                    <span :class="`py-1 px-2 rounded-xl ${isSelected('/versions')
                                ? 'text-black dark:text-[#CCCCCC] hover:cursor-default bg-gray-200 dark:bg-[#242424] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]'
                                : 'text-gray-800 dark:text-gray-400 dark:hover:bg-[#FFFFFF10] hover:bg-gray-200'
                            }`">
                        {{ translations.menu.versions[store.lang] }}
                    </span>
                </router-link>
                <router-link data-cy="link-about" to="/about"  @mouseenter="closeDocsMenu">
                    <span :class="`py-1 px-2 rounded-xl ${isSelected('/about')
                                ? 'text-black dark:text-[#CCCCCC] hover:cursor-default bg-gray-200 dark:bg-[#242424] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]'
                                : 'text-gray-800 dark:text-gray-400 dark:hover:bg-[#FFFFFF10] hover:bg-gray-200'
                            }`">
                        {{ translations.menu.about[store.lang] }}
                    </span>
                </router-link>
                <button data-cy="btn-mode" @click="changeTheme" id="themeToggle"
                    class="dark:hover:bg-[#fdd66320] hover:bg-[#5f8bee30] hover:text-[#5f8bee] rounded-full p-1 shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
                    <SunFilledIcon v-if="isDarkMode" class="text-[#fdd663]" />
                    <MoonStarsIcon v-else />
                </button>
                <div class="z-10 flex flex-row place-items-center gap-2">
                    <BaseDropdown
                        :options="languageOptions"
                        v-model:value="selectedLanguage"
                        :width="130"
                        basePadding="2px 6px"
                        optionTarget="value"
                        :search="false"
                        id="internationalization"
                    >
                        <template #selected="{ selectedOption }">
                            <div class="flex flex-row gap-2">
                                <LanguageIcon class="text-app-blue" />
                                {{ selectedOption.text }}
                            </div>
                        </template>
                        <template #option="{ option, selected, current }">
                            {{ option.text }}
                        </template>
                    </BaseDropdown>
                </div>
            </nav>

            <div class="relative xl:hidden">
                <button id="mainDropdownButton" v-if="isOpen" @click="useMenu" type="button">
                    <XIcon />
                </button>
                <button id="mainDropdownButton" v-else @click="useMenu" type="button">
                    <Menu2Icon />
                </button>
                <div id="mainDropdown"
                    class="absolute top-full mt-2 right-0 rounded-lg w-[180px] text-right"
                    v-if="isOpen">
                    <BaseCard type="dark">  
                        <ul>
                            <HeaderDropdownItem
                                v-for="item in dropdownItems"
                                v-bind="item"
                                @click="isOpen = false"
                                :clickableWhenActive="item.clickableWhenActive"
                            />
                            <div class="flex w-full justify-end mt-2">
                                <button @click="changeTheme" id="themeToggle"
                                    class="bg-gray-150 dark:bg-[#2A2A2A] hover:bg-gray-100 hover:dark:bg-[#3A3A3A] flex flex-row place-items-center align-center w-fit p-2 rounded-full shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
                                    <SunFilledIcon v-if="store.isDarkMode" class="text-[#fdd663]" />
                                    <MoonStarsIcon v-else />
                                </button>
                            </div>
                            <div class="z-10 flex flex-row place-items-center gap-2 mt-4">
                                <div class="w-fit">
                                    <LanguageIcon class="dark:text-app-green" />
                                </div>
                                <select v-model="selectedLanguage" class="h-[24px] px-2">
                                    <option v-for="option in languageOptions" :value="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                            </div>
                        </ul>
                    </BaseCard>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
#mainDropdown {
    animation: openDD 0.2s ease-in-out forwards;
    transform: scale(1, 0.5);
    transform-origin: top;
}

@keyframes openDD {
    from {
        opacity: 0;
        transform: scale(1, 0.5);
    }

    to {
        transform: scale(1, 1);
        opacity: 1;
    }
}

.link-disabled {
    cursor: default;
}
</style>

<style scoped>
kbd {
    position: absolute;
    background: radial-gradient(at top left, #AAAAAA, #DDDDDD);
    border: 1px solid #808080;
    border-right: 4px solid #606060;
    border-bottom: 4px solid #606060;
    border-radius: 7px;
    color: #000000;
    font-size: 13px;
    font-weight: bold;
    margin: 0;
    padding: 1px 4px;
    min-width: 1.5em;
    text-align: center;
    display: inline-block;
    top: -12px;
    left: -12px;
    box-shadow: 0 6px 12px -6px black;
}
</style>
