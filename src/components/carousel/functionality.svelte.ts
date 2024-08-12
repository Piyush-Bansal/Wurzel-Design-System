import { getContext, setContext } from 'svelte';
import type { Sizes, State } from './types';
import { screenSize } from '$lib/helper-functions/screen-size.svelte';
import { getFluidSize } from '$lib/helper-functions/fluid-size';
import {
	ssLargeLow,
	ssMediumLow
} from '$lib/helper-functions/breakpoints-store.svelte';
import type { Action } from 'svelte/action';
import { browser } from '$app/environment';
import { Interval } from '$lib/helper-functions/setInterval.svelte';
import { time10 } from '$lib/helper-functions/timing.svelte';

class CarouselState implements State {
	// State properties
	carouselWrapper: undefined | HTMLDivElement = $state(undefined);
	count = $state(0);
	width = $state<Sizes>({ lg: 0, md: 0, sm: 0 });
	gap = $state<Sizes>({ lg: 16, md: 16, sm: 12 });
	leftPadding = $state<Sizes>({ lg: 0, md: 0, sm: 0 });
	active = $state(0);
	carouselWidth = $state(0);
	isPositions = $state(false);
	carouselPositions = $state<Array<{ left: string }>>([]);

	// Configuration properties
	infinite = false;
	autoscroll = false;
	autoscrollDuration = time10;

	// Derived properties
	private _combinedWidth = $derived<Sizes>({
		lg: this.gap.lg + this.width.lg,
		md: this.gap.md + this.width.md,
		sm: this.gap.sm + this.width.sm
	});

	currentWidth = $derived(this._screenSizeBasedValue(this.width));
	currentGap = $derived(this._screenSizeBasedValue(this.gap));
	currentCombinedWidth = $derived(
		this._screenSizeBasedValue(this._combinedWidth)
	);
	getCarouselWidth = $derived(getFluidSize(this.currentWidth));
	getCarouselGap = $derived(getFluidSize(this.currentGap));

	// Helper methods
	private _screenSizeBasedValue(val: Sizes): number {
		return screenSize.width >= ssLargeLow
			? val.lg
			: screenSize.width >= ssMediumLow
				? val.md
				: val.sm;
	}

	// Core carousel methods
	calculatePositions = (): void => {
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
	};

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

	initialPosition = (): void => {
		if (!this.isPositions) {
			this.calculatePositions();
		}
		// if (!this.carouselPositions[0].left) return;
		this.moveSlide(this.carouselPositions[0].left);
	};

	nextSlide = (): void => {
		if (typeof this.active !== 'number') this.active = 0;
		if (this.active < this.count - 1) {
			this.active += 1;
			this.jumpToSlide(this.active);
		} else {
			this.autoScrollTimer.stop();
			if (this.infinite) {
				this.infiniteLoop();
			}
		}
		this.restartAutoScrollIfNeeded();
	};

	previousSlide = (): void => {
		if (typeof this.active !== 'number') this.active = 0;
		if (this.active > 0) {
			this.active -= 1;
			this.jumpToSlide(this.active);
		} else {
			this.autoScrollTimer.stop();
			if (this.infinite) {
				this.infiniteLoop();
			}
		}
		this.restartAutoScrollIfNeeded();
	};

	infiniteLoop = (): void => {
		this.active = this.active === this.count - 1 ? 0 : this.count - 1;
		this.jumpToSlide(this.active);
		this.restartAutoScrollIfNeeded();
	};

	// Auto-scroll functionality
	autoScrollTimer = new Interval<number, void>(this.autoscrollDuration);

	restartAutoScrollIfNeeded = (): void => {
		if (this.autoscroll && !this.autoScrollTimer.isRunning) {
			this.autoScrollTimer.start(this.nextSlide);
		}
	};

	autoScrollFunc: Action<HTMLDivElement> = () => {
		const startAutoScroll = () => {
			if (this.autoscroll) {
				this.autoScrollTimer.start(this.nextSlide);
			}
		};

		const stopAutoScroll = () => {
			this.autoScrollTimer.stop();
		};

		startAutoScroll();

		return {
			destroy: stopAutoScroll
		};
	};
}

// Context management
const CAROUSEL_KEY = Symbol('CAROUSEL');

export const setCarouselState = () =>
	setContext(CAROUSEL_KEY, new CarouselState());
export const getCarouselState = () => getContext<CarouselState>(CAROUSEL_KEY);
