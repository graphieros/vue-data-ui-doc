<script setup>
import { ref, computed, shallowRef } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const description = shallowRef({
  en: '<span class="font-inter-bold">AgentScan</span> uses Vue Data UI to visualize GitHub automation trends and activity patterns.',
  fr: '<span class="font-inter-bold">AgentScan</span> utilise Vue Data UI pour visualiser les tendances d’automatisation et les modèles d’activité sur GitHub.',
  pt: '<span class="font-inter-bold">AgentScan</span> utiliza o Vue Data UI para visualizar tendências de automação e padrões de atividade no GitHub.',
  de: '<span class="font-inter-bold">AgentScan</span> verwendet Vue Data UI, um Automatisierungstrends und Aktivitätsmuster auf GitHub zu visualisieren.',
  zh: '<span class="font-inter-bold">AgentScan</span> 使用 Vue Data UI 来可视化 GitHub 上的自动化趋势和活动模式。',
  ja: '<span class="font-inter-bold">AgentScan</span> は Vue Data UI を使用して、GitHub 上の自動化トレンドや活動パターンを可視化します。',
  es: '<span class="font-inter-bold">AgentScan</span> utiliza Vue Data UI para visualizar tendencias de automatización y patrones de actividad en GitHub.',
  ko: '<span class="font-inter-bold">AgentScan</span>은 Vue Data UI를 사용하여 GitHub의 자동화 동향과 활동 패턴을 시각화합니다.',
  ar: '<span class="font-inter-bold">AgentScan</span> يستخدم Vue Data UI لعرض اتجاهات الأتمتة وأنماط النشاط على GitHub بشكل مرئي.'
});

const placeholder = shallowRef({
  en: 'Enter your GitHub username',
  fr: 'Saisissez votre nom d’utilisateur GitHub',
  pt: 'Digite seu nome de usuário do GitHub',
  de: 'Gib deinen GitHub-Benutzernamen ein',
  zh: '输入你的 GitHub 用户名',
  ja: 'GitHubユーザー名を入力してください',
  es: 'Introduce tu nombre de usuario de GitHub',
  ko: 'GitHub 사용자 이름을 입력하세요',
  ar: 'أدخل اسم مستخدم GitHub الخاص بك'
})

const username = ref("");

function goToProfile() {
  const value = username.value.trim();

  if (!value) return;

  window.open(`https://agentscan.tools/user/${encodeURIComponent(value)}`, "_blank");
}


</script>

<template>
    <div class="ml-12 sm:mx-auto max-w-[1000px] px-12 sm:px-20" dir="auto">
      <a href="https://agentscan.tools/" target="_blank">
            <div
                class="mt-8 w-full max-w-[800px] text-[18px] pl-4 mb-4 text-[#4A4A4A] dark:text-[#CCCCCC] flex flex-row gap-4 place-items-center"
            >
                <div class="w-[24px] h-[24px]">
                    <VueUiIcon
                        name="externalLink"
                        :stroke="isDarkMode ? '#6A6A6A' : '#8A8A8A'"
                    />
                </div>
                <span v-html="description[store.lang]"></span>
            </div>
        </a>

        <div class="bg-gray-100 dark:bg-[#0B0B0B] pt-6 pb-0 px-12 font-[Roboto] w-full">
            <div class="flex flex-col gap-2 items-center">
              <a href="https://agentscan.tools/" target="_blank">
                <div class="flex flex-row gap-2 justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M21 29H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16v2H5v22h16Z"></path><path fill="currentColor" d="M15 9h2v14h-2zm12 0h2v14h-2zm-6 0h2v14h-2z"></path></svg>
                  <span class="text-2xl font-bold text-[#222222] dark:text-[#F0F0F0]">
                    AgentScan
                  </span>
                </div>
                <span class="text-[#57606a] dark:text-[#808080] font-[OpenSans]">An open experiment in detecting automation patterns on GitHub</span>
              </a>

             <div
                class="github-input-wrapper my-4 font-[OpenSans] w-full h-[48px] rounded-full border border-[#3A3A3A] flex items-center pl-4 pr-6"
              >
                <input
                  v-model="username"
                  type="text"
                  :placeholder="placeholder[store.lang]"
                  class="github-input flex-1 bg-transparent border-none outline-none placeholder:text-[#57606a] dark:placeholder:text-[#808080]"
                  @keyup.enter="goToProfile"
                />

                <button @click="username = ''" v-if="!!username" class="ml-4 text-white cursor-pointer bg-transparent border-none outline-none">
                  <VueUiIcon name="close" :stroke="isDarkMode ? '#F0F0F0' : '#222222'"/>
                </button>

                <button
                  type="button"
                  class="ml-4 text-white cursor-pointer bg-transparent border-none outline-none"
                  @click="goToProfile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    :stroke="isDarkMode ? '#F0F0F0' : '#222222'"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>
            </div>
            <span class="text-transparent select-none">
              __________________________________________________________________________________________________________
            </span>
        </div>
    </div>
</template>

<style scoped>
input {
  outline: none !important;
  border: none !important;
  background: transparent !important;
}
.github-input {
    outline: none !important;
    box-shadow: none !important;
}

.github-input:focus,
.github-input:hover,
.github-input:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
}

.github-input-wrapper:focus-within {
    background-color: rgba(0, 0, 0, 0.03);
}

.dark .github-input-wrapper:focus-within {
    background-color: rgba(255, 255, 255, 0.03);
}
</style>