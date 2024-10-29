<script setup>
    import { ref, computed } from "vue";
import { useMainStore } from "../stores";

defineProps({
    /**
     * type - positiveOnly | positiveOrNegativeOnly | both
     */
    type: {
        type: String,
        default: 'positiveOnly' 
    }
})

const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode);

const translations = ref({
    positiveOnly: {
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
    positiveOrNegativeOnly: {
        en: `Dataset accepts either positive values only or negative values only`,
        fr: `Le jeu de données n'accepte que des valeurs positives ou que des valeurs négatives`,
        pt: `O conjunto de dados aceita apenas valores positivos ou apenas valores negativos`,
        de: `Datensatz akzeptiert entweder nur positive oder nur negative Werte`,
        zh: `数据集仅接受正值或仅接受负值`,
        jp: `データセットは正の値のみまたは負の値のみを受け付けます`,
        es: `El conjunto de datos solo acepta valores positivos o solo valores negativos`,
        ko: `데이터 세트는 양수 값만 또는 음수 값만 허용합니다`,
        ar: `يقبل مجموعة البيانات القيم الإيجابية فقط أو القيم السلبية فقط`
    },
    both: {
        en: `Dataset accepts a mix of positive and negative values`,
        fr: `Le jeu de données accepte un mélange de valeurs positives et négatives`,
        pt: `O conjunto de dados aceita uma combinação de valores positivos e negativos`,
        de: `Datensatz akzeptiert eine Mischung aus positiven und negativen Werten`,
        zh: `数据集接受正值和负值的混合`,
        jp: `データセットは正の値と負の値の混合を受け付けます`,
        es: `El conjunto de datos acepta una combinación de valores positivos y negativos`,
        ko: `데이터 세트는 양수와 음수 값을 혼합하여 허용합니다`,
        ar: `يقبل مجموعة البيانات مزيجًا من القيم الإيجابية والسلبية`
    },
})

</script>

<template>
    <div class="rounded flex flex-row gap-2 w-full bg-[#42d39220] p-4 mb-4" v-if="['positiveOnly', 'positiveOrNegativeOnly'].includes(type)">
        <VueUiIcon name="moodWink" stroke="#42d392"/>
        <VueUiIcon name="numbers" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
        <span dir="auto">{{ translations[type][store.lang] }}</span>
    </div>
    <div v-else-if="type === 'both'" class="rounded flex flex-row gap-2 w-full bg-[#42d39220] p-4 mb-4">
        <VueUiIcon name="smiley" stroke="#42d392"/>
        <VueUiIcon name="numbers" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
        <span dir="auto">{{ translations.both[store.lang] }}</span>
    </div>
</template>