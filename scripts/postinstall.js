#!/usr/bin/env node
/**
 * Cross-platform postinstall runner.
 *
 * Runs `npm run generate-features` unless SKIP_FEATURES_GENERATE=1.
 */

import { spawnSync } from 'node:child_process';

const skip = String(process.env.SKIP_FEATURES_GENERATE ?? '').trim() === '1';

if (skip) {
	process.stdout.write('[postinstall] SKIP_FEATURES_GENERATE=1; skipping feature generation.\n');
	process.exit(0);
}

const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const args = ['run', 'generate-features'];

process.stdout.write(`[postinstall] Running: ${cmd} ${args.join(' ')}\n`);

const result = spawnSync(cmd, args, { stdio: 'inherit' });

if (result.error) {
	process.stderr.write(`[postinstall] Failed to run npm: ${result.error.message}\n`);
	process.exit(1);
}

process.exit(result.status ?? 1);
