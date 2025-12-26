#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Script to ensure (features)/README.md exists by copying from templates if it's missing.
(function main() {
  const repoRoot = process.cwd();
  const featuresDir = path.join(repoRoot, 'src', 'routes', '(features)');
  const targetReadme = path.join(featuresDir, 'README.md');
  const templateReadme = path.join(repoRoot, 'src', 'templates', 'routesFeaturesReadme.md');

  try {
    if (!fs.existsSync(featuresDir)) {
      fs.mkdirSync(featuresDir, { recursive: true });
      console.log('Created directory:', featuresDir);
    }

    if (fs.existsSync(targetReadme)) {
      console.log('README already exists at', targetReadme);
      return;
    }

    if (fs.existsSync(templateReadme)) {
      fs.copyFileSync(templateReadme, targetReadme);
      console.log('Copied template README to', targetReadme);
    } else {
      // Fallback: create a minimal README if template not present
      const fallback = `# Features\n\nThis directory contains optional, pluggable features for this project.\n`;
      fs.writeFileSync(targetReadme, fallback, 'utf8');
      console.log('Created fallback README at', targetReadme);
    }
  } catch (err) {
    console.error('Error ensuring features README:', err);
    process.exitCode = 1;
  }
})();
