import { browser } from '$app/env';
import { useIntersection } from '$lib/interactions';
import { useDrag } from '$lib/interactions/signals/dragging.svelte';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type MarqueeState from '../state/marquee.state.svelte';

gsap.registerPlugin(ScrollTrigger);

export class MarqueeBehaviour {
	private readonly _motion = {
		velocity: 0,
		autoplay: 0,
		scrollImpulse: 0
	};

	private _releaseHandled = true;

	readonly drag: ReturnType<typeof useDrag> | undefined;
	private readonly _intersection:
		| ReturnType<typeof useIntersection>
		| undefined;

	constructor(
		private readonly _marquee: MarqueeState,
		baseSpeed = 60,
		direction = 1
	) {
		this._motion.autoplay = baseSpeed * direction;
		this._motion.velocity = this._motion.autoplay;

		if (browser) {
			this.drag = useDrag(this._marquee.pointer, this._marquee.velocity);

			this._intersection = useIntersection(() => this._marquee.marqueeWrapper, {
				rootMargin: '0px'
			});
		}

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
				onUpdate: this._handleScroll
			});
		});
	}

	private _tick = (_: number, deltaTime: number) => {
		if (this._marquee.items.length === 0) return;

		this._update(deltaTime);
		this._render();
	};

	private _update(deltaTime: number) {
		const dt = Math.min(deltaTime / 1000, 1 / 30);

		if (this.drag?.isDragging) {
			this._followPointer();
			return;
		}

		this._handleReleaseIfNeeded();
		this._stepVelocity();

		this._marquee.offset -= this._motion.velocity * dt;
	}

	private _followPointer() {
		this._releaseHandled = false;
		this._marquee.offset += this.drag!.deltaX;
	}

	private _handleReleaseIfNeeded() {
		if (this._releaseHandled || !this.drag) return;
		this._releaseHandled = true;

		this._motion.velocity = -this.drag.velocityX * 500;

		this._motion.autoplay =
			Math.sign(this._motion.velocity || this._motion.autoplay) *
			Math.abs(this._motion.autoplay);
	}

	private _stepVelocity() {
		this._motion.velocity +=
			(this._motion.autoplay - this._motion.velocity) * 0.05;

		this._motion.velocity += this._motion.scrollImpulse * 0.08;
	}

	private _handleScroll = (self: ScrollTrigger) => {
		this._motion.scrollImpulse = gsap.utils.clamp(
			-200,
			200,
			self.getVelocity() * 0.04
		);

		gsap.to(this._motion, {
			scrollImpulse: 0,
			duration: 0.6,
			overwrite: true,
			ease: 'power3.out'
		});
	};

	private _render() {
		const width = this._marquee.trackWidth;
		if (width === 0) return;

		const offset = this._marquee.offset;

		for (const item of this._marquee.items) {
			if (!item.item) continue;

			const x = gsap.utils.wrap(
				-item.width,
				width - item.width,
				item.startX + offset
			);

			item.setX(x - item.startX);
		}
	}

	private destroy() {
		gsap.ticker.remove(this._tick);
		this._intersection?.disconnect();
	}
}
