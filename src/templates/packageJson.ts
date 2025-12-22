import { ProjectConfig, PackageJson } from '../types.js';

export function getPackageJson(config: ProjectConfig): PackageJson {
  const scripts: Record<string, string> = {
    dev: 'vite dev',
    build: 'vite build',
    preview: 'vite preview'
  };

  const devDependencies: Record<string, string> = {
    '@sveltejs/adapter-auto': '^3.0.0',
    '@sveltejs/kit': '^2.0.0',
    '@sveltejs/vite-plugin-svelte': '^4.0.0',
    svelte: '^5.0.0',
    vite: '^5.0.0'
  };

  const dependencies: Record<string, string> = {};

  // TypeScript
  if (config.devTools.includes('typescript')) {
    devDependencies['typescript'] = '^5.3.3';
    devDependencies['@sveltejs/adapter-auto'] = '^3.0.0';
    scripts['check'] = 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json';
    scripts['check:watch'] = 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch';
  }

  // ESLint
  if (config.devTools.includes('eslint')) {
    devDependencies['eslint'] = '^8.56.0';
    devDependencies['eslint-plugin-svelte'] = '^2.35.1';
    if (config.devTools.includes('typescript')) {
      devDependencies['@typescript-eslint/eslint-plugin'] = '^6.16.0';
      devDependencies['@typescript-eslint/parser'] = '^6.16.0';
    }
    scripts['lint'] = 'eslint .';
  }

  // Vitest
  if (config.devTools.includes('vitest')) {
    devDependencies['vitest'] = '^1.0.0';
    devDependencies['@vitest/ui'] = '^1.0.0';
    scripts['test'] = 'vitest';
    scripts['test:ui'] = 'vitest --ui';
  }

  // Playwright
  if (config.devTools.includes('playwright')) {
    devDependencies['@playwright/test'] = '^1.40.0';
    scripts['test:e2e'] = 'playwright test';
  }

  // Zod
  if (config.backendTools.includes('zod')) {
    dependencies['zod'] = '^3.22.4';
  }

  // tRPC
  if (config.backendTools.includes('trpc')) {
    dependencies['@trpc/server'] = '^10.45.0';
    dependencies['@trpc/client'] = '^10.45.0';
    dependencies['trpc-sveltekit'] = '^3.7.0';
  }

  // Database
  if (config.database === 'postgresql') {
    dependencies['pg'] = '^8.11.3';
    if (config.devTools.includes('typescript')) {
      devDependencies['@types/pg'] = '^8.10.9';
    }
  } else if (config.database === 'supabase') {
    dependencies['@supabase/supabase-js'] = '^2.39.0';
  }

  // Auth
  if (config.auth === 'authjs') {
    dependencies['@auth/core'] = '^0.18.6';
    dependencies['@auth/sveltekit'] = '^0.9.3';
  } else if (config.auth === 'lucia') {
    dependencies['lucia'] = '^3.0.1';
  }

  // Payment
  if (config.payment === 'stripe') {
    dependencies['stripe'] = '^14.10.0';
  } else if (config.payment === 'paddle') {
    dependencies['@paddle/paddle-js'] = '^1.2.0';
  }

  // UI Framework
  if (config.uiFramework === 'shadcn') {
    dependencies['tailwindcss'] = '^3.4.0';
    dependencies['autoprefixer'] = '^10.4.16';
    dependencies['postcss'] = '^8.4.32';
    devDependencies['@tailwindcss/forms'] = '^0.5.7';
  } else if (config.uiFramework === 'storybook') {
    devDependencies['@storybook/svelte'] = '^7.6.6';
    devDependencies['@storybook/sveltekit'] = '^7.6.6';
    devDependencies['@storybook/addon-essentials'] = '^7.6.6';
    devDependencies['@storybook/addon-interactions'] = '^7.6.6';
    devDependencies['@storybook/addon-links'] = '^7.6.6';
    scripts['storybook'] = 'storybook dev -p 6006';
    scripts['build-storybook'] = 'storybook build';
  }

  // Blog (markdown support)
  if (config.blog) {
    dependencies['marked'] = '^11.1.1';
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
