import type { CardDetails } from '../types';
import type { GalleryState } from './gallery.state.svelte';

export const CardMotionState = {
	Idle: 'idle',
	Hover: 'hover',
	Dimmed: 'dimmed',
	Selected: 'selected',
	Background: 'background'
} as const;

export class IndividualCardState {
	card = $state<HTMLDivElement>();
	flipTarget = $state<HTMLDivElement>();

	isSelected;
	cardMotionState;

	image = $derived.by(() => {
		if (!this.gallery.loadedImages) return;

		return this.gallery.loadedImages.loaded.find(
			(image) => image.id === this.cardDetails.id
		);
	});

	constructor(
		public readonly cardDetails: CardDetails,
		public readonly index: number,
		private readonly gallery: GalleryState
	) {
		this.isSelected = $derived.by(() => {
			return this.gallery.selected?.current === cardDetails.id;
		});

		this.cardMotionState = $derived.by(() => {
			if (this.gallery.isGalleryOpen && this.isSelected) {
				return CardMotionState.Selected;
			}
			if (this.gallery.isGalleryOpen) return CardMotionState.Background;
			if (this.isSelected) return CardMotionState.Hover;
			if (this.gallery.isAnyCardSelected) return CardMotionState.Dimmed;
			return CardMotionState.Idle;
		});
	}
}
