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

	const sourceFiles = await scanFiles(options.include, options.exclude);

	const { aliases, definitionFiles } = buildAliasMap(sourceFiles);

	const used = collectUsedVariables(sourceFiles, aliases, definitionFiles);

	return {
		used,
		duration: performance.now() - start
	};
}
