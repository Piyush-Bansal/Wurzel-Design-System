import {
	lazyLoadImages,
	useBounds,
	usePointer,
	useSelection
} from '$lib/interactions';
import { getContext, setContext } from 'svelte';

import type { CardDetails } from './types';

class SpatialGallery {
	pointer = usePointer();
	galleryWrapper = $state<HTMLElement>();

	bounds = $derived.by(() => {
		if (!this.galleryWrapper) return;
		return useBounds(this.galleryWrapper);
	});

	ids: number[] = $state([]);
	selected = $derived(useSelection(() => this.ids));
	isAnyCardSelected = $state(false);
	isGalleryOpen = $state(false);

	data: CardDetails[] = $state([]);

	_imageSources = $derived.by(() => {
		if (this.data.length === 0) return;
		return this.data.map((item) => {
			return { id: item.id, src: item.image };
		});
	});

	imageResources = $derived.by(() => {
		if (!this._imageSources) return;
		return lazyLoadImages(this._imageSources, () => this.galleryWrapper);
	});
}

const KEY = Symbol('SpatialGallery');
export const setSpatialGallery = () => setContext(KEY, new SpatialGallery());
export const getSpatialGallery = () => getContext<SpatialGallery>(KEY);
