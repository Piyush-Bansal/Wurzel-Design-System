import { useBounds, usePointer, useSpaces } from '$lib/interactions';
import { getContext, setContext } from 'svelte';

class SpatialGallery {
	pointer = usePointer();
	galleryWrapper = $state<HTMLElement>();

	bounds = $derived.by(() => {
		if (!this.galleryWrapper) return;
		return useBounds(this.galleryWrapper);
	});
}

const KEY = Symbol('SpatialGallery');
export const setSpatialGallery = () => setContext(KEY, new SpatialGallery());
export const getSpatialGallery = () => getContext<SpatialGallery>(KEY);
