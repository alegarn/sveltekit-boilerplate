export default function routesFeaturesReadme(projectName = ''): string {
  return `# Features

This directory contains optional, pluggable features for ${projectName || 'your app'}.

Each feature should live in its own folder inside (features) and can contain routes, components, and utilities that are enabled or configured by the main application.

Guidelines
- Create a subfolder for each feature (for example: auth, payments, analytics).
- Each feature can export SvelteKit routes (e.g. +page.svelte, +layout.svelte) or server endpoints.
- Keep feature code self-contained and document configuration in the feature folder's README.

Example
- (features)/auth/+page.svelte
- (features)/payments/+page.svelte

`;
}
