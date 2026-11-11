# Vue Data UI official documentation website

<img width="1280" height="640" alt="image" src="https://github.com/user-attachments/assets/1e242a76-ed4d-4604-ae99-959789469aaf" />

<p>
Vue Data UI is a Vue 3 data visualization components library.
</p>

<p>
This repo contains the code for the <a href="https://vue-data-ui.graphieros.com/">documentation website</a>, designed to offer a maximum of information on the library and facilitate its usage.
</p>

<p>
The repo for the actual Vue Data UI library is available <a href="https://github.com/graphieros/vue-data-ui">here</a>.
</p>

## Contributions to the documentation website

Contributions are welcome:)

### Development

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Run linting and the existing Node.js regression suites with:

```sh
pnpm lint
pnpm test:doc-bindings
pnpm test:graph
pnpm test:types
```

`pnpm test` runs the existing Node.js suites, including builder coverage. `pnpm lint` rejects duplicate object keys.
`pnpm lint:fix` applies lint fixes and
`pnpm pretty` formats the repository.

The documentation chooser's “What would you like to display?” heading opens an
optional guide based on data shape and visualization goal. The builder's “Get
code” panel also offers “Share chart”. Chart data and configuration are encoded
in the link fragment; opening a link creates a tab-local draft and leaves saved
chart data intact. Large charts can still be exported with “Download”.

### Translations

Translations are setup on a Pinia store (useMainStore), and serve translations for the following languages:

<ul>
<li>Chinese (simplified)</li>
<li>English</li>
<li>French</li>
<li>German</li>
<li>Japanese</li>
<li>Korean</li>
<li>Portuguese</li>
<li>Spanish</li>
<li>Arabic</li>
</ul>

The quality of translations is probably varied, as some languages were AI generated.

### Features

The main features of the documentation website are the following:

<ul>
<li>Full docs page for each component</li>
<li>Quick components overview</li>
<li>Search engine for config attributes</li>
<li>Example charts</li>
<li>Customization tips</li>
<li>Chart builder</li>
<li>Package stats</li>
</ul>
