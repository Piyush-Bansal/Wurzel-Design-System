import { getContext, setContext } from 'svelte';
import type { Sizes, State } from './types';
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

	private _combinedWidth = $derived({
		lg: this.gap.lg + this.width.lg,
		md: this.gap.md + this.width.md,
		sm: this.gap.sm + this.width.sm
	});

	private _screenSizeBasedValue = (val: Sizes) => {
		return screenSize.width >= ssLargeLow
			? val.lg
			: screenSize.width >= ssMediumLow
				? val.md
				: val.sm;
	};

	currentWidth = $derived(this._screenSizeBasedValue(this.width));
	currentGap = $derived(this._screenSizeBasedValue(this.gap));
	currentCombinedWidth = $derived(
		this._screenSizeBasedValue(this._combinedWidth)
	);

	carouselWidth = $state(0);

	visibleCount = $derived.by(() => {
		const widthCarousel = this.carouselWidth / (this.currentWidth * this.count);
		return widthCarousel;
	});

	active = $state(0);

	private _returnFluidSize = (val: number) => {
		return getFluidSize(val);
	};

	getCarouselWidth = $derived(this._returnFluidSize(this.currentWidth));
	getCarouselGap = $derived(this._returnFluidSize(this.currentGap));
	amountToMove = $derived(this._returnFluidSize(this.currentCombinedWidth));
}

const CAROUSEL_KEY = Symbol('CAROUSEL');

export function setCarouselState() {
	return setContext(CAROUSEL_KEY, new CarouselState());
}

export function getCarouselState() {
	return getContext<ReturnType<typeof setCarouselState>>(CAROUSEL_KEY);
}
