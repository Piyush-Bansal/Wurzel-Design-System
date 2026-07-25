import { useIntersection } from '$lib/interactions';
import gsap from 'gsap';
import type MarqueeState from '../state/marquee.state.svelte';

export class MarqueeBehaviour {
	private _intersection = useIntersection(() => this._marquee.marqueeWrapper, {
		rootMargin: '0px'
	});

	private _motion = {
		activity: 1
	};

	constructor(
		private readonly _marquee: MarqueeState,
		private readonly _speed = 60,
		private readonly _direction = 1
	) {
		$effect(() => {
			if (!this._intersection?.isIntersecting) return;
			gsap.ticker.add(this._tick);
			this._intersection.disconnect();
			return () => this.destroy();
		});
	}

	private _tick = (time: number, deltaTime: number) => {
		if (this._marquee.items.length === 0) return;
		this._update(deltaTime);
		this._render();
	};

	private _update(deltaTime: number) {
		const dt = Math.min(deltaTime / 1000, 1 / 30);
		this._marquee.offset -=
			this._speed * this._direction * this._motion.activity * dt;
	}

	private _render() {
		const width = this._marquee.trackWidth;
		if (width === 0) return;

		const offset = this._marquee.offset;

		for (const item of this._marquee.items) {
			if (!item.item) continue;

			const raw = item.startX + offset;
			const visualX = gsap.utils.wrap(-item.width, width - item.width, raw);

			item.setX(visualX - item.startX);
		}
	}

	private destroy() {
		gsap.ticker.remove(this._tick);
		this._intersection?.disconnect();
	}

	pause() {
		gsap.to(this._motion, {
			activity: 0,
			duration: 0.2,
			ease: 'power2.out'
		});
	}

	play() {
		gsap.to(this._motion, {
			activity: 1,
			duration: 0.3,
			ease: 'power2.in'
		});
	}
}
