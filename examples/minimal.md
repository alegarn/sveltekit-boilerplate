# Example: Creating a Minimal SvelteKit App

This example shows how to create a minimal SvelteKit application with just the essentials.

## Running the CLI

```bash
npm run build
npm start
```

When prompted, select the following options:

1. **Project Name**: `minimal-app`
2. **Development Tools**: Deselect all
3. **UI Framework**: `None`
4. **Database**: `None`
5. **Backend Tools**: Deselect all
6. **Payment**: `None`
7. **Analytics**: No
8. **SEO**: No
9. **Blog**: No
10. **Auth**: `None`

## Generated Project Structure

```
minimal-app/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   ├── lib/
│   ├── app.html
│   └── hooks.server.ts (only if needed)
├── static/
├── package.json
├── svelte.config.js
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

## Next Steps

1. Navigate to your project:
   ```bash
   cd minimal-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## What You Get

This minimal setup includes:

- **Svelte 5**: The latest version of Svelte with runes
- **SvelteKit**: Full-stack framework for building web apps
- **Vite**: Fast build tool and dev server
- **Adapter Auto**: Automatically adapts to your deployment platform

## Growing Your App

You can always add more features later by manually installing packages:

### Add TypeScript
```bash
npm install -D typescript @sveltejs/adapter-auto
```

### Add Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Add ESLint
```bash
npm install -D eslint eslint-plugin-svelte
```

### Add Testing
```bash
# Vitest
npm install -D vitest

# Playwright
npm install -D @playwright/test
```

## Use Cases

This minimal setup is perfect for:

- Learning SvelteKit basics
- Quick prototypes
- Landing pages
- Simple websites
- Starting point before adding complexity

## Documentation Links

- [SvelteKit Docs](https://kit.svelte.dev/)
- [Svelte 5 Docs](https://svelte.dev/docs/svelte/overview)
