import { ref, watch } from "vue"

export default function useMobile() {

    const isMobile = ref(false);

    window.addEventListener('resize', (e) => {
        isMobile.value = e.target.innerWidth < 800;
    })

    return {
        isMobile
    }

}