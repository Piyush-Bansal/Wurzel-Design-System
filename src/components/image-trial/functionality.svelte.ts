import { useBounds, usePointer, useSpaces } from '$lib/interactions';
import { getContext, setContext } from 'svelte';

class TrailFunctionality {
	trailArea = $state<HTMLElement>();

	pointer = $derived(this._createPointer());

	private _createPointer() {
		const globalPointer = usePointer();
		const bound = $derived.by(() => {
			if (!this.trailArea) return;
			return useBounds(this.trailArea);
		});

		const space = $derived.by(() => {
			if (!this.trailArea || !bound) return;
			return useSpaces(globalPointer, bound).local;
		});
		return { space };
	}
}

const KEY = Symbol('imageTrail');
export const setImageTrailFunctionality = () => {
	return setContext(KEY, new TrailFunctionality());
};
export const getImageTrailFunctionality = () =>
	getContext<TrailFunctionality>(KEY);
