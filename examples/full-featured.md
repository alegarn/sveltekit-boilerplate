# Example: Creating a Full-Featured SvelteKit App

This example shows how to create a fully-featured SvelteKit application with all available options.

## Running the CLI

```bash
npm run build
npm start
```

When prompted, select the following options:

1. **Project Name**: `my-awesome-app`
2. **Development Tools**: Select all (ESLint, TypeScript, Playwright, Vitest)
3. **UI Framework**: `svelte-shadcn UI`
4. **Database**: `Supabase`
5. **Backend Tools**: Select both (tRPC-SvelteKit, Zod)
6. **Payment**: `Stripe`
7. **Analytics**: Yes (Plausible)
8. **SEO**: Yes
9. **Blog**: Yes
10. **Auth**: `Auth.js`

## Generated Project Structure

```
my-awesome-app/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── blog/
│   │   │   ├── +page.svelte
│   │   │   ├── +page.ts
│   │   │   └── [slug]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.ts
│   │   ├── sitemap.xml/
│   │   │   └── +server.ts
│   │   ├── robots.txt/
│   │   │   └── +server.ts
│   │   └── og-image/
│   │       └── +server.ts
│   ├── lib/
│   │   ├── auth/
│   │   │   └── auth.ts
│   │   ├── db/
│   │   │   └── supabase.ts
│   │   ├── trpc/
│   │   │   ├── trpc.ts
│   │   │   ├── context.ts
│   │   │   └── router.ts
│   │   └── payment/
│   │       └── stripe.ts
│   ├── app.html
│   ├── app.css
│   └── hooks.server.ts
├── tests/
├── static/
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── playwright.config.ts
├── tailwind.config.js
├── components.json
├── .env.example
└── README.md
```

## Next Steps

1. Navigate to your project:
   ```bash
   cd my-awesome-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy and configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript checks
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests with Vitest
- `npm run test:e2e` - Run E2E tests with Playwright

## Features Included

### Development Tools
- **TypeScript**: Full type safety across your application
- **ESLint**: Code linting with Svelte-specific rules
- **Vitest**: Fast unit testing
- **Playwright**: Reliable end-to-end testing

### UI & Styling
- **svelte-shadcn UI**: Beautiful, accessible components built with Tailwind CSS
- Responsive design out of the box

### Database & Backend
- **Supabase**: Full backend with PostgreSQL, authentication, and real-time capabilities
- **tRPC**: End-to-end type-safe APIs
- **Zod**: Schema validation for forms and APIs

### Payment Integration
- **Stripe**: Complete payment processing setup
- Webhook handling ready to implement

### Authentication
- **Auth.js**: Flexible authentication with multiple providers
- GitHub OAuth configured (add more providers as needed)

### Analytics
- **Plausible**: Privacy-friendly analytics without cookies

### SEO & Content
- **Dynamic OG Images**: Social media preview images
- **Sitemap.xml**: Automatic sitemap generation
- **Robots.txt**: Search engine crawler instructions
- **Blog**: Markdown-based blog with routing

## Customization

You can customize any part of the generated project:

1. **Add more tRPC procedures** in `src/lib/trpc/router.ts`
2. **Add more blog posts** by creating files in your preferred location and updating loaders
3. **Add more auth providers** in `src/lib/auth/auth.ts`
4. **Customize SEO** by editing the SEO routes
5. **Add UI components** following the shadcn-svelte patterns

## Documentation Links

- [SvelteKit Docs](https://kit.svelte.dev/)
- [Svelte 5 Docs](https://svelte.dev/docs/svelte/overview)
- [Supabase Docs](https://supabase.com/docs)
- [tRPC Docs](https://trpc.io/)
- [Auth.js Docs](https://authjs.dev/)
- [Stripe Docs](https://stripe.com/docs)
- [Playwright Docs](https://playwright.dev/)
