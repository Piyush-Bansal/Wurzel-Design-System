import type { Snippet } from 'svelte';
import type { Action } from 'svelte/action';

export interface Carousel {
	autoscroll: boolean;
	indicator: boolean;
	controls: boolean;
	reverse: boolean;
	count: number;
	autoScrollDuration?: number;
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
	currentWidth: number;
	currentGap: number;
	currentCombinedWidth: number;
	getCarouselWidth: string;
	getCarouselGap: string;

	calculatePositions: () => void;
	nextSlide: () => void;
	previousSlide: () => void;

	autoScrollFunc: Action<
		HTMLDivElement,
		{ duration: number; autoScroll: boolean } | undefined
	>;
}

export interface IndicatorDot {
	index: number;
}
