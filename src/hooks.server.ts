import type { Handle } from "@sveltejs/kit";
import featuresConfig from "./features/features.config.js";

// Compose feature-provided hooks in a predictable order.
// Each feature may export a manifest at src/features/<feature>/manifest.ts
// with an optional hooks() that returns { handle }.

function isSafeFeatureId(id: string): boolean {
	// Allow only alphanumeric characters, hyphens, and underscores to avoid path traversal.
	return /^[A-Za-z0-9_-]+$/.test(id);
}

async function loadFeatureManifests(enabled: string[]) {
	const manifests = [] as Array<{ id: string; hooks?: () => any }>;
	for (const id of enabled) {
		if (!isSafeFeatureId(id)) {
			console.warn(`[features] Skipping manifest load for invalid feature id '${id}'.`);
			continue;
		}
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
    const runner = (i: number): Handle => {
      return async ({ event, resolve }) => {
        const handle = handles[i];
        if (!handle) return resolve(event);
        return handle({
          event,
          resolve: (e, opts) =>
            runner(i + 1)({ event: e, resolve: (ev) => resolve(ev, opts) }),
        });
      };
    };
    return runner(0)({ event, resolve });
  };
}

let cachedHandlePromise: Promise<Handle> | null = null;

async function getOrCreateHandle(): Promise<Handle> {
	if (!cachedHandlePromise) {
		cachedHandlePromise = (async () => {
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

			if (featureHandles.length === 0) {
				return (async ({ event, resolve }) => resolve(event)) as Handle;
			}

			return sequence(...featureHandles);
		})();
	}

	return cachedHandlePromise;
}

export const handle: Handle = async (input) => {
	const composedHandle = await getOrCreateHandle();
	return composedHandle(input);
};
