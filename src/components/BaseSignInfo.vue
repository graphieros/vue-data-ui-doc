<script setup>
    import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import BaseCard from "./BaseCard.vue";
import { AmpersandIcon, MinusVerticalIcon, SquareRoundedMinusIcon, SquareRoundedPlusFilledIcon, SquareRoundedPlusIcon } from "vue-tabler-icons";

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
    <BaseCard class="flex flex-row gap-2 mb-2 w-fit mx-auto flex-wrap justify-center align-center place-items-center" v-if="['positiveOnly', 'positiveOrNegativeOnly', 'both'].includes(type)">
        <BaseCard>
            <div class="flex flex-row flex-nowrap">
                <template v-if="type === 'both'">
                    <SquareRoundedPlusIcon color="#42d392"/>
                    <AmpersandIcon/>
                    <SquareRoundedMinusIcon color="#ff6600"/>
                </template>
                <template v-if="type === 'positiveOnly'">
                    <SquareRoundedPlusIcon color="#42d392"/>
                </template>
                <template v-if="type === 'positiveOrNegativeOnly'">
                    <SquareRoundedPlusIcon color="#42d392"/>
                    <MinusVerticalIcon/>
                    <SquareRoundedMinusIcon color="#ff6600"/>
                </template>
            </div>
        </BaseCard>
        <span dir="auto">{{ translations[type][store.lang] }}</span>
    </BaseCard>
</template>

<style scoped>
.shadowed {
    box-shadow: 0 6px 12px -6px rgba(0,0,0,0.3);
}
</style>