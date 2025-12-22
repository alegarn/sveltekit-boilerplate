import { ProjectConfig } from '../types.js';

export function getPageSvelte(config: ProjectConfig): string {
  const langAttr = config.devTools.includes('typescript') ? ' lang="ts"' : '';
  
  let content = `<script${langAttr}>
</script>

<div class="container">
  <h1>Welcome to SvelteKit</h1>
  <p>Your project has been generated with the following features:</p>
  <ul>`;

  if (config.devTools.includes('typescript')) {
    content += '\n    <li>✅ TypeScript</li>';
  }
  if (config.devTools.includes('eslint')) {
    content += '\n    <li>✅ ESLint</li>';
  }
  if (config.devTools.includes('vitest')) {
    content += '\n    <li>✅ Vitest</li>';
  }
  if (config.devTools.includes('playwright')) {
    content += '\n    <li>✅ Playwright</li>';
  }
  if (config.uiFramework !== 'none') {
    content += `\n    <li>✅ ${config.uiFramework === 'shadcn' ? 'svelte-shadcn UI' : 'Storybook'}</li>`;
  }
  if (config.database !== 'none') {
    content += `\n    <li>✅ ${config.database === 'postgresql' ? 'PostgreSQL' : 'Supabase'}</li>`;
  }
  if (config.backendTools.includes('trpc')) {
    content += '\n    <li>✅ tRPC-SvelteKit</li>';
  }
  if (config.backendTools.includes('zod')) {
    content += '\n    <li>✅ Zod</li>';
  }
  if (config.payment !== 'none') {
    content += `\n    <li>✅ ${config.payment === 'stripe' ? 'Stripe' : 'Paddle'}</li>`;
  }
  if (config.analytics) {
    content += '\n    <li>✅ Plausible Analytics</li>';
  }
  if (config.seo) {
    content += '\n    <li>✅ SEO Optimization</li>';
  }
  if (config.blog) {
    content += '\n    <li>✅ Blog with Markdown</li>';
  }
  if (config.auth !== 'none') {
    content += `\n    <li>✅ ${config.auth === 'authjs' ? 'Auth.js' : 'Lucia'}</li>`;
  }

  content += `
  </ul>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: system-ui, -apple-system, sans-serif;
  }

  h1 {
    color: #ff3e00;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem 0;
    font-size: 1.1rem;
  }
</style>
`;

  return content;
}
