import type { Plugin, ViteDevServer } from 'vite';

import { analyseProject } from './analysis';
import { pruneUnusedVariables } from './pruner';

import type { PruneCssVarsOptions } from './types';

export default function pruneCssVars(
	options: PruneCssVarsOptions = {}
): Plugin {
	let used = new Set<string>();

	async function analyse() {
		const result = await analyseProject(options);

		used = result.used;

		if (options.debug) {
			console.log(
				`[prune-css-vars] ${used.size} variables (${result.duration.toFixed(1)} ms)`
			);
		}
	}

	return {
		name: 'vite-plugin-prune-css-vars',

		apply(_config, { command }) {
			return command === 'serve';
		},

		async configureServer(server: ViteDevServer) {
			await analyse();

			server.watcher.on('change', async (file) => {
				if (!/\.(scss|sass|svelte)$/.test(file)) {
					return;
				}

				await analyse();
			});
		},

		transform(code, id) {
			if (!id.endsWith('.scss') && !id.includes('type=style')) {
				return null;
			}

			if (!code.includes('--')) {
				return null;
			}

			return {
				code: pruneUnusedVariables(code, used, options.preserve),
				map: null
			};
		}
	};
}
