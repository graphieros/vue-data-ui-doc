import { computed, onBeforeUnmount, onMounted, ref } from "vue";

// Components using the same breakpoints share one resize listener and reactive state.
const breakpoints = new Map();
export default function useMobile({ mobile = 800, tablet = 1200 } = {}) {
    const key = `${mobile}:${tablet}`;
    if (!breakpoints.has(key)) {
        const isMobile = ref(false);
        const isTablet = ref(false);
        const state = {
            isMobile,
            isTablet,
            isDesktop: computed(() => !isMobile.value && !isTablet.value),
            consumers: 0,
            update() {
                const width =
                    typeof window === "undefined" ? tablet : window.innerWidth;
                isMobile.value = width < mobile;
                isTablet.value = width >= mobile && width < tablet;
            },
        };
        breakpoints.set(key, state);
    }
    const state = breakpoints.get(key);
    state.update();
    onMounted(() => {
        if (state.consumers++ === 0)
            window.addEventListener("resize", state.update, { passive: true });
    });
    onBeforeUnmount(() => {
        if (--state.consumers === 0)
            window.removeEventListener("resize", state.update);
    });
    return {
        isMobile: state.isMobile,
        isTablet: state.isTablet,
        isDesktop: state.isDesktop,
    };
}
