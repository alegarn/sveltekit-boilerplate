# Example: Content-First Website

This example creates a SvelteKit application optimized for content-heavy websites like blogs, documentation sites, or marketing pages.

## Configuration

When running the CLI, select:

1. **Project Name**: `content-site`
2. **Development Tools**: TypeScript, ESLint
3. **UI Framework**: `svelte-shadcn UI`
4. **Database**: `None`
5. **Backend Tools**: Zod (for form validation)
6. **Payment**: `None`
7. **Analytics**: Yes (Plausible)
8. **SEO**: Yes
9. **Blog**: Yes
10. **Auth**: `None`

## What You Get

This configuration is perfect for:

- Marketing websites
- Company blogs
- Documentation sites
- Portfolio sites
- Content-driven applications

### Included Features
- ✅ **Markdown Blog** with file-based routing
- ✅ **SEO Optimization** (OG images, sitemap, robots.txt)
- ✅ **Beautiful UI** with Tailwind CSS
- ✅ **Privacy-friendly Analytics**
- ✅ **Form Validation** with Zod
- ✅ **Type Safety** with TypeScript

## Content Structure

### Blog Posts

Create blog posts as Markdown files:

\`\`\`markdown
<!-- src/content/posts/my-first-post.md -->
---
title: My First Post
date: 2024-01-01
excerpt: This is my first blog post!
tags: [svelte, web-dev]
---

# My First Post

Content goes here...
\`\`\`

### Processing Markdown

Use the provided blog routes or customize them:

\`\`\`typescript
// src/lib/content.ts
import { marked } from 'marked';
import matter from 'gray-matter';

export function parseMarkdown(content: string) {
  const { data, content: markdown } = matter(content);
  const html = marked(markdown);
  return { metadata: data, html };
}
\`\`\`

## SEO Best Practices

### 1. Meta Tags

Add to your `+layout.svelte`:

\`\`\`svelte
<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
\`\`\`

### 2. Structured Data

Add JSON-LD for better SEO:

\`\`\`svelte
<svelte:head>
  {@html \`
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "\${post.title}",
      "datePublished": "\${post.date}",
      "author": {
        "@type": "Person",
        "name": "Your Name"
      }
    }
    </script>
  \`}
</svelte:head>
\`\`\`

### 3. Dynamic OG Images

The generated project includes an OG image endpoint. Customize it:

\`\`\`typescript
// src/routes/og-image/+server.ts
import { ImageResponse } from '@vercel/og';

export const GET = async ({ url }) => {
  const title = url.searchParams.get('title') || 'Welcome';
  
  return new ImageResponse(
    (
      <div style={{
        background: 'linear-gradient(to bottom, #667eea, #764ba2)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{ fontSize: 60, color: 'white' }}>{title}</h1>
      </div>
    )
  );
};
\`\`\`

## Content Management Workflow

### 1. Local Development

\`\`\`bash
npm run dev
\`\`\`

### 2. Write Content

Create Markdown files in your content directory

### 3. Preview Changes

Changes are hot-reloaded automatically

### 4. Deploy

\`\`\`bash
npm run build
\`\`\`

## Performance Optimization

### 1. Image Optimization

Use SvelteKit's image handling:

\`\`\`svelte
<script>
  import { assets } from '$app/paths';
</script>

<img 
  src="{assets}/images/hero.jpg" 
  alt="Hero"
  loading="lazy"
/>
\`\`\`

### 2. Prerendering

Enable prerendering for static pages:

\`\`\`typescript
// src/routes/blog/+page.ts
export const prerender = true;
\`\`\`

### 3. RSS Feed

Add an RSS feed:

\`\`\`typescript
// src/routes/rss.xml/+server.ts
export const GET = async () => {
  const posts = await getAllPosts();
  
  const rss = \`<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>My Blog</title>
        <link>https://example.com</link>
        \${posts.map(post => \`
          <item>
            <title>\${post.title}</title>
            <link>https://example.com/blog/\${post.slug}</link>
            <pubDate>\${new Date(post.date).toUTCString()}</pubDate>
          </item>
        \`).join('')}
      </channel>
    </rss>\`;
  
  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
\`\`\`

## Deployment

Deploy to any of these platforms:

- **Vercel**: Best for SvelteKit, automatic previews
- **Netlify**: Easy deployment, good CDN
- **Cloudflare Pages**: Fast global CDN
- **GitHub Pages**: Free static hosting

## Recommended Additions

- Newsletter signup (ConvertKit, Mailchimp)
- Comments (Giscus, Utterances)
- Search (Algolia, Meilisearch)
- Reading time calculation
- Table of contents generation
- Syntax highlighting (Shiki, Prism)

## Resources

- [SvelteKit Prerendering](https://kit.svelte.dev/docs/page-options#prerender)
- [Markdown Processing](https://marked.js.org/)
- [SEO Best Practices](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
