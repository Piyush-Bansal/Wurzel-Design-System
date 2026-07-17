import gsap from 'gsap';
import type MarqueeState from '../state/marquee.state.svelte';

export class MarqueeBehaviour {
	private readonly speed = 60;

	constructor(private readonly marquee: MarqueeState) {
		$effect(() => {
			if (this.marquee.items.length === 0) return;
			gsap.ticker.add(this.tick);
			return () => gsap.ticker.remove(this.tick);
		});
	}

	private tick = (time: number, deltaTime: number) => {
		this.update(deltaTime);
		this.render();
	};

	private update(deltaTime: number) {
		const dt = Math.min(deltaTime / 1000, 1 / 30);
		this.marquee.offset -= this.speed * dt;
	}

	private render() {
		const width = this.marquee.trackWidth;
		if (width === 0) return;

		const offset = this.marquee.offset;

		for (const item of this.marquee.items) {
			if (!item.item) continue;
			const raw = item.startX + offset;
			const visualX = gsap.utils.wrap(-item.width, width, raw);
			item.setX(visualX - item.startX);
		}
	}
}
