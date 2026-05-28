export interface ListItemProps {
	index: number;
	content: string;
}

export interface HoverImageProps {
	src: string;
	alt?: string;
}

export interface HoverFunctionality {
	yAxis: number;
	imageWrapperHeight: number;
	imageIsVisible: boolean;
}
