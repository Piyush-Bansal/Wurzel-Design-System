import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5';

export default defineConfig({
	plugins: [
		sveltekit(),
		pluginPurgeCss({
			content: ['./src/**/*.{html,js,svelte,ts}'],
			fontFace: true,
			keyframes: true,
			variables: true
		})
	]

	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			// 	additionalData: `
	// 			// `
	// 		}
	// 	}
	// }
});
