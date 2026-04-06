## a11y improvements

### Keyboard navigation in chart areas

- It is now possible to focus chart areas and cycle through datapoints using the keyboard.
- Navigation hints can be displayed, using the new #hint slot

```html
<VueUiXy :dataset :config>
    <template #hint="{ hint, isVisible }">
        <p v-if="isVisible">
            <!-- By default, the hint corresponds to the config.a11y.translations.keyboardNavgation text (see next point) -->
            {{ hint }}
        </p>
    </template>
</VueUiXy>
```

- New configuration attributes for sr elements related to the hidden data table and hints:

```js
const config = computed(() => ({
    a11y: {
        translations: {
            keyboardNavigation: 'Use the left and right, or up and down arrow keys to move between datapoints', // this is the default, but it can be simpler, like "Use ← → or ↑ ↓"
            tableAvailable: 'A data table for this chart is available below' // for screen readers
            tableCaption: 'Chart data table' // for screen readers
        }
    }
}));
```

- Legends are now keyboard navigable & actionable.
- The css of the chart when under focus can be overriden:

```css
.vue-data-ui-component svg:focus-visible {
    outline: 2px dashed green !important;
    border-radius: 1px;
}
```

## VueUiDonut #314

- Add configuration attributes to display name and percentage conditionally:

```js
const config = computed(() => ({
    style: {
        chart: {
            layout: {
                labels: {
                    percentage: {
                        show: true, // new
                    },
                    name: {
                        show: true, // new
                    },
                },
            },
        },
    },
}));
```

## Other

- CONTRIBUTE.md & README.md updates by
