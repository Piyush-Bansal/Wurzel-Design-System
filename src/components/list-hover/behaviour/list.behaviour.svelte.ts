import type { HoverImageState } from '../state/hoverImage.state.svelte';
import type { ListState } from '../state/list.state.svelte';
import gsap from 'gsap';

export class ListBehaviour {
	constructor(
		private readonly listState: ListState,
		private readonly hoverImageState: HoverImageState
	) {
		$effect(() => {
			if (!this._yTo || !this.hoverImageState.yPosition) return;
			this._yTo(this.hoverImageState.yPosition);
		});

		//Animate images
		$effect(() => {
			if (!this.listState.selection?.current) return;

			this.listState.currentZ++;

			const animateImgTL = this.animateImage(
				this.listState.selection?.current,
				this.listState.currentZ
			);

			animateImgTL &&
				this._tl.add(animateImgTL, this._tl.isActive() ? '<40%' : undefined);
		});

		//On hoverout
		$effect(() => {
			if (this.listState.isImgVisible) return;

			this._tl.kill();
			this._tl = gsap.timeline();
			this.listState.currentZ = 1;

			for (const img of this.hoverImageState.images) {
				gsap.set(img.node, {
					yPercent: 0,
					zIndex: 1
				});
			}
		});
	}

	private _yTo = $derived.by(() => {
		if (!this.hoverImageState.imgWrapper) return;
		return gsap.quickTo(this.hoverImageState.imgWrapper, 'y', {
			duration: 0.1,
			ease: 'sine.inOut'
		});
	});

	private _tl: GSAPTimeline = gsap.timeline({
		autoRemoveChildren: true
	});

	animateImage(selection: number | string, z: number) {
		const img = this.hoverImageState.images.find(
			(data) => data.id === selection
		)?.node;

		if (!img) return;

		return gsap.fromTo(
			img,
			{
				yPercent: this.listState.selection?.direction === 1 ? -1 : 201,
				zIndex: z
			},
			{
				yPercent: 100,
				duration: 0.45,
				ease: 'power2.out',
				overwrite: true
			}
		);
	}

	destroy() {
		this.listState.selection.clear();
		this._tl.kill();
	}
}
