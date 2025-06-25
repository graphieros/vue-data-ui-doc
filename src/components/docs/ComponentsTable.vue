<script setup>
import { computed } from "vue";
import { useFeatures } from "../../useFeatures";

const props = defineProps({
    cols: {
        type: Array,
        default() {
            return [
                'icon',
                'name'
            ]
        }
    }
})

const { components, keys } = useFeatures();

</script>

<template>
    <table class="table-auto border-collapse border border-slate-500 my-4">
        <thead>
            <tr class="bg-[#FFFFFF80] dark:bg-[#FFFFFF05]">
                <th
                    class="border border-slate-600 p-2"
                    v-for="col in cols"
                    :key="col"
                >
                    <slot name="th" v-bind="{ col }" />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                class="bg-[#FFFFFF60] dark:bg-[#FFFFFF10]"
                v-for="(row, i) in components"
                :key="i"
            >
                <td
                    v-for="col in cols"
                    :key="col"
                    class="p-2 border border-slate-600"
                >
                    <slot :name="col" v-bind="{ value: row[col], row }" />
                </td>
            </tr>
        </tbody>
    </table>
</template>
