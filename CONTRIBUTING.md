# Contributing to Create SvelteKit Boilerplate

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sveltekit-boilerplate.git
   cd sveltekit-boilerplate
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the TypeScript files in `src/`

3. Build the project:
   ```bash
   npm run build
   ```

4. Test your changes:
   ```bash
   npm start
   ```

### Testing Your Changes

Test the CLI with different configurations:

1. **Test with full configuration:**
   ```bash
   cd /tmp
   node /path/to/sveltekit-boilerplate/dist/index.js
   # Select all features
   cd generated-project
   npm install
   npm run dev
   ```

2. **Test with minimal configuration:**
   - Deselect all optional features
   - Verify the minimal project builds correctly

3. **Test individual features:**
   - Test each feature combination
   - Ensure generated files are correct
   - Verify no conflicts between features

## Project Structure

```
sveltekit-boilerplate/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── generator.ts          # Main project generator
│   ├── types.ts              # TypeScript types
│   ├── utils.ts              # Utility functions
│   └── templates/            # Template generators
│       ├── packageJson.ts
│       ├── svelteConfig.ts
│       ├── viteConfig.ts
│       ├── tsconfig.ts
│       ├── eslintConfig.ts
│       ├── playwrightConfig.ts
│       ├── appHtml.ts
│       ├── layoutSvelte.ts
│       ├── pageSvelte.ts
│       ├── envExample.ts
│       └── readme.ts
├── examples/                 # Example configurations
├── package.json
└── tsconfig.json
```

## Adding New Features

### 1. Update Types

Add the feature to `src/types.ts`:

```typescript
export interface ProjectConfig {
  // ... existing properties
  newFeature: string;  // or boolean, or string[]
}
```

### 2. Update CLI Prompts

Add a prompt in `src/index.ts`:

```typescript
{
  type: 'select',  // or 'confirm', 'multiselect'
  name: 'newFeature',
  message: 'Choose your new feature:',
  choices: [
    { title: 'Option A', value: 'optionA' },
    { title: 'Option B', value: 'optionB' }
  ]
}
```

### 3. Update Package.json Generator

Add dependencies in `src/templates/packageJson.ts`:

```typescript
if (config.newFeature === 'optionA') {
  dependencies['package-name'] = '^1.0.0';
}
```

**Important:** Before adding new dependencies, check the latest versions:

```bash
npm run check-versions
```

This script will fetch the latest versions of all packages. Always verify compatibility between packages after updating versions.

### 4. Add Configuration Files

Create templates in `src/templates/` if needed:

```typescript
export function getNewFeatureConfig(config: ProjectConfig): string {
  return `// configuration content`;
}
```

### 5. Update Generator

Add file generation in `src/generator.ts`:

```typescript
if (config.newFeature !== 'none') {
  generateNewFeatureFiles(projectPath, config);
}
```

### 6. Add Tests

Test the new feature in various combinations.

### 7. Update Documentation

- Update README.md
- Add example in `examples/`
- Update feature list

## Code Style

### TypeScript

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use meaningful variable names
- Add JSDoc comments for complex functions

### File Organization

- One feature per file in `templates/`
- Keep generator logic in `generator.ts`
- Extract utilities to `utils.ts`

### Naming Conventions

- Files: camelCase (e.g., `packageJson.ts`)
- Functions: camelCase (e.g., `generateProject`)
- Interfaces: PascalCase (e.g., `ProjectConfig`)
- Constants: UPPER_SNAKE_CASE (e.g., `DEFAULT_PORT`)

## Commit Messages

Use conventional commits:

- `feat: add new feature`
- `fix: fix bug in generator`
- `docs: update README`
- `refactor: reorganize templates`
- `test: add test for feature`
- `chore: update dependencies`

## Pull Request Process

1. Ensure your code builds without errors
2. Test all feature combinations affected by your changes
3. Update documentation
4. Create a pull request with a clear description
5. Link any related issues

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Checklist
- [ ] Code builds without errors
- [ ] Tested with multiple configurations
- [ ] Documentation updated
- [ ] Examples added/updated if needed
```

## Feature Ideas

Looking for ideas? Here are some features we'd love to see:

- Additional UI frameworks (Skeleton, DaisyUI)
- More database options (MongoDB, PlanetScale)
- More auth providers (Clerk, Firebase Auth)
- Email service integration (Resend, SendGrid)
- Image optimization setup
- Internationalization (i18n)
- Docker configuration
- GitHub Actions workflows
- More testing examples
- Component library starters

## Questions?

Feel free to open an issue for any questions or discussions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
