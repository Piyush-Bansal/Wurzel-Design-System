import postcssPresetEnv from 'postcss-preset-env';

/** @type {import('postcss-preset-env').Config} */

const config = {
	plugins: [
		postcssPresetEnv({
			stage: 3
		})
	]
};

export default config;
