<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const props = defineProps({
    padding: { type: Boolean, default: false },
    debug: { type: Boolean, default: false },
    cssAnimation: { type: Boolean, default: false },
    zoomPreview: { type: Boolean, default: false },
    autoRotate: { type: Boolean, default: false },
    xyTransitions: { type: Boolean, default: false },
    heatmapSize: { type: Boolean, default: false },
})

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);

const config = ref({
    open: false,
    maxHeight: 10000,
    head: {
        useArrowSlot: false,
        backgroundColor: "transparent",
        color: "#2D353C",
        iconColor: "#1d915d",
        padding: "12px 6px",
    },
    body: {
        backgroundColor: "transparent",
        color: "#2D353C",
    },
});

const darkModeConfig = ref({
    open: false,
    maxHeight: 10000,
    head: {
        useArrowSlot: false,
        backgroundColor: "transparent",
        color: "#CCCCCC",
        iconColor: "#42d392",
        padding: "12px 6px",
    },
    body: {
        backgroundColor: "transparent",
        color: "#CCCCCC",
    },
});

/**
    fr: '',
    en: '',
    pt: '',
    de: '',
    zh: '',
    jp: '',
    ko: '',
    ar: '',
    es: ''
 */

const translations = computed(() => {
    return {
        title: {
            en: 'Migration to Vue Data UI version 3',
            fr: 'Migration vers Vue Data UI version 3',
            pt: 'Migração para o Vue Data UI versão 3',
            de: 'Migration auf Vue Data UI Version 3',
            zh: '迁移到 Vue Data UI 版本 3',
            jp: 'Vue Data UI バージョン3への移行',
            ko: 'Vue Data UI 버전 3로 마이그레이션',
            ar: 'الانتقال إلى Vue Data UI الإصدار 3',
            es: 'Migración a Vue Data UI versión 3'
        },
        padding: {
            en: 'Padding configuration was modified, which can result in excessive padding with your old configuration. Using default padding settings is now safe. Also checkout other label offsets that might not be necessary anymore.',
            fr: 'La configuration du padding a été modifiée, ce qui peut entraîner un padding excessif avec votre ancienne configuration. L’utilisation des paramètres de padding par défaut est désormais sûre. Vérifiez également les autres décalages de libellés qui pourraient ne plus être nécessaires.',
            pt: 'A configuração de padding foi modificada, o que pode resultar em padding excessivo com a sua configuração antiga. Agora é seguro usar as configurações de padding padrão. Verifique também outros deslocamentos de rótulos que talvez não sejam mais necessários.',
            de: 'Die Padding-Konfiguration wurde geändert, was bei Ihrer alten Konfiguration zu übermäßigem Padding führen kann. Die Verwendung der Standard-Padding-Einstellungen ist jetzt sicher. Prüfen Sie außerdem andere Beschriftungs-Offsets, die möglicherweise nicht mehr erforderlich sind.',
            zh: '填充（padding）配置已修改，这可能会导致在旧配置下出现过多的填充。现在使用默认的填充设置是安全的。也请检查其他标签偏移量，可能已不再需要。',
            jp: 'パディングの設定が変更され、旧設定のままだと過剰なパディングが発生する可能性があります。デフォルトのパディング設定を使用しても問題ありません。不要になっている可能性のある他のラベルのオフセットも確認してください。',
            ko: '패딩 설정이 변경되어 기존 구성에서는 과도한 패딩이 발생할 수 있습니다. 이제 기본 패딩 설정을 사용해도 안전합니다. 더 이상 필요하지 않을 수 있는 다른 레이블 오프셋도 확인하세요.',
            ar: 'تم تعديل إعدادات الحشو (padding)، مما قد يؤدي إلى حشو مفرط مع الإعدادات القديمة. أصبح استخدام إعدادات الحشو الافتراضية الآن آمنًا. راجع أيضًا إزاحات التسميات الأخرى التي قد لا تكون مطلوبة بعد الآن.',
            es: 'La configuración de padding se ha modificado, lo que puede provocar un padding excesivo con tu configuración anterior. Ahora es seguro usar la configuración de padding predeterminada. Revisa también otros desplazamientos de etiquetas que quizá ya no sean necesarios.'
        },
        debug: {
            fr: 'Activez config.debug pendant le développement pour afficher des avertissements informatifs lorsque les jeux de données sont incomplets ou invalides.',
            en: 'Enable config.debug during development to view information warnings when datasets are incomplete or invalid.',
            pt: 'Ative config.debug durante o desenvolvimento para ver avisos informativos quando os conjuntos de dados estiverem incompletos ou inválidos.',
            de: 'Aktivieren Sie während der Entwicklung config.debug, um informative Warnhinweise anzuzeigen, wenn Datensätze unvollständig oder ungültig sind.',
            zh: '在开发过程中启用 config.debug，当数据集不完整或无效时查看信息性警告。',
            jp: '開発中は config.debug を有効にすると、データセットが不完全または無効な場合に情報的な警告が表示されます。',
            ko: '개발 중에 config.debug을 활성화하면 데이터셋이 불완전하거나 유효하지 않을 때 정보성 경고를 확인할 수 있습니다.',
            ar: 'فعّل ‏config.debug أثناء التطوير لعرض تحذيرات معلوماتية عندما تكون مجموعات البيانات غير مكتملة أو غير صالحة.',
            es: 'Habilita config.debug durante el desarrollo para ver advertencias informativas cuando los conjuntos de datos estén incompletos o no sean válidos.'
        },
        cssAnimation: {
            fr: 'config.useCssAnimation est désormais défini sur false par défaut',
            en: 'config.useCssAnimation is now set to false by default',
            pt: 'config.useCssAnimation agora está definido como false por padrão',
            de: 'config.useCssAnimation ist jetzt standardmäßig auf false gesetzt',
            zh: 'config.useCssAnimation 现在默认设置为 false',
            jp: 'config.useCssAnimation はデフォルトで false に設定されるようになりました',
            ko: '이제 config.useCssAnimation은 기본적으로 false로 설정됩니다',
            ar: 'تم تعيين config.useCssAnimation الآن إلى false افتراضيًا',
            es: 'config.useCssAnimation ahora está establecido en false de forma predeterminada'
        },
        zoomPreview: {
            fr: 'La nouvelle fonctionnalité d’aperçu du zoom est activée par défaut. Définissez config.chart.zoom.preview.enable sur false pour rétablir le comportement précédent.',
            en: 'The new zoom preview functionality is enabled by default. Set config.chart.zoom.preview.enable to false to restore the previous behavior.',
            pt: 'A nova funcionalidade de pré-visualização de zoom está ativada por padrão. Defina config.chart.zoom.preview.enable como false para restaurar o comportamento anterior.',
            de: 'Die neue Zoom-Vorschau-Funktion ist standardmäßig aktiviert. Setzen Sie config.chart.zoom.preview.enable auf false, um das vorherige Verhalten wiederherzustellen.',
            zh: '新的缩放预览功能默认启用。将 config.chart.zoom.preview.enable 设置为 false 以恢复先前的行为。',
            jp: '新しいズームプレビュー機能はデフォルトで有効になっています。以前の挙動に戻すには、config.chart.zoom.preview.enable を false に設定してください。',
            ko: '새로운 줌 미리보기 기능은 기본적으로 활성화되어 있습니다. 이전 동작으로 복원하려면 config.chart.zoom.preview.enable 값을 false로 설정하세요.',
            ar: 'ميزة معاينة التكبير الجديدة مُفعّلة افتراضيًا. لإعادة السلوك السابق، عيّن ‎config.chart.zoom.preview.enable‎ إلى ‎false‎.',
            es: 'La nueva función de vista previa de zoom está habilitada de forma predeterminada. Establece config.chart.zoom.preview.enable en false para restaurar el comportamiento anterior.'
        },
        autoRotate: {
            fr: 'Certaines étiquettes pivotent désormais automatiquement lorsqu’elles entrent en collision. Dans les configurations de libellés, définissez autoRotate.enable sur false pour rétablir l’ancien comportement. Vous pouvez également y définir l’angle de rotation automatique.',
            en: 'Some labels now auto rotate when they collide. In label configs, set autoRotate.enable to false to restore previous behavor. You can also set the auto rotation angle there.',
            pt: 'Alguns rótulos agora giram automaticamente quando entram em colisão. Nas configurações de rótulo, defina autoRotate.enable como false para restaurar o comportamento anterior. Você também pode definir ali o ângulo de rotação automática.',
            de: 'Einige Beschriftungen drehen sich nun automatisch, wenn sie kollidieren. In den Label-Konfigurationen setzen Sie autoRotate.enable auf false, um das frühere Verhalten wiederherzustellen. Dort können Sie auch den Winkel der automatischen Rotation festlegen.',
            zh: '某些标签在发生碰撞时现在会自动旋转。在标签配置中，将 autoRotate.enable 设置为 false 可恢复之前的行为。您也可以在那里设置自动旋转的角度。',
            jp: '一部のラベルは衝突時に自動回転するようになりました。ラベル設定で autoRotate.enable を false にすると、以前の挙動に戻せます。自動回転の角度もそこで設定できます。',
            ko: '일부 레이블은 충돌할 때 이제 자동으로 회전합니다. 레이블 설정에서 autoRotate.enable을 false로 설정하면 이전 동작으로 복원됩니다. 그곳에서 자동 회전 각도도 설정할 수 있습니다.',
            ar: 'تدور بعض التسميات تلقائيًا الآن عند تصادمها. في إعدادات التسميات، عيّن ‎autoRotate.enable‎ إلى ‎false‎ لاستعادة السلوك السابق. يمكنك أيضًا تحديد زاوية الدوران التلقائي هناك.',
            es: 'Algunas etiquetas ahora giran automáticamente cuando colisionan. En la configuración de etiquetas, establece autoRotate.enable en false para recuperar el comportamiento anterior. Allí también puedes definir el ángulo de rotación automática.'
        },
        xyTransitions: {
            fr: 'Désactivez les transitions CSS par type de série. Dans config.line.showTransition, config.bar.showTransition et config.plot.showTransition, définissez sur false pour désactiver les transitions CSS.',
            en: 'Disable css transitions per serie type. In config.line.showTransition, config.bar.showTransition and config.plot.showTransition, set to false to unset css transitions.',
            pt: 'Desative as transições CSS por tipo de série. Em config.line.showTransition, config.bar.showTransition e config.plot.showTransition, defina como false para desativar as transições CSS.',
            de: 'CSS-Übergänge pro Serientyp deaktivieren. In config.line.showTransition, config.bar.showTransition und config.plot.showTransition auf false setzen, um CSS-Übergänge zu deaktivieren.',
            zh: '按系列类型禁用 CSS 过渡。在 config.line.showTransition、config.bar.showTransition 和 config.plot.showTransition 中，将其设置为 false 以取消 CSS 过渡。',
            jp: 'シリーズタイプごとに CSS トランジションを無効化します。config.line.showTransition、config.bar.showTransition、config.plot.showTransition で false に設定すると、CSS トランジションが無効になります。',
            ko: '시리즈 유형별로 CSS 전환을 비활성화합니다. config.line.showTransition, config.bar.showTransition, config.plot.showTransition에서 false로 설정하면 CSS 전환이 비활성화됩니다.',
            ar: 'تعطيل انتقالات CSS لكل نوع سلسلة. في ‎config.line.showTransition‎ و‎config.bar.showTransition‎ و‎config.plot.showTransition‎، عيّن القيمة إلى ‎false‎ لتعطيل انتقالات CSS.',
            es: 'Desactiva las transiciones CSS por tipo de serie. En config.line.showTransition, config.bar.showTransition y config.plot.showTransition, establece false para desactivar las transiciones CSS.'
        },
        heatmapSize: {
            fr: 'Ajustez les nouveaux attributs config.style.layout.width et config.style.layout.height pour obtenir l’échelle des cellules de la heatmap souhaitée.',
            en: 'Tweak the new config.style.layout.width and config.style.layout.height attributes to reach your desired heatmap cell scale.',
            pt: 'Ajuste os novos atributos config.style.layout.width e config.style.layout.height para alcançar a escala de células do mapa de calor desejada.',
            de: 'Passen Sie die neuen Attribute config.style.layout.width und config.style.layout.height an, um die gewünschte Skalierung der Heatmap-Zellen zu erreichen.',
            zh: '调整新的 config.style.layout.width 和 config.style.layout.height 属性，以达到所需的热力图单元格缩放比例。',
            jp: '目的のヒートマップのセルスケールに合わせるため、config.style.layout.width と config.style.layout.height の新しい属性を調整してください。',
            ko: '원하는 히트맵 셀 스케일에 맞추기 위해 새 속성인 config.style.layout.width와 config.style.layout.height를 조정하세요.',
            ar: 'اضبط السمتين الجديدتين ‎config.style.layout.width‎ و‎config.style.layout.height‎ للوصول إلى مقياس خلايا الخريطة الحرارية المطلوب.',
            es: 'Ajusta los nuevos atributos config.style.layout.width y config.style.layout.height para alcanzar la escala de celdas del mapa de calor deseada.'
        }
    }
})


</script>

<template>
    <div class="w-full rounded-xl my-6 relative overflow-x-auto dark:bg-[#42d39210] bg-gradient-to-br from-transparent to-[#42d39240] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] px-4">
        <VueDataUi component="VueUiAccordion" :config="isDarkMode ? darkModeConfig : config">
            <template #title="{ color }">
                <div class="flex flex-row place-items-center gap-2">
                    <VueUiIcon name="circleExclamation" :stroke="!isDarkMode ? '#1d915d' : '#42d392'"/>
                    {{ translations.title[store.lang] }}
                </div>
            </template>
            <template #content>
                <div class="w-full p-4 text-black dark:text-white">
                    <ul>
                        <li class="border-l-2 border-app-green pl-4 mb-4" v-if="padding">{{ translations.padding[store.lang] }}</li>
                        <li class="border-l-2 border-app-green pl-4 mb-4" v-if="debug">{{ translations.debug[store.lang] }}</li>
                        <li class="border-l-2 border-app-green pl-4 mb-4" v-if="cssAnimation">{{ translations.cssAnimation[store.lang] }}</li>
                        <li class="border-l-2 border-app-green pl-4 mb-4" v-if="zoomPreview">{{ translations.zoomPreview[store.lang] }}</li>
                        <li class="border-l-2 border-app-green pl-4 mb-4" v-if="autoRotate">{{ translations.autoRotate[store.lang] }}</li>
                        <li class="border-l-2 border-app-green pl-4 mb-4" v-if="xyTransitions">{{ translations.xyTransitions[store.lang] }}</li>
                        <li class="border-l-2 border-app-green pl-4 mb-4" v-if="heatmapSize">{{ translations.heatmapSize[store.lang] }}</li>
                        <slot/>
                    </ul>
                </div>
            </template>
        </VueDataUi>
    </div>
</template>