import { useBounds, usePointer, useSpaces } from '$lib/interactions';

export const useLocalPointer = (node: HTMLElement) => {
	const pointer = usePointer();
	const bounds = $derived.by(() => useBounds(node));
	const localPointer = $derived.by(() => useSpaces(pointer, bounds).local);
	return localPointer;
};
