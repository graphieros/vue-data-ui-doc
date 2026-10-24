import { useMainStore } from './stores';
import { getAttributeTranslation } from './i18n/attribute-translations.js';

export default function useAttrMapping(attribute) {
    const store = useMainStore();
    return getAttributeTranslation(attribute, store.lang);
}
