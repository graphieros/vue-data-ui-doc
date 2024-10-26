import { ref, watch } from "vue"

export function useConfigCode() {
    const configCode = ref(null)
    const showAllConfig = ref(false);

    watch(() => showAllConfig.value, (v) => {
        if (v) {
            Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
        } else {
            Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
                if (d.hasAttribute('open')) {
                    d.removeAttribute('open')
                }
            })
        }
    })

    return { configCode, showAllConfig }
}