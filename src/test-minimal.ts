import { generateProject } from './generator.js';
import { ProjectConfig } from './types.js';

// Test with minimal configuration
const minimalConfig: ProjectConfig = {
  projectName: 'minimal-sveltekit-app',
  devTools: [],
  uiFramework: 'none',
  database: 'none',
  backendTools: [],
  payment: 'none',
  analytics: false,
  seo: false,
  blog: false,
  auth: 'none'
};

async function test() {
  console.log('Testing project generation with minimal configuration...');
  
  try {
    await generateProject(minimalConfig);
    console.log('✓ Minimal project generated successfully!');
    console.log('\nGenerated project:', minimalConfig.projectName);
  } catch (error) {
    console.error('✗ Error:', error);
    process.exit(1);
  }
}

test();
