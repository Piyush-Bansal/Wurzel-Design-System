import { useIntersection } from '$lib/interactions';
import { scrollIdle } from '$lib/interactions/observers/scrollIdle.svelte';
import type MarqueeState from '../state/marquee.state.svelte';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class MarqueeBehaviour {
	private _intersection = useIntersection(() => this._marquee.marqueeWrapper, {
		rootMargin: '0px'
	});

	private _motion = {
		activity: 1,
		scrollVelocity: 0
	};

	constructor(
		private readonly _marquee: MarqueeState,
		private readonly _baseSpeed = 60,
		private readonly _direction = 1
	) {
		$effect(() => {
			if (!this._intersection?.isIntersecting) return;
			gsap.ticker.add(this._tick);
			this._intersection.disconnect();
			return () => this.destroy();
		});

		$effect(() => {
			if (!this._marquee.marqueeWrapper) return;
			ScrollTrigger.create({
				trigger: this._marquee.marqueeWrapper,
				onUpdate: (self) => {
					const velocity = gsap.utils.clamp(
						-200,
						200,
						self.getVelocity() * 0.04
					);

					this._motion.scrollVelocity = velocity;

					gsap.to(this._motion, {
						scrollVelocity: 0,
						duration: 0.6,
						overwrite: true,
						ease: 'power3.out'
					});
				}
			});
		});
	}

	private _tick = (time: number, deltaTime: number) => {
		if (this._marquee.items.length === 0) return;
		this._update(deltaTime);
		this._render();
	};

	private _update(deltaTime: number) {
		const dt = Math.min(deltaTime / 1000, 1 / 30);

		const velocity =
			this._baseSpeed * this._direction + this._motion.scrollVelocity;

		this._marquee.offset -= velocity * this._motion.activity * dt;
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
