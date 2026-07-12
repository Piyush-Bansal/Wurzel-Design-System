import {
	lazyLoadImages,
	useBounds,
	usePointer,
	useSelection
} from '$lib/interactions';
import { getContext, setContext } from 'svelte';
import type { CardDetails } from '../types';

export class GalleryState {
	// DOM
	galleryWrapper = $state<HTMLElement>();

	// Input
	pointer = usePointer();

	//Geometry
	bounds = $derived.by(() => {
		if (!this.galleryWrapper) return;
		return useBounds(this.galleryWrapper);
	});

	// Data
	data: CardDetails[] = $state([]);

	// Selection
	ids: number[] = $state([]);
	isAnyCardSelected = $state(false);
	isGalleryOpen = $state(false);
	selected = $derived(useSelection(() => this.ids));

	// Resources
	dataImages = $derived.by(() => {
		if (this.data.length === 0) return;
		return this.data.map((item) => {
			return { id: item.id, src: item.image };
		});
	});

	loadedImages = $derived.by(() => {
		if (!this.dataImages) return;
		return lazyLoadImages(this.dataImages, () => this.galleryWrapper);
	});
}

const KEY = Symbol('GalleryState');
export const getGalleryState = () => getContext<GalleryState>(KEY);
export const setGalleryState = () => setContext(KEY, new GalleryState());
