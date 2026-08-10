export function useLerp(
	startValue: number,
	targetValue: number,
	factor: number
) {
	return startValue + (targetValue - startValue) * factor;
}
