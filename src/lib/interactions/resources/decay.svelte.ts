export function useDecay(current: number, target: number, factor: number) {
	return target + (current - target) * factor;
}
