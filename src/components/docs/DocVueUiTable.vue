<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiTableConfigFields from "./configuration/VueUiTableConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon, InfoCircleIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const tableKey = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            tableKey.value += 1;
        });
    },
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const body = computed(() => {
    const categories = ["Accueil", "Magasin", "Caisse", "SAV"];
    const itemNames = [
        "Qualité du service",
        "Rapidité de livraison",
        "Efficacité du personnel",
        "Variété des produits",
        "Propreté des lieux",
        "Réactivité du support",
        "Prix compétitifs",
        "Expérience utilisateur",
        "Fiabilité du matériel",
    ];

    function generateRandomData() {
        const items = [];

        for (let i = 0; i < 500; i += 1) {
            const itemName = getRandomItemName();
            const category = getRandomCategory();
            let accueil = Math.random() * 100;
            const date = getRandomDate();
            const data = [
                itemName,
                category,
                date,
                accueil,
                Number((Math.random() * 5).toFixed(1)),
                Math.random() * 200,
                "",
                Math.random() * (Math.random() > 0.5 ? 150 : -30),
                Math.random() * 350,
            ];
            items.push({ td: data });
        }
        return items;
    }

    function getRandomItemName() {
        const randomIndex = Math.floor(Math.random() * itemNames.length);
        return itemNames[randomIndex];
    }

    function getRandomCategory() {
        const randomIndex = Math.floor(Math.random() * categories.length);
        return categories[randomIndex];
    }

    function getRandomDate() {
        const start = new Date(2023, 0, 1).getTime();
        const end = new Date(2023, 11, 31).getTime();
        const randomTime = Math.random() * (end - start) + start;
        const randomDate = new Date(randomTime);
        const formattedDate = randomDate.toISOString().split("T")[0];
        return formattedDate;
    }
    return generateRandomData();
});

const dataset = ref({
    header: [
        {
            name: "touchpoint",
            type: "text",
            average: false,
            decimals: undefined,
            sum: false,
            isSort: true,
            isSearch: true,
            isMultiselect: true,
            isPercentage: false,
            percentageTo: undefined,
            suffix: "",
            prefix: "",
            rangeFilter: false,
        },
        {
            name: "category",
            type: "text",
            average: false,
            decimals: undefined,
            sum: false,
            isSort: false,
            isSearch: false,
            isMultiselect: true,
            isPercentage: false,
            percentageTo: undefined,
            suffix: "",
            prefix: "",
            rangeFilter: false,
        },
        {
            name: "date",
            type: "date",
            average: false,
            decimals: undefined,
            sum: false,
            isSort: true,
            isSearch: false,
            isMultiselect: false,
            isPercentage: false,
            percentageTo: undefined,
            suffix: "",
            prefix: "",
            rangeFilter: false,
        },
        {
            name: "base",
            type: "numeric",
            average: true,
            decimals: 0,
            sum: true,
            isSort: true,
            isSearch: false,
            isMultiselect: false,
            isPercentage: false,
            percentageTo: undefined,
            suffix: "",
            prefix: "",
            rangeFilter: false,
        },
        {
            name: "rating",
            type: "numeric",
            decimals: 1,
            average: true,
            sum: false,
            isSort: true,
            isSearch: false,
            isMultiselect: false,
            isPercentage: false,
            percentageTo: undefined,
            suffix: "",
            prefix: "",
            rangeFilter: true,
        },
        {
            name: "spend",
            type: "numeric",
            decimals: 1,
            average: true,
            sum: true,
            isSort: true,
            isSearch: false,
            isMultiselect: false,
            isPercentage: false,
            percentageTo: undefined,
            suffix: "€",
            prefix: "",
            rangeFilter: true,
        },
        {
            name: "percentage",
            type: "numeric",
            decimals: 1,
            average: false,
            sum: false,
            isSort: true,
            isSearch: false,
            isMultiselect: false,
            isPercentage: true, // requires an empty slot in the body td arrays!
            percentageTo: "base",
            suffix: "",
            prefix: "",
            rangeFilter: false,
        },
        {
            name: "happy",
            type: "numeric",
            decimals: 0,
            average: true,
            sum: true,
            isSort: true,
            isSearch: false,
            isMultiselect: false,
            isPercentage: false,
            percentageTo: "base",
            suffix: "",
            prefix: "",
            rangeFilter: false,
        },
        {
            name: "sad",
            type: "numeric",
            decimals: 0,
            average: true,
            sum: true,
            isSort: true,
            isSearch: false,
            isMultiselect: false,
            isPercentage: false,
            percentageTo: "base",
            suffix: "",
            prefix: "",
            rangeFilter: false,
        },
    ],
    body: body,
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            fontFamily: "inherit",
            maxHeight: 700,
            rowsPerPage: 25,
            style: {
                title: {
                    text: "Title",
                    color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
                    fontSize: 20,
                    bold: true,
                    textAlign: "left",
                    paddingLeft: 48,
                    paddingRight: 0,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    subtitle: {
                        color: isDarkMode.value ? "#CCCCCC" : "#565656",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false,
                    },
                },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#c4c9cc" : "#1A1A1A",
                    outline: isDarkMode.value
                        ? "1px solid #7b8185"
                        : "1px solid #C4C4C4",
                    selected: { backgroundColor: "#42d392", color: "#1a1a1a" },
                    buttons: {
                        filter: {
                            active: {
                                backgroundColor: "#5f8aee",
                                color: isDarkMode.value ? "#2A2A2A" : "#1A1A1A",
                            },
                            inactive: {
                                backgroundColor: isDarkMode.value
                                    ? "#3A3A3A"
                                    : "#E1E5E8",
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            },
                        },
                        cancel: {
                            active: {
                                backgroundColor: "#ff6600",
                                color: isDarkMode.value ? "#3A3A3A" : "#1A1A1A",
                            },
                            inactive: {
                                backgroundColor: isDarkMode.value
                                    ? "#3A3A3A"
                                    : "#E1E5E8",
                                color: isDarkMode.value ? "#5A5A5A" : "#8A8A8A",
                            },
                        },
                    },
                },
                rows: {
                    outline: isDarkMode.value
                        ? "1px solid #4A4A4A"
                        : "1px solid #FFFFFF",
                    even: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#c4c9cc" : "#1A1A1A",
                        selectedCell: {
                            backgroundColor: isDarkMode.value
                                ? "#42d392"
                                : "#5de8aa",
                            color: "#2D353C",
                        },
                        selectedNeighbors: {
                            backgroundColor: isDarkMode.value
                                ? "#075e37"
                                : "#b2d4c4",
                            color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                        },
                    },
                    odd: {
                        backgroundColor: isDarkMode.value
                            ? "#3A3A3A"
                            : "#e1e5e8",
                        color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                        selectedCell: {
                            backgroundColor: isDarkMode.value
                                ? "#5de8aa"
                                : "#42d392",
                            color: "#2D353C",
                        },
                        selectedNeighbors: {
                            backgroundColor: isDarkMode.value
                                ? "#0c7a49"
                                : "#9cbaac",
                            color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                        },
                    },
                },
                inputs: {
                    backgroundColor: "#FFFFFF",
                    color: isDarkMode.value ? "#2D353C" : "#1A1A1A",
                    border: isDarkMode.value
                        ? "1px solid #CCCCCC"
                        : "1px solid #C4C4C4",
                    accentColor: "#42d392",
                },
                dropdowns: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    color: isDarkMode.value ? "#c4c9cc" : "#1A1A1A",
                    icons: {
                        selected: { color: "#42d392", unicode: "✔" },
                        unselected: { color: "#ff6400", unicode: "✖" },
                    },
                },
                infoBar: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#e1e5e8",
                    color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                },
                pagination: {
                    buttons: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#e1e5e8",
                        color: isDarkMode.value ? "#E1E5E8" : "#1A1A1A",
                        opacityDisabled: 0.3,
                    },
                    navigationIndicator: { backgroundColor: "#42d392" },
                },
                exportMenu: {
                    show: true,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    color: isDarkMode.value ? "#E1E5E8" : "#1A1A1A",
                    buttons: {
                        backgroundColor: isDarkMode.value
                            ? "#42d392"
                            : "#e1e5e8",
                        color: "#2D353C",
                    },
                    filename: "",
                },
                closeButtons: {
                    backgroundColor: "transparent",
                    color: "#ff6400",
                    borderRadius: "50%",
                },
                chart: {
                    modal: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#FFFFFF",
                        color: isDarkMode.value ? "#E1E5E8" : "#1A1A1A",
                        buttons: {
                            selected: {
                                backgroundColor: "#42d392",
                                color: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                            },
                            unselected: {
                                backgroundColor: isDarkMode.value
                                    ? "#2A2A2A"
                                    : "#e1e5e8",
                                color: isDarkMode.value ? "#E1E5E8" : "#1A1A1A",
                            },
                        },
                    },
                    layout: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#FFFFFF",
                        axis: { stroke: "#ccd1d4", strokeWidth: 2 },
                        bar: {
                            fill: "#42d392",
                            stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                        },
                        line: {
                            smooth: true,
                            useArea: false,
                            stroke: "#42d392",
                            strokeWidth: 4,
                            plot: {
                                fill: "#5fe3a8",
                                stroke: "#FFFFFF",
                                strokeWidth: 1,
                                radius: { selected: 6, unselected: 4 },
                            },
                            selector: {
                                stroke: "#ff6400",
                                strokeWidth: 1,
                                strokeDasharray: 5,
                            },
                        },
                        labels: {
                            color: isDarkMode.value ? "#ccd1d4" : "#1A1A1A",
                        },
                        progression: {
                            stroke: isDarkMode.value ? "#FFFFFF" : "#565656",
                            strokeWidth: 2,
                            strokeDasharray: 4,
                            arrowSize: 7,
                        },
                        timeLabels: { showOnlyAtModulo: true, modulo: 12 },
                        datetimeFormatter: {
                            enable: true,
                            locale: "en",
                            useUTC: false,
                            januaryAsYear: false,
                            options: {
                                year: "yyyy",
                                month: `MMM 'yy`,
                                day: "dd MMM",
                                hour: "HH:mm",
                                minute: "HH:mm:ss",
                                second: "HH:mm:ss",
                            },
                        },
                        zoom: { show: true, autoFit: true },
                    },
                },
            },
            translations: {
                average: "Average",
                by: "by",
                chooseCategoryColumn: "Choose category column",
                exportAllButton: "CSV all",
                exportAllLabel:
                    "Export all rows of your current filtered dataset",
                exportPageButton: "CSV page",
                exportPageLabel: "Export rows of the current page",
                from: "From",
                inputPlaceholder: "Search...",
                makeDonut: "Generate",
                nb: "Nb",
                page: "Page",
                paginatorLabel: "Rows per page",
                sizeWarning:
                    "Displaying too many rows at a time can lead to slower performance",
                sum: "Sum",
                to: "To",
                total: "Total",
                totalRows: "Total rows",
                xAxisLabels: "X axis labels",
                filename: isDarkMode.value ? "File name" : undefined,
            },
            useChart: true,
        }),
    set: configState.set,
});

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

function resetDefault() {
    configState.reset();
}

function updateTable() {
    tableKey.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    store.copy();
}

const dsTypeCode = computed(() => {
    return `
    type VueUiTableDataset = {
        // ${translations.value.docs.comments.table.header[store.lang]}
        header: Array<{
            name: string
            type: "text" | "date" | "numeric"
            average: boolean
            decimals?: number
            sum: boolean
            isSort: boolean
            isSearch: boolean
            isMultiselect: boolean
            isPercentage: boolean
            percentageTo?: string // ${translations.value.docs.comments.table.reference[store.lang]}
            suffix?: string
            prefix?: string
            rangeFilter: boolean
        }>
        // ${translations.value.docs.comments.table.body[store.lang]}
        body: Array<{
            td: (number|string)[] // ${translations.value.docs.comments.table.td[store.lang]}
        }>
    }
    `;
});

const pageChangeCodeTemplate = ref(`<VueUiTable
    :config="config"
    :dataset="dataset"
    @page-change="onPageChange"
/>`);

const pageChangeCode =
    ref(`function onPageChange(pageData: VueUiTablePageChangeEvent) {
    const {
        currentPage,
        totalPages,
        itemsPerPage,
        currentPageData
    } = pageData;

    console.log({ currentPage, totalPages, itemsPerPages, currentPageData });
}`);

const timeFormats = `const config = ref({
    chart: {
        tooltip: {
            customFormat: null,
            useDefaultTimeFormat: false,
            timeFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        timeTag: {
            show: true,
            customFormat: null,
            useDefaultFormat: false,
            timeFormat: 'yyyy-MM-dd HH:mm:ss',
        },
        zoom: {
            customFormat: null,
            useDefaultFormat: false,
            timeFormat: 'yyyy-MM-dd HH:mm:ss'
        }
    }
})`;

const pageEventDescription = ref({
    en: "This event fires when using the pagination buttons, as well as when the number of items per page is modified.",
    fr: "Cet événement se déclenche lors de l’utilisation des boutons de pagination, ainsi que lorsque le nombre d’éléments par page est modifié.",
    pt: "Este evento é acionado ao usar os botões de paginação, bem como quando o número de itens por página é modificado.",
    de: "Dieses Ereignis wird ausgelöst, wenn die Seitenschaltflächen verwendet werden oder wenn die Anzahl der Elemente pro Seite geändert wird.",
    zh: "当使用分页按钮或修改每页项目数时，会触发此事件。",
    ja: "ページネーションボタンを使用したとき、または1ページあたりの項目数が変更されたときに、このイベントが発火します。",
    es: "Este evento se dispara al usar los botones de paginación, así como cuando se modifica el número de elementos por página.",
    ar: "يتم تشغيل هذا الحدث عند استخدام أزرار الترقيم، وكذلك عند تعديل عدد العناصر لكل صفحة.",
    ko: "이 이벤트는 페이지네이션 버튼을 사용할 때와 페이지당 항목 수가 변경될 때 발생합니다.",
});

const timeFormatTranslation = ref({
    en: "When datetimeFormatter is enabled, you can also customize time labels for:",
    fr: "Lorsque datetimeFormatter est activé, vous pouvez également personnaliser les étiquettes de temps pour :",
    pt: "Quando o datetimeFormatter está ativado, você também pode personalizar os rótulos de tempo para:",
    de: "Wenn datetimeFormatter aktiviert ist, können Sie auch die Zeitbeschriftungen anpassen für:",
    zh: "启用 datetimeFormatter 后，您还可以自定义以下时间标签：",
    ja: "datetimeFormatter が有効な場合、時間ラベルをカスタマイズできます：",
    es: "Cuando datetimeFormatter está habilitado, también puede personalizar las etiquetas de tiempo para:",
    ko: "datetimeFormatter가 활성화되면 시간 레이블을 다음에 대해 사용자 정의할 수 있습니다:",
    ar: "عند تفعيل datetimeFormatter، يمكنك أيضًا تخصيص تسميات الوقت لـ:",
});

const { configCode, showAllConfig } = useConfigCode();
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiTable" />

        <BaseDocDescription
            :text="translations.docs.tooltips.table[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-table"
            :configSource="mainConfig.vue_ui_table"
        />

        <BaseCard>
            <Suspense>
                <template #default>
                    <VueUiTable
                        :dataset="mutableDataset"
                        :config="config"
                        :key="`tablekey_${tableKey}`"
                    />
                </template>

                <template #fallback>
                    <BaseSpinner />
                </template>
            </Suspense>
        </BaseCard>

        <Rater itemId="vue_ui_table" />

        <Box showEmits :showDatetimeFormatter="true">
            <template #tab2>
                <p class="mb-4">{{ pageEventDescription[store.lang] }}</p>
                <CodeParser
                    language="javascript"
                    @copy="store.copy()"
                    :content="pageChangeCode"
                    title="@page-change"
                />
                <CodeParser
                    language="html"
                    @copy="store.copy()"
                    :content="pageChangeCodeTemplate"
                />
            </template>
            <template v-slot:tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type:
                    <code class="text-app-green">VueUiTableDataset</code>
                </div>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <div
                        class="mt-3 flex flex-row flex-wrap place-items-center gap-2 text-gray-500"
                    >
                        <InfoCircleIcon />
                        <span>
                            {{
                                translations.updateDatasetWillReset[store.lang]
                            }}
                        </span>
                    </div>

                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        class="my-6"
                    />
                </div>

                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x auto">
                    <pre>
    <code>
    const <span class="text-black dark:text-app-green">dataset: VueUiTableDataset</span> = [
        header: [
            {
                name: "touchpoint",
                type: "text",
                average: false,
                decimals: undefined,
                sum: false,
                isSort: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[0].isSort" @change="updateTable">,
                isSearch: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[0].isSearch" @change="updateTable">,
                isMultiselect: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[0].isMultiselect" @change="updateTable">,
                isPercentage: false,
                percentageTo: undefined,
                suffix: "",
                prefix: "",
                rangeFilter: false,
            },
            {
                  name: "category",
                  type: "text",
                  average: false,
                  decimals: undefined,
                  sum: false,
                  isSort: false,
                  isSearch: false,
                  isMultiselect: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[1].isMultiselect" @change="updateTable">,
                  isPercentage: false,
                  percentageTo: undefined,
                  suffix:"",
                  prefix: "",
                  rangeFilter: false,
              },
              {
                  name: "date",
                  type: "date",
                  average: false,
                  decimals: undefined,
                  sum: false,
                  isSort: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[2].isSort" @change="updateTable">,
                  isSearch: false,
                  isMultiselect: false,
                  isPercentage: false,
                  percentageTo: undefined,
                  suffix:"",
                  prefix:"",
                  rangeFilter: false,
              },
              {
                  name: "base",
                  type: "numeric",
                  average: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[3].average" @change="updateTable">,
                  decimals: <input type="number" min="0" max="3" class="accent-app-green" v-model="mutableDataset.header[3].decimals" @change="updateTable">,
                  sum: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[3].sum" @change="updateTable">,
                  isSort: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[3].isSort" @change="updateTable">,
                  isSearch: false,
                  isMultiselect: false,
                  isPercentage: false,
                  percentageTo: undefined,
                  suffix:"",
                  prefix:"",
                  rangeFilter: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[3].rangeFilter" @change="updateTable">,
              },
              {
                  name: "rating",
                  type: "numeric",
                  average: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[4].average" @change="updateTable">,
                  decimals: <input type="number" min="0" max="3" class="accent-app-green" v-model="mutableDataset.header[4].decimals" @change="updateTable">,
                  sum: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[4].sum" @change="updateTable">,
                  isSort: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[4].isSort" @change="updateTable">,
                  isSearch: false,
                  isMultiselect: false,
                  isPercentage: false,
                  percentageTo: undefined,
                  suffix:"",
                  prefix:"",
                  rangeFilter: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[4].rangeFilter" @change="updateTable">,
              },
              {
                  name: "spend",
                  type: "numeric",
                  average: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[5].average" @change="updateTable">,
                  decimals: <input type="number" min="0" max="3" class="accent-app-green" v-model="mutableDataset.header[5].decimals" @change="updateTable">,
                  sum: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[5].sum" @change="updateTable">,
                  isSort: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[5].isSort" @change="updateTable">,
                  isSearch: false,
                  isMultiselect: false,
                  isPercentage: false,
                  percentageTo: undefined,
                  suffix: <input type="text" v-model="mutableDataset.header[5].suffix" @change="updateTable">,
                  prefix:"",
                  rangeFilter: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[5].rangeFilter" @change="updateTable">,
              },
              {
                  name: "percentage",
                  type: "numeric",
                  average: false,
                  decimals: <input type="number" min="0" max="3" class="accent-app-green" v-model="mutableDataset.header[6].decimals" @change="updateTable">,
                  sum: false,
                  isSort: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[6].isSort" @change="updateTable">,
                  isSearch: false,
                  isMultiselect: false,
                  isPercentage: true, <span class="text-app-orange">// {{ translations.docs.comments.table.warning1[store.lang] }}</span>
                  percentageTo: "base",
                  suffix:"",
                  prefix:"",
                  rangeFilter: false,
              },
              {
                  name: "happy",
                  type: "numeric",
                  average: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[7].average" @change="updateTable">,
                  decimals: <input type="number" min="0" max="3" class="accent-app-green" v-model="mutableDataset.header[7].decimals" @change="updateTable">,
                  sum: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[7].sum" @change="updateTable">,
                  isSort: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[7].isSort" @change="updateTable">,
                  isSearch: false,
                  isMultiselect: false,
                  isPercentage: false,
                  percentageTo: "base",
                  suffix:"",
                  prefix:"",
                  rangeFilter: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[7].rangeFilter" @change="updateTable">,
              },
              {
                  name: "sad",
                  type: "numeric",
                  average: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[8].average" @change="updateTable">,
                  decimals: <input type="number" min="0" max="3" class="accent-app-green" v-model="mutableDataset.header[8].decimals" @change="updateTable">,
                  sum: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[8].sum" @change="updateTable">,
                  isSort: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[8].isSort" @change="updateTable">,
                  isSearch: false,
                  isMultiselect: false,
                  isPercentage: false,
                  percentageTo: "base",
                  suffix:"",
                  prefix:"",
                  rangeFilter: <input type="checkbox" class="accent-app-green" v-model="mutableDataset.header[8].rangeFilter" @change="updateTable">,
              }
        ],
        body: [
            <span class="text-gray-600 dark:text-app-green">// {{ translations.docs.comments.table.fewRows[store.lang] }}</span>
            {
                td: [
                    "Réactivité du support",
                    "Accueil",
                    "2023-11-14",
                    35,
                    4.1,
                    18.7,
                    "", <span class="text-app-orange">// {{ translations.docs.comments.table.warning2[store.lang] }}</span>
                    -27,
                    109
                ],
            },
            {
                td: [
                    "Variété des produits",
                    "Caisse",
                    "2023-08-12",
                    25,
                    2,
                    74,
                    "", <span class="text-app-orange">// {{ translations.docs.comments.table.warning2[store.lang] }}</span>
                    35,
                    276
                ]
            },
            {... and so on}
        ]
    ]
    </code>
    </pre>
                </div>
            </template>
            <template v-slot:tab1>
                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiTableConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiTableConfigFields :config="config" :context="{}" />
                </code>
            </template>

            <template #tab10>
                <DatetimeFormatterDoc
                    path="style.chart.layout.datetimeFormatter"
                >
                    <div class="mt-6">
                        {{ timeFormatTranslation[store.lang] }}
                        <CodeParser
                            class="mt-2"
                            language="javascript"
                            :content="timeFormats"
                        />
                    </div>
                </DatetimeFormatterDoc>
            </template>
        </Box>
    </div>
</template>
