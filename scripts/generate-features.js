#!/usr/bin/env node
/**
 * Idempotent feature route generator.
 *
 * - Reads enabled features from src/features/features.config.js
 * - Copies route templates from src/features/<feature>/routes
 *   into src/routes/(features)/<feature>
 * - Supports:
 *   --force : overwrite files even if destination exists
 *   --clean : remove generated feature routes before generating
 * - Env:
 *   SKIP_FEATURES_GENERATE=1 to skip generation (useful in CI)
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
const featuresDir = path.join(repoRoot, 'src', 'features');
const configPath = path.join(featuresDir, 'features.config.js');

const outBaseDir = path.join(repoRoot, 'src', 'routes', '(features)');

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  return {
    force: args.has('--force'),
    clean: args.has('--clean')
  };
}

async function pathExists(p) {
  try {
    await fsp.access(p);
    return true;
  } catch {
    return false;
  }
}

async function rmSafe(p) {
  if (await pathExists(p)) {
    await fsp.rm(p, { recursive: true, force: true });
  }
}

async function ensureDir(p) {
  await fsp.mkdir(p, { recursive: true });
}

async function* walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.isFile()) yield full;
  }
}

function rel(from, to) {
  return path.relative(from, to).split(path.sep).join('/');
}

async function copyTree({ srcDir, dstDir, force }) {
  if (!(await pathExists(srcDir))) return { copied: 0, skipped: 0 };
  await ensureDir(dstDir);

  let copied = 0;
  let skipped = 0;

  for await (const srcFile of walk(srcDir)) {
    const relative = path.relative(srcDir, srcFile);
    const dstFile = path.join(dstDir, relative);
    await ensureDir(path.dirname(dstFile));

    const dstExists = await pathExists(dstFile);
    if (dstExists && !force) {
      skipped++;
      continue;
    }

    await fsp.copyFile(srcFile, dstFile);
    copied++;
  }

  return { copied, skipped };
}

async function loadConfig() {
  if (!(await pathExists(configPath))) {
    throw new Error(`Missing config: ${rel(repoRoot, configPath)}. Create it first.`);
  }
  // Dynamic import with cache busting to ensure idempotent CLI runs.
  const url = pathToFileURL(configPath);
  url.searchParams.set('t', String(Date.now()));
  const mod = await import(url.href);
  const cfg = mod.default ?? mod.config ?? mod;
  return cfg;
}

async function main() {
  if (process.env.SKIP_FEATURES_GENERATE === '1') {
    console.log('SKIP_FEATURES_GENERATE=1 set; skipping feature route generation.');
    return;
  }

  const { force, clean } = parseArgs(process.argv);

  const cfg = await loadConfig();
  const enabled = Array.isArray(cfg?.enabled) ? cfg.enabled : [];

  await ensureDir(outBaseDir);

  if (clean) {
    // We only clean the (features) group directory. This directory is intended
    // to be fully generated.
    await rmSafe(outBaseDir);
    await ensureDir(outBaseDir);
  }

  let totalCopied = 0;
  let totalSkipped = 0;

  for (const feature of enabled) {
    const srcRoutes = path.join(featuresDir, feature, 'routes');
    const dstRoutes = path.join(outBaseDir, feature);

    const stats = await copyTree({ srcDir: srcRoutes, dstDir: dstRoutes, force });
    totalCopied += stats.copied;
    totalSkipped += stats.skipped;

    if (!(await pathExists(srcRoutes))) {
      console.warn(`Feature '${feature}' has no routes directory: ${rel(repoRoot, srcRoutes)}`);
    }
  }

  console.log(`Features enabled: ${enabled.join(', ') || '(none)'}`);
  console.log(`Generated into: ${rel(repoRoot, outBaseDir)}`);
  console.log(`Files copied: ${totalCopied}, skipped: ${totalSkipped}${force ? ' (force enabled)' : ''}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
