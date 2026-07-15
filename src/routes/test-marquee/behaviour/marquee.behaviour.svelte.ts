import gsap from 'gsap';
import type MarqueeState from '../state/marquee.state.svelte';

export class MarqueeBehaviour {
	private readonly speed = 1;

	constructor(private readonly marquee: MarqueeState) {
		$effect(() => this.measure());
		$effect(() => {
			if (this.marquee.items.length === 0) return;
			gsap.ticker.add(this.tick);
			return () => gsap.ticker.remove(this.tick);
		});
	}

	private measure() {
		for (const item of this.marquee.items) {
			if (!item.item) continue;

			item.startX = item.item.offsetLeft;
		}
	}

	private tick = () => {
		this.update();
		this.render();
	};

	private update() {
		this.marquee.offset -= this.speed;
	}

	private render() {
		const width = this.marquee.trackWidth;

		if (width === 0) return;

		for (const item of this.marquee.items) {
			if (!item.item) continue;

			const visualX = this.wrap(item.startX + this.marquee.offset, width);

			gsap.set(item.item, {
				x: visualX - item.startX
			});
		}
	}

	private wrap(value: number, width: number) {
		return ((value % width) + width) % width;
	}
}
