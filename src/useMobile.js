import { ref, watch } from "vue"

export default function useMobile() {

    const isMobile = ref(window.innerWidth < 800);
    const isTablet = ref(window.innerWidth >= 800 && window.innerWidth < 1200);

    window.addEventListener('resize', (e) => {
        isMobile.value = e.target.innerWidth < 800;
        isTablet.value = e.target.innerWidth >= 800 && e.target.innerWidth < 1200;
    })

    return {
        isMobile,
        isTablet
    }

}