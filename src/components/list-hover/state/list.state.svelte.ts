import {
	lazyLoadImages,
	useLocalPointer,
	useSelection,
	type ImageData
} from '$lib/interactions';
import { getContext, setContext } from 'svelte';

export class ListState {
	//Lazy load images
	imageUrls = $state<ImageData[]>([]);
	listArea = $state<HTMLElement>();
	readonly images = $derived(
		this.imageUrls && lazyLoadImages(this.imageUrls, () => this.listArea)
	);

	//Local pointer
	localPointer = $derived(this.listArea && useLocalPointer(this.listArea));

	isImgVisible = $state(false);
	currentZ = 1;

	//selection
	selection = $derived(
		useSelection(() => this.imageUrls.map((item) => item.id))
	);

	constructor() {
		$inspect(this.images);
	}
}

const KEY = Symbol('ListState');
export const setListState = () => setContext(KEY, new ListState());
export const getListState = () => getContext<ListState>(KEY);
