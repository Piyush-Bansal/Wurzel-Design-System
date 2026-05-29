import type { Spring } from 'svelte/motion';

export interface ListItemProps {
	index: number;
	content: string;
}

export interface HoverImageProps {
	src: string;
	alt?: string;
}

export interface HoverFunctionality {
	yAxis: Spring<number>;
	imageWrapperHeight: number;
	imageIsVisible: boolean;
}
