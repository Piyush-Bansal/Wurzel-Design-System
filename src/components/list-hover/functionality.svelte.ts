import gsap from 'gsap';
import { getContext, setContext } from 'svelte';
import { Spring } from 'svelte/motion';
import type { HoverFunctionality } from './types';

class Hover implements HoverFunctionality {
	yAxis = new Spring(0, { stiffness: 0.1, damping: 0.4 });
	imageWrapperHeight = $state(0);
	isImgVisible = $state(false);
	hoverQueue = $state<number[]>([]);
	images: HTMLImageElement[] = [];

	currentZ = 1;
	private _tl: GSAPTimeline = gsap.timeline({
		autoRemoveChildren: true
	});

	constructor() {
		$effect(() => {
			if (!this.hoverQueue.length || !this.isImgVisible) return;

			const index = this.hoverQueue.shift();
			if (index === undefined) return;

			const img = this.images[index];
			if (!img) return;

			this.currentZ++;

			this._tl.add(
				this.animateImage(img, this.currentZ),
				this._tl.isActive() ? '<40%' : undefined
			);
		});

		$effect(() => {
			if (this.isImgVisible) return;

			this._tl.kill();
			this._tl = gsap.timeline();
			this.currentZ = 1;
			this.hoverQueue.length = 0;

			for (const img of this.images) {
				gsap.set(img, {
					yPercent: 0,
					zIndex: 1
				});
			}
		});
	}

	animateImage(img: HTMLImageElement, z: number) {
		return gsap.fromTo(
			img,
			{ yPercent: 0, zIndex: z },
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
}

const HOVER_KEY = Symbol('hover');
export const setHoverState = () => setContext(HOVER_KEY, new Hover());
export const getHoverState = () => getContext<Hover>(HOVER_KEY);
