import type { Interval } from '$lib/helper-functions/setInterval.svelte';
import type { Snippet } from 'svelte';
import type { Action } from 'svelte/action';

export interface Carousel {
	autoscroll: boolean;
	indicator: boolean;
	controls: boolean;
	count: number;
	autoScrollDuration?: number;
	infinite?: boolean;
	children: Snippet;
}

export interface CarouselContent {
	children: Snippet;
	size?: Sizes;
	gap?: Sizes;
	leftPadding?: Sizes;
}

export type Sizes = {
	lg: number;
	md: number;
	sm: number;
};

export interface CarouselItem {
	children: Snippet;
}

export interface State {
	carouselWrapper: undefined | HTMLDivElement;
	count: number;
	width: Sizes;
	gap: Sizes;
	leftPadding: Sizes;
	active: number;
	carouselWidth: number;
	isPositions: boolean;
	carouselPositions: Array<{ left: string }>;
	infinite: boolean;
	autoscroll: boolean;
	autoscrollDuration: number;
	currentWidth: number;
	currentGap: number;
	currentCombinedWidth: number;
	getCarouselWidth: string;
	getCarouselGap: string;
	autoScrollTimer: Interval<number, void>;

	calculatePositions: () => void;
	jumpToSlide: (index: number) => void;
	moveSlide: (pos: string) => void;
	nextSlide: () => void;
	previousSlide: () => void;
	infiniteLoop: () => void;
	restartAutoScrollIfNeeded: () => void;
	autoScrollFunc: Action<HTMLDivElement>;
}

export interface IndicatorDot {
	index: number;
}
