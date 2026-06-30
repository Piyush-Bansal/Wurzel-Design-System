import postcss from 'postcss';

import { buildReachableVariables } from './graph';
import { shouldPreserve } from './utils';

import type { PreserveMatcher } from './types';

export function pruneCss(
	css: string,
	used: Set<string>,
	preserve: PreserveMatcher[] = []
): string {
	if (!css.includes('--')) {
		return css;
	}

	const reachable = buildReachableVariables(css, used);

	const root = postcss.parse(css);

	root.walkDecls((decl) => {
		if (!decl.prop.startsWith('--')) {
			return;
		}

		if (reachable.has(decl.prop)) {
			return;
		}

		if (shouldPreserve(decl.prop, preserve)) {
			return;
		}

		decl.remove();
	});

	return root.toString();
}
