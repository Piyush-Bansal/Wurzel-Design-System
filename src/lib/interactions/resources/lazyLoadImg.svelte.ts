import {
	loadImages,
	useIntersection,
	type LoadImagesResult,
	type ImageData
} from '$lib/interactions';

export const lazyLoadImages = (
	imageSrc: ImageData[],
	parentNode: () => HTMLElement | undefined,
	options: IntersectionObserverInit = {
		rootMargin: '100px 0px 100px 0px'
	}
) => {
	const intersection = $derived(useIntersection(parentNode, options));

	const images = $state<LoadImagesResult>({
		loaded: [],
		failed: []
	});

	let running = false;

	function run() {
		if (running) return;
		if (!intersection?.isIntersecting) return;

		running = true;

		loadImages(imageSrc, {
			onLoad(image) {
				images.loaded.push(image);
			},

			onError(image) {
				images.failed.push(image);
			},

			onComplete() {
				intersection.disconnect();
				running = false;
			}
		});
	}

	const destroy = $effect.root(() => {
		$effect(() => {
			run();
		});

		$effect(() => {
			if (
				images.loaded.length + images.failed.length === imageSrc.length &&
				imageSrc.length > 0
			) {
				destroy();
			}
		});
	});

	return images;
};
