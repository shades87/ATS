import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { basic } from './src/basic';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		skeleton({
			themes: {
				custom: [basic]
			}
		})
	]
} satisfies Config;
