## `VueUiDag`

New `focusOnNode` exposed method

```ts
import { type VueUiDagFocusOnNodeOptions } from "vue-data-ui/vue-ui-dag";
const chartRef = useTemplateRef("chartRef");

// Not really necessary, just for dev mode maybe
const message = ref<{ text: string; type: "success" | "error" }>({});

const focusOnNodeOptions: VueUiDagFocusOnNodeOptions = {
    smooth: true,
    duration: 300,
    zoomReset: true,
    zoom: null,
};

// Plug this method on a list of nodes for example
async function focusOnNode(id: string) {
    if (!chartRef.value) {
        return;
    }

    const success = await chartRef.value.focusOnNode(id, focusOnNodeOptions);

    if (success) {
        message.value = {
            text: `Successfully focused on node with id: ${id}`,
            type: "success",
        };
    } else {
        message.value = {
            text: `Invalid node id: ${id}`,
            type: "error",
        };
    }
}
```
