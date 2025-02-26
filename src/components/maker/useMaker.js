import { ref, computed } from "vue";

export default function useMaker() {
    const isMobile = computed(() => {
        return window.innerWidth < 800;
    });
    const isFixed = ref(!isMobile.value);
    const step = ref(0);
    const chart = ref(null);

    function fixChart() {
        isFixed.value = !isFixed.value;
        setTimeout(() => {
            step.value += 1;
            if (chart.value) {
                chart.value.$el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest'})
            }
        }, 100);
    }

    return {
        isMobile,
        isFixed,
        step,
        chart,
        fixChart
    }
}