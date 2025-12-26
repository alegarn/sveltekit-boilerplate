# Features (Pluggable Modules)

This project supports **pluggable features** under `src/features/<feature-id>`.
A feature can contribute:

- **Routes** (templates) copied into `src/routes/(features)/<feature-id>`
- **Server hooks** (optional) composed in `src/hooks.server.ts`

The goal is to keep `src/routes` clean and allow enabling/disabling large chunks
of app functionality by configuration.

## Quick start

Enabled features are configured in:

- `src/features/features.config.js`

Example:

```js
export default {
  enabled: ['basic-pages']
};
```

Then generate routes:

```bash
npm run generate-features
```

## Route generation

The generator copies from:

- `src/features/<feature-id>/routes/**`

into:

- `src/routes/(features)/<feature-id>/**`

It is **idempotent**: by default it will **not overwrite existing destination files**.

### Options

- `--force` overwrite destination files
- `--clean` remove `src/routes/(features)` first, then regenerate

Examples:

```bash
npm run generate-features -- --clean
npm run generate-features -- --clean --force
```

### Skipping generation

Set the environment variable below to skip generation (useful in CI or when you
manage routes differently):

```bash
SKIP_FEATURES_GENERATE=1 npm run generate-features
```

## Adding a feature

1. Create a folder:

   `src/features/<feature-id>/`

2. Add a manifest:

   `src/features/<feature-id>/manifest.ts`

   The manifest follows `src/features/_types.ts`.

3. Add route templates (optional):

   `src/features/<feature-id>/routes/...`

4. (Optional) Provide server hooks via the manifest:

```ts
const manifest: FeatureManifest = {
  id: 'my-feature',
  name: 'My Feature',
  hooks: async () => ({
    handle: async ({ event, resolve }) => {
      // do something
      return resolve(event);
    }
  })
};
```

5. Enable it in `src/features/features.config.js` and run the generator.

## Removing (disabling) a feature

1. Remove the feature id from `enabled` in `src/features/features.config.js`.
2. Run:

```bash
npm run generate-features -- --clean
```

(or manually delete the corresponding folder under `src/routes/(features)`)

## Included example: `basic-pages`

A sample feature is included at `src/features/basic-pages` that contributes an
`/about` page.
