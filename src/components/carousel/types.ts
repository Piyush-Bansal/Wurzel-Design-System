import type { Snippet } from 'svelte';

export interface Carousel {
	autoscroll: boolean;
	indicator: boolean;
	controls: boolean;
	reverse: boolean;
	count: number;
	children: Snippet;
}

export interface CarouselContent {
	children: Snippet;
	size?: { lg: number; md: number; sm: number };
	gap?: Sizes;
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
	count: number;
	width: Sizes;
	gap: Sizes;
	currentWidth: number;
	currentGap?: number;
	active: number;
	carouselWidth: number;
	visibleCount: number;
	getCarouselWidth: string;
}
