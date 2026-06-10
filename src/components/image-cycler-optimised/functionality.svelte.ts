import { getContext, setContext } from 'svelte';

class ImageCyclerFunctionality {
	active = $state(false);
	currentSrc = $state('');

	currentIndex = 0;
	intervalDuration = 200;
	images: string[] = [];

	private cache = new Map<string, Promise<void>>();
	private sessionId = 0;
	private timeout: number | null = null;

	constructor() {
		$effect(() => {
			console.log('EFFECT', this.active);

			if (this.active) {
				this.start();
			} else {
				this.stop();
			}
		});
	}

	async preload(src: string) {
		const existing = this.cache.get(src);

		if (existing) {
			return existing;
		}

		const promise = new Promise<void>((resolve, reject) => {
			const img = new Image();

			img.onload = async () => {
				try {
					await img.decode();
					resolve();
				} catch (error) {
					reject(error);
				}
			};

			img.onerror = reject;
			img.src = src;
		});

		this.cache.set(src, promise);

		return promise;
	}

	start() {
		if (!this.images.length) return;

		const session = ++this.sessionId;

		console.log('START', session);

		void this.cycle(session);
	}

	stop() {
		console.log('STOP', this.sessionId);

		this.sessionId++;

		if (this.timeout !== null) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		this.currentIndex = 0;

		if (this.images.length) {
			this.currentSrc = this.images[0];
		}
	}

	private async cycle(session: number) {
		if (session !== this.sessionId) return;

		const nextIndex = (this.currentIndex + 1) % this.images.length;

		const nextSrc = this.images[nextIndex];

		const futureIndex = (nextIndex + 1) % this.images.length;

		const futureSrc = this.images[futureIndex];

		// warm next-next image
		void this.preload(futureSrc);

		try {
			await this.preload(nextSrc);
		} catch (error) {
			console.error(error);
			return;
		}

		if (session !== this.sessionId) return;

		this.timeout = window.setTimeout(() => {
			if (session !== this.sessionId) return;

			this.currentIndex = nextIndex;
			this.currentSrc = nextSrc;

			console.log('TICK', session, nextIndex);

			void this.cycle(session);
		}, this.intervalDuration);
	}
}

const KEY = Symbol('ImageCyclerFunctionality');

export const setImageCyclerFunctionality = () =>
	setContext(KEY, new ImageCyclerFunctionality());

export const getImageCyclerFunctionality = () =>
	getContext<ImageCyclerFunctionality>(KEY);
