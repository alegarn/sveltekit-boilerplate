import { ProjectConfig } from '../types.js';

export function getSvelteConfig(config: ProjectConfig): string {
  return `import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter()
  }
};

export default config;
`;
}
