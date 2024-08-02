import { getContext, setContext } from 'svelte';
import type { State } from './types';
import { screenSize } from '$lib/helper-functions/screen-size.svelte';
import { getFluidSize } from '$lib/helper-functions/fluid-size';
import {
	ssLargeLow,
	ssMediumLow
} from '$lib/helper-functions/breakpoints-store.svelte';

class CarouselState implements State {
	count = $state(0);

	width = $state({
		lg: 0,
		md: 0,
		sm: 0
	});

	gap = $state({
		lg: 16,
		md: 16,
		sm: 12
	});

	//compare what is the current width
	currentWidth = $derived(
		screenSize.width >= ssLargeLow
			? this.width.lg
			: screenSize.width >= ssMediumLow
				? this.width.md
				: this.width.sm
	);

	currentGap = $derived(
		screenSize.width >= ssLargeLow
			? this.gap.lg
			: screenSize.width >= ssMediumLow
				? this.gap.md
				: this.gap.sm
	);

	carouselWidth = $state(0);

	visibleCount = $derived.by(() => {
		const widthCarousel = this.carouselWidth / (this.currentWidth * this.count);
		return widthCarousel;
	});

	active = $state(1);

	getCarouselWidth = $derived.by(() => {
		return getFluidSize(this.currentWidth);
	});

	getCarouselGap = $derived.by(() => {
		return getFluidSize(this.currentGap);
	});
}

const CAROUSEL_KEY = Symbol('CAROUSEL');

export function setCarouselState() {
	return setContext(CAROUSEL_KEY, new CarouselState());
}

export function getCarouselState() {
	return getContext<ReturnType<typeof setCarouselState>>(CAROUSEL_KEY);
}
