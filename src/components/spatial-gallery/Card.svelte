<script lang="ts">
	import { useActivity, useCamera } from '$lib/interactions';
	import { getSpatialGallery } from './functionality.svelte';
	import { onMount, tick } from 'svelte';
	import type { Card, InteractionPose } from './types';
	import gsap from 'gsap';
	import Flip from 'gsap/Flip';

	gsap.registerPlugin(Flip);

	//props and state
	let { details, index }: Card = $props();

	const functionality = getSpatialGallery();
	let card = $state<HTMLDivElement>();
	let interactionPose: InteractionPose | null = null;

	const CardState = {
		Idle: 'idle',
		Hover: 'hover',
		Dimmed: 'dimmed',
		Selected: 'selected',
		Background: 'background'
	} as const;

	onMount(() => {
		functionality.ids[index] = details.id;
	});

	//Toolkit
	const camera = $derived.by(() => {
		if (!functionality.galleryWrapper) return;
		return useCamera(
			functionality.pointer,
			functionality.galleryWrapper,
			30,
			10
		);
	});

	const pointerActivity = $derived(useActivity(functionality.pointer, 1_000));

	//Motion state
	const motion = $state({
		camera: {
			x: 0,
			y: 0,
			rotationX: 0,
			rotationY: 0
		},
		idle: {
			y: 0,
			rotationX: 0,
			rotationY: 0
		},
		interaction: {
			scale: 1,
			depth: 0,
			rotationX: 0,
			rotationY: 0,
			brightness: 1
		}
	});

	//Derived states
	const depthFactor = $derived(
		gsap.utils.mapRange(-500, 0, 0, 1, details.depth)
	);

	const gallerySelection = $derived(
		functionality.isGalleryOpen &&
			functionality.selected?.current === details.id
	);

	const isCardHovered = $derived(
		functionality.selected?.current === details.id
	);

	//Quick to
	let xTo: gsap.QuickToFunc;
	let yTo: gsap.QuickToFunc;
	let rotateXTo: gsap.QuickToFunc;
	let rotateYTo: gsap.QuickToFunc;
	let depthTo: gsap.QuickToFunc;
	let scaleXTo: gsap.QuickToFunc;
	let scaleYTo: gsap.QuickToFunc;
	let brightnessTo: gsap.QuickToFunc;

	function createQuickTo(node: HTMLElement) {
		const motionSetting = {
			duration: 0.2,
			ease: 'sine.out'
		};

		xTo = gsap.quickTo(node, 'x', motionSetting);
		yTo = gsap.quickTo(node, 'y', motionSetting);
		rotateXTo = gsap.quickTo(node, 'rotationX', motionSetting);
		rotateYTo = gsap.quickTo(node, 'rotationY', motionSetting);
		depthTo = gsap.quickTo(node, 'z', motionSetting);
		scaleXTo = gsap.quickTo(node, 'scaleX', motionSetting);
		scaleYTo = gsap.quickTo(node, 'scaleY', motionSetting);
		brightnessTo = gsap.quickTo(node, '--brightness', motionSetting);
	}

	$effect(() => {
		if (!card) return;

		gsap.set(card, {
			rotationX: details.rotateX,
			rotationY: details.rotateY
		});

		createQuickTo(card);
	});

	//Motion producers
	$effect(() => {
		if (!camera) return;

		motion.camera.x = camera.translateX * depthFactor;
		motion.camera.y = camera.translateY * depthFactor;
		motion.camera.rotationX = camera.rotateX + details.rotateX;
		motion.camera.rotationY = camera.rotateY + details.rotateY;
	});

	//idle timeline
	let idleTL: gsap.core.Tween;
	$effect(() => {
		const ctx = gsap.context(() => {
			idleTL = gsap.to(motion.idle, {
				y: gsap.utils.random(-30, 30),
				rotationX: gsap.utils.random(-1, 1),
				rotationY: gsap.utils.random(-1, 1),
				duration: gsap.utils.random(3, 6),
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true
			});
		}, card);

		return () => ctx.revert();
	});

	//Pointer rest activates idle movement
	let isMotionIdlePlaying = true;

	$effect(() => {
		if (!idleTL) return;
		if (isMotionIdlePlaying !== pointerActivity.isActive) return;

		if (pointerActivity.isActive || functionality.isGalleryOpen) {
			//If motion is active, idle animation stops
			gsap.to(motion.idle, {
				duration: 0.4,
				y: 0,
				rotationX: 0,
				rotationY: 0,
				ease: 'sine.out',
				onComplete: () => idleTL.pause()
			});

			isMotionIdlePlaying = false;
		} else {
			idleTL.restart();
			isMotionIdlePlaying = true;
		}
	});

	const cardMotionState = $derived.by(() => {
		if (
			functionality.isGalleryOpen &&
			functionality.selected?.current === details.id
		) {
			return CardState.Selected;
		}

		if (functionality.isGalleryOpen) {
			return CardState.Background;
		}

		if (isCardHovered) {
			return CardState.Hover;
		}

		if (functionality.isAnyCardSelected) {
			return CardState.Dimmed;
		}

		return CardState.Idle;
	});

	//Card motion state
	$effect(() => {
		interactionPose = {
			[CardState.Idle]: {
				depth: 0,
				scale: 1,
				rotationX: 0,
				rotationY: 0,
				brightness: 1
			},

			[CardState.Hover]: {
				depth: 150,
				scale: 1.08,
				rotationX: -details.rotateX,
				rotationY: -details.rotateY,
				brightness: 1
			},

			[CardState.Dimmed]: {
				depth: 0,
				scale: 1,
				rotationX: 0,
				rotationY: 0,
				brightness: 0.3
			},

			[CardState.Background]: {
				depth: -100,
				scale: 0.8,
				rotationX: 0,
				rotationY: 0,
				brightness: 0.3
			},

			[CardState.Selected]: {
				depth: 0,
				scale: 1,
				rotationX: 0,
				rotationY: 0,
				brightness: 1
			}
		};
	});

	$effect(() => {
		if (!interactionPose) return;
		gsap.to(motion.interaction, {
			...interactionPose[cardMotionState],
			duration: 0.45,
			ease: 'power3.out'
		});
	});

	// Rendering
	function render() {
		xTo(motion.camera.x);
		yTo(motion.camera.y + motion.idle.y);
		rotateXTo(
			motion.camera.rotationX +
				motion.idle.rotationX +
				motion.interaction.rotationX
		);
		rotateYTo(
			motion.camera.rotationY +
				motion.idle.rotationY +
				motion.interaction.rotationY
		);
		depthTo(details.depth + motion.interaction.depth);
		scaleXTo(motion.interaction.scale);
		scaleYTo(motion.interaction.scale);
		brightnessTo(motion.interaction.brightness);
	}

	$effect(render);

	async function galleryAnimation() {
		if (!card) return;

		const state = Flip.getState(card);

		functionality.isGalleryOpen = true;

		await tick();

		Flip.from(state, {
			duration: 1,
			ease: 'none'
		});
	}

	//Event handlers
	function handlePointerEnter() {
		if (functionality.isGalleryOpen) return;

		functionality.selected?.select(details.id);
		functionality.isAnyCardSelected = true;
	}

	function handlePointerLeave() {
		if (functionality.isGalleryOpen) return;

		functionality.selected?.clear();
		functionality.isAnyCardSelected = false;
	}

	async function handleClick() {
		if (functionality.isGalleryOpen) return;

		await galleryAnimation();
	}

	function handleClose(event: MouseEvent) {
		event.stopPropagation();
		functionality.isGalleryOpen = false;
	}
</script>

<div
	class={['card', gallerySelection && 'gallery']}
	style:--x={details.x}
	style:--y={details.y}
	style:--depth={details.depth}
	style:--rotate-x={details.rotateX}
	style:--rotate-y={details.rotateY}
	style:--z-index={isCardHovered ? functionality.ids.length : index}
	style:--brightness={1}
	bind:this={card}
	role="presentation"
	onpointerenter={handlePointerEnter}
	onpointerleave={handlePointerLeave}
	onclick={handleClick}
	data-flip-id="morph-card"
>
	<img src={details.image} alt="" data-flip-id="morph-image" />
	{#if gallerySelection}
		<h3 class="invert">{details.title}</h3>
		<div class="close" onclick={handleClose} role="presentation">
			<img src="icons/close.svg" alt="close" />
		</div>
	{/if}
</div>

<style lang="scss">
	@use '$tokens' as *;
	@use '$sizes' as *;

	.card {
		position: absolute;
		width: $col-wide-2;
		aspect-ratio: 3/4;
		border-radius: $br-soft;
		overflow: hidden;

		top: calc(var(--y) * 1px);
		left: calc(var(--x) * 1px);
		transform: translate(-50%, -50%) translateZ(calc(var(--depth) * 1px));
		z-index: var(--z-index);
		filter: brightness(var(--brightness, 1));
		cursor: pointer;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.gallery {
		width: $col-wide-8;
		aspect-ratio: 16/9;

		top: 50%;
		left: 50%;
		cursor: default;

		h3 {
			position: absolute;
			bottom: 5%;
			left: 5%;
			width: 100%;
		}

		.close {
			position: absolute;
			top: 5%;
			right: 5%;
			width: $ico-frame;
			height: $ico-frame;
			cursor: pointer;

			img {
				width: $ico-size-l;
				height: $ico-size-l;
				filter: invert(100%);
				transition: scale 0.2s ease;

				&:active {
					scale: 0.7;
				}
			}
		}
	}
</style>
