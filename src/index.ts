#!/usr/bin/env node

import prompts from 'prompts';
import { generateProject } from './generator.js';
import { intro, outro, cancel } from './utils.js';

async function main() {
  intro();

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project name?',
      initial: 'my-sveltekit-app'
    },
    {
      type: 'multiselect',
      name: 'devTools',
      message: 'Select development tools:',
      choices: [
        { title: 'ESLint', value: 'eslint', selected: true },
        { title: 'TypeScript', value: 'typescript', selected: true },
        { title: 'Playwright (E2E testing)', value: 'playwright' },
        { title: 'Vitest (Unit testing)', value: 'vitest' }
      ],
      hint: '- Space to select. Return to submit'
    },
    {
      type: 'select',
      name: 'uiFramework',
      message: 'Choose a UI framework:',
      choices: [
        { title: 'None', value: 'none' },
        { title: 'svelte-shadcn UI', value: 'shadcn' },
        { title: 'Storybook', value: 'storybook' }
      ]
    },
    {
      type: 'select',
      name: 'database',
      message: 'Choose a database:',
      choices: [
        { title: 'None', value: 'none' },
        { title: 'PostgreSQL', value: 'postgresql' },
        { title: 'Supabase', value: 'supabase' }
      ]
    },
    {
      type: 'multiselect',
      name: 'backendTools',
      message: 'Select type-safe backend tools:',
      choices: [
        { title: 'tRPC-SvelteKit', value: 'trpc' },
        { title: 'Zod (validation)', value: 'zod', selected: true }
      ],
      hint: '- Space to select. Return to submit'
    },
    {
      type: 'select',
      name: 'payment',
      message: 'Choose a payment provider:',
      choices: [
        { title: 'None', value: 'none' },
        { title: 'Stripe', value: 'stripe' },
        { title: 'Paddle', value: 'paddle' }
      ]
    },
    {
      type: 'confirm',
      name: 'analytics',
      message: 'Include Plausible Analytics?',
      initial: false
    },
    {
      type: 'confirm',
      name: 'seo',
      message: 'Include SEO optimization (dynamic OG images, sitemap.xml, robots.txt)?',
      initial: true
    },
    {
      type: 'confirm',
      name: 'blog',
      message: 'Include Blog with Markdown support?',
      initial: false
    },
    {
      type: 'select',
      name: 'auth',
      message: 'Choose an authentication library:',
      choices: [
        { title: 'None', value: 'none' },
        { title: 'Auth.js', value: 'authjs' },
        { title: 'Lucia', value: 'lucia' }
      ]
    }
  ], {
    onCancel: () => {
      cancel();
      process.exit(0);
    }
  });

  console.log('\n📦 Generating your SvelteKit project...\n');

  try {
    await generateProject(response);
    outro(response.projectName);
  } catch (error) {
    console.error('❌ Error generating project:', error);
    process.exit(1);
  }
}

main();
