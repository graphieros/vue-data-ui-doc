<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const stats = computed(() => {
    return store.ratings.breakdown;
})

const ratings = computed(() => {
    const groups = Object.groupBy(stats.value, ({ item_id }) => item_id );
    return Object.keys(groups).map(component => {
        const raters = groups[component].length;
        return {
            name: component,
            raters,
            average: (groups[component].map(r => r.rating).reduce((a, b) => a + b, 0) / raters) || 0
        }
    })
});

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

</script>

<template>
    <h1 v-if="ratings.length" class="my-6 text-xl">User ratings of individual components</h1>
    <div class="flex flex-row flex-wrap gap-6" v-if="ratings.length">
        <div class="w-[150px]" v-for="c in ratings">
            <VueUiSparkgauge
                :dataset="{
                    value: c.average,
                    min: 1,
                    max: 5,
                    title: `${c.name.split('_').map((w, _i) => {
                        return capitalizeFirstLetter(w)
                    }).join('')} (${c.raters})`
                }"
                :config="{
                    style: {
                        background: 'transparent',
                        basePosition: 64,
                        colors: {
                            min: '#5f8aee',
                            max: '#42d392'
                        },
                        dataLabel: {
                            fontSize: 42,
                            rounding: 1,
                            offsetY: -3
                        },
                        gutter: {
                            color: isDarkMode ? '#3A3A3A' : '#CCCCCC'
                        },
                        title: {
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                        },
                    }
                }"
            />
        </div>
    </div>
</template>