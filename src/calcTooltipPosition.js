import { ref } from "vue";

export function calcTooltipPosition({ tooltip, chart, clientPosition}) {
    const offsetX = ref(36);
    const offsetY = ref(-22);
    return {
        top: clientPosition.y + offsetY.value,
        left: clientPosition.x + offsetX.value
    }
}