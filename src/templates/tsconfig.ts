import { ProjectConfig } from '../types.js';

export function getTsConfig(config: ProjectConfig): any {
  return {
    extends: './.svelte-kit/tsconfig.json',
    compilerOptions: {
      allowJs: true,
      checkJs: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      sourceMap: true,
      strict: true,
      moduleResolution: 'bundler'
    }
  };
}
