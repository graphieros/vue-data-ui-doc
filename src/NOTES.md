Notes for 3.23.2

## Stanardize debug warnings #372

- Some warnings that should only be logged when users opt-in by setting `config.debug` to `true` were not. This is now fixed. It is recommended to set this flag with an environment variable, so you can benefit from them during developement (same goes with the `config.devHints.enable` flag). Note that some critical warnings will still be displayed, when they are related to a breaking outcome.

## Reduced package size through refactoring
