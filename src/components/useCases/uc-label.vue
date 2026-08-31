<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useMainStore } from "../../stores";
import BaseDialog from "../BaseDialog.vue";
import VueUiLabel from "vue-data-ui/vue-ui-label";
import { createUid } from "../maker/lib";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const datasetLine = computed(() => [
    {
        name: "Series A",
        series: [8, 12, 13, 25, 31, 42, 32, 2, 16, 19, 15, 32, 64, 12],
        type: "line",
    },
]);

const configLine = computed(() => ({
    chart: {
        padding: {
            bottom: 12,
        },
        legend: { show: false },
        userOptions: { show: false },
        zoom: { show: false },
    },
}));

const labels = ref([]);

const inputs = ref({
    title: "",
    content: "",
    position: "top",
    marker: "",
    color: null,
    textColor: "#1A1A1A",
    backgroundColor: "#FFFFFF",
});

const dialogOpen = ref(false);
const selectedIndex = ref(null);

async function addLabel() {
    labels.value.push({
        index: selectedIndex.value,
        title: inputs.value.title,
        content: inputs.value.content,
        position: inputs.value.position,
        marker: inputs.value.marker,
        color: inputs.value.color,
        textColor: inputs.value.textColor,
        backgroundColor: inputs.value.backgroundColor,
        id: createUid(),
    });
    await nextTick();
    dialogOpen.value = false;
}

function openDialog({ index }) {
    selectedIndex.value = index;
    dialogOpen.value = !dialogOpen.value;
}

const isUpdate = ref(false);
const labelToUpdate = ref(null);

watch(dialogOpen, (isOpen) => {
    if (!isOpen) {
        selectedIndex.value = null;
        inputs.value.title = "";
        inputs.value.content = "";
        inputs.value.position = "top";
        inputs.value.marker = "";
        inputs.value.color = null;
        inputs.value.textColor = "#1A1A1A";
        inputs.value.backgroundColor = "#FFFFFF";
        isUpdate.value = false;
        labelToUpdate.value = null;
    }
});

function getLabel(label, svg) {
    const plot = svg.data[0].plots[label.index];
    return {
        dataset: { x: plot.x, y: plot.y },
        config: {
            position: label.position,
            title: {
                text: label.title,
                color: label.textColor,
                marker: {
                    color: label.color,
                    shape: label.marker,
                },
            },
            content: {
                text: label.content,
                color: label.textColor,
            },
            box: {
                backgroundColor: label.backgroundColor,
            },
            drag: {
                iconColor: label.textColor,
            },
        },
    };
}

async function editLabel(label) {
    isUpdate.value = true;
    await nextTick();
    labelToUpdate.value = label;
    inputs.value.title = label.title;
    inputs.value.content = label.content;
    inputs.value.position = label.position;
    inputs.value.marker = label.marker ?? "";
    inputs.value.color = label.color ?? null;
    inputs.value.textColor = label.textColor ?? "#1A1A1A";
    inputs.value.backgroundColor = label.backgroundColor ?? "#FFFFFF";
}

const labelStep = ref(0);

function saveLabel() {
    const thisLabel = labels.value.find((l) => l.id === labelToUpdate.value.id);
    thisLabel.title = inputs.value.title;
    thisLabel.content = inputs.value.content;
    thisLabel.position = inputs.value.position;
    thisLabel.marker = inputs.value.marker;
    thisLabel.color = inputs.value.color;
    thisLabel.textColor = inputs.value.textColor;
    thisLabel.backgroundColor = inputs.value.backgroundColor;
    dialogOpen.value = false;
    labelStep.value += 1;
}

function deleteLabel() {
    labels.value = labels.value.filter((l) => l.id !== labelToUpdate.value.id);
    dialogOpen.value = false;
}

function endDialog() {
    return isUpdate.value ? saveLabel() : addLabel();
}

const description = ref({
    en: "Click on the chart to add, edit or delete labels.",
    fr: "Cliquez sur le graphique pour ajouter, modifier ou supprimer des étiquettes.",
    pt: "Clique no gráfico para adicionar, editar ou excluir rótulos.",
    de: "Klicken Sie auf das Diagramm, um Beschriftungen hinzuzufügen, zu bearbeiten oder zu löschen.",
    zh: "点击图表以添加、编辑或删除标签。",
    ja: "グラフをクリックしてラベルを追加、編集、または削除します。",
    es: "Haz clic en el gráfico para añadir, editar o eliminar etiquetas.",
    ko: "차트를 클릭하여 레이블을 추가, 편집 또는 삭제하세요.",
    ar: "انقر على المخطط لإضافة التسميات أو تعديلها أو حذفها.",
});

const seeHow = ref({
    en: `See how it's made`,
    fr: `Voir comment c'est fait`,
    pt: `Veja como é feito`,
    de: `Sehen Sie, wie es gemacht wird`,
    zh: `看看它是如何制作的`,
    ja: `作り方を見る`,
    es: `Ver cómo está hecho`,
    ko: `어떻게 만들어졌는지 보기`,
    ar: `شاهد كيف تم إنشاؤه`,
});
</script>

<template>
    <div class="mb-6">
        <h3 class="">{{ description[store.lang] }}</h3>
        <a
            class="text-blue-500 underline"
            target="_blank"
            href="https://github.com/graphieros/vue-data-ui-doc/blob/master/src/components/useCases/uc-label.vue"
            >{{ seeHow[store.lang] }}</a
        >
    </div>
    <div class="bg-white p-4 rounded">
        <VueUiXy
            :dataset="datasetLine"
            :config="configLine"
            @selectX="openDialog"
        >
            <template #svg="{ svg }">
                <g v-if="labels.length">
                    <VueUiLabel
                        @click="() => editLabel(label)"
                        v-for="label in labels"
                        :key="`label_${label.index}_${labelStep}`"
                        v-bind="getLabel(label, svg)"
                    />
                </g>
            </template>
        </VueUiXy>
    </div>
    <BaseDialog v-model="dialogOpen">
        <template #title>
            {{ isUpdate ? "Edit a label" : "Add a new label" }}
        </template>
        <div class="flex flex-col gap-4">
            <label class="flex flex-col gap-1">
                Title
                <div class="relative w-full">
                    <input
                        v-model="inputs.title"
                        class="w-full bg-white dark:bg-[#3A3A3A] pl-2 pr-6"
                    />
                    <button
                        @click="inputs.title = ''"
                        class="absolute top-1/2 right-2 -translate-y-1/2"
                        v-if="inputs.title"
                    >
                        <VueUiIcon
                            name="close"
                            :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"
                            :size="16"
                        />
                    </button>
                </div>
            </label>

            <div class="flex flex-row flex-wrap gap-4">
                <label class="flex flex-row gap-2">
                    Marker shape
                    <select
                        v-model="inputs.marker"
                        class="bg-gray-200 dark:bg-[#3A3A3A] px-1"
                    >
                        <option></option>
                        <option>circle</option>
                        <option>triangle</option>
                        <option>square</option>
                        <option>diamond</option>
                        <option>pentagon</option>
                        <option>hexagon</option>
                    </select>
                </label>

                <label class="flex flex-row gap-2">
                    Marker color
                    <input type="color" v-model="inputs.color" />
                </label>
            </div>

            <div class="flex flex-row flex-wrap gap-4">
                <label class="flex flex-row gap-2">
                    Background color
                    <input type="color" v-model="inputs.backgroundColor" />
                </label>
                <label class="flex flex-row flex-wrap gap-4">
                    Text color
                    <input type="color" v-model="inputs.textColor" />
                </label>
            </div>

            <label class="flex flex-col gap-1">
                Content
                <div class="relative v-full">
                    <textarea
                        v-model="inputs.content"
                        class="w-full bg-white dark:bg-[#3A3A3A] rounded-md border border-gray-200 dark:border-gray-600 pl-2 pr-6"
                    />
                    <button
                        @click="inputs.content = ''"
                        class="absolute top-4 right-2 -translate-y-1/2"
                        v-if="inputs.content"
                    >
                        <VueUiIcon
                            name="close"
                            :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"
                            :size="16"
                        />
                    </button>
                </div>
            </label>
            <label class="flex flex-row gap-4">
                Position
                <select
                    v-model="inputs.position"
                    class="bg-gray-200 dark:bg-[#3A3A3A] px-1"
                >
                    <option>top</option>
                    <option>right</option>
                    <option>bottom</option>
                    <option>left</option>
                </select>
            </label>
        </div>
        <div class="flex flex-row gap-2 justify-end mt-6">
            <button
                @click="dialogOpen = false"
                class="p-2 px-4 border rounded-md border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#FFFFFF10] transition-colors"
            >
                CANCEL
            </button>
            <button
                v-if="isUpdate"
                @click="deleteLabel"
                class="p-2 px-4 border rounded-md border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#FFFFFF10] transition-colors"
            >
                DELETE LABEL
            </button>
            <button
                :disabled="!inputs.title && !inputs.content"
                @click="endDialog"
                class="p-2 px-4 border rounded-md border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#FFFFFF10] transition-colors"
                :class="`${!inputs.title && !inputs.content ? 'cursor-not-allowed opacity-20' : ''}`"
            >
                {{ isUpdate ? "EDIT LABEL" : "ADD LABEL" }}
            </button>
        </div>
    </BaseDialog>
</template>
