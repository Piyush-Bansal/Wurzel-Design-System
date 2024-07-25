import postcssPresetEnv from 'postcss-preset-env';
import purgecss from '@fullhuman/postcss-purgecss';

/** @type {import('postcss-preset-env').Config} */

const config = {
	plugins: [
		postcssPresetEnv({
			stage: 3
		}),
		purgecss({
			content: ['./src/**/*.{html,js,svelte,ts}'],
			safelist: [/svelte-/, /^:global/],
			defaultExtractor: (content) => {
				const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
				const innerMatches =
					content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
				return broadMatches.concat(innerMatches);
			},
			// Add SCSS files to be processed
			dynamicAttributes: ['class', 'class:list']
		})
	]
};

export default config;
