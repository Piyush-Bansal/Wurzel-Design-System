<script lang="ts">
	import { useCamera } from '$lib/interactions/signals/camera.svelte';
	import gsap from 'gsap';
	import { getSpatialGallery } from './functionality.svelte';
	import type { Card } from './types';
	import { useActivity } from '$lib/interactions';

	let { details }: Card = $props();

	const functionality = getSpatialGallery();

	const camera = $derived.by(() => {
		if (!functionality.galleryWrapper) return;
		return useCamera(
			functionality.pointer,
			functionality.galleryWrapper,
			30,
			10
		);
	});

	const activity = $derived(useActivity(functionality.pointer, 1_000));

	let card = $state<HTMLDivElement>();

	const depthFactor = $derived(
		gsap.utils.mapRange(-500, 0, 0, 1, details.depth)
	);

	let xTo: gsap.QuickToFunc;
	let yTo: gsap.QuickToFunc;
	let rotateXTo: gsap.QuickToFunc;
	let rotateYTo: gsap.QuickToFunc;

	$effect(() => {
		if (!card) return;

		gsap.set(card, {
			rotationX: details.rotateX,
			rotationY: details.rotateY
		});

		xTo = gsap.quickTo(card, 'x', {
			duration: 0.2,
			ease: 'sine.out'
		});

		yTo = gsap.quickTo(card, 'y', {
			duration: 0.2,
			ease: 'sine.out'
		});

		rotateXTo = gsap.quickTo(card, 'rotationX', {
			duration: 0.2,
			ease: 'sine.out'
		});

		rotateYTo = gsap.quickTo(card, 'rotationY', {
			duration: 0.2,
			ease: 'sine.out'
		});
	});

	const motion = $state({
		idle: {
			y: 0,
			rotationX: 0,
			rotationY: 0
		},
		camera: {
			x: 0,
			y: 0,
			xRotation: 0,
			yRotation: 0
		}
	});

	$effect(() => {
		if (!camera) return;

		motion.camera.x = camera.translateX * depthFactor;
		motion.camera.y = camera.translateY * depthFactor;
		motion.camera.xRotation = camera.rotateX + details.rotateX;
		motion.camera.yRotation = camera.rotateY + details.rotateY;
	});

	let ctx: gsap.Context;
	let idleTL: gsap.core.Tween;

	$effect(() => {
		ctx = gsap.context(() => {
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

	let isMotionIdle = false;

	$effect(() => {
		if (!idleTL) return;
		if (isMotionIdle == activity.isActive) return;

		if (activity.isActive) {
			gsap.to(motion.idle, {
				duration: 0.4,
				y: 0,
				rotationX: 0,
				rotationY: 0,
				ease: 'sine.out',
				onComplete: () => idleTL.pause()
			});

			isMotionIdle = true;
		} else {
			idleTL.restart();
			isMotionIdle = false;
		}
	});

	$effect(() => {
		xTo(motion.camera.x);
		yTo(motion.camera.y + motion.idle.y);
		rotateXTo(motion.camera.xRotation + motion.idle.rotationX);
		rotateYTo(motion.camera.yRotation + motion.idle.rotationY);
	});
</script>

<div
	class="card"
	style:--x={details.x}
	style:--y={details.y}
	style:--depth={details.depth}
	style:--rotate-x={details.rotateX}
	style:--rotate-y={details.rotateY}
	bind:this={card}
>
	<img src={details.image} alt="" />
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

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
