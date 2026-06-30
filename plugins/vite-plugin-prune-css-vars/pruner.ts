import postcss from 'postcss';

import { buildDependencyGraph, expandDependencies } from './graph';
import { cssRootCache } from './state';
import { shouldPreserve } from './utils';

import type { PreserveMatcher } from './types';

export async function pruneUnusedVariables(
	css: string,
	used: Set<string>,
	preserve: PreserveMatcher[] = []
): Promise<string> {
	if (!css.includes('--')) {
		return css;
	}

	let root = cssRootCache.get(css);

	if (!root) {
		root = postcss.parse(css);
		cssRootCache.set(css, root);
	}

	const graph = buildDependencyGraph(root);

	const reachable = expandDependencies(used, graph);

	root.walkDecls((decl) => {
		if (!decl.prop.startsWith('--')) return;

		if (reachable.has(decl.prop)) return;

		if (shouldPreserve(decl.prop, preserve)) return;

		decl.remove();
	});

	return root.toString();
}
