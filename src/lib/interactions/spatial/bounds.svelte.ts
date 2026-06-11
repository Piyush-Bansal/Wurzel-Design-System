import { browser } from '$app/env';
import { onDestroy } from 'svelte';

export function useBounds(element: HTMLElement) {
	const dimensions = $state({ width: 0, height: 0, top: 0, left: 0 });

	const measurements = {
		get rect() {
			return dimensions;
		}
	};

	if (!browser) return measurements;
	measure();

	function measure() {
		const rect = element.getBoundingClientRect();
		dimensions.width = rect.width;
		dimensions.height = rect.height;
		dimensions.top = rect.top;
		dimensions.left = rect.left;
	}

	const observer = new ResizeObserver(() => {
		measure();
	});

	observer.observe(element);

	let rafID: null | number = null;
	window.addEventListener(
		'scroll',
		() => {
			if (rafID !== null) return;
			rafID = requestAnimationFrame(() => {
				rafID = null;
				measure();
			});
		},
		{ passive: true }
	);

	onDestroy(() => {
		observer.disconnect();
		window.removeEventListener('scroll', measure);
	});

	return measurements;
}
