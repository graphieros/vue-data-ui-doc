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

Use Node.js 22.13.0 or newer and **pnpm 12.15.0**, pinned in
`package.json`. Use pnpm for all repository commands.

Install the pinned pnpm release on macOS/Linux with the official installer:

```sh
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=12.15.0 sh -
```

On Windows, use the [official installation instructions](https://pnpm.io/installation)
and select version 12.15.0. Confirm `pnpm --version` prints `12.15.0`.

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

`pnpm test` runs all three Node.js regression suites above.
`pnpm lint:fix` applies lint fixes and
`pnpm pretty` formats the repository.

For automation and deployment, install pnpm 12.15.0, run
`pnpm install --frozen-lockfile`, then `pnpm build`; deploy `dist/`.
If caching dependencies, cache the path returned by `pnpm store path`, keyed
by `pnpm-lock.yaml`. Keep the lockfile updated with dependency changes.

`pnpm-workspace.yaml` approves only the SSH native build scripts.
The informational core-js script is disabled.
Review new dependency build scripts individually before approving them.

pnpm's default 24-hour release-age policy remains enabled for dependencies.
`vue-data-ui` is excluded so this documentation site can use new library releases
immediately.

`pnpm run upgrade` runs the existing library patch-version update utility, installs
dependencies, and starts development. `pnpm site` runs the local deployment
script when it is available (the deployment script is excluded from the repository).

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
