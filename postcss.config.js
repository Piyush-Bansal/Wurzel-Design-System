import postcssPresetEnv from 'postcss-preset-env';
// import purgecss from '@fullhuman/postcss-purgecss';
// import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5';

/** @type {import('postcss-preset-env').Config} */

const config = {
	plugins: [
		postcssPresetEnv({
			stage: 3
		})
	]
};

export default config;
