<script setup>
import { ref, onMounted } from "vue";
const step = ref(0)
const step1 = ref(0);

const themePalettes = {
    concrete: [
        "#4A6A75",
        "#6C94A0",
        "#7DA9B5",
        "#8EBFCA",
        "#9FD4E0",
        "#B0E9F5",
        "#C1FFFF",
        "#5C6B5B",
        "#6D7D6D",
        "#7E8F7E",
        "#8FA290",
        "#A1B5A3",
        "#B2C7B5",
        "#C3DAC8",
        "#D4ECDA",
        "#E6FFF0",
        "#8A9CA5",
        "#9AA7B0",
        "#ABB1BC",
        "#BBCBC7",
        "#CCD6D3",
        "#DEE1DE",
        "#EFECEC",
        "#404C4D",
        "#50605F",
        "#617472",
        "#718885",
        "#829C98",
        "#92B0AB",
        "#A3C4BE",
        "#B3D8D2",
        "#C4EDE5",
        "#D4F1E8",
        "#404C5A",
        "#50606C",
        "#61747E",
        "#718890",
        "#829CA2",
        "#92B0B5"
    ],
    hack: [
        "#004C00",
        "#006600",
        "#008000",
        "#009900",
        "#00B300",
        "#00CC00",
        "#00E600",
        "#00FF00",
        "#33FF33",
        "#33E633",
        "#33CC33",
        "#33B333",
        "#339933",
        "#338033",
        "#336633",
        "#334C33",
        "#333333",
        "#00AF19",
        "#19E619",
        "#19CC19",
        "#19B319",
        "#199919",
        "#198019",
        "#196619",
        "#194C19",
        "#193319",
        "#191919",
        "#66FF66",
        "#66E666",
        "#66CC66",
        "#66B366",
        "#669966",
        "#668066",
        "#666666",
        "#4CFF4C",
        "#4CE64C",
        "#4CCC4C",
        "#4CB34C"
    ],
    zen: [
        "#B9B99D",
        "#E0CFC3",
        "#DFCA99",
        "#DCB482",
        "#C09E85",
        "#8F837A",
        "#858480",
        "#B0B9A8",
        "#606C5A",
        "#5E5E5E",
        "#4F5B75",
        "#647393",
        "#818EA9",
        "#9FA9BE",
        "#BBC4D3",
        "#DCDFE7",
        "#928A98",
        "#8A9892",
        "#B1A7AD",
        "#C5B8A7",
        "#EBD6CC",
        "#D7E0D2",
        "#E0D2D7",
        "#E0DBD2",
        "#D2E0DB",
        "#DBD2E0",
        "#C1B7A5",
        "#A5AFC1",
        "#E0DBD2",
        "#D2D7E0",
        "#F7EDE2",
        "#97ACB7",
        "#C4CBBC",
        "#C3C5C5",
        "#A0AC94"
    ]
};

const dataset = ref(
    [
        {
            name: "Parent 1",
            value: 100,
            children: [
                {
                    name: "P1 C1",
                    value: 70,
                },
                {
                    name: 'P1 C2',
                    value: 20
                },
                {
                    name: 'P1 C3',
                    value: 10,
                },
            ]
        },
        {
            name: "Parent 2",
            value: 110,
            children: [
                {
                    name: "P2 C1",
                    value: 80,
                },
                {
                    name: 'P2 C2',
                    value: 20
                },
                {
                    name: 'P2 C3',
                    value: 10,
                },
            ]
        },
        {
            name: "Parent 3",
            value: 50,
            children: [
                {
                    name: "P3 C1",
                    value: 20,
                },
                {
                    name: 'P3 C2',
                    value: 10
                },
                {
                    name: 'P3 C3',
                    value: 10
                },
                {
                    name: 'P3 C4',
                    value: 5
                },
                {
                    name: 'P3 C5',
                    value: 5
                },
            ]
        },
    ]
)

const config = ref({
    style: {
        chart: {
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            }
        }
    }
})

</script>

<template>
    <div class="my-4 grid grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiTreemap" :dataset="dataset" :config="{...config, theme: ''}" :key="`_1_${step1}`" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueUiTreemap :dataset="dataset" :config="{...config, theme: 'zen'}" :key="`_2_${step}`" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiTreemap" :dataset="dataset" :config="{...config, theme: 'concrete'}" :key="`_3_${step}`" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiTreemap" :dataset="dataset" :config="{...config, theme: 'hack'}" :key="`_4_${step}`" />
        </div>
    </div>
</template>