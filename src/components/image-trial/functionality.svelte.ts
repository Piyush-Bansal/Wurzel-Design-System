import {
	createDistanceTrigger,
	loadImages,
	useBounds,
	useIntersection,
	usePointer,
	useSpaces,
	useVelocity,
	type LoadImagesResult,
	type Point
} from '$lib/interactions';
import type { Attachment } from 'svelte/attachments';

import type { TrailItem } from './types';
import gsap from 'gsap';
import { getContext, setContext, untrack } from 'svelte';

class TrailFunctionality {
	trailArea = $state<HTMLDivElement>();

	isHovering = $state(false);

	private _globalPointer = usePointer();
	private _velocity = useVelocity(this._globalPointer);

	private _trigger = createDistanceTrigger();

	private _loadedImages: LoadImagesResult = {
		loaded: [],
		failed: []
	};

	private _imageIndex = 0;
	private _zIndex = $state(0);

	trail = $state<TrailItem[]>([]);

	private _intersection = $derived(
		useIntersection(() => this.trailArea, { rootMargin: '100px 0px 100px 0px' })
	);
	constructor(private images: string[]) {
		$effect(() => {
			if (!this._intersection) return;
			if (this._intersection.isIntersecting) {
				this._loadImages();
				this._intersection.disconnect();
			}
		});

		$effect(() => {
			if (!this.localPointer) return;
			this._trigger.check(this.localPointer, (position) =>
				this._spawnImage(position)
			);
		});

		$effect(() => {
			if (this.trail.length === 0) {
				this._zIndex = 0;
			}
		});
	}

	private _bounds = $derived.by(() => {
		if (!this.trailArea) return;

		return useBounds(this.trailArea);
	});

	readonly localPointer = $derived.by(() => {
		if (!this._bounds) return;

		const spaces = useSpaces(this._globalPointer, this._bounds);
		return spaces.local;
	});

	private async _loadImages() {
		this._loadedImages = await loadImages(this.images);
	}

	private _spawnImage(position: Point) {
		if (this._loadedImages.loaded.length === 0) return;

		this._zIndex++;

		const targetIndex = this._imageIndex % this._loadedImages.loaded.length;

		this.trail.push({
			id: crypto.randomUUID(),
			x: position.x,
			y: position.y,
			z: this._zIndex,
			src: this._loadedImages.loaded[targetIndex],
			speed: this._velocity.speed,
			angle: this._velocity.angleDegree
		});

		this._imageIndex++;
	}

	removeImage(id: string) {
		this.trail = this.trail.filter((entry) => entry.id !== id);
	}

	animate(details: TrailItem): Attachment {
		return (element) => {
			const travelDistance = gsap.utils.mapRange(0, 80, 10, 120, details.speed);

			const tl = gsap.timeline({
				onComplete: () => this.removeImage(details.id)
			});

			tl.fromTo(
				element,
				{ scale: 0.4 },
				{
					scale: 1,
					ease: 'power2.out',
					duration: 0.25,
					rotate: gsap.utils.mapRange(-180, 180, -30, 30, details.angle)
				}
			).to(element, {
				yPercent: travelDistance,
				ease: 'power2.in',
				duration: 0.2,
				delay: 2
			});
		};
	}
}

const KEY = Symbol('imageTrail');
export const setImageTrailFunctionality = (images: string[]) => {
	return setContext(KEY, new TrailFunctionality(images));
};
export const getImageTrailFunctionality = () =>
	getContext<TrailFunctionality>(KEY);
