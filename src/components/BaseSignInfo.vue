<script setup>
    import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore()

const isDarkMode = computed(() => store.isDarkMode);

const translations = ref({
    positive: {
        en: `Dataset accepts positive values only`,
        fr: `Le jeu de données n'accepte que des valeurs positives`,
        pt: `O conjunto de dados aceita apenas valores positivos`,
        de: `Datensatz akzeptiert nur positive Werte`,
        zh: `数据集仅接受正值`,
        jp: `データセットは正の値のみを受け付けます`,
        es: `El conjunto de datos solo acepta valores positivos`,
        ko: `데이터 세트는 양수 값만 허용합니다`,
        ar: `يقبل مجموعة البيانات القيم الإيجابية فقط`
    },
})

</script>

<template>
    <div class="flex flex-row gap-2 w-full bg-[#ff660020] p-4 mb-4">
        <VueUiIcon name="circleExclamation" stroke="#ff6600"/>
        <VueUiIcon name="numbers" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
        <span dir="auto">{{ translations.positive[store.lang] }}</span>
    </div>
</template>