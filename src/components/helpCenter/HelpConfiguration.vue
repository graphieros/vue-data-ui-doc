<script setup>
import { ref } from "vue";
import { useMainStore } from '../../stores';
import HelpUnit from './HelpUnit.vue';

const store = useMainStore()

const title = ref({
    en: "Components configuration",
    fr: "Configuration des composants",
    pt: "Configuração de componentes",
    de: "Komponentenkonfiguration",
    zh: "组件配置",
    ja: "コンポーネント構成",
    es: "Configuración de componentes",
    ko: "구성 요소 구성",
    ar: 'تكوين المكونات'
})

const content = ref({
    en: "The 'config' prop is optional. When it is not used, the default configuration will be applied. When using the 'config' prop, you can only specify the attributes you need, all the rest will still be using defaults.",
    fr: "L'accessoire 'config' est facultatif. Lorsqu'il n'est pas utilisé, la configuration par défaut sera appliquée. Lorsque vous utilisez la prop 'config', vous ne pouvez spécifier que les attributs dont vous avez besoin, tout le reste utilisera toujours les valeurs par défaut.",
    pt: "A propriedade 'config' é opcional. Quando não for utilizado, a configuração padrão será aplicada. Ao usar a propriedade 'config', você só pode especificar os atributos necessários, todo o resto ainda estará usando os padrões.",
    de: "Die Requisite „config“ ist optional. Wenn es nicht verwendet wird, wird die Standardkonfiguration angewendet. Wenn Sie die Requisite „config“ verwenden, können Sie nur die Attribute angeben, die Sie benötigen, für den Rest werden weiterhin Standardeinstellungen verwendet.",
    zh: "'config' 属性是可选的。当不使用时，将应用默认配置。使用 'config' 属性时，您只能指定您需要的属性，其余属性仍将使用默认值。",
    ja: "「config」プロパティはオプションです。使用しない場合はデフォルトの設定が適用されます。 「config」プロパティを使用する場合、必要な属性のみを指定でき、残りはすべてデフォルトを使用します。",
    es: "La propiedad 'config' es opcional. Cuando no se utilice, se aplicará la configuración predeterminada. Al usar la propiedad 'config', solo puede especificar los atributos que necesita, el resto seguirá usando los valores predeterminados.",
    ko: "'config' 소품은 선택 사항입니다. 사용하지 않을 경우 기본 구성이 적용됩니다. 'config' 속성을 사용할 때 필요한 속성만 지정할 수 있으며 나머지는 여전히 기본값을 사용합니다.",
    ar: `تعتبر خاصية "config" اختيارية. عندما لا يتم استخدامه، سيتم تطبيق التكوين الافتراضي. عند استخدام الخاصية 'config'، يمكنك فقط تحديد السمات التي تحتاجها، بينما ستظل بقية السمات تستخدم الإعدادات الافتراضية.`
})

</script>

<template>
    <HelpUnit
        :title="title[store.lang]"
    >
        <template #content>
            <div class="flex flex-row place-items-center w-full px-[11px] gap-4" dir="auto">
                <div class="w-[40px]">
                    <VueUiIcon name="circleFill" stroke="#ff6400" :size="14"/>
                </div>
                <div>
                    {{ content[store.lang] }}
                </div>
            </div>
        </template>
    </HelpUnit>
</template>
