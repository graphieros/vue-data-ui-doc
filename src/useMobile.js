import { ref, watch } from "vue"

export default function useMobile() {

    const isMobile = ref(window.innerWidth < 800);

    window.addEventListener('resize', (e) => {
        isMobile.value = e.target.innerWidth < 800;
    })

    return {
        isMobile
    }

}