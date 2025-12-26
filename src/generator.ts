import fs from 'fs';
import path from 'path';
import routesFeaturesReadme from './templates/routesFeaturesReadme';

/**
 * Small scaffolding helper used by the project generator.
 * This module focuses on ensuring the (features) route folder and its README exist.
 */

export async function ensureDir(dirPath: string) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

export async function writeFileIfChanged(filePath: string, content: string) {
  try {
    const existing = await fs.promises.readFile(filePath, 'utf8');
    if (existing === content) return false; // no change
  } catch (e) {
    // file doesn't exist or cannot be read -- continue to write
  }

  await fs.promises.writeFile(filePath, content, 'utf8');
  return true;
}

export async function scaffoldFeatures(projectRoot: string, options: { name?: string } = {}) {
  const featuresDir = path.join(projectRoot, 'src', 'routes', '(features)');
  await ensureDir(featuresDir);

  const projectName = options.name || (await tryReadPackageName(projectRoot)) || '';
  const readmePath = path.join(featuresDir, 'README.md');
  const readmeContent = routesFeaturesReadme(projectName);

  const changed = await writeFileIfChanged(readmePath, readmeContent);
  if (changed) {
    console.log(`Created/updated ${path.relative(projectRoot, readmePath)}`);
  } else {
    console.log(`No changes for ${path.relative(projectRoot, readmePath)}`);
  }
}

async function tryReadPackageName(projectRoot: string) {
  try {
    const pkgPath = path.join(projectRoot, 'package.json');
    const raw = await fs.promises.readFile(pkgPath, 'utf8');
    const pkg = JSON.parse(raw);
    return pkg.name || pkg.productName || '';
  } catch (e) {
    return '';
  }
}

// Export default to preserve compatibility with existing imports
export default async function generate(projectRoot: string, options: { name?: string } = {}) {
  // Existing scaffolding tasks would run here. We ensure features README is created as part of scaffolding.
  await scaffoldFeatures(projectRoot, options);
}
