import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),
		alias: {
			$styles: './src/scss',
			$tokens: './src/scss/abstract/token',
			$componentTokens: './src/scss/abstract/token/components',
			$breakpoints: './src/scss/abstract/mixins',
			$sizes: './src/scss/abstract/functions',
			$components: './src/components',
			$abstracts: './src/scss/abstract'
		}
	}
};

export default config;
