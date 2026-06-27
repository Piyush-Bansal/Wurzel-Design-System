import {
	loadImages,
	useBounds,
	usePointer,
	useSelection,
	useSpaces,
	type LoadImagesResult
} from '$lib/interactions';
import { getContext, setContext } from 'svelte';
import gsap from 'gsap';

class ListPreviewFunctionality {
	ids = $state<number[]>([]);
	selected = $derived(useSelection(() => this.ids));

	//lazy load images
	images = $state<string[]>([]);

	loadedImages: LoadImagesResult = $state({
		loaded: [],
		failed: []
	});

	private async _loadImages() {
		this.loadedImages = await loadImages(this.images);
	}

	//local pointer
	private _globalPointer = usePointer();

	listArea = $state<HTMLElement>();

	private _bounds = $derived.by(() => {
		if (!this.listArea) return;
		return useBounds(this.listArea);
	});

	private _localPointer = $derived.by(() => {
		if (!this._bounds) return;
		return useSpaces(this._globalPointer, this._bounds).local;
	});

	//move hover details
	hoveredDetails = $state<HTMLElement>();
	hoveredDetailsHeight = $state<number>(0);

	private _yPosition = $derived.by(() => {
		if (!this._localPointer) return;
		return this._localPointer?.y - this.hoveredDetailsHeight / 2;
	});

	private _yTo = $derived.by(() => {
		if (!this.hoveredDetails) return;

		return gsap.quickTo(this.hoveredDetails, 'y', {
			duration: 0.4,
			ease: 'back.out(1.6)'
		});
	});

	hover = $state<null | 'preview' | 'details'>(null);

	//lazy load images
	constructor() {
		//lazy load images
		$effect(() => {
			if (this.images.length === 0) return;
			this._loadImages();
		});

		//move hoverDetails
		$effect(() => {
			if (!this._yTo || !this._yPosition) return;
			this._yTo(this._yPosition);
		});
	}
}

const LIST_PREVIEW_KEY = 'list-preview';
export const setListPreviewFunctionality = () =>
	setContext(LIST_PREVIEW_KEY, new ListPreviewFunctionality());
export const getListPreviewFunctionality = () =>
	getContext<ListPreviewFunctionality>(LIST_PREVIEW_KEY);
