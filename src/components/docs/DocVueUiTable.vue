<script setup>
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

const mainConfig = useConfig()

const store = useMainStore();
const tableKey = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        tableKey.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

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
        "Fiabilité du matériel"
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
            '',
            Math.random() * (Math.random() > 0.5 ? 150 : -30), 
            Math.random() * 350 
          ];
          items.push({td: data});
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
      const formattedDate = randomDate.toISOString().split('T')[0]; 
      return formattedDate;
    }
      return generateRandomData();
      });

const dataset = ref({
    header: [{
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
              isSort: true,
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
              average: true,
              decimals: 0,
              sum: true,
              isSort: true,
              isSearch: false,
              isMultiselect: false,
              isPercentage: false,
              percentageTo: undefined,
              suffix:"",
              prefix:"",
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
              suffix:"",
              prefix:"",
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
              suffix:"€",
              prefix:"",
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
              suffix:"",
              prefix:"",
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
              suffix:"",
              prefix:"",
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
              suffix:"",
              prefix:"",
              rangeFilter: false
          },],
    body: body
});

const config = ref({
    fontFamily: "inherit",
    maxHeight: 700,
    rowsPerPage: 25,
    style: {
        title: {
            text: "Title",
            color: "#1A1A1A",
            fontSize: 20,
            bold: true,
            textAlign: 'left',
            paddingLeft: 48,
            paddingRight: 0,
            backgroundColor: '#F3F4F6',
            subtitle: {
                color: "#565656",
                text: "Subtitle",
                fontSize: 16,
                bold: false
            }
        },
        th: {
            backgroundColor: "#F3F4F6",
            color:"#1A1A1A",
            outline: "1px solid #C4C4C4",
            selected: {
                backgroundColor: "#42d392",
                color: "#1a1a1a"
            }
        },
        rows: {
            even: {
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                selectedCell: {
                    backgroundColor: '#5de8aa',
                    color: "#2D353C"
                },
                selectedNeighbors: {
                    backgroundColor: "#b2d4c4",
                    color: "#1A1A1A"
                }
            },
            odd: {
                backgroundColor: "#e1e5e8",
                color: "#1A1A1A",
                selectedCell: {
                    backgroundColor: '#42d392',
                    color: "#2D353C"
                },
                selectedNeighbors: {
                    backgroundColor: "#9cbaac",
                    color: "#1A1A1A"
                }
            },
        },
        inputs: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            border: "1px solid #C4C4C4",
            accentColor: "#42d392"
        },
        dropdowns: {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            icons: {
                selected: {
                    color: "#42d392",
                    unicode: "✔"
                },
                unselected: {
                    color: "#ff6400",
                    unicode: "✖"
                }
            }
        },
        infoBar: {
            backgroundColor: "#e1e5e8",
            color: "#1A1A1A"
        },
        pagination: {
            buttons: {
                backgroundColor: "#e1e5e8",
                color: "#1A1A1A",
                opacityDisabled: 0.3
            },
            navigationIndicator: {
                backgroundColor: "#42d392"
            }
        },
        exportMenu: {
            show: true,
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            buttons: {
                backgroundColor: "#e1e5e8",
                color: "#2D353C"
            },
            filename: ''
        },
        closeButtons: {
            backgroundColor: "transparent",
            color: "#ff6400",
            borderRadius: "50%"
        },
        chart: {
            modal: {
                backgroundColor: "#FFFFFF",
                color: "#1A1A1A",
                buttons: {
                  selected: {
                      backgroundColor: "#42d392",
                      color: "#FFFFFF"
                    },
                    unselected: {
                      backgroundColor: "#e1e5e8",
                      color: "#1A1A1A"
                    }
                }
            },
            layout: {
                backgroundColor: "#FFFFFF",
                axis: {
                    stroke: "#ccd1d4",
                    strokeWidth: 2,
                },
                bar: {
                    fill: "#42d392",
                    stroke: "#FFFFFF"
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
                        radius: {
                            selected: 6,
                            unselected: 4,
                        }
                    },
                    selector: {
                        stroke: "#ff6400",
                        strokeWidth: 1,
                        strokeDasharray: 5
                    },
                },
                labels: {
                    color: "#1A1A1A"
                },
                progression: {
                    stroke: "#565656",
                    strokeWidth: 2,
                    strokeDasharray: 4,
                    arrowSize: 7,
                },
                timeLabels: {
                    showOnlyAtModulo: true,
                    modulo: 12,
                },
                datetimeFormatter: {
                    enable: true,
                    locale: 'en',
                    useUTC: false,
                    januaryAsYear: false,
                    options: {
                        year: 'yyyy',
                        month: `MMM 'yy`,
                        day: 'dd MMM',
                        hour: 'HH:mm',
                        minute: 'HH:mm:ss',
                        second: 'HH:mm:ss'
                    }
                },
                zoom: {
                    show: true
                }
            },
        }
    },
    translations: {
        average: "Average",
        by: "by",
        chooseCategoryColumn: "Choose category column",
        exportAllButton: "CSV all",
        exportAllLabel: "Export all rows of your current filtered dataset",
        exportPageButton: "CSV page",
        exportPageLabel: "Export rows of the current page",
        from: "From",
        inputPlaceholder: "Search...",
        makeDonut: "Generate",
        nb: "Nb",
        page: "Page",
        paginatorLabel: "Rows per page",
        sizeWarning: "Displaying too many rows at a time can lead to slower performance",
        sum: "Sum",
        to: "To",
        total: 'Total',
        totalRows: "Total rows",
        xAxisLabels: 'X axis labels'
    },
    useChart: true
});
const darkModeConfig = ref({
    fontFamily: "inherit",
    maxHeight: 700,
    rowsPerPage: 25,
    style: {
        title: {
            text: "Title",
            color: "#FAFAFA",
            fontSize: 20,
            bold: true,
            textAlign: 'left',
            paddingLeft: 48,
            paddingRight: 0,
            backgroundColor: '#1A1A1A',
            subtitle: {
                color: "#CCCCCC",
                text: "Subtitle",
                fontSize: 16,
                bold: false
            }
        },
        th: {
            backgroundColor: "#1a1a1a",
            color:"#c4c9cc",
            outline: "1px solid #7b8185",
            selected: {
                backgroundColor: "#42d392",
                color: "#1a1a1a"
            }
        },
        rows: {
            even: {
                backgroundColor: "#1a1a1a",
                color: "#c4c9cc",
                selectedCell: {
                    backgroundColor: '#42d392',
                    color: "#2D353C"
                },
                selectedNeighbors: {
                    backgroundColor: "#075e37",
                    color: "#FFFFFF"
                }
            },
            odd: {
                backgroundColor: "#2A2A2A",
                color: "#FFFFFF",
                selectedCell: {
                    backgroundColor: '#5de8aa',
                    color: "#2D353C"
                },
                selectedNeighbors: {
                    backgroundColor: "#0c7a49",
                    color: "#FFFFFF"
                }
            },
        },
        inputs: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            border: "1px solid #CCCCCC",
            accentColor: "#42d392"
        },
        dropdowns: {
            backgroundColor: "#1a1a1a",
            color: "#c4c9cc",
            icons: {
                selected: {
                    color: "#42d392",
                    unicode: "✔"
                },
                unselected: {
                    color: "#ff6400",
                    unicode: "✖"
                }
            }
        },
        infoBar: {
            backgroundColor: "#1a1a1a",
            color: "#FFFFFF"
        },
        pagination: {
            buttons: {
                backgroundColor: "#1a1a1a",
                color: "#E1E5E8",
                opacityDisabled: 0.3
            },
            navigationIndicator: {
                backgroundColor: "#42d392"
            }
        },
        exportMenu: {
            show: true,
            backgroundColor: "#1a1a1a",
            color: "#E1E5E8",
            buttons: {
                backgroundColor: "#42d392",
                color: "#2D353C"
            },
            filename: ''
        },
        closeButtons: {
            backgroundColor: "transparent",
            color: "#ff6400",
            borderRadius: "50%"
        },
        chart: {
            modal: {
                backgroundColor: "#1a1a1a",
                color: "#E1E5E8",
                buttons: {
                  selected: {
                      backgroundColor: "#42d392",
                      color: "#1a1a1a"
                    },
                    unselected: {
                      backgroundColor: "#1a1a1a",
                      color: "#E1E5E8"
                    }
                }
            },
            layout: {
                backgroundColor: "#1a1a1a",
                axis: {
                    stroke: "#ccd1d4",
                    strokeWidth: 2,
                },
                bar: {
                    fill: "#42d392",
                    stroke: "#1a1a1a"
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
                        radius: {
                            selected: 6,
                            unselected: 4,
                        }
                    },
                    selector: {
                        stroke: "#ff6400",
                        strokeWidth: 1,
                        strokeDasharray: 5
                    },
                },
                labels: {
                    color: "#ccd1d4"
                },
                progression: {
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                    strokeDasharray: 4,
                    arrowSize: 7,
                },
                timeLabels: {
                    showOnlyAtModulo: true,
                    modulo: 12,
                },
                datetimeFormatter: {
                    enable: true,
                    locale: 'en',
                    useUTC: false,
                    januaryAsYear: false,
                    options: {
                        year: 'yyyy',
                        month: `MMM 'yy`,
                        day: 'dd MMM',
                        hour: 'HH:mm',
                        minute: 'HH:mm:ss',
                        second: 'HH:mm:ss'
                    }
                },
                zoom: {
                    show: true
                }
            },
        }
    },
    translations: {
        average: "Average",
        by: "by",
        chooseCategoryColumn: "Choose category column",
        exportAllButton: "CSV all",
        exportAllLabel: "Export all rows of your current filtered dataset",
        exportPageButton: "CSV page",
        exportPageLabel: "Export rows of the current page",
        from: "From",
        inputPlaceholder: "Search...",
        makeDonut: "Generate",
        nb: "Nb",
        page: "Page",
        paginatorLabel: "Rows per page",
        sizeWarning: "Displaying too many rows at a time can lead to slower performance",
        sum: "Sum",
        to: "To",
        total: 'Total',
        totalRows: "Total rows",
        filename: 'File name',
        xAxisLabels: 'X axis labels'
    },
    useChart: true
});

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));
const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}

function updateTable() {
    tableKey.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
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
    `
})

const pageChangeCodeTemplate = ref(`<VueUiTable
    :config="config"
    :dataset="dataset"
    @page-change="onPageChange"
/>`)

const pageChangeCode = ref(`function onPageChange(pageData: VueUiTablePageChangeEvent) {
    const { 
        currentPage,
        totalPages,
        itemsPerPage,
        currentPageData
    } = pageData;

    console.log({ currentPage, totalPages, itemsPerPages, currentPageData });
}`)

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
})`

const pageEventDescription = ref( {
    en: 'This event fires when using the pagination buttons, as well as when the number of items per page is modified.',
    fr: 'Cet événement se déclenche lors de l’utilisation des boutons de pagination, ainsi que lorsque le nombre d’éléments par page est modifié.',
    pt: 'Este evento é acionado ao usar os botões de paginação, bem como quando o número de itens por página é modificado.',
    de: 'Dieses Ereignis wird ausgelöst, wenn die Seitenschaltflächen verwendet werden oder wenn die Anzahl der Elemente pro Seite geändert wird.',
    zh: '当使用分页按钮或修改每页项目数时，会触发此事件。',
    jp: 'ページネーションボタンを使用したとき、または1ページあたりの項目数が変更されたときに、このイベントが発火します。',
    es: 'Este evento se dispara al usar los botones de paginación, así como cuando se modifica el número de elementos por página.',
    ar: 'يتم تشغيل هذا الحدث عند استخدام أزرار الترقيم، وكذلك عند تعديل عدد العناصر لكل صفحة.',
    ko: '이 이벤트는 페이지네이션 버튼을 사용할 때와 페이지당 항목 수가 변경될 때 발생합니다.'
})

const timeFormatTranslation = ref({
    en: 'When datetimeFormatter is enabled, you can also customize time labels for:',
    fr: 'Lorsque datetimeFormatter est activé, vous pouvez également personnaliser les étiquettes de temps pour :',
    pt: 'Quando o datetimeFormatter está ativado, você também pode personalizar os rótulos de tempo para:',
    de: 'Wenn datetimeFormatter aktiviert ist, können Sie auch die Zeitbeschriftungen anpassen für:',
    zh: '启用 datetimeFormatter 后，您还可以自定义以下时间标签：',
    jp: 'datetimeFormatter が有効な場合、時間ラベルをカスタマイズできます：',
    es: 'Cuando datetimeFormatter está habilitado, también puede personalizar las etiquetas de tiempo para:',
    ko: 'datetimeFormatter가 활성화되면 시간 레이블을 다음에 대해 사용자 정의할 수 있습니다:',
    ar: 'عند تفعيل datetimeFormatter، يمكنك أيضًا تخصيص تسميات الوقت لـ:'
})

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiTable" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-4 text-center">
                {{ translations.docs.tooltips.table[store.lang] }}
            </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-table"
            :configSource="mainConfig.vue_ui_table"
        />
    
        <Suspense>
            <template #default>
                <VueUiTable :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`tablekey_${tableKey}`"/>
            </template>
    
            <template #fallback>
                <BaseSpinner/>
            </template>
        </Suspense>   

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
                    TS type: <code class="text-app-green">VueUiTableDataset</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                    <div class="mt-3 flex flex-row flex-wrap place-items-center gap-2 text-gray-500">
                        <InfoCircleIcon/>
                        <span>
                            {{ translations.updateDatasetWillReset[store.lang] }}
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
                <div class="flex gap-2">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <div class="mt-4">
                TS type: <code class="text-app-blue">VueUiTableConfig</code>
            </div>
    <pre>
    <code>
    const <span class="text-black dark:text-app-blue">config: VueUiTableConfig</span> = {
        fontFamily: "inherit",
        maxHeight: <input v-if="isDarkMode" type="number" min="100" max="5000" v-model="mutableConfigDarkMode.maxHeight"><input v-else type="number" min="100" max="5000" v-model="mutableConfig.maxHeight">, (default: 500)
        rowsPerPage: 25,
        style: {
            title: {
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">
                fontSize: <input v-if="isDarkMode" type="number" min="8" max="42" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="8" max="42" v-model="mutableConfig.style.title.fontSize">
                bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.title.bold"><input v-else type="checkbox" v-model="mutableConfig.style.title.bold">
                textAlign: 'left' | 'center' | 'right',
                paddingLeft: 0,
                paddingRight: 0,
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.title.backgroundColor">
                subtitle: {
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">
                    fontSize: <input v-if="isDarkMode" type="number" min="8" max="42" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="8" max="42" v-model="mutableConfig.style.title.subtitle.fontSize">
                    bold: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.title.subtitle.bold"><input v-else type="checkbox" v-model="mutableConfig.style.title.subtitle.bold">
                }
            },
            th: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.th.backgroundColor">, (default: #E1E5E8")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.th.color"><input v-else type="color" v-model="mutableConfig.style.th.color">, (default: "#2D353C"),
                outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.th.outline"><input v-else type="text" v-model="mutableConfig.style.th.outline">, (default: "1px solid #FFFFFF")
                selected: {
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.th.selected.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.th.selected.backgroundColor">, (default: "#6376DD")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.th.selected.color"><input v-else type="color" v-model="mutableConfig.style.th.selected.color">, (default: "#FFFFFF")
                }
            },
            rows: {
                even: {
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.even.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.rows.even.backgroundColor">, (default: "#f3f5f7")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.even.color"><input v-else type="color" v-model="mutableConfig.style.rows.even.color">, (default: "#2D353C")
                    selectedCell: {
                        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.even.selectedCell.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.rows.even.selectedCell.backgroundColor">, (default: "#6375dd5b")
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.even.selectedCell.color"><input v-else type="color" v-model="mutableConfig.style.rows.even.selectedCell.color">, (default: "#2D353C")
                    },
                    selectedNeighbors: {
                        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.even.selectedNeighbors.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.rows.even.selectedNeighbors.backgroundColor">, (selectedNeighbors: "#63dd821e")
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.even.selectedNeighbors.color"><input v-else type="color" v-model="mutableConfig.style.rows.even.selectedNeighbors.color">, (default: "#2D353C")
                    }
                },
                odd: {
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.odd.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.rows.odd.backgroundColor">, (default: "#FFFFFF")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.odd.color"><input v-else type="color" v-model="mutableConfig.style.rows.odd.color">, (default: "#2D353C")
                    selectedCell: {
                        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.odd.selectedCell.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.rows.odd.selectedCell.backgroundColor">, (default: '#6375dd5b')
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.odd.selectedCell.color"><input v-else type="color" v-model="mutableConfig.style.rows.odd.selectedCell.color"> (default: "#2D353C")
                    },
                    selectedNeighbors: {
                        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.odd.selectedNeighbors.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.rows.odd.selectedNeighbors.backgroundColor">, (default: "#63dd821e")
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rows.odd.selectedNeighbors.color"><input v-else type="color" v-model="mutableConfig.style.rows.odd.selectedNeighbors.color">, (default: "#2D353C")
                    }
                },
            },
            inputs: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.inputs.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.inputs.backgroundColor">, (default: "#FFFFFF"),
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.inputs.color"><input v-else type="color" v-model="mutableConfig.style.inputs.color">, (default: "#2D353C"),
                border: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.inputs.border"><input v-else type="text" v-model="mutableConfig.style.inputs.border">, (default: "1px solid #CCCCCC")
                accentColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.inputs.accentColor"><input v-else type="color" v-model="mutableConfig.style.inputs.accentColor">, (default: "#6376DD")
            },
            dropdowns: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.dropdowns.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.dropdowns.backgroundColor">, (default: "#E1E5E8")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.dropdowns.color"><input v-else type="color" v-model="mutableConfig.style.dropdowns.color">, (default: "#2D353C")
                icons: {
                    selected: {
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.dropdowns.icons.selected.color"><input v-else type="color" v-model="mutableConfig.style.dropdowns.icons.selected.color">, (default: "#008000"),
                        unicode: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dropdowns.icons.selected.unicode"><input v-else type="text" v-model="mutableConfig.style.dropdowns.icons.selected.unicode">, (default: "✔")
                    },
                    unselected: {
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.dropdowns.icons.unselected.color"><input v-else type="color" v-model="mutableConfig.style.dropdowns.icons.unselected.color">, (default: "#ff0000")
                        unicode: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.dropdowns.icons.unselected.unicode"><input v-else type="text" v-model="mutableConfig.style.dropdowns.icons.unselected.unicode">, (default: "✖")
                    }
                }
            },
            infoBar: {
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.infoBar.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.infoBar.backgroundColor">, (default: "#E1E5E8")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.infoBar.color"><input v-else type="color" v-model="mutableConfig.style.infoBar.color">, (default: "#2D353C")
            },
            pagination: {
                buttons: {
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.pagination.buttons.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.pagination.buttons.backgroundColor">, (default: "#E1E5E8")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.pagination.buttons.color"><input v-else type="color" v-model="mutableConfig.style.pagination.buttons.color">, (default: "#2D353C")
                    opacityDisabled: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.1" v-model="mutableConfigDarkMode.style.pagination.buttons.opacityDisabled"><input v-else type="number" min="0" max="1" step="0.1" v-model="mutableConfig.style.pagination.buttons.opacityDisabled">, (default: 0.5)
                },
                navigationIndicator: {
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.pagination.navigationIndicator.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.pagination.navigationIndicator.backgroundColor">, (default: "#6376DD")
                }
            },
            exportMenu: {
                show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.exportMenu.show"><input v-else type="checkbox" v-model="mutableConfig.style.exportMenu.show">, (default: true)
                backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.exportMenu.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.exportMenu.backgroundColor">, (default: "#E1E5E8")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.exportMenu.color"><input v-else type="color" v-model="mutableConfig.style.exportMenu.color">, (default: "#2D353C")
                buttons: {
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.exportMenu.buttons.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.exportMenu.buttons.backgroundColor">, (default: "#FAFAFA")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.exportMenu.buttons.color"><input v-else type="color" v-model="mutableConfig.style.exportMenu.buttons.color">, (default: "#2D353C")
                },
                filename: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.exportMenu.filename"><input v-else type="text" v-model="mutableConfig.style.exportMenu.filename">
            },
            closeButtons: {
                backgroundColor: "transparent",
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.closeButtons.color"><input v-else type="color" v-model="mutableConfig.style.closeButtons.color">,  (default: "#2D353C")
                borderRadius: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.closeButtons.borderRadius"><input v-else type="text" v-model="mutableConfig.style.closeButtons.borderRadius">, (default: "50%")
            },
            chart: {
                modal: {
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.modal.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.modal.backgroundColor">, (default: "#E1E5E8")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.modal.color"><input v-else type="color" v-model="mutableConfig.style.chart.modal.color">, (default: "#2D353C")
                    buttons: {
                        selected: {
                            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.modal.buttons.selected.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.modal.buttons.selected.backgroundColor">, (default: "#6376DD")
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.modal.buttons.selected.color"><input v-else type="color" v-model="mutableConfig.style.chart.modal.buttons.selected.color">, (default: "#FFFFFF")
                        },
                        unselected: {
                            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.modal.buttons.unselected.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.modal.buttons.unselected.backgroundColor">, (default: "#FFFFFF")
                            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.modal.buttons.unselected.color"><input v-else type="color" v-model="mutableConfig.style.chart.modal.buttons.unselected.color">, (default: "#2D353C")
                        }
                    }
                },
                layout: {
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.backgroundColor">, (default: "#FFFFFF")
                    axis: {
                        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.axis.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.axis.stroke">, (default: "#CCD1D4")
                        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.axis.strokeWidth"><input v-else type="number" min="0" max="10" step="0.2" v-model="mutableConfig.style.chart.layout.axis.strokeWidth">, (default: 2)
                    },
                    bar: {
                        fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bar.fill"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bar.fill">, (default: custom gradient)
                        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bar.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bar.stroke">, (default: "#FFFFFF")
                    },
                    line: {
                        smooth: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.line.smooth"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.line.smooth">
                        useArea: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.line.useArea"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.line.useArea">
                        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.line.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.line.stroke">, (default: "#6376DD")
                        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.line.strokeWidth"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.strokeWidth">, (default: 4)
                        plot: {
                            fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.line.plot.fill"><input v-else type="color" v-model="mutableConfig.style.chart.layout.line.plot.fill">, (default: "#22348f")
                            stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.line.plot.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.line.plot.stroke">, (default: "#FFFFFF", deprecated since v2.9.3)
                            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.line.plot.strokeWidth"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.plot.strokeWidth">, (default: 1)
                            radius: {
                                selected: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.line.plot.radius.selected"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.plot.radius.selected">, (default: 6)
                                unselected: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.line.plot.radius.unselected"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.plot.radius.unselected">, (default: 4)
                            }
                        },
                        selector: {
                            stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.line.selector.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.line.selector.stroke">, (default: "#CCCCCC", deprecated since v2.9.3)
                            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.line.selector.strokeWidth"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.selector.strokeWidth">, (default: 4, deprecated since v2.9.3)
                            strokeDasharray: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.line.selector.strokeDasharray"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.selector.strokeDasharray">, (default: 5, deprecated since v2.9.3)
                        },
                    },
                    labels: {
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.labels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.labels.color">, (default: "#2D353C")
                    },
                    progression: {
                        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.progression.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.progression.stroke">, (default: "#2D353C")
                        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.progression.strokeWidth"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.progression.strokeWidth">, (default: 2)
                        strokeDasharray: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.progression.strokeDasharray"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.progression.strokeDasharray">, (default: 4)
                        arrowSize: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.2" v-model="mutableConfigDarkMode.style.chart.layout.progression.arrowSize"><input v-else type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.progression.arrowSize">, (default:7)
                    },
                    timeLabels: {
                        showOnlyAtModulo: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.timeLabels.showOnlyAtModulo"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.timeLabels.showOnlyAtModulo"></input>, (default: true)
                        modulo: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.chart.layout.timeLabels.showmodulo" :min="2" :max="24"><input v-if="isDarkMode" type="number" v-model="mutableConfig.style.chart.layout.timeLabels.showmodulo" :min="2" :max="24">, (default: 12)
                    },
                    datetimeFormatter: (see datetimeFormatter tab),
                    zoom: {
                        show: <input v-if="isDarkMode" type="checkbox" v-model="mutableConfigDarkMode.style.chart.layout.zoom.show"><input v-else type="checkbox" v-model="mutableConfig.style.chart.layout.zoom.show"></input>, (default: true)
                    }
                },
            }
        },
        translations: {
            average: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.average"><input v-else type="text" v-model="mutableConfig.translations.average">, (default: "Average")
            by: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.by"><input v-else type="text" v-model="mutableConfig.translations.by">, (default: "by")
            chooseCategoryColumn: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.chooseCategoryColumn"><input v-else type="text" v-model="mutableConfig.translations.chooseCategoryColumn">, (default: "Choose category column")
            exportAllButton: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.exportAllButton"><input v-else type="text" v-model="mutableConfig.translations.exportAllButton">, (default "CSV all")
            exportAllLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.exportAllLabel"><input v-else type="text" v-model="mutableConfig.translations.exportAllLabel">, (default: "Export all rows of your current filtered dataset")
            exportPageButton: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.exportPageButton"><input v-else type="text" v-model="mutableConfig.translations.exportPageButton">, (default: "CSV page")
            exportPageLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.exportPageLabel"><input v-else type="text" v-model="mutableConfig.translations.exportPageLabel">, (default: "Export rows of the current page")
            from: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.from"><input v-else type="text" v-model="mutableConfig.translations.from">, (default: "From")
            inputPlaceholder: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.inputPlaceholder"><input v-else type="text" v-model="mutableConfig.translations.inputPlaceholder">, (default: "Search...")
            makeDonut: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.makeDonut"><input v-else type="text" v-model="mutableConfig.translations.makeDonut">, (default: "Generate")
            nb: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.nb"><input v-else type="text" v-model="mutableConfig.translations.nb">, (default: "Nb")
            page: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.page"><input v-else type="text" v-model="mutableConfig.translations.page">, (default: "Page")
            paginatorLabel: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.paginatorLabel"><input v-else type="text" v-model="mutableConfig.translations.paginatorLabel">, (default: "Rows per page")
            sizeWarning: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.sizeWarning"><input v-else type="text" v-model="mutableConfig.translations.sizeWarning">, (default: "Displaying too many rows at a time can lead to slower performance")
            sum: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.sum"><input v-else type="text" v-model="mutableConfig.translations.sum">, (defaut: "Sum")
            to: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.to"><input v-else type="text" v-model="mutableConfig.translations.to">, (default: "To")
            total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.total"><input v-else type="text" v-model="mutableConfig.translations.total">, (default: "Total")
            totalRows: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.totalRows"><input v-else type="text" v-model="mutableConfig.translations.totalRows">, (default: "Total rows")
            filename: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.filename"><input v-else type="text" v-model="mutableConfig.translations.filename">, (default: "File name")
        },
        useChart: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useChart"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useChart">, (default: true)
    }
    </code>
    </pre>         
            </template>

            <template #tab10>
                <DatetimeFormatterDoc
                    path="style.chart.layout.datetimeFormatter"
                >
                    <div class="mt-6">
                        {{ timeFormatTranslation[store.lang] }}
                        <CodeParser class="mt-2" language="javascript" :content="timeFormats"/>
                    </div>
                </DatetimeFormatterDoc>
            </template>
        </Box>
    </div>
</template>
