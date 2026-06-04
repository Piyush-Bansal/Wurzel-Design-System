export interface ImageCycler {
	images: string[];
	active: boolean;
	interval?: number;
	aspectRatio?: string;
	borderRadius?: 'none' | 'tight' | 'default' | 'soft' | 'large' | 'full';
}
