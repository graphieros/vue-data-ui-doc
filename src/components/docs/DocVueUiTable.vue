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
import { useConfigCode } from "../../useConfigCode";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseCard from "../BaseCard.vue";

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
            },
            buttons: {
                filter: {
                    active: {
                        backgroundColor: '#5f8aee',
                        color: '#1A1A1A'
                    },
                    inactive: {
                        backgroundColor: '#E1E5E8',
                        color: '#1A1A1A'
                    }
                },
                cancel: {
                    active: {
                        backgroundColor: '#ff6600',
                        color: '#1A1A1A'
                    },
                    inactive: {
                        backgroundColor: '#E1E5E8',
                        color: '#8A8A8A'
                    }
                }
            }
        },
        rows: {
            outline: '1px solid #FFFFFF',
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
            backgroundColor: '#2A2A2A',
            subtitle: {
                color: "#CCCCCC",
                text: "Subtitle",
                fontSize: 16,
                bold: false
            }
        },
        th: {
            backgroundColor: "#2A2A2A",
            color:"#c4c9cc",
            outline: "1px solid #7b8185",
            selected: {
                backgroundColor: "#42d392",
                color: "#1a1a1a"
            },
            buttons: {
                filter: {
                    active: {
                        backgroundColor: '#5f8aee',
                        color: '#2A2A2A'
                    },
                    inactive: {
                        backgroundColor: '#3A3A3A',
                        color: '#CCCCCC'
                    }
                },
                cancel: {
                    active: {
                        backgroundColor: '#ff6600',
                        color: '#3A3A3A'
                    },
                    inactive: {
                        backgroundColor: '#3A3A3A',
                        color: '#5A5A5A'
                    }
                }
            }
        },
        rows: {
            outline: '1px solid #4A4A4A',
            even: {
                backgroundColor: "#2A2A2A",
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
                backgroundColor: "#3A3A3A",
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
            backgroundColor: "#2A2A2A",
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
            backgroundColor: "#2A2A2A",
            color: "#FFFFFF"
        },
        pagination: {
            buttons: {
                backgroundColor: "#2A2A2A",
                color: "#E1E5E8",
                opacityDisabled: 0.3
            },
            navigationIndicator: {
                backgroundColor: "#42d392"
            }
        },
        exportMenu: {
            show: true,
            backgroundColor: "#2A2A2A",
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
                backgroundColor: "#2A2A2A",
                color: "#E1E5E8",
                buttons: {
                  selected: {
                      backgroundColor: "#42d392",
                      color: "#2A2A2A"
                    },
                    unselected: {
                      backgroundColor: "#2A2A2A",
                      color: "#E1E5E8"
                    }
                }
            },
            layout: {
                backgroundColor: "#2A2A2A",
                axis: {
                    stroke: "#ccd1d4",
                    strokeWidth: 2,
                },
                bar: {
                    fill: "#42d392",
                    stroke: "#2A2A2A"
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

const { configCode, showAllConfig } = useConfigCode();

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
    
        <BaseCard>
            <Suspense>
                <template #default>
                    <VueUiTable :dataset="mutableDataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`tablekey_${tableKey}`"/>
                </template>
        
                <template #fallback>
                    <BaseSpinner/>
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

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiTableConfig" equal>
        <BaseAttr inactive name="fontFamily" defaultVal="'inherit'" :light="mutableConfig" :dark="mutableConfigDarkMode" />
        <BaseAttr name="maxHeight" attr="maxHeight" type="number" defaultVal="700" :min="400" :max="2000" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr inactive name="rowsPerPage" attr="rowsPerPage" type="number" defaultVal="25" :min="5" :max="100" :step="5" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseDetails attr="style" :level="1">
            <BaseDetails attr="title" :level="2" title="style.title">
                <BaseAttr name="text" attr="style.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="backgroundColor" attr="style.title.backgroundColor" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fontSize" attr="style.title.fontSize" type="number" defaultVal="20" :min="12" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="bold" attr="style.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="textAlign" attr="style.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="paddingLeft" attr="style.title.paddingLeft" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="paddingRight" attr="style.title.paddingRight" type="number" defaultVal="0" :min="-100" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
                    <BaseAttr name="text" attr="style.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.title.subtitle.fontSize" type="number" defaultVal="16" :min="12" :max="48" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="style.th">
                <BaseAttr name="backgroundColor" attr="style.th.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="outline" attr="style.th.outline" type="text" defaultVal="'1px solid #FFFFFF'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="selected" :level="3" title="style.th.selected">
                    <BaseAttr name="backgroundColor" attr="style.th.selected.backgroundColor" type="color" defaultVal="#1F77B4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.th.selected.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="buttons" :level="3" title="style.th.buttons">
                    <BaseDetails attr="filter" :level="4" title="style.th.buttons.filter">
                        <BaseDetails attr="inactive" :level="5" title="style.th.buttons.filter.inactive">
                            <BaseAttr name="backgroundColor" attr="style.th.buttons.filter.inactive.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.th.buttons.filter.inactive.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="active" :level="5" title="style.th.buttons.filter.active">
                            <BaseAttr name="backgroundColor" attr="style.th.buttons.filter.active.backgroundColor" type="color" defaultVal="#1f77b4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.th.buttons.filter.active.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="cancel" :level="4" title="style.th.buttons.cancel">
                        <BaseDetails attr="inactive" :level="5" title="style.th.buttons.cancel.inactive">
                            <BaseAttr name="backgroundColor" attr="style.th.buttons.cancel.inactive.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.th.buttons.cancel.inactive.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="active" :level="5" title="style.th.buttons.cancel.active">
                            <BaseAttr name="backgroundColor" attr="style.th.buttons.cancel.active.backgroundColor" type="color" defaultVal="#F17171" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.th.buttons.cancel.active.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="rows" :level="2" title="style.rows">
                <BaseAttr name="outline" attr="style.rows.outline" type="text" defaultVal="1px solid #FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="even" :level="3" title="style.rows.even">
                    <BaseAttr name="backgroundColor" attr="style.rows.even.backgroundColor" type="color" defaultVal="#F3F5F7" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.rows.even.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="selectedCell" :level="4" title="style.rows.even.selectedCell">
                        <BaseAttr name="backgroundColor" attr="style.rows.even.selectedCell.backgroundColor" type="color" defaultVal="#1F77B45B" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.rows.even.selectedCell.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="selectedNeighbors" :level="4" title="style.rows.even.selectedNeighbors">
                        <BaseAttr name="backgroundColor" attr="style.rows.even.selectedNeighbors.backgroundColor" type="color" defaultVal="#63DD621E" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.rows.even.selectedNeighbors.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="odd" :level="3" title="style.rows.odd">
                    <BaseAttr name="backgroundColor" attr="style.rows.odd.backgroundColor" type="color" defaultVal="#F3F5F7" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.rows.odd.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="selectedCell" :level="4" title="style.rows.odd.selectedCell">
                        <BaseAttr name="backgroundColor" attr="style.rows.odd.selectedCell.backgroundColor" type="color" defaultVal="#1F77B45B" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.rows.odd.selectedCell.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="selectedNeighbors" :level="4" title="style.rows.odd.selectedNeighbors">
                        <BaseAttr name="backgroundColor" attr="style.rows.odd.selectedNeighbors.backgroundColor" type="color" defaultVal="#63DD621E" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.rows.odd.selectedNeighbors.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="inputs" :level="2" title="style.inputs">
                <BaseAttr name="backgroundColor" attr="style.inputs.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.inputs.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="border" attr="style.inputs.border" type="text" defaultVal="'1px solid #CCCCCC'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="accentColor" attr="style.inputs.accentColor" type="color" defaultVal="#1F77B4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="dropdowns" :level="2" title="style.dropdowns">
                <BaseAttr name="backgroundColor" attr="style.dropdowns.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.dropdowns.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="icons" :level="3" title="style.dropdowns.icons">
                    <BaseDetails attr="selected" :level="4" title="style.dropdowns.icons.selected">
                        <BaseAttr name="color" attr="style.dropdowns.icons.selected.color" type="color" defaultVal="#2CA02C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="unicode" attr="style.dropdowns.icons.selected.unicode" type="text" defaultVal="'✔'":light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="unselected" :level="4" title="style.dropdowns.icons.unselected">
                        <BaseAttr name="color" attr="style.dropdowns.icons.unselected.color" type="color" defaultVal="#D62728" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="unicode" attr="style.dropdowns.icons.unselected.unicode" type="text" defaultVal="'✖'":light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="infoBar" :level="2" title="style.infoBar">
                <BaseAttr name="backgroundColor" attr="style.infoBar.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.infoBar.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="pagination" :level="2" title="style.pagination">
                <BaseDetails attr="buttons" :level="3" title="style.pagination.buttons">
                    <BaseAttr name="backgroundColor" attr="style.pagination.buttons.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.pagination.buttons.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="opacityDisabled" attr="style.pagination.buttons.opacityDisabled" type="range" defaultVal="0.5" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                </BaseDetails>
                <BaseDetails attr="navigationIndicator" :level="3" title="style.pagination.navigationIndicator">
                    <BaseAttr name="backgroundColor" attr="style.pagination.navigationIndicator.backgroundColor" type="color" defaultVal="#1F77B4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="exportMenu" :level="2" title="style.exportMenu">
                <BaseAttr name="show" attr="style.exportMenu.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="backgroundColor" attr="style.exportMenu.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.exportMenu.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="filename" attr="style.exportMenu.filename" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="buttons" :level="3" title="style.exportMenu.buttons">
                    <BaseAttr name="backgroundColor" attr="style.exportMenu.buttons.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.exportMenu.buttons.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="closeButtons" :level="2" title="style.closeButtons">
                <BaseAttr name="backgroundColor" attr="style.closeButtons.backgroundColor" type="color" defaultVal="'transparent'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.closeButtons.color" type="color" defaultVal='#2D353C' :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="borderRadius" attr="style.closeButtons.borderRadius" type="text" defaultVal="'50%'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseDetails attr="modal" :level="3" title="style.chart.modal">
                    <BaseAttr name="backgroundColor" attr="style.chart.modal.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.modal.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="buttons" :level="4" title="style.chart.modal.buttons">
                        <BaseDetails attr="selected" :level="5" title="style.chart.modal.buttons.selected">
                            <BaseAttr name="backgroundColor" attr="style.chart.modal.buttons.selected.backgroundColor" type="color" defaultVal="#1F77B4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.modal.buttons.selected.color" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                        <BaseDetails attr="unselected" :level="5" title="style.chart.modal.buttons.unselected">
                            <BaseAttr name="backgroundColor" attr="style.chart.modal.buttons.unselected.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="color" attr="style.chart.modal.buttons.unselected.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="layout" :level="3" title="style.chart.layout">
                    <BaseAttr name="backgroundColor" attr="style.chart.layout.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="axis" :level="4" title="style.chart.layout.axis">
                        <BaseAttr name="stroke" attr="style.chart.layout.axis.stroke" type="color" defaultVal="#CCD1D4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.axis.strokeWidth" type="number" defaultVal="2" :min="1" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="bar" :level="4" title="style.chart.layout.bar">
                        <BaseAttr name="fill" attr="style.chart.layout.bar.fill" type="color" defaultVal="#1F77B4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.layout.bar.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="line" :level="4" title="style.chart.layout.line">
                        <BaseAttr name="smooth" attr="style.chart.layout.line.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useArea" attr="style.chart.layout.line.useArea" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stroke" attr="style.chart.layout.line.stroke" type="color" defaultVal="#1F77B4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.line.strokeWidth" type="number" defaultVal="4" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="plot" :level="5" title="style.chart.layout.line.plot">
                            <BaseAttr name="fill" attr="style.chart.layout.line.plot.fill" type="color" defaultVal="#1F77B4" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="strokeWidth" attr="style.chart.layout.line.plot.strokeWidth" type="number" defaultVal="1" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseDetails attr="radius" :level="6" title="style.chart.layout.line.plot.radius">
                                <BaseAttr name="selected" attr="style.chart.layout.line.plot.radius.selected" type="number" defaultVal="6" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                                <BaseAttr name="unselected" attr="style.chart.layout.line.plot.radius.unselected" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            </BaseDetails>
                        </BaseDetails>
                    </BaseDetails>
                    <BaseDetails attr="labels" :level="4" title="style.chart.layout.labels">
                        <BaseAttr name="color" attr="style.chart.layout.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="progression" :level="4" title="style.chart.layout.progression">
                        <BaseAttr name="stroke" attr="style.chart.layout.progression.stroke" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="strokeWidth" attr="style.chart.layout.progression.strokeWidth" type="number" defaultVal="2" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="stokeDasharray" attr="style.chart.layout.progression.strokeDasharray" type="number" defaultVal="4" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="timeLabels" :level="4" title="style.chart.layout.timeLabels">
                        <BaseAttr name="showOnlyAtModulo" attr="style.chart.layout.timeLabels.showOnlyAtModulo" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="modulo" attr="style.chart.layout.timeLabels.modulo" type="number" defaultVal="12" :min="2" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="zoom" :level="4" title="style.chart.layout.zoom">
                        <BaseAttr name="show" attr="style.chart.layout.zoom.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="datetimeFormatter" :level="4" title="style.chart.layout.datetimeFormatter">
                        <BaseAttr name="enable" attr="style.chart.layout.datetimeFormatter.enable" defaultVal="true" type="checkbox" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="locale" attr="style.chart.layout.datetimeFormatter.locale" type="text" defaultVal="en" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="useUTC" attr="style.chart.layout.datetimeFormatter.useUTC" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="januaryAsYear" attr="style.chart.layout.datetimeFormatter.januaryAsYear" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="options" :level="5" title="style.chart.layout.datetimeFormatter.options">
                            <BaseAttr name="year" attr="style.chart.layout.datetimeFormatter.options.year" type="text" defaultVal="yyyy" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="month" attr="style.chart.layout.datetimeFormatter.options.month" type="text" defaultVal="MMM 'yy" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="day" attr="style.chart.layout.datetimeFormatter.options.day" type="text" defaultVal="dd MMM" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="hour" attr="style.chart.layout.datetimeFormatter.options.hour" type="text" defaultVal="HH:mm" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="minute" attr="style.chart.layout.datetimeFormatter.options.minute" type="text" defaultVal="HH:mm:ss" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="second" attr="style.chart.layout.datetimeFormatter.options.second" type="text" defaultVal="HH:mm:ss" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="translations" :level="1">
            <BaseAttr name="average" attr="translations.average" type="text" defaultVal="'Average'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="by" attr="translations.by" type="text" defaultVal="'by'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="chooseCategoryColumn" attr="translations.chooseCategoryColumn" type="text" defaultVal="'Choose category column'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="exportAllButton" attr="translations.exportAllButton" type="text" defaultVal="'CSV all'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="exportAllLabel" attr="translations.exportAllLabel" type="text" defaultVal="'Export all rows of your current filtered dataset'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="exportPageButton" attr="translations.exportPageButton" type="text" defaultVal="'CSV page'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="exportPageLabel" attr="translations.exportPageLabel" type="text" defaultVal="'Export rows of the current page'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="from" attr="translations.from" type="text" defaultVal="'From'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="inputPlaceholder" attr="translations.inputPlaceholder" type="text" defaultVal="'Search...'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="makeDonut" attr="translations.makeDonut" type="text" defaultVal="'Generate'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="nb" attr="translations.nb" type="text" defaultVal="'Nb'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="page" attr="translations.page" type="text" defaultVal="'Page'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="paginatorLabel" attr="translations.paginatorLabel" type="text" defaultVal="'Rows per page'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="sizeWarning" attr="translations.sizeWarning" type="text" defaultVal="'Displaying too many rows at a time can lead to slower performance'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="sum" attr="translations.sum" type="text" defaultVal="'Sum'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="to" attr="translations.to" type="text" defaultVal="'To'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="total" attr="translations.total" type="text" defaultVal="'Total'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="totalRows" attr="translations.totalRows" type="text" defaultVal="'Total rows'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="filename" attr="translations.filename" type="text" defaultVal="'File name'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="xAxisLabels" attr="translations.xAxisLabels" type="text" defaultVal="'X axis labels'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        </BaseDetails>
    </BaseDetails>
</code>      
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
