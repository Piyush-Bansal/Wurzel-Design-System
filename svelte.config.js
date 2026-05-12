import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),
		alias: {
			$styles: './src/scss',
			$tokens: './src/scss/tokens/token',
			$componentTokens: './src/scss/tokens/token/components',
			$breakpoints: './src/scss/tokens/mixins',
			$sizes: './src/scss/tokens/functions',
			$components: './src/components',
			$tokens: './src/scss/tokens'
		}
	}
};

export default config;
