import { getContext, setContext } from 'svelte';
import type { Sizes, State } from './types';
import { screenSize } from '$lib/helper-functions/screen-size.svelte';
import { getFluidSize } from '$lib/helper-functions/fluid-size';
import {
	ssLargeLow,
	ssMediumLow
} from '$lib/helper-functions/breakpoints-store.svelte';

import { browser } from '$app/environment';

class CarouselState implements State {
	carouselWrapper: undefined | HTMLDivElement = $state(undefined);

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

	leftPadding = $state({
		lg: 0,
		md: 0,
		sm: 0
	});

	active = $state(0);
	carouselWidth = $state(0);
	isPositions = $state(false);
	carouselPositions = $state<Array<{ left: string }>>([]);

	private _combinedWidth = $derived<Sizes>({
		lg: this.gap.lg + this.width.lg,
		md: this.gap.md + this.width.md,
		sm: this.gap.sm + this.width.sm
	});

	/**
	 * Determines the appropriate value based on the screen size.
	 *
	 * @param {Sizes} val - Object containing values for large, medium, and small screen sizes
	 * @return {number} The value corresponding to the current screen size
	 */
	private _screenSizeBasedValue(val: Sizes) {
		return screenSize.width >= ssLargeLow
			? val.lg
			: screenSize.width >= ssMediumLow
				? val.md
				: val.sm;
	}

	currentWidth = $derived(this._screenSizeBasedValue(this.width));
	currentGap = $derived(this._screenSizeBasedValue(this.gap));
	currentCombinedWidth = $derived(
		this._screenSizeBasedValue(this._combinedWidth)
	);

	//set styling of carousel item and the gap between them
	getCarouselWidth = $derived(getFluidSize(this.currentWidth));
	getCarouselGap = $derived(getFluidSize(this.currentGap));

	calculatePositions(): void {
		this.carouselPositions = [
			{
				left: browser
					? getFluidSize(this._screenSizeBasedValue(this.leftPadding))
					: '0'
			}
		];
		for (let i = 1; i < this.count; i++) {
			const position =
				this.currentCombinedWidth * i -
				this._screenSizeBasedValue(this.leftPadding);
			this.carouselPositions.push({
				left: `calc(${getFluidSize(position)} * -1)`
			});
		}
		this.isPositions = true;
	}

	jumpToSlide = (index: number): void => {
		if (!this.isPositions) {
			this.calculatePositions();
		}
		if (index >= 0 && index < this.count) {
			this.active = index;
			this.moveSlide(this.carouselPositions[index].left);
		}
	};

	moveSlide = (pos: string): void => {
		if (this.carouselWrapper) {
			this.carouselWrapper.style.transform = `translateX(${pos})`;
		}
	};

	nextSlide = (): void => {
		if (typeof this.active !== 'number') this.active = 0;
		if (this.active < this.count - 1) {
			this.active += 1;
			this.jumpToSlide(this.active);
		}
	};

	previousSlide = (): void => {
		if (typeof this.active !== 'number') this.active = 0;
		if (this.active > 0) {
			this.active -= 1;
			this.jumpToSlide(this.active);
		}
	};
}

//Initiate
const CAROUSEL_KEY = Symbol('CAROUSEL');

export function setCarouselState() {
	return setContext(CAROUSEL_KEY, new CarouselState());
}

export function getCarouselState() {
	return getContext<ReturnType<typeof setCarouselState>>(CAROUSEL_KEY);
}
