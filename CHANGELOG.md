# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-12-22

### Added

- Initial release of Create SvelteKit Boilerplate
- Interactive CLI for project generation
- Support for Svelte 5 and SvelteKit 2
- Development tools integration:
  - ESLint with Svelte support
  - TypeScript configuration
  - Vitest for unit testing
  - Playwright for E2E testing
- UI framework options:
  - svelte-shadcn UI with Tailwind CSS
  - Storybook for component development
- Database integration:
  - PostgreSQL with pg library
  - Supabase with client library
- Type-safe backend tools:
  - tRPC-SvelteKit for end-to-end type safety
  - Zod for schema validation
- Payment provider integration:
  - Stripe with webhook support
  - Paddle configuration
- Analytics integration:
  - Plausible Analytics
- SEO optimization features:
  - Dynamic OG image generation
  - Automatic sitemap.xml generation
  - robots.txt generation
- Blog support:
  - Markdown-based blog structure
  - Blog post routing
  - Example blog posts
- Authentication options:
  - Auth.js with OAuth providers
  - Lucia authentication
- Comprehensive documentation:
  - Main README with feature overview
  - Example configurations (full-featured, minimal, SaaS, content-site)
  - Contributing guide
- Project structure generation:
  - Proper directory structure
  - Configuration files (svelte.config.js, vite.config.ts, etc.)
  - Environment variable examples
  - .gitignore setup

### Features by Category

#### Core Framework
- Svelte 5 with runes support
- SvelteKit 2 with all latest features
- Vite for fast builds
- Adapter auto for easy deployment

#### Development Experience
- Full TypeScript support with strict mode
- ESLint with recommended rules
- Hot module reloading
- Source maps for debugging

#### Testing
- Vitest for unit tests with Svelte component support
- Playwright for E2E tests with browser automation
- Test configuration files included

#### Styling & UI
- Tailwind CSS integration (with shadcn)
- PostCSS configuration
- Component library setup options
- Responsive design defaults

#### Backend & Database
- tRPC for type-safe APIs
- Database client setup
- Connection pooling configuration
- Schema validation with Zod

#### Authentication
- Multiple auth strategies
- Session management
- Protected routes pattern
- OAuth provider setup

#### Content & SEO
- Markdown processing
- SEO meta tags
- Social media preview images
- Search engine optimization

#### Payment & Monetization
- Stripe integration
- Paddle setup
- Webhook handling patterns
- Subscription management templates

### Technical Details

- Built with TypeScript
- Uses prompts for interactive CLI
- Modular template system
- Configurable feature combinations
- No conflicting dependencies

### Documentation

- Comprehensive README
- 4 example configurations
- Feature-by-feature guides
- Contributing guidelines
- Troubleshooting tips

## [Unreleased]

### Planned Features

- Additional UI frameworks (Skeleton UI, DaisyUI)
- More database options (MongoDB, PlanetScale, Drizzle ORM)
- Email service integration (Resend, SendGrid)
- Image optimization setup
- Internationalization (i18n) support
- Docker configuration
- CI/CD workflows (GitHub Actions)
- More authentication providers
- GraphQL option as alternative to tRPC
- Monorepo support
- Component examples and demos

[0.1.0]: https://github.com/alegarn/sveltekit-boilerplate/releases/tag/v0.1.0
