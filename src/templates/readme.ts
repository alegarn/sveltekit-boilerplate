import { ProjectConfig } from '../types.js';

export function getReadme(config: ProjectConfig): string {
  let readme = `# ${config.projectName}

A SvelteKit application generated with create-sveltekit-boilerplate.

## Features

`;

  if (config.devTools.includes('typescript')) {
    readme += '- ✅ TypeScript\n';
  }
  if (config.devTools.includes('eslint')) {
    readme += '- ✅ ESLint\n';
  }
  if (config.devTools.includes('vitest')) {
    readme += '- ✅ Vitest (Unit Testing)\n';
  }
  if (config.devTools.includes('playwright')) {
    readme += '- ✅ Playwright (E2E Testing)\n';
  }
  if (config.uiFramework !== 'none') {
    readme += `- ✅ ${config.uiFramework === 'shadcn' ? 'svelte-shadcn UI' : 'Storybook'}\n`;
  }
  if (config.database !== 'none') {
    readme += `- ✅ ${config.database === 'postgresql' ? 'PostgreSQL' : 'Supabase'}\n`;
  }
  if (config.backendTools.includes('trpc')) {
    readme += '- ✅ tRPC-SvelteKit\n';
  }
  if (config.backendTools.includes('zod')) {
    readme += '- ✅ Zod (Validation)\n';
  }
  if (config.payment !== 'none') {
    readme += `- ✅ ${config.payment === 'stripe' ? 'Stripe' : 'Paddle'} (Payment)\n`;
  }
  if (config.analytics) {
    readme += '- ✅ Plausible Analytics\n';
  }
  if (config.seo) {
    readme += '- ✅ SEO Optimization (OG Images, Sitemap, Robots.txt)\n';
  }
  if (config.blog) {
    readme += '- ✅ Blog with Markdown Support\n';
  }
  if (config.auth !== 'none') {
    readme += `- ✅ ${config.auth === 'authjs' ? 'Auth.js' : 'Lucia'} (Authentication)\n`;
  }

  readme += `
## Getting Started

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

### Building

\`\`\`bash
npm run build
\`\`\`

### Preview

\`\`\`bash
npm run preview
\`\`\`

`;

  if (config.devTools.includes('vitest')) {
    readme += `### Testing

\`\`\`bash
npm test
\`\`\`

`;
  }

  if (config.devTools.includes('playwright')) {
    readme += `### E2E Testing

\`\`\`bash
npm run test:e2e
\`\`\`

`;
  }

  if (config.devTools.includes('eslint')) {
    readme += `### Linting

\`\`\`bash
npm run lint
\`\`\`

`;
  }

  readme += `## Configuration

Copy \`.env.example\` to \`.env\` and fill in your environment variables.

## Documentation

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte 5 Documentation](https://svelte-5-preview.vercel.app/)
`;

  if (config.database === 'supabase') {
    readme += '- [Supabase Documentation](https://supabase.com/docs)\n';
  }

  if (config.auth === 'authjs') {
    readme += '- [Auth.js Documentation](https://authjs.dev/)\n';
  } else if (config.auth === 'lucia') {
    readme += '- [Lucia Documentation](https://lucia-auth.com/)\n';
  }

  if (config.backendTools.includes('trpc')) {
    readme += '- [tRPC Documentation](https://trpc.io/)\n';
  }

  return readme;
}
