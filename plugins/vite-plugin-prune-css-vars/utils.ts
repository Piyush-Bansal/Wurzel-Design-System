import { type PreserveMatcher } from './types';

export function shouldPreserve(
	name: string,
	preserve: PreserveMatcher[]
): boolean {
	for (const rule of preserve) {
		if (typeof rule === 'string') {
			if (rule === name) return true;
		} else {
			if (rule.test(name)) return true;
		}
	}

	return false;
}
