export function useDecay(value: number, duration: number, deltaTime: number) {
	if (value === 0) return 0;

	const factor = Math.pow(0.01, deltaTime / duration);
	const result = value * factor;

	return Math.abs(result) < 0.1 ? 0 : result;
}
