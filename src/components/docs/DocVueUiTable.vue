<script setup>
import { ref, computed } from "vue";
import Box from "../Box.vue";

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

        for (let i = 0; i < 1000; i += 1) {
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
        },
        exportMenu: {
            backgroundColor: "#1a1a1a",
            color: "#E1E5E8",
            buttons: {
                backgroundColor: "#42d392",
                color: "#2D353C"
            }
        },
        closeButtons: {
            backgroundColor: "transparent",
            color: "#2D353C",
            borderRadius: "50%"
        },
        chart: {
            modal: {
                backgroundColor: "#1a1a1a",
                color: "#E1E5E8"
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
                }
            },
        }
    },
    translations: {
        average: "Average",
        by: "by",
        chooseCategoryColumn: "Choose category column",
        exportAllButton: "XLSX all",
        exportAllLabel: "Export all rows of your current filtered dataset",
        exportPageButton: "XLSX page",
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
    },
    useChart: true
});

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));
const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
}

</script>

<template>
    <div class="text-center font-satoshi-bold text-app-green text-2xl mb-12">VueUiTable</div>
    <VueUiTable :dataset="mutableDataset" :config="mutableConfig"/>
    <Box>
        <template v-slot:tab0>
            Datastructure:
            <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        header: [
        
        ],
        body: [
        
        ]
    }
</code>
</pre>
            </div>
        </template>
        <template v-slot:tab1>
            <div class="w-ull overflow-x-auto">
                <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">RESET</button>
            </div>
<pre>
<code>
const <span class="text-app-blue">config</span> = {
    fontFamily: "inherit",
    maxHeight: <input type="number" min="100" max="5000" v-model="mutableConfig.maxHeight">, (default: 500)
    rowsPerPage: 25,
    style: {
        th: {
            backgroundColor: <input type="color" v-model="mutableConfig.style.th.backgroundColor">, (default: #E1E5E8")
            color: <input type="color" v-model="mutableConfig.style.th.color">, (default: "#2D353C"),
            outline: <input type="text" v-model="mutableConfig.style.th.outline">, (default: "1px solid #FFFFFF")
            selected: {
                backgroundColor: <input type="color" v-model="mutableConfig.style.th.selected.backgroundColor">, (default: "#6376DD")
                color: <input type="color" v-model="mutableConfig.style.th.selected.color">, (default: "#FFFFFF")
            }
        },
        rows: {
            even: {
                backgroundColor: <input type="color" v-model="mutableConfig.style.rows.even.backgroundColor">, (default: "#f3f5f7")
                color: <input type="color" v-model="mutableConfig.style.rows.even.color">, (default: "#2D353C")
                selectedCell: {
                    backgroundColor: <input type="text" v-model="mutableConfig.style.rows.even.selectedCell.backgroundColor">, (default: "#6375dd5b")
                    color: <input type="color" v-model="mutableConfig.style.rows.even.selectedCell.color">, (default: "#2D353C")
                },
                selectedNeighbors: {
                    backgroundColor: <input type="text" v-model="mutableConfig.style.rows.even.selectedNeighbors.backgroundColor">, (selectedNeighbors: "#63dd821e")
                    color: <input type="color" v-model="mutableConfig.style.rows.even.selectedNeighbors.color">, (default: "#2D353C")
                }
            },
            odd: {
                backgroundColor: <input type="color" v-model="mutableConfig.style.rows.odd.backgroundColor">, (default: "#FFFFFF")
                color: <input type="color" v-model="mutableConfig.style.rows.odd.color">, (default: "#2D353C")
                selectedCell: {
                    backgroundColor: <input type="text" v-model="mutableConfig.style.rows.odd.selectedCell.backgroundColor">, (default: '#6375dd5b')
                    color: <input type="color" v-model="mutableConfig.style.rows.odd.selectedCell.color"> (default: "#2D353C")
                },
                selectedNeighbors: {
                    backgroundColor: <input type="text" v-model="mutableConfig.style.rows.even.selectedNeighbors.backgroundColor">, (default: "#63dd821e")
                    color: <input type="color" v-model="mutableConfig.style.rows.odd.selectedNeighbors.color">, (default: "#2D353C")
                }
            },
        },
        inputs: {
            backgroundColor: <input type="color" v-model="mutableConfig.style.inputs.backgroundColor">, (default: "#FFFFFF"),
            color: <input type="color" v-model="mutableConfig.style.inputs.color">, (default: "#2D353C"),
            border: <input type="text" v-model="mutableConfig.style.inputs.border">, (default: "1px solid #CCCCCC")
            accentColor: <input type="color" v-model="mutableConfig.style.inputs.accentColor">, (default: "#6376DD")
        },
        dropdowns: {
            backgroundColor: <input type="color" v-model="mutableConfig.style.dropdowns.backgroundColor">, (default: "#E1E5E8")
            color: <input type="color" v-model="mutableConfig.style.dropdowns.color">, (default: "#2D353C")
            icons: {
                selected: {
                    color: <input type="color" v-model="mutableConfig.style.dropdowns.icons.selected.color">, (default: "#008000"),
                    unicode: <input type="text" v-model="mutableConfig.style.dropdowns.icons.selected.unicode">, (default: "✔")
                },
                unselected: {
                    color: <input type="color" v-model="mutableConfig.style.dropdowns.icons.unselected.color">, (default: "#ff0000")
                    unicode: <input type="text" v-model="mutableConfig.style.dropdowns.icons.unselected.unicode">, (default: "✖")
                }
            }
        },
        infoBar: {
            backgroundColor: <input type="color" v-model="mutableConfig.style.infoBar.backgroundColor">, (default: "#E1E5E8")
            color: <input type="color" v-model="mutableConfig.style.infoBar.color">, (default: "#2D353C")
        },
        pagination: {
            buttons: {
                backgroundColor: <input type="color" v-model="mutableConfig.style.pagination.buttons.backgroundColor">, (default: "#E1E5E8")
                color: <input type="color" v-model="mutableConfig.style.pagination.buttons.color">, (default: "#2D353C")
                opacityDisabled: <input type="number" min="0" max="1" step="0.1" v-model="mutableConfig.style.pagination.buttons.opacityDisabled">, (default: 0.5)
            },
        },
        exportMenu: {
            backgroundColor: <input type="color" v-model="mutableConfig.style.exportMenu.backgroundColor">, (default: "#E1E5E8")
            color: <input type="color" v-model="mutableConfig.style.exportMenu.color">, (default: "#2D353C")
            buttons: {
                backgroundColor: <input type="color" v-model="mutableConfig.style.exportMenu.buttons.backgroundColor">, (default: "#FAFAFA")
                color: <input type="color" v-model="mutableConfig.style.exportMenu.buttons.color">, (default: "#2D353C")
            }
        },
        closeButtons: {
            backgroundColor: "transparent",
            color: <input type="color" v-model="mutableConfig.style.closeButtons.color">,  (default: "#2D353C")
            borderRadius: <input type="text" v-model="mutableConfig.style.closeButtons.borderRadius">, (default: "50%")
        },
        chart: {
            modal: {
                backgroundColor: <input type="color" v-model="mutableConfig.style.chart.modal.backgroundColor">, (default: "#E1E5E8")
                color: <input type="color" v-model="mutableConfig.style.chart.modal.color">, (default: "#2D353C")
            },
            layout: {
                backgroundColor: <input type="color" v-model="mutableConfig.style.chart.layout.backgroundColor">, (default: "#FFFFFF")
                axis: {
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.axis.stroke">, (default: "#CCD1D4")
                    strokeWidth: <input type="number" min="0" max="10" step="0.2" v-model="mutableConfig.style.chart.layout.axis.strokeWidth">, (default: 2)
                },
                bar: {
                    fill: <input type="color" v-model="mutableConfig.style.chart.layout.bar.fill">, (default: custom gradient)
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.bar.stroke">, (default: "#FFFFFF")
                },
                line: {
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.line.stroke">, (default: "#6376DD")
                    strokeWidth: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.strokeWidth">, (default: 4)
                    plot: {
                        fill: <input type="color" v-model="mutableConfig.style.chart.layout.line.plot.fill">, (default: "#22348f")
                        stroke: <input type="color" v-model="mutableConfig.style.chart.layout.line.plot.stroke">, (default: "#FFFFFF")
                        strokeWidth: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.plot.strokeWidth">, (default: 1)
                        radius: {
                            selected: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.plot.radius.selected"> (default: 6)
                            unselected: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.plot.radius.unselected"> (default: 4)
                        }
                    },
                    selector: {
                        stroke: <input type="color" v-model="mutableConfig.style.chart.layout.line.selector.stroke">, (default: "#CCCCCC")
                        strokeWidth: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.selector.strokeWidth"> (default: 4)
                        strokeDasharray: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.line.selector.strokeDasharray"> (default: 5)
                    },
                },
                labels: {
                    color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.color">, (default: "#2D353C")
                },
                progression: {
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.progression.stroke">, (default: "#2D353C")
                    strokeWidth: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.progression.strokeWidth">, (default: 2)
                    strokeDasharray: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.progression.strokeDasharray">, (default: 4)
                    arrowSize: <input type="number" min="0" max="20" step="0.2" v-model="mutableConfig.style.chart.layout.progression.arrowSize">, (default:7)
                }
            },
        }
    },
    translations: {
        average: <input type="text" v-model="mutableConfig.translations.average">, (default: "Average")
        by: <input type="text" v-model="mutableConfig.translations.by">, (default: "by")
        chooseCategoryColumn: <input type="text" v-model="mutableConfig.translations.chooseCategoryColumn">, (default: "Choose category column")
        exportAllButton: <input type="text" v-model="mutableConfig.translations.exportAllButton">, (default "XLSX all")
        exportAllLabel: <input type="text" v-model="mutableConfig.translations.exportAllLabel">, (default: "Export all rows of your current filtered dataset")
        exportPageButton: <input type="text" v-model="mutableConfig.translations.exportPageButton">, (default: "XLSX page")
        exportPageLabel: <input type="text" v-model="mutableConfig.translations.exportPageLabel">, (default: "Export rows of the current page")
        from: <input type="text" v-model="mutableConfig.translations.from">, (default: "From")
        inputPlaceholder: <input type="text" v-model="mutableConfig.translations.inputPlaceholder">, (default: "Search...")
        makeDonut: <input type="text" v-model="mutableConfig.translations.makeDonut">, (default: "Generate")
        nb: <input type="text" v-model="mutableConfig.translations.nb">, (default: "Nb")
        page: <input type="text" v-model="mutableConfig.translations.page">, (default: "Page")
        paginatorLabel: <input type="text" v-model="mutableConfig.translations.paginatorLabel">, (default: "Rows per page")
        sizeWarning: <input type="text" v-model="mutableConfig.translations.sizeWarning">, (default: "Displaying too many rows at a time can lead to slower performance")
        sum: <input type="text" v-model="mutableConfig.translations.sum"> "Sum",
        to: <input type="text" v-model="mutableConfig.translations.to">, (default: "To")
        total: <input type="text" v-model="mutableConfig.translations.total">, (default: "Total")
        totalRows: <input type="text" v-model="mutableConfig.translations.totalRows"> (default: "Total rows")
    },
    useChart: <input type="checkbox" v-model="mutableConfig.useChart">, (default: true)
}
</code>
</pre>         
        </template>
    </Box>
</template>

<style>
.invisible-cell {
    background: rgb(26,26,26) !important;
    outline: 1px solid rgb(26,26,26) !important;
}
</style>