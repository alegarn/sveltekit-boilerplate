# Create SvelteKit Boilerplate

A CLI tool to generate a customizable SvelteKit (Svelte 5) application with all the features you need.

## Features

Create a modern SvelteKit application with your choice of:

### Development Tools
- ✅ **ESLint** - Code linting
- ✅ **TypeScript** - Type safety
- ✅ **Playwright** - End-to-end testing
- ✅ **Vitest** - Unit testing

### UI Frameworks
- 🎨 **svelte-shadcn UI** - Beautiful, accessible components
- 📚 **Storybook** - Component development environment

### Databases
- 🐘 **PostgreSQL** - Powerful relational database
- ⚡ **Supabase** - Open-source Firebase alternative

### Type-Safe Backend
- 🔒 **tRPC-SvelteKit** - End-to-end type-safe APIs
- ✓ **Zod** - Schema validation library

### Payment Integration
- 💳 **Stripe** - Online payment processing
- 💰 **Paddle** - Payment infrastructure for SaaS

### Analytics
- 📊 **Plausible** - Privacy-friendly analytics

### SEO Optimization
- 🖼️ **Dynamic OG Images** - Social media preview images
- 🗺️ **Sitemap.xml** - Automatic sitemap generation
- 🤖 **Robots.txt** - Search engine crawler instructions

### Content Management
- 📝 **Blog with Markdown** - Write blog posts in Markdown

### Authentication
- 🔐 **Auth.js** - Flexible authentication library
- 🔑 **Lucia** - Simple and lightweight authentication

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

## Usage

```bash
npm start
```

Or run directly with npx (once published):

```bash
npx create-sveltekit-boilerplate
```

## Interactive CLI

The tool will guide you through selecting the features you want:

1. **Project Name** - Choose a name for your project
2. **Development Tools** - Select ESLint, TypeScript, Playwright, and/or Vitest
3. **UI Framework** - Choose between svelte-shadcn UI, Storybook, or none
4. **Database** - Select PostgreSQL, Supabase, or none
5. **Backend Tools** - Choose tRPC-SvelteKit and/or Zod
6. **Payment Provider** - Select Stripe, Paddle, or none
7. **Analytics** - Include Plausible Analytics
8. **SEO Optimization** - Add SEO features (OG images, sitemap, robots.txt)
9. **Blog** - Include blog with Markdown support
10. **Authentication** - Choose Auth.js, Lucia, or none

## Generated Project Structure

```
my-sveltekit-app/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── blog/              (if blog enabled)
│   │   ├── sitemap.xml/       (if SEO enabled)
│   │   ├── robots.txt/        (if SEO enabled)
│   │   └── og-image/          (if SEO enabled)
│   ├── lib/
│   │   ├── auth/              (if auth enabled)
│   │   ├── db/                (if database enabled)
│   │   ├── trpc/              (if tRPC enabled)
│   │   ├── payment/           (if payment enabled)
│   │   └── seo/               (if SEO enabled)
│   └── app.html
├── static/
├── tests/                     (if Playwright enabled)
├── .storybook/               (if Storybook enabled)
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json             (if TypeScript enabled)
├── eslint.config.js          (if ESLint enabled)
├── playwright.config.ts      (if Playwright enabled)
├── .env.example
└── README.md
```

## Development

To work on the CLI tool itself:

```bash
# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Run in development mode
npm run dev

# Test the CLI locally
npm start
```

## Examples

Check out the [examples](./examples/) directory for common configuration patterns:

- **[Full-Featured App](./examples/full-featured.md)** - Complete setup with all features enabled
- **[Minimal App](./examples/minimal.md)** - Bare-bones SvelteKit starter
- **[SaaS Starter](./examples/saas-starter.md)** - Perfect for building SaaS products
- **[Content Site](./examples/content-site.md)** - Optimized for blogs and marketing sites

## Project Structure

Each generated project follows SvelteKit conventions:

- `src/routes/` - Your application routes
- `src/lib/` - Reusable components and utilities
- `static/` - Static assets (images, fonts, etc.)
- `tests/` - End-to-end tests (if Playwright is enabled)

## Features in Detail

### Development Tools

- **ESLint**: Configured with Svelte-specific rules and TypeScript support
- **TypeScript**: Full type safety with proper SvelteKit types
- **Vitest**: Fast unit testing with Svelte component support
- **Playwright**: Reliable E2E testing with real browser automation

### UI Frameworks

- **svelte-shadcn UI**: Accessible components built with Tailwind CSS, ready to customize
- **Storybook**: Isolated component development with hot reload and docs

### Databases

- **PostgreSQL**: Direct connection with pg library, ready for migrations
- **Supabase**: Backend-as-a-service with auth, database, and real-time subscriptions

### Type-Safe Backend

- **tRPC-SvelteKit**: End-to-end type safety between client and server
- **Zod**: Runtime validation with TypeScript inference

### Payment Integration

- **Stripe**: Complete payment setup with subscription support
- **Paddle**: Merchant of record payment processing

### SEO Features

- **Dynamic OG Images**: Generate social media preview images on-demand
- **Sitemap.xml**: Automatic sitemap generation for search engines
- **Robots.txt**: Search engine crawler instructions

### Authentication

- **Auth.js**: Multiple OAuth providers (GitHub, Google, etc.)
- **Lucia**: Lightweight auth with session management

## Troubleshooting

### Build Errors

If you encounter build errors after generating a project:

1. Make sure you've installed dependencies: `npm install`
2. Check that all environment variables are set
3. Try clearing the SvelteKit cache: `rm -rf .svelte-kit`

### Type Errors

If TypeScript shows errors:

1. Run `npm run check` to sync types
2. Make sure you're using compatible versions
3. Check that `tsconfig.json` extends `.svelte-kit/tsconfig.json`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Make your changes
5. Build and test: `npm run build && npm start`
6. Submit a pull request

## License

MIT
