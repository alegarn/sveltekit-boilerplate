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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
