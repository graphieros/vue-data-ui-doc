<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    color: {
        type: String,
        default: '#3A3A3A'
    },
    tw: {
        type: String,
        dfault: ''
    }
})

</script>

<template>
    <div :class="tw" style="pointer-events: none;">
        <svg viewBox="0 0 20 58" style="width: 100%; background:transparent;">
<path
  d="M 18 10
     A 1 1 0 0 0 2 10
     L 2 50
     A 1 1 0 0 0 15 50
     L 15 23
     A 1 1 0 0 0 13 23
     L 13 50
     A 1 1 0 0 1 4 50
     L 4 10
     A 1 1 0 0 1 16 10
     L 18 10
     Z"
  :fill="color"
  stroke="none"
  stroke-linecap="round"
/>
        </svg>
    </div>
</template>