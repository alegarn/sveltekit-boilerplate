#!/usr/bin/env node

import { spawnSync } from 'node:child_process';

const isInCi = Boolean(process.env.CI);

// Skip husky hooks on CI (common for e.g. Renovate, GitHub Actions)
if (!isInCi) {
	const result = spawnSync('npx', ['husky', 'install'], {
		stdio: 'inherit'
	});

	// If husky fails, ensure postinstall fails too
	if (result.status !== 0) {
		process.exit(result.status ?? 1);
	}
}
