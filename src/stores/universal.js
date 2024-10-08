import { defineStore } from "pinia";

export const useUniversalStore = defineStore('universal', {
    state: () => {
        return {
            translations: {
                features: {
                    en: 'The VueDataUi component will possess all the features of the component it is using: events, slots, exposed methods, themes.',
                    fr: `Le composant VueDataUi possédera toutes les fonctionnalités du composant qu'il utilise : événements, slots, méthodes exposées, thèmes.`,
                    pt: 'O componente VueDataUi possuirá todos os recursos do componente que está utilizando: eventos, slots, métodos expostos, temas.',
                    de: 'Die VueDataUi-Komponente verfügt über alle Funktionen der Komponente, die sie verwendet: Ereignisse, Slots, verfügbar gemachte Methoden, Themen.',
                    zh: 'VueDataUi 组件将拥有它正在使用的组件的所有功能：事件、插槽、公开方法、主题。',
                    jp: 'VueDataUi コンポーネントは、使用しているコンポーネントのすべての機能 (イベント、スロット、公開メソッド、テーマ) を所有します。',
                    es: 'El componente VueDataUi poseerá todas las características del componente que está utilizando: eventos, espacios, métodos expuestos, temas.',
                    ko: 'VueDataUi 구성 요소는 이벤트, 슬롯, 노출된 메서드, 테마 등 사용 중인 구성 요소의 모든 기능을 보유합니다.',
                    ar: 'سيمتلك مكون VueDataUi جميع ميزات المكون الذي يستخدمه: الأحداث، والفتحات، والأساليب المكشوفة، والموضوعات.'
                },
                presentation:  {
                    en: 'If you are using many components from the library, you can choose to import only the universal VueDataUi component. By providing the name of the component you need, its dataset and config props, this wrapper will perform an async import of the requested component.',
                    fr: `Si vous utilisez de nombreux composants de la bibliothèque, vous pouvez choisir d'importer uniquement le composant universel VueDataUi. En fournissant le nom du composant dont vous avez besoin, son ensemble de données et ses accessoires de configuration, ce wrapper effectuera une importation asynchrone du composant demandé.`,
                    pt: 'Se você estiver usando muitos componentes da biblioteca, poderá optar por importar apenas o componente universal VueDataUi. Ao fornecer o nome do componente necessário, seu conjunto de dados e acessórios de configuração, este wrapper realizará uma importação assíncrona do componente solicitado.',
                    de: 'Wenn Sie viele Komponenten aus der Bibliothek verwenden, können Sie wählen, nur die universelle VueDataUi-Komponente zu importieren. Durch die Angabe des Namens der benötigten Komponente, ihres Datensatzes und ihrer Konfigurationseigenschaften führt dieser Wrapper einen asynchronen Import der angeforderten Komponente durch.',
                    zh: '如果您使用库中的许多组件，则可以选择仅导入通用 VueDataUi 组件。通过提供所需组件的名称、其数据集和配置属性，此包装器将执行请求组件的异步导入。',
                    jp: 'ライブラリから多くのコンポーネントを使用している場合は、ユニバーサル VueDataUi コンポーネントのみをインポートすることを選択できます。必要なコンポーネントの名前、そのデータセットおよび構成プロパティを指定すると、このラッパーは要求されたコンポーネントの非同期インポートを実行します。',
                    es: 'Si está utilizando muchos componentes de la biblioteca, puede optar por importar solo el componente universal VueDataUi. Al proporcionar el nombre del componente que necesita, su conjunto de datos y accesorios de configuración, este contenedor realizará una importación asíncrona del componente solicitado.',
                    ko: '라이브러리에서 많은 구성 요소를 사용하는 경우 범용 VueDataUi 구성 요소만 가져오도록 선택할 수 있습니다. 필요한 구성 요소의 이름, 데이터 세트 및 구성 소품을 제공함으로써 이 래퍼는 요청된 구성 요소의 비동기 가져오기를 수행합니다.',
                    ar: 'إذا كنت تستخدم العديد من المكونات من المكتبة، فيمكنك اختيار استيراد مكون VueDataUi العالمي فقط. من خلال توفير اسم المكون الذي تحتاجه ومجموعة البيانات الخاصة به وخصائص التكوين الخاصة به، سيقوم هذا المجمع بإجراء استيراد غير متزامن للمكون المطلوب.'
                }
            }
        }
    }
})