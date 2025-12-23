import type { FeatureManifest } from '../_types';

const manifest: FeatureManifest = {
	id: 'basic-pages',
	name: 'Basic Pages',
	description: 'Example feature that contributes basic static pages.',
	hooks: async () => {
		// No hooks for this sample feature.
		return {};
	}
};

export default manifest;
