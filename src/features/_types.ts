export type FeatureId = string;

export interface FeatureManifest {
	/** Unique feature id; must match folder name under src/features */
	id: FeatureId;
	/** Human readable name */
	name: string;
	/** Optional short description */
	description?: string;
	/**
	 * Load hooks (server-side) for this feature.
	 * Return a partial hooks object; currently we only compose `handle`.
	 */
	hooks?: () => Promise<FeatureHooks> | FeatureHooks;
}

export interface FeatureHooks {
	handle?: import('@sveltejs/kit').Handle;
}
