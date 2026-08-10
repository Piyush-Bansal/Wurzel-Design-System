import { useLerp } from './lerp.svelte';

export function useDecay(
	startValue: number,
	targetValue: number,
	factor: number
) {
	if (targetValue === startValue) return targetValue;
	const result = useLerp(targetValue, startValue, factor);
	console.log(startValue, targetValue, result);
	return Math.abs(result) <= targetValue + 0.1 ? targetValue : result;
}
