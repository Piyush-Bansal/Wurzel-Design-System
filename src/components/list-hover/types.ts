import type { Spring } from 'svelte/motion';

export interface ListItemProps {
	index: number;
	content: string;
}

export interface HoverImageProps {
	urls: string[];
	alt?: string;
}
