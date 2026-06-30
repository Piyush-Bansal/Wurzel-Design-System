import fg from 'fast-glob';
import fs from 'node:fs/promises';

import { buildAliasMap, collectUsedVariables } from './parser';

import type { PruneCssVarsOptions } from './types';

export interface ScanResult {
	used: Set<string>;
	files: string[];
	duration: number;
}

interface SourceFile {
	file: string;
	source: string;
}

const DEFAULT_INCLUDE = ['src/**/*.{scss,sass,svelte}'];

const DEFAULT_EXCLUDE = ['node_modules/**', '.svelte-kit/**', 'dist/**'];

export async function scan(
	options: PruneCssVarsOptions = {}
): Promise<ScanResult> {
	const start = performance.now();

	const fileNames = await fg(options.include ?? DEFAULT_INCLUDE, {
		ignore: options.exclude ?? DEFAULT_EXCLUDE,
		absolute: true
	});

	const files: SourceFile[] = await Promise.all(
		fileNames.map(async (file) => ({
			file,
			source: await fs.readFile(file, 'utf8')
		}))
	);

	const { aliases, definitionFiles } = buildAliasMap(files);

	const used = collectUsedVariables(files, aliases, definitionFiles);

	if (options.debug) {
		console.log(`[prune-css-vars] aliases=${aliases.size}, used=${used.size}`);
	}

	return {
		used,
		files: fileNames,
		duration: performance.now() - start
	};
}
