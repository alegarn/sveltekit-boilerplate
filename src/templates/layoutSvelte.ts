import { ProjectConfig } from '../types.js';

export function getLayoutSvelte(config: ProjectConfig): string {
  const imports = [];
  
  if (config.uiFramework === 'shadcn') {
    imports.push("import '../app.css';");
  }

  const importStatements = imports.length > 0 ? imports.join('\n') + '\n\n' : '';

  return `<script${config.devTools.includes('typescript') ? ' lang="ts"' : ''}>
${importStatements.trim() ? '  ' + importStatements : ''}</script>

<slot />
`;
}
