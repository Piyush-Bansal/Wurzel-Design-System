import {
	lazyLoadImages,
	useBounds,
	useLocalPointer,
	usePointer,
	useSelection
} from '$lib/interactions';
import { getContext, setContext } from 'svelte';
import type { CardDetails } from '../types';

export class GalleryState {
	// DOM
	galleryWrapper = $state<HTMLElement>();

	// Input
	pointer = $derived(
		this.galleryWrapper && useLocalPointer(this.galleryWrapper).local
	);

	//Geometry
	bounds = $derived(this.galleryWrapper && useBounds(this.galleryWrapper));

	// Data
	data: CardDetails[] = $state([]);

	// Selection
	ids: number[] = $state([]);
	isAnyCardSelected = $state(false);
	isGalleryOpen = $state(false);
	selected = $derived(useSelection(() => this.ids));

	// Resources
	dataImages = $derived(
		this.data.length > 0 &&
			this.data.map((item) => {
				return { id: item.id, src: item.image };
			})
	);

	loadedImages = $derived(
		this.dataImages &&
			lazyLoadImages(this.dataImages, () => this.galleryWrapper)
	);
}

const KEY = Symbol('GalleryState');
export const getGalleryState = () => getContext<GalleryState>(KEY);
export const setGalleryState = () => setContext(KEY, new GalleryState());
