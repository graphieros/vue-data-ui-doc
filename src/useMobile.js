import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"

export default function useMobile({
    mobile = 800,
    tablet = 1200
} = {}) {

    const isMobile = ref(window.innerWidth < mobile);
    const isTablet = ref(window.innerWidth >= mobile && window.innerWidth < tablet);
    
    function setBreakpoints(e) {
        isMobile.value = e.target.innerWidth < mobile;
        isTablet.value = e.target.innerWidth >= mobile && e.target.innerWidth < tablet;
    }

    const isDesktop = computed(() => !isMobile.value && !isTablet.value);

    onMounted(() => {
        window.addEventListener('resize', setBreakpoints);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', setBreakpoints);
    });

    return {
        isMobile,
        isTablet,
        isDesktop
    }

}