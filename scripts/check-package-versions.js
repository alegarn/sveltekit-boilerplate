#!/usr/bin/env node

/**
 * Utility script to fetch the latest versions of all packages used in the boilerplate generator.
 * Run this script to check for package updates before releasing a new version.
 * 
 * Usage: node scripts/check-package-versions.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const packages = [
  // Core SvelteKit packages
  '@sveltejs/adapter-auto',
  '@sveltejs/kit',
  '@sveltejs/vite-plugin-svelte',
  'svelte',
  'vite',
  
  // Development tools
  'typescript',
  'eslint',
  'eslint-plugin-svelte',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'vitest',
  '@vitest/ui',
  '@playwright/test',
  
  // Backend & Validation
  'zod',
  '@trpc/server',
  '@trpc/client',
  'trpc-sveltekit',
  
  // Database
  'pg',
  '@types/pg',
  '@supabase/supabase-js',
  
  // Authentication
  '@auth/core',
  '@auth/sveltekit',
  'lucia',
  
  // Payment
  'stripe',
  '@paddle/paddle-js',
  
  // UI & Styling
  'tailwindcss',
  'autoprefixer',
  'postcss',
  '@tailwindcss/forms',
  
  // Storybook
  '@storybook/svelte',
  '@storybook/sveltekit',
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@storybook/addon-links',
  
  // Content
  'marked',
  'gray-matter'
];

async function getPackageVersion(packageName) {
  try {
    const { stdout } = await execAsync(`npm view ${packageName} version`);
    return stdout.trim();
  } catch (error) {
    return 'not-found';
  }
}

async function checkAllPackages() {
  console.log('Fetching latest package versions...\n');
  console.log('Package Name → Latest Version');
  console.log('='.repeat(60));
  
  const results = [];
  
  for (const pkg of packages) {
    const version = await getPackageVersion(pkg);
    const display = `${pkg} → ${version}`;
    console.log(display);
    results.push({ package: pkg, version });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\nTo update packageJson.ts, copy the versions above and update');
  console.log('the corresponding version strings in src/templates/packageJson.ts');
  console.log('\nNote: Always test compatibility between packages after updating!');
  
  return results;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkAllPackages().catch(console.error);
}

export { checkAllPackages, getPackageVersion };
