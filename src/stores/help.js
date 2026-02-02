import { defineStore } from "pinia";

export const useHelpStore = defineStore('help', {
    state: () => {
        return {
            title: {
                en: "HELP CENTER",
                fr: "CENTRE D'AIDE",
                pt: "CENTRO DE AJUDA",
                de: "HILFEZENTRUM",
                zh: "帮助中心",
                ja: "ヘルプセンター",
                es: "CENTRO DE AYUDA",
                ko: "지원 센터",
                ar: 'مركز المساعدة'
            }
        }
    }
})
