import { ProjectConfig, PackageJson } from '../types.js';

export function getPackageJson(config: ProjectConfig): PackageJson {
  const scripts: Record<string, string> = {
    dev: 'vite dev',
    build: 'vite build',
    preview: 'vite preview'
  };

  const devDependencies: Record<string, string> = {
    '@sveltejs/adapter-auto': '^7.0.0',
    '@sveltejs/kit': '^2.49.2',
    '@sveltejs/vite-plugin-svelte': '^6.2.1',
    svelte: '^5.46.0',
    vite: '^7.3.0'
  };

  const dependencies: Record<string, string> = {};

  // TypeScript
  if (config.devTools.includes('typescript')) {
    devDependencies['typescript'] = '^5.9.3';
    devDependencies['@sveltejs/adapter-auto'] = '^7.0.0';
    scripts['check'] = 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json';
    scripts['check:watch'] = 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch';
  }

  // ESLint
  if (config.devTools.includes('eslint')) {
    devDependencies['eslint'] = '^9.39.2';
    devDependencies['eslint-plugin-svelte'] = '^3.13.1';
    if (config.devTools.includes('typescript')) {
      devDependencies['@typescript-eslint/eslint-plugin'] = '^8.50.1';
      devDependencies['@typescript-eslint/parser'] = '^8.50.1';
    }
    scripts['lint'] = 'eslint .';
  }

  // Vitest
  if (config.devTools.includes('vitest')) {
    devDependencies['vitest'] = '^4.0.16';
    devDependencies['@vitest/ui'] = '^4.0.16';
    scripts['test'] = 'vitest';
    scripts['test:ui'] = 'vitest --ui';
  }

  // Playwright
  if (config.devTools.includes('playwright')) {
    devDependencies['@playwright/test'] = '^1.57.0';
    scripts['test:e2e'] = 'playwright test';
  }

  // Zod
  if (config.backendTools.includes('zod')) {
    dependencies['zod'] = '^4.2.1';
  }

  // tRPC
  if (config.backendTools.includes('trpc')) {
    dependencies['@trpc/server'] = '^11.8.1';
    dependencies['@trpc/client'] = '^11.8.1';
    dependencies['trpc-sveltekit'] = '^3.6.3';
  }

  // Database
  if (config.database === 'postgresql') {
    dependencies['pg'] = '^8.16.3';
    if (config.devTools.includes('typescript')) {
      devDependencies['@types/pg'] = '^8.16.0';
    }
  } else if (config.database === 'supabase') {
    dependencies['@supabase/supabase-js'] = '^2.89.0';
  }

  // Auth
  if (config.auth === 'authjs') {
    dependencies['@auth/core'] = '^0.34.3';
    dependencies['@auth/sveltekit'] = '^1.11.1';
  } else if (config.auth === 'lucia') {
    dependencies['lucia'] = '^3.2.2';
  }

  // Payment
  if (config.payment === 'stripe') {
    dependencies['stripe'] = '^20.1.0';
  } else if (config.payment === 'paddle') {
    dependencies['@paddle/paddle-js'] = '^1.6.1';
  }

  // UI Framework
  if (config.uiFramework === 'shadcn') {
    dependencies['tailwindcss'] = '^4.1.18';
    dependencies['autoprefixer'] = '^10.4.23';
    dependencies['postcss'] = '^8.5.6';
    devDependencies['@tailwindcss/forms'] = '^0.5.11';
  } else if (config.uiFramework === 'storybook') {
    devDependencies['@storybook/svelte'] = '^10.1.10';
    devDependencies['@storybook/sveltekit'] = '^10.1.10';
    devDependencies['@storybook/addon-essentials'] = '^8.6.14';
    devDependencies['@storybook/addon-interactions'] = '^8.6.14';
    devDependencies['@storybook/addon-links'] = '^10.1.10';
    scripts['storybook'] = 'storybook dev -p 6006';
    scripts['build-storybook'] = 'storybook build';
  }

  // Blog (markdown support)
  if (config.blog) {
    dependencies['marked'] = '^17.0.1';
    dependencies['gray-matter'] = '^4.0.3';
  }

  return {
    name: config.projectName,
    version: '0.0.1',
    private: true,
    scripts,
    devDependencies,
    dependencies,
    type: 'module'
  };
}
