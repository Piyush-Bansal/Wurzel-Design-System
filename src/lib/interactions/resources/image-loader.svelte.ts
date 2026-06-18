import { browser } from '$app/environment';

type LoadImagesResult = {
	loaded: string[];
	failed: string[];
};

function loadImage(src: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const img = new Image();

		img.onload = () => resolve(src);
		img.onerror = () => reject(src);

		img.src = src;
	});
}

export async function loadImages(images: string[]): Promise<LoadImagesResult> {
	if (!browser) {
		throw new Error('loadImages can only run in the browser');
	}

	if (images.length === 0) {
		throw new Error('No images supplied');
	}

	const results = await Promise.allSettled(images.map(loadImage));

	return {
		loaded: results
			.filter(
				(result): result is PromiseFulfilledResult<string> =>
					result.status === 'fulfilled'
			)
			.map((result) => result.value),

		failed: results
			.filter(
				(result): result is PromiseRejectedResult =>
					result.status === 'rejected'
			)
			.map((result) => result.reason as string)
	};
}
