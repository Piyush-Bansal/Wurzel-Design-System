import { type ImageData } from '$lib/interactions';

export interface ListItemProps {
	index: number;
	content: string;
	id: number | string;
}

export interface HoverImageProps {
	imageData: ImageData[];
}
