import gsap from 'gsap';
import { observeResize } from '$lib/interactions/observers/observeResize.svelte';

export class MarqueeItem {
	item = $state<HTMLElement>();
	startX: number = 0;
	private setter?: Function;

	readonly width = $derived.by(() => {
		observeResize.track();
		if (!this.item) return 0;
		return this.item.getBoundingClientRect().width;
	});

	constructor() {
		$effect(() => {
			observeResize.track();
			if (this.item) {
				this.startX = this.item.offsetLeft;
			}
		});

		$effect(() => {
			this.setter = this.item
				? gsap.quickSetter(this.item, 'x', 'px')
				: undefined;
		});
	}

	setX(value: number) {
		this.setter?.(value);
	}
}
