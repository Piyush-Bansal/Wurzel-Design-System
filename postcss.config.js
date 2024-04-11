import postcssPresetEnv from 'postcss-preset-env';
import purgecss from '@fullhuman/postcss-purgecss';

/** @type {import('postcss-preset-env').Config} */

const config = {
	plugins: [
		postcssPresetEnv({
			stage: 3
		})
		// purgecss({
		// 	content: ['./**/*.html']
		// })
	]
};

export default config;
