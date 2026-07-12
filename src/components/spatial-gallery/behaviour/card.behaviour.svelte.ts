import { tick } from 'svelte';
import {
	CardMotionState,
	IndividualCardState as CardState
} from '../state/card.state.svelte';
import type { GalleryState } from '../state/gallery.state.svelte';

import gsap from 'gsap';
import Flip from 'gsap/Flip';
import type { InteractionPose } from '../types';
import { useActivity, useCamera } from '$lib/interactions';

gsap.registerPlugin(Flip);

export class CardController {
	private xTo?: gsap.QuickToFunc;
	private yTo?: gsap.QuickToFunc;
	private rotateXTo?: gsap.QuickToFunc;
	private rotateYTo?: gsap.QuickToFunc;
	private depthTo?: gsap.QuickToFunc;
	private scaleXTo?: gsap.QuickToFunc;
	private scaleYTo?: gsap.QuickToFunc;
	private brightnessTo?: gsap.QuickToFunc;
	private pointerActivity!: ReturnType<typeof useActivity> | undefined;
	private camera: ReturnType<typeof useCamera> | undefined;
	private readonly depthFactor: number;

	private readonly motionSetting = { duration: 0.2, ease: 'sine.out' };

	private readonly motion = $state({
		camera: { x: 0, y: 0, rotationX: 0, rotationY: 0 },
		idle: { y: 0, rotationX: 0, rotationY: 0 },
		interaction: {
			scale: 1,
			depth: 0,
			rotationX: 0,
			rotationY: 0,
			brightness: 1
		}
	});

	private idleTL?: gsap.core.Tween;
	private isMotionIdlePlaying = true;

	constructor(
		private readonly state: CardState,
		private readonly gallery: GalleryState
	) {
		this.pointerActivity =
			this.gallery.pointer && useActivity(this.gallery.pointer);

		this.camera = $derived.by(() => {
			if (!this.gallery.galleryWrapper || !this.gallery.pointer) return;
			return useCamera(
				this.gallery.pointer,
				this.gallery.galleryWrapper,
				30,
				10
			);
		});

		this.depthFactor = gsap.utils.mapRange(
			-500,
			0,
			0,
			1,
			this.state.cardDetails.depth
		);

		$effect(() => this.initialiseCard());

		$effect(() => this.updateCamera());

		$effect(() => this.createIdleTimeline());

		$effect(() => this.updateIdleState());

		$effect(() => this.animateInteraction());

		$effect(() => this.render());
	}

	private createQuickTo() {
		if (!this.state.card) return;
		this.xTo = gsap.quickTo(this.state.card, 'x', this.motionSetting);
		this.yTo = gsap.quickTo(this.state.card, 'y', this.motionSetting);
		this.rotateXTo = gsap.quickTo(
			this.state.card,
			'rotationX',
			this.motionSetting
		);
		this.rotateYTo = gsap.quickTo(
			this.state.card,
			'rotationY',
			this.motionSetting
		);
		this.depthTo = gsap.quickTo(this.state.card, 'z', this.motionSetting);
		this.scaleXTo = gsap.quickTo(this.state.card, 'scaleX', this.motionSetting);
		this.scaleYTo = gsap.quickTo(this.state.card, 'scaleY', this.motionSetting);
		this.brightnessTo = gsap.quickTo(
			this.state.card,
			'--brightness',
			this.motionSetting
		);
	}

	private render() {
		if (!this.state.card) return;
		if (this.state.cardMotionState === CardMotionState.Selected) {
			this.xTo?.(0);
			this.yTo?.(0);
			this.rotateXTo?.(0);
			this.rotateYTo?.(0);
			this.depthTo?.(0);
			this.scaleXTo?.(1);
			this.scaleYTo?.(1);
			this.brightnessTo?.(1);
			return;
		}

		this.xTo?.(this.motion.camera.x);
		this.yTo?.(this.motion.camera.y + this.motion.idle.y);
		this.rotateXTo?.(
			this.motion.camera.rotationX +
				this.motion.idle.rotationX +
				this.motion.interaction.rotationX
		);
		this.rotateYTo?.(
			this.motion.camera.rotationY +
				this.motion.idle.rotationY +
				this.motion.interaction.rotationY
		);
		this.depthTo?.(
			this.state.cardDetails.depth + this.motion.interaction.depth
		);
		this.scaleXTo?.(this.motion.interaction.scale);
		this.scaleYTo?.(this.motion.interaction.scale);
		this.brightnessTo?.(this.motion.interaction.brightness);
	}

	async toggleSelection() {
		if (!this.state.flipTarget) return;

		const state = Flip.getState(this.state.flipTarget);

		this.gallery.isGalleryOpen = !this.gallery.isGalleryOpen;
		await tick();

		Flip.from(state, {
			duration: 0.6,
			ease: 'power3.inOut'
		});
	}

	private initialiseCard() {
		if (!this.state.card) return;

		gsap.set(this.state.card, {
			rotationX: this.state.cardDetails.rotateX,
			rotationY: this.state.cardDetails.rotateY
		});

		this.createQuickTo();
	}

	private updateCamera() {
		if (!this.camera) return;

		this.motion.camera.x = this.camera.translateX * this.depthFactor;
		this.motion.camera.y = this.camera.translateY * this.depthFactor;
		this.motion.camera.rotationX =
			this.camera.rotateX + this.state.cardDetails.rotateX;
		this.motion.camera.rotationY =
			this.camera.rotateY + this.state.cardDetails.rotateY;
	}

	private createIdleTimeline() {
		if (!this.state.card) return;
		const ctx = gsap.context(() => {
			this.idleTL = gsap.to(this.motion.idle, {
				y: gsap.utils.random(-30, 30),
				rotationX: gsap.utils.random(-1, 1),
				rotationY: gsap.utils.random(-1, 1),
				duration: gsap.utils.random(3, 6),
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true
			});
		}, this.state.card);

		return () => ctx.revert();
	}

	private updateIdleState() {
		if (!this.idleTL) return;

		const shouldPause =
			(this.pointerActivity && this.pointerActivity.isActive) ||
			this.gallery.isGalleryOpen;

		if (this.isMotionIdlePlaying === !shouldPause) return;

		if (shouldPause) {
			gsap.to(this.motion.idle, {
				duration: 0.4,
				y: 0,
				rotationX: 0,
				rotationY: 0,
				ease: 'sine.out',
				onComplete: () => this.idleTL?.pause()
			});

			this.isMotionIdlePlaying = false;
		} else {
			this.idleTL.restart();
			this.isMotionIdlePlaying = true;
		}
	}

	private animateInteraction() {
		gsap.to(this.motion.interaction, {
			...this.poses[this.state.cardMotionState],
			duration: 0.45,
			ease: 'power3.out'
		});
	}

	private get poses(): InteractionPose {
		return {
			[CardMotionState.Idle]: {
				depth: 0,
				scale: 1,
				rotationX: 0,
				rotationY: 0,
				brightness: 1
			},
			[CardMotionState.Hover]: {
				depth: 150,
				scale: 1.08,
				rotationX: -this.state.cardDetails.rotateX,
				rotationY: -this.state.cardDetails.rotateY,
				brightness: 1
			},
			[CardMotionState.Dimmed]: {
				depth: 0,
				scale: 1,
				rotationX: 0,
				rotationY: 0,
				brightness: 0.3
			},
			[CardMotionState.Background]: {
				depth: -100,
				scale: 0.8,
				rotationX: 0,
				rotationY: 0,
				brightness: 0.3
			},
			[CardMotionState.Selected]: {
				depth: 0,
				scale: 1,
				rotationX: 0,
				rotationY: 0,
				brightness: 1
			}
		};
	}

	register() {
		this.gallery.ids[this.state.index] = this.state.cardDetails.id;
	}

	pointerEnter() {
		if (this.gallery.isGalleryOpen) return;
		this.gallery.selected?.select(this.state.cardDetails.id);
		this.gallery.isAnyCardSelected = true;
	}

	pointerLeave() {
		if (this.gallery.isGalleryOpen) return;
		this.gallery.selected?.clear();
		this.gallery.isAnyCardSelected = false;
	}

	async click() {
		if (this.gallery.isGalleryOpen) return;
		await this.toggleSelection();
	}

	async close(event: MouseEvent) {
		event.stopPropagation();
		await this.toggleSelection();
	}
}
