import * as fs from 'fs';
import * as path from 'path';
import { ProjectConfig, PackageJson } from './types.js';
import { getPackageJson } from './templates/packageJson.js';
import { getSvelteConfig } from './templates/svelteConfig.js';
import { getViteConfig } from './templates/viteConfig.js';
import { getTsConfig } from './templates/tsconfig.js';
import { getEslintConfig } from './templates/eslintConfig.js';
import { getPlaywrightConfig } from './templates/playwrightConfig.js';
import { getAppHtml } from './templates/appHtml.js';
import { getLayoutSvelte } from './templates/layoutSvelte.js';
import { getPageSvelte } from './templates/pageSvelte.js';
import { getEnvExample } from './templates/envExample.js';
import { getReadme } from './templates/readme.js';

export async function generateProject(config: ProjectConfig): Promise<void> {
  const projectPath = path.join(process.cwd(), config.projectName);

  // Create project directory
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  // Create directory structure
  createDirectoryStructure(projectPath, config);

  // Generate package.json
  const packageJson = getPackageJson(config);
  writeJsonFile(projectPath, 'package.json', packageJson);

  // Generate svelte.config.js
  const svelteConfig = getSvelteConfig(config);
  writeFile(projectPath, 'svelte.config.js', svelteConfig);

  // Generate vite.config.ts
  const viteConfig = getViteConfig(config);
  writeFile(projectPath, 'vite.config.ts', viteConfig);

  // Generate TypeScript config if selected
  if (config.devTools.includes('typescript')) {
    const tsConfig = getTsConfig(config);
    writeJsonFile(projectPath, 'tsconfig.json', tsConfig);
  }

  // Generate ESLint config if selected
  if (config.devTools.includes('eslint')) {
    const eslintConfig = getEslintConfig(config);
    writeFile(projectPath, 'eslint.config.js', eslintConfig);
  }

  // Generate Playwright config if selected
  if (config.devTools.includes('playwright')) {
    const playwrightConfig = getPlaywrightConfig(config);
    writeFile(projectPath, 'playwright.config.ts', playwrightConfig);
  }

  // Generate app files
  const appHtml = getAppHtml(config);
  writeFile(projectPath, 'src/app.html', appHtml);

  const layoutSvelte = getLayoutSvelte(config);
  writeFile(projectPath, 'src/routes/+layout.svelte', layoutSvelte);

  const pageSvelte = getPageSvelte(config);
  writeFile(projectPath, 'src/routes/+page.svelte', pageSvelte);

  // Generate environment example
  const envExample = getEnvExample(config);
  writeFile(projectPath, '.env.example', envExample);

  // Generate README
  const readme = getReadme(config);
  writeFile(projectPath, 'README.md', readme);

  // Generate .gitignore
  writeFile(projectPath, '.gitignore', getGitignore());

  // Generate feature-specific files
  generateFeatureFiles(projectPath, config);
}

function createDirectoryStructure(projectPath: string, config: ProjectConfig): void {
  const dirs = [
    'src',
    'src/routes',
    'src/lib',
    'static'
  ];

  if (config.blog) {
    dirs.push('src/routes/blog', 'src/lib/posts');
  }

  if (config.seo) {
    dirs.push('src/lib/seo');
  }

  if (config.auth !== 'none') {
    dirs.push('src/lib/auth');
  }

  if (config.database !== 'none') {
    dirs.push('src/lib/db');
  }

  if (config.backendTools.includes('trpc')) {
    dirs.push('src/lib/trpc');
  }

  if (config.devTools.includes('playwright')) {
    dirs.push('tests');
  }

  if (config.uiFramework === 'storybook') {
    dirs.push('.storybook', 'src/stories');
  }

  dirs.forEach(dir => {
    const fullPath = path.join(projectPath, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
}

function writeFile(projectPath: string, filePath: string, content: string): void {
  const fullPath = path.join(projectPath, filePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content, 'utf-8');
}

function writeJsonFile(projectPath: string, filePath: string, content: any): void {
  writeFile(projectPath, filePath, JSON.stringify(content, null, 2));
}

function getGitignore(): string {
  return `.DS_Store
node_modules
/build
/.svelte-kit
/package
.env
.env.*
!.env.example
vite.config.js.timestamp-*
vite.config.ts.timestamp-*
`;
}

function generateFeatureFiles(projectPath: string, config: ProjectConfig): void {
  // SEO files
  if (config.seo) {
    generateSEOFiles(projectPath, config);
  }

  // Blog files
  if (config.blog) {
    generateBlogFiles(projectPath, config);
  }

  // Auth files
  if (config.auth !== 'none') {
    generateAuthFiles(projectPath, config);
  }

  // Database files
  if (config.database !== 'none') {
    generateDatabaseFiles(projectPath, config);
  }

  // tRPC files
  if (config.backendTools.includes('trpc')) {
    generateTRPCFiles(projectPath, config);
  }

  // Payment files
  if (config.payment !== 'none') {
    generatePaymentFiles(projectPath, config);
  }

  // Storybook files
  if (config.uiFramework === 'storybook') {
    generateStorybookFiles(projectPath, config);
  }

  // shadcn files
  if (config.uiFramework === 'shadcn') {
    generateShadcnFiles(projectPath, config);
  }
}

function generateSEOFiles(projectPath: string, config: ProjectConfig): void {
  // sitemap.xml route
  const sitemapContent = `import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const pages = ['/', '/about', '/contact'];
  
  const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${pages.map(page => \`  <url>
    <loc>\${process.env.PUBLIC_SITE_URL || 'https://example.com'}\${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\`).join('\\n')}
</urlset>\`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
`;
  writeFile(projectPath, 'src/routes/sitemap.xml/+server.ts', sitemapContent);

  // robots.txt route
  const robotsContent = `import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const robots = \`User-agent: *
Allow: /

Sitemap: \${process.env.PUBLIC_SITE_URL || 'https://example.com'}/sitemap.xml
\`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};
`;
  writeFile(projectPath, 'src/routes/robots.txt/+server.ts', robotsContent);

  // OG image generator
  const ogImageContent = `import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const title = url.searchParams.get('title') || 'Welcome';
  
  // Simple SVG-based OG image
  const svg = \`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0f172a"/>
    <text x="600" y="315" font-family="Arial, sans-serif" font-size="64" fill="#f1f5f9" text-anchor="middle" dominant-baseline="middle">
      \${title}
    </text>
  </svg>\`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
`;
  writeFile(projectPath, 'src/routes/og-image/+server.ts', ogImageContent);
}

function generateBlogFiles(projectPath: string, config: ProjectConfig): void {
  // Blog index page
  const blogIndexContent = `<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<div class="container">
  <h1>Blog</h1>
  <div class="posts">
    {#each data.posts as post}
      <article>
        <h2><a href="/blog/{post.slug}">{post.title}</a></h2>
        <p>{post.excerpt}</p>
        <time>{new Date(post.date).toLocaleDateString()}</time>
      </article>
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .posts {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  article {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
  }
</style>
`;
  writeFile(projectPath, 'src/routes/blog/+page.svelte', blogIndexContent);

  // Blog loader
  const blogLoaderContent = `import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const posts = [
    {
      slug: 'hello-world',
      title: 'Hello World',
      excerpt: 'Welcome to my blog!',
      date: '2024-01-01'
    }
  ];

  return {
    posts
  };
};
`;
  writeFile(projectPath, 'src/routes/blog/+page.ts', blogLoaderContent);

  // Blog post page
  const blogPostContent = `<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<article class="container">
  <h1>{data.post.title}</h1>
  <time>{new Date(data.post.date).toLocaleDateString()}</time>
  <div class="content">
    {@html data.post.content}
  </div>
</article>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .content {
    margin-top: 2rem;
    line-height: 1.6;
  }
</style>
`;
  writeFile(projectPath, 'src/routes/blog/[slug]/+page.svelte', blogPostContent);

  const blogPostLoaderContent = `import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  // In a real app, you'd load from a file or database
  const post = {
    slug: params.slug,
    title: 'Hello World',
    content: '<p>Welcome to my first blog post!</p>',
    date: '2024-01-01'
  };

  if (!post) {
    throw error(404, 'Post not found');
  }

  return {
    post
  };
};
`;
  writeFile(projectPath, 'src/routes/blog/[slug]/+page.ts', blogPostLoaderContent);
}

function generateAuthFiles(projectPath: string, config: ProjectConfig): void {
  if (config.auth === 'authjs') {
    const authConfig = `import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
})
`;
    writeFile(projectPath, 'src/lib/auth/auth.ts', authConfig);

    const hooksContent = `import { handle as authHandle } from '$lib/auth/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = authHandle;
`;
    writeFile(projectPath, 'src/hooks.server.ts', hooksContent);
  } else if (config.auth === 'lucia') {
    const luciaConfig = `import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit()
});

export type Auth = typeof auth;
`;
    writeFile(projectPath, 'src/lib/auth/lucia.ts', luciaConfig);

    const hooksContent = `import { auth } from '$lib/auth/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  return resolve(event);
};
`;
    writeFile(projectPath, 'src/hooks.server.ts', hooksContent);
  }
}

function generateDatabaseFiles(projectPath: string, config: ProjectConfig): void {
  if (config.database === 'postgresql') {
    const dbConfig = `import { Pool } from 'pg';
import { DATABASE_URL } from '$env/static/private';

export const pool = new Pool({
  connectionString: DATABASE_URL
});
`;
    writeFile(projectPath, 'src/lib/db/postgres.ts', dbConfig);
  } else if (config.database === 'supabase') {
    const supabaseConfig = `import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);
`;
    writeFile(projectPath, 'src/lib/db/supabase.ts', supabaseConfig);
  }
}

function generateTRPCFiles(projectPath: string, config: ProjectConfig): void {
  const trpcConfig = `import { initTRPC } from '@trpc/server';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
`;
  writeFile(projectPath, 'src/lib/trpc/trpc.ts', trpcConfig);

  const contextContent = `export type Context = {
  // Add your context properties here
};

export const createContext = async () => {
  return {};
};
`;
  writeFile(projectPath, 'src/lib/trpc/context.ts', contextContent);

  const routerContent = `import { router, publicProcedure } from './trpc';
${config.backendTools.includes('zod') ? "import { z } from 'zod';\n" : ''}
export const appRouter = router({
  hello: publicProcedure.query(() => {
    return { message: 'Hello from tRPC!' };
  })
});

export type AppRouter = typeof appRouter;
`;
  writeFile(projectPath, 'src/lib/trpc/router.ts', routerContent);
}

function generatePaymentFiles(projectPath: string, config: ProjectConfig): void {
  if (config.payment === 'stripe') {
    const stripeConfig = `import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});
`;
    writeFile(projectPath, 'src/lib/payment/stripe.ts', stripeConfig);
  } else if (config.payment === 'paddle') {
    const paddleConfig = `import { PADDLE_API_KEY, PADDLE_VENDOR_ID } from '$env/static/private';

export const paddleConfig = {
  apiKey: PADDLE_API_KEY,
  vendorId: PADDLE_VENDOR_ID
};
`;
    writeFile(projectPath, 'src/lib/payment/paddle.ts', paddleConfig);
  }
}

function generateStorybookFiles(projectPath: string, config: ProjectConfig): void {
  const mainConfig = `import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
`;
  writeFile(projectPath, '.storybook/main.ts', mainConfig);

  const previewConfig = `import type { Preview } from '@storybook/svelte';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
`;
  writeFile(projectPath, '.storybook/preview.ts', previewConfig);
}

function generateShadcnFiles(projectPath: string, config: ProjectConfig): void {
  const componentConfig = `import type { Component } from "svelte";

export const componentsConfig = {
  style: "default",
  tailwind: {
    config: "tailwind.config.js",
    css: "src/app.css",
    baseColor: "slate"
  }
};
`;
  writeFile(projectPath, 'components.json', componentConfig);

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
  writeFile(projectPath, 'tailwind.config.js', tailwindConfig);

  const appCss = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
  writeFile(projectPath, 'src/app.css', appCss);
}
