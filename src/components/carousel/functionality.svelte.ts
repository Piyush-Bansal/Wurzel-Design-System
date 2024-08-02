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
	carouselWrapper: undefined | HTMLDivElement = $state();

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

	leftPadding = $derived.by(() => {
		if (!browser) {
			return 0;
		} else {
			return Number(
				getComputedStyle(document.documentElement).getPropertyValue(
					'--carousel-left-padding'
				)
			);
		}
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

	// visibleCount = $derived.by(() => {
	// 	const widthCarousel = this.carouselWidth / (this.currentWidth * this.count);
	// 	return widthCarousel;
	// });

	active = $state(0);

	private _returnFluidSize = (val: number): string => {
		return getFluidSize(val);
	};

	//set styling of carousel item and the gap between them
	getCarouselWidth = $derived(this._returnFluidSize(this.currentWidth));
	getCarouselGap = $derived(this._returnFluidSize(this.currentGap));

	// amountToMove = $derived(this._returnFluidSize(this.currentCombinedWidth));

	//calculate the position of each item in the carousel and initiate it with first item
	carouselPositions = $state([
		{ left: browser ? this._returnFluidSize(this.leftPadding) : '0' }
	]);

	isPositions = $state(false);

	calculatePositions() {
		for (let i = 1; i < this.count; i++) {
			const position = (this.currentCombinedWidth * i - this.leftPadding) * -1;
			console.log(position);
			const clampValue = this._returnFluidSize(position);
			this.carouselPositions.push({ left: clampValue });
		}
	}

	jumpToSlide(index: number) {
		if (!this.isPositions) {
			this.calculatePositions();
			this.isPositions = true;
			this.moveSlide(this.carouselPositions[index].left);
		} else {
			this.moveSlide(this.carouselPositions[index].left);
		}
	}

	moveSlide(pos: string | number) {
		if (!this.carouselWrapper) return;
		this.carouselWrapper.style.transform = `translateX(${pos})`;
	}
}

//Initiate
const CAROUSEL_KEY = Symbol('CAROUSEL');

export function setCarouselState() {
	return setContext(CAROUSEL_KEY, new CarouselState());
}

export function getCarouselState() {
	return getContext<ReturnType<typeof setCarouselState>>(CAROUSEL_KEY);
}
