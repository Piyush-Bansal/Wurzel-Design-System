import {
	loadImages,
	useIntersection,
	type LoadImagesResult
} from '$lib/interactions';

export const lazyLoadImages = function (
	imageSrc: string[],
	parentNode: () => HTMLElement | undefined,
	options: IntersectionObserverInit = { rootMargin: '100px 0px 100px 0px' }
) {
	const intersection = $derived(useIntersection(parentNode, options));

	let loadedImages: LoadImagesResult = $state({
		loaded: [],
		failed: []
	});

	let running = false;

	const run = async () => {
		if (running) return;
		if (!intersection?.isIntersecting) return;

		running = true;

		try {
			const result = await loadImages(imageSrc);

			loadedImages.loaded = result.loaded;
			loadedImages.failed = result.failed;

			intersection.disconnect();
		} catch (error) {
			console.error(error);
		} finally {
			running = false;
		}
	};

	const destroy = $effect.root(() => {
		$effect(() => {
			run();
		});

		$effect(() => {
			if (loadedImages.loaded.length || loadedImages.failed.length) {
				destroy();
			}
		});
	});

	return {
		get loaded() {
			return loadedImages;
		}
	};
};
