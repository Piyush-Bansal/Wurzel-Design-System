import type { Plugin, ViteDevServer } from 'vite';

import { scan } from './scanner';
import { pruneUnusedVariables } from './pruner';
import type { PruneCssVarsOptions } from './types';
import { cssRootCache } from './state';

export default function pruneCssVars(
	options: PruneCssVarsOptions = {}
): Plugin {
	let used = new Set<string>();

	async function rescan() {
		const result = await scan(options);

		used = result.used;
		cssRootCache.clear();

		if (options.debug) {
			console.log(
				`[prune-css-vars] ${used.size} variables (${result.duration.toFixed(1)} ms)`
			);
		}
	}

	return {
		name: 'vite-plugin-prune-css-vars',

		apply: 'serve',

		async configureServer(server: ViteDevServer) {
			await rescan();

			server.watcher.on('change', async (file) => {
				if (!/\.(svelte|scss|sass)$/.test(file)) return;

				await rescan();
			});
		},

		async transform(code, id) {
			if (!id.endsWith('.scss') && !id.includes('type=style')) {
				return null;
			}

			if (!code.includes('--')) {
				return null;
			}

			return {
				code: await pruneUnusedVariables(code, used, options.preserve),
				map: null
			};
		}
	};
}
