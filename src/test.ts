import { generateProject } from './generator.js';
import { ProjectConfig } from './types.js';

// Test with a comprehensive configuration
const testConfig: ProjectConfig = {
  projectName: 'test-sveltekit-app',
  devTools: ['typescript', 'eslint', 'vitest', 'playwright'],
  uiFramework: 'shadcn',
  database: 'supabase',
  backendTools: ['trpc', 'zod'],
  payment: 'stripe',
  analytics: true,
  seo: true,
  blog: true,
  auth: 'authjs'
};

async function test() {
  console.log('Testing project generation with full configuration...');
  
  try {
    await generateProject(testConfig);
    console.log('✓ Project generated successfully!');
    console.log('\nGenerated project:', testConfig.projectName);
  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  }
}

test();
