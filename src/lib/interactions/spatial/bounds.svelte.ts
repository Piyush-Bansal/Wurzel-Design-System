import { browser } from '$app/environment';
import { onDestroy } from 'svelte';

export function useBounds(element: HTMLElement) {
	const dimensions = $state({ width: 0, height: 0, top: 0, left: 0 });

	const measurements = {
		get rect() {
			return dimensions;
		}
	};

	if (!browser) return measurements;

	function measure() {
		const rect = element.getBoundingClientRect();
		dimensions.width = rect.width;
		dimensions.height = rect.height;
		dimensions.top = rect.top;
		dimensions.left = rect.left;
	}

	measure();

	const observer = new ResizeObserver(measure);
	observer.observe(element);

	let rafID: number | null = null;

	const onScroll = () => {
		if (rafID !== null) return;

		rafID = requestAnimationFrame(() => {
			rafID = null;
			measure();
		});
	};

	window.addEventListener('scroll', onScroll, { passive: true });

	onDestroy(() => {
		observer.disconnect();
		window.removeEventListener('scroll', onScroll);

		if (rafID !== null) {
			cancelAnimationFrame(rafID);
		}
	});

	return measurements;
}
