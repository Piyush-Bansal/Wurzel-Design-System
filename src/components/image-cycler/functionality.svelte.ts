import { getContext, setContext } from 'svelte';

class ImageCyclerFunctionality {
	active = $state(false);
	currentIndex = $state(0);
	noOfImages: number = $state(0);
	intervalDuration: number = 0;
	interval: ReturnType<typeof setInterval> | null = null;

	constructor() {
		$effect(() => {
			if (this.noOfImages <= 1) return;

			if (this.active) {
				this.currentIndex = 1;

				this.interval = setInterval(() => {
					this.currentIndex = (this.currentIndex + 1) % this.noOfImages;
				}, this.intervalDuration || 0);
			} else {
				this.stop();
			}

			return () => this.stop();
		});
	}

	stop() {
		this.currentIndex = 0;

		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}
}

const KEY = Symbol('ImageCyclerFunctionality');
export const setImageCyclerFunctionality = () => {
	return setContext(KEY, new ImageCyclerFunctionality());
};
export const getImageCyclerFunctionality = () =>
	getContext<ImageCyclerFunctionality>(KEY);
