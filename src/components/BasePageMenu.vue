<script setup>
import { ref, computed } from "vue";
import BaseCard from "./BaseCard.vue";

const props = defineProps({
    items: {
        type: Array,
        default() {
            return []
        }
    }
});

</script>

<template>
    <BaseCard>
        <div class="flex flex-row flex-wrap gap-4 items-center justify-center">
            <template v-for="(item, index) in items" :key="item?.id ?? index">
                <slot name="item" :item="item" :index="index" />
            </template>
        </div>
    </BaseCard>
</template>