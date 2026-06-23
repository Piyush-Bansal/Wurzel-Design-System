import {
	loadImages,
	useBounds,
	usePointer,
	useSelection,
	useSpaces,
	type LoadImagesResult
} from '$lib/interactions';
import gsap from 'gsap';
import { getContext, setContext } from 'svelte';

class Hover {
	//lazy load images
	imageUrls = $state<string[]>([]);

	loadedImages: LoadImagesResult = $state({
		loaded: [],
		failed: []
	});
	private async _loadImages() {
		this.loadedImages = await loadImages(this.imageUrls);
	}

	//pointer
	private _globalPointer = usePointer();
	listArea = $state<HTMLElement>();

	private _bonds = $derived.by(() => {
		if (!this.listArea) return;
		return useBounds(this.listArea);
	});

	private _local_pointer = $derived.by(() => {
		if (!this._bonds) return;
		return useSpaces(this._globalPointer, this._bonds).local;
	});

	//y position
	imgWrapper = $state<HTMLElement>();
	imageWrapperHeight = $state(0);
	private _yPosition = $derived.by(() => {
		if (!this._local_pointer) return;
		return this._local_pointer.y - this.imageWrapperHeight / 2;
	});

	private _yTo = $derived.by(() => {
		if (!this.imgWrapper) return;
		return gsap.quickTo(this.imgWrapper, 'y', {
			duration: 0.1,
			ease: 'sine.inOut'
		});
	});

	//selection
	images: HTMLImageElement[] = [];
	selection = $derived(useSelection(() => this.images));

	//Images
	isImgVisible = $state(false);
	currentZ = 1;

	//Animation
	private _tl: GSAPTimeline = gsap.timeline({
		autoRemoveChildren: true
	});

	animateImage(img: HTMLImageElement, z: number) {
		return gsap.fromTo(
			img,
			{
				yPercent: this.selection?.direction === 1 ? -1 : 201,
				zIndex: z
			},
			{
				yPercent: 100,
				duration: 0.45,
				ease: 'power2.out',
				overwrite: true
			}
		);
	}

	destroy() {
		this._tl.kill();
	}

	constructor() {
		//lazyLoad images
		$effect(() => {
			if (this.imageUrls.length === 0) return;
			this._loadImages();
		});

		//Move Image wrapper
		$effect(() => {
			if (!this._yTo || !this._yPosition) return;
			this._yTo(this._yPosition);
		});

		//Animate images
		$effect(() => {
			if (!this.selection?.current) return;

			this.currentZ++;
			this._tl.add(
				this.animateImage(this.selection?.current, this.currentZ),
				this._tl.isActive() ? '<40%' : undefined
			);
		});

		//On hoverout
		$effect(() => {
			if (this.isImgVisible) return;

			this._tl.kill();
			this._tl = gsap.timeline();
			this.currentZ = 1;

			for (const img of this.images) {
				gsap.set(img, {
					yPercent: 0,
					zIndex: 1
				});
			}
		});
	}
}

const HOVER_KEY = Symbol('hover');
export const setHoverState = () => setContext(HOVER_KEY, new Hover());
export const getHoverState = () => getContext<Hover>(HOVER_KEY);
