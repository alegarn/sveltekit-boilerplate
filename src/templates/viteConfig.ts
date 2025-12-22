import { ProjectConfig } from '../types.js';

export function getViteConfig(config: ProjectConfig): string {
  const imports = ["import { sveltekit } from '@sveltejs/kit/vite';", "import { defineConfig } from 'vite';"];
  
  if (config.devTools.includes('vitest')) {
    imports.push("import { configDefaults } from 'vitest/config';");
  }

  let testConfig = '';
  if (config.devTools.includes('vitest')) {
    testConfig = `,
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: [...configDefaults.exclude]
  }`;
  }

  return `${imports.join('\n')}

export default defineConfig({
  plugins: [sveltekit()]${testConfig}
});
`;
}
