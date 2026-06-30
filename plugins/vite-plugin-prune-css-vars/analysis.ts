import { buildAliasMap, collectUsedVariables } from './parser';
import { scanFiles } from './scanner';

import type { PruneCssVarsOptions } from './types';

export interface AnalysisResult {
	used: Set<string>;
	duration: number;
}

export async function analyseProject(
	options: PruneCssVarsOptions = {}
): Promise<AnalysisResult> {
	const start = performance.now();

	const files = await scanFiles(options.include, options.exclude);

	const { aliases, definitionFiles } = buildAliasMap(files);

	const used = collectUsedVariables(files, aliases, definitionFiles);

	return {
		used,
		duration: performance.now() - start
	};
}
