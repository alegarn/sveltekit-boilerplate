import type { Handle } from '@sveltejs/kit';
import featuresConfig from './features/features.config.js';

// Compose feature-provided hooks in a predictable order.
// Each feature may export a manifest at src/features/<feature>/manifest.ts
// with an optional hooks() that returns { handle }.

async function loadFeatureManifests(enabled: string[]) {
	const manifests = [] as Array<{ id: string; hooks?: () => any }>;
	for (const id of enabled) {
		try {
			const mod = await import(`./features/${id}/manifest`);
			manifests.push(mod.default ?? mod.manifest ?? mod);
		} catch (e) {
			console.warn(`[features] Could not load manifest for '${id}':`, e);
		}
	}
	return manifests;
}

function sequence(...handles: Handle[]): Handle {
	return async ({ event, resolve }) => {
		let i = -1;
		const runner: Handle = async ({ event, resolve }) => {
			i++;
			const handle = handles[i];
			if (!handle) return resolve(event);
			return handle({
				event,
				resolve: (e, opts) => runner({ event: e, resolve: (ev) => resolve(ev, opts) })
			});
		};
		return runner({ event, resolve });
	};
}

export const handle: Handle = async (input) => {
	const enabled = Array.isArray(featuresConfig?.enabled) ? featuresConfig.enabled : [];
	const manifests = await loadFeatureManifests(enabled);

	const featureHandles: Handle[] = [];
	for (const m of manifests) {
		try {
			const hooks = (await m?.hooks?.()) ?? {};
			if (hooks.handle) featureHandles.push(hooks.handle);
		} catch (e) {
			console.warn(`[features] Error loading hooks for '${m?.id ?? 'unknown'}':`, e);
		}
	}

	if (featureHandles.length === 0) return input.resolve(input.event);
	return sequence(...featureHandles)(input);
};
