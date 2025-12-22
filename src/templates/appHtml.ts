import { ProjectConfig } from '../types.js';

export function getAppHtml(config: ProjectConfig): string {
  let analyticsScript = '';
  
  if (config.analytics) {
    analyticsScript = `
    <!-- Plausible Analytics -->
    <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>`;
  }

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%${analyticsScript}
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
`;
}
